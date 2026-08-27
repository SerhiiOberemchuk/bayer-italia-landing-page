"use server";

import "server-only";

import { z } from "zod";

import {
  isObriymConfigured,
  ObriymRequestError,
  requestObriym,
} from "@/lib/obriym/client";
import { storefrontWarehouseId } from "@/lib/obriym/config";
import type {
  ObriymProduct,
  OrderInput,
  OrderResult,
} from "@/lib/obriym/types";
import { getProductName, getProductPrice } from "@/lib/storefront/products";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .transform((value) => value || undefined);

const checkoutOrderSchema = z.object({
  requestId: z.string().uuid(),
  locale: z.enum(["uk", "en"]),
  customer: z.object({
    firstName: z.string().trim().min(1).max(120),
    lastName: optionalText(120),
    email: z
      .union([z.string().trim().email().max(255), z.literal("")])
      .transform((value) => value || undefined),
    phone: z.string().trim().min(6).max(50),
    country: z.string().trim().length(2).transform((value) => value.toUpperCase()),
    city: z.string().trim().min(1).max(120),
    line1: z.string().trim().min(1).max(255),
    line2: optionalText(255),
    postalCode: optionalText(32),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1).max(120),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(50),
});

type CheckoutOrder = z.infer<typeof checkoutOrderSchema>;
type SubmitOrderResult =
  | { ok: true; orderId: string }
  | {
      ok: false;
      code: "INVALID_INPUT" | "PRODUCT_UNAVAILABLE" | "SERVICE_UNAVAILABLE";
    };

class ProductUnavailableError extends Error {}

async function getCurrentProduct(productId: string) {
  try {
    const response = await requestObriym<{ data: ObriymProduct }>(
      `/products/${encodeURIComponent(productId)}`,
      { cache: "no-store" },
    );
    if (response.data.warehouseId !== storefrontWarehouseId) return null;
    return response.data;
  } catch (error) {
    if (error instanceof ObriymRequestError && error.status === 404) return null;
    throw error;
  }
}

async function resolveOrderItems(
  items: CheckoutOrder["items"],
  locale: CheckoutOrder["locale"],
) {
  const products = await Promise.all(
    items.map(({ productId }) => getCurrentProduct(productId)),
  );

  return items.map((item, index) => {
    const product = products[index];
    if (
      !product ||
      product.status !== "active" ||
      (product.stock !== null && product.stock < item.quantity)
    ) {
      throw new ProductUnavailableError();
    }

    const price = getProductPrice(product, "EUR");
    if (!Number.isFinite(price.amount) || price.amount < 0) {
      throw new ProductUnavailableError();
    }

    return {
      currency: price.currency,
      productName: getProductName(product, locale),
      quantity: item.quantity,
      ...(product.sku ? { sku: product.sku } : {}),
      unitPrice: price.amount,
    };
  });
}

export async function submitOrder(input: unknown): Promise<SubmitOrderResult> {
  const parsed = checkoutOrderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, code: "INVALID_INPUT" };
  }

  if (!isObriymConfigured()) {
    return { ok: false, code: "SERVICE_UNAVAILABLE" };
  }

  const { customer, items, locale, requestId } = parsed.data;

  try {
    const orderItems = await resolveOrderItems(items, locale);
    const currencies = new Set(orderItems.map((item) => item.currency));

    if (currencies.size !== 1) throw new ProductUnavailableError();

    const order: OrderInput = {
      externalId: `buyer-italia-${requestId}`,
      currency: orderItems[0].currency,
      customer: {
        firstName: customer.firstName,
        ...(customer.lastName ? { lastName: customer.lastName } : {}),
        ...(customer.email ? { email: customer.email } : {}),
        phone: customer.phone,
        shippingAddress: {
          city: customer.city,
          country: customer.country,
          line1: customer.line1,
          ...(customer.line2 ? { line2: customer.line2 } : {}),
          ...(customer.postalCode ? { postalCode: customer.postalCode } : {}),
        },
      },
      items: orderItems.map(({ currency: _currency, ...item }) => item),
    };

    const result = await requestObriym<OrderResult>("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      cache: "no-store",
    });

    return { ok: true, orderId: result.data.externalId };
  } catch (error) {
    if (error instanceof ProductUnavailableError) {
      return { ok: false, code: "PRODUCT_UNAVAILABLE" };
    }

    console.error("Failed to create Obriym order", error);
    return { ok: false, code: "SERVICE_UNAVAILABLE" };
  }
}
