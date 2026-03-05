"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface CatalogFiltersProps {
  dict: Dictionary["catalog"]["filters"]
  brands: string[]
  categories: string[]
  sizes: string[]
}

export function CatalogFilters({
  dict,
  brands,
  categories,
  sizes,
}: CatalogFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeBrand = searchParams.get("brand") ?? ""
  const activeCategory = searchParams.get("category") ?? ""
  const activeSize = searchParams.get("size") ?? ""

  const hasFilters = activeBrand || activeCategory || activeSize

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  return (
    <div className="flex flex-col gap-6">
      {/* Brand filter */}
      {brands.length > 0 && (
        <section aria-labelledby="brand-filter-title">
          <h2 id="brand-filter-title" className="mb-2 text-sm font-medium text-muted-foreground">
            {dict.brand}
          </h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label={dict.brand}>
            <button
              type="button"
              onClick={() => setFilter("brand", "")}
              aria-pressed={!activeBrand}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                !activeBrand
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {dict.all}
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() =>
                  setFilter("brand", activeBrand === brand ? "" : brand)
                }
                aria-pressed={activeBrand === brand}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeBrand === brand
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Category filter */}
      {categories.length > 0 && (
        <section aria-labelledby="category-filter-title">
          <h2 id="category-filter-title" className="mb-2 text-sm font-medium text-muted-foreground">
            {dict.category}
          </h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label={dict.category}>
            <button
              type="button"
              onClick={() => setFilter("category", "")}
              aria-pressed={!activeCategory}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                !activeCategory
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {dict.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setFilter("category", activeCategory === cat ? "" : cat)
                }
                aria-pressed={activeCategory === cat}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Size filter */}
      {sizes.length > 0 && (
        <section aria-labelledby="size-filter-title">
          <h2 id="size-filter-title" className="mb-2 text-sm font-medium text-muted-foreground">
            {dict.size}
          </h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label={dict.size}>
            <button
              type="button"
              onClick={() => setFilter("size", "")}
              aria-pressed={!activeSize}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                !activeSize
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {dict.all}
            </button>
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setFilter("size", activeSize === size ? "" : size)
                }
                aria-pressed={activeSize === size}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeSize === size
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Reset */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="w-fit gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
          {dict.reset}
        </Button>
      )}
    </div>
  )
}
