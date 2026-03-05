import { cacheLife, cacheTag } from "next/cache";
import { and, desc, eq, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { productsSchema, type ProductType } from "@/lib/db/schema";

export type CatalogFilters = {
  brand?: string;
  category?: string;
  size?: string;
};

export async function getFilterOptions() {
  "use cache";

  cacheTag("products", "products:filters");
  cacheLife("hours");
  if (!db) {
    return {
      brands: [] as string[],
      categories: [] as string[],
      sizes: [] as string[],
    };
  }

  const allProducts = await db
    .select({
      brand: productsSchema.brand,
      category: productsSchema.category,
      size: productsSchema.size,
    })
    .from(productsSchema);

  const brands = [
    ...new Set(allProducts.map((product) => product.brand).filter(Boolean)),
  ].sort();
  const categories = [
    ...new Set(allProducts.map((product) => product.category).filter(Boolean)),
  ].sort();
  const sizes = [
    ...new Set(allProducts.map((product) => product.size).filter(Boolean)),
  ].sort();

  return { brands, categories, sizes };
}

export async function getProducts(
  filters: CatalogFilters,
): Promise<ProductType[]> {
  "use cache";

  cacheTag("products", "products:list");
  cacheLife("hours");
  if (!db) {
    return [];
  }

  const conditions: SQL[] = [];

  if (filters.brand) {
    conditions.push(eq(productsSchema.brand, filters.brand));
  }
  if (filters.category) {
    conditions.push(eq(productsSchema.category, filters.category));
  }
  if (filters.size) {
    conditions.push(eq(productsSchema.size, filters.size));
  }

  return db
    .select()
    .from(productsSchema)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(productsSchema.createdAt));
}

export async function getProduct(id: string): Promise<ProductType | null> {
  "use cache";

  cacheTag("products", `product:${id}`);
  cacheLife("hours");
  if (!db) return null;

  const result = await db
    .select()
    .from(productsSchema)
    .where(eq(productsSchema.id, id))
    .limit(1);
  return result[0] ?? null;
}
