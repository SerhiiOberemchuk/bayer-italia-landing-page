import { ArrowUpRight } from "lucide-react";

// Italino is the buyer's own in-stock shop: goods already sitting in the Milan
// warehouse, shipped to Ukraine weekly. It answers the one need this service
// cannot — buying without waiting for a personal purchase run — so the site
// points there instead of leaving that visitor with nothing.
export function getItalinoHref(placement: string) {
  const url = new URL("https://italino.shop");
  url.searchParams.set("utm_source", "buyer-italia.shop");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "ready_stock");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

interface ItalinoLinkProps {
  placement: string;
  label: string;
  className?: string;
}

export function ItalinoLink({ placement, label, className = "" }: ItalinoLinkProps) {
  return (
    <a
      href={getItalinoHref(placement)}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {label}
      <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
