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

  const pathname = "/cookies"
  const title = locale === "uk" ? "Політика cookies" : "Cookie Policy"
  const description =
    locale === "uk"
      ? "Політика використання cookies на сайті Buyer Italia."
      : "Cookie usage policy on the Buyer Italia website."

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  }
}

export default async function CookiesPolicyPage({
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
          {isUk ? "Політика cookies" : "Cookie Policy"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isUk ? "Останнє оновлення:" : "Last updated:"}{" "}
          {lastUpdated}
        </p>

        {isUk ? (
          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">1. Що таке cookies?</h2>
              <p>
                Cookies (файли cookie) — це невеликі текстові файли, які зберігаються на вашому пристрої
                (комп&#39;ютері, планшеті або мобільному телефоні) під час відвідування веб-сайтів. Вони
                допомагають веб-сайту запам&#39;ятовувати інформацію про ваш візит.
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
                Ці cookies дозволяють веб-сайту запам&#39;ятовувати ваші налаштування (наприклад,
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
                <li><strong>Google Chrome:</strong> Налаштування &rarr; Конфіденційність та безпека &rarr; Cookies</li>
                <li><strong>Mozilla Firefox:</strong> Налаштування &rarr; Приватність та безпека &rarr; Cookies</li>
                <li><strong>Safari:</strong> Параметри &rarr; Конфіденційність &rarr; Cookies</li>
                <li><strong>Microsoft Edge:</strong> Налаштування &rarr; Cookies та дозволи сайту</li>
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
                Якщо у вас є запитання щодо використання cookies, зв&#39;яжіться з нами через
                Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">1. What are cookies?</h2>
              <p>
                Cookies are small text files stored on your device (computer, tablet or mobile phone) when
                visiting websites. They help the website remember information about your visit.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Cookies we use</h2>
              <h3 className="font-medium text-foreground mt-4 mb-2">Essential cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function. They provide basic features
                such as page navigation and access to secure areas of the site.
              </p>
              <h3 className="font-medium text-foreground mt-4 mb-2">Analytics cookies</h3>
              <p className="mb-4">
                We use Vercel Analytics to collect anonymous visit statistics.
                This helps us understand how visitors interact with our site to improve it.
              </p>
              <h3 className="font-medium text-foreground mt-4 mb-2">Functional cookies</h3>
              <p>
                These cookies allow the website to remember your settings (for example,
                language preferences) for a more personalized experience.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. How to manage cookies</h2>
              <p className="mb-3">
                You can control and/or delete cookies as you wish. Most web browsers
                automatically accept cookies, but you can change your browser settings to
                reject cookies if you prefer.
              </p>
              <p className="mb-3">How to manage cookies in popular browsers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Cookies</li>
                <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy & Security &rarr; Cookies</li>
                <li><strong>Safari:</strong> Preferences &rarr; Privacy &rarr; Cookies</li>
                <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">4. Third-party cookies</h2>
              <p>
                Our site may contain links to external services (Telegram, Instagram).
                These services may set their own cookies. We do not control third-party cookies
                and recommend reviewing their privacy policies.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Changes to policy</h2>
              <p>
                We may update this cookie policy from time to time. Any changes will be
                published on this page with an updated date.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Contact</h2>
              <p>
                If you have questions about the use of cookies, contact us via
                Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}


