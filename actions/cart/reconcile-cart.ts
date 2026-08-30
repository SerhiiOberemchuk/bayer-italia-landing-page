"use server";

import { z } from "zod";

import { isObriymConfigured } from "@/lib/obriym/client";
import type { CartItem } from "@/lib/storefront/cart";
import { getCurrentProduct } from "@/lib/storefront/get-current-product";
import { getProductName, getProductPrice } from "@/lib/storefront/products";

const reconcileCartSchema = z.object({
  locale: z.enum(["uk", "en"]),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1).max(120),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .max(50)
    .superRefine((items, context) => {
      const productIds = new Set<string>();

      items.forEach((item, index) => {
        if (productIds.has(item.productId)) {
          context.addIssue({
            code: "custom",
            message: "Duplicate product",
            path: [index, "productId"],
          });
        }
        productIds.add(item.productId);
      });
    }),
});

export type ReconcileCartResult =
  | {
      ok: true;
      items: CartItem[];
      unavailableProductIds: string[];
    }
  | {
      ok: false;
      code: "INVALID_INPUT" | "SERVICE_UNAVAILABLE";
    };

export async function reconcileCart(input: unknown): Promise<ReconcileCartResult> {
  const parsed = reconcileCartSchema.safeParse(input);
  if (!parsed.success) return { ok: false, code: "INVALID_INPUT" };
  if (!isObriymConfigured()) return { ok: false, code: "SERVICE_UNAVAILABLE" };

  try {
    const products = await Promise.all(
      parsed.data.items.map(({ productId }) => getCurrentProduct(productId)),
    );
    const items: CartItem[] = [];
    const unavailableProductIds: string[] = [];

    parsed.data.items.forEach((storedItem, index) => {
      const product = products[index];
      const availableQuantity =
        product?.stock === null
          ? null
          : Number.isFinite(product?.stock)
            ? Math.max(0, Math.floor(product?.stock ?? 0))
            : 0;

      if (
        !product ||
        product.status !== "active" ||
        availableQuantity === 0
      ) {
        unavailableProductIds.push(storedItem.productId);
        return;
      }

      const price = getProductPrice(product, "EUR");
      if (!Number.isFinite(price.amount) || price.amount < 0) {
        unavailableProductIds.push(storedItem.productId);
        return;
      }

      items.push({
        productId: storedItem.productId,
        name: getProductName(product, parsed.data.locale),
        sku: product.sku,
        price: price.amount,
        currency: price.currency,
        image: product.images[0]?.url || null,
        quantity:
          availableQuantity === null
            ? storedItem.quantity
            : Math.min(storedItem.quantity, availableQuantity),
        maxQuantity: availableQuantity,
      });
    });

    return { ok: true, items, unavailableProductIds };
  } catch (error) {
    console.error("Failed to reconcile cart with Obriym CRM", error);
    return { ok: false, code: "SERVICE_UNAVAILABLE" };
  }
}
