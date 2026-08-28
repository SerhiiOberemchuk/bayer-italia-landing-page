import { Suspense } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { BuyerItaliaLogo } from "@/components/buyer-italia-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CartLink } from "@/components/cart/cart-link";
import { MobileMenu } from "@/components/mobile-menu";
import type { Dictionary } from "@/lib/i18n/dictionary";

interface SiteHeaderProps {
  locale: Locale;
  topBar: Dictionary["hero"]["topBar"];
}

export function PremiumSiteHeader({ locale, topBar }: SiteHeaderProps) {
  const isUk = locale === "uk";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md">
      <div className="bg-foreground px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-background sm:text-[11px]">
        <span className="sm:hidden">{isUk ? "100% оригінал · Італія" : "100% authentic · Italy"}</span>
        <span className="hidden sm:inline">{topBar.directPurchases} · {topBar.original}</span>
      </div>
      <div className="border-b border-border/80 px-4 md:px-8">
        <div className="mx-auto grid h-16 max-w-[1480px] grid-cols-[1fr_auto_1fr] items-center lg:hidden">
          <div className="justify-self-start">
            <Suspense
              fallback={
                <div
                  className="inline-flex size-10 items-center justify-center"
                  aria-hidden="true"
                >
                  <Menu className="size-5" strokeWidth={1.5} />
                </div>
              }
            >
              <MobileMenu locale={locale} />
            </Suspense>
          </div>
          <Link
            href={withLocalePath(locale)}
            aria-label={isUk ? "Головна Buyer Italia" : "Buyer Italia home"}
            className="col-start-2"
          >
            <BuyerItaliaLogo size="sm" />
          </Link>
          <div className="col-start-3 justify-self-end">
            <CartLink locale={locale} />
          </div>
        </div>

        <div className="mx-auto hidden h-[72px] max-w-[1480px] grid-cols-[1fr_auto_1fr] items-center lg:grid">
          <nav className="flex items-center gap-7" aria-label={isUk ? "Основна навігація" : "Primary navigation"}>
            <Link className="premium-nav-link" href={withLocalePath(locale, "/catalog")}>
              {isUk ? "Магазин" : "Shop"}
            </Link>
            <Link
              className="premium-nav-link"
              href={withLocalePath(locale, "/delivery-from-italy")}
            >
              {isUk ? "Доставка" : "Delivery"}
            </Link>
            <a
              className="premium-nav-link"
              href="https://t.me/raisa_orb"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isUk ? "Під замовлення" : "Personal order"}
            </a>
          </nav>

          <Link
            href={withLocalePath(locale)}
            aria-label={isUk ? "Головна Buyer Italia" : "Buyer Italia home"}
            className="col-start-2"
          >
            <BuyerItaliaLogo size="sm" />
          </Link>

          <nav className="col-start-3 flex items-center justify-end gap-1" aria-label={isUk ? "Дії у шапці" : "Header actions"}>
            <Suspense fallback={null}>
              <LanguageSwitcher locale={locale} />
            </Suspense>
            <CartLink locale={locale} />
          </nav>
        </div>
      </div>
    </header>
  );
}
