import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isValidLocale, siteUrl } from "@/lib/i18n/config"
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing"
import { ensureLocale } from "@/lib/i18n/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  const pathname = "/terms"
  const title = locale === "uk" ? "Умови використання" : "Terms of Use"
  const description =
    locale === "uk"
      ? "Умови використання сервісу Buyer Italia."
      : "Terms of use of Buyer Italia service."

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ensureLocale((await params).locale)

  const isUk = locale === "uk"
  const lastUpdated = isUk ? "05.03.2026" : "March 5, 2026"

  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href={withLocalePath(locale)}>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 size-4" />
            {isUk ? "На головну" : "Back to home"}
          </Button>
        </Link>

        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          {isUk ? "Умови використання" : "Terms of Use"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isUk ? "Останнє оновлення:" : "Last updated:"}{" "}
          {lastUpdated}
        </p>

        {isUk ? (
          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">1. Загальні положення</h2>
              <p>
                Buyer Italia — це баєр-сервіс, який надає послуги з закупівлі оригінальних товарів
                в офіційних магазинах Італії та їх доставки клієнтам. Використовуючи наші послуги,
                ви погоджуєтесь з цими умовами.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Послуги</h2>
              <p className="mb-3">Ми надаємо наступні послуги:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Закупівля товарів у офіційних магазинах Італії (ZARA, Mango, COS, Massimo Dutti, Puma та інші)</li>
                <li>Фотозвіт закупленого товару</li>
                <li>Надання чеків та підтвердження оригінальності</li>
                <li>Доставка в Україну та країни Європи</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. Процес замовлення</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Надішліть посилання або фото бажаного товару через Telegram</li>
                <li>Ми перевіримо наявність та повідомимо фінальну вартість</li>
                <li>Після підтвердження здійсніть оплату</li>
                <li>Ми закупимо товар та надішлемо фотозвіт</li>
                <li>Товар буде відправлено на вказану адресу</li>
              </ol>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">4. Ціноутворення</h2>
              <p className="mb-3">Фінальна вартість замовлення включає:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Вартість товару в магазині</li>
                <li>Комісію сервісу</li>
                <li>Вартість доставки (розраховується окремо)</li>
              </ul>
              <p className="mt-3">
                Ціни вказуються в євро та можуть бути конвертовані в гривні за поточним курсом.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Оплата</h2>
              <p className="mb-3">Ми працюємо за системою 100% передоплати. Доступні способи оплати:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Банківська картка (Україна)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Доставка</h2>
              <p className="mb-3">Терміни доставки:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Україна (Нова пошта):</strong> 7-10 робочих днів</li>
                <li><strong>Європа:</strong> 10-14 робочих днів</li>
              </ul>
              <p className="mt-3">
                Після відправлення ви отримаєте трекінг-номер для відстеження посилки.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">7. Повернення та обмін</h2>
              <p className="mb-3">
                Оскільки ми працюємо як баєр-сервіс, стандартне повернення товару неможливе.
                Однак ми гарантуємо:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ретельну перевірку товару перед відправкою</li>
                <li>Фотозвіт з усіма деталями</li>
                <li>Допомогу у виборі правильного розміру</li>
                <li>Повернення коштів у разі неможливості закупки товару</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">8. Гарантія оригінальності</h2>
              <p>
                Ми гарантуємо 100% оригінальність усіх товарів, оскільки закуповуємо їх виключно
                в офіційних магазинах Італії. Кожне замовлення супроводжується фото з магазину
                та оригінальним чеком.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">9. Відповідальність</h2>
              <p>
                Ми не несемо відповідальності за затримки доставки, спричинені митними органами
                або службами доставки. У разі пошкодження товару під час транспортування,
                будь ласка, зверніться до нас негайно з фотодоказами.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">10. Контакти</h2>
              <p>
                З усіх питань звертайтесь через Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
                {" "}або в наш канал: <a href="https://t.me/buyer_italia_shop" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@buyer_italia_shop</a>
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">1. General Provisions</h2>
              <p>
                Buyer Italia is a buyer service that provides purchasing of original goods
                from official Italian stores and delivering them to clients. By using our services,
                you agree to these terms.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Services</h2>
              <p className="mb-3">We provide the following services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Purchasing goods from official Italian stores (ZARA, Mango, COS, Massimo Dutti, Puma and others)</li>
                <li>Photo report of purchased goods</li>
                <li>Providing receipts and authenticity confirmation</li>
                <li>Delivery to Ukraine and European countries</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. Ordering Process</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Send a link or photo of the desired item via Telegram</li>
                <li>We will check availability and provide the final price</li>
                <li>After confirmation, make the payment</li>
                <li>We will purchase the item and send a photo report</li>
                <li>The item will be shipped to the specified address</li>
              </ol>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">4. Pricing</h2>
              <p className="mb-3">The final order cost includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Item price in the store</li>
                <li>Service commission</li>
                <li>Delivery cost (calculated separately)</li>
              </ul>
              <p className="mt-3">
                Prices are quoted in euros and can be converted to Ukrainian hryvnia at the current exchange rate.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Payment</h2>
              <p className="mb-3">We work with a 100% prepayment system. Available payment methods:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bank card (Ukraine)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Delivery</h2>
              <p className="mb-3">Delivery timeframes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ukraine (Nova Poshta):</strong> 7-10 business days</li>
                <li><strong>Europe:</strong> 10-14 business days</li>
              </ul>
              <p className="mt-3">
                After shipping, you will receive a tracking number to track your parcel.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">7. Returns and Exchanges</h2>
              <p className="mb-3">
                Since we operate as a buyer service, standard product returns are not possible.
                However, we guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Careful inspection of the item before shipping</li>
                <li>Detailed photo report</li>
                <li>Assistance in choosing the right size</li>
                <li>Refund if the item cannot be purchased</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">8. Authenticity Guarantee</h2>
              <p>
                We guarantee 100% authenticity of all items, as we purchase them exclusively
                from official Italian stores. Each order is accompanied by photos from the store
                and an original receipt.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">9. Liability</h2>
              <p>
                We are not responsible for delivery delays caused by customs authorities
                or delivery services. In case of item damage during transportation,
                please contact us immediately with photo evidence.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">10. Contact</h2>
              <p>
                For all inquiries, contact us via Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
                {" "}or our channel: <a href="https://t.me/buyer_italia_shop" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@buyer_italia_shop</a>
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}

