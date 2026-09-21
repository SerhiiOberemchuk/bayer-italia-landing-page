import type { Locale } from "@/lib/i18n/config";

// Obriym CRM is the technical partner the buyer runs orders, payments and
// shipments in. UTM tags let the partner attribute visits from each placement.
export function getObriymCrmHref(locale: Locale, placement: string) {
  const url = new URL(locale === "uk" ? "https://obriym-crm.com" : "https://obriym-crm.com/en");
  url.searchParams.set("utm_source", "buyer-italia.shop");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "tech_partner");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

// Same glyph as obriym-crm/public/brand/logo/obriym-mark-color.svg, cropped to
// its strokes. The lower arc follows the text colour; the upper arc keeps the
// Obriym accent.
function ObriymCrmMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="18 14 88 88" fill="none" className={className} aria-hidden="true">
      <path
        d="M26.418 65.322 A34 34 0 0 0 93.872 57.04"
        stroke="currentColor"
        strokeWidth="9.5"
      />
      <path
        d="M30.972 59.988 A34 34 0 0 1 98.088 51.747"
        stroke="#c0560f"
        strokeWidth="9.5"
      />
    </svg>
  );
}

interface ObriymCrmLinkProps {
  locale: Locale;
  placement: string;
  className?: string;
}

export function ObriymCrmLink({ locale, placement, className = "" }: ObriymCrmLinkProps) {
  return (
    <a
      href={getObriymCrmHref(locale, placement)}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 text-foreground transition-opacity duration-300 hover:opacity-70 ${className}`}
    >
      <ObriymCrmMark className="size-6" />
      <span className="text-[15px] font-semibold tracking-[-0.01em]">Obriym CRM</span>
    </a>
  );
}
