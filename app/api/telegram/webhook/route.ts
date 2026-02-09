import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"

/* ------------------------------------------------------------------ */
/*  Telegram Bot Webhook – обробка channel_post & edited_channel_post */
/* ------------------------------------------------------------------ */

const TAG = "#item"

/* ---- допоміжні функції ------------------------------------------- */

/** Нормалізує ключ із тексту поста (lowercase, trim). */
function normaliseKey(raw: string): string {
  return raw.trim().toLowerCase().replace(/:$/, "")
}

/** Парсить рядки "ключ: значення" з тексту повідомлення. */
function parseFields(text: string): Record<string, string> {
  const fields: Record<string, string> = {}
  for (const line of text.split("\n")) {
    // пропускаємо рядок із хештегом
    if (line.trim().startsWith("#")) continue
    const colonIdx = line.indexOf(":")
    if (colonIdx === -1) continue
    const key = normaliseKey(line.slice(0, colonIdx))
    const value = line.slice(colonIdx + 1).trim()
    if (key && value) {
      fields[key] = value
    }
  }
  return fields
}

/**
 * Маппінг розпарсених ключів → поля таблиці products.
 * Підтримуються українські та англійські ключі (без регістру).
 */
function mapToProduct(fields: Record<string, string>) {
  const keyMap: Record<string, string> = {
    // English
    name: "title",
    title: "title",
    price: "price",
    brand: "brand",
    size: "size",
    condition: "condition",
    category: "category",
    note: "note",
    // Ukrainian
    "назва": "title",
    "ціна": "price",
    "бренд": "brand",
    "розмір": "size",
    "стан": "condition",
    "категорія": "category",
    "примітка": "note",
    "нотатка": "note",
  }

  const product: Record<string, string> = {}
  for (const [raw, value] of Object.entries(fields)) {
    const mapped = keyMap[raw]
    if (mapped) {
      product[mapped] = value
    }
    // невідомі ключі мовчки ігноруються
  }
  return product
}

/** Витягує найбільший file_id фото з повідомлення Telegram. */
function extractPhotoIds(
  message: Record<string, unknown>
): string[] {
  const photos = message.photo as
    | Array<{ file_id: string; file_size?: number }>
    | undefined
  if (!photos || photos.length === 0) return []

  // Telegram надсилає кілька розмірів — беремо останній (найбільший)
  const largest = photos[photos.length - 1]
  return [largest.file_id]
}

/* ---- основний обробник ------------------------------------------- */

export async function POST(req: NextRequest) {
  // 1. Перевірка секретного токена
  const secret = req.headers.get("x-telegram-bot-api-secret-token")
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    )
  }

  try {
    const update = await req.json()

    // 2. Визначаємо тип поста (новий або відредагований)
    const message =
      (update.channel_post as Record<string, unknown>) ??
      (update.edited_channel_post as Record<string, unknown>) ??
      null

    if (!message) {
      // Не канальний пост — підтверджуємо отримання
      return NextResponse.json({ ok: true, skipped: "not_channel_post" })
    }

    // 3. Перевіряємо наявність #item у тексті або підписі
    const text = (message.text as string) ?? (message.caption as string) ?? ""
    if (!text.toLowerCase().includes(TAG)) {
      return NextResponse.json({ ok: true, skipped: "no_item_tag" })
    }

    // 4. Парсимо поля key:value
    const raw = parseFields(text)
    const product = mapToProduct(raw)

    // Вимагаємо щонайменше назву і ціну
    if (!product.title) {
      return NextResponse.json({ ok: true, skipped: "missing_title" })
    }

    const price = parseInt(product.price ?? "", 10)
    if (isNaN(price)) {
      return NextResponse.json({ ok: true, skipped: "invalid_price" })
    }

    // 5. Збираємо Telegram file_id фотографій
    const images = extractPhotoIds(message)

    // 6. Отримуємо Telegram-ідентифікатори
    const tgChatId = (message.chat as Record<string, unknown>)?.id as number
    const tgMessageId = message.message_id as number

    // 7. UPSERT через Drizzle ORM
    //    Якщо пост із таким tg_message_id вже є — оновлюємо поля,
    //    якщо ні — створюємо новий запис.
    await db
      .insert(products)
      .values({
        title: product.title,
        price,
        brand: product.brand ?? "",
        size: product.size ?? "",
        condition: product.condition ?? "",
        category: product.category ?? "",
        note: product.note ?? null,
        images,
        tgChatId,
        tgMessageId,
      })
      .onConflictDoUpdate({
        target: products.tgMessageId,
        set: {
          title: product.title,
          price,
          brand: product.brand ?? "",
          size: product.size ?? "",
          condition: product.condition ?? "",
          category: product.category ?? "",
          note: product.note ?? null,
          images,
          tgChatId,
          updatedAt: new Date(),
        },
      })

    return NextResponse.json({ ok: true, tg_message_id: tgMessageId })
  } catch (err) {
    console.error("[telegram-webhook] Помилка обробки update:", err)
    // Завжди повертаємо 200, щоб Telegram не повторював запит
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 200 }
    )
  }
}
