import { Button } from "@/components/ui/button"
import { Send, MessageCircle, Bell } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 md:p-12 text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-italy-green/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-italy-red/20 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-white/10">
              <Bell className="size-8 text-white" />
            </div>
            
            <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl lg:text-4xl text-balance">
              Підписуйтесь на Telegram — новинки щодня
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80 leading-relaxed">
              Першими дізнавайтесь про нові надходження, знижки та ексклюзивні пропозиції. Приєднуйтесь до нашої спільноти!
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl px-8 h-12"
                asChild
              >
                <a href="https://t.me/buyer_italia_shop" target="_blank" rel="noopener noreferrer">
                  <Send className="size-5" />
                  Перейти в Telegram
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto gap-2 rounded-xl px-8 h-12 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="https://t.me/raisa_orb" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5" />
                  Написати @raisa_orb
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
