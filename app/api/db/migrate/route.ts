/**
 * POST /api/db/migrate
 *
 * Створює таблицю `products`, якщо вона ще не існує.
 * Захищено заголовком: x-admin-secret
 *
 * Використання:
 *   curl -X POST https://your-domain.com/api/db/migrate \
 *     -H "x-admin-secret: YOUR_ADMIN_SECRET"
 */

import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  const secret = request.headers.get("x-admin-secret")

  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: "ADMIN_SECRET environment variable is not configured" },
      { status: 500 }
    )
  }

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Створюємо таблицю products (якщо не існує)
    // Структура відповідає Drizzle-схемі в lib/db/schema.ts
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id              uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
        title           text            NOT NULL,
        price           integer         NOT NULL,
        brand           text            NOT NULL DEFAULT '',
        size            text            NOT NULL DEFAULT '',
        condition       text            NOT NULL DEFAULT '',
        category        text            NOT NULL DEFAULT '',
        note            text,
        images          jsonb           NOT NULL DEFAULT '[]'::jsonb,
        tg_chat_id      bigint,
        tg_message_id   bigint          UNIQUE,
        created_at      timestamptz     NOT NULL DEFAULT now(),
        updated_at      timestamptz     NOT NULL DEFAULT now()
      )
    `

    // Індекси для швидкого пошуку та фільтрації
    await sql`CREATE INDEX IF NOT EXISTS idx_products_brand    ON products (brand)`
    await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products (category)`
    await sql`CREATE INDEX IF NOT EXISTS idx_products_created  ON products (created_at DESC)`
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_products_tg_msg ON products (tg_message_id)`

    return NextResponse.json({
      success: true,
      message: "Migration complete: products table is ready",
    })
  } catch (error) {
    console.error("Migration failed:", error)
    return NextResponse.json(
      {
        error: "Migration failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
