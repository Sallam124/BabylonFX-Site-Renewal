import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import { ExchangeRateProvider } from '@/context/ExchangeRateContext'
import Navigation from '@/components/Navigation'
import '@/utils/exchangeRateService'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BabylonFX - Currency Exchange',
  description: 'Your trusted partner for currency exchange services',
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900`} suppressHydrationWarning>
        <ExchangeRateProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ExchangeRateProvider>
      </body>
    </html>
  )
} 