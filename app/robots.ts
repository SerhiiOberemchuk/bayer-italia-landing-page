import type { MetadataRoute } from "next"
import { locales, siteUrl } from "@/lib/i18n/config"
import { withLocalePath } from "@/lib/i18n/routing"
import { isCatalogEnabled } from "@/lib/storefront/catalog-visibility"

// The hidden catalog already answers 404, but spelling the paths out here stops
// crawlers from re-requesting URLs they indexed while the shop was live.
function getDisallowedPaths(): string[] {
  const disallowed = ["/api/"]
  if (isCatalogEnabled) return disallowed

  return [
    ...disallowed,
    "/google-merchant-feed.xml",
    ...locales.flatMap((locale) => [
      `${withLocalePath(locale, "/catalog")}`,
      `${withLocalePath(locale, "/cart")}`,
      `${withLocalePath(locale, "/checkout")}`,
    ]),
  ]
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: getDisallowedPaths(),
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
