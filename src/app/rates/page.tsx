'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { useExchangeRates } from '@/context/ExchangeRateContext'
import CurrencyConverter from '@/components/CurrencyConverter'
import { motion, AnimatePresence } from 'framer-motion'

interface ExchangeRate {
  currency: string
  countryName: string
  countryCode: string
  buyRate: number
  sellRate: number
  lastUpdated: string
}

const images = ['/images/rates/rates.png', '/images/rates/rates2.png', '/images/rates/rates3.png', '/images/rates/rates4.png', '/images/rates/rates5.png']

const CurrencyRatesPage = () => {
  const { rates, isLoading, error, lastUpdated, supportedCurrencies } = useExchangeRates();
  const [currentTime, setCurrentTime] = useState<string>('')
  const [displayRates, setDisplayRates] = useState<ExchangeRate[]>([])
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime() // Initial update
    const timeInterval = setInterval(updateTime, 1000) // Update every second

    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000) // Change image every 3 seconds
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!rates) return; // Don't process if rates are still loading

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
  }, [rates, lastUpdated, supportedCurrencies]);

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
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex justify-center h-24">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[currentImage]}
                    src={images[currentImage]}
                    alt="Exchange Rates"
                    className="h-16 w-auto md:h-24 rounded-lg shadow-lg object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-primary">
                Unbeatable Exchange Rates
              </h1>
              <p className="mt-2 max-w-2xl mx-auto text-2xl md:text-3xl font-semibold text-gray-700">
                Live. Transparent. Always in your favor.
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
                Scroll down to see today's best rates—trusted by thousands, updated every minute, and designed to help you get more for your money.
              </p>
            </div>
          </div>
        </section>

        {/* Currency Converter */}
        {/* <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CurrencyConverter />
          </div>
        </section> */}

        {/* Rates Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {/* Fallback rates disclaimer */}
            {!rates && !isLoading && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">
                      Live Rates Temporarily Unavailable
                    </h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        We apologize for the inconvenience. Our live rate service is currently experiencing technical difficulties. 
                        The rates shown below are fallback rates and may not reflect current market conditions.
                      </p>
                      <p className="mt-1">
                        For the most accurate and up-to-date rates, please contact us directly or visit one of our locations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="overflow-hidden">
              <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
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
                  <tbody className="divide-y divide-gray-200">
                    {isLoading ? (
                      // Loading state with skeleton rows
                      Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="w-8 h-6 bg-gray-200 rounded-sm"></div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="w-12 h-4 bg-gray-200 rounded"></div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="w-32 h-4 bg-gray-200 rounded"></div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="w-16 h-4 bg-gray-200 rounded"></div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="w-16 h-4 bg-gray-200 rounded"></div>
                          </td>
                        </tr>
                      ))
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
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>Loading live rates...</span>
                </div>
              ) : (
                `Rates are updated every minute. Last updated: ${currentTime}`
              )}
            </div>
          </motion.div>
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