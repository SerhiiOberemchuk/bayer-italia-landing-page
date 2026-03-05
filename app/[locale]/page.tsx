import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionary"
import { isValidLocale, siteUrl } from "@/lib/i18n/config"
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing"
import { ensureLocale } from "@/lib/i18n/server"
import { HeroSection } from "@/components/hero-section"
import { BrandsMarquee } from "@/components/brands-marquee"
import { HowItWorks } from "@/components/how-it-works"
import { Categories } from "@/components/categories"
import { ZaraSection } from "@/components/zara-section"
import { DeliveryPayment } from "@/components/delivery-payment"
import { TrustSection } from "@/components/trust-section"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { PopularBrands } from "@/components/popular-brands"
import { FinalCTA } from "@/components/final-cta"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { SeoLinks } from "@/components/seo-links"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  const dict = await getDictionary(locale)
  const pathname = "/"

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${siteUrl}${withLocalePath(locale, pathname)}`,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ensureLocale((await params).locale)

  const dict = await getDictionary(locale)

  return (
    <main id="main-content" className="min-h-screen bg-background pb-24 md:pb-0">
      <HeroSection dict={dict.hero} />
      <SeoLinks locale={locale} />
      <BrandsMarquee />
      <HowItWorks dict={dict.howItWorks} />
      <Categories dict={dict.categories} />
      <ZaraSection dict={dict.zara} />
      <DeliveryPayment dict={dict.delivery} />
      <TrustSection dict={dict.trust} />
      <Reviews dict={dict.reviews} />
      <PopularBrands dict={dict.popularBrands} />
      <FAQ dict={dict.faq} />
      <FinalCTA dict={dict.finalCta} />
      <StickyBottomBar dict={dict.stickyBar} />
    </main>
  )
}
