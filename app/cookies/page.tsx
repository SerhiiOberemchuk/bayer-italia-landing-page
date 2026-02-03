import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Політика cookies",
  description: "Політика використання cookies на сайті Buyer Italia - інформація про файли cookie та їх використання.",
}

export default function CookiesPolicyPage() {
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
          Політика cookies
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Останнє оновлення: {new Date().toLocaleDateString("uk-UA")}
        </p>

        <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">1. Що таке cookies?</h2>
            <p>
              Cookies (файли cookie) — це невеликі текстові файли, які зберігаються на вашому пристрої 
              (комп'ютері, планшеті або мобільному телефоні) під час відвідування веб-сайтів. Вони 
              допомагають веб-сайту запам'ятовувати інформацію про ваш візит.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Які cookies ми використовуємо</h2>
            
            <h3 className="font-medium text-foreground mt-4 mb-2">Необхідні cookies</h3>
            <p className="mb-4">
              Ці cookies необхідні для функціонування веб-сайту. Вони забезпечують базові функції, 
              такі як навігація по сторінках та доступ до захищених областей сайту.
            </p>

            <h3 className="font-medium text-foreground mt-4 mb-2">Аналітичні cookies</h3>
            <p className="mb-4">
              Ми використовуємо Vercel Analytics для збору анонімної статистики відвідувань. 
              Це допомагає нам зрозуміти, як відвідувачі взаємодіють з нашим сайтом, щоб 
              покращувати його.
            </p>

            <h3 className="font-medium text-foreground mt-4 mb-2">Функціональні cookies</h3>
            <p>
              Ці cookies дозволяють веб-сайту запам'ятовувати ваші налаштування (наприклад, 
              мовні переваги) для забезпечення більш персоналізованого досвіду.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. Як керувати cookies</h2>
            <p className="mb-3">
              Ви можете контролювати та/або видаляти cookies за бажанням. Більшість веб-браузерів 
              автоматично приймають cookies, але ви можете змінити налаштування браузера, щоб 
              відхиляти cookies, якщо бажаєте.
            </p>
            <p className="mb-3">Як керувати cookies у популярних браузерах:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Chrome:</strong> Налаштування → Конфіденційність та безпека → Cookies</li>
              <li><strong>Mozilla Firefox:</strong> Налаштування → Приватність та безпека → Cookies</li>
              <li><strong>Safari:</strong> Параметри → Конфіденційність → Cookies</li>
              <li><strong>Microsoft Edge:</strong> Налаштування → Cookies та дозволи сайту</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">4. Cookies третіх сторін</h2>
            <p>
              Наш сайт може містити посилання на зовнішні сервіси (Telegram, Instagram). 
              Ці сервіси можуть встановлювати власні cookies. Ми не контролюємо cookies 
              третіх сторін і рекомендуємо ознайомитися з їхніми політиками конфіденційності.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Зміни до політики</h2>
            <p>
              Ми можемо оновлювати цю політику cookies час від часу. Будь-які зміни будуть 
              опубліковані на цій сторінці з оновленою датою.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Контакти</h2>
            <p>
              Якщо у вас є запитання щодо використання cookies, зв'яжіться з нами через 
              Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
