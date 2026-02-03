import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Camera, MapPin, FileText, Headphones, RefreshCw } from "lucide-react"

const trustPoints = [
  {
    icon: CheckCircle,
    title: "100% оригінал",
    description: "Закуповуємо тільки в офіційних магазинах Італії"
  },
  {
    icon: Camera,
    title: "Реальні фото",
    description: "Фотозвіт кожної покупки перед відправкою"
  },
  {
    icon: MapPin,
    title: "Закупка напряму",
    description: "Без посередників — напряму з італійських бутиків"
  },
  {
    icon: FileText,
    title: "Прозорі умови",
    description: "Чітка калькуляція ціни без прихованих комісій"
  },
  {
    icon: Headphones,
    title: "Підтримка 24/7",
    description: "Завжди на звʼязку в Telegram для ваших питань"
  },
  {
    icon: RefreshCw,
    title: "Повторні замовлення",
    description: "80% клієнтів повертаються знову"
  }
]

export function TrustSection() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Чому нам довіряють
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          6 причин обрати Bayer Italia
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <Card key={point.title} className="border-0 bg-card shadow-md rounded-2xl">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-italy-green/10">
                  <point.icon className="size-6 text-italy-green" />
                </div>
                <h3 className="font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
