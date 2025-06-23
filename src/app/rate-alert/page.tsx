'use client'
import RateAlertForm from '@/components/RateAlertForm'
import { useExchangeRates } from '@/context/ExchangeRateContext'

export default function RateAlertPage() {
  const { supportedCurrencies } = useExchangeRates()
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Set a Rate Alert</h1>
      <p className="text-gray-600 mb-8 max-w-xl text-center">Get notified when your desired exchange rate is reached. Fill out the form below to set up a personalized rate alert.</p>
      <RateAlertForm supportedCurrencies={supportedCurrencies} />
    </div>
  )
} 