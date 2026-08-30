"use client";

import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import type { CartItem } from "@/lib/storefront/cart";

export function AddToCartButton({
  item,
  locale,
  compact = false,
}: {
  item: Omit<CartItem, "quantity">;
  locale: Locale;
  compact?: boolean;
}) {
  const { addItem, hydrated, items } = useCart();
  const isInCart = items.some(({ productId }) => productId === item.productId);

  function handleAdd() {
    addItem(item);
  }

  const compactClassName =
    "inline-flex size-10 items-center justify-center border border-foreground transition-colors";
  const fullClassName =
    "inline-flex h-13 w-full items-center justify-center gap-2 px-6 text-sm font-medium uppercase tracking-[0.15em] transition-colors";

  if (!hydrated) {
    return (
      <span
        className={`${compact ? compactClassName : fullClassName} cursor-wait border-border bg-secondary/60 text-muted-foreground`}
        aria-hidden="true"
      >
        {!compact
          ? locale === "uk"
            ? "Перевіряємо кошик…"
            : "Checking bag…"
          : null}
      </span>
    );
  }

  if (isInCart) {
    const label = locale === "uk" ? "У кошику" : "In bag";

    return (
      <Link
        href={withLocalePath(locale, "/cart")}
        className={`${compact ? compactClassName : fullClassName} bg-transparent text-foreground hover:bg-foreground hover:text-background`}
        aria-label={
          locale === "uk"
            ? `${item.name} уже у кошику. Перейти до кошика`
            : `${item.name} is already in your bag. View bag`
        }
      >
        <Check className="size-4" aria-hidden="true" />
        {!compact ? label : null}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={item.maxQuantity === 0}
      className={`${compact ? compactClassName : fullClassName} bg-foreground text-background hover:bg-[#34322f] disabled:cursor-not-allowed disabled:opacity-40`}
      aria-label={locale === "uk" ? `Додати ${item.name} у кошик` : `Add ${item.name} to bag`}
    >
      <ShoppingBag className="size-4" strokeWidth={1.5} aria-hidden="true" />
      {!compact &&
        (locale === "uk" ? "Додати у кошик" : "Add to bag")}
    </button>
  );
}
