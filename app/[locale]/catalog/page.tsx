import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { desc, eq, and, type SQL } from "drizzle-orm"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { isValidLocale } from "@/lib/i18n/config"
import { CatalogFilters } from "@/components/catalog-filters"
import { ProductCard } from "@/components/product-card"
import { AnimateIn } from "@/components/animate-in"
import { BuyerItaliaLogo } from "@/components/buyer-italia-logo"
import { LanguageSwitcher } from "@/components/language-switcher"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.catalog.title,
    description: dict.catalog.subtitle,
  }
}

/** Отримати унікальні значення для фільтрів */
async function getFilterOptions() {
  const allProducts = await db
    .select({
      brand: products.brand,
      category: products.category,
      size: products.size,
    })
    .from(products)

  const brands = [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].sort()
  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))].sort()
  const sizes = [...new Set(allProducts.map((p) => p.size).filter(Boolean))].sort()

  return { brands, categories, sizes }
}

/** Отримати товари з фільтрами */
async function getProducts(filters: {
  brand?: string
  category?: string
  size?: string
}) {
  const conditions: SQL[] = []

  if (filters.brand) {
    conditions.push(eq(products.brand, filters.brand))
  }
  if (filters.category) {
    conditions.push(eq(products.category, filters.category))
  }
  if (filters.size) {
    conditions.push(eq(products.size, filters.size))
  }

  return db
    .select()
    .from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(products.createdAt))
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ brand?: string; category?: string; size?: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const resolvedSearchParams = await searchParams

  const [filterOptions, productList] = await Promise.all([
    getFilterOptions(),
    getProducts({
      brand: resolvedSearchParams.brand,
      category: resolvedSearchParams.category,
      size: resolvedSearchParams.size,
    }),
  ])

  const hasFilters =
    resolvedSearchParams.brand ||
    resolvedSearchParams.category ||
    resolvedSearchParams.size

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm px-4 py-4 md:px-8 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`}>
              <BuyerItaliaLogo size="sm" />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-border" />
            <Link
              href={`/${locale}`}
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              {locale === "uk" ? "Головна" : "Home"}
            </Link>
          </div>
          <LanguageSwitcher locale={locale} />
        </div>
      </header>

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
          {productList.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productList.map((product, i) => (
                <AnimateIn key={product.id} variant="fade-up" delay={100 + i * 60}>
                  <ProductCard
                    product={product}
                    locale={locale}
                    currencyLabel={dict.catalog.currency}
                  />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <AnimateIn variant="fade-up" delay={300}>
              <div className="mt-16 flex flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
                  <ShoppingBag className="size-7 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground">
                  {hasFilters ? dict.catalog.emptyFiltered : dict.catalog.empty}
                </p>
              </div>
            </AnimateIn>
          )}
        </div>
      </main>
    </div>
  )
}
