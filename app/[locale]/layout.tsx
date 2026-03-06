import React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { locales, isValidLocale, siteUrl } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { ensureLocale } from "@/lib/i18n/server";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import "../globals.css";
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: "%s | Buyer Italia",
    },
    description: dict.meta.description,
    keywords: [
      "баєр італія",
      "buyer italia",
      "zara італія",
      "одяг з італії",
      "шопінг італія",
      "доставка з італії",
      "оригінальний одяг італія",
      "mango італія",
      "massimo dutti італія",
      "cos італія",
      "puma італія",
      "розпродаж zara італія",
      "баєр сервіс",
      "купити одяг з італії",
      "доставка в україну з італії",
      "брендовий одяг італія",
      "zara sale italy",
      "italian fashion buyer",
      "personal shopper italy",
      "bershka італія",
      "pull and bear італія",
      "stradivarius італія",
      "h&m італія",
      "nike італія",
      "adidas італія",
      "new balance італія",
      "calvin klein італія",
      "tommy hilfiger італія",
      "guess італія",
      "pinko італія",
      "liu jo італія",
      "furla італія",
      "geox італія",
      "other stories італія",
      "max&co італія",
      "parfois італія",
      "брендовий одяг з європи",
      "оригінальні бренди італія",
      "розпродаж брендів італія",
      "купити nike з італії",
      "купити adidas з італії",
      "купити calvin klein з італії",
    ],
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-light-32x32.jpg", sizes: "32x32", type: "image/jpeg" },
        {
          url: "/icon-dark-32x32.jpg",
          sizes: "32x32",
          type: "image/jpeg",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: "/apple-icon.jpg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      siteName: "Buyer Italia",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Buyer Italia - Personal Shopping from Italy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ["/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "shopping",
  };
}

// JSON-LD structured data for Organization
function getOrganizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Buyer Italia",
    description:
      locale === "uk"
        ? "Баєр-сервіс з прямими закупками оригінальних речей з Італії"
        : "Buyer service with direct purchases of original items from Italy",
    url: "https://buyer-italia.shop",
    logo: "https://buyer-italia.shop/images/og-image.jpg",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "English", "Italian"],
    },
    sameAs: [
      "https://t.me/buyer_italia_shop",
      "https://instagram.com/buyer_italia",
    ],
  };
}

function getServiceJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "uk"
        ? "Buyer Italia - Закупки з Італії"
        : "Buyer Italia - Shopping from Italy",
    description:
      locale === "uk"
        ? "Професійний баєр-сервіс для закупки оригінальних речей з Італії. ZARA, Massimo Dutti, Mango, COS, Puma, Nike, Adidas, Calvin Klein, Tommy Hilfiger, Pinko, Liu Jo, Furla та інші бренди."
        : "Professional buyer service for purchasing original items from Italy. ZARA, Massimo Dutti, Mango, COS, Puma, Nike, Adidas, Calvin Klein, Tommy Hilfiger, Pinko, Liu Jo, Furla and other brands.",
    provider: {
      "@type": "Organization",
      name: "Buyer Italia",
    },
    areaServed: ["UA", "PL", "DE", "CZ", "IT"],
    serviceType: "Personal Shopping Service",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a2e",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = ensureLocale((await params).locale);
  const dict = await getDictionary(locale);
  const skipLinkLabel =
    locale === "uk" ? "Перейти до основного вмісту" : "Skip to main content";

  const organizationJsonLd = getOrganizationJsonLd(locale);
  const serviceJsonLd = getServiceJsonLd(locale);

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          {skipLinkLabel}
        </a>
        <div className="min-h-screen bg-background">
          <SiteHeader locale={locale} topBar={dict.hero.topBar} />
          {children}
          <Footer dict={dict.footer} locale={locale} />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
