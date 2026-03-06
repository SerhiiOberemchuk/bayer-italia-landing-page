"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Locale } from "@/lib/i18n/config"
import { replaceLocaleInPathname } from "@/lib/i18n/routing"

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const currentPath = pathname || "/"
  const navLabel = locale === "uk" ? "Вибір мови" : "Language switcher"

  return (
    <nav aria-label={navLabel}>
      <ul className="flex items-center overflow-hidden rounded-lg border bg-card">
        <li className="list-none">
          <Link
            href={replaceLocaleInPathname(currentPath, "uk")}
            prefetch={false}
            hrefLang="uk"
            lang="uk"
            className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
              locale === "uk"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Switch language to Ukrainian"
            aria-current={locale === "uk" ? "page" : undefined}
          >
            UA
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={replaceLocaleInPathname(currentPath, "en")}
            prefetch={false}
            hrefLang="en"
            lang="en"
            className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
              locale === "en"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Switch language to English"
            aria-current={locale === "en" ? "page" : undefined}
          >
            EN
          </Link>
        </li>
      </ul>
    </nav>
  )
}
