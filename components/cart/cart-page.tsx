"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { formatMoney } from "@/lib/storefront/products";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

export function CartPage({ locale }: { locale: Locale }) {
  const { items, hydrated, subtotal, currency, removeItem, setQuantity } = useCart();
  const isUk = locale === "uk";

  if (!hydrated) return <div className="min-h-[40vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <p className="premium-eyebrow text-muted-foreground">{isUk ? "Ваш кошик" : "Your bag"}</p>
        <h1 className="mt-5 font-serif text-5xl font-normal">{isUk ? "Поки що порожньо" : "Your bag is empty"}</h1>
        <Link
          href={withLocalePath(locale, "/catalog")}
          className="mt-9 inline-flex h-12 items-center bg-foreground px-7 text-xs font-medium uppercase tracking-[0.16em] text-background"
        >
          {isUk ? "Перейти до колекції" : "Explore the collection"}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8 md:py-20">
      <p className="premium-eyebrow text-muted-foreground">Buyer Italia</p>
      <h1 className="mt-4 font-serif text-5xl font-normal tracking-[-0.04em] md:text-7xl">
        {isUk ? "Ваш кошик" : "Your bag"}
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="border-t border-border">
          {items.map((item) => (
            <li key={item.productId} className="grid grid-cols-[104px_1fr] gap-5 border-b border-border py-5 sm:grid-cols-[136px_1fr_auto]">
              <div className="relative aspect-[3/4] bg-secondary">
                {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="136px" /> : null}
              </div>
              <div className="flex min-w-0 flex-col py-1">
                <Link href={withLocalePath(locale, `/catalog/${item.productId}`)} className="text-sm font-medium uppercase tracking-[0.05em]">
                  {item.name}
                </Link>
                {item.sku ? <p className="mt-2 text-xs text-muted-foreground">SKU {item.sku}</p> : null}
                <p className="mt-2 text-sm sm:hidden">{formatMoney(item.price * item.quantity, item.currency, locale)}</p>
                <div className="mt-auto flex items-center gap-3 pt-5">
                  <button type="button" onClick={() => setQuantity(item.productId, item.quantity - 1)} className="flex size-8 items-center justify-center border border-border" aria-label={isUk ? "Зменшити кількість" : "Decrease quantity"}>
                    <Minus className="size-3" aria-hidden="true" />
                  </button>
                  <span className="w-5 text-center text-sm tabular-nums">{item.quantity}</span>
                  <button type="button" onClick={() => setQuantity(item.productId, item.quantity + 1)} className="flex size-8 items-center justify-center border border-border" aria-label={isUk ? "Збільшити кількість" : "Increase quantity"}>
                    <Plus className="size-3" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => removeItem(item.productId)} className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-4">
                    <Trash2 className="size-3.5" aria-hidden="true" />
                    {isUk ? "Видалити" : "Remove"}
                  </button>
                </div>
              </div>
              <p className="hidden py-1 text-sm sm:block">{formatMoney(item.price * item.quantity, item.currency, locale)}</p>
            </li>
          ))}
        </ul>

        <aside className="h-fit bg-[#eeeae3] p-7 md:p-9">
          <h2 className="font-serif text-3xl font-normal">{isUk ? "Підсумок" : "Summary"}</h2>
          <div className="mt-8 flex items-center justify-between border-b border-foreground/20 pb-5 text-sm">
            <span>{isUk ? "Товари" : "Items"}</span>
            <span>{formatMoney(subtotal, currency, locale)}</span>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            {isUk
              ? "Доставку менеджер розрахує та підтвердить після отримання замовлення. Оплата на сайті поки не проводиться."
              : "Delivery will be calculated and confirmed by your manager. Online payment is not collected yet."}
          </p>
          <Link
            href={withLocalePath(locale, "/checkout")}
            className="mt-7 flex h-13 items-center justify-center bg-foreground px-5 text-xs font-medium uppercase tracking-[0.16em] text-background"
          >
            {isUk ? "Оформити замовлення" : "Continue to checkout"}
          </Link>
        </aside>
      </div>
    </div>
  );
}
