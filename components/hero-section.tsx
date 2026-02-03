import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle, ArrowRight } from "lucide-react"
import { BuyerItaliaLogo } from "@/components/buyer-italia-logo"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Top Bar with Logo */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm px-4 py-4 md:px-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <BuyerItaliaLogo size="sm" />
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <span>Прямі закупки з Італії</span>
            <span className="w-1 h-1 rounded-full bg-italy-green" />
            <span>100% Оригінал</span>
            <span className="w-1 h-1 rounded-full bg-italy-red" />
            <span>Доставка в Україну та Європу</span>
          </div>
          <Button 
            size="sm" 
            className="bg-[#0088cc] hover:bg-[#0077b5] text-white gap-1.5"
            asChild
          >
            <a href="https://t.me/buyer_italia_shop" target="_blank" rel="noopener noreferrer">
              <Send className="size-4" />
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <p className="text-sm font-medium tracking-widest text-italy-green uppercase mb-4">
                Мультибрендовий баєр-сервіс
              </p>
              
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl text-balance leading-[1.1]">
                Оригінальний одяг з Італії
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                ZARA, Mango, COS, Massimo Dutti, Puma та інші бренди прямо з італійських магазинів. Знижки до 70% на розпродажах.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                <div>
                  <p className="text-3xl font-serif font-semibold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">задоволених клієнтів</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="text-3xl font-serif font-semibold text-foreground">7-10</p>
                  <p className="text-sm text-muted-foreground">днів доставка</p>
                </div>
                <div className="w-px h-12 bg-border hidden sm:block" />
                <div className="hidden sm:block">
                  <p className="text-3xl font-serif font-semibold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">оригінал</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto gap-2 bg-foreground hover:bg-foreground/90 text-background rounded-full px-8 h-14 text-base font-medium"
                  asChild
                >
                  <a href="https://t.me/buyer_italia_shop" target="_blank" rel="noopener noreferrer">
                    <Send className="size-5" />
                    Перейти в Telegram
                    <ArrowRight className="size-4 ml-1" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto gap-2 rounded-full px-8 h-14 text-base font-medium border-2 bg-transparent"
                  asChild
                >
                  <a href="https://t.me/raisa_orb" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-5" />
                    Написати особисто
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-banner.jpg"
                  alt="Люксові шопінг сумки з Італії - ZARA, Mango, COS та інші бренди"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-2xl shadow-xl p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-italy-green/10 flex items-center justify-center">
                    <span className="text-2xl">🇮🇹</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Прямо з Італії</p>
                    <p className="text-sm text-muted-foreground">Оригінальні речі</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 md:-right-8 bg-card rounded-2xl shadow-xl p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-italy-red/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-italy-red">-70%</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Знижки SALE</p>
                    <p className="text-sm text-muted-foreground">На розпродажах</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
