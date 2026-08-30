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
import type { CartItem } from "@/lib/storefront/cart";

type AddCartItem = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currency: string;
  hydrated: boolean;
  addItem: (item: AddCartItem) => void;
  removeItem: (productId: string) => void;
  replaceItems: (items: CartItem[]) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "buyer-italia-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function safeQuantity(item: CartItem, quantity: number) {
  const upper =
    item.maxQuantity === null ? 99 : Math.max(1, item.maxQuantity);
  return Math.max(1, Math.min(quantity, upper));
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === "string" &&
    item.productId.length > 0 &&
    typeof item.name === "string" &&
    (typeof item.sku === "string" || item.sku === null) &&
    typeof item.price === "number" &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    typeof item.currency === "string" &&
    (typeof item.image === "string" || item.image === null) &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1 &&
    (item.maxQuantity === null ||
      (typeof item.maxQuantity === "number" &&
        Number.isInteger(item.maxQuantity) &&
        item.maxQuantity >= 0))
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed)) throw new Error("Invalid cart");
        const normalizedItems = parsed.filter(isCartItem).map((item) => ({
          ...item,
          quantity: safeQuantity(item, item.quantity),
        }));
        setItems([
          ...new Map(
            normalizedItems.map((item) => [item.productId, item]),
          ).values(),
        ]);
      }
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
        const item = {
          ...incoming,
          quantity: incoming.quantity ?? 1,
        };
        return [
          ...current,
          {
            ...item,
            quantity: safeQuantity(item, item.quantity),
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

  const replaceItems = useCallback((nextItems: CartItem[]) => {
    setItems(nextItems);
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
      replaceItems,
      setQuantity,
      clearCart,
    };
  }, [addItem, clearCart, hydrated, items, removeItem, replaceItems, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
