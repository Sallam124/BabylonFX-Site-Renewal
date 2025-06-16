'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

interface ExchangeRate {
  currency: string
  countryName: string
  countryCode: string
  buyRate: number
  sellRate: number
  lastUpdated: string
}

const Rates = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime() // Initial update
    const timeInterval = setInterval(updateTime, 1000) // Update every second

    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // In a real application, this would be an API call to your backend
        // For now, we'll use mock data
        const mockRates: ExchangeRate[] = [
          {
            currency: 'USD',
            countryName: 'United States',
            countryCode: 'USA',
            buyRate: 0.74,
            sellRate: 0.72,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'EUR',
            countryName: 'European Union',
            countryCode: 'eu',
            buyRate: 0.68,
            sellRate: 0.66,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'GBP',
            countryName: 'United Kingdom',
            countryCode: 'gb',
            buyRate: 0.58,
            sellRate: 0.56,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'JPY',
            countryName: 'Japan',
            countryCode: 'jp',
            buyRate: 110.5,
            sellRate: 108.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'AUD',
            countryName: 'Australia',
            countryCode: 'au',
            buyRate: 1.12,
            sellRate: 1.10,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'CNY',
            countryName: 'China',
            countryCode: 'cn',
            buyRate: 5.35,
            sellRate: 5.25,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'DKK',
            countryName: 'Denmark',
            countryCode: 'dk',
            buyRate: 5.15,
            sellRate: 5.05,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'CHF',
            countryName: 'Switzerland',
            countryCode: 'ch',
            buyRate: 0.65,
            sellRate: 0.63,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'INR',
            countryName: 'India',
            countryCode: 'in',
            buyRate: 61.5,
            sellRate: 60.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'MXN',
            countryName: 'Mexico',
            countryCode: 'mx',
            buyRate: 12.5,
            sellRate: 12.3,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'BRL',
            countryName: 'Brazil',
            countryCode: 'br',
            buyRate: 3.75,
            sellRate: 3.65,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'KRW',
            countryName: 'South Korea',
            countryCode: 'kr',
            buyRate: 980.5,
            sellRate: 970.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'AED',
            countryName: 'United Arab Emirates',
            countryCode: 'ae',
            buyRate: 2.75,
            sellRate: 2.65,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'RUB',
            countryName: 'Russia',
            countryCode: 'ru',
            buyRate: 68.5,
            sellRate: 67.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'SAR',
            countryName: 'Saudi Arabia',
            countryCode: 'sa',
            buyRate: 2.80,
            sellRate: 2.70,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'JOD',
            countryName: 'Jordan',
            countryCode: 'jo',
            buyRate: 0.53,
            sellRate: 0.51,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'KWD',
            countryName: 'Kuwait',
            countryCode: 'kw',
            buyRate: 0.23,
            sellRate: 0.22,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'IQD',
            countryName: 'Iraq',
            countryCode: 'iq',
            buyRate: 1300,
            sellRate: 1280,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'BSD',
            countryName: 'Bahamas',
            countryCode: 'bs',
            buyRate: 1.00,
            sellRate: 0.98,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'BHD',
            countryName: 'Bahrain',
            countryCode: 'bh',
            buyRate: 0.38,
            sellRate: 0.37,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'BOB',
            countryName: 'Bolivia',
            countryCode: 'bo',
            buyRate: 6.90,
            sellRate: 6.80,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'BGN',
            countryName: 'Bulgaria',
            countryCode: 'bg',
            buyRate: 1.33,
            sellRate: 1.31,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'COP',
            countryName: 'Colombia',
            countryCode: 'co',
            buyRate: 3800,
            sellRate: 3750,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'CRC',
            countryName: 'Costa Rica',
            countryCode: 'cr',
            buyRate: 520,
            sellRate: 510,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'DOP',
            countryName: 'Dominican Republic',
            countryCode: 'do',
            buyRate: 58.5,
            sellRate: 57.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'EGP',
            countryName: 'Egypt',
            countryCode: 'eg',
            buyRate: 31.5,
            sellRate: 30.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'ETB',
            countryName: 'Ethiopia',
            countryCode: 'et',
            buyRate: 55.5,
            sellRate: 54.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'GYD',
            countryName: 'Guyana',
            countryCode: 'gy',
            buyRate: 210,
            sellRate: 205,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'HNL',
            countryName: 'Honduras',
            countryCode: 'hn',
            buyRate: 24.5,
            sellRate: 24.0,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'HUF',
            countryName: 'Hungary',
            countryCode: 'hu',
            buyRate: 360,
            sellRate: 350,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'IDR',
            countryName: 'Indonesia',
            countryCode: 'id',
            buyRate: 15500,
            sellRate: 15400,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'JMD',
            countryName: 'Jamaica',
            countryCode: 'jm',
            buyRate: 155,
            sellRate: 150,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'KES',
            countryName: 'Kenya',
            countryCode: 'ke',
            buyRate: 130,
            sellRate: 128,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'NPR',
            countryName: 'Nepal',
            countryCode: 'np',
            buyRate: 130,
            sellRate: 128,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'NZD',
            countryName: 'New Zealand',
            countryCode: 'nz',
            buyRate: 1.20,
            sellRate: 1.18,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'NOK',
            countryName: 'Norway',
            countryCode: 'no',
            buyRate: 10.5,
            sellRate: 10.3,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'OMR',
            countryName: 'Oman',
            countryCode: 'om',
            buyRate: 0.29,
            sellRate: 0.28,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'PKR',
            countryName: 'Pakistan',
            countryCode: 'pk',
            buyRate: 280,
            sellRate: 275,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'PEN',
            countryName: 'Peru',
            countryCode: 'pe',
            buyRate: 3.75,
            sellRate: 3.70,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'PHP',
            countryName: 'Philippines',
            countryCode: 'ph',
            buyRate: 55.5,
            sellRate: 54.5,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'PLN',
            countryName: 'Poland',
            countryCode: 'pl',
            buyRate: 3.95,
            sellRate: 3.85,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'QAR',
            countryName: 'Qatar',
            countryCode: 'qa',
            buyRate: 2.75,
            sellRate: 2.70,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'SGD',
            countryName: 'Singapore',
            countryCode: 'sg',
            buyRate: 1.35,
            sellRate: 1.33,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'ZAR',
            countryName: 'South Africa',
            countryCode: 'za',
            buyRate: 18.5,
            sellRate: 18.2,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'SEK',
            countryName: 'Sweden',
            countryCode: 'se',
            buyRate: 10.5,
            sellRate: 10.3,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'TWD',
            countryName: 'Taiwan',
            countryCode: 'tw',
            buyRate: 31.5,
            sellRate: 31.0,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'THB',
            countryName: 'Thailand',
            countryCode: 'th',
            buyRate: 35.5,
            sellRate: 35.0,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'TTD',
            countryName: 'Trinidad and Tobago',
            countryCode: 'tt',
            buyRate: 6.75,
            sellRate: 6.65,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'TND',
            countryName: 'Tunisia',
            countryCode: 'tn',
            buyRate: 3.15,
            sellRate: 3.10,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'TRY',
            countryName: 'Turkey',
            countryCode: 'tr',
            buyRate: 28.5,
            sellRate: 28.0,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'VND',
            countryName: 'Vietnam',
            countryCode: 'vn',
            buyRate: 24500,
            sellRate: 24400,
            lastUpdated: new Date().toISOString(),
          },
          {
            currency: 'HKD',
            countryName: 'Hong Kong',
            countryCode: 'hk',
            buyRate: 5.85,
            sellRate: 5.75,
            lastUpdated: new Date().toISOString(),
          }
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
                        Flag
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Currency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
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
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          Loading rates...
                        </td>
                      </tr>
                    ) : (
                      rates.map((rate) => (
                        <tr key={rate.currency} className="hover:bg-gray-50">
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <Image
                                src={`/images/flags/${rate.countryCode}.png`}
                                alt={`${rate.countryName} flag`}
                                width={30}
                                height={20}
                                className="rounded-sm"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{rate.currency}</div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{rate.countryName}</div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{rate.buyRate.toFixed(4)}</div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
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
              Rates are updated every minute. Last updated: {currentTime}
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