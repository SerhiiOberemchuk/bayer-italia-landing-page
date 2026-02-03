import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-dm-sans'
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Buyer Italia - Баєр з Італії | ZARA та інші бренди',
  description: 'Прямі закупки оригінальних речей з Італії. ZARA, Massimo Dutti та інші бренди. Доставка в Україну та Європу. Реальні фото, оригінал гарантовано.',
  keywords: ['баєр італія', 'zara італія', 'одяг з італії', 'шопінг італія', 'доставка з італії', 'buyer italia', 'buyer service italy', 'zara italy shopping'],
  openGraph: {
    title: 'Buyer Italia - Баєр з Італії',
    description: 'Прямі закупки оригінальних речей з Італії. ZARA та інші бренди.',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Buyer Italia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buyer Italia - Баєр з Італії',
    description: 'Прямі закупки оригінальних речей з Італії. ZARA та інші бренди.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
    generator: 'v0.app'
}

// JSON-LD structured data for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Buyer Italia",
  "description": "Баєр-сервіс з прямими закупками оригінальних речей з Італії",
  "url": "https://buyeritalia.com",
  "logo": "https://buyeritalia.com/images/buyer-italia-logo.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Ukrainian", "Russian", "Italian"]
  },
  "sameAs": [
    "https://t.me/buyer_italia_shop",
    "https://instagram.com/buyer_italia"
  ]
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Buyer Italia - Закупки з Італії",
  "description": "Професійний баєр-сервіс для закупки оригінальних речей з Італії. ZARA, Massimo Dutti, Mango та інші бренди.",
  "provider": {
    "@type": "Organization",
    "name": "Buyer Italia"
  },
  "areaServed": ["UA", "PL", "DE", "CZ", "IT"],
  "serviceType": "Personal Shopping Service"
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
