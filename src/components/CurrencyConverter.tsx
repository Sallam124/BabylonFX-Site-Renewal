'use client'

import { useState, useEffect } from 'react'

interface ExchangeRate {
  currency: string
  rate: number
  lastUpdated: string
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1')
  const [fromCurrency, setFromCurrency] = useState<string>('CAD')
  const [toCurrency, setToCurrency] = useState<string>('USD')
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([])
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const currencies = [
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
  ]

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // In a real application, this would be an API call to your backend
        // For now, we'll use mock data
        const mockRates: ExchangeRate[] = [
          { currency: 'USD', rate: 0.74, lastUpdated: new Date().toISOString() },
          { currency: 'EUR', rate: 0.68, lastUpdated: new Date().toISOString() },
          { currency: 'GBP', rate: 0.58, lastUpdated: new Date().toISOString() },
          { currency: 'JPY', rate: 110.5, lastUpdated: new Date().toISOString() },
          { currency: 'AUD', rate: 1.12, lastUpdated: new Date().toISOString() },
        ]
        setExchangeRates(mockRates)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching exchange rates:', error)
        setIsLoading(false)
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 60000) // Update rates every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const calculateConversion = () => {
      if (fromCurrency === toCurrency) {
        setConvertedAmount(Number(amount))
        return
      }

      const fromRate = fromCurrency === 'CAD' ? 1 : 
        exchangeRates.find(rate => rate.currency === fromCurrency)?.rate || 1
      const toRate = toCurrency === 'CAD' ? 1 :
        exchangeRates.find(rate => rate.currency === toCurrency)?.rate || 1

      const result = (Number(amount) / fromRate) * toRate
      setConvertedAmount(result)
    }

    calculateConversion()
  }, [amount, fromCurrency, toCurrency, exchangeRates])

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            min="0"
            step="0.01"
            aria-label="Amount to convert"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Currency
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            aria-label="Select source currency"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Currency
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            aria-label="Select target currency"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Converted Amount
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
            {isLoading ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="font-semibold">
                {convertedAmount.toFixed(2)} {toCurrency}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        Rates are updated every minute. Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}

export default CurrencyConverter 