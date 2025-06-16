'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { useExchangeRates } from '@/context/ExchangeRateContext'
import CurrencyConverter from '@/components/CurrencyConverter'

interface ExchangeRate {
  currency: string
  countryName: string
  countryCode: string
  buyRate: number
  sellRate: number
  lastUpdated: string
}

const CurrencyRatesPage = () => {
  const { rates, isLoading, error, lastUpdated, supportedCurrencies } = useExchangeRates();
  const [currentTime, setCurrentTime] = useState<string>('')
  const [displayRates, setDisplayRates] = useState<ExchangeRate[]>([])

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime() // Initial update
    const timeInterval = setInterval(updateTime, 1000) // Update every second

    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    if (isLoading || !rates) return;

    const baseCurrency = 'CAD';
    const spread = 0.005; // 0.5% spread

    const newRates = supportedCurrencies
      .filter(currency => currency !== baseCurrency)
      .map(currency => ({
        currency,
        countryName: getCountryName(currency),
        countryCode: currency.toLowerCase(),
        buyRate: rates[currency] * (1 + spread),
        sellRate: rates[currency] * (1 - spread),
        lastUpdated: lastUpdated
      }));

    setDisplayRates(newRates);
  }, [rates, isLoading, lastUpdated, supportedCurrencies]);

  const getCountryName = (currencyCode: string): string => {
    const countryNames: { [key: string]: string } = {
      'USD': 'United States',
      'EUR': 'European Union',
      'GBP': 'United Kingdom',
      'JPY': 'Japan',
      'AUD': 'Australia',
      'CNY': 'China',
      'DKK': 'Denmark',
      'CHF': 'Switzerland',
      'INR': 'India',
      'MXN': 'Mexico',
      'BRL': 'Brazil',
      'KRW': 'South Korea',
      'AED': 'United Arab Emirates',
      'RUB': 'Russia',
      'SAR': 'Saudi Arabia',
      'JOD': 'Jordan',
      'KWD': 'Kuwait',
      'IQD': 'Iraq',
      'BSD': 'Bahamas',
      'BHD': 'Bahrain',
      'BOB': 'Bolivia',
      'BGN': 'Bulgaria',
      'COP': 'Colombia',
      'CRC': 'Costa Rica',
      'DOP': 'Dominican Republic',
      'EGP': 'Egypt',
      'ETB': 'Ethiopia',
      'GYD': 'Guyana',
      'HNL': 'Honduras',
      'HUF': 'Hungary',
      'IDR': 'Indonesia',
      'JMD': 'Jamaica',
      'KES': 'Kenya',
      'NPR': 'Nepal',
      'NZD': 'New Zealand',
      'NOK': 'Norway',
      'OMR': 'Oman',
      'PKR': 'Pakistan',
      'PEN': 'Peru',
      'PHP': 'Philippines',
      'PLN': 'Poland',
      'QAR': 'Qatar',
      'SGD': 'Singapore',
      'ZAR': 'South Africa',
      'SEK': 'Sweden',
      'TWD': 'Taiwan',
      'THB': 'Thailand',
      'TTD': 'Trinidad and Tobago',
      'TND': 'Tunisia',
      'TRY': 'Turkey',
      'VND': 'Vietnam',
      'HKD': 'Hong Kong'
    }
    return countryNames[currencyCode] || currencyCode
  }

  const getFlagPath = (currencyCode: string): string => {
    const flagMap: { [key: string]: string } = {
      'USD': 'usa',
      'EUR': 'eu',
      'GBP': 'gb',
      'JPY': 'jp',
      'AUD': 'au',
      'CNY': 'cn',
      'DKK': 'dk',
      'CHF': 'ch',
      'INR': 'in',
      'MXN': 'mx',
      'BRL': 'br',
      'KRW': 'kr',
      'AED': 'ae',
      'RUB': 'ru',
      'SAR': 'sa',
      'JOD': 'jo',
      'KWD': 'kw',
      'IQD': 'iq',
      'BSD': 'bs',
      'BHD': 'bh',
      'BOB': 'bo',
      'BGN': 'bg',
      'COP': 'co',
      'CRC': 'cr',
      'DOP': 'do',
      'EGP': 'eg',
      'ETB': 'et',
      'GYD': 'gy',
      'HNL': 'hn',
      'HUF': 'hu',
      'IDR': 'id',
      'JMD': 'jm',
      'KES': 'ke',
      'NPR': 'np',
      'NZD': 'nz',
      'NOK': 'no',
      'OMR': 'om',
      'PKR': 'pk',
      'PEN': 'pe',
      'PHP': 'ph',
      'PLN': 'pl',
      'QAR': 'qa',
      'SGD': 'sg',
      'ZAR': 'za',
      'SEK': 'se',
      'TWD': 'tw',
      'THB': 'th',
      'TTD': 'tt',
      'TND': 'tn',
      'TRY': 'tr',
      'VND': 'vn',
      'HKD': 'hk'
    }
    return `/images/flags/${flagMap[currencyCode] || currencyCode.toLowerCase()}.png`
  }

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

        {/* Currency Converter */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CurrencyConverter />
          </div>
        </section>

        {/* Rates Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
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
                    ) : displayRates.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No rates available
                        </td>
                      </tr>
                    ) : (
                      displayRates.map((rate) => (
                        <tr key={rate.currency} className="hover:bg-gray-50">
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <Image
                                src={getFlagPath(rate.currency)}
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

export default CurrencyRatesPage 