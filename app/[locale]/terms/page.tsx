import { buildPageMetadata } from "@/lib/seo/page-metadata";
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isValidLocale } from "@/lib/i18n/config"
import { withLocalePath } from "@/lib/i18n/routing"
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
      ? "Як оформити викуп через Buyer Italia: погодження ціни, передоплата, доставка, повернення та окремі умови послуги адреси в Італії."
      : "Ordering with Buyer Italia: agreed prices, prepayment, delivery, returns and separate conditions for the Address in Italy service."

  return buildPageMetadata({ locale, pathname, title, description })
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ensureLocale((await params).locale)

  const isUk = locale === "uk"
  const lastUpdated = isUk ? "30.10.2026" : "October 30, 2026"

  return (
    <main id="main-content" className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href={withLocalePath(locale)}>
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            {isUk ? "На головну" : "Back to home"}
          </Link>
        </Button>

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
                Buyer Italia — це баєр-сервіс, який надає послуги із закупівлі оригінальних товарів
                в офіційних магазинах Італії та їх доставки клієнтам. Використовуючи наші послуги,
                ви погоджуєтесь з цими умовами.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Послуги</h2>
              <p className="mb-3">Ми надаємо такі послуги:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Закупівля товарів в офіційних магазинах Італії (ZARA, Mango, COS, Massimo Dutti, Puma та інші)</li>
                <li>Фотозвіт закупленого товару</li>
                <li>Надання чеків та підтвердження оригінальності</li>
                <li>Доставка в Україну та країни Європи</li>
              </ul>
              <p className="mt-3">
                Для самостійних покупок є окрема послуга{" "}
                <Link href={withLocalePath(locale, "/adresa-v-italii")} className="text-italy-green hover:underline">«Адреса в Італії»</Link>.
                На її сторінці описані тарифи, зберігання й умови пересилки. Звертайтеся до{" "}
                <a href="https://t.me/SerhiiOberemchuk" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@SerhiiOberemchuk</a>.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. Замовлення через баєра</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Надішліть посилання на бажаний товар через Telegram</li>
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
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Оплата викупу</h2>
              <p className="mb-3">Ми працюємо за системою 100% передоплати. Доступні способи оплати:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Банківська картка (Україна)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Доставка</h2>
              <p className="mb-3">Орієнтовні строки для замовлень через баєра:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Україна (Нова пошта):</strong> орієнтовно 7–10 днів після викупу</li>
                <li><strong>Європа:</strong> орієнтовно 10–14 днів після викупу</li>
              </ul>
              <p className="mt-3">
                Після відправлення ви отримаєте трекінг-номер для відстеження посилки.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">7. Повернення та обмін</h2>
              <p className="mb-3">
                Умови повернення та обміну залежать від продавця, способу покупки й застосовного
                законодавства. До викупу уточнюємо порядок і строки для вашого замовлення.
                Якщо виникла проблема, зверніться до нас. Ми надаємо:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ретельну перевірку товару перед відправкою</li>
                <li>Фотозвіт з усіма деталями</li>
                <li>Допомогу у виборі правильного розміру</li>
                <li>Повернення коштів, сплачених за товар, який неможливо придбати</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">8. Гарантія оригінальності</h2>
              <p>
                Товари, які викуповуємо для вас через баєра, купуємо у брендів та перевірених
                магазинів Італії. Надсилаємо фото речі та чек або інше підтвердження покупки.
                Для самостійних покупок на нашу адресу продавця обираєте ви; огляд посилки
                не є експертизою оригінальності.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">9. Відповідальність</h2>
              <p>
                Фактичні строки можуть змінюватися через роботу перевізника або митне оформлення. Якщо доставка затримується або товар пошкоджено, напишіть нам і додайте дані відправлення та фото — перевіримо обставини й допоможемо з подальшими діями.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">10. Контакти</h2>
              <p>
                Щодо викупу звертайтеся в Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
                {" "}Пропозиції публікуємо в каналі: <a href="https://t.me/buyer_italia_shop" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@buyer_italia_shop</a>
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
              <p className="mt-3">
                For purchases you make yourself, use our separate{" "}
                <Link href={withLocalePath(locale, "/adresa-v-italii")} className="text-italy-green hover:underline">Address in Italy service</Link>.
                Its page explains rates, storage and forwarding conditions. Contact{" "}
                <a href="https://t.me/SerhiiOberemchuk" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@SerhiiOberemchuk</a>.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. Ordering through our personal shopper</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Send a link to the desired item via Telegram</li>
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
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Payment for personal shopping</h2>
              <p className="mb-3">We work with a 100% prepayment system. Available payment methods:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bank card (Ukraine)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Delivery</h2>
              <p className="mb-3">Estimated timing for personal shopping orders:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ukraine (Nova Poshta):</strong> around 7–10 days after purchase</li>
                <li><strong>Europe:</strong> around 10–14 days after purchase</li>
              </ul>
              <p className="mt-3">
                After shipping, you will receive a tracking number to track your parcel.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">7. Returns and Exchanges</h2>
              <p className="mb-3">
                Return and exchange conditions depend on the seller, how the purchase is made
                and applicable law. We clarify the process and deadlines before purchase.
                Contact us if there is a problem. We provide:
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
                For personal shopping orders, we buy from brands and trusted stores in Italy.
                We send item photos and a receipt or other proof of purchase. With our address
                service, you choose the seller yourself. Parcel inspection is not an
                authentication service.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">9. Liability</h2>
              <p>
                Actual delivery times may change due to the carrier or customs clearance. If delivery is delayed or an item is damaged, contact us with the shipment details and photos. We will review the situation and help with the next steps.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">10. Contact</h2>
              <p>
                For personal shopping, contact us on Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
                {" "}Browse offers on our channel: <a href="https://t.me/buyer_italia_shop" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@buyer_italia_shop</a>
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}

