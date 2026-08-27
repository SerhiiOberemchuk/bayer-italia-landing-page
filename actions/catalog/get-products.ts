import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { isObriymConfigured, requestObriym } from "@/lib/obriym/client";
import { storefrontWarehouseId } from "@/lib/obriym/config";
import type {
  CatalogFilters,
  ObriymListResponse,
  ObriymProduct,
} from "@/lib/obriym/types";

export async function getProducts(filters: CatalogFilters = {}) {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });
  cacheTag("obriym-products");

  if (!isObriymConfigured()) return [];

  const limit = Math.max(1, Math.min(filters.limit ?? 100, 100));
  const query = filters.q?.trim().slice(0, 120);
  const categoryId = filters.categoryId?.trim().slice(0, 120);
  const brandId = filters.brandId?.trim().slice(0, 120);
  const params = new URLSearchParams({
    page: "1",
    perPage: String(limit),
    warehouseId: storefrontWarehouseId,
  });

  if (query) params.set("q", query);
  if (categoryId) params.set("categoryId", categoryId);
  if (brandId) params.set("brandId", brandId);

  try {
    const response = await requestObriym<ObriymListResponse<ObriymProduct>>(
      `/products?${params}`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to load products from Obriym CRM", error);
    return [];
  }
}
