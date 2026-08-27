import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { isObriymConfigured, requestObriym } from "@/lib/obriym/client";
import { storefrontWarehouseId } from "@/lib/obriym/config";
import type {
  CatalogFilterOptions,
  ObriymReference,
} from "@/lib/obriym/types";

type ProductFilter = { categoryId?: string; brandId?: string };

async function hasStorefrontProducts(filter: ProductFilter) {
  const params = new URLSearchParams({
    page: "1",
    perPage: "1",
    warehouseId: storefrontWarehouseId,
  });

  if (filter.categoryId) params.set("categoryId", filter.categoryId);
  if (filter.brandId) params.set("brandId", filter.brandId);

  const response = await requestObriym<{ pagination: { total: number } }>(
    `/products?${params}`,
  );
  return response.pagination.total > 0;
}

export async function getFilterOptions(): Promise<CatalogFilterOptions> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });
  cacheTag("obriym-products", "obriym-categories", "obriym-brands");

  if (!isObriymConfigured()) return { categories: [], brands: [] };

  try {
    const [categories, brands, hasProducts] = await Promise.all([
      requestObriym<{ data: ObriymReference[] }>("/categories"),
      requestObriym<{ data: ObriymReference[] }>("/brands"),
      hasStorefrontProducts({}),
    ]);

    if (!hasProducts) return { categories: [], brands: [] };

    const [categoryAvailability, brandAvailability] = await Promise.all([
      Promise.all(
        categories.data.map((category) =>
          hasStorefrontProducts({ categoryId: category.id }),
        ),
      ),
      Promise.all(
        brands.data.map((brand) =>
          hasStorefrontProducts({ brandId: brand.id }),
        ),
      ),
    ]);

    return {
      categories: categories.data.filter(
        (_category, index) => categoryAvailability[index],
      ),
      brands: brands.data.filter((_brand, index) => brandAvailability[index]),
    };
  } catch (error) {
    console.error("Failed to load catalog filters from Obriym CRM", error);
    return { categories: [], brands: [] };
  }
}
