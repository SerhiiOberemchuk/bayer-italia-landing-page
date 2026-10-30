import { buildPageMetadata } from "@/lib/seo/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidLocale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
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
      ? "Повернення покупок через баєра та на адресу в Італії: правила продавця, допомога зі зворотною відправкою й дії при пошкодженні товару."
      : "Returns for personal shopping and purchases sent to our Italian address: seller rules, return shipping help and what to do if an item is damaged.";

  return buildPageMetadata({ locale, pathname, title, description });
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
          {isUk ? "Останнє оновлення: 30.10.2026" : "Last updated: October 30, 2026"}
        </p>

        {isUk ? (
          <div className="mt-8 space-y-8 leading-relaxed text-foreground/90">
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Повернення та обмін покупок через баєра
              </h2>
              <p>
                До викупу уточнюємо правила продавця, строки й спосіб повернення для
                конкретного замовлення. Умови залежать від магазину, способу покупки та
                застосовного законодавства. Якщо річ не підійшла або має дефект, напишіть
                нам — перевіримо доступні варіанти. Покупка через баєра сама по собі не
                скасовує прав, передбачених законом.
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
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Самостійні покупки на адресу в Італії
              </h2>
              <p>
                Якщо ви купували самостійно, повернення оформлюється за правилами обраного
                магазину або продавця. Поки товар в Італії, можна погодити допомогу зі
                зворотною відправкою як додаткову послугу. Звертайтеся до{" "}
                <a href="https://t.me/SerhiiOberemchuk" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@SerhiiOberemchuk</a>.
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
                Returns and exchanges for personal shopping
              </h2>
              <p>
                Before buying, we clarify the seller's return rules, deadlines and process for
                your order. Conditions depend on the store, how the purchase is made and
                applicable law. If an item does not fit or has a defect, contact us to review
                the options. Using a personal shopping service does not in itself remove
                statutory rights.
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
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                Purchases sent to our address in Italy
              </h2>
              <p>
                For purchases you make yourself, returns follow the chosen store's or seller's
                rules. While the item is still in Italy, you can arrange help with return
                shipping as an additional service. Contact{" "}
                <a href="https://t.me/SerhiiOberemchuk" className="text-italy-green hover:underline" target="_blank" rel="noopener noreferrer">@SerhiiOberemchuk</a>.
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
