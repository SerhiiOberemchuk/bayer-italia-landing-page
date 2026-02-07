import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Percent, Clock, TrendingDown } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries/uk"

interface ZaraSectionProps {
  dict: Dictionary["zara"]
}

export function ZaraSection({ dict }: ZaraSectionProps) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-card p-8 md:p-12 shadow-lg border">
          {/* Accent border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-italy-green via-white to-italy-red" />
          
          <div className="text-center">
            <Badge className="mb-6 bg-italy-red/10 text-italy-red border-italy-red/20 hover:bg-italy-red/20">
              <Percent className="size-3.5 mr-1" />
              {dict.badge}
            </Badge>
            
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
              {dict.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
              {dict.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2">
                <TrendingDown className="size-5 text-italy-red" />
                <span className="text-sm font-medium">{dict.discountTag}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2">
                <Clock className="size-5 text-italy-green" />
                <span className="text-sm font-medium">{dict.limitedTag}</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="mt-8 gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl px-8 h-12"
              asChild
            >
              <a href="https://t.me/buyer_italia_shop" target="_blank" rel="noopener noreferrer">
                <Send className="size-5" />
                {dict.cta}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
