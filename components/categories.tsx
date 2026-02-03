import { Card, CardContent } from "@/components/ui/card"
import { Shirt, Footprints, Briefcase, Watch, Sparkles, Baby } from "lucide-react"

const categories = [
  {
    icon: Shirt,
    title: "Верхній одяг",
    description: "Пальта, куртки, тренчі"
  },
  {
    icon: Footprints,
    title: "Взуття",
    description: "Черевики, кросівки, туфлі"
  },
  {
    icon: Briefcase,
    title: "Костюми",
    description: "Піджаки, штани, комплекти"
  },
  {
    icon: Watch,
    title: "Аксесуари",
    description: "Сумки, ремені, шарфи"
  },
  {
    icon: Sparkles,
    title: "Трикотаж",
    description: "Светри, кардигани, джемпери"
  },
  {
    icon: Baby,
    title: "Дитячий одяг",
    description: "Для малюків та підлітків"
  }
]

export function Categories() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Що привозимо
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Широкий асортимент оригінальних речей з Італії
        </p>

        <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.title} className="group border bg-card hover:shadow-lg transition-all duration-300 rounded-2xl cursor-pointer hover:border-italy-green/30">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-italy-green/10 transition-colors">
                  <category.icon className="size-6 text-muted-foreground group-hover:text-italy-green transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
