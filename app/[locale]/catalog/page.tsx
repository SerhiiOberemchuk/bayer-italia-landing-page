import { Suspense } from "react";
import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { getFilterOptions, getProducts } from "@/actions/catalog";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionary";
import { isValidLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import { CatalogFilters } from "@/components/catalog-filters";
import { ProductCard } from "@/components/product-card";
import { AnimateIn } from "@/components/animate-in";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const hasProducts = (await getProducts({})).length > 0;
  const pathname = "/catalog";

  return {
    title: dict.catalog.title,
    description: dict.catalog.subtitle,
    robots: {
      index: hasProducts,
      follow: hasProducts,
    },
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ brand?: string; category?: string; size?: string }>;
}) {
  const locale = ensureLocale((await params).locale);
  const dict = await getDictionary(locale);
  const filterOptions = await getFilterOptions();

  return (
    <main className="px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <AnimateIn variant="fade-up">
          <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            {dict.catalog.title}
          </h1>
        </AnimateIn>
        <AnimateIn variant="fade-up" delay={100}>
          <p className="mt-3 text-lg text-muted-foreground">
            {dict.catalog.subtitle}
          </p>
        </AnimateIn>

        {/* Filters */}
        <AnimateIn variant="fade-up" delay={200}>
          <div className="mt-8 rounded-2xl border border-border/60 bg-card p-5">
            <Suspense fallback={null}>
              <CatalogFilters
                dict={dict.catalog.filters}
                brands={filterOptions.brands}
                categories={filterOptions.categories}
                sizes={filterOptions.sizes}
              />
            </Suspense>
          </div>
        </AnimateIn>

        {/* Product grid */}
        <Suspense fallback={null}>
          <CatalogResults
            locale={locale}
            dict={dict.catalog}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </main>
  );
}

async function CatalogResults({
  locale,
  dict,
  searchParams,
}: {
  locale: Locale;
  dict: Dictionary["catalog"];
  searchParams: Promise<{ brand?: string; category?: string; size?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const productList = await getProducts({
    brand: resolvedSearchParams.brand,
    category: resolvedSearchParams.category,
    size: resolvedSearchParams.size,
  });

  const hasFilters =
    resolvedSearchParams.brand ||
    resolvedSearchParams.category ||
    resolvedSearchParams.size;

  if (productList.length > 0) {
    return (
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productList.map((product, i) => (
          <AnimateIn key={product.id} variant="fade-up" delay={100 + i * 60}>
            <ProductCard
              product={product}
              locale={locale}
              currencyLabel={dict.currency}
            />
          </AnimateIn>
        ))}
      </div>
    );
  }

  return (
    <AnimateIn variant="fade-up" delay={300}>
      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-foreground">
          {hasFilters ? dict.emptyFiltered : dict.empty}
        </p>
      </div>
    </AnimateIn>
  );
}

