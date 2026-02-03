import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Ірина",
    location: "Київ",
    text: "Замовляла пальто ZARA — прийшло швидше, ніж очікувала. Якість супер, оригінал 100%. Дякую за чудовий сервіс!",
    rating: 5
  },
  {
    name: "Оля",
    location: "Варшава",
    text: "Вже третє замовлення у Раїси. Завжди на звʼязку, допомагає з вибором розміру. Рекомендую всім!",
    rating: 5
  },
  {
    name: "Марина",
    location: "Львів",
    text: "Нарешті знайшла надійного баєра. Все прозоро: фото з магазину, чеки, швидка доставка. Буду замовляти ще!",
    rating: 5
  },
  {
    name: "Аня",
    location: "Берлін",
    text: "Замовляла дитячий одяг для сина. Все підійшло ідеально, якість відмінна. Дуже задоволена!",
    rating: 5
  },
  {
    name: "Катерина",
    location: "Одеса",
    text: "Купувала взуття Massimo Dutti. Раїса допомогла з розміром, надіслала заміри. Сіло ідеально!",
    rating: 5
  },
  {
    name: "Наталія",
    location: "Прага",
    text: "Чудовий сервіс! Швидкі відповіді, реальні фото, безпечна доставка. Однозначно рекомендую.",
    rating: 5
  }
]

export function Reviews() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Відгуки клієнтів
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Що кажуть наші клієнти про співпрацю
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="border bg-card rounded-2xl">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
