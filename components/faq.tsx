import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Чи точно це оригінал?",
    answer: "Так, ми закуповуємо товари виключно в офіційних магазинах Італії. Надаємо фото з магазину, чеки та бирки. Гарантуємо 100% оригінальність кожної речі."
  },
  {
    question: "Як зробити замовлення?",
    answer: "Напишіть нам в Telegram @raisa_orb або в канал @buyer_italia_shop. Вкажіть бажаний товар (можна скинути посилання), розмір та колір. Ми уточнимо наявність та назвемо фінальну ціну."
  },
  {
    question: "Чи можна замовити річ під замовлення?",
    answer: "Так, ми можемо знайти та закупити конкретну річ на ваше замовлення. Надішліть посилання або фото бажаного товару, і ми перевіримо наявність в магазинах Італії."
  },
  {
    question: "Скільки коштує доставка?",
    answer: "Доставка в Україну (Нова пошта) — від 250 грн залежно від ваги. Доставка в Європу — від 10€. Точну вартість розраховуємо індивідуально для кожного замовлення."
  },
  {
    question: "Як відбувається оплата?",
    answer: "Ми працюємо за передоплатою 100%. Приймаємо оплату на картку. Після оплати закуповуємо товар та надсилаємо фотозвіт."
  },
  {
    question: "Який термін доставки?",
    answer: "Доставка в Україну займає 7-10 днів, в Європу — 10-14 днів з моменту закупки. Ми надаємо трекінг-номер для відстеження посилки."
  },
  {
    question: "Чи можливе повернення або обмін?",
    answer: "Оскільки ми працюємо як баєр-сервіс, стандартне повернення неможливе. Але ми ретельно перевіряємо товар перед відправкою та допомагаємо з вибором правильного розміру."
  },
  {
    question: "Які бренди ви привозите?",
    answer: "Основний фокус — ZARA, Puma, Mango, COS та інші популярні бренди. Також можемо закупити товари з інших італійських магазинів за запитом."
  }
]

// JSON-LD structured data for FAQ SEO
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export function FAQ() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Часті питання
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Відповіді на найпопулярніші запитання
        </p>

        <div className="mt-12 rounded-2xl bg-card p-6 shadow-sm border">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
