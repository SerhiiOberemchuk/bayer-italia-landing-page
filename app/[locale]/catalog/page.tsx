import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getFilterOptions } from "@/actions/catalog/get-filter-options";
import { getProducts } from "@/actions/catalog/get-products";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionary";
import { isValidLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import type { ObriymProduct } from "@/lib/obriym/types";
import { isProductInStock } from "@/lib/storefront/products";
import { PremiumCatalogFilters } from "@/components/premium-catalog-filters";
import { PremiumProductCard } from "@/components/premium-product-card";
import { AnimateIn } from "@/components/animate-in";

// Sold pieces are a short strip of examples of the buyer's work, not a full
// archive: one row on desktop keeps the live shop, and the service, in focus.
const SOLD_EXAMPLES_LIMIT = 6;

type CatalogSearchParams = { brand?: string; category?: string; q?: string };

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
  searchParams: Promise<CatalogSearchParams>;
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

        {/* Product groups */}
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
  searchParams: Promise<CatalogSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const filters = {
    brandId: resolvedSearchParams.brand,
    categoryId: resolvedSearchParams.category,
    q: resolvedSearchParams.q,
    sort: "newest" as const,
  };

  // The shop list is filtered by the CRM so it stays complete as the sold
  // archive grows; sold examples are picked from the unfiltered list.
  const [availableProducts, allProducts] = await Promise.all([
    getProducts({ ...filters, inStock: true }),
    getProducts(filters),
  ]);
  const soldProducts = allProducts
    .filter((product) => !isProductInStock(product))
    .slice(0, SOLD_EXAMPLES_LIMIT);

  const hasFilters = Boolean(
    resolvedSearchParams.brand ||
      resolvedSearchParams.category ||
      resolvedSearchParams.q,
  );

  if (availableProducts.length === 0 && soldProducts.length === 0) {
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

  return (
    <>
      <section className="mt-10" aria-labelledby="available-title">
        <AnimateIn variant="fade-up" delay={250}>
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="available-title" className="premium-eyebrow text-foreground">
              {dict.availableNow}
            </h2>
            {availableProducts.length > 0 ? (
              <span className="text-xs tabular-nums text-muted-foreground">
                {availableProducts.length}
              </span>
            ) : null}
          </div>
        </AnimateIn>

        {availableProducts.length > 0 ? (
          <ul
            className="mt-6 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4"
            aria-label={dict.availableNow}
          >
            {availableProducts.map((product, i) => (
              <li key={product.id} className="list-none">
                <AnimateIn variant="fade-up" delay={300 + i * 60} className="h-full">
                  <PremiumProductCard product={product} locale={locale} />
                </AnimateIn>
              </li>
            ))}
          </ul>
        ) : (
          <AnimateIn variant="fade-up" delay={300}>
            <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground">
              {hasFilters ? dict.emptyAvailableFiltered : dict.emptyAvailable}
            </p>
          </AnimateIn>
        )}
      </section>

      {soldProducts.length > 0 ? (
        <SoldExamples products={soldProducts} locale={locale} dict={dict.sold} />
      ) : null}
    </>
  );
}

function SoldExamples({
  products,
  locale,
  dict,
}: {
  products: ObriymProduct[];
  locale: Locale;
  dict: Dictionary["catalog"]["sold"];
}) {
  const request =
    locale === "uk"
      ? "Вітаю! Хочу знайти щось подібне до речей, які ви вже привозили."
      : "Hello! I would like to find something similar to the pieces you have sourced before.";
  const requestUrl = `https://t.me/raisa_orb?text=${encodeURIComponent(request)}`;

  return (
    <section
      className="mt-24 border-t border-border pt-14 md:mt-32"
      aria-labelledby="sold-title"
    >
      <AnimateIn variant="fade-up">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="premium-eyebrow text-muted-foreground">{dict.eyebrow}</p>
            <h2
              id="sold-title"
              className="mt-3 font-serif text-3xl font-normal tracking-tight md:text-4xl"
            >
              {dict.title}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {dict.subtitle}
            </p>
          </div>
          <a
            href={requestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center gap-3 self-start border border-foreground px-6 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background md:self-auto"
          >
            {dict.cta}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </AnimateIn>

      <ul
        className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-6"
        aria-label={dict.title}
      >
        {products.map((product, i) => (
          <li key={product.id} className="list-none">
            <AnimateIn variant="fade-up" delay={100 + i * 60} className="h-full">
              <PremiumProductCard product={product} locale={locale} />
            </AnimateIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
