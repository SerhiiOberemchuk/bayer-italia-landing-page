import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, ExternalLink } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

interface InStockShowcaseProps {
  dict: Dictionary["inStock"];
  locale: Locale;
}

export function InStockShowcase({ dict, locale }: InStockShowcaseProps) {
  return (
    <section
      className="px-4 py-16 md:px-8 md:py-24"
      aria-labelledby="in-stock-title"
    >
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <div className="rounded-3xl border border-border/60 bg-card p-6 md:p-10">
            <h2
              id="in-stock-title"
              className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl"
            >
              {dict.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              {dict.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 rounded-xl px-6"
                asChild
              >
                <a
                  href="https://www.vinted.it/member/85835210-raisaob"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Vinted profile raisaob"
                >
                  <Store className="size-5" aria-hidden="true" />
                  {dict.ctaVinted}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 rounded-xl px-6"
                asChild
              >
                <Link
                  href={withLocalePath(locale, "/vinted-in-stock")}
                  aria-label={locale === "uk" ? "Сторінка Vinted товарів у наявності" : "Vinted in-stock page"}
                >
                  {locale === "uk" ? "Деталі про товари в наявності" : "In-stock details"}
                </Link>
              </Button>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
