"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart, type CartItem } from "./cart-provider";
import type { Locale } from "@/lib/i18n/config";

export function AddToCartButton({
  item,
  locale,
  compact = false,
}: {
  item: Omit<CartItem, "quantity">;
  locale: Locale;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={item.maxQuantity === 0}
      className={
        compact
          ? "inline-flex size-10 items-center justify-center border border-foreground bg-foreground text-background transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          : "inline-flex h-13 w-full items-center justify-center gap-2 bg-foreground px-6 text-sm font-medium uppercase tracking-[0.15em] text-background transition-colors hover:bg-[#34322f] disabled:cursor-not-allowed disabled:opacity-40"
      }
      aria-label={locale === "uk" ? `Додати ${item.name} у кошик` : `Add ${item.name} to bag`}
    >
      {added ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <ShoppingBag className="size-4" strokeWidth={1.5} aria-hidden="true" />
      )}
      {!compact &&
        (added
          ? locale === "uk"
            ? "Додано"
            : "Added"
          : locale === "uk"
            ? "Додати у кошик"
            : "Add to bag")}
    </button>
  );
}
