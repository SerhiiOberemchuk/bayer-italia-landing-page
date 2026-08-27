import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";
import { ensureLocale } from "@/lib/i18n/server";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CartRoute({ params }: { params: Promise<{ locale: string }> }) {
  const locale = ensureLocale((await params).locale);
  return (
    <main id="main-content">
      <CartPage locale={locale} />
    </main>
  );
}
