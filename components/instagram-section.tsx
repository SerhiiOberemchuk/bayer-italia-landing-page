import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, Play } from "lucide-react"

const reels = [
  {
    id: 1,
    title: "Розпаковка ZARA",
    views: "12.5K"
  },
  {
    id: 2,
    title: "Шопінг в Мілані",
    views: "8.3K"
  },
  {
    id: 3,
    title: "Нова колекція",
    views: "15.1K"
  }
]

export function InstagramSection() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Instagram / Reels
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Дивіться відео з шопінгу та розпаковок
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {reels.map((reel) => (
            <Card key={reel.id} className="group overflow-hidden border-0 bg-card shadow-md rounded-2xl cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="relative aspect-[9/16] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="size-8 text-foreground ml-1" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm font-medium text-foreground">{reel.title}</p>
                    <p className="text-xs text-muted-foreground">{reel.views} переглядів</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="gap-2 rounded-xl px-6 h-11 border-2 bg-transparent"
            asChild
          >
            <a href="https://instagram.com/buyer_italia" target="_blank" rel="noopener noreferrer">
              <Instagram className="size-5" />
              Перейти в Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
