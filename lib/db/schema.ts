/**
 * Drizzle ORM schema -- єдине джерело правди для структури бази даних.
 *
 * Таблиця `products` зберігає товари, які надходять
 * через Telegram-канал (webhook парсить #item-пости).
 *
 * Двомовні поля (title, category, condition, note) зберігаються
 * окремо для UK і EN: title_uk / title_en тощо.
 * AI-нормалізатор автоматично перекладає при збереженні.
 *
 * Поле `images` зберігає масив публічних Blob-URL
 * (раніше -- Telegram file_id, тепер завантажуються у Vercel Blob).
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

    /* ---- Двомовні поля ------------------------------------------ */

    /** Назва товару (оригінал із повідомлення, як fallback) */
    title: text("title").notNull(),
    /** Назва -- українська */
    titleUk: text("title_uk").notNull().default(""),
    /** Назва -- англійська */
    titleEn: text("title_en").notNull().default(""),

    /** Ціна в цілих одиницях EUR */
    price: integer("price").notNull(),

    /** Бренд: ZARA, Nike, Mango тощо */
    brand: text("brand").notNull().default(""),

    /** Розмір: S / M / L / 42 / One Size тощо */
    size: text("size").notNull().default(""),

    /** Стан товару (оригінал) */
    condition: text("condition").notNull().default(""),
    /** Стан -- українська */
    conditionUk: text("condition_uk").notNull().default(""),
    /** Стан -- англійська */
    conditionEn: text("condition_en").notNull().default(""),

    /** Категорія (оригінал) */
    category: text("category").notNull().default(""),
    /** Категорія -- українська */
    categoryUk: text("category_uk").notNull().default(""),
    /** Категорія -- англійська */
    categoryEn: text("category_en").notNull().default(""),

    /** Примітка (оригінал) */
    note: text("note"),
    /** Примітка -- українська */
    noteUk: text("note_uk"),
    /** Примітка -- англійська */
    noteEn: text("note_en"),

    /**
     * Масив публічних URL зображень (Vercel Blob).
     * Формат: ["https://....public.blob.vercel-storage.com/...jpg", ...]
     */
    images: jsonb("images").notNull().default([]),

    /** ID Telegram-чату (каналу), звідки прийшов пост */
    tgChatId: bigint("tg_chat_id", { mode: "number" }),

    /** ID повідомлення в Telegram -- використовується для upsert */
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
    index("idx_products_brand").on(table.brand),
    index("idx_products_category").on(table.category),
    index("idx_products_created").on(table.createdAt),
    uniqueIndex("idx_products_tg_msg").on(table.tgMessageId),
  ]
)

/** TypeScript-тип рядка з таблиці products */
export type Product = typeof products.$inferSelect

/** TypeScript-тип для вставки нового запису */
export type NewProduct = typeof products.$inferInsert
