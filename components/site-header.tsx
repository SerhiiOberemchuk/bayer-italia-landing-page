import { Suspense } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { BuyerItaliaLogo } from "@/components/buyer-italia-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionary";

interface SiteHeaderProps {
  locale: Locale;
  topBar: Dictionary["hero"]["topBar"];
}

export function SiteHeader({ locale, topBar }: SiteHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm px-4 py-4 md:px-8 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={withLocalePath(locale)}>
            <BuyerItaliaLogo size="sm" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <span>{topBar.directPurchases}</span>
            <span className="w-1 h-1 rounded-full bg-italy-green" />
            <span>{topBar.original}</span>
            <span className="w-1 h-1 rounded-full bg-italy-red" />
            <span>{topBar.delivery}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Suspense fallback={null}>
            <LanguageSwitcher locale={locale} />
          </Suspense>
          <Button
            size="sm"
            className="bg-[#0088cc] hover:bg-[#0077b5] text-white gap-1.5"
            asChild
          >
            <a
              href="https://t.me/buyer_italia_shop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="size-4" />
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
