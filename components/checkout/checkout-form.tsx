"use client";

import Link from "next/link";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { submitOrder } from "@/actions/checkout/submit-order";
import { useCart } from "@/components/cart/cart-provider";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { formatMoney } from "@/lib/storefront/products";

type FormState = "idle" | "success" | "error";

export function CheckoutForm({ locale }: { locale: Locale }) {
  const { items, subtotal, currency, hydrated, clearCart } = useCart();
  const [state, setState] = useState<FormState>("idle");
  const [isPending, startTransition] = useTransition();
  const [orderId, setOrderId] = useState("");
  const requestIdRef = useRef<string | null>(null);
  const isUk = locale === "uk";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0 || isPending) return;
    requestIdRef.current ||= crypto.randomUUID();

    const data = new FormData(event.currentTarget);
    const payload = {
      requestId: requestIdRef.current,
      locale,
      customer: {
        firstName: String(data.get("firstName") || ""),
        lastName: String(data.get("lastName") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        country: String(data.get("country") || "UA"),
        city: String(data.get("city") || ""),
        line1: String(data.get("line1") || ""),
        line2: String(data.get("line2") || ""),
        postalCode: String(data.get("postalCode") || ""),
      },
      items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    };

    startTransition(async () => {
      try {
        const result = await submitOrder(payload);
        if (!result.ok) {
          setState("error");
          return;
        }

        setOrderId(result.orderId);
        clearCart();
        setState("success");
      } catch {
        setState("error");
      }
    });
  }

  if (!hydrated) return <div className="min-h-[55vh]" />;

  if (state === "success") {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-foreground">
          <Check className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <p className="premium-eyebrow mt-7 text-muted-foreground">{isUk ? "Замовлення отримано" : "Order received"}</p>
        <h1 className="mt-4 font-serif text-5xl font-normal tracking-tight md:text-6xl">
          {isUk ? "Дякуємо за вибір" : "Thank you for your order"}
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-6 text-muted-foreground">
          {isUk
            ? "Замовлення вже передано в Buyer Italia CRM. Менеджер зв’яжеться з вами, підтвердить наявність, доставку та спосіб оплати."
            : "Your order is now in Buyer Italia CRM. A manager will contact you to confirm availability, delivery and payment details."}
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.13em]">{orderId}</p>
        <Link href={withLocalePath(locale, "/catalog")} className="mt-9 border-b border-foreground pb-1 text-xs font-medium uppercase tracking-[0.16em]">
          {isUk ? "Продовжити покупки" : "Continue shopping"}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-5xl font-normal">{isUk ? "Кошик порожній" : "Your bag is empty"}</h1>
        <Link href={withLocalePath(locale, "/catalog")} className="mt-8 border-b border-foreground pb-1 text-xs uppercase tracking-[0.16em]">
          {isUk ? "Перейти до каталогу" : "Go to the shop"}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-12 md:px-8 md:py-20">
      <Link href={withLocalePath(locale, "/cart")} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {isUk ? "Назад до кошика" : "Back to bag"}
      </Link>

      <div className="mt-9 grid gap-14 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="premium-eyebrow text-muted-foreground">{isUk ? "Оформлення" : "Checkout"}</p>
          <h1 className="mt-4 font-serif text-5xl font-normal tracking-[-0.04em] md:text-6xl">
            {isUk ? "Контактні дані" : "Your details"}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
            {isUk
              ? "Після оформлення менеджер підтвердить наявність і фінальну вартість доставки. Оплата на цьому етапі не списується."
              : "A manager will confirm availability and final delivery cost. No payment is charged at this stage."}
          </p>

          <form onSubmit={submit} className="mt-10 grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Ім’я" : "First name"} *
              <input name="firstName" required maxLength={120} className="premium-field mt-2" autoComplete="given-name" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Прізвище" : "Last name"}
              <input name="lastName" maxLength={120} className="premium-field mt-2" autoComplete="family-name" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Телефон" : "Phone"} *
              <input name="phone" required minLength={6} maxLength={50} className="premium-field mt-2" autoComplete="tel" inputMode="tel" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              Email
              <input name="email" type="email" maxLength={255} className="premium-field mt-2" autoComplete="email" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Країна" : "Country"} *
              <select name="country" defaultValue="UA" className="premium-field mt-2" autoComplete="country">
                <option value="UA">Україна</option>
                <option value="IT">Italia</option>
                <option value="PL">Polska</option>
                <option value="DE">Deutschland</option>
                <option value="CZ">Česko</option>
                <option value="FR">France</option>
                <option value="ES">España</option>
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Місто" : "City"} *
              <input name="city" required maxLength={120} className="premium-field mt-2" autoComplete="address-level2" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em] sm:col-span-2">
              {isUk ? "Адреса або відділення доставки" : "Address or delivery branch"} *
              <input name="line1" required maxLength={255} className="premium-field mt-2" autoComplete="address-line1" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Додаткова адреса" : "Address line 2"}
              <input name="line2" maxLength={255} className="premium-field mt-2" autoComplete="address-line2" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Поштовий індекс" : "Postal code"}
              <input name="postalCode" maxLength={32} className="premium-field mt-2" autoComplete="postal-code" />
            </label>

            {state === "error" ? (
              <p className="sm:col-span-2 text-sm text-destructive">
                {isUk
                  ? "Не вдалося передати замовлення. Перевірте дані або спробуйте ще раз."
                  : "We could not submit the order. Check your details and try again."}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 h-13 bg-foreground px-7 text-xs font-medium uppercase tracking-[0.16em] text-background disabled:opacity-60 sm:col-span-2"
            >
              {isPending
                ? isUk
                  ? "Передаємо в CRM…"
                  : "Submitting…"
                : isUk
                  ? "Підтвердити замовлення"
                  : "Place order"}
            </button>
          </form>
        </div>

        <aside className="h-fit border-t border-foreground pt-6">
          <h2 className="font-serif text-3xl font-normal">{isUk ? "Ваше замовлення" : "Your order"}</h2>
          <ul className="mt-6 divide-y divide-border border-b border-border">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4 py-4 text-sm">
                <span>{item.name} <span className="text-muted-foreground">× {item.quantity}</span></span>
                <span>{formatMoney(item.price * item.quantity, item.currency, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-5 font-medium">
            <span>{isUk ? "Разом без доставки" : "Subtotal"}</span>
            <span>{formatMoney(subtotal, currency, locale)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
