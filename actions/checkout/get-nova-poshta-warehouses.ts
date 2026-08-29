"use server";

import "server-only";

import { z } from "zod";

import { isObriymConfigured, requestObriym } from "@/lib/obriym/client";

const cityRefSchema = z.string().trim().min(1).max(160);
const warehouseOptionSchema = z.object({
  label: z.string().min(1).max(255),
  number: z.string().max(40),
  ref: z.string().min(1).max(160),
});

export type NovaPoshtaWarehouseOption = z.infer<
  typeof warehouseOptionSchema
>;

type WarehouseResult =
  | { ok: true; options: NovaPoshtaWarehouseOption[] }
  | { ok: false };

export async function getNovaPoshtaWarehouses(
  input: unknown,
): Promise<WarehouseResult> {
  const parsed = cityRefSchema.safeParse(input);
  if (!parsed.success || !isObriymConfigured()) return { ok: false };

  try {
    const response = await requestObriym<{ data: unknown }>(
      `/carriers/nova_poshta/warehouses?cityRef=${encodeURIComponent(parsed.data)}`,
      { cache: "no-store" },
    );
    const options = z.array(warehouseOptionSchema).safeParse(response.data);
    if (!options.success) return { ok: false };

    return { ok: true, options: options.data.slice(0, 500) };
  } catch (error) {
    console.warn("Nova Poshta warehouse lookup is unavailable", error);
    return { ok: false };
  }
}
