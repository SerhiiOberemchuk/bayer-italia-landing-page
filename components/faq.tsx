import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { ItalinoLink } from "@/components/italino-link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

interface FAQProps {
  dict: Dictionary["faq"];
  locale: Locale;
}

export function FAQ({ dict, locale }: FAQProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      className="border-y border-border/70 bg-secondary/20 px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="faq-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
        <header>
          <AnimateIn variant="fade-up">
            <p className="premium-eyebrow text-muted-foreground">FAQ</p>
            <h2
              id="faq-title"
              className="mt-5 max-w-[12ch] font-serif text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-foreground md:text-5xl"
            >
              {dict.title}
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground">
              {dict.subtitle}
            </p>
          </AnimateIn>
        </header>

        <AnimateIn variant="fade-up" delay={160}>
          <div className="border-y border-border">
            <ul className="w-full divide-y divide-border">
              {dict.items.map((faq, index) => (
                <li key={index} className="list-none">
                  <details className="faq-item" name="faq-item">
                    <summary className="cursor-pointer py-6 pr-14 text-left text-base font-medium leading-6 text-foreground md:text-lg">
                      {faq.question}
                    </summary>
                    <div className="faq-answer" aria-live="polite">
                      <div className="faq-answer-inner max-w-2xl pr-12 text-sm leading-7 text-muted-foreground md:text-[15px]">
                        <p>{faq.answer}</p>
                        {"italinoLinkLabel" in faq ? (
                          <ItalinoLink
                            placement="home_faq"
                            label={faq.italinoLinkLabel}
                            className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-opacity duration-300 hover:opacity-70"
                          />
                        ) : null}
                        {"addressLinkLabel" in faq ? (
                          <Link
                            href={withLocalePath(locale, "/adresa-v-italii")}
                            className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-opacity duration-300 hover:opacity-70"
                          >
                            {faq.addressLinkLabel}
                            <ArrowRight className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                          </Link>
                        ) : null}
                        {"returnsLinkLabel" in faq ? (
                          <Link
                            href={withLocalePath(locale, "/returns")}
                            className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-opacity duration-300 hover:opacity-70"
                          >
                            {faq.returnsLinkLabel}
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
