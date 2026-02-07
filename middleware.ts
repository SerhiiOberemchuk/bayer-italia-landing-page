import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "@/lib/i18n/config"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Skip for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") // files like favicon.svg, etc.
  ) {
    return
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || ""
  let detectedLocale = defaultLocale

  // Check cookie first (user preference)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
    detectedLocale = cookieLocale as typeof locales[number]
  } else if (acceptLanguage) {
    // Parse Accept-Language header
    const languages = acceptLanguage.split(",").map((lang) => {
      const [code] = lang.trim().split(";")
      return code.trim().toLowerCase()
    })

    for (const lang of languages) {
      const shortLang = lang.substring(0, 2)
      if (shortLang === "uk" || shortLang === "ru") {
        detectedLocale = "uk"
        break
      }
      if (shortLang === "en") {
        detectedLocale = "en"
        break
      }
    }
  }

  // Redirect to locale path
  request.nextUrl.pathname = `/${detectedLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
}
