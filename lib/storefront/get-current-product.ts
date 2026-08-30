import "server-only";

import {
  ObriymRequestError,
  requestObriym,
} from "@/lib/obriym/client";
import { storefrontWarehouseId } from "@/lib/obriym/config";
import type { ObriymProduct } from "@/lib/obriym/types";

export async function getCurrentProduct(productId: string) {
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

