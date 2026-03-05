import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle, ArrowRight } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface HeroSectionProps {
  dict: Dictionary["hero"]
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Content */}
      <div className="px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <AnimateIn variant="fade-down" duration={500}>
                <p className="text-sm font-medium tracking-widest text-italy-green uppercase mb-4">
                  {dict.badge}
                </p>
              </AnimateIn>
              
              <AnimateIn variant="fade-up" delay={100} duration={700}>
                <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl text-balance leading-[1.1]">
                  {dict.title}
                </h1>
              </AnimateIn>
              
              <AnimateIn variant="fade-up" delay={250} duration={600}>
                <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {dict.subtitle}
                </p>
              </AnimateIn>

              {/* Stats */}
              <AnimateIn variant="fade-up" delay={400} duration={600}>
                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                  <div>
                    <p className="text-3xl font-serif font-semibold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">{dict.stats.clients}</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="text-3xl font-serif font-semibold text-foreground">7-10</p>
                    <p className="text-sm text-muted-foreground">{dict.stats.deliveryDays}</p>
                  </div>
                  <div className="w-px h-12 bg-border hidden sm:block" />
                  <div className="hidden sm:block">
                    <p className="text-3xl font-serif font-semibold text-foreground">100%</p>
                    <p className="text-sm text-muted-foreground">{dict.stats.originalLabel}</p>
                  </div>
                </div>
              </AnimateIn>

              {/* CTA Buttons */}
              <AnimateIn variant="fade-up" delay={550} duration={600}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto gap-2 bg-foreground hover:bg-foreground/90 text-background rounded-full px-8 h-14 text-base font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    asChild
                  >
                    <a href="https://t.me/buyer_italia_shop" target="_blank" rel="noopener noreferrer">
                      <Send className="size-5" />
                      {dict.ctaTelegram}
                      <ArrowRight className="size-4 ml-1" />
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto gap-2 rounded-full px-8 h-14 text-base font-medium border-2 bg-transparent transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    asChild
                  >
                    <a href="https://t.me/raisa_orb" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-5" />
                      {dict.ctaPersonal}
                    </a>
                  </Button>
                </div>
              </AnimateIn>
            </div>

            {/* Hero Image */}
            <AnimateIn variant="scale" delay={200} duration={800}>
              <div className="relative">
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt={dict.heroImageAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/20 via-transparent to-transparent" />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-2xl shadow-xl p-4 border animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-italy-green/10 flex items-center justify-center">
                      <span className="text-2xl">&#x1F1EE;&#x1F1F9;</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{dict.floatingDirect}</p>
                      <p className="text-sm text-muted-foreground">{dict.floatingOriginal}</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 md:-right-8 bg-card rounded-2xl shadow-xl p-4 border animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-italy-red/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-italy-red">-70%</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{dict.floatingDiscount}</p>
                      <p className="text-sm text-muted-foreground">{dict.floatingDiscountSub}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
