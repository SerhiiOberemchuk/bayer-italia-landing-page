export const locales = ["uk", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "uk"
export const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://buyer-italia.shop").replace(/\/+$/, "")

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
