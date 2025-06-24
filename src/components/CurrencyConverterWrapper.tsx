'use client'

import { ExchangeRateProvider } from '@/context/ExchangeRateContext'
import CurrencyConverter from './CurrencyConverter'

export default function CurrencyConverterWrapper() {
  return (
    <ExchangeRateProvider>
      <CurrencyConverter />
    </ExchangeRateProvider>
  )
} 