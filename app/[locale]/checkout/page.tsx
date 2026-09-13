import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { ensureLocale } from "@/lib/i18n/server";
import { isCatalogEnabled } from "@/lib/storefront/catalog-visibility";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  if (!isCatalogEnabled) notFound();

  const locale = ensureLocale((await params).locale);
  return (
    <main id="main-content">
      <CheckoutForm locale={locale} />
    </main>
  );
}
