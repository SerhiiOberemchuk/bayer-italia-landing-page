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

  const pathname = "/privacy"
  const title =
    locale === "uk" ? "Політика конфіденційності" : "Privacy Policy"
  const description =
    locale === "uk"
      ? "Політика конфіденційності Buyer Italia."
      : "Privacy Policy of Buyer Italia."

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  }
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ensureLocale((await params).locale)

  const isUk = locale === "uk"
  const lastUpdated = isUk ? "05.03.2026" : "March 5, 2026"

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
          {isUk ? "Політика конфіденційності" : "Privacy Policy"}
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
                Buyer Italia (&quot;ми&quot;, &quot;наш&quot;, &quot;сервіс&quot;) поважає вашу конфіденційність та зобов&#39;язується захищати
                вашу особисту інформацію. Ця політика конфіденційності пояснює, як ми збираємо, використовуємо
                та захищаємо інформацію, яку ви надаєте при використанні нашого веб-сайту buyer-italia.shop.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Інформація, яку ми збираємо</h2>
              <p className="mb-3">Ми можемо збирати наступну інформацію:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Контактні дані (ім&#39;я, номер телефону, email, Telegram username)</li>
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
                Якщо у вас є запитання щодо цієї політики конфіденційності, зв&#39;яжіться з нами через
                Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">1. General Provisions</h2>
              <p>
                Buyer Italia (&quot;we&quot;, &quot;our&quot;, &quot;service&quot;) respects your privacy and is committed to protecting
                your personal information. This privacy policy explains how we collect, use
                and protect the information you provide when using our website buyer-italia.shop.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact details (name, phone number, email, Telegram username)</li>
                <li>Delivery address</li>
                <li>Order information (items, sizes, colors)</li>
                <li>Communication history with us</li>
                <li>Technical information (IP address, browser type, device)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">3. How We Use Information</h2>
              <p className="mb-3">Collected information is used for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing and fulfilling your orders</li>
                <li>Communication regarding order status</li>
                <li>Providing customer support</li>
                <li>Improving the quality of our services</li>
                <li>Sending information about promotions and discounts (with your consent)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">4. Information Protection</h2>
              <p>
                We take appropriate technical and organizational measures to protect your personal
                information from unauthorized access, alteration, disclosure or destruction. We do not sell
                or share your personal information with third parties, except as necessary to
                fulfill orders (e.g., delivery services).
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">5. Data Retention</h2>
              <p>
                We retain your personal information only for the period necessary for the purposes
                described in this policy, or as required by law.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent to data processing</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">7. Contact</h2>
              <p>
                If you have questions about this privacy policy, contact us via
                Telegram: <a href="https://t.me/raisa_orb" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@raisa_orb</a>
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}


