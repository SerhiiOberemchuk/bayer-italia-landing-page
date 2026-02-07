import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageSquare, CreditCard, Package } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries/uk"

const stepIcons = [Search, MessageSquare, CreditCard, Package]

interface HowItWorksProps {
  dict: Dictionary["howItWorks"]
}

export function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          {dict.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {dict.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((step, index) => {
            const Icon = stepIcons[index]
            return (
              <Card key={index} className="relative border-0 bg-card shadow-md rounded-2xl">
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex size-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-7 text-italy-green" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
