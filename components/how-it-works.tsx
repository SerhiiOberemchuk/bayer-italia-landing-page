import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageSquare, CreditCard, Package } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Вибір",
    description: "Обираєте товар з наших публікацій або надсилаєте посилання на бажану річ"
  },
  {
    icon: MessageSquare,
    title: "Запит",
    description: "Пишете в особисті повідомлення — уточнюємо наявність, розмір та ціну"
  },
  {
    icon: CreditCard,
    title: "Оплата",
    description: "Вносите передоплату — ми закуповуємо товар напряму в Італії"
  },
  {
    icon: Package,
    title: "Доставка",
    description: "Отримуєте посилку в Україні або Європі протягом 7-14 днів"
  }
]

export function HowItWorks() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Як це працює
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Простий процес замовлення у 4 кроки
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative border-0 bg-card shadow-md rounded-2xl">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex size-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-secondary">
                  <step.icon className="size-7 text-italy-green" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
