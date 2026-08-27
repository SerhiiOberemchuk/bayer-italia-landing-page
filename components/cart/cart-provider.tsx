"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

type AddCartItem = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currency: string;
  hydrated: boolean;
  addItem: (item: AddCartItem) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "buyer-italia-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function safeQuantity(item: CartItem, quantity: number) {
  const upper = item.maxQuantity && item.maxQuantity > 0 ? item.maxQuantity : 99;
  return Math.max(1, Math.min(quantity, upper));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((incoming: AddCartItem) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === incoming.productId);
      if (!existing) {
        return [
          ...current,
          {
            ...incoming,
            quantity: Math.max(1, incoming.quantity ?? 1),
          },
        ];
      }

      return current.map((item) =>
        item.productId === incoming.productId
          ? {
              ...item,
              quantity: safeQuantity(item, item.quantity + (incoming.quantity ?? 1)),
            }
          : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: safeQuantity(item, quantity) }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const currency = items[0]?.currency || "EUR";
    return {
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      currency,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    };
  }, [addItem, clearCart, hydrated, items, removeItem, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
