import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidLocale, siteUrl } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const pathname = "/returns";
  const title = locale === "uk" ? "Повернення та відшкодування" : "Returns and refunds";
  const description =
    locale === "uk"
      ? "Умови повернення, обміну та відшкодування Buyer Italia."
      : "Buyer Italia returns, exchanges, and refunds policy.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  };
}

export default async function ReturnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = ensureLocale((await params).locale);
  const isUk = locale === "uk";

  return (
    <main id="main-content" className="px-4 py-12 md:px-8">
      <article className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href={withLocalePath(locale)}>
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            {isUk ? "На головну" : "Back to home"}
          </Link>
        </Button>

        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          {isUk ? "Повернення та відшкодування" : "Returns and refunds"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isUk ? "Останнє оновлення: 30.08.2026" : "Last updated: August 30, 2026"}
        </p>

        {isUk ? (
          <div className="mt-8 space-y-8 leading-relaxed text-foreground/90">
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Стандартні повернення та обміни
              </h2>
              <p>
                Buyer Italia працює як баєр-сервіс: ми купуємо обраний клієнтом товар в
                офіційному магазині Італії після підтвердження замовлення. Тому стандартне
                повернення або обмін придбаного на замовлення товару не передбачені.
              </p>
            </section>
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Якщо товар неможливо придбати
              </h2>
              <p>
                Якщо після оплати придбати підтверджений товар неможливо, ми повідомимо вас
                і повернемо сплачені за нього кошти.
              </p>
            </section>
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Пошкоджений або помилково надісланий товар
              </h2>
              <p>
                Якщо посилка пошкоджена під час транспортування або ви отримали не той товар,
                напишіть нам одразу після отримання та додайте фото товару, пакування і
                транспортної накладної. Ми перевіримо обставини та допоможемо вирішити питання
                зі службою доставки або магазином.
              </p>
            </section>
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Контакт</h2>
              <p>
                Зверніться до нас у Telegram:{" "}
                <a
                  href="https://t.me/raisa_orb"
                  className="text-italy-green hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @raisa_orb
                </a>
                .
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-8 space-y-8 leading-relaxed text-foreground/90">
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Standard returns and exchanges
              </h2>
              <p>
                Buyer Italia is a buyer service: after order confirmation, we purchase the item
                selected by the customer from an official Italian store. Standard returns or
                exchanges of made-to-order purchases are therefore not offered.
              </p>
            </section>
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                If an item cannot be purchased
              </h2>
              <p>
                If a confirmed item cannot be purchased after payment, we will notify you and
                refund the amount paid for that item.
              </p>
            </section>
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Damaged or incorrect item
              </h2>
              <p>
                If a parcel is damaged in transit or you receive the wrong item, contact us as
                soon as you receive it and include photos of the item, packaging, and shipping
                label. We will review the case and help resolve it with the carrier or store.
              </p>
            </section>
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Contact</h2>
              <p>
                Contact us on Telegram:{" "}
                <a
                  href="https://t.me/raisa_orb"
                  className="text-italy-green hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @raisa_orb
                </a>
                .
              </p>
            </section>
          </div>
        )}
      </article>
    </main>
  );
}
