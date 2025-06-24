'use client'

import { useState, useEffect } from 'react'
import { getBulkExchangeRates } from '@/utils/exchangeRateService'
import PageContainer from '@/components/PageContainer'
import PageHero from '@/components/PageHero'
import Image from 'next/image'

const images = ['/images/rates/rates.png', '/images/rates/rates2.png', '/images/rates/rates3.png', '/images/rates/rates4.png', '/images/rates/rates5.png']

const supportedCurrencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CNY', 'DKK', 'CHF', 'INR', 'MXN', 'BRL', 'KRW', 'AED', 'RUB', 'SAR', 'JOD', 'KWD', 'IQD', 'BSD', 'BHD', 'BOB', 'BGN', 'COP', 'CRC', 'DOP', 'EGP', 'ETB', 'GYD', 'HNL', 'HUF', 'IDR', 'JMD', 'KES', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PEN', 'PHP', 'PLN', 'QAR', 'SGD', 'ZAR', 'SEK', 'TWD', 'THB', 'TTD', 'TND', 'TRY', 'VND', 'HKD'
]

const countryNames: { [key: string]: string } = {
  'USD': 'United States', 'EUR': 'European Union', 'GBP': 'United Kingdom', 'JPY': 'Japan', 'AUD': 'Australia',
  'CNY': 'China', 'DKK': 'Denmark', 'CHF': 'Switzerland', 'INR': 'India', 'MXN': 'Mexico', 'BRL': 'Brazil',
  'KRW': 'South Korea', 'AED': 'United Arab Emirates', 'RUB': 'Russia', 'SAR': 'Saudi Arabia', 'JOD': 'Jordan',
  'KWD': 'Kuwait', 'IQD': 'Iraq', 'BSD': 'Bahamas', 'BHD': 'Bahrain', 'BOB': 'Bolivia', 'BGN': 'Bulgaria',
  'COP': 'Colombia', 'CRC': 'Costa Rica', 'DOP': 'Dominican Republic', 'EGP': 'Egypt', 'ETB': 'Ethiopia',
  'GYD': 'Guyana', 'HNL': 'Honduras', 'HUF': 'Hungary', 'IDR': 'Indonesia', 'JMD': 'Jamaica', 'KES': 'Kenya',
  'NPR': 'Nepal', 'NZD': 'New Zealand', 'NOK': 'Norway', 'OMR': 'Oman', 'PKR': 'Pakistan', 'PEN': 'Peru',
  'PHP': 'Philippines', 'PLN': 'Poland', 'QAR': 'Qatar', 'SGD': 'Singapore', 'ZAR': 'South Africa', 'SEK': 'Sweden',
  'TWD': 'Taiwan', 'THB': 'Thailand', 'TTD': 'Trinidad and Tobago', 'TND': 'Tunisia', 'TRY': 'Turkey', 'VND': 'Vietnam', 'HKD': 'Hong Kong'
}

const flagMap: { [key: string]: string } = {
  'USD': 'usa', 'EUR': 'eu', 'GBP': 'gb', 'JPY': 'jp', 'AUD': 'au', 'CNY': 'cn', 'DKK': 'dk', 'CHF': 'ch', 'INR': 'in', 'MXN': 'mx', 'BRL': 'br', 'KRW': 'kr', 'AED': 'ae', 'RUB': 'ru', 'SAR': 'sa', 'JOD': 'jo', 'KWD': 'kw', 'IQD': 'iq', 'BSD': 'bs', 'BHD': 'bh', 'BOB': 'bo', 'BGN': 'bg', 'COP': 'co', 'CRC': 'cr', 'DOP': 'do', 'EGP': 'eg', 'ETB': 'et', 'GYD': 'gy', 'HNL': 'hn', 'HUF': 'hu', 'IDR': 'id', 'JMD': 'jm', 'KES': 'ke', 'NPR': 'np', 'NZD': 'nz', 'NOK': 'no', 'OMR': 'om', 'PKR': 'pk', 'PEN': 'pe', 'PHP': 'ph', 'PLN': 'pl', 'QAR': 'qa', 'SGD': 'sg', 'ZAR': 'za', 'SEK': 'se', 'TWD': 'tw', 'THB': 'th', 'TTD': 'tt', 'TND': 'tn', 'TRY': 'tr', 'VND': 'vn', 'HKD': 'hk'
}

function getFlagPath(currencyCode: string): string {
  return `/images/flags/${flagMap[currencyCode] || currencyCode.toLowerCase()}.png`
}

interface RateData {
  currency: string
  countryName: string
  flag: string
  buyRate: number
  sellRate: number
  isLoading: boolean
  error: string | null
}

export default function RatesPage() {
  const [rates, setRates] = useState<RateData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const spread = 0.005 // 0.5% spread
  const baseCurrency = 'CAD'

  // Auto-refresh timer state
  const [autoRefreshTimer, setAutoRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-refresh countdown
  const [countdown, setCountdown] = useState<number>(300); // 5 minutes in seconds

  // Initialize rates data structure
  useEffect(() => {
    const initialRates = supportedCurrencies
      .filter(currency => currency !== baseCurrency)
      .map(currency => ({
        currency,
        countryName: countryNames[currency] || currency,
        flag: getFlagPath(currency),
        buyRate: 0,
        sellRate: 0,
        isLoading: true,
        error: null
      }))
    setRates(initialRates)
  }, [])

  // Real-time clock ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  // Image carousel - cycle through images every 2.5 seconds
  useEffect(() => {
    console.log('Starting image carousel with', images.length, 'images, current index:', currentImageIndex);
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        console.log('Carousel: switching from image', prevIndex, 'to image', newIndex, 'of', images.length);
        return newIndex;
      });
    }, 2500) // Change image every 2.5 seconds

    // Cleanup function to clear the interval
    return () => {
      console.log('Cleaning up image carousel timer');
      clearInterval(imageTimer);
    }
  }, [images.length]) // Add images.length as dependency

  // Debug effect to track currentImageIndex changes
  useEffect(() => {
    console.log('Current image index changed to:', currentImageIndex);
  }, [currentImageIndex])

  // Row-by-row loading effect
  const [visibleRows, setVisibleRows] = useState<number>(0);
  
  useEffect(() => {
    if (isLoading || isRefreshing) {
      setVisibleRows(0);
    } else if (rates.length > 0) {
      // Animate rows appearing one by one
      const timer = setTimeout(() => {
        setVisibleRows(rates.length);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, isRefreshing, rates.length]);

  // Animate rows appearing one by one
  useEffect(() => {
    if (visibleRows === 0 && rates.length > 0 && !isLoading && !isRefreshing) {
      let currentRow = 0;
      const interval = setInterval(() => {
        currentRow++;
        setVisibleRows(currentRow);
        if (currentRow >= rates.length) {
          clearInterval(interval);
        }
      }, 50); // Show each row after 50ms
      
      return () => clearInterval(interval);
    }
  }, [visibleRows, rates.length, isLoading, isRefreshing]);

  // Fetch live rates using bulk API call
  const fetchRates = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      // Get all rates in a single API call
      const targetCurrencies = rates.map(rate => rate.currency)
      const bulkRates = await getBulkExchangeRates(baseCurrency, targetCurrencies)

      // Update rates with live data
      const updatedRates = rates.map(rate => {
        const liveRate = bulkRates[rate.currency]
        return {
          ...rate,
          buyRate: liveRate * (1 + spread),
          sellRate: liveRate * (1 - spread),
          isLoading: false,
          error: null
        }
      })

      setRates(updatedRates)
      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.')
      // Mark all rates as having errors
      const errorRates = rates.map(rate => ({
        ...rate,
        isLoading: false,
        error: 'Failed to fetch rate'
      }))
      setRates(errorRates)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Fetch rates on component mount
  useEffect(() => {
    if (rates.length > 0) {
      fetchRates()
    }
  }, [rates.length])

  // Auto-refresh every 5 minutes with reset capability
  useEffect(() => {
    // Clear existing timer
    if (autoRefreshTimer) {
      clearInterval(autoRefreshTimer);
    }

    // Set new timer
    const interval = setInterval(() => {
      if (!isLoading && !isRefreshing) {
        console.log('Auto-refreshing rates...');
        fetchRates(true)
      }
    }, 5 * 60 * 1000) // 5 minutes

    setAutoRefreshTimer(interval);

    // Cleanup on unmount
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [isLoading, isRefreshing, lastUpdated]) // Reset timer when lastUpdated changes (manual refresh)

  // Countdown timer
  useEffect(() => {
    if (isLoading || isRefreshing) {
      setCountdown(300); // Reset countdown when loading
      return;
    }

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 300; // Reset to 5 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [isLoading, isRefreshing, lastUpdated]);

  // Format countdown
  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRefresh = () => {
    console.log('Manual refresh triggered - resetting auto-refresh timer');
    fetchRates(true)
  }

  const formatTimeAgo = (date: Date) => {
    const diffInSeconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 0) return 'Just now'
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center h-24 relative w-full max-w-md mx-auto">
              {/* Image carousel with back-to-front fade */}
              <div className="relative w-full h-full">
                {images.map((image, index) => (
                  <div
                    key={image}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: index === currentImageIndex ? 1 : 0,
                      transform: index === currentImageIndex ? 'scale(1) translateZ(0)' : 'scale(0.8) translateZ(-20px)',
                      transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: index === currentImageIndex ? 10 : 5,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Exchange Rates ${index + 1}`}
                      className="h-16 w-auto md:h-24 rounded-lg shadow-lg object-contain max-w-full"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '100%'
                      }}
                      onError={(e) => {
                        console.error(`Failed to load image: ${image}`);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded image: ${image}`);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-primary fade-in-up">
              Live Exchange Rates
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-2xl md:text-3xl font-semibold text-gray-700 fade-in-up-delay-1">
              Real-time. Transparent. Always current.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 fade-in-up-delay-2">
              Live rates updated every minute. Scroll down to see today's best rates—trusted by thousands.
            </p>
          </div>
        </div>
      </section>

      {/* Rates Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full fade-in-up">
          {/* Header with refresh button and status */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">Live Exchange Rates</h2>
              <div className="flex items-center space-x-4">
                {lastUpdated && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Last updated: {formatTimeAgo(lastUpdated)}
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">
                    Current time: {currentTime.toLocaleTimeString()}
                  </span>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">
                    Auto-refresh in: {formatCountdown(countdown)}
                  </span>
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.003 7.003 0 0112 5c1.657 0 3.156.576 4.358 1.535M18.418 15A7.003 7.003 0 0112 19a6.978 6.978 0 01-4.358-1.535" />
              </svg>
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Rates'}</span>
            </button>
          </div>

          {/* Loading overlay for table */}
          {(isLoading || isRefreshing) && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-gray-600 font-medium">
                  {isRefreshing ? 'Refreshing rates...' : 'Loading rates...'}
                </p>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="overflow-hidden relative">
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
                  {rates.map((rate, index) => (
                    <tr 
                      key={rate.currency} 
                      className={`hover:bg-gray-50 transition-all duration-300 ${
                        index < visibleRows 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: `${index * 50}ms`
                      }}
                    >
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={rate.flag}
                            alt={`${rate.countryName} flag`}
                            width={30}
                            height={20}
                            className="rounded-sm w-8 h-auto"
                            style={{ width: '30px', height: 'auto' }}
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
                        <div className="text-sm text-gray-900">
                          {rate.isLoading ? (
                            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                          ) : rate.error ? (
                            <span className="text-red-500 text-xs">Error</span>
                          ) : (
                            rate.buyRate.toFixed(4)
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {rate.isLoading ? (
                            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                          ) : rate.error ? (
                            <span className="text-red-500 text-xs">Error</span>
                          ) : (
                            rate.sellRate.toFixed(4)
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Loading state for entire table */}
          {isLoading && rates.length === 0 && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading live exchange rates...</p>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Rates are updated every 5 minutes automatically. Click "Refresh Rates" for immediate updates.</p>
            <p className="mt-1">For the most accurate rates, please contact us directly or visit one of our locations.</p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p>
              * Live rates are subject to change without notice. Rates shown include our standard spread.
              <br />
              ** Minimum transaction amounts may apply. Please visit our location for more details.
            </p>
          </div>
        </div>
      </section>
    </PageContainer>
  )
} 