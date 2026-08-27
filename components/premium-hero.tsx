import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

export function PremiumHero({
  dict,
  locale,
}: {
  dict: Dictionary["hero"];
  locale: Locale;
}) {
  const isUk = locale === "uk";

  return (
    <section className="border-b border-border/70" aria-labelledby="hero-title">
      <div className="grid min-h-[calc(100svh-104px)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="order-2 flex items-center px-6 py-16 sm:px-10 lg:order-1 lg:px-[7vw] lg:py-24">
          <div className="max-w-[620px]">
            <AnimateIn variant="fade-up">
              <p className="premium-eyebrow text-muted-foreground">{dict.badge}</p>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={100}>
              <h1
                id="hero-title"
                className="mt-6 max-w-[12ch] font-serif text-[clamp(3rem,6.7vw,7.8rem)] font-normal leading-[0.91] tracking-[-0.055em]"
              >
                {dict.title}
              </h1>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={220}>
              <p className="mt-8 max-w-lg text-[15px] leading-7 text-muted-foreground md:text-base">
                {dict.subtitle}
              </p>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={320}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={withLocalePath(locale, "/catalog")}
                  className="inline-flex h-13 items-center gap-3 bg-foreground px-7 text-xs font-medium uppercase tracking-[0.17em] text-background hover:bg-[#34322f]"
                >
                  {isUk ? "Дивитися колекцію" : "Shop the collection"}
                  <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
                <a
                  href="https://t.me/raisa_orb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center border border-foreground px-7 text-xs font-medium uppercase tracking-[0.17em] hover:bg-foreground hover:text-background"
                >
                  {isUk ? "Персональний пошук" : "Personal sourcing"}
                </a>
              </div>
            </AnimateIn>
          </div>
        </div>

        <AnimateIn variant="fade" duration={900} className="order-1 lg:order-2">
          <div className="relative min-h-[58svh] bg-secondary lg:h-full">
            <Image
              src="/images/hero-banner.jpg"
              alt={dict.heroImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white md:bottom-8 md:left-8 md:right-8">
              <p className="max-w-[22ch] font-serif text-2xl leading-tight md:text-3xl">
                {isUk ? "Відібрано в Італії. Доставлено для вас." : "Selected in Italy. Delivered for you."}
              </p>
              <p className="premium-eyebrow hidden sm:block">Italia · 2026</p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
