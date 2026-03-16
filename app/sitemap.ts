import type { MetadataRoute } from "next"
import { locales, siteUrl } from "@/lib/i18n/config"
import {
  localizedPublicPaths,
  withLocalePath,
} from "@/lib/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const lastModifiedByPage: Partial<Record<(typeof localizedPublicPaths)[number], Date>> = {
    "/": new Date("2026-03-16T00:00:00.000Z"),
    "/vinted-in-stock": new Date("2026-03-16T00:00:00.000Z"),
    "/catalog": new Date("2026-03-16T00:00:00.000Z"),
    "/delivery-from-italy": new Date("2026-03-05T00:00:00.000Z"),
    "/brands-from-italy": new Date("2026-03-05T00:00:00.000Z"),
    "/privacy": new Date("2026-03-05T00:00:00.000Z"),
    "/cookies": new Date("2026-03-05T00:00:00.000Z"),
    "/terms": new Date("2026-03-05T00:00:00.000Z"),
  }

  for (const locale of locales) {
    for (const page of localizedPublicPaths) {
      entries.push({
        url: `${siteUrl}${withLocalePath(locale, page)}`,
        lastModified: lastModifiedByPage[page] ?? new Date("2026-03-05T00:00:00.000Z"),
        changeFrequency:
          page === "/"
            ? "weekly"
            : page === "/catalog" ||
                page === "/vinted-in-stock" ||
                page === "/delivery-from-italy" ||
                page === "/brands-from-italy"
              ? "monthly"
              : "yearly",
        priority:
          page === "/"
            ? 1
            : page === "/vinted-in-stock"
              ? 0.9
              : page === "/delivery-from-italy" || page === "/brands-from-italy"
              ? 0.8
              : page === "/catalog"
                ? 0.7
                : 0.3,
      })
    }
  }

  return entries
}
