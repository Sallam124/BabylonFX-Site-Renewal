'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

interface ExchangeRate {
  currency: string
  buyRate: number
  sellRate: number
  lastUpdated: string
}

const Rates = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // In a real application, this would be an API call to your backend
        // For now, we'll use mock data
        const mockRates: ExchangeRate[] = [
          {
            currency: 'USD',
            buyRate: 0.74,
            sellRate: 0.72,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'EUR',
            buyRate: 0.68,
            sellRate: 0.66,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'GBP',
            buyRate: 0.58,
            sellRate: 0.56,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'JPY',
            buyRate: 110.5,
            sellRate: 108.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'AUD',
            buyRate: 1.12,
            sellRate: 1.10,
            lastUpdated: new Date().toISOString(),
          },
        ]
        setRates(mockRates)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching rates:', error)
        setIsLoading(false)
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 60000) // Update rates every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                Current Exchange Rates
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Real-time currency exchange rates updated every minute
              </p>
            </div>
          </div>
        </section>

        {/* Rates Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Currency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buy Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sell Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                          Loading rates...
                        </td>
                      </tr>
                    ) : (
                      rates.map((rate) => (
                        <tr key={rate.currency} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{rate.currency}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{rate.buyRate.toFixed(4)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{rate.sellRate.toFixed(4)}</div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">
              Rates are updated every minute. Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-sm text-gray-500">
              <p>
                * Rates are subject to change without notice. Please contact us for the most up-to-date rates.
                <br />
                ** Minimum transaction amounts may apply. Please visit our location for more details.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Rates 