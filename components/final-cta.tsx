import { Button } from "@/components/ui/button"
import { Send, MessageCircle, Bell } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface FinalCTAProps {
  dict: Dictionary["finalCta"]
}

export function FinalCTA({ dict }: FinalCTAProps) {
  return (
    <section
      className="px-4 py-16 md:px-8 md:py-24"
      aria-labelledby="final-cta-title"
    >
      <div className="mx-auto max-w-4xl">
        <AnimateIn variant="scale" duration={700}>
          <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 md:p-12 text-center">
            {/* Decorative elements */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 w-32 h-32 bg-italy-green/20 rounded-full blur-3xl animate-gentle-pulse"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-32 h-32 bg-italy-red/20 rounded-full blur-3xl animate-gentle-pulse"
              style={{ animationDelay: "1.5s" }}
            />
            
            <div className="relative">
              <AnimateIn variant="fade-down" delay={200}>
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-white/10">
                  <Bell className="size-8 text-white" aria-hidden="true" />
                </div>
              </AnimateIn>
              
              <AnimateIn variant="fade-up" delay={300}>
                <h2
                  id="final-cta-title"
                  className="font-serif text-2xl font-semibold text-white md:text-3xl lg:text-4xl text-balance"
                >
                  {dict.title}
                </h2>
              </AnimateIn>
              <AnimateIn variant="fade-up" delay={400}>
                <p className="mx-auto mt-4 max-w-xl text-white/80 leading-relaxed">
                  {dict.subtitle}
                </p>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={500}>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto gap-2 bg-[#005e8a] hover:bg-[#004a6b] text-white rounded-xl px-8 h-12 transition-transform hover:scale-[1.03] active:scale-[0.97]"
                    asChild
                  >
                    <a
                      href="https://t.me/buyer_italia_shop"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Buyer Italia Telegram channel"
                    >
                      <Send className="size-5" aria-hidden="true" />
                      {dict.ctaTelegram}
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto gap-2 rounded-xl px-8 h-12 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
                    asChild
                  >
                    <a
                      href="https://t.me/raisa_orb"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Write to Raisa on Telegram"
                    >
                      <MessageCircle className="size-5" aria-hidden="true" />
                      {dict.ctaPersonal}
                    </a>
                  </Button>
                </div>
              </AnimateIn>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
