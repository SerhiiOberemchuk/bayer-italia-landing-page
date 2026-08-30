import type { ObriymProduct } from "@/lib/obriym/types";
import { getCustomField } from "@/lib/storefront/products";

export type SchemaItemCondition =
  | "https://schema.org/NewCondition"
  | "https://schema.org/UsedCondition"
  | "https://schema.org/RefurbishedCondition";

const ATTRIBUTE_NAMES = {
  condition: ["condition", "стан", "condizione"],
  size: ["size", "розмір", "taglia"],
  color: ["color", "колір", "colore"],
  material: ["material", "матеріал", "materiale"],
  gtin: ["gtin", "ean", "ean13", "upc", "barcode", "штрихкод", "штрих-код"],
  mpn: ["mpn", "manufacturer part number", "артикул виробника"],
  productGroupId: [
    "product group id",
    "productGroupId",
    "variant group id",
    "variantGroupId",
    "група варіантів",
  ],
  gender: ["gender", "стать", "genere"],
  ageGroup: ["age group", "ageGroup", "вікова група", "fascia di età"],
  sizeSystem: ["size system", "sizeSystem", "система розмірів"],
  sizeType: ["size type", "sizeType", "тип розміру"],
  pattern: ["pattern", "візерунок", "принт", "motivo"],
  googleProductCategory: [
    "google product category",
    "googleProductCategory",
    "категорія google",
  ],
} as const;

export function getProductSeoAttributes(product: ObriymProduct) {
  const rawCondition = getCustomField(product, [...ATTRIBUTE_NAMES.condition]);

  return {
    condition: mapItemCondition(rawCondition),
    rawCondition,
    size: getCustomField(product, [...ATTRIBUTE_NAMES.size]),
    color: getCustomField(product, [...ATTRIBUTE_NAMES.color]),
    material: getCustomField(product, [...ATTRIBUTE_NAMES.material]),
    gtin: getCustomField(product, [...ATTRIBUTE_NAMES.gtin]),
    mpn: getCustomField(product, [...ATTRIBUTE_NAMES.mpn]),
    productGroupId: getCustomField(product, [...ATTRIBUTE_NAMES.productGroupId]),
    gender: getCustomField(product, [...ATTRIBUTE_NAMES.gender]),
    ageGroup: getCustomField(product, [...ATTRIBUTE_NAMES.ageGroup]),
    sizeSystem: getCustomField(product, [...ATTRIBUTE_NAMES.sizeSystem]),
    sizeType: getCustomField(product, [...ATTRIBUTE_NAMES.sizeType]),
    pattern: getCustomField(product, [...ATTRIBUTE_NAMES.pattern]),
    googleProductCategory: getCustomField(product, [
      ...ATTRIBUTE_NAMES.googleProductCategory,
    ]),
  };
}

function mapItemCondition(value: string | null): SchemaItemCondition | undefined {
  if (!value) return undefined;

  const normalized = value.trim().toLocaleLowerCase();

  if (["new", "новий", "нова", "нове", "nuovo", "nuova"].includes(normalized)) {
    return "https://schema.org/NewCondition";
  }

  if (["used", "вживаний", "вживана", "вживане", "usato", "usata"].includes(normalized)) {
    return "https://schema.org/UsedCondition";
  }

  if (
    [
      "refurbished",
      "відновлений",
      "відновлена",
      "відновлене",
      "ricondizionato",
      "ricondizionata",
    ].includes(normalized)
  ) {
    return "https://schema.org/RefurbishedCondition";
  }

  return undefined;
}
