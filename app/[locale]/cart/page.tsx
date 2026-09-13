import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartPage } from "@/components/cart/cart-page";
import { ensureLocale } from "@/lib/i18n/server";
import { isCatalogEnabled } from "@/lib/storefront/catalog-visibility";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CartRoute({ params }: { params: Promise<{ locale: string }> }) {
  if (!isCatalogEnabled) notFound();

  const locale = ensureLocale((await params).locale);
  return (
    <main id="main-content">
      <CartPage locale={locale} />
    </main>
  );
}
