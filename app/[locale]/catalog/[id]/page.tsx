import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct } from "@/actions/catalog";
import {
  ArrowLeft,
  Send,
  ShoppingBag,
  Tag,
  Ruler,
  Sparkles,
  StickyNote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLocale, siteUrl } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/animate-in";

/** Повертає локалізоване значення поля */
function localized(
  locale: string,
  uk: string | null | undefined,
  en: string | null | undefined,
  fallback: string | null | undefined,
): string {
  const value = locale === "uk" ? uk : en;
  return value || fallback || "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isValidLocale(locale)) return {};

  const product = await getProduct(id);
  if (!product) return {};

  const dict = await getDictionary(locale);
  const title = localized(
    locale,
    product.titleUk,
    product.titleEn,
    product.title,
  );
  const pathname = `/catalog/${id}`;
  const images = (product.images ?? []) as string[];

  return {
    title: `${title} | ${dict.catalog.title}`,
    description: `${product.brand} ${title} - ${product.price} ${dict.catalog.currency}`,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
    openGraph:
      images.length > 0
        ? { images: [{ url: images[0], width: 800, height: 1000 }] }
        : undefined,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <ProductDetailPageContent params={params} />
    </Suspense>
  );
}

async function ProductDetailPageContent({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale = ensureLocale(rawLocale);

  const [dict, product] = await Promise.all([
    getDictionary(locale),
    getProduct(id),
  ]);

  if (!product) {
    notFound();
  }

  // Localized fields
  const title = localized(
    locale,
    product.titleUk,
    product.titleEn,
    product.title,
  );
  const category = localized(
    locale,
    product.categoryUk,
    product.categoryEn,
    product.category,
  );
  const condition = localized(
    locale,
    product.conditionUk,
    product.conditionEn,
    product.condition,
  );
  const note = localized(locale, product.noteUk, product.noteEn, product.note);

  // Telegram prefilled message
  const telegramText = encodeURIComponent(
    locale === "uk"
      ? `Привіт! Цікавить товар: ${title} (ID: ${product.id}). Чи є він в наявності?`
      : `Hi! I'm interested in: ${title} (ID: ${product.id}). Is it available?`,
  );
  const telegramLink = `https://t.me/buyer_italia_shop?text=${telegramText}`;

  const images = (product.images ?? []) as string[];
  const hasImages = images.length > 0;
  const productPath = `/catalog/${product.id}`;
  const productUrl = `${siteUrl}${withLocalePath(locale, productPath)}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: `${product.brand} ${title}`,
    image: images,
    sku: product.id,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "uk" ? "Головна" : "Home",
        item: `${siteUrl}${withLocalePath(locale)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.catalog.title,
        item: `${siteUrl}${withLocalePath(locale, "/catalog")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: productUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content" className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          {/* Back link (mobile) */}
          <AnimateIn variant="fade-right">
            <Link
              href={withLocalePath(locale, "/catalog")}
              className="sm:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              {dict.catalog.backToCatalog}
            </Link>
          </AnimateIn>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image area */}
            <AnimateIn variant="fade-right" delay={100}>
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-secondary border border-border/40">
                {hasImages ? (
                  <>
                    <Image
                      src={images[0]}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    {/* Image counter */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-foreground/70 px-3 py-1.5 backdrop-blur-sm">
                        <ChevronLeft className="size-3.5 text-background/70" aria-hidden="true" />
                        <span className="text-xs font-medium text-background">
                          1 / {images.length}
                        </span>
                        <ChevronRight className="size-3.5 text-background/70" aria-hidden="true" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground/30">
                    <ShoppingBag className="size-16" strokeWidth={1} aria-hidden="true" />
                    <span className="text-sm font-medium tracking-wider uppercase">
                      {product.brand || "Buyer Italia"}
                    </span>
                    <p className="mt-2 text-xs text-muted-foreground/50 max-w-50 text-center">
                      {dict.catalog.noImages}
                    </p>
                  </div>
                )}
                {/* Condition badge */}
                {condition && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-card/90 text-foreground backdrop-blur-sm border-border/60 text-sm">
                      {condition}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail row for multiple images */}
              {images.length > 1 && (
                <ul className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label={dict.catalog.images}>
                  {images.map((img, i) => (
                    <li
                      key={i}
                      className={`relative size-16 shrink-0 rounded-xl overflow-hidden border-2 ${
                        i === 0
                          ? "border-italy-green"
                          : "border-border/40 opacity-60"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${title} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </AnimateIn>

            {/* Product details */}
            <div className="flex flex-col">
              <AnimateIn variant="fade-up" delay={150}>
                {product.brand && (
                  <p className="text-sm font-medium tracking-widest text-italy-green uppercase mb-2">
                    {product.brand}
                  </p>
                )}
                <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance leading-tight">
                  {title}
                </h1>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={250}>
                <p className="mt-4 text-4xl font-serif font-semibold text-foreground">
                  {product.price}{" "}
                  <span className="text-xl text-muted-foreground font-sans font-normal">
                    {dict.catalog.currency}
                  </span>
                </p>
              </AnimateIn>

              {/* Attributes */}
              <AnimateIn variant="fade-up" delay={350}>
                <div className="mt-8 flex flex-col gap-4">
                  {category && (
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                        <Tag className="size-4 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {dict.catalog.filters.category}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {category}
                        </p>
                      </div>
                    </div>
                  )}

                  {product.size && (
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                        <Ruler className="size-4 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {dict.catalog.filters.size}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {product.size}
                        </p>
                      </div>
                    </div>
                  )}

                  {condition && (
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                        <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {dict.catalog.condition}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {condition}
                        </p>
                      </div>
                    </div>
                  )}

                  {note && (
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <StickyNote className="size-4 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {dict.catalog.note}
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">
                          {note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimateIn>

              {/* CTA */}
              <AnimateIn variant="fade-up" delay={450}>
                <div className="mt-10 flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-full h-14 text-base font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    asChild
                  >
                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${dict.catalog.writeToTelegram}: ${title}`}
                    >
                      <Send className="size-5" aria-hidden="true" />
                      {dict.catalog.writeToTelegram}
                    </a>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    {dict.catalog.orderItem}
                  </p>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
