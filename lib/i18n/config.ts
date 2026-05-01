export const locales = ["uk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";
export const siteUrl = "https://buyer-italia.shop";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
