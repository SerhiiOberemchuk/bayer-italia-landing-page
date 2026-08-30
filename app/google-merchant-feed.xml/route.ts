import { getAllProducts } from "@/actions/catalog/get-all-products";
import { isValidLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { getProductSeoAttributes } from "@/lib/storefront/product-seo";
import {
  getProductDescription,
  getProductName,
  getProductPrice,
} from "@/lib/storefront/products";

export async function GET(request: Request) {
  const requestedLocale = new URL(request.url).searchParams.get("locale") || "uk";
  const locale: Locale = isValidLocale(requestedLocale) ? requestedLocale : "uk";
  const products = (await getAllProducts()).filter((product) => {
    const price = getProductPrice(product, "EUR");
    return (
      product.status === "active" &&
      price.amount > 0 &&
      Boolean(product.images[0]?.url)
    );
  });
  const items = products.map((product) => {
    const name = getProductName(product, locale).trim().slice(0, 150);
    const description = (getProductDescription(product, locale) || name)
      .trim()
      .slice(0, 5000);
    const price = getProductPrice(product, "EUR");
    const attributes = getProductSeoAttributes(product);
    const productUrl = `${siteUrl}${withLocalePath(locale, `/catalog/${product.id}`)}`;
    const regularPrice =
      price.compareAtAmount && price.compareAtAmount > price.amount
        ? price.compareAtAmount
        : price.amount;
    const salePrice = regularPrice > price.amount ? price.amount : null;
    const condition = schemaConditionToMerchantValue(attributes.condition);
    const gender = normalizeGender(attributes.gender);
    const ageGroup = normalizeAgeGroup(attributes.ageGroup);
    const extraImages = product.images.slice(1, 11);

    return [
      "<item>",
      xmlElement("g:id", product.id),
      xmlElement("g:title", name),
      xmlElement("g:description", description),
      xmlElement("g:link", productUrl),
      xmlElement("g:image_link", product.images[0].url),
      ...extraImages.map((image) => xmlElement("g:additional_image_link", image.url)),
      xmlElement(
        "g:availability",
        product.stock === null || product.stock > 0 ? "in_stock" : "out_of_stock",
      ),
      xmlElement("g:price", `${regularPrice.toFixed(2)} ${price.currency}`),
      salePrice ? xmlElement("g:sale_price", `${salePrice.toFixed(2)} ${price.currency}`) : "",
      condition ? xmlElement("g:condition", condition) : "",
      product.brand?.name ? xmlElement("g:brand", product.brand.name) : "",
      attributes.mpn ? xmlElement("g:mpn", attributes.mpn) : "",
      attributes.gtin ? xmlElement("g:gtin", attributes.gtin) : "",
      product.category?.name ? xmlElement("g:product_type", product.category.name) : "",
      attributes.size ? xmlElement("g:size", attributes.size) : "",
      attributes.color ? xmlElement("g:color", attributes.color) : "",
      attributes.material ? xmlElement("g:material", attributes.material) : "",
      attributes.pattern ? xmlElement("g:pattern", attributes.pattern) : "",
      gender ? xmlElement("g:gender", gender) : "",
      ageGroup ? xmlElement("g:age_group", ageGroup) : "",
      attributes.sizeSystem
        ? xmlElement("g:size_system", attributes.sizeSystem.toUpperCase())
        : "",
      attributes.sizeType ? xmlElement("g:size_type", attributes.sizeType) : "",
      attributes.googleProductCategory
        ? xmlElement("g:google_product_category", attributes.googleProductCategory)
        : "",
      attributes.productGroupId
        ? xmlElement("g:item_group_id", attributes.productGroupId)
        : "",
      product.weight?.value && product.weight.unit
        ? xmlElement("g:shipping_weight", `${product.weight.value} ${product.weight.unit}`)
        : "",
      "</item>",
    ]
      .filter(Boolean)
      .join("\n");
  });
  const title = locale === "uk" ? "Buyer Italia — товари" : "Buyer Italia — products";
  const description =
    locale === "uk"
      ? "Актуальні товари Buyer Italia"
      : "Current products from Buyer Italia";
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    "<channel>",
    xmlElement("title", title),
    xmlElement("link", `${siteUrl}${withLocalePath(locale, "/catalog")}`),
    xmlElement("description", description),
    ...items,
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}

function xmlElement(name: string, value: string | number) {
  return `<${name}>${escapeXml(String(value))}</${name}>`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function schemaConditionToMerchantValue(condition?: string) {
  if (condition === "https://schema.org/NewCondition") return "new";
  if (condition === "https://schema.org/UsedCondition") return "used";
  if (condition === "https://schema.org/RefurbishedCondition") return "refurbished";
  return undefined;
}

function normalizeGender(value: string | null) {
  if (!value) return undefined;
  const normalized = value.trim().toLocaleLowerCase();
  if (["male", "чоловіча", "чоловічий", "uomo"].includes(normalized)) return "male";
  if (["female", "жіноча", "жіночий", "donna"].includes(normalized)) return "female";
  if (["unisex", "унісекс"].includes(normalized)) return "unisex";
  return undefined;
}

function normalizeAgeGroup(value: string | null) {
  if (!value) return undefined;
  const normalized = value.trim().toLocaleLowerCase();
  const allowed = ["newborn", "infant", "toddler", "kids", "adult"];
  return allowed.includes(normalized) ? normalized : undefined;
}
