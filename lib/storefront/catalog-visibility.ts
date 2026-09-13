// The product catalog is switched off for now, but nothing behind it was
// removed. While this is `false` the shop listing, product pages, bag and
// checkout return 404, every "Shop" link and the home showcase disappear, and
// the sitemap and Google Merchant feed stop advertising products. Flip it to
// `true` to bring the whole catalog back.
// Annotated as `boolean` rather than inferred: a literal `false` type would make
// TypeScript treat every branch behind the flag as dead code and reject the
// comparisons inside it, and that code has to keep compiling so it can come back.
export const isCatalogEnabled: boolean = false;
