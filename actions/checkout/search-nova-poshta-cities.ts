"use server";

import "server-only";

import { z } from "zod";

import { isObriymConfigured, requestObriym } from "@/lib/obriym/client";

const citySearchSchema = z.string().trim().min(2).max(120);
const cityOptionSchema = z.object({
  label: z.string().min(1).max(255),
  ref: z.string().min(1).max(160),
  settlementRef: z.string().min(1).max(160),
});

export type NovaPoshtaCityOption = z.infer<typeof cityOptionSchema>;

type CitySearchResult =
  | { ok: true; options: NovaPoshtaCityOption[] }
  | { ok: false };

export async function searchNovaPoshtaCities(
  input: unknown,
): Promise<CitySearchResult> {
  const parsed = citySearchSchema.safeParse(input);
  if (!parsed.success || !isObriymConfigured()) return { ok: false };

  try {
    const response = await requestObriym<{ data: unknown }>(
      `/carriers/nova_poshta/cities?q=${encodeURIComponent(parsed.data)}`,
      { cache: "no-store" },
    );
    const options = z.array(cityOptionSchema).safeParse(response.data);
    if (!options.success) return { ok: false };

    return { ok: true, options: options.data.slice(0, 20) };
  } catch (error) {
    console.warn("Nova Poshta city lookup is unavailable", error);
    return { ok: false };
  }
}
