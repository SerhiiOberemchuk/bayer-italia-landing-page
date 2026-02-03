import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description: "Політика конфіденційності Buyer Italia - як ми збираємо, використовуємо та захищаємо вашу особисту інформацію.",
}

export default function PrivacyPolicyPage() {
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
          Політика конфіденційності
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Останнє оновлення: {new Date().toLocaleDateString("uk-UA")}
        </p>

        <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">1. Загальні положення</h2>
            <p>
              Buyer Italia ("ми", "наш", "сервіс") поважає вашу конфіденційність та зобов'язується захищати 
              вашу особисту інформацію. Ця політика конфіденційності пояснює, як ми збираємо, використовуємо 
              та захищаємо інформацію, яку ви надаєте при використанні нашого веб-сайту buyer-italia.shop.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Інформація, яку ми збираємо</h2>
            <p className="mb-3">Ми можемо збирати наступну інформацію:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Контактні дані (ім'я, номер телефону, email, Telegram username)</li>
              <li>Адреса доставки</li>
              <li>Інформація про замовлення (товари, розміри, кольори)</li>
              <li>Історія комунікації з нами</li>
              <li>Технічна інформація (IP-адреса, тип браузера, пристрій)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. Як ми використовуємо інформацію</h2>
            <p className="mb-3">Зібрана інформація використовується для:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обробки та виконання ваших замовлень</li>
              <li>Комунікації щодо статусу замовлення</li>
              <li>Надання підтримки клієнтам</li>
              <li>Покращення якості наших послуг</li>
              <li>Надсилання інформації про акції та знижки (за вашою згодою)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">4. Захист інформації</h2>
            <p>
              Ми вживаємо відповідних технічних та організаційних заходів для захисту вашої особистої 
              інформації від несанкціонованого доступу, зміни, розкриття або знищення. Ми не продаємо 
              та не передаємо вашу особисту інформацію третім особам, окрім випадків, необхідних для 
              виконання замовлення (наприклад, служби доставки).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Зберігання даних</h2>
            <p>
              Ми зберігаємо вашу особисту інформацію лише протягом періоду, необхідного для цілей, 
              описаних у цій політиці, або відповідно до вимог законодавства.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Ваші права</h2>
            <p className="mb-3">Ви маєте право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Отримати доступ до своїх персональних даних</li>
              <li>Вимагати виправлення неточної інформації</li>
              <li>Вимагати видалення ваших даних</li>
              <li>Відкликати згоду на обробку даних</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">7. Контакти</h2>
            <p>
              Якщо у вас є запитання щодо цієї політики конфіденційності, зв'яжіться з нами через 
              Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
