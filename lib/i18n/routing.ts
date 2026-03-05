import { defaultLocale, isValidLocale, locales, type Locale } from "./config"

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE"

const localePrefixRegex = new RegExp(`^/(${locales.join("|")})(?=/|$)`)

export const localizedPublicPaths = [
  "/",
  "/catalog",
  "/delivery-from-italy",
  "/brands-from-italy",
  "/privacy",
  "/cookies",
  "/terms",
] as const

export function getLocaleFromPathname(pathname: string): Locale | null {
  const match = pathname.match(localePrefixRegex)
  if (!match) return null
  const locale = match[1]
  return isValidLocale(locale) ? locale : null
}

export function hasLocalePrefix(pathname: string): boolean {
  return getLocaleFromPathname(pathname) !== null
}

export function stripLocaleFromPathname(pathname: string): string {
  const stripped = pathname.replace(localePrefixRegex, "")
  return stripped.length > 0 ? stripped : "/"
}

export function withLocalePath(locale: Locale, pathname: string = "/"): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`

  if (normalizedPath === "/") {
    return `/${locale}`
  }

  return `/${locale}${normalizedPath}`
}

export function replaceLocaleInPathname(pathname: string, locale: Locale): string {
  const pathWithoutLocale = stripLocaleFromPathname(pathname)
  return withLocalePath(locale, pathWithoutLocale)
}

export function detectLocaleFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return defaultLocale

  const languages = header.split(",").map((entry) => {
    const [code] = entry.trim().split(";")
    return code.trim().toLowerCase()
  })

  for (const language of languages) {
    const short = language.slice(0, 2)
    if (short === "uk" || short === "ru") return "uk"
    if (short === "en") return "en"
  }

  return defaultLocale
}

export function resolvePreferredLocale({
  cookieLocale,
  acceptLanguage,
}: {
  cookieLocale: string | null | undefined
  acceptLanguage: string | null | undefined
}): Locale {
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale
  }

  return detectLocaleFromAcceptLanguage(acceptLanguage)
}

export function buildLocalizedAlternates(
  pathname: string,
  baseUrl: string
): Record<string, string> {
  const pathWithoutLocale = stripLocaleFromPathname(pathname)

  return Object.fromEntries(
    locales.map((locale) => [locale, `${baseUrl}${withLocalePath(locale, pathWithoutLocale)}`])
  )
}
