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

const databaseUrl = process.env.DATABASE_URL
const sql = databaseUrl ? neon(databaseUrl) : null

/**
 * Готовий до використання екземпляр Drizzle.
 * Передаємо schema, щоб працювали relational queries.
 */
export const db = sql ? drizzle(sql, { schema }) : null
export const hasDatabase = db !== null

export function getDb() {
  if (!db) {
    throw new Error("DATABASE_URL environment variable is not set")
  }

  return db
}

/** Реекспорт схеми для зручності */
export { schema }
