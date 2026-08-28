import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Tag, CheckCircle2, Layers3, Send, SearchCheck } from "lucide-react";
import { isValidLocale, siteUrl } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import { Button } from "@/components/ui/button";

const BRANDS = [
  "ZARA",
  "Mango",
  "Massimo Dutti",
  "COS",
  "Nike",
  "Adidas",
  "Calvin Klein",
  "Tommy Hilfiger",
  "Pinko",
  "Furla",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const pathname = "/brands-from-italy";
  const title =
    locale === "uk"
      ? "Бренди з Італії: ZARA, Mango, COS, Nike"
      : "Italian brands: ZARA, Mango, COS, Nike";
  const description =
    locale === "uk"
      ? "Огляд брендів, які замовляє Buyer Italia, та як ми перевіряємо оригінальність товарів перед доставкою."
      : "Overview of brands sourced by Buyer Italia and how we verify authenticity before shipping.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  };
}

export default async function BrandsFromItalyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = ensureLocale((await params).locale);
  const isUk = locale === "uk";

  return (
    <main id="main-content" className="px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1100px]">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href={withLocalePath(locale)}>
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            {isUk ? "На головну" : "Back to home"}
          </Link>
        </Button>

        <h1 className="max-w-[18ch] font-serif text-4xl font-normal leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl">
          {isUk
            ? "Бренди з Італії: що можна замовити через Buyer Italia"
            : "Brands from Italy: what you can order with Buyer Italia"}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          {isUk
            ? "Працюємо з мас-маркет і premium-брендами, купуємо товари в офіційних магазинах та надсилаємо фото перед відправкою."
            : "We work with mass-market and premium brands, purchase in official stores and send photo reports before shipping."}
        </p>

        <section className="mt-14 border-y border-border py-8">
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
            {isUk ? "Популярні бренди" : "Popular brands"}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {BRANDS.map((brand) => (
              <li
                key={brand}
                className="inline-flex list-none items-center border border-border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.1em]"
              >
                <Tag className="mr-1.5 size-3.5" aria-hidden="true" />
                {brand}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-labelledby="brand-groups-title">
          <h2 id="brand-groups-title" className="sr-only">
            {isUk ? "Групи брендів" : "Brand groups"}
          </h2>
          <article className="border-t border-border pt-5">
            <Layers3 className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">Mass market</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              ZARA, Mango, Bershka, Pull & Bear, Stradivarius, H&M.
            </p>
          </article>
          <article className="border-t border-border pt-5">
            <Tag className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">Premium</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Massimo Dutti, Calvin Klein, Tommy Hilfiger, Pinko, Liu Jo, MAX&Co.
            </p>
          </article>
          <article className="border-t border-border pt-5">
            <SearchCheck className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Під запит" : "On request"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Якщо потрібного бренду немає в списку, можна надіслати посилання або фото для перевірки."
                : "If your brand is not listed, you can send a link or photo for sourcing review."}
            </p>
          </article>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
            {isUk ? "Як ми перевіряємо оригінальність" : "How we verify authenticity"}
          </h2>
          <ul className="mt-4 space-y-2 text-foreground/90">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 text-italy-green" aria-hidden="true" />
              <span>
                {isUk
                  ? "Закуповуємо тільки в офіційних магазинах Італії."
                  : "We buy only in official Italian stores."}
              </span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 text-italy-green" aria-hidden="true" />
              <span>
                {isUk
                  ? "Надсилаємо фото та деталі товару перед відправкою."
                  : "We share product photos and details before shipping."}
              </span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 text-italy-green" aria-hidden="true" />
              <span>
                {isUk
                  ? "Підтверджуємо фінальну ціну до оплати."
                  : "We confirm final pricing before payment."}
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
            {isUk ? "Як замовити бренд під запит" : "How to request a brand"}
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-foreground/90">
            <li>
              {isUk
                ? "Надішліть посилання на товар або фото моделі, яка вас цікавить."
                : "Send a product link or a photo of the item you want."}
            </li>
            <li>
              {isUk
                ? "Уточніть розмір, колір і країну доставки."
                : "Specify size, color, and delivery country."}
            </li>
            <li>
              {isUk
                ? "Ми перевіримо наявність у магазинах Італії та назвемо фінальну суму до оплати."
                : "We check availability in Italian stores and confirm the final total before payment."}
            </li>
          </ol>
          <div className="mt-6">
            <a
              href="https://t.me/raisa_orb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center gap-3 bg-foreground px-7 text-[11px] font-medium uppercase tracking-[0.15em] text-background transition-colors hover:bg-[#34322f]"
            >
              <Send className="size-4" aria-hidden="true" />
              {isUk ? "Запитати про свій бренд" : "Ask about your brand"}
            </a>
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
            {isUk ? "Корисні сторінки" : "Useful pages"}
          </h2>
          <nav className="mt-4" aria-label={isUk ? "Корисні сторінки" : "Useful pages"}>
            <ul className="flex flex-wrap gap-3">
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/delivery-from-italy")}
                  className="inline-flex border border-foreground px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
                >
                  {isUk ? "Доставка з Італії" : "Delivery from Italy"}
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/catalog")}
                  className="inline-flex border border-foreground px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
                >
                  {isUk ? "Каталог товарів" : "Product catalog"}
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/privacy")}
                  className="inline-flex border border-foreground px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
                >
                  {isUk ? "Політика конфіденційності" : "Privacy policy"}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </main>
  );
}
