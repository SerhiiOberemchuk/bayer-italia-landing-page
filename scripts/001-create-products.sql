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
);

CREATE INDEX IF NOT EXISTS idx_products_brand    ON products (brand);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_created  ON products (created_at DESC);
