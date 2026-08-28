import Link from "next/link";
import { Send, MessageCircle } from "lucide-react";
import { BuyerItaliaLogo } from "@/components/buyer-italia-logo";
import { AnimateIn } from "@/components/animate-in";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

interface FooterProps {
  dict: Dictionary["footer"];
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="border-t bg-card px-4 py-12 md:px-8" aria-labelledby="footer-title">
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <div className="flex flex-col items-center text-center">
            <BuyerItaliaLogo size="sm" className="mb-4" />

            <h2 id="footer-title" className="sr-only">
              Buyer Italia
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{dict.description}</p>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <li className="list-none">
                <a
                  href="https://t.me/buyer_italia_shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.telegramChannel}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <Send className="size-4" aria-hidden="true" />
                  {dict.telegramChannel}
                </a>
              </li>
              <li className="list-none">
                <a
                  href="https://t.me/raisa_orb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.personalContact}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {dict.personalContact}
                </a>
              </li>
            </ul>

            <nav className="mt-6" aria-label="Footer links">
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/delivery-from-italy")}
                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {locale === "uk" ? "Доставка з Італії" : "Delivery from Italy"}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/brands-from-italy")}
                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {locale === "uk" ? "Бренди з Італії" : "Brands from Italy"}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/privacy")}
                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {dict.privacy}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/cookies")}
                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {dict.cookies}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    href={withLocalePath(locale, "/terms")}
                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {dict.terms}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-8 w-full border-t pt-8">
              <p className="text-xs text-muted-foreground">{dict.disclaimer}</p>
              <div className="mt-3 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground sm:flex-row sm:gap-4">
                <p>{dict.copyright}</p>
                <span className="hidden text-border sm:inline" aria-hidden="true">/</span>
                <p>
                  {dict.developedBy}{" "}
                  <a
                    href="https://oberemchuk.pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium uppercase tracking-[0.08em] text-foreground transition-colors hover:text-italy-green"
                  >
                    Oberemchuk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </footer>
  );
}
