import { Card, CardContent } from "@/components/ui/card"
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
      className="px-4 py-16 md:px-8 md:py-24"
      aria-labelledby="delivery-payment-title"
    >
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <h2
            id="delivery-payment-title"
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

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((info, index) => {
            const Icon = deliveryIcons[index]
            return (
              <li key={index} className="list-none">
                <AnimateIn variant="fade-up" delay={200 + index * 100} className="h-full">
                  <Card className="border bg-card rounded-2xl hover-lift h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary">
                        <Icon className="size-6 text-italy-green" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <ul className="mt-3 space-y-2">
                        {info.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimateIn>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
