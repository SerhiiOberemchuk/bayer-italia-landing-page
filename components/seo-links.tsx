import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { isCatalogEnabled } from "@/lib/storefront/catalog-visibility";
import { ItalinoLink } from "@/components/italino-link";

interface SeoLinksProps {
  locale: Locale;
}

export function SeoLinks({ locale }: SeoLinksProps) {
  const isUk = locale === "uk";

  return (
    <section
      className="px-4 py-16 md:px-8 md:py-20"
      aria-labelledby="seo-links-title"
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 border-y border-border py-8 md:grid-cols-[0.8fr_1.2fr] md:items-start md:py-10">
        <div>
          <p className="premium-eyebrow text-muted-foreground">Buyer Italia</p>
          <h2
            id="seo-links-title"
            className="mt-4 font-serif text-3xl font-normal tracking-[-0.035em] text-foreground md:text-4xl"
          >
            {isUk
              ? "Оберіть, як купувати з Італії"
              : "Choose how to shop from Italy"}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            {isUk
              ? "Потрібен викуп — зверніться до баєра. Купуєте самі — отримайте адресу в Італії. Шукаєте готові речі — перегляньте Italino."
              : "Need us to buy for you? Ask our personal shopper. Shopping yourself? Get an address in Italy. For items already in stock, browse Italino."}
          </p>
        </div>

        <nav
          aria-label={isUk ? "Послуги Buyer Italia" : "Buyer Italia services"}
        >
          <ul className="divide-y divide-border border-y border-border">
            <li className="list-none py-5">
              <a
                href="https://t.me/raisa_orb"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.14em]"
              >
                {isUk ? "Викуп через баєра" : "Personal shopping"}
                <ArrowRight
                  className="size-4 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {isUk
                  ? "Надішліть посилання, розмір і колір — ми перевіримо наявність, викупимо й доставимо."
                  : "Send our shopper a link, size and colour. We will check availability, buy and arrange delivery."}
              </p>
            </li>
            <li className="list-none py-5">
              <Link
                href={withLocalePath(locale, "/adresa-v-italii")}
                className="group flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.14em]"
              >
                {isUk
                  ? "Адреса в Італії для ваших покупок"
                  : "An Italian address for your purchases"}
                <ArrowRight
                  className="size-4 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {isUk
                  ? "Ви замовляєте самі з доставкою до Італії. Ми приймаємо посилки й пересилаємо в Україну."
                  : "You order with delivery to Italy. We receive your parcels and forward them to Ukraine."}
              </p>
            </li>
            <li className="list-none">
              <Link
                href={withLocalePath(locale, "/delivery-from-italy")}
                className="group flex items-center justify-between py-5 text-xs font-medium uppercase tracking-[0.14em]"
              >
                {isUk ? "Доставка з Італії" : "Delivery from Italy"}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </li>
            <li className="list-none">
              <Link
                href={withLocalePath(locale, "/brands-from-italy")}
                className="group flex items-center justify-between py-5 text-xs font-medium uppercase tracking-[0.14em]"
              >
                {isUk ? "Бренди з Італії" : "Brands from Italy"}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </li>
            {isCatalogEnabled ? (
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/catalog")}
                  className="group flex items-center justify-between py-5 text-xs font-medium uppercase tracking-[0.14em]"
                >
                  {isUk ? "Каталог товарів" : "Product catalog"}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ) : null}
            <li className="list-none">
              <ItalinoLink
                placement="home_links"
                label={
                  isUk
                    ? "Готові речі в наявності — Italino"
                    : "Ready to ship — Italino"
                }
                className="flex w-full justify-between py-5 text-xs font-medium uppercase tracking-[0.14em] transition-opacity duration-300 hover:opacity-70"
              />
              <p className="pb-5 text-sm leading-6 text-muted-foreground">
                {isUk
                  ? "Окремий магазин речей із наявності. Замовлення оформлюєте безпосередньо на italino.shop."
                  : "Our separate shop for in-stock items. Order directly at italino.shop."}
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
