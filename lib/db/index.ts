/**
 * Drizzle ORM клієнт для Neon Postgres.
 *
 * Використання:
 *   import { db } from "@/lib/db"
 *   const rows = await db.select().from(products)
 */

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const sql = neon(process.env.DATABASE_URL)

/**
 * Готовий до використання екземпляр Drizzle.
 * Передаємо schema, щоб працювали relational queries.
 */
export const db = drizzle(sql, { schema })

/** Реекспорт схеми для зручності */
export { schema }
