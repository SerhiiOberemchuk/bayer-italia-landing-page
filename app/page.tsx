import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Categories } from "@/components/categories"
import { ZaraSection } from "@/components/zara-section"
import { DeliveryPayment } from "@/components/delivery-payment"
import { TrustSection } from "@/components/trust-section"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-24 md:pb-0">
      <HeroSection />
      <HowItWorks />
      <Categories />
      <ZaraSection />
      <DeliveryPayment />
      <TrustSection />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBottomBar />
    </main>
  )
}
