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
  title: 'Bayer Italia - Баєр з Італії | ZARA та інші бренди',
  description: 'Прямі закупки оригінальних речей з Італії. ZARA, Massimo Dutti та інші бренди. Доставка в Україну та Європу. Реальні фото, оригінал гарантовано.',
  keywords: ['баєр італія', 'zara італія', 'одяг з італії', 'шопінг італія', 'доставка з італії'],
  openGraph: {
    title: 'Bayer Italia - Баєр з Італії',
    description: 'Прямі закупки оригінальних речей з Італії. ZARA та інші бренди.',
    type: 'website',
  },
    generator: 'v0.app'
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
      <body className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
