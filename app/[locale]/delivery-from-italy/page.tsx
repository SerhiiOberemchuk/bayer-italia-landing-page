import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Package, Truck, ShieldCheck } from "lucide-react"
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

  const pathname = "/delivery-from-italy"
  const title =
    locale === "uk"
      ? "Доставка з Італії в Україну та Європу"
      : "Delivery from Italy to Ukraine & Europe"
  const description =
    locale === "uk"
      ? "Терміни, вартість і процес доставки оригінального одягу з Італії. Buyer Italia: прозорі умови, фото перед відправкою, підтримка в Telegram."
      : "Delivery terms, costs and process for original clothing from Italy. Buyer Italia: transparent terms, photo report before shipping, Telegram support."

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  }
}

export default async function DeliveryFromItalyPage({
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
            ? "Доставка одягу з Італії в Україну та Європу"
            : "Delivery from Italy to Ukraine and Europe"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isUk
            ? "Buyer Italia допомагає купувати оригінальні речі в італійських магазинах і безпечно доставляти їх в Україну та країни Європи."
            : "Buyer Italia helps you buy original items in Italian stores and safely deliver them to Ukraine and European countries."}
        </p>

        <section
          className="mt-10 grid gap-4 sm:grid-cols-3"
          aria-labelledby="delivery-highlights-title"
        >
          <h2 id="delivery-highlights-title" className="sr-only">
            {isUk ? "Переваги доставки" : "Delivery highlights"}
          </h2>
          <article className="rounded-2xl border bg-card p-5">
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
          <article className="rounded-2xl border bg-card p-5">
            <Truck className="size-5 text-italy-green" aria-hidden="true" />
            <h3 className="mt-3 font-medium text-foreground">
              {isUk ? "Прозорі терміни" : "Clear timelines"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isUk
                ? "Орієнтовно 7-10 днів в Україну, 10-14 днів в Європу."
                : "Typically 7-10 days to Ukraine, 10-14 days to Europe."}
            </p>
          </article>
          <article className="rounded-2xl border bg-card p-5">
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

        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
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
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            {isUk ? "Корисні сторінки" : "Useful pages"}
          </h2>
          <nav className="mt-4" aria-label={isUk ? "Корисні сторінки" : "Useful pages"}>
            <ul className="flex flex-wrap gap-3">
              <li className="list-none">
                <Link
                  href={withLocalePath(locale, "/brands-from-italy")}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
                >
                  {isUk ? "Бренди з Італії" : "Brands from Italy"}
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
                  href={withLocalePath(locale, "/terms")}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
                >
                  {isUk ? "Умови сервісу" : "Terms of service"}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </main>
  )
}
