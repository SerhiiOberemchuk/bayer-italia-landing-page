import { Send, MessageCircle } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface FinalCTAProps {
  dict: Dictionary["finalCta"]
}

export function FinalCTA({ dict }: FinalCTAProps) {
  return (
    <section className="bg-foreground px-4 py-20 text-background md:px-8 md:py-28" aria-labelledby="final-cta-title">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
        <div>
          <AnimateIn variant="fade-up">
            <p className="premium-eyebrow text-background/55">Buyer Italia · Telegram</p>
            <h2
              id="final-cta-title"
              className="mt-5 max-w-[14ch] font-serif text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-background md:text-6xl"
            >
              {dict.title}
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={120}>
            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-background/65">
              {dict.subtitle}
            </p>
          </AnimateIn>
        </div>

        <AnimateIn variant="fade-up" delay={200}>
          <div className="grid gap-3">
            <a
              href="https://t.me/buyer_italia_shop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buyer Italia Telegram channel"
              className="inline-flex h-14 items-center justify-between border border-background bg-background px-6 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-transparent hover:text-background"
            >
              <span className="inline-flex items-center gap-3">
                <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {dict.ctaTelegram}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://t.me/raisa_orb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Write to Raisa on Telegram"
              className="inline-flex h-14 items-center justify-between border border-background/35 px-6 text-[11px] font-medium uppercase tracking-[0.15em] text-background transition-colors hover:border-background hover:bg-background hover:text-foreground"
            >
              <span className="inline-flex items-center gap-3">
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {dict.ctaPersonal}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
