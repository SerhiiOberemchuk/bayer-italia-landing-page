import { Truck, CreditCard, Globe, Clock } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

const deliveryIcons = [Globe, Clock, Truck, CreditCard]

interface DeliveryPaymentProps {
  dict: Dictionary["delivery"]
}

export function DeliveryPayment({ dict }: DeliveryPaymentProps) {
  return (
    <section
      className="border-y border-border/70 bg-secondary/20 px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="delivery-payment-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-5 border-b border-border pb-6 md:grid-cols-[1fr_auto] md:items-end">
          <AnimateIn variant="fade-up">
            <h2
              id="delivery-payment-title"
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

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((info, index) => {
            const Icon = deliveryIcons[index]
            return (
              <li key={index} className="list-none lg:border-l lg:border-border lg:first:border-l-0">
                <AnimateIn variant="fade-up" delay={200 + index * 100} className="h-full">
                  <article className="h-full border-b border-border px-1 py-8 sm:px-6 lg:px-7 lg:py-10">
                      <Icon className="size-5 text-italy-green" strokeWidth={1.5} aria-hidden="true" />
                      <h3 className="mt-8 font-serif text-2xl font-normal tracking-[-0.025em] text-foreground">{info.title}</h3>
                      <ul className="mt-5 space-y-3">
                        {info.items.map((item, i) => (
                          <li key={i} className="border-t border-border/70 pt-3 text-sm leading-6 text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                  </article>
                </AnimateIn>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
