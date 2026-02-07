import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://buyer-italia.shop"

  const pages = ["", "/privacy", "/cookies", "/terms"]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "yearly",
        priority: page === "" ? 1 : 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      })
    }
  }

  return entries
}
