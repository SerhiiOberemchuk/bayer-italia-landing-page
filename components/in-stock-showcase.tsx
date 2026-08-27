import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/actions/catalog/get-products";
import { PremiumProductCard } from "@/components/premium-product-card";
import { withLocalePath } from "@/lib/i18n/routing";

interface InStockShowcaseProps {
  dict: Dictionary["inStock"];
  locale: Locale;
}

export async function InStockShowcase({ dict, locale }: InStockShowcaseProps) {
  const products = await getProducts({ limit: 4 });
  if (products.length === 0) return null;

  return (
    <section className="px-4 py-20 md:px-8 md:py-28" aria-labelledby="new-arrivals-title">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-5">
          <div>
            <p className="premium-eyebrow text-muted-foreground">
              {locale === "uk" ? "Щойно з Італії" : "Just in from Italy"}
            </p>
            <h2 id="new-arrivals-title" className="mt-3 font-serif text-4xl font-normal tracking-tight md:text-5xl">
              {dict.title}
            </h2>
          </div>
          <Link
            href={withLocalePath(locale, "/catalog")}
            className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] sm:inline-flex"
          >
            {locale === "uk" ? "Переглянути все" : "View all"}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {products.map((product) => (
            <li key={product.id}>
              <PremiumProductCard product={product} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
