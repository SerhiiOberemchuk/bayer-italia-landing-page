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
      title: isUk ? "Показуємо саме ваш товар" : "See your actual item",
      text: isUk
        ? "Перед відправленням надсилаємо фото речі, бірок, пакування та важливих деталей."
        : "Before dispatch, we send photos of the item, its tags, packaging, and important details.",
    },
    {
      title: isUk ? "Купуємо в офіційних магазинах" : "Sourced from official stores",
      text: isUk
        ? "Замовляємо у брендів та перевірених ритейлерів Італії, зберігаючи чек або інше підтвердження покупки."
        : "We order from brands and trusted Italian retailers, keeping the receipt or other proof of purchase.",
    },
    {
      title: isUk ? "Залишаємося на зв’язку" : "Updates at every stage",
      text: isUk
        ? "Повідомляємо про викуп, отримання товару в Італії, пакування та передачу в доставку."
        : "We keep you updated when the item is purchased, received in Italy, packed, and handed over for delivery.",
    },
    {
      title: isUk ? "Вартість без сюрпризів" : "No surprises in the price",
      text: isUk
        ? "До оплати пояснюємо повну суму: вартість товару, послугу баєра та доставку."
        : "Before payment, we explain the full total: the item, the buyer service, and delivery.",
    },
  ];

  return (
    <section className="border-y border-border/70 bg-secondary/20 px-4 py-20 md:px-8 md:py-28" aria-labelledby="proof-title">
      <div className="mx-auto max-w-[1280px]">
        <AnimateIn variant="fade-up">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className="premium-eyebrow text-italy-green">
                  {isUk ? "Довіра, підтверджена діями" : "Trust, backed by action"}
                </p>
                <h2
                  id="proof-title"
                  className="mt-5 max-w-[13ch] font-serif text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-foreground md:text-5xl"
                >
                  {isUk
                    ? "Від викупу в Італії до відправлення — усе прозоро"
                    : "From purchase in Italy to dispatch — everything is clear"}
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  {isUk
                    ? "Ми купуємо речі в офіційних магазинах і особисто супроводжуємо кожне замовлення. Ви отримуєте фото саме свого товару, підтвердження покупки та зрозумілий розрахунок вартості. На кожному етапі знаєте, де перебуває замовлення і що відбуватиметься далі."
                    : "We source from official stores and personally oversee every order. You receive photos of your actual item, proof of purchase, and a clear price breakdown. At every stage, you know where your order is and what happens next."}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={withLocalePath(locale, "/delivery-from-italy")}
                    className="inline-flex h-13 items-center gap-3 bg-foreground px-7 text-[11px] font-medium uppercase tracking-[0.15em] text-background transition-colors hover:bg-[#34322f]"
                  >
                    {isUk ? "Детальніше про доставку" : "Explore delivery"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={withLocalePath(locale, "/brands-from-italy")}
                    className="inline-flex h-13 items-center border border-foreground px-7 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background"
                  >
                    {isUk ? "Переглянути бренди" : "Explore brands"}
                  </Link>
                </div>
              </div>

              <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {items.map((item, index) => {
                  const Icon = proofIcons[index];

                  return (
                    <li key={item.title} className="list-none">
                      <AnimateIn variant="fade-up" delay={120 + index * 70} className="h-full">
                        <article className="h-full border-t border-border pt-5">
                          <Icon className="size-5 text-italy-green" strokeWidth={1.5} aria-hidden="true" />
                          <h3 className="mt-5 text-base font-medium text-foreground">{item.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            {item.text}
                          </p>
                        </article>
                      </AnimateIn>
                    </li>
                  );
                })}
              </ul>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
