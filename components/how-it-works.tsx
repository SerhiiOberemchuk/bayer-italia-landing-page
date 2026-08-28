import { Search, MessageSquare, CreditCard, Package } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

const stepIcons = [Search, MessageSquare, CreditCard, Package]

interface HowItWorksProps {
  dict: Dictionary["howItWorks"]
}

export function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section
      className="px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
          <AnimateIn variant="fade-up">
            <h2
              id="how-it-works-title"
              className="font-serif text-4xl font-normal tracking-[-0.04em] text-foreground md:text-5xl"
            >
              {dict.title}
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-right">
              {dict.subtitle}
            </p>
          </AnimateIn>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((step, index) => {
            const Icon = stepIcons[index]
            return (
              <li key={index} className="list-none lg:border-l lg:border-border lg:first:border-l-0">
                <AnimateIn variant="fade-up" delay={200 + index * 120} className="h-full">
                  <article className="h-full border-b border-border px-1 py-8 sm:px-6 lg:px-7 lg:py-10">
                    <div className="flex items-center justify-between">
                      <span className="premium-eyebrow text-muted-foreground">0{index + 1}</span>
                      <Icon className="size-5 text-italy-green" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 className="mt-10 font-serif text-2xl font-normal tracking-[-0.025em] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </article>
                </AnimateIn>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
