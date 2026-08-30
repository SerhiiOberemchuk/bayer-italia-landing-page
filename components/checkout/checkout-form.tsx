"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { ArrowLeft, Check } from "lucide-react";
import {
  getNovaPoshtaWarehouses,
  type NovaPoshtaWarehouseOption,
} from "@/actions/checkout/get-nova-poshta-warehouses";
import {
  searchNovaPoshtaCities,
  type NovaPoshtaCityOption,
} from "@/actions/checkout/search-nova-poshta-cities";
import { submitOrder } from "@/actions/checkout/submit-order";
import { useCart } from "@/components/cart/cart-provider";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";
import { formatMoney } from "@/lib/storefront/products";

type FormState = "idle" | "success" | "error" | "cart-changed";
type NovaPoshtaStatus =
  | "idle"
  | "searching-cities"
  | "cities-ready"
  | "loading-warehouses"
  | "warehouses-ready"
  | "manual";

export function CheckoutForm({ locale }: { locale: Locale }) {
  const { items, subtotal, currency, hydrated, clearCart } = useCart();
  const [state, setState] = useState<FormState>("idle");
  const [isPending, startTransition] = useTransition();
  const [orderId, setOrderId] = useState("");
  const [country, setCountry] = useState("UA");
  const [deliveryMethod, setDeliveryMethod] = useState<"branch" | "courier">("branch");
  const [hasDifferentRecipient, setHasDifferentRecipient] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [cityOptions, setCityOptions] = useState<NovaPoshtaCityOption[]>([]);
  const [warehouseOptions, setWarehouseOptions] = useState<NovaPoshtaWarehouseOption[]>([]);
  const [selectedCityRef, setSelectedCityRef] = useState("");
  const [novaPoshtaStatus, setNovaPoshtaStatus] = useState<NovaPoshtaStatus>("idle");
  const [useManualBranch, setUseManualBranch] = useState(false);
  const [, startLookupTransition] = useTransition();
  const requestIdRef = useRef<string | null>(null);
  const citySearchIdRef = useRef(0);
  const warehouseSearchIdRef = useRef(0);
  const isUk = locale === "uk";

  useEffect(() => {
    const query = cityQuery.trim();
    if (
      country !== "UA" ||
      deliveryMethod !== "branch" ||
      selectedCityRef ||
      query.length < 2
    ) {
      return;
    }

    const searchId = ++citySearchIdRef.current;
    setNovaPoshtaStatus("searching-cities");

    const timeoutId = window.setTimeout(() => {
      startLookupTransition(async () => {
        try {
          const result = await searchNovaPoshtaCities(query);
          if (searchId !== citySearchIdRef.current) return;

          if (!result.ok || result.options.length === 0) {
            setCityOptions([]);
            setNovaPoshtaStatus("manual");
            return;
          }

          setCityOptions(result.options);
          setNovaPoshtaStatus("cities-ready");
        } catch {
          if (searchId !== citySearchIdRef.current) return;
          setCityOptions([]);
          setNovaPoshtaStatus("manual");
        }
      });
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [cityQuery, country, deliveryMethod, selectedCityRef]);

  function resetNovaPoshtaLookup() {
    citySearchIdRef.current += 1;
    warehouseSearchIdRef.current += 1;
    setCityOptions([]);
    setWarehouseOptions([]);
    setSelectedCityRef("");
    setNovaPoshtaStatus("idle");
    setUseManualBranch(false);
  }

  function selectNovaPoshtaCity(cityRef: string) {
    const city = cityOptions.find((option) => option.ref === cityRef);
    if (!city) return;

    const searchId = ++warehouseSearchIdRef.current;
    setSelectedCityRef(city.ref);
    setCityQuery(city.label);
    setWarehouseOptions([]);
    setNovaPoshtaStatus("loading-warehouses");
    setUseManualBranch(false);

    startLookupTransition(async () => {
      try {
        const result = await getNovaPoshtaWarehouses(city.ref);
        if (searchId !== warehouseSearchIdRef.current) return;

        if (!result.ok || result.options.length === 0) {
          setNovaPoshtaStatus("manual");
          return;
        }

        setWarehouseOptions(result.options);
        setNovaPoshtaStatus("warehouses-ready");
      } catch {
        if (searchId !== warehouseSearchIdRef.current) return;
        setNovaPoshtaStatus("manual");
      }
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0 || isPending) return;
    requestIdRef.current ||= crypto.randomUUID();

    const data = new FormData(event.currentTarget);
    const recipient = hasDifferentRecipient
      ? {
          isCustomer: false as const,
          name: String(data.get("recipientName") || ""),
          phone: String(data.get("recipientPhone") || ""),
        }
      : { isCustomer: true as const };
    const delivery =
      deliveryMethod === "branch"
        ? {
            method: "branch" as const,
            branch: String(data.get("branch") || ""),
            comment: String(data.get("deliveryComment") || ""),
            recipient,
          }
        : {
            method: "courier" as const,
            address: String(data.get("address") || ""),
            comment: String(data.get("deliveryComment") || ""),
            recipient,
          };
    const payload = {
      requestId: requestIdRef.current,
      locale,
      customer: {
        firstName: String(data.get("firstName") || ""),
        lastName: String(data.get("lastName") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        country,
        city: String(data.get("city") || ""),
        line2: String(data.get("line2") || ""),
        postalCode: String(data.get("postalCode") || ""),
      },
      delivery,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        expectedUnitPrice: item.price,
        expectedCurrency: item.currency,
      })),
    };

    startTransition(async () => {
      try {
        const result = await submitOrder(payload);
        if (!result.ok) {
          setState(result.code === "CART_CHANGED" ? "cart-changed" : "error");
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
              {isUk ? "Прізвище" : "Last name"} *
              <input name="lastName" required maxLength={120} className="premium-field mt-2" autoComplete="family-name" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Телефон" : "Phone"} *
              <input name="phone" required minLength={6} maxLength={50} className="premium-field mt-2" autoComplete="tel" inputMode="tel" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              Email *
              <input name="email" type="email" required maxLength={255} className="premium-field mt-2" autoComplete="email" />
            </label>
            <label className="text-xs uppercase tracking-[0.12em]">
              {isUk ? "Країна" : "Country"} *
              <select
                name="country"
                value={country}
                className="premium-field mt-2"
                autoComplete="country"
                onChange={(event) => {
                  const nextCountry = event.target.value;
                  setCountry(nextCountry);
                  setCityQuery("");
                  resetNovaPoshtaLookup();
                  if (nextCountry !== "UA") {
                    setDeliveryMethod("courier");
                  }
                }}
              >
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
              <input
                name="city"
                required
                maxLength={120}
                value={cityQuery}
                className="premium-field mt-2"
                autoComplete="address-level2"
                onChange={(event) => {
                  setCityQuery(event.target.value);
                  resetNovaPoshtaLookup();
                }}
              />
            </label>

            <label className="text-xs uppercase tracking-[0.12em] sm:col-span-2">
              {isUk ? "Спосіб доставки" : "Delivery method"} *
              <select
                name="deliveryMethod"
                value={deliveryMethod}
                className="premium-field mt-2"
                onChange={(event) => {
                  setDeliveryMethod(event.target.value as "branch" | "courier");
                  resetNovaPoshtaLookup();
                }}
              >
                {country === "UA" ? (
                  <option value="branch">
                    {isUk ? "Нова пошта — відділення або поштомат" : "Nova Poshta — branch or parcel locker"}
                  </option>
                ) : null}
                <option value="courier">
                  {country === "UA"
                    ? isUk
                      ? "Нова пошта — кур’єр"
                      : "Nova Poshta — courier"
                    : isUk
                      ? "Кур’єрська доставка"
                      : "Courier delivery"}
                </option>
              </select>
            </label>

            {deliveryMethod === "branch" ? (
              <div className="grid gap-4 sm:col-span-2">
                <div className="text-sm text-muted-foreground" aria-live="polite">
                  {novaPoshtaStatus === "searching-cities"
                    ? isUk
                      ? "Шукаємо місто в довіднику Нової пошти…"
                      : "Searching the Nova Poshta city directory…"
                    : null}
                  {novaPoshtaStatus === "loading-warehouses"
                    ? isUk
                      ? "Завантажуємо доступні відділення…"
                      : "Loading available branches…"
                    : null}
                  {novaPoshtaStatus === "cities-ready"
                    ? isUk
                      ? "Оберіть місто з довідника, щоб завантажити відділення, або введіть відділення вручну."
                      : "Choose a city from the directory to load branches, or enter the branch manually."
                    : null}
                  {novaPoshtaStatus === "manual"
                    ? isUk
                      ? "Довідник Нової пошти зараз недоступний. Введіть відділення або поштомат вручну — це не завадить оформленню."
                      : "The Nova Poshta directory is unavailable. Enter the branch or parcel locker manually — checkout remains available."
                    : null}
                </div>

                {novaPoshtaStatus === "cities-ready" ? (
                  <label className="text-xs uppercase tracking-[0.12em]">
                    {isUk ? "Оберіть місто з довідника" : "Choose a city from the directory"}
                    <select
                      className="premium-field mt-2"
                      defaultValue=""
                      onChange={(event) => selectNovaPoshtaCity(event.target.value)}
                    >
                      <option value="" disabled>
                        {isUk ? "Оберіть місто" : "Choose a city"}
                      </option>
                      {cityOptions.map((city) => (
                        <option key={city.ref} value={city.ref}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                {novaPoshtaStatus === "warehouses-ready" && !useManualBranch ? (
                  <div>
                    <label className="text-xs uppercase tracking-[0.12em]">
                      {isUk ? "Відділення або поштомат Нової пошти" : "Nova Poshta branch or parcel locker"} *
                      <select name="branch" required defaultValue="" className="premium-field mt-2">
                        <option value="" disabled>
                          {isUk ? "Оберіть відділення або поштомат" : "Choose a branch or parcel locker"}
                        </option>
                        {warehouseOptions.map((warehouse) => (
                          <option key={warehouse.ref} value={warehouse.label}>
                            {warehouse.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      className="mt-3 border-b border-foreground pb-1 text-[11px] font-medium uppercase tracking-[0.12em]"
                      onClick={() => setUseManualBranch(true)}
                    >
                      {isUk ? "Ввести відділення вручну" : "Enter a branch manually"}
                    </button>
                  </div>
                ) : (
                  <label className="text-xs uppercase tracking-[0.12em]">
                    {isUk ? "Відділення або поштомат Нової пошти" : "Nova Poshta branch or parcel locker"} *
                    <input
                      name="branch"
                      required
                      maxLength={200}
                      className="premium-field mt-2"
                      placeholder={isUk ? "Наприклад, відділення №5 або поштомат №12345" : "For example, branch No. 5 or parcel locker No. 12345"}
                      onChange={() => setUseManualBranch(true)}
                    />
                  </label>
                )}
              </div>
            ) : (
              <label className="text-xs uppercase tracking-[0.12em] sm:col-span-2">
                {isUk ? "Адреса доставки" : "Delivery address"} *
                <input name="address" required maxLength={255} className="premium-field mt-2" autoComplete="address-line1" />
              </label>
            )}

            {deliveryMethod === "courier" ? (
              <>
                <label className="text-xs uppercase tracking-[0.12em]">
                  {isUk ? "Квартира, під’їзд, поверх" : "Apartment, entrance, floor"}
                  <input name="line2" maxLength={255} className="premium-field mt-2" autoComplete="address-line2" />
                </label>
                <label className="text-xs uppercase tracking-[0.12em]">
                  {isUk ? "Поштовий індекс" : "Postal code"}{country !== "UA" ? " *" : ""}
                  <input name="postalCode" required={country !== "UA"} maxLength={32} className="premium-field mt-2" autoComplete="postal-code" />
                </label>
              </>
            ) : null}

            <label className="flex items-start gap-3 border-y border-border py-4 text-sm normal-case tracking-normal sm:col-span-2">
              <input
                type="checkbox"
                name="differentRecipient"
                checked={hasDifferentRecipient}
                className="mt-0.5 size-4 accent-foreground"
                onChange={(event) => setHasDifferentRecipient(event.target.checked)}
              />
              <span>
                {isUk
                  ? "Отримувач відрізняється від покупця"
                  : "The recipient is different from the buyer"}
              </span>
            </label>

            {hasDifferentRecipient ? (
              <>
                <label className="text-xs uppercase tracking-[0.12em]">
                  {isUk ? "Ім’я та прізвище отримувача" : "Recipient full name"} *
                  <input name="recipientName" required maxLength={200} className="premium-field mt-2" autoComplete="name" />
                </label>
                <label className="text-xs uppercase tracking-[0.12em]">
                  {isUk ? "Телефон отримувача" : "Recipient phone"} *
                  <input name="recipientPhone" required minLength={6} maxLength={50} className="premium-field mt-2" autoComplete="tel" inputMode="tel" />
                </label>
              </>
            ) : null}

            <label className="text-xs uppercase tracking-[0.12em] sm:col-span-2">
              {isUk ? "Коментар до доставки" : "Delivery note"}
              <textarea
                name="deliveryComment"
                maxLength={1000}
                rows={3}
                className="premium-field mt-2 min-h-24 resize-y"
                placeholder={isUk ? "Наприклад, зателефонувати перед відправленням" : "For example, call before dispatch"}
              />
            </label>

            {state === "error" ? (
              <p className="sm:col-span-2 text-sm text-destructive">
                {isUk
                  ? "Не вдалося передати замовлення. Перевірте дані або спробуйте ще раз."
                  : "We could not submit the order. Check your details and try again."}
              </p>
            ) : null}

            {state === "cart-changed" ? (
              <div className="sm:col-span-2 border border-amber-800/35 bg-amber-50 p-4 text-sm leading-6">
                <p>
                  {isUk
                    ? "Ціна або доступна кількість одного з товарів змінилася в CRM. Замовлення не створено — оновіть кошик і перевірте дані."
                    : "A product price or available quantity changed in the CRM. The order was not created—refresh your bag and review the details."}
                </p>
                <Link
                  href={withLocalePath(locale, "/cart")}
                  className="mt-3 inline-block border-b border-foreground pb-1 text-xs font-medium uppercase tracking-[0.12em]"
                >
                  {isUk ? "Оновити кошик" : "Refresh bag"}
                </Link>
              </div>
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
