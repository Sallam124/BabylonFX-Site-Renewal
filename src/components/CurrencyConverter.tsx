'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useExchangeRates } from '@/context/ExchangeRateContext'
import Image from 'next/image'

interface ExchangeRate {
  currency: string
  rate: number
  lastUpdated: string
}

interface CurrencyOption {
  value: string
  label: string
  flag: string
}

const CurrencySelect = ({ 
  value, 
  onChange, 
  options, 
  label 
}: { 
  value: string
  onChange: (value: string) => void
  options: CurrencyOption[]
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="block w-full rounded-md border-2 border-gray-200 pl-12 pr-10 py-3 focus:border-primary focus:ring-primary text-base cursor-pointer hover:border-gray-300 transition-colors appearance-none text-left"
        >
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image
              src={selectedOption?.flag || ''}
              alt={`${value} flag`}
              width={24}
              height={18}
              className="rounded-sm"
            />
          </div>
          <span className="text-base">{value}</span>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border-2 border-gray-200 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
              >
                <Image
                  src={option.flag}
                  alt={`${option.value} flag`}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span className="text-sm">{option.value}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const CurrencyConverter = () => {
  const { rates, isLoading, error, supportedCurrencies } = useExchangeRates()
  const [amount, setAmount] = useState<string>('1')
  const [fromCurrency, setFromCurrency] = useState<string>('CAD')
  const [toCurrency, setToCurrency] = useState<string>('USD')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([])
  const [currentTime, setCurrentTime] = useState<string>('')

  const currencies = [
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
  ]

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
          { currency: 'USD', rate: 0.74, lastUpdated: new Date().toISOString() },
          { currency: 'EUR', rate: 0.68, lastUpdated: new Date().toISOString() },
          { currency: 'GBP', rate: 0.58, lastUpdated: new Date().toISOString() },
          { currency: 'JPY', rate: 110.5, lastUpdated: new Date().toISOString() },
          { currency: 'AUD', rate: 1.12, lastUpdated: new Date().toISOString() },
        ]
        setExchangeRates(mockRates)
      } catch (error) {
        console.error('Error fetching exchange rates:', error)
      }
    }

    fetchRates()
  }, [])

  useEffect(() => {
    if (isLoading || !rates || !amount) {
      setConvertedAmount(null)
      return
    }

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount)) {
      setConvertedAmount(null)
      return
    }

    let result: number

    if (fromCurrency === 'CAD') {
      // Converting from CAD to another currency
      result = numericAmount * rates[toCurrency]
    } else if (toCurrency === 'CAD') {
      // Converting to CAD from another currency
      result = numericAmount / rates[fromCurrency]
    } else {
      // Converting between two non-CAD currencies
      // First convert to CAD, then to target currency
      const cadAmount = numericAmount / rates[fromCurrency]
      result = cadAmount * rates[toCurrency]
    }

    setConvertedAmount(result)
  }, [amount, fromCurrency, toCurrency, rates, isLoading])

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const currencyOptions = supportedCurrencies.map(currency => ({
    value: currency,
    label: currency,
    flag: getFlagPath(currency)
  }))

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Currency */}
        <div className="space-y-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full rounded-md border-2 border-gray-200 pl-3 pr-12 focus:border-primary focus:ring-primary text-2xl py-4 hover:border-gray-300 transition-colors"
              placeholder="0"
              min="0"
              step="1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 text-lg">{fromCurrency}</span>
            </div>
          </div>
        </div>

        {/* Currency Selection Section */}
        <div className="space-y-6 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <CurrencySelect
              value={fromCurrency}
              onChange={setFromCurrency}
              options={currencyOptions}
              label="From"
            />
            <CurrencySelect
              value={toCurrency}
              onChange={setToCurrency}
              options={currencyOptions}
              label="To"
            />
          </div>
        </div>
      </div>

      {/* Swap Button - Moved outside the grid */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleSwapCurrencies}
          className="inline-flex items-center px-4 py-2 border-2 border-gray-200 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2">Swap Currencies</span>
        </button>
      </div>

      {/* Result */}
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-500">Loading rates...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : convertedAmount !== null ? (
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <p className="text-sm text-gray-500">Converted Amount</p>
            <p className="text-2xl font-bold text-gray-900">
              {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Enter an amount to convert</p>
        )}
      </div>

      {/* Last updated text */}
      <div className="mt-2 text-sm text-gray-500">
        {exchangeRates.length > 0 && (
          (() => {
            // Find the most recent lastUpdated timestamp
            const lastUpdated = exchangeRates.reduce((latest, rate) =>
              new Date(rate.lastUpdated) > new Date(latest) ? rate.lastUpdated : latest,
              exchangeRates[0].lastUpdated
            )
            // Calculate time difference
            const diffMs = Date.now() - new Date(lastUpdated).getTime()
            const diffSec = Math.floor(diffMs / 1000)
            const diffMin = Math.floor(diffSec / 60)
            const diffHr = Math.floor(diffMin / 60)
            const diffDay = Math.floor(diffHr / 24)
            let timeAgo = ''
            if (diffDay > 0) timeAgo = `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
            else if (diffHr > 0) timeAgo = `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`
            else if (diffMin > 0) timeAgo = `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
            else timeAgo = 'just now'
            return <span>This was updated {timeAgo}</span>
          })()
        )}
      </div>
    </div>
  )
}

export default CurrencyConverter 