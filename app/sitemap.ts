import type { MetadataRoute } from "next";
import { getAllProducts } from "@/actions/catalog/get-all-products";
import { locales, siteUrl } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";

const indexableStaticPages = [
  "/",
  "/catalog",
  "/delivery-from-italy",
  "/brands-from-italy",
  "/privacy",
  "/cookies",
  "/terms",
  "/returns",
] as const;

// `<lastmod>` is the one sitemap hint Google still reads — `changefreq` and
// `priority` it ignores outright. It only helps while it stays honest, so a
// page gets one only where a real timestamp backs it: a product from its CRM
// row, the catalog listing from the most recent product on it. The editorial
// pages have no such source and deliberately ship without one.
function parseUpdatedAt(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const products = (await getAllProducts()).filter(
    (product) => product.status === "active",
  );

  const productLastModified = new Map<string, Date>();
  for (const product of products) {
    const updatedAt = parseUpdatedAt(product.updatedAt);
    if (updatedAt) productLastModified.set(product.id, updatedAt);
  }

  const catalogLastModified = [...productLastModified.values()].reduce<
    Date | undefined
  >(
    (latest, current) =>
      !latest || current > latest ? current : latest,
    undefined,
  );

  for (const locale of locales) {
    for (const page of indexableStaticPages) {
      entries.push({
        url: `${siteUrl}${withLocalePath(locale, page)}`,
        alternates: {
          languages: buildLocalizedAlternates(page, siteUrl),
        },
        ...(page === "/catalog" && catalogLastModified
          ? { lastModified: catalogLastModified }
          : {}),
        changeFrequency:
          page === "/" || page === "/catalog"
            ? "weekly"
            : page === "/delivery-from-italy" || page === "/brands-from-italy"
              ? "monthly"
              : "yearly",
        priority:
          page === "/"
            ? 1
            : page === "/catalog"
              ? 0.9
              : page === "/delivery-from-italy" || page === "/brands-from-italy"
                ? 0.8
                : 0.3,
      });
    }

    for (const product of products) {
      const pathname = `/catalog/${product.id}`;
      const lastModified = productLastModified.get(product.id);

      entries.push({
        url: `${siteUrl}${withLocalePath(locale, pathname)}`,
        alternates: {
          languages: buildLocalizedAlternates(pathname, siteUrl),
        },
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "daily",
        priority: 0.8,
        images: product.images.map((image) => image.url),
      });
    }
  }

  return entries;
}
