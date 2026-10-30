import type { Metadata } from "next";
import { siteUrl, type Locale } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${siteUrl}${withLocalePath(locale, pathname)}`;
  const socialTitle = `${title} | Buyer Italia`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      siteName: "Buyer Italia",
      images: [{
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Buyer Italia",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
}
