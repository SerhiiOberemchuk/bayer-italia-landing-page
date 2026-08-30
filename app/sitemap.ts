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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const products = (await getAllProducts()).filter(
    (product) => product.status === "active",
  );

  for (const locale of locales) {
    for (const page of indexableStaticPages) {
      entries.push({
        url: `${siteUrl}${withLocalePath(locale, page)}`,
        alternates: {
          languages: buildLocalizedAlternates(page, siteUrl),
        },
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

      entries.push({
        url: `${siteUrl}${withLocalePath(locale, pathname)}`,
        alternates: {
          languages: buildLocalizedAlternates(pathname, siteUrl),
        },
        changeFrequency: "daily",
        priority: 0.8,
        images: product.images.map((image) => image.url),
      });
    }
  }

  return entries;
}
