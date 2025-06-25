'use client'
import dynamic from 'next/dynamic'

// Dynamically import RateAlertForm to reduce initial bundle size
const RateAlertForm = dynamic(() => import('@/components/RateAlertForm'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-8 max-w-xl w-full mx-auto">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-6"></div>
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
})

// Define supported currencies directly in the page (no context needed)
const supportedCurrencies = [
  'CAD', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CNY', 'DKK', 'CHF', 'INR',
  'MXN', 'BRL', 'KRW', 'AED', 'RUB', 'SAR', 'JOD', 'KWD', 'IQD', 'BSD',
  'BHD', 'BOB', 'BGN', 'COP', 'CRC', 'DOP', 'EGP', 'ETB', 'GYD', 'HNL',
  'HUF', 'IDR', 'JMD', 'KES', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PEN',
  'PHP', 'PLN', 'QAR', 'SGD', 'ZAR', 'SEK', 'TWD', 'THB', 'TTD', 'TND',
  'TRY', 'VND', 'HKD'
]

export default function RateAlertPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4 bg-white">
      <RateAlertForm supportedCurrencies={supportedCurrencies} />
    </div>
  )
} 