import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationSelector from '@/components/NavigationSelector'
// import { ExchangeRateProvider } from '@/context/ExchangeRateContext'
// import '@/utils/exchangeRateService'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BabylonFX - Currency Exchange Services',
  description: 'Professional currency exchange services with competitive rates and excellent customer service.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-white via-gray-100 to-blue-100 text-gray-900`} suppressHydrationWarning>
        <NavigationSelector />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
} 