import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface FAQProps {
  dict: Dictionary["faq"]
}

export function FAQ({ dict }: FAQProps) {
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
  }

  return (
    <section
      className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30"
      aria-labelledby="faq-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <AnimateIn variant="fade-up">
          <h2
            id="faq-title"
            className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl"
          >
            {dict.title}
          </h2>
        </AnimateIn>
        <AnimateIn variant="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {dict.subtitle}
          </p>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={200}>
          <div className="mt-12 rounded-2xl bg-card p-6 shadow-sm border">
            <ul className="w-full divide-y divide-border/70">
              {dict.items.map((faq, index) => (
                <li key={index} className="list-none py-1">
                  <details className="faq-item group rounded-lg">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 py-4 text-left text-sm font-medium text-foreground">
                      <span>{faq.question}</span>
                      <span
                        className="mt-0.5 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45 group-open:scale-110"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <div className="faq-answer" aria-live="polite">
                      <div className="faq-answer-inner pr-8 text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
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
  )
}
