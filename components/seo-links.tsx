import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { withLocalePath } from "@/lib/i18n/routing"

interface SeoLinksProps {
  locale: Locale
}

export function SeoLinks({ locale }: SeoLinksProps) {
  const isUk = locale === "uk"

  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border bg-card p-6">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          {isUk ? "Корисні сторінки про сервіс" : "Useful service pages"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isUk
            ? "Деталі про бренди, доставку та замовлення з Італії."
            : "Details about brands, delivery and ordering from Italy."}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={withLocalePath(locale, "/delivery-from-italy")}
            className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
          >
            {isUk ? "Доставка з Італії" : "Delivery from Italy"}
          </Link>
          <Link
            href={withLocalePath(locale, "/brands-from-italy")}
            className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
          >
            {isUk ? "Бренди з Італії" : "Brands from Italy"}
          </Link>
          <Link
            href={withLocalePath(locale, "/catalog")}
            className="rounded-full border px-4 py-2 text-sm hover:bg-secondary"
          >
            {isUk ? "Каталог товарів" : "Product catalog"}
          </Link>
        </div>
      </div>
    </section>
  )
}
