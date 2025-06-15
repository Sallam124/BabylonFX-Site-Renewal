import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BabylonFX - Professional Currency Exchange Services',
  description: 'Trusted currency exchange services in Canada. Get the best rates for your currency exchange needs with BabylonFX.',
  keywords: 'currency exchange, forex, money exchange, Canadian currency exchange, BabylonFX',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 