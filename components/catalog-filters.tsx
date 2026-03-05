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
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            {dict.brand}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("brand", "")}
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
                onClick={() =>
                  setFilter("brand", activeBrand === brand ? "" : brand)
                }
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
        </div>
      )}

      {/* Category filter */}
      {categories.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            {dict.category}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("category", "")}
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
                onClick={() =>
                  setFilter("category", activeCategory === cat ? "" : cat)
                }
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
        </div>
      )}

      {/* Size filter */}
      {sizes.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            {dict.size}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("size", "")}
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
                onClick={() =>
                  setFilter("size", activeSize === size ? "" : size)
                }
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
        </div>
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
