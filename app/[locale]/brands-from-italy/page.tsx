import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Tag, CheckCircle2 } from "lucide-react"
import { isValidLocale, siteUrl } from "@/lib/i18n/config"
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing"
import { ensureLocale } from "@/lib/i18n/server"
import { Button } from "@/components/ui/button"

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
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  const pathname = "/brands-from-italy"
  const title =
    locale === "uk"
      ? "Бренди з Італії: ZARA, Mango, COS, Nike | Buyer Italia"
      : "Italian Brands: ZARA, Mango, COS, Nike | Buyer Italia"
  const description =
    locale === "uk"
      ? "Огляд брендів, які замовляє Buyer Italia, та як ми перевіряємо оригінальність товарів перед доставкою."
      : "Overview of brands sourced by Buyer Italia and how we verify authenticity before shipping."

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  }
}

export default async function BrandsFromItalyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ensureLocale((await params).locale)
  const isUk = locale === "uk"

  return (
    <main id="main-content" className="px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href={withLocalePath(locale)}>
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            {isUk ? "На головну" : "Back to home"}
          </Link>
        </Button>

        <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
          {isUk
            ? "Бренди з Італії: що можна замовити через Buyer Italia"
            : "Brands from Italy: what you can order with Buyer Italia"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isUk
            ? "Працюємо з мас-маркет і premium-брендами, купуємо товари в офіційних магазинах та надсилаємо фото перед відправкою."
            : "We work with mass-market and premium brands, purchase in official stores and send photo reports before shipping."}
        </p>

        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            {isUk ? "Популярні бренди" : "Popular brands"}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {BRANDS.map((brand) => (
              <li
                key={brand}
                className="list-none inline-flex items-center rounded-full border px-3 py-1.5 text-sm"
              >
                <Tag className="mr-1.5 size-3.5" aria-hidden="true" />
                {brand}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
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
                  href={withLocalePath(locale, "/catalog")}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
                >
                  {isUk ? "Каталог товарів" : "Product catalog"}
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/privacy")}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
                >
                  {isUk ? "Політика конфіденційності" : "Privacy policy"}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </main>
  )
}
