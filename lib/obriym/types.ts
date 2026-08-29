export type ObriymImage = {
  url: string;
};

export type ObriymPrice = {
  currency: string;
  price: number;
  compareAtPrice: number | null;
};

export type ObriymTranslation = {
  locale: string;
  name: string | null;
  description: string | null;
};

export type ObriymCustomField = {
  name: string;
  value: string | null;
};

export type ObriymProduct = {
  id: string;
  name: string;
  sku: string | null;
  type: "simple" | "bundle";
  price: number | null;
  compareAtPrice: number | null;
  currency: string;
  prices: ObriymPrice[];
  warehouseId: string | null;
  images: ObriymImage[];
  stock: number | null;
  category: {
    id: string;
    name: string;
    parentId: string | null;
  } | null;
  tags: string[];
  customFields: ObriymCustomField[];
  status: "draft" | "active" | "archived";
  description?: string | null;
  translations?: ObriymTranslation[];
  brand?: {
    id: string;
    name: string | null;
  } | null;
  availability?: string;
  weight?: {
    value?: number | null;
    unit?: string | null;
  } | null;
};

export type ObriymListResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
};

export type ObriymReference = {
  id: string;
  name: string;
};

export type CatalogFilters = {
  q?: string;
  categoryId?: string;
  brandId?: string;
  limit?: number;
};

export type CatalogFilterOptions = {
  categories: ObriymReference[];
  brands: ObriymReference[];
};

export type OrderInput = {
  externalId: string;
  currency: string;
  customer: {
    firstName: string;
    lastName?: string;
    email?: string;
    phone: string;
    shippingAddress: {
      city: string;
      country: string;
      line1: string;
      line2?: string;
      postalCode?: string;
      region?: string;
    };
  };
  delivery: {
    carrier?: string;
    method: "branch" | "courier" | "pickup";
    branch?: string;
    recipientName?: string;
    phone?: string;
    comment?: string;
    cod?: boolean;
  };
  items: Array<{
    productName: string;
    quantity: number;
    sku?: string;
    unitPrice: number;
  }>;
};

export type OrderResult = {
  data: {
    deduplicated: boolean;
    externalId: string;
    id: string;
    importStatus: "created" | "existing";
    status:
      | "pending"
      | "confirmed"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled"
      | "refunded";
  };
};
