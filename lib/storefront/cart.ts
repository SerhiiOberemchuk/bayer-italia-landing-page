export type CartItem = {
  productId: string;
  name: string;
  sku: string | null;
  price: number;
  currency: string;
  image: string | null;
  quantity: number;
  maxQuantity: number | null;
};

