import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface PopularBrandsProps {
  dict: Dictionary["popularBrands"]
}

const categoryKeys = ["fashion", "sport", "premium", "accessories"] as const

export function PopularBrands({ dict }: PopularBrandsProps) {
  return (
    <section
      className="px-4 py-16 md:px-8 md:py-24"
      aria-labelledby="popular-brands-title"
    >
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <h2
            id="popular-brands-title"
            className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl text-balance"
          >
            {dict.title}
          </h2>
        </AnimateIn>
        <AnimateIn variant="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {dict.subtitle}
          </p>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={200}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categoryKeys.map((key) => (
              <li key={key} className="list-none">
                <Badge
                  variant="secondary"
                  className="rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  {dict.categories[key]}
                </Badge>
              </li>
            ))}
          </ul>
        </AnimateIn>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {categoryKeys.map((key, index) => {
            const brands = dict.brands.filter((brand) => brand.category === key)

            return (
              <AnimateIn key={key} variant="fade-up" delay={240 + index * 80}>
                <li className="list-none">
                  <section className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {dict.categories[key]}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-3">
                      {brands.map((brand) => (
                        <li key={brand.name} className="list-none">
                          <Badge
                            variant="outline"
                            className="cursor-default rounded-xl border-border/60 bg-card px-4 py-2.5 text-sm font-medium text-foreground md:px-5 md:py-3 md:text-base"
                          >
                            {brand.name}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </section>
                </li>
              </AnimateIn>
            )
          })}
        </ul>

        <AnimateIn variant="fade-up" delay={520}>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-italy-green/30 text-italy-green transition-transform hover:bg-italy-green/5 hover:text-italy-green hover:scale-[1.03] active:scale-[0.97]"
              asChild
            >
              <a
                href="https://t.me/raisa_orb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Write to Raisa on Telegram about a brand request"
              >
                <Send className="size-4" aria-hidden="true" />
                {dict.cta}
              </a>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
