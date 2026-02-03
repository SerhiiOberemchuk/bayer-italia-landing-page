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
  title: {
    default: 'Buyer Italia - Баєр з Італії | Оригінальний одяг ZARA, Mango, COS',
    template: '%s | Buyer Italia'
  },
  description: 'Професійний баєр-сервіс з Італії. Закуповуємо оригінальні речі ZARA, Mango, Massimo Dutti, COS, Puma прямо з італійських магазинів. Доставка в Україну 7-10 днів, в Європу 10-14 днів. Фото з магазину, чеки, 100% гарантія оригінальності. Знижки до 70% на розпродажах.',
  keywords: [
    'баєр італія', 
    'buyer italia', 
    'zara італія', 
    'одяг з італії', 
    'шопінг італія', 
    'доставка з італії',
    'оригінальний одяг італія',
    'mango італія',
    'massimo dutti італія',
    'cos італія',
    'puma італія',
    'розпродаж zara італія',
    'баєр сервіс',
    'купити одяг з італії',
    'доставка в україну з італії',
    'брендовий одяг італія',
    'zara sale italy',
    'italian fashion buyer',
    'personal shopper italy'
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Buyer Italia - Баєр з Італії | Оригінальний одяг з Італії',
    description: 'Професійний баєр-сервіс: ZARA, Mango, Massimo Dutti, COS прямо з Італії. Доставка в Україну та Європу. 100% оригінал, фото з магазину.',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Buyer Italia',
    images: [
      {
        url: '/images/buyer-italia-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Buyer Italia - Баєр сервіс з Італії',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buyer Italia - Баєр з Італії',
    description: 'Професійний баєр-сервіс: ZARA, Mango, Massimo Dutti прямо з Італії. Доставка в Україну та Європу.',
    images: ['/images/buyer-italia-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://buyeritalia.com',
    languages: {
      'uk-UA': 'https://buyeritalia.com',
    },
  },
  category: 'shopping',
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
