"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Menu, Send, X } from "lucide-react";

import { BuyerItaliaLogo } from "@/components/buyer-italia-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePath } from "@/lib/i18n/routing";

export function MobileMenu({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isUk = locale === "uk";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !panelRef.current) return;

    const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (!firstElement || !lastElement) return;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  const menu = isOpen
    ? createPortal(
        <div className="fixed inset-0 z-100 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]"
            onClick={closeMenu}
            aria-label={isUk ? "Закрити меню" : "Close menu"}
          />
          <div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={isUk ? "Мобільне меню" : "Mobile menu"}
            onKeyDown={trapFocus}
            className="relative flex h-full w-[min(90vw,420px)] flex-col overflow-y-auto bg-background px-5 pb-7 pt-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-5">
              <Link href={withLocalePath(locale)} onClick={() => setIsOpen(false)}>
                <BuyerItaliaLogo size="sm" />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                className="inline-flex size-10 items-center justify-center border border-border"
                aria-label={isUk ? "Закрити меню" : "Close menu"}
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav className="py-8" aria-label={isUk ? "Навігація" : "Navigation"}>
              <ul className="divide-y divide-border">
                <li>
                  <Link className="mobile-menu-link" href={withLocalePath(locale)} onClick={() => setIsOpen(false)}>
                    {isUk ? "Головна" : "Home"}
                  </Link>
                </li>
                <li>
                  <Link className="mobile-menu-link" href={withLocalePath(locale, "/catalog")} onClick={() => setIsOpen(false)}>
                    {isUk ? "Магазин" : "Shop"}
                  </Link>
                </li>
                <li>
                  <Link className="mobile-menu-link" href={withLocalePath(locale, "/delivery-from-italy")} onClick={() => setIsOpen(false)}>
                    {isUk ? "Доставка з Італії" : "Delivery from Italy"}
                  </Link>
                </li>
                <li>
                  <Link className="mobile-menu-link" href={withLocalePath(locale, "/brands-from-italy")} onClick={() => setIsOpen(false)}>
                    {isUk ? "Бренди з Італії" : "Brands from Italy"}
                  </Link>
                </li>
                <li>
                  <a className="mobile-menu-link group" href="https://t.me/raisa_orb" target="_blank" rel="noopener noreferrer">
                    {isUk ? "Під замовлення" : "Personal order"}
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>

            <div className="mt-auto border-t border-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {isUk ? "Мова" : "Language"}
                </p>
                <LanguageSwitcher locale={locale} />
              </div>
              <a
                href="https://t.me/buyer_italia_shop"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex h-12 items-center justify-center gap-2 bg-foreground px-5 text-[11px] font-medium uppercase tracking-[0.15em] text-background"
              >
                <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {isUk ? "Новинки в Telegram" : "New arrivals on Telegram"}
              </a>
              <p className="mt-5 text-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Novara · Italia
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex size-10 items-center justify-center"
        aria-label={isUk ? "Відкрити меню" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </button>
      {menu}
    </>
  );
}
