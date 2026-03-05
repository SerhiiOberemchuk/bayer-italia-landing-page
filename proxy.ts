import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  LOCALE_COOKIE_NAME,
  hasLocalePrefix,
  resolvePreferredLocale,
  withLocalePath,
} from "@/lib/i18n/routing"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (hasLocalePrefix(pathname)) return

  // Skip for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") // files like favicon.svg, etc.
  ) {
    return
  }

  const detectedLocale = resolvePreferredLocale({
    cookieLocale: request.cookies.get(LOCALE_COOKIE_NAME)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  })

  request.nextUrl.pathname = withLocalePath(detectedLocale, pathname)
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set(LOCALE_COOKIE_NAME, detectedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })

  return response
}

export const config = {
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
}
