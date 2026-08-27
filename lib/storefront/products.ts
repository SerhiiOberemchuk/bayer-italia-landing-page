import type { Locale } from "@/lib/i18n/config";
import type { ObriymProduct } from "@/lib/obriym/types";

export function getProductTranslation(product: ObriymProduct, locale: Locale) {
  return product.translations?.find((translation) => translation.locale === locale);
}

export function getProductName(product: ObriymProduct, locale: Locale) {
  return getProductTranslation(product, locale)?.name || product.name;
}

export function getProductDescription(product: ObriymProduct, locale: Locale) {
  return (
    getProductTranslation(product, locale)?.description ||
    product.description ||
    ""
  );
}

export function getProductPrice(product: ObriymProduct, currency = "EUR") {
  const localized = product.prices.find((price) => price.currency === currency);
  return localized
    ? {
        amount: localized.price,
        compareAtAmount: localized.compareAtPrice,
        currency: localized.currency,
      }
    : {
        amount: product.price ?? 0,
        compareAtAmount: product.compareAtPrice,
        currency: product.currency || currency,
      };
}

export function getCustomField(product: ObriymProduct, names: string[]) {
  const wanted = names.map((name) => name.toLocaleLowerCase());
  return (
    product.customFields.find((field) =>
      wanted.includes(field.name.toLocaleLowerCase()),
    )?.value || null
  );
}

export function formatMoney(amount: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
