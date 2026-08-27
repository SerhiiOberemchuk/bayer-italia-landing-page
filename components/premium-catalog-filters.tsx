"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import type { ObriymReference } from "@/lib/obriym/types";
import type { Locale } from "@/lib/i18n/config";

export function PremiumCatalogFilters({
  locale,
  categories,
  brands,
}: {
  locale: Locale;
  categories: ObriymReference[];
  brands: ObriymReference[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const activeCategory = searchParams.get("category") ?? "";
  const activeBrand = searchParams.get("brand") ?? "";
  const isUk = locale === "uk";

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(params.size ? `${pathname}?${params}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    setFilter("q", query.trim());
  }

  const hasFilters = Boolean(activeCategory || activeBrand || searchParams.get("q"));

  return (
    <div className="border-y border-border py-5">
      <form onSubmit={submitSearch} className="flex items-center border-b border-border pb-4 md:hidden">
        <Search className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={isUk ? "Пошук" : "Search"}
          className="w-full bg-transparent px-3 text-sm outline-none"
        />
      </form>

      <div className="flex flex-col gap-4 pt-4 md:flex-row md:items-center md:justify-between md:pt-0">
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setFilter("category", "")}
            className={`whitespace-nowrap border px-4 py-2 text-[11px] uppercase tracking-[0.14em] ${
              !activeCategory ? "border-foreground bg-foreground text-background" : "border-border"
            }`}
          >
            {isUk ? "Усе" : "All"}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter("category", activeCategory === category.id ? "" : category.id)}
              className={`whitespace-nowrap border px-4 py-2 text-[11px] uppercase tracking-[0.14em] ${
                activeCategory === category.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {brands.length > 0 ? (
            <select
              value={activeBrand}
              onChange={(event) => setFilter("brand", event.target.value)}
              className="h-9 border-0 border-b border-border bg-transparent px-1 text-xs uppercase tracking-[0.12em] outline-none"
              aria-label={isUk ? "Бренд" : "Brand"}
            >
              <option value="">{isUk ? "Усі бренди" : "All brands"}</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          ) : null}
          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                router.push(pathname, { scroll: false });
              }}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              <X className="size-3.5" aria-hidden="true" />
              {isUk ? "Очистити" : "Clear"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
