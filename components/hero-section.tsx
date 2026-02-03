"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, MessageCircle, CheckCircle, ShoppingBag, Truck, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-16 md:px-8 md:pt-16 md:pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative h-24 w-24 md:h-32 md:w-32">
            <Image
              src="/images/buyer-italia-logo.jpg"
              alt="Buyer Italia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Баєр з Італії — ZARA та інші бренди
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            Прямі закупки оригінальних речей з Італії. Доставка в Україну та всю Європу. Реальні фото, чесні ціни, персональний підхід.
          </p>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm bg-secondary/80">
              <CheckCircle className="size-4 text-italy-green" />
              Оригінал
            </Badge>
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm bg-secondary/80">
              <ShoppingBag className="size-4 text-italy-green" />
              Закупка в Італії
            </Badge>
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm bg-secondary/80">
              <Truck className="size-4 text-italy-green" />
              Доставка в Україну та Європу
            </Badge>
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm bg-secondary/80">
              <Shield className="size-4 text-italy-green" />
              Реальні фото
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="w-full sm:w-auto gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl px-8 h-12 text-base"
              asChild
            >
              <a href="https://t.me/bayer_italia_shop" target="_blank" rel="noopener noreferrer">
                <Send className="size-5" />
                Перейти в Telegram
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto gap-2 rounded-xl px-8 h-12 text-base border-2 bg-transparent"
              asChild
            >
              <a href="https://t.me/raisa_orb" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                Написати @raisa_orb
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
