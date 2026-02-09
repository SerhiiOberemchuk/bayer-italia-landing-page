import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

console.log("Running migration: creating products table...")

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

console.log("Created products table")

await sql`CREATE INDEX IF NOT EXISTS idx_products_brand    ON products (brand)`
await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products (category)`
await sql`CREATE INDEX IF NOT EXISTS idx_products_created  ON products (created_at DESC)`

console.log("Created indexes on brand, category, created_at")
console.log("Migration complete!")
