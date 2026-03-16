import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Store, Clock3, ShoppingBag, ShieldCheck } from "lucide-react"
import { isValidLocale, siteUrl } from "@/lib/i18n/config"
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing"
import { ensureLocale } from "@/lib/i18n/server"
import { Button } from "@/components/ui/button"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  const pathname = "/vinted-in-stock"

  const title =
    locale === "uk"
      ? "Vinted: товари в наявності та купити зараз"
      : "Vinted seller profile: in-stock items and buy now"

  const description =
    locale === "uk"
      ? "Окрема сторінка Buyer Italia для Vinted: товари в наявності, купити зараз, resale/pre-owned позиції та швидкий перехід у профіль продавця."
      : "Buyer Italia Vinted page: in-stock items, buy now options, resale/pre-owned listings, and quick access to the seller profile."

  const keywords =
    locale === "uk"
      ? [
          "товари в наявності",
          "купити зараз",
          "Vinted профіль продавця",
          "Vinted продавець Італія",
          "resale одяг",
          "pre-owned одяг",
          "second hand брендовий одяг",
        ]
      : [
          "in-stock items",
          "buy now",
          "Vinted seller profile",
          "resale clothing",
          "pre-owned fashion",
          "second-hand branded clothes",
        ]

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  }
}

export default async function VintedInStockPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ensureLocale((await params).locale)
  const isUk = locale === "uk"

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isUk ? "Товари в наявності на Vinted" : "In-stock items on Vinted",
    description: isUk
      ? "Сторінка з переходом у Vinted профіль продавця Buyer Italia для купівлі товарів у наявності."
      : "Page with direct access to Buyer Italia Vinted seller profile for in-stock purchases.",
    url: `${siteUrl}${withLocalePath(locale, "/vinted-in-stock")}`,
    isPartOf: siteUrl,
    inLanguage: isUk ? "uk" : "en",
    mainEntity: {
      "@type": "Organization",
      name: "Buyer Italia",
      sameAs: [
        "https://www.vinted.it/member/85835210-raisaob",
        "https://t.me/buyer_italia_shop",
      ],
    },
  }

  return (
    <main id="main-content" className="px-4 py-12 md:px-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href={withLocalePath(locale)}>
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            {isUk ? "На головну" : "Back to home"}
          </Link>
        </Button>

        <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
          {isUk ? "Товари в наявності на Vinted: купити зараз" : "In-stock items on Vinted: buy now"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isUk
            ? "Це сторінка для швидкого переходу у Vinted профіль продавця. Тут ви знайдете товари в наявності, які можна купити зараз, включно з resale/pre-owned позиціями."
            : "This page gives quick access to the Vinted seller profile with in-stock items you can buy now, including resale/pre-owned listings."}
        </p>

        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            {isUk ? "Перейти у Vinted профіль продавця" : "Open Vinted seller profile"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isUk
              ? "Актуальні лоти, наявність і ціни оновлюються у профілі."
              : "Current listings, availability, and prices are updated in the profile."}
          </p>
          <div className="mt-5">
            <Button size="lg" className="gap-2" asChild>
              <a
                href="https://www.vinted.it/member/85835210-raisaob"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Vinted profile raisaob"
              >
                <Store className="size-5" aria-hidden="true" />
                {isUk ? "Відкрити Vinted: raisaob" : "Open Vinted: raisaob"}
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-labelledby="in-stock-signals">
          <h2 id="in-stock-signals" className="sr-only">
            {isUk ? "Сигнали для покупки" : "Buy-now signals"}
          </h2>
          <article className="rounded-2xl border bg-card p-5">
            <ShoppingBag className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Товари в наявності" : "In-stock items"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk ? "Оберіть позицію, яка доступна прямо зараз." : "Choose an item that is available right now."}
            </p>
          </article>
          <article className="rounded-2xl border bg-card p-5">
            <Clock3 className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">{isUk ? "Купити зараз" : "Buy now"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Швидкий формат покупки без очікування нового викупу."
                : "Fast purchase flow without waiting for a new sourcing cycle."}
            </p>
          </article>
          <article className="rounded-2xl border bg-card p-5">
            <ShieldCheck className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">Resale / pre-owned</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Добірка перевірених pre-owned товарів у Vinted профілі продавця."
                : "Curated resale and pre-owned pieces in the Vinted seller profile."}
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            {isUk ? "Корисні сторінки" : "Useful pages"}
          </h2>
          <nav className="mt-4" aria-label={isUk ? "Корисні сторінки" : "Useful pages"}>
            <ul className="flex flex-wrap gap-3">
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/delivery-from-italy")}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
                >
                  {isUk ? "Доставка з Італії" : "Delivery from Italy"}
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/brands-from-italy")}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
                >
                  {isUk ? "Бренди з Італії" : "Brands from Italy"}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </main>
  )
}
