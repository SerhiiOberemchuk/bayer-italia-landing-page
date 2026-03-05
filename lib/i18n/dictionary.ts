import { cacheLife, cacheTag } from "next/cache"
import type { Locale } from "./config"
import type { Dictionary } from "./messages/uk"

const dictionaries = {
  uk: () => import("./messages/uk").then((m) => m.default),
  en: () => import("./messages/en").then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  "use cache"

  cacheTag("dictionary", `dictionary:${locale}`)
  cacheLife("max")

  return dictionaries[locale]()
}

export type { Dictionary }
