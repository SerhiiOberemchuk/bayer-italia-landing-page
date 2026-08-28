import { Star } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface ReviewsProps {
  dict: Dictionary["reviews"]
}

export function Reviews({ dict }: ReviewsProps) {
  return (
    <section
      className="px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="reviews-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-5 border-b border-border pb-6 md:grid-cols-[1fr_auto] md:items-end">
          <AnimateIn variant="fade-up">
            <h2
              id="reviews-title"
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

        <ul className="grid lg:grid-cols-3">
          {dict.items.map((review, index) => (
            <li key={index} className="list-none lg:border-l lg:border-border lg:first:border-l-0">
              <AnimateIn variant="fade-up" delay={200 + index * 120} className="h-full">
                <article className="h-full border-b border-border px-1 py-8 sm:px-6 lg:px-8 lg:py-10">
                    <div className="mb-7 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-foreground text-foreground" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="font-serif text-xl leading-8 text-foreground">&ldquo;{review.text}&rdquo;</p>
                    <div className="mt-8 border-t border-border pt-4">
                      <p className="text-sm font-medium text-foreground">{review.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{review.location}</p>
                    </div>
                </article>
              </AnimateIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
