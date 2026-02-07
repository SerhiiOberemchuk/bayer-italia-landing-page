"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionaries/uk"

interface PopularBrandsProps {
  dict: Dictionary["popularBrands"]
}

const categoryKeys = ["fashion", "sport", "premium", "accessories"] as const

export function PopularBrands({ dict }: PopularBrandsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredBrands = activeCategory
    ? dict.brands.filter((b) => b.category === activeCategory)
    : dict.brands

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl text-balance">
            {dict.title}
          </h2>
        </AnimateIn>
        <AnimateIn variant="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {dict.subtitle}
          </p>
        </AnimateIn>

        {/* Category filters */}
        <AnimateIn variant="fade-up" delay={200}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === null
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {"Всі"}
            </button>
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() =>
                  setActiveCategory(activeCategory === key ? null : key)
                }
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {dict.categories[key]}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Brands grid */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {filteredBrands.map((brand, index) => (
            <AnimateIn
              key={brand.name}
              variant="scale"
              delay={100 + index * 40}
            >
              <Badge
                variant="outline"
                className="cursor-default rounded-xl border-border/60 bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-italy-green/40 hover:bg-italy-green/5 hover:shadow-sm md:px-5 md:py-3 md:text-base"
              >
                {brand.name}
              </Badge>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn variant="fade-up" delay={400}>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-italy-green/30 text-italy-green hover:bg-italy-green/5 hover:text-italy-green transition-transform hover:scale-[1.03] active:scale-[0.97]"
              asChild
            >
              <a
                href="https://t.me/raisa_orb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="size-4" />
                {dict.cta}
              </a>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
