import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationSelector from '@/components/NavigationSelector'
import FooterWrapper from '@/components/FooterWrapper'
import { ExchangeRateProvider } from '@/context/ExchangeRateContext'
import Loading from './loading'
import { headers } from 'next/headers'
import RouteLoader from '@/components/RouteLoader'
import { GlobalLoadingProvider } from '@/context/GlobalLoadingContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BabylonFX - Currency Exchange Services',
  description: 'Professional currency exchange services with competitive rates and excellent customer service.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current pathname from headers (server-side)
  const h = await headers();
  const pathname = h.get('next-url') || '';
  const isRateAlert = pathname.startsWith('/rate-alert');
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-white via-gray-100 to-blue-100 text-gray-900`} suppressHydrationWarning>
        <GlobalLoadingProvider>
          <RouteLoader />
          <Suspense fallback={<Loading />}>
            <NavigationSelector />
            <main>
              <ExchangeRateProvider>
                {children}
              </ExchangeRateProvider>
            </main>
            {/* Only show footer if not on /rate-alert */}
            {!isRateAlert && <FooterWrapper />}
          </Suspense>
        </GlobalLoadingProvider>
      </body>
    </html>
  )
} 