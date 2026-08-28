import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ShieldCheck, Truck, MessageCircle, Send } from "lucide-react";
import { getProduct } from "@/actions/catalog/get-product";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ensureLocale } from "@/lib/i18n/server";
import { isValidLocale, siteUrl } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import {
  formatMoney,
  getCustomField,
  getProductDescription,
  getProductName,
  getProductPrice,
} from "@/lib/storefront/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isValidLocale(locale)) return {};
  const product = await getProduct(id);
  if (!product) return {};

  const name = getProductName(product, locale);
  const description = getProductDescription(product, locale) || `${name} — Buyer Italia`;
  const pathname = `/catalog/${id}`;

  return {
    title: name,
    description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
    openGraph: product.images[0]?.url ? { images: [product.images[0].url] } : undefined,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

async function ProductDetailContent({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale = ensureLocale(rawLocale);
  const isUk = locale === "uk";
  const product = await getProduct(id);
  if (!product || product.status !== "active") notFound();

  const name = getProductName(product, locale);
  const description = getProductDescription(product, locale);
  const price = getProductPrice(product, "EUR");
  const size = getCustomField(product, ["size", "розмір", "taglia"]);
  const color = getCustomField(product, ["color", "колір", "colore"]);
  const condition = getCustomField(product, ["condition", "стан", "condizione"]);
  const image = product.images[0]?.url || null;
  const inStock = product.stock === null || product.stock > 0;
  const productUrl = `${siteUrl}${withLocalePath(locale, `/catalog/${product.id}`)}`;
  const question = isUk
    ? `Вітаю! Маю питання щодо товару «${name}»: ${productUrl}`
    : `Hello! I have a question about “${name}”: ${productUrl}`;
  const questionUrl = `https://t.me/raisa_orb?text=${encodeURIComponent(question)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: product.images.map((item) => item.url),
    sku: product.sku || product.id,
    brand: product.brand?.name ? { "@type": "Brand", name: product.brand.name } : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: price.currency,
      price: price.amount,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: productUrl,
    },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1480px] px-4 py-6 md:px-8 md:py-10">
        <Link
          href={withLocalePath(locale, "/catalog")}
          className="mb-7 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {isUk ? "Назад до магазину" : "Back to shop"}
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:gap-16">
          <div>
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible">
              {product.images.length > 0 ? (
                product.images.map((item, index) => (
                  <div
                    key={item.url}
                    className={`relative aspect-[3/4] min-w-full shrink-0 snap-center bg-secondary sm:min-w-0 ${index === 0 && product.images.length % 2 === 1 ? "sm:col-span-2 sm:aspect-[16/11]" : ""}`}
                  >
                    <Image
                      src={item.url}
                      alt={`${name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 38vw"
                      priority={index === 0}
                    />
                  </div>
                ))
              ) : (
                <div className="flex aspect-[3/4] min-w-full shrink-0 items-center justify-center bg-secondary font-serif text-3xl italic text-muted-foreground/60 sm:col-span-2 sm:min-w-0">
                  Buyer Italia
                </div>
              )}
            </div>
            {product.images.length > 1 ? (
              <p className="mt-2 text-right text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
                {isUk ? `Гортайте фото · ${product.images.length}` : `Swipe photos · ${product.images.length}`}
              </p>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-32 lg:h-fit lg:pr-[4vw]">
            <p className="premium-eyebrow text-muted-foreground">
              {product.brand?.name || product.category?.name || "Buyer Italia"}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-[-0.035em] md:text-5xl">
              {name}
            </h1>
            <div className="mt-5 flex items-center gap-3 text-base">
              <span>{formatMoney(price.amount, price.currency, locale)}</span>
              {price.compareAtAmount && price.compareAtAmount > price.amount ? (
                <span className="text-muted-foreground line-through">
                  {formatMoney(price.compareAtAmount, price.currency, locale)}
                </span>
              ) : null}
            </div>

            <p className="mt-7 text-sm leading-7 text-muted-foreground">
              {description ||
                (isUk
                  ? "Оригінальна річ, відібрана в Італії командою Buyer Italia."
                  : "An original piece selected in Italy by Buyer Italia.")}
            </p>

            {(size || color || condition || product.sku) && (
              <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                {size ? <div className="flex justify-between py-4"><dt className="text-muted-foreground">{isUk ? "Розмір" : "Size"}</dt><dd>{size}</dd></div> : null}
                {color ? <div className="flex justify-between py-4"><dt className="text-muted-foreground">{isUk ? "Колір" : "Color"}</dt><dd>{color}</dd></div> : null}
                {condition ? <div className="flex justify-between py-4"><dt className="text-muted-foreground">{isUk ? "Стан" : "Condition"}</dt><dd>{condition}</dd></div> : null}
                {product.sku ? <div className="flex justify-between py-4"><dt className="text-muted-foreground">SKU</dt><dd>{product.sku}</dd></div> : null}
              </dl>
            )}

            <div className="mt-8">
              {inStock ? (
                <>
                  <AddToCartButton
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
                  <p className="mt-3 text-center text-[11px] leading-5 text-muted-foreground">
                    {isUk
                      ? "Наявність і доставку підтвердить менеджер. Оплата на сайті не списується."
                      : "Availability and delivery are confirmed by a manager. No online charge is made."}
                  </p>
                </>
              ) : (
                <div className="border-y border-border py-6">
                  <p className="premium-eyebrow text-muted-foreground">
                    {isUk ? "Наразі немає в наявності" : "Currently unavailable"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {isUk
                      ? "Цю позицію не можна замовити зараз. Запитайте про схожий товар або стежте за новими надходженнями в Telegram."
                      : "This piece cannot be ordered right now. Ask about a similar item or follow new arrivals on Telegram."}
                  </p>
                  <div className="mt-5 grid gap-3">
                    <a
                      href={questionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-13 items-center justify-center gap-2 bg-foreground px-6 text-xs font-medium uppercase tracking-[0.15em] text-background transition-colors hover:bg-[#34322f]"
                    >
                      <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      {isUk ? "Запитати про цей товар" : "Ask about this item"}
                    </a>
                    <a
                      href="https://t.me/buyer_italia_shop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-13 items-center justify-center gap-2 border border-foreground px-6 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background"
                    >
                      <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      {isUk ? "Новинки в Telegram" : "New arrivals on Telegram"}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-4 border-t border-border pt-6 text-xs leading-5 text-muted-foreground">
              <p className="flex gap-3"><ShieldCheck className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />{isUk ? "Оригінальність підтверджується покупкою в офіційних магазинах Італії." : "Authenticity is backed by sourcing from official Italian stores."}</p>
              <p className="flex gap-3"><Truck className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />{isUk ? "Доставка в Україну та країни Європи після підтвердження замовлення." : "Delivery to Ukraine and across Europe after confirmation."}</p>
              {inStock ? <a className="flex gap-3 hover:text-foreground" href={questionUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />{isUk ? "Потрібна консультація? Напишіть особистому баєру." : "Need advice? Message your personal buyer."}</a> : null}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ProductDetailSkeleton() {
  return (
    <main id="main-content" className="mx-auto max-w-[1480px] px-4 py-10 md:px-8">
      <div className="grid animate-pulse gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div className="aspect-[4/5] bg-secondary sm:aspect-[16/11]" />
        <div className="space-y-5 pt-8">
          <div className="h-3 w-28 bg-secondary" />
          <div className="h-12 w-4/5 bg-secondary" />
          <div className="h-5 w-24 bg-secondary" />
          <div className="h-24 w-full bg-secondary" />
        </div>
      </div>
    </main>
  );
}
