import { getDictionary } from "@/lib/i18n/get-dictionary"
import { isValidLocale } from "@/lib/i18n/config"
import { notFound } from "next/navigation"
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
import { Footer } from "@/components/footer"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)

  return (
    <main className="min-h-screen bg-background pb-24 md:pb-0">
      <HeroSection dict={dict.hero} locale={locale} />
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
      <Footer dict={dict.footer} locale={locale} />
      <StickyBottomBar dict={dict.stickyBar} />
    </main>
  )
}
