import React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n/config"
import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { notFound } from "next/navigation"

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-playfair",
})

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  const dict = await getDictionary(locale)

  return {
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
    ],
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-icon.png",
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
          url: "/images/buyer-italia-logo.jpg",
          width: 1200,
          height: 630,
          alt: "Buyer Italia",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ["/images/buyer-italia-logo.jpg"],
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
    alternates: {
      canonical: `https://buyer-italia.shop/${locale}`,
      languages: {
        "uk-UA": "https://buyer-italia.shop/uk",
        "en-US": "https://buyer-italia.shop/en",
      },
    },
    category: "shopping",
    generator: "v0.app",
  }
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
    logo: "https://buyer-italia.shop/images/buyer-italia-logo.jpg",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "English", "Italian"],
    },
    sameAs: [
      "https://t.me/buyer_italia_shop",
      "https://instagram.com/buyer_italia",
    ],
  }
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
        ? "Професійний баєр-сервіс для закупки оригінальних речей з Італії. ZARA, Massimo Dutti, Mango та інші бренди."
        : "Professional buyer service for purchasing original items from Italy. ZARA, Massimo Dutti, Mango and other brands.",
    provider: {
      "@type": "Organization",
      name: "Buyer Italia",
    },
    areaServed: ["UA", "PL", "DE", "CZ", "IT"],
    serviceType: "Personal Shopping Service",
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a1a2e",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const organizationJsonLd = getOrganizationJsonLd(locale)
  const serviceJsonLd = getServiceJsonLd(locale)

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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
