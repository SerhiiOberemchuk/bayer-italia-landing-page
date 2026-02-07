import { Card, CardContent } from "@/components/ui/card"
import { Truck, CreditCard, Globe, Clock } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries/uk"

const deliveryIcons = [Globe, Clock, Truck, CreditCard]

interface DeliveryPaymentProps {
  dict: Dictionary["delivery"]
}

export function DeliveryPayment({ dict }: DeliveryPaymentProps) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          {dict.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {dict.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((info, index) => {
            const Icon = deliveryIcons[index]
            return (
              <Card key={index} className="border bg-card rounded-2xl">
                <CardContent className="p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-6 text-italy-green" />
                  </div>
                  <h3 className="font-semibold text-foreground">{info.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {info.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
