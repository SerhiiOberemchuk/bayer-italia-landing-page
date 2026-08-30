import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { isObriymConfigured, requestObriym } from "@/lib/obriym/client";
import { storefrontWarehouseId } from "@/lib/obriym/config";
import type { ObriymListResponse, ObriymProduct } from "@/lib/obriym/types";

const PRODUCTS_PER_PAGE = 100;
const MAX_PAGES = 500;

export async function getAllProducts() {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });
  cacheTag("obriym-products");

  if (!isObriymConfigured()) return [];

  const products: ObriymProduct[] = [];

  try {
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(PRODUCTS_PER_PAGE),
        warehouseId: storefrontWarehouseId,
      });
      const response = await requestObriym<ObriymListResponse<ObriymProduct>>(
        `/products?${params}`,
      );

      products.push(...response.data);

      if (
        response.data.length < PRODUCTS_PER_PAGE ||
        products.length >= response.pagination.total
      ) {
        break;
      }
    }

    return products;
  } catch (error) {
    console.error("Failed to load all products from Obriym CRM", error);
    return [];
  }
}
