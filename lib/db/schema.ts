/**
 * Drizzle ORM schema — єдине джерело правди для структури бази даних.
 *
 * Таблиця `products` зберігає товари, які надходять
 * через Telegram-канал (webhook парсить #item-пости).
 */

import {
  pgTable,
  uuid,
  text,
  integer,
  bigint,
  jsonb,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const products = pgTable(
  "products",
  {
    /** Унікальний ідентифікатор товару (UUID v4) */
    id: uuid("id").primaryKey().defaultRandom(),

    /** Назва товару (парситься з поля name / назва) */
    title: text("title").notNull(),

    /** Ціна в центах або цілих одиницях (парситься як integer) */
    price: integer("price").notNull(),

    /** Бренд: ZARA, Nike, Mango тощо */
    brand: text("brand").notNull().default(""),

    /** Розмір: S / M / L / 42 / One Size тощо */
    size: text("size").notNull().default(""),

    /** Стан товару: новий, як новий, б/у тощо */
    condition: text("condition").notNull().default(""),

    /** Категорія: одяг, взуття, аксесуари тощо */
    category: text("category").notNull().default(""),

    /** Додаткова примітка (необов'язково) */
    note: text("note"),

    /** Масив Telegram file_id для фото (JSON) */
    images: jsonb("images").notNull().default([]),

    /** ID Telegram-чату (каналу), звідки прийшов пост */
    tgChatId: bigint("tg_chat_id", { mode: "number" }),

    /** ID повідомлення в Telegram — використовується для upsert */
    tgMessageId: bigint("tg_message_id", { mode: "number" }).unique(),

    /** Дата створення запису */
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    /** Дата останнього оновлення */
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    /** Індекс для фільтрації за брендом */
    index("idx_products_brand").on(table.brand),

    /** Індекс для фільтрації за категорією */
    index("idx_products_category").on(table.category),

    /** Індекс для сортування за датою (нові спочатку) */
    index("idx_products_created").on(table.createdAt),

    /** Унікальний індекс для upsert по tg_message_id */
    uniqueIndex("idx_products_tg_msg").on(table.tgMessageId),
  ]
)

/** TypeScript-тип рядка з таблиці products */
export type Product = typeof products.$inferSelect

/** TypeScript-тип для вставки нового запису */
export type NewProduct = typeof products.$inferInsert
