import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface ReviewsProps {
  dict: Dictionary["reviews"]
}

export function Reviews({ dict }: ReviewsProps) {
  return (
    <section
      className="px-4 py-16 md:px-8 md:py-24"
      aria-labelledby="reviews-title"
    >
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <h2
            id="reviews-title"
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

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((review, index) => (
            <AnimateIn key={index} variant="fade-up" delay={200 + index * 120}>
              <li className="list-none">
                <Card className="border bg-card rounded-2xl hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                    <div className="mt-4 pt-4 border-t">
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
