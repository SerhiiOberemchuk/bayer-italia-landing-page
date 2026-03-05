import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ProductType } from "@/lib/db/schema"
import type { Locale } from "@/lib/i18n/config"
import { withLocalePath } from "@/lib/i18n/routing"

interface ProductCardProps {
  product: ProductType
  locale: Locale
  currencyLabel: string
}

/**
 * Повертає локалізоване значення поля.
 * Спершу шукає переклад (uk/en), потім fallback на оригінал.
 */
function localized(
  locale: string,
  uk: string | null | undefined,
  en: string | null | undefined,
  fallback: string | null | undefined
): string {
  const value = locale === "uk" ? uk : en
  return value || fallback || ""
}

export function ProductCard({ product, locale, currencyLabel }: ProductCardProps) {
  const title = localized(locale, product.titleUk, product.titleEn, product.title)
  const category = localized(locale, product.categoryUk, product.categoryEn, product.category)
  const condition = localized(locale, product.conditionUk, product.conditionEn, product.condition)
  const images = (product.images ?? []) as string[]
  const hasImage = images.length > 0
  const cardLabel = `${title}. ${product.price} ${currencyLabel}`

  return (
    <Link
      href={withLocalePath(locale, `/catalog/${product.id}`)}
      aria-label={cardLabel}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-lg"
    >
      {/* Image / placeholder */}
      <div className="relative aspect-[4/5] bg-secondary flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
            <ShoppingBag className="size-10" strokeWidth={1.2} aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">
              {product.brand || "Buyer Italia"}
            </span>
          </div>
        )}
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-foreground/90 px-3 py-1 text-sm font-semibold text-background backdrop-blur-sm">
            {product.price} {currencyLabel}
          </span>
        </div>
        {/* Condition badge */}
        {condition && (
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-card/90 backdrop-blur-sm text-foreground text-xs"
            >
              {condition}
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-base font-semibold text-foreground line-clamp-2 group-hover:text-italy-green transition-colors duration-200">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 mt-auto">
          {product.brand && (
            <Badge
              variant="outline"
              className="rounded-md border-border/60 text-xs font-normal text-muted-foreground"
            >
              {product.brand}
            </Badge>
          )}
          {category && (
            <Badge
              variant="outline"
              className="rounded-md border-border/60 text-xs font-normal text-muted-foreground"
            >
              <Tag className="size-3 mr-0.5" aria-hidden="true" />
              {category}
            </Badge>
          )}
          {product.size && (
            <Badge
              variant="outline"
              className="rounded-md border-border/60 text-xs font-normal text-muted-foreground"
            >
              {product.size}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
