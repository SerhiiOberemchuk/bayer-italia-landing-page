import { notFound } from "next/navigation"
import { isValidLocale, type Locale } from "./config"

export function ensureLocale(locale: string): Locale {
  if (!isValidLocale(locale)) {
    notFound()
  }

  return locale
}
