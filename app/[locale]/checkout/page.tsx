import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { ensureLocale } from "@/lib/i18n/server";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = ensureLocale((await params).locale);
  return (
    <main id="main-content">
      <CheckoutForm locale={locale} />
    </main>
  );
}
