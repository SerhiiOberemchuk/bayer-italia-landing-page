import Link from "next/link"
import { Send, MessageCircle } from "lucide-react"
import { BuyerItaliaLogo } from "@/components/buyer-italia-logo"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"
import type { Locale } from "@/lib/i18n/config"
import { withLocalePath } from "@/lib/i18n/routing"

interface FooterProps {
  dict: Dictionary["footer"]
  locale: Locale
}

export function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="border-t bg-card px-4 py-12 md:px-8" aria-labelledby="footer-title">
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <div className="flex flex-col items-center text-center">
            <BuyerItaliaLogo size="sm" className="mb-4" />

            <h2 id="footer-title" className="font-serif text-xl font-semibold text-foreground">
              Buyer Italia
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">{dict.description}</p>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <li className="list-none">
                <a
                  href="https://t.me/buyer_italia_shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buyer Italia Telegram channel"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Send className="size-4" aria-hidden="true" />
                  @buyer_italia_shop
                </a>
              </li>
              <li className="list-none">
                <a
                  href="https://t.me/raisa_orb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Write to Raisa on Telegram"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  @raisa_orb
                </a>
              </li>
            </ul>

            <nav className="mt-6" aria-label="Footer links">
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/delivery-from-italy")}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {locale === "uk" ? "Доставка з Італії" : "Delivery from Italy"}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/brands-from-italy")}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {locale === "uk" ? "Бренди з Італії" : "Brands from Italy"}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/privacy")}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {dict.privacy}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/cookies")}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {dict.cookies}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/terms")}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {dict.terms}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-8 w-full border-t pt-8">
              <p className="text-xs text-muted-foreground">{dict.disclaimer}</p>
              <p className="mt-2 text-xs text-muted-foreground">{dict.copyright}</p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </footer>
  )
}
