import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { uploadTelegramPhotosToBlob } from "@/lib/telegram/photos"
import { normalizeProduct, type RawProductData } from "@/lib/telegram/normalize"

/* ------------------------------------------------------------------ */
/*  Telegram Bot Webhook                                              */
/*  Обробляє channel_post & edited_channel_post з тегом #item.       */
/*                                                                    */
/*  Потік даних:                                                      */
/*    1. Валідація секретного токена                                   */
/*    2. Парсинг повідомлення (key: value рядки)                      */
/*    3. Завантаження фото з Telegram → Vercel Blob                   */
/*    4. Нормалізація + переклад через AI (Vercel AI Gateway)         */
/*    5. UPSERT у Postgres через Drizzle ORM                          */
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
 * Маппінг ключів → поля таблиці products.
 * Підтримуються українські та англійські ключі.
 */
function mapToProduct(fields: Record<string, string>) {
  const keyMap: Record<string, string> = {
    name: "title",
    title: "title",
    price: "price",
    brand: "brand",
    size: "size",
    condition: "condition",
    category: "category",
    note: "note",
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
  }
  return product
}

/**
 * Витягує найбільший file_id фото з повідомлення Telegram.
 * Telegram надсилає кілька розмірів -- беремо останній (найбільший).
 */
function extractPhotoIds(message: Record<string, unknown>): string[] {
  const photos = message.photo as
    | Array<{ file_id: string; file_size?: number }>
    | undefined
  if (!photos || photos.length === 0) return []
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

    // 2. Визначаємо тип поста
    const message =
      (update.channel_post as Record<string, unknown>) ??
      (update.edited_channel_post as Record<string, unknown>) ??
      null

    if (!message) {
      return NextResponse.json({ ok: true, skipped: "not_channel_post" })
    }

    // 3. Перевіряємо наявність #item
    const text = (message.text as string) ?? (message.caption as string) ?? ""
    if (!text.toLowerCase().includes(TAG)) {
      return NextResponse.json({ ok: true, skipped: "no_item_tag" })
    }

    // 4. Парсимо поля key:value
    const raw = parseFields(text)
    const product = mapToProduct(raw)

    if (!product.title) {
      return NextResponse.json({ ok: true, skipped: "missing_title" })
    }

    const price = parseInt(product.price ?? "", 10)
    if (isNaN(price)) {
      return NextResponse.json({ ok: true, skipped: "invalid_price" })
    }

    // 5. Telegram-ідентифікатори
    const tgChatId = (message.chat as Record<string, unknown>)?.id as number
    const tgMessageId = message.message_id as number

    // 6. Паралельно: завантажуємо фото в Blob + нормалізуємо через AI
    const fileIds = extractPhotoIds(message)

    const rawData: RawProductData = {
      title: product.title,
      price,
      brand: product.brand ?? "",
      size: product.size ?? "",
      condition: product.condition ?? "",
      category: product.category ?? "",
      note: product.note ?? null,
    }

    const [blobUrls, normalized] = await Promise.all([
      // Фото: Telegram file_id → Vercel Blob URL
      fileIds.length > 0
        ? uploadTelegramPhotosToBlob(fileIds, `products/${tgMessageId}`)
        : Promise.resolve([]),
      // AI: нормалізація + переклад UK/EN
      normalizeProduct(rawData),
    ])

    // 7. UPSERT через Drizzle ORM
    await db
      .insert(products)
      .values({
        title: product.title,
        titleUk: normalized.titleUk,
        titleEn: normalized.titleEn,
        price,
        brand: normalized.brand,
        size: normalized.size,
        condition: product.condition ?? "",
        conditionUk: normalized.conditionUk,
        conditionEn: normalized.conditionEn,
        category: product.category ?? "",
        categoryUk: normalized.categoryUk,
        categoryEn: normalized.categoryEn,
        note: product.note ?? null,
        noteUk: normalized.noteUk,
        noteEn: normalized.noteEn,
        images: blobUrls,
        tgChatId,
        tgMessageId,
      })
      .onConflictDoUpdate({
        target: products.tgMessageId,
        set: {
          title: product.title,
          titleUk: normalized.titleUk,
          titleEn: normalized.titleEn,
          price,
          brand: normalized.brand,
          size: normalized.size,
          condition: product.condition ?? "",
          conditionUk: normalized.conditionUk,
          conditionEn: normalized.conditionEn,
          category: product.category ?? "",
          categoryUk: normalized.categoryUk,
          categoryEn: normalized.categoryEn,
          note: product.note ?? null,
          noteUk: normalized.noteUk,
          noteEn: normalized.noteEn,
          images: blobUrls,
          tgChatId,
          updatedAt: new Date(),
        },
      })

    return NextResponse.json({ ok: true, tg_message_id: tgMessageId })
  } catch (err) {
    console.error("[telegram-webhook] Помилка обробки update:", err)
    // Завжди 200, щоб Telegram не повторював запит нескінченно
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 200 }
    )
  }
}
