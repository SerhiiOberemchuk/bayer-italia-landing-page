import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLocale, siteUrl } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import { PremiumHero } from "@/components/premium-hero";
import { ProofSection } from "@/components/proof-section";
import { HowItWorks } from "@/components/how-it-works";
import { DeliveryPayment } from "@/components/delivery-payment";
import { Reviews } from "@/components/reviews";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { SeoLinks } from "@/components/seo-links";
import { InStockShowcase } from "@/components/in-stock-showcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const pathname = "/";

  return {
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = ensureLocale((await params).locale);
  const dict = await getDictionary(locale);

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <PremiumHero dict={dict.hero} locale={locale} />
      <InStockShowcase dict={dict.inStock} locale={locale} />
      <ProofSection locale={locale} />
      <HowItWorks dict={dict.howItWorks} />
      <DeliveryPayment dict={dict.delivery} />
      <Reviews dict={dict.reviews} />
      <SeoLinks locale={locale} />
      <FAQ dict={dict.faq} />
      <FinalCTA dict={dict.finalCta} />
    </main>
  );
}
