import { buildPageMetadata } from "@/lib/seo/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
  Wallet,
  MessagesSquare,
  MapPinned,
} from "lucide-react";
import { isValidLocale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import { isCatalogEnabled } from "@/lib/storefront/catalog-visibility";
import { Button } from "@/components/ui/button";
import { ItalinoLink } from "@/components/italino-link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const pathname = "/delivery-from-italy";
  const title =
    locale === "uk"
      ? "Доставка з Італії в Україну та Європу"
      : "Delivery from Italy to Ukraine & Europe";
  const description =
    locale === "uk"
      ? "Доставка покупок з Італії в Україну та Європу: зазвичай близько €10 за посилку. Строки після викупу, фото товару й точний розрахунок до оплати."
      : "Delivery of purchases from Italy to Ukraine and Europe, usually around €10 per parcel. Estimated timing, item photos and an exact quote before payment.";

  return buildPageMetadata({ locale, pathname, title, description });
}

export default async function DeliveryFromItalyPage({
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
            ? "Доставка покупок з Італії в Україну та Європу"
            : "Delivery from Italy to Ukraine and Europe"}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          {isUk
            ? "Ви обираєте річ — ми викуповуємо її в магазині Італії, надсилаємо фото й організовуємо доставку. Ця сторінка описує замовлення через баєра; для самостійних покупок є окрема послуга адреси в Італії."
            : "You choose the item. We buy it from a store in Italy, send photos and arrange delivery. This page covers personal shopping orders; purchases you make yourself have a separate Italian address service."}
        </p>

        <section
          className="mt-10 grid gap-4 sm:grid-cols-3"
          aria-labelledby="delivery-highlights-title"
        >
          <h2 id="delivery-highlights-title" className="sr-only">
            {isUk ? "Переваги доставки" : "Delivery highlights"}
          </h2>
          <article className="border-t border-border pt-5">
            <Package className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Фото перед відправкою" : "Photo before shipping"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Ви бачите реальний товар перед відправкою."
                : "You see the real product before shipping."}
            </p>
          </article>
          <article className="border-t border-border pt-5">
            <Truck className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Прозорі терміни" : "Clear timelines"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Після викупу: орієнтовно 7–10 днів до України, 10–14 — до інших країн Європи."
                : "After purchase: around 7–10 days to Ukraine or 10–14 days elsewhere in Europe."}
            </p>
          </article>
          <article className="border-t border-border pt-5">
            <ShieldCheck className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Оригінальність" : "Authenticity"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Закупівлі в офіційних магазинах Італії."
                : "Purchases in official Italian stores."}
            </p>
          </article>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
            {isUk ? "Як відбувається доставка" : "How delivery works"}
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-foreground/90">
            <li>
              {isUk
                ? "Надсилаєте запит у Telegram із посиланням на товар."
                : "Send a request in Telegram with a product link."}
            </li>
            <li>
              {isUk
                ? "Уточнюємо наявність, розмір і фінальну вартість."
                : "We confirm availability, size and final cost."}
            </li>
            <li>
              {isUk
                ? "Після покупки надсилаємо фото та готуємо відправку."
                : "After purchase we send photos and prepare shipment."}
            </li>
            <li>
              {isUk
                ? "Отримуєте трекінг і відстежуєте доставку."
                : "You get tracking and monitor delivery."}
            </li>
          </ol>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground">
            {isUk
              ? "Не хочете чекати викупу? У нашому магазині Italino можна обрати речі з наявності в Італії. Замовлення оформлюєте на окремому сайті, відправлення в Україну — щотижня:"
              : "Prefer to shop from stock? Browse items held in Italy at our separate shop Italino. Order on its website, with weekly dispatches to Ukraine (the shop is in Ukrainian):"}{" "}
            <ItalinoLink
              placement="delivery_page"
              label="italino.shop"
              className="font-medium text-italy-green hover:underline"
            />
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-labelledby="delivery-details-title">
          <h2 id="delivery-details-title" className="sr-only">
            {isUk ? "Деталі доставки" : "Delivery details"}
          </h2>
          <article className="border-t border-border pt-5">
            <Wallet className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Що входить у фінальну суму" : "What is included in the final total"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Ціна товару, послуга баєра та доставка — зазвичай близько €10 за посилку. Точна вартість доставки залежить від ваги, розміру й напрямку; розрахунок погоджуємо до оплати."
                : "The item price, our shopping service and delivery, usually around €10 per parcel. The exact delivery cost depends on weight, size and destination. We agree the breakdown before payment."}
            </p>
          </article>
          <article className="border-t border-border pt-5">
            <MessagesSquare className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Що підготувати перед замовленням" : "What to prepare before ordering"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Посилання на товар, бренд, розмір, колір і країну доставки. Це пришвидшує підтвердження наявності."
                : "A product link, brand, size, color, and delivery country. This speeds up availability checks."}
            </p>
          </article>
          <article className="border-t border-border pt-5">
            <MapPinned className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Для яких країн підходить сервіс" : "Which countries the service fits"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Найчастіше відправляємо в Україну, Польщу, Німеччину, Чехію та інші країни Європи."
                : "Most often we ship to Ukraine, Poland, Germany, Czechia, and other European countries."}
            </p>
          </article>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
            {isUk ? "Кому підходить викуп із доставкою" : "Who our shopping and delivery service is for"}
          </h2>
          <ul className="mt-4 space-y-3 text-foreground/90">
            <li>
              {isUk
                ? "Тим, хто шукає конкретну модель у бренді на кшталт ZARA, Mango, COS або Massimo Dutti."
                : "People looking for a specific model from brands like ZARA, Mango, COS, or Massimo Dutti."}
            </li>
            <li>
              {isUk
                ? "Клієнтам, яким важливі підтвердження покупки та фото саме їхнього товару до відправки."
                : "Shoppers who want proof of purchase and photos of their actual item before dispatch."}
            </li>
            <li>
              {isUk
                ? "Покупцям, які хочуть замовити товар із розпродажів в Італії без самостійної логістики."
                : "Shoppers who want access to Italian sale items without handling logistics themselves."}
            </li>
          </ul>
        </section>

        <section
          className="mt-14 grid gap-6 border border-border bg-secondary/30 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8"
          aria-labelledby="address-in-italy-title"
        >
          <div>
            <p className="premium-eyebrow text-muted-foreground">
              {isUk ? "Купуєте самі?" : "Shopping yourself?"}
            </p>
            <h2
              id="address-in-italy-title"
              className="mt-4 font-serif text-3xl font-normal tracking-[-0.03em] text-foreground"
            >
              {isUk ? "Адреса в Італії для ваших покупок" : "An Italian address for your own purchases"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {isUk
                ? "Купуйте в магазинах і на маркетплейсах, які доставляють до Італії, зокрема з інших країн. Ми приймемо покупки на нашу адресу, сфотографуємо вміст і перешлемо в Україну. Прийом — €5 за посилку, відправка щонеділі."
                : "Shop at stores and marketplaces that deliver to Italy, including from other countries. We receive your purchases at our address, photograph the contents and forward them to Ukraine. Reception is €5 per parcel, with dispatch every Sunday."}
            </p>
          </div>
          <Link
            href={withLocalePath(locale, "/adresa-v-italii")}
            className="inline-flex items-center justify-center gap-3 border border-foreground px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
          >
            {isUk ? "Про адресу в Італії" : "About the address"}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
            {isUk ? "Корисні сторінки" : "Useful pages"}
          </h2>
          <nav className="mt-4" aria-label={isUk ? "Корисні сторінки" : "Useful pages"}>
            <ul className="flex flex-wrap gap-3">
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/brands-from-italy")}
                  className="inline-flex border border-foreground px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
                >
                  {isUk ? "Бренди з Італії" : "Brands from Italy"}
                </Link>
              </li>
              {isCatalogEnabled ? (
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/catalog")}
                    className="inline-flex border border-foreground px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
                  >
                    {isUk ? "Каталог товарів" : "Product catalog"}
                  </Link>
                </li>
              ) : null}
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/terms")}
                  className="inline-flex border border-foreground px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
                >
                  {isUk ? "Умови сервісу" : "Terms of service"}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </main>
  );
}
