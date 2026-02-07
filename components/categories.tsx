"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shirt, Footprints, Briefcase, Watch, Sparkles, Baby } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionaries/uk"

const categoryIcons = [Shirt, Footprints, Briefcase, Watch, Sparkles, Baby]

interface CategoriesProps {
  dict: Dictionary["categories"]
}

export function Categories({ dict }: CategoriesProps) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
            {dict.title}
          </h2>
        </AnimateIn>
        <AnimateIn variant="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {dict.subtitle}
          </p>
        </AnimateIn>

        <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
          {dict.items.map((category, index) => {
            const Icon = categoryIcons[index]
            return (
              <AnimateIn key={index} variant="scale" delay={150 + index * 80}>
                <Card className="group border bg-card hover:shadow-lg transition-all duration-300 rounded-2xl cursor-pointer hover:border-italy-green/30 hover-lift h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-italy-green/10 transition-colors duration-300">
                      <Icon className="size-6 text-muted-foreground group-hover:text-italy-green transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-foreground">{category.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
