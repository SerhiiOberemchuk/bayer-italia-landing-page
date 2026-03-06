import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Percent, Clock, TrendingDown } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import type { Dictionary } from "@/lib/i18n/dictionary";

interface ZaraSectionProps {
  dict: Dictionary["zara"];
}

export function ZaraSection({ dict }: ZaraSectionProps) {
  return (
    <section
      className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30"
      aria-labelledby="zara-section-title"
    >
      <div className="mx-auto max-w-4xl">
        <AnimateIn variant="scale" duration={700}>
          <div className="relative overflow-hidden rounded-3xl bg-card p-8 md:p-12 shadow-lg border">
            {/* Accent border */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-italy-green via-white to-italy-red"
            />

            <div className="text-center">
              <AnimateIn variant="fade-down" delay={200}>
                <Badge className="mb-6 bg-italy-red/10 text-italy-red border-italy-red/20 hover:bg-italy-red/20 animate-gentle-pulse">
                  <Percent className="size-3.5 mr-1" aria-hidden="true" />
                  {dict.badge}
                </Badge>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={300}>
                <h2
                  id="zara-section-title"
                  className="font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl"
                >
                  {dict.title}
                </h2>
              </AnimateIn>
              <AnimateIn variant="fade-up" delay={400}>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
                  {dict.description}
                </p>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={500}>
                <ul className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <li className="list-none flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 transition-transform hover:scale-105">
                    <TrendingDown
                      className="size-5 text-italy-red"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">
                      {dict.discountTag}
                    </span>
                  </li>
                  <li className="list-none flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 transition-transform hover:scale-105">
                    <Clock
                      className="size-5 text-italy-green"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">
                      {dict.limitedTag}
                    </span>
                  </li>
                </ul>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={600}>
                <Button
                  size="lg"
                  className="mt-8 gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl px-8 h-12 transition-transform hover:scale-[1.03] active:scale-[0.97]"
                  asChild
                >
                  <a
                    href="https://t.me/buyer_italia_shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buyer Italia Telegram channel"
                  >
                    <Send className="size-5" aria-hidden="true" />
                    {dict.cta}
                  </a>
                </Button>
              </AnimateIn>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
