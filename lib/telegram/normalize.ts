/**
 * AI-нормалізація та переклад даних товару на дві мови.
 *
 * Використовує Vercel AI Gateway (generateText + Output.object)
 * для:
 *   1. Нормалізації сирих даних (виправлення регістру, скорочень)
 *   2. Перекладу title, category, condition, note на UK та EN
 *   3. Уніфікації brand (стандартне написання)
 *
 * Якщо AI-виклик не вдається — повертає fallback із сирих даних,
 * щоб запис все одно потрапив у базу.
 */

import { generateText, Output } from "ai"
import { z } from "zod"

/**
 * Zod-схема результату нормалізації.
 * nullable() замість optional() -- вимога OpenAI strict mode.
 */
const NormalizedProductSchema = z.object({
  /** Нормалізована назва -- українською */
  titleUk: z.string(),
  /** Нормалізована назва -- англійською */
  titleEn: z.string(),

  /** Нормалізований бренд (стандартне написання, напр. "ZARA", "Nike") */
  brand: z.string(),

  /** Нормалізований розмір */
  size: z.string(),

  /** Стан -- українською */
  conditionUk: z.string(),
  /** Стан -- англійською */
  conditionEn: z.string(),

  /** Категорія -- українською */
  categoryUk: z.string(),
  /** Категорія -- англійською */
  categoryEn: z.string(),

  /** Примітка -- українською (якщо є) */
  noteUk: z.string().nullable(),
  /** Примітка -- англійською (якщо є) */
  noteEn: z.string().nullable(),
})

export type NormalizedProduct = z.infer<typeof NormalizedProductSchema>

/** Сирі дані товару з парсера Telegram-повідомлення */
export interface RawProductData {
  title: string
  price: number
  brand: string
  size: string
  condition: string
  category: string
  note: string | null
}

/**
 * Нормалізує та перекладає дані товару за допомогою AI.
 *
 * @param raw - сирі дані з Telegram-повідомлення
 * @returns нормалізовані двомовні поля
 */
export async function normalizeProduct(
  raw: RawProductData
): Promise<NormalizedProduct> {
  try {
    const result = await generateText({
      model: "openai/gpt-4o-mini",
      output: Output.object({ schema: NormalizedProductSchema }),
      system: `Ти -- асистент інтернет-магазину "Buyer Italia" (баєр-сервіс з Італії).
Твоя задача: отримати сирі дані про товар, нормалізувати їх та перекласти на дві мови (українська та англійська).

Правила:
- brand: напиши стандартне офіційне написання (ZARA, Nike, Adidas, Calvin Klein, Massimo Dutti тощо).
- size: залиш як є, тільки нормалізуй (S, M, L, XL, 42, One Size тощо).
- title: створи коротку, зрозумілу назву товару. Якщо оригінал вже зрозумілий — збережи суть.
- category: нормалізуй до однієї зі стандартних категорій (Одяг/Clothing, Взуття/Shoes, Аксесуари/Accessories, Сумки/Bags, Спорт/Sport).
- condition: нормалізуй (Нове/New, Відмінний/Excellent, Добрий/Good тощо).
- note: переклади примітку якщо є; якщо немає — поверни null.
- Відповідай ТІЛЬКИ структурованим JSON, без зайвого тексту.`,
      prompt: `Нормалізуй та переклади на UK та EN:
Назва: ${raw.title}
Бренд: ${raw.brand}
Розмір: ${raw.size}
Стан: ${raw.condition}
Категорія: ${raw.category}
Примітка: ${raw.note ?? "(немає)"}`,
    })

    if (result.output) {
      return result.output
    }

    // Якщо AI не повернув об'єкт — fallback
    console.warn("[normalize] AI returned no output, using fallback")
    return buildFallback(raw)
  } catch (err) {
    console.error("[normalize] AI normalization failed:", err)
    return buildFallback(raw)
  }
}

/**
 * Fallback: якщо AI недоступний, дублюємо оригінал в обидва поля.
 * Товар все одно потрапить у базу, а переклад можна додати пізніше.
 */
function buildFallback(raw: RawProductData): NormalizedProduct {
  return {
    titleUk: raw.title,
    titleEn: raw.title,
    brand: raw.brand,
    size: raw.size,
    conditionUk: raw.condition,
    conditionEn: raw.condition,
    categoryUk: raw.category,
    categoryEn: raw.category,
    noteUk: raw.note,
    noteEn: raw.note,
  }
}
