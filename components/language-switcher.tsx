"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import {
  LOCALE_COOKIE_NAME,
  replaceLocaleInPathname,
} from "@/lib/i18n/routing";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const newPath = replaceLocaleInPathname(pathname, newLocale);
    const query = searchParams.toString();

    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale};path=/;max-age=31536000;samesite=lax`;
    router.push(query ? `${newPath}?${query}` : newPath);
  };

  return (
    <div className="flex items-center rounded-lg border bg-card overflow-hidden">
      <button
        onClick={() => switchLocale("uk")}
        className={`px-2.5 py-1.5 text-xs font-medium  transition-colors ${
          locale === "uk"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground hover:cursor-pointer"
        }`}
        aria-label="Українська"
      >
        UA
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2.5 py-1.5 text-xs  font-medium transition-colors ${
          locale === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground hover:cursor-pointer"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
