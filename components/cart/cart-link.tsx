"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

export function CartLink({ locale }: { locale: Locale }) {
  const { itemCount, hydrated } = useCart();
  const label = locale === "uk" ? "Кошик" : "Bag";

  return (
    <Link
      href={withLocalePath(locale, "/cart")}
      className="relative inline-flex h-10 items-center gap-2 px-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground"
      aria-label={`${label}: ${hydrated ? itemCount : 0}`}
    >
      <ShoppingBag className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
      <span className="hidden lg:inline">{label}</span>
      <span className="tabular-nums">({hydrated ? itemCount : 0})</span>
    </Link>
  );
}
