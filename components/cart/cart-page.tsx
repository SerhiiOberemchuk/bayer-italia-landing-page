"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useRef, useState } from "react";
import { AlertTriangle, Minus, Plus, RefreshCw, Trash2 } from "lucide-react";
import { reconcileCart } from "@/actions/cart/reconcile-cart";
import { useCart } from "./cart-provider";
import { formatMoney } from "@/lib/storefront/products";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

export function CartPage({ locale }: { locale: Locale }) {
  const {
    items,
    hydrated,
    subtotal,
    currency,
    removeItem,
    replaceItems,
    setQuantity,
  } = useCart();
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "syncing" | "synced" | "error"
  >("idle");
  const [syncMessages, setSyncMessages] = useState<string[]>([]);
  const [syncAttempt, setSyncAttempt] = useState(0);
  const requestIdRef = useRef(0);
  const isUk = locale === "uk";

  useEffect(() => {
    if (!hydrated) return;

    const storedItems = items;
    if (storedItems.length === 0) {
      setSyncStatus("synced");
      return;
    }

    const requestId = ++requestIdRef.current;
    setSyncStatus("syncing");

    startTransition(async () => {
      try {
        const result = await reconcileCart({
          locale,
          items: storedItems.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        });

        if (requestId !== requestIdRef.current) return;

        if (!result.ok) {
          setSyncStatus("error");
          return;
        }

        const previousItems = new Map(
          storedItems.map((item) => [item.productId, item]),
        );
        const messages: string[] = [];

        result.items.forEach((item) => {
          const previous = previousItems.get(item.productId);
          if (!previous) return;

          if (
            previous.price !== item.price ||
            previous.currency !== item.currency
          ) {
            messages.push(
              isUk
                ? `Ціну «${item.name}» оновлено: ${formatMoney(previous.price, previous.currency, locale)} → ${formatMoney(item.price, item.currency, locale)}.`
                : `The price of “${item.name}” was updated: ${formatMoney(previous.price, previous.currency, locale)} → ${formatMoney(item.price, item.currency, locale)}.`,
            );
          }

          if (previous.quantity !== item.quantity) {
            messages.push(
              isUk
                ? `Кількість «${item.name}» змінено на ${item.quantity} відповідно до доступного залишку.`
                : `The quantity of “${item.name}” was changed to ${item.quantity} to match current stock.`,
            );
          }
        });

        result.unavailableProductIds.forEach((productId) => {
          const previous = previousItems.get(productId);
          messages.push(
            isUk
              ? `«${previous?.name || "Товар"}» вилучено з кошика, оскільки він більше недоступний.`
              : `“${previous?.name || "Item"}” was removed because it is no longer available.`,
          );
        });

        replaceItems(result.items);
        setSyncMessages(messages);
        setSyncStatus("synced");
      } catch {
        if (requestId === requestIdRef.current) setSyncStatus("error");
      }
    });
    // The cart must be reconciled once after hydration and once per explicit retry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, locale, syncAttempt]);

  if (!hydrated || syncStatus === "idle" || syncStatus === "syncing") {
    return (
      <div className="mx-auto min-h-[55vh] max-w-[1280px] px-4 py-14 md:px-8 md:py-20">
        <p className="premium-eyebrow text-muted-foreground">
          {isUk ? "Звіряємо ціни й наявність…" : "Checking prices and availability…"}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        {syncMessages.length > 0 ? (
          <div className="mb-8 w-full border border-foreground/25 bg-[#eeeae3] p-4 text-left text-sm leading-6" role="status">
            {syncMessages.map((message) => <p key={message}>{message}</p>)}
          </div>
        ) : null}
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

      {syncStatus === "error" ? (
        <div className="mt-8 flex flex-col gap-4 border border-amber-800/35 bg-amber-50 p-4 text-sm sm:flex-row sm:items-center sm:justify-between" role="alert">
          <p className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {isUk
              ? "Не вдалося звірити ціни й залишки з CRM. Дані кошика не оновлено, оформлення призупинено."
              : "We could not verify prices and stock with the CRM. Your bag was not updated and checkout is paused."}
          </p>
          <button
            type="button"
            onClick={() => setSyncAttempt((attempt) => attempt + 1)}
            className="inline-flex shrink-0 items-center gap-2 border-b border-foreground pb-1 text-xs font-medium uppercase tracking-[0.12em]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            {isUk ? "Спробувати ще раз" : "Try again"}
          </button>
        </div>
      ) : null}

      {syncMessages.length > 0 ? (
        <div className="mt-8 border border-foreground/20 bg-[#eeeae3] p-4 text-sm leading-6" role="status">
          {syncMessages.map((message) => <p key={message}>{message}</p>)}
        </div>
      ) : null}

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
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.maxQuantity === null
                    ? isUk
                      ? "Доступна кількість уточнюється"
                      : "Available quantity is being confirmed"
                    : isUk
                      ? `Доступно до замовлення: ${item.maxQuantity} шт.`
                      : `Available to order: ${item.maxQuantity}`}
                </p>
                <p className="mt-2 text-sm sm:hidden">{formatMoney(item.price * item.quantity, item.currency, locale)}</p>
                <div className="mt-auto flex items-center gap-3 pt-5">
                  {item.maxQuantity === 1 ? (
                    <span className="border border-border bg-secondary/50 px-3 py-2 text-xs">
                      {isUk ? "Кількість: 1" : "Quantity: 1"}
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="flex size-8 items-center justify-center border border-border transition-colors disabled:cursor-not-allowed disabled:border-border/50 disabled:bg-secondary/60 disabled:text-muted-foreground/45"
                        aria-label={isUk ? "Зменшити кількість" : "Decrease quantity"}
                      >
                        <Minus className="size-3" aria-hidden="true" />
                      </button>
                      <span className="w-5 text-center text-sm tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        disabled={item.maxQuantity !== null && item.quantity >= item.maxQuantity}
                        className="flex size-8 items-center justify-center border border-border transition-colors disabled:cursor-not-allowed disabled:border-border/50 disabled:bg-secondary/60 disabled:text-muted-foreground/45"
                        aria-label={isUk ? "Збільшити кількість" : "Increase quantity"}
                      >
                        <Plus className="size-3" aria-hidden="true" />
                      </button>
                    </>
                  )}
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
          {syncStatus === "synced" ? (
            <Link
              href={withLocalePath(locale, "/checkout")}
              className="mt-7 flex h-13 items-center justify-center bg-foreground px-5 text-xs font-medium uppercase tracking-[0.16em] text-background"
            >
              {isUk ? "Оформити замовлення" : "Continue to checkout"}
            </Link>
          ) : (
            <span className="mt-7 flex h-13 cursor-not-allowed items-center justify-center bg-foreground/35 px-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-background" aria-disabled="true">
              {isUk ? "Спершу оновіть дані" : "Refresh data first"}
            </span>
          )}
        </aside>
      </div>
    </div>
  );
}
