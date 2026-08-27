import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import {
  isObriymConfigured,
  ObriymRequestError,
  requestObriym,
} from "@/lib/obriym/client";
import { storefrontWarehouseId } from "@/lib/obriym/config";
import type { ObriymProduct } from "@/lib/obriym/types";

export async function getProduct(productId: string) {
  "use cache";
  cacheLife({ stale: 60, revalidate: 120, expire: 1800 });

  const normalizedProductId = productId.trim();
  if (!normalizedProductId || normalizedProductId.length > 120) return null;
  if (!isObriymConfigured()) return null;

  cacheTag("obriym-products", `obriym-product:${normalizedProductId}`);

  try {
    const response = await requestObriym<{ data: ObriymProduct }>(
      `/products/${encodeURIComponent(normalizedProductId)}`,
    );
    if (response.data.warehouseId !== storefrontWarehouseId) return null;
    return response.data;
  } catch (error) {
    if (error instanceof ObriymRequestError && error.status === 404) return null;
    throw error;
  }
}
