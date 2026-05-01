import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface InStockShowcaseProps {
  dict: Dictionary["inStock"];
  locale: Locale;
}

export function InStockShowcase({ dict, locale }: InStockShowcaseProps) {
  void dict;
  void locale;
  return null;
}
