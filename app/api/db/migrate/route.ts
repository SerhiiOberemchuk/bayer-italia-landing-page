/**
 * POST /api/db/migrate
 *
 * Creates the `products` table if it doesn't exist.
 * Protected by a secret header: x-admin-secret
 *
 * Usage:
 *   curl -X POST https://your-domain.com/api/db/migrate \
 *     -H "x-admin-secret: YOUR_ADMIN_SECRET"
 */

import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

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
    const sql = getDb()

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id              uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
        title           text            NOT NULL,
        price           integer         NOT NULL,
        brand           text            NOT NULL,
        size            text            NOT NULL,
        condition       text            NOT NULL,
        category        text            NOT NULL,
        note            text,
        images          jsonb           NOT NULL DEFAULT '[]'::jsonb,
        tg_chat_id      bigint,
        tg_message_id   bigint          UNIQUE,
        created_at      timestamptz     NOT NULL DEFAULT now(),
        updated_at      timestamptz     NOT NULL DEFAULT now()
      )
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_products_brand    ON products (brand)
    `
    await sql`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products (category)
    `
    await sql`
      CREATE INDEX IF NOT EXISTS idx_products_created  ON products (created_at DESC)
    `

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
