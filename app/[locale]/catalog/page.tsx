import { Suspense } from "react";
import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { getFilterOptions } from "@/actions/catalog/get-filter-options";
import { getProducts } from "@/actions/catalog/get-products";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionary";
import { isValidLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import { PremiumCatalogFilters } from "@/components/premium-catalog-filters";
import { PremiumProductCard } from "@/components/premium-product-card";
import { AnimateIn } from "@/components/animate-in";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const pathname = "/catalog";

  return {
    title: dict.catalog.title,
    description: dict.catalog.subtitle,
    robots: { index: true, follow: true },
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
  searchParams: Promise<{ brand?: string; category?: string; q?: string }>;
}) {
  const locale = ensureLocale((await params).locale);
  const dict = await getDictionary(locale);
  const filterOptions = await getFilterOptions();

  return (
    <main id="main-content" className="px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-370">
        {/* Title */}
        <AnimateIn variant="fade-up">
          <p className="premium-eyebrow text-muted-foreground">
            {locale === "uk" ? "Відібрано в Італії" : "Curated in Italy"}
          </p>
          <h1 className="mt-4 font-serif text-5xl font-normal tracking-[-0.04em] text-foreground md:text-7xl">
            {dict.catalog.title}
          </h1>
        </AnimateIn>
        <AnimateIn variant="fade-up" delay={100}>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            {dict.catalog.subtitle}
          </p>
        </AnimateIn>

        {/* Filters */}
        <AnimateIn variant="fade-up" delay={200}>
          <div className="mt-10">
            <Suspense fallback={null}>
              <PremiumCatalogFilters
                locale={locale}
                brands={filterOptions.brands}
                categories={filterOptions.categories}
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
  searchParams: Promise<{ brand?: string; category?: string; q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const productList = await getProducts({
    brandId: resolvedSearchParams.brand,
    categoryId: resolvedSearchParams.category,
    q: resolvedSearchParams.q,
  });

  const hasFilters =
    resolvedSearchParams.brand ||
    resolvedSearchParams.category ||
    resolvedSearchParams.q;

  if (productList.length > 0) {
    return (
      <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4" aria-label={dict.title}>
        {productList.map((product, i) => (
          <li key={product.id} className="list-none">
            <AnimateIn variant="fade-up" delay={100 + i * 60} className="h-full">
              <PremiumProductCard product={product} locale={locale} />
            </AnimateIn>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <AnimateIn variant="fade-up" delay={300}>
      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="size-7 text-muted-foreground" aria-hidden="true" />
        </div>
        <p className="text-lg font-medium text-foreground">
          {hasFilters ? dict.emptyFiltered : dict.empty}
        </p>
      </div>
    </AnimateIn>
  );
}
