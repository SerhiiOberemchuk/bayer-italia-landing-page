import Link from "next/link";
import { Camera, FileCheck2, PackageCheck, Euro, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { AnimateIn } from "@/components/animate-in";

interface ProofSectionProps {
  locale: Locale;
}

const proofIcons = [Camera, FileCheck2, PackageCheck, Euro];

export function ProofSection({ locale }: ProofSectionProps) {
  const isUk = locale === "uk";

  const items = [
    {
      title: isUk ? "Фото перед відправкою" : "Photos before shipping",
      text: isUk
        ? "Показуємо реальний товар, бірки, стан і деталі покупки до відправки клієнту."
        : "We show the real item, tags, condition, and purchase details before shipment.",
    },
    {
      title: isUk ? "Чеки та оригінальність" : "Receipts and authenticity",
      text: isUk
        ? "Працюємо з офіційними магазинами та надсилаємо підтвердження покупки, коли це доступно."
        : "We buy from official stores and share purchase confirmation whenever available.",
    },
    {
      title: isUk ? "Прозорий маршрут" : "Clear delivery route",
      text: isUk
        ? "Після викупу пояснюємо етапи: покупка, фото, пакування, трекінг, доставка в Україну або ЄС."
        : "After purchase, we explain each step: buying, photos, packing, tracking, and delivery to Ukraine or the EU.",
    },
    {
      title: isUk ? "Зрозуміла калькуляція" : "Clear price breakdown",
      text: isUk
        ? "Фінальна сума складається з ціни магазину, сервісу та доставки без прихованих доплат."
        : "The final total includes store price, service fee, and shipping with no hidden add-ons.",
    },
  ];

  return (
    <section className="px-4 py-16 md:px-8 md:py-24" aria-labelledby="proof-title">
      <div className="mx-auto max-w-6xl">
        <AnimateIn variant="fade-up">
          <div className="rounded-[2rem] border border-border/60 bg-linear-to-br from-card via-card to-secondary/40 p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-italy-green">
                  {isUk ? "Довіра в деталях" : "Trust in details"}
                </p>
                <h2
                  id="proof-title"
                  className="mt-3 font-serif text-3xl font-semibold text-foreground md:text-4xl"
                >
                  {isUk
                    ? "Що клієнт бачить до того, як товар приїде"
                    : "What the client sees before the item arrives"}
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  {isUk
                    ? "Для баєр-сервісу важливі не лише красиві обіцянки. Сайт має одразу пояснювати, як ви підтверджуєте оригінальність, як проходить викуп і чому замовлення виглядає контрольованим на кожному етапі."
                    : "A buyer service needs more than attractive promises. The site should clearly explain how authenticity is confirmed, how sourcing works, and why each order feels controlled at every step."}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={withLocalePath(locale, "/delivery-from-italy")}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                  >
                    {isUk ? "Як проходить доставка" : "How delivery works"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={withLocalePath(locale, "/brands-from-italy")}
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium hover:bg-secondary"
                  >
                    {isUk ? "Які бренди замовляємо" : "Brands we source"}
                  </Link>
                </div>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {items.map((item, index) => {
                  const Icon = proofIcons[index];

                  return (
                    <li key={item.title} className="list-none">
                      <AnimateIn variant="fade-up" delay={120 + index * 70} className="h-full">
                        <article className="h-full rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                          <div className="flex size-11 items-center justify-center rounded-xl bg-italy-green/10">
                            <Icon className="size-5 text-italy-green" aria-hidden="true" />
                          </div>
                          <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {item.text}
                          </p>
                        </article>
                      </AnimateIn>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
