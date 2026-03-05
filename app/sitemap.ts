import type { MetadataRoute } from "next"
import { locales, siteUrl } from "@/lib/i18n/config"
import {
  buildLocalizedAlternates,
  localizedPublicPaths,
  withLocalePath,
} from "@/lib/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  for (const locale of locales) {
    for (const page of localizedPublicPaths) {
      entries.push({
        url: `${siteUrl}${withLocalePath(locale, page)}`,
        lastModified: now,
        changeFrequency:
          page === "/"
            ? "weekly"
            : page === "/catalog" ||
                page === "/delivery-from-italy" ||
                page === "/brands-from-italy"
              ? "monthly"
              : "yearly",
        priority:
          page === "/"
            ? 1
            : page === "/delivery-from-italy" || page === "/brands-from-italy"
              ? 0.8
              : page === "/catalog"
                ? 0.7
                : 0.3,
        alternates: {
          languages: buildLocalizedAlternates(page, siteUrl),
        },
      })
    }
  }

  return entries
}
