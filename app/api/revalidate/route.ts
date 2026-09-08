import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

// Obriym CRM webhook receiver. The CRM signs the raw body with the secret the
// merchant entered when registering this URL (Settings → Developers → Webhooks)
// and sends `x-obriym-signature: sha256=<hex>`. Product writes land here so the
// catalog, product pages, merchant feed and sitemap stop serving a stale
// catalog instead of waiting out the 5-minute `cacheLife` revalidate window.

const PRODUCT_EVENT_PREFIX = "product.";

function isTrustedSignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.OBRIYM_WEBHOOK_SECRET;
  if (!secret || !header) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const received = header.startsWith("sha256=") ? header.slice(7) : header;

  // timingSafeEqual throws on a length mismatch, so compare lengths first.
  const expectedBytes = Buffer.from(expected, "utf8");
  const receivedBytes = Buffer.from(received, "utf8");
  if (expectedBytes.length !== receivedBytes.length) return false;

  return timingSafeEqual(expectedBytes, receivedBytes);
}

export async function POST(request: Request): Promise<Response> {
  if (!process.env.OBRIYM_WEBHOOK_SECRET) {
    // Fail loudly: a 503 keeps the delivery in the CRM's retry queue and shows
    // up in its delivery log, where silently accepting it would look healthy
    // while every product change quietly failed to reach the storefront.
    return Response.json({ error: "Webhook secret is not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  if (!isTrustedSignature(rawBody, request.headers.get("x-obriym-signature"))) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Body is not valid JSON" }, { status: 400 });
  }

  const event =
    typeof body === "object" && body !== null && "event" in body
      ? (body as { event: unknown }).event
      : null;

  if (typeof event !== "string" || !event.startsWith(PRODUCT_EVENT_PREFIX)) {
    // Acknowledge events this storefront does not act on, so the CRM does not
    // mark the endpoint failing and retry them.
    return Response.json({ revalidated: false, event });
  }

  // `{ expire: 0 }` because the caller is a webhook, not a Server Action:
  // `updateTag` is unavailable, and serving stale content to the crawler that
  // arrives next is the exact thing this endpoint exists to prevent.
  revalidateTag("obriym-products", { expire: 0 });

  const data =
    typeof body === "object" && body !== null && "data" in body
      ? (body as { data: unknown }).data
      : null;
  const productId =
    typeof data === "object" && data !== null && "productId" in data
      ? (data as { productId: unknown }).productId
      : null;

  if (typeof productId === "string" && productId.length > 0) {
    revalidateTag(`obriym-product:${productId}`, { expire: 0 });
  }

  return Response.json({ revalidated: true, event });
}
