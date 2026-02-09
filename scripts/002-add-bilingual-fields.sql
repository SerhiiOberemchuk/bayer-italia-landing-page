-- Додаємо двомовні поля для title, category, condition, note.
-- Існуючі колонки (title, category, condition, note) лишаються як оригінал/fallback.
-- Нові: *_uk (українська) та *_en (англійська).

ALTER TABLE products ADD COLUMN IF NOT EXISTS title_uk       TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS title_en       TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS condition_uk   TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS condition_en   TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_uk    TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_en    TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS note_uk        TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS note_en        TEXT;
