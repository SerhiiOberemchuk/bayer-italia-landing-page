import { Card, CardContent } from "@/components/ui/card"
import { Truck, CreditCard, Globe, Clock } from "lucide-react"

const deliveryInfo = [
  {
    icon: Globe,
    title: "Географія",
    items: ["Україна (Нова пошта)", "Європа (поштові служби)"]
  },
  {
    icon: Clock,
    title: "Терміни",
    items: ["7-10 днів — Україна", "10-14 днів — Європа"]
  },
  {
    icon: Truck,
    title: "Вартість доставки",
    items: ["Від 150 грн — Україна", "Від 10€ — Європа"]
  },
  {
    icon: CreditCard,
    title: "Оплата",
    items: ["Передоплата 100%", "Карта / PayPal / Криптовалюта"]
  }
]

export function DeliveryPayment() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Доставка та оплата
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Прозорі умови та зручні способи оплати
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deliveryInfo.map((info) => (
            <Card key={info.title} className="border bg-card rounded-2xl">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary">
                  <info.icon className="size-6 text-italy-green" />
                </div>
                <h3 className="font-semibold text-foreground">{info.title}</h3>
                <ul className="mt-3 space-y-2">
                  {info.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
