"use client"

import { usePathname, useRouter } from "next/navigation"
import type { Locale } from "@/lib/i18n/config"

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    // Replace current locale in pathname
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
    router.push(newPath)
  }

  return (
    <div className="flex items-center rounded-lg border bg-card overflow-hidden">
      <button
        onClick={() => switchLocale("uk")}
        className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
          locale === "uk"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Українська"
      >
        UA
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
          locale === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
