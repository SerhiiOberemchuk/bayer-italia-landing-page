import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

/* ------------------------------------------------------------------ */
/*  Telegram Bot Webhook – handles channel_post & edited_channel_post */
/* ------------------------------------------------------------------ */

const TAG = "#item"

/* ---- tiny helpers ------------------------------------------------ */

/** Normalise a key coming from the post text (lowercase, trim). */
function normaliseKey(raw: string): string {
  return raw.trim().toLowerCase().replace(/:$/, "")
}

/** Parse "key: value" lines from the text block. */
function parseFields(text: string): Record<string, string> {
  const fields: Record<string, string> = {}
  for (const line of text.split("\n")) {
    // skip the hashtag line itself
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

/** Map parsed keys → DB column values. Accepts Ukrainian + English keys. */
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
    // unknown keys are silently ignored
  }
  return product
}

/** Extract the biggest photo file_id from each photo group. */
function extractPhotoIds(
  message: Record<string, unknown>
): string[] {
  const photos = message.photo as
    | Array<{ file_id: string; file_size?: number }>
    | undefined
  if (!photos || photos.length === 0) return []

  // Telegram sends multiple sizes – pick the largest per group
  // For a single message the array IS the group, so just take the last (largest).
  const largest = photos[photos.length - 1]
  return [largest.file_id]
}

/* ---- main handler ------------------------------------------------ */

export async function POST(req: NextRequest) {
  // 1. Validate secret token
  const secret = req.headers.get("x-telegram-bot-api-secret-token")
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  try {
    const update = await req.json()

    // 2. Determine which kind of post we got
    const message =
      (update.channel_post as Record<string, unknown>) ??
      (update.edited_channel_post as Record<string, unknown>) ??
      null

    if (!message) {
      // Not a channel post – acknowledge and do nothing
      return NextResponse.json({ ok: true, skipped: "not_channel_post" })
    }

    // 3. Check for #item tag in text or caption
    const text = ((message.text as string) ?? (message.caption as string) ?? "")
    if (!text.toLowerCase().includes(TAG)) {
      return NextResponse.json({ ok: true, skipped: "no_item_tag" })
    }

    // 4. Parse key:value fields
    const raw = parseFields(text)
    const product = mapToProduct(raw)

    // Require at least a title and price
    if (!product.title) {
      return NextResponse.json({ ok: true, skipped: "missing_title" })
    }

    const price = parseInt(product.price ?? "", 10)
    if (isNaN(price)) {
      return NextResponse.json({ ok: true, skipped: "invalid_price" })
    }

    // 5. Collect photo file_ids
    const images = extractPhotoIds(message)

    // 6. Extract Telegram identifiers
    const tgChatId = (message.chat as Record<string, unknown>)?.id as number
    const tgMessageId = message.message_id as number

    // 7. Upsert into products
    const sql = getDb()

    await sql`
      INSERT INTO products (
        title, price, brand, size, condition, category, note,
        images, tg_chat_id, tg_message_id
      ) VALUES (
        ${product.title},
        ${price},
        ${product.brand ?? ""},
        ${product.size ?? ""},
        ${product.condition ?? ""},
        ${product.category ?? ""},
        ${product.note ?? null},
        ${JSON.stringify(images)}::jsonb,
        ${tgChatId},
        ${tgMessageId}
      )
      ON CONFLICT (tg_message_id) DO UPDATE SET
        title      = EXCLUDED.title,
        price      = EXCLUDED.price,
        brand      = EXCLUDED.brand,
        size       = EXCLUDED.size,
        condition  = EXCLUDED.condition,
        category   = EXCLUDED.category,
        note       = EXCLUDED.note,
        images     = EXCLUDED.images,
        tg_chat_id = EXCLUDED.tg_chat_id,
        updated_at = now()
    `

    return NextResponse.json({ ok: true, tg_message_id: tgMessageId })
  } catch (err) {
    console.error("[telegram-webhook] Error processing update:", err)
    // Always return 200 to Telegram so it doesn't retry endlessly
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 200 }
    )
  }
}
