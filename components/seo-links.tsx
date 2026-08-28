import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

interface SeoLinksProps {
  locale: Locale;
}

export function SeoLinks({ locale }: SeoLinksProps) {
  const isUk = locale === "uk";

  return (
    <section className="px-4 py-16 md:px-8 md:py-20" aria-labelledby="seo-links-title">
      <div className="mx-auto grid max-w-[1280px] gap-10 border-y border-border py-8 md:grid-cols-[0.8fr_1.2fr] md:items-start md:py-10">
        <div>
          <p className="premium-eyebrow text-muted-foreground">Buyer Italia</p>
          <h2 id="seo-links-title" className="mt-4 font-serif text-3xl font-normal tracking-[-0.035em] text-foreground md:text-4xl">
            {isUk ? "Корисні сторінки сервісу" : "Useful service pages"}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            {isUk
              ? "Деталі про бренди, доставку та каталог товарів сервісу."
              : "Details about brands, delivery, and the product catalog."}
          </p>
        </div>

        <nav aria-label="Internal service links">
          <ul className="divide-y divide-border border-y border-border">
            <li className="list-none">
              <Link
                href={withLocalePath(locale, "/delivery-from-italy")}
                className="group flex items-center justify-between py-5 text-xs font-medium uppercase tracking-[0.14em]"
              >
                {isUk ? "Доставка з Італії" : "Delivery from Italy"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                href={withLocalePath(locale, "/brands-from-italy")}
                className="group flex items-center justify-between py-5 text-xs font-medium uppercase tracking-[0.14em]"
              >
                {isUk ? "Бренди з Італії" : "Brands from Italy"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                href={withLocalePath(locale, "/catalog")}
                className="group flex items-center justify-between py-5 text-xs font-medium uppercase tracking-[0.14em]"
              >
                {isUk ? "Каталог товарів" : "Product catalog"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
