"use client"

import Link from "next/link"
import { Send, MessageCircle } from "lucide-react"
import { BuyerItaliaLogo } from "@/components/buyer-italia-logo"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionaries/uk"
import type { Locale } from "@/lib/i18n/config"

interface FooterProps {
  dict: Dictionary["footer"]
  locale: Locale
}

export function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="border-t bg-card px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <BuyerItaliaLogo size="sm" className="mb-4" />
            
            <h3 className="font-serif text-xl font-semibold text-foreground">Buyer Italia</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {dict.description}
            </p>

            {/* Contact Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a 
                href="https://t.me/buyer_italia_shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Send className="size-4" />
                @buyer_italia_shop
              </a>
              <a 
                href="https://t.me/raisa_orb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <MessageCircle className="size-4" />
                @raisa_orb
              </a>
            </div>

            {/* Policy Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
              <Link 
                href={`/${locale}/privacy`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {dict.privacy}
              </Link>
              <span className="text-muted-foreground/50">|</span>
              <Link 
                href={`/${locale}/cookies`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {dict.cookies}
              </Link>
              <span className="text-muted-foreground/50">|</span>
              <Link 
                href={`/${locale}/terms`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {dict.terms}
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 pt-8 border-t w-full">
              <p className="text-xs text-muted-foreground">
                {dict.disclaimer}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} {dict.copyright}
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </footer>
  )
}
