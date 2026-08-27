import "server-only";

const BUYER_ITALIA_WAREHOUSE_ID = "d686ceaa-4751-4d74-b832-00b1c6031c36";

export const storefrontWarehouseId =
  process.env.OBRIYM_STOREFRONT_WAREHOUSE_ID || BUYER_ITALIA_WAREHOUSE_ID;
