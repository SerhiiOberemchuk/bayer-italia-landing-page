import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Умови використання",
  description: "Умови використання сервісу Buyer Italia - правила замовлення, оплати та доставки товарів з Італії.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 size-4" />
            На головну
          </Button>
        </Link>

        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Умови використання
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Останнє оновлення: {new Date().toLocaleDateString("uk-UA")}
        </p>

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
              <li>PayPal</li>
              <li>Криптовалюта</li>
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
      </div>
    </main>
  )
}
