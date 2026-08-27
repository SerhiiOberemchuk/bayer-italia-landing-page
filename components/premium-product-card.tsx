import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { siteUrl, type Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import type { ObriymProduct } from "@/lib/obriym/types";
import {
  formatMoney,
  getCustomField,
  getProductName,
  getProductPrice,
} from "@/lib/storefront/products";

export function PremiumProductCard({
  product,
  locale,
}: {
  product: ObriymProduct;
  locale: Locale;
}) {
  const name = getProductName(product, locale);
  const price = getProductPrice(product, "EUR");
  const image = product.images[0]?.url || null;
  const size = getCustomField(product, ["size", "розмір", "taglia"]);
  const inStock = product.stock === null || product.stock > 0;
  const productPath = withLocalePath(locale, `/catalog/${product.id}`);
  const question =
    locale === "uk"
      ? `Вітаю! Маю питання щодо товару «${name}»: ${siteUrl}${productPath}`
      : `Hello! I have a question about “${name}”: ${siteUrl}${productPath}`;
  const questionUrl = `https://t.me/raisa_orb?text=${encodeURIComponent(question)}`;

  return (
    <article className="group h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#eeeae3]">
        <Link
          href={productPath}
          aria-label={name}
          className="block h-full"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center font-serif text-xl italic text-muted-foreground/55">
              Buyer Italia
            </div>
          )}
        </Link>

        {price.compareAtAmount && price.compareAtAmount > price.amount ? (
          <span className="absolute left-3 top-3 bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]">
            Sale
          </span>
        ) : null}

        {inStock ? (
          <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
            <AddToCartButton
              compact
              locale={locale}
              item={{
                productId: product.id,
                name,
                sku: product.sku,
                price: price.amount,
                currency: price.currency,
                image,
                maxQuantity: product.stock,
              }}
            />
          </div>
        ) : (
          <span className="absolute bottom-3 left-3 bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]">
            {locale === "uk" ? "Немає в наявності" : "Unavailable"}
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 pt-4">
        <div className="min-w-0">
          <Link href={productPath}>
            <h3 className="truncate text-[13px] font-medium uppercase tracking-[0.055em]">
              {name}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            {[product.category?.name, size].filter(Boolean).join(" · ") ||
              (locale === "uk" ? "Відібрано в Італії" : "Curated in Italy")}
          </p>
        </div>
        <div className="shrink-0 text-right text-[13px]">
          <span>{formatMoney(price.amount, price.currency, locale)}</span>
          {price.compareAtAmount && price.compareAtAmount > price.amount ? (
            <span className="ml-2 text-muted-foreground line-through">
              {formatMoney(price.compareAtAmount, price.currency, locale)}
            </span>
          ) : null}
        </div>
      </div>
      {!inStock ? (
        <a
          href={questionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block border-b border-foreground pb-1 text-[10px] font-medium uppercase tracking-[0.15em]"
        >
          {locale === "uk" ? "Запитати про товар" : "Ask about this item"}
        </a>
      ) : null}
    </article>
  );
}
