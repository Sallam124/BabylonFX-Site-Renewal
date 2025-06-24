'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { formatTimeAgo } from '@/utils/timeUtils'
import { getExchangeRate } from '@/utils/exchangeRateService'

interface CurrencyOption {
  value: string
  label: string
  flag: string
}

// Using the exact CurrencySelect component from the version you like
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
              className="rounded-sm w-6 h-auto"
              style={{ width: '24px', height: 'auto' }}
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
                  className="rounded-sm w-5 h-auto"
                  style={{ width: '20px', height: 'auto' }}
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
  const [amount, setAmount] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState('CAD')
  const [toCurrency, setToCurrency] = useState('USD')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [isConverting, setIsConverting] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const step = 1 // Change this to 0.1 or 0.01 if needed

  // Top 10 most used currencies in Canada
  const currencies = [
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'BRL', name: 'Brazilian Real' },
  ]

  const handleIncrement = () => {
    setAmount(prev => {
      const prevNum = parseFloat(prev) || 0
      const newAmount = +(prevNum + step).toFixed(2)
      setTimeout(() => {
        handleConvert(newAmount)
      }, 0)
      return newAmount.toString()
    })
  }

  const handleDecrement = () => {
    setAmount(prev => {
      const prevNum = parseFloat(prev) || 0
      const newAmount = Math.max(0, +(prevNum - step).toFixed(2))
      setTimeout(() => {
        handleConvert(newAmount)
      }, 0)
      return newAmount.toString()
    })
  }

  const startHold = (action: () => void) => {
    action() // Run once immediately
    stopHold() // Prevent double intervals
    intervalRef.current = setInterval(action, 100) // Repeat every 100ms
  }

  const stopHold = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Extract conversion logic to a separate function
  const handleConvert = async (numericAmount?: number) => {
    const amountToConvert = numericAmount !== undefined ? numericAmount : parseFloat(amount)
    if (!amount || amountToConvert <= 0 || isNaN(amountToConvert)) {
      setConvertedAmount(null)
      setIsConverting(false)
      return
    }
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amountToConvert)
      setLastUpdated(new Date().toISOString())
      setIsConverting(false)
      return
    }

    setIsConverting(true)
    setError(null)
    
    try {
      const rate = await getExchangeRate(fromCurrency, toCurrency)
      setConvertedAmount(amountToConvert * rate)
      setLastUpdated(new Date().toISOString())
    } catch (err) {
      setError('Failed to fetch rate.')
      setConvertedAmount(null)
    } finally {
      setIsConverting(false)
    }
  }

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      handleConvert()
    }, 300)

    return () => clearTimeout(debounceHandler)

  }, [amount, fromCurrency, toCurrency])
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const getFlagPath = (currencyCode: string): string => {
    const flagMap: { [key: string]: string } = {
      CAD: 'cad.png', USD: 'usa.png', EUR: 'eu.png', GBP: 'gb.png', 
      INR: 'in.png', CNY: 'cn.png', JPY: 'jp.png', AUD: 'au.png', 
      MXN: 'mx.png', BRL: 'br.png'
    }
    return `/images/flags/${flagMap[currencyCode.toUpperCase()] || 'default.png'}`
  }
  
  const currencyOptions = currencies.map(currency => ({
    value: currency.code,
    label: currency.name,
    flag: getFlagPath(currency.code)
  }))

  // Removed auto-refresh interval to prevent unwanted API calls
  // Users can manually refresh when needed
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && !isConverting) {
  //       handleConvert(parseFloat(amount))
  //     }
  //   }, 30000) // Refresh every 30 seconds
  //   return () => clearInterval(interval)
  // }, [amount, fromCurrency, toCurrency, isConverting])

  // Refresh handler - improved version
  const handleRefresh = async () => {
    console.log('Refresh button clicked - starting refresh...')
    
    // Reset to default values
    setAmount('100')
    setFromCurrency('CAD')
    setToCurrency('USD')
    setConvertedAmount(null)
    setError(null)
    setLastUpdated(null)
    setIsConverting(true)
    
    // Force a fresh conversion
    try {
      console.log('Fetching fresh rate for CAD to USD...')
      const rate = await getExchangeRate('CAD', 'USD')
      console.log('New rate received:', rate)
      const newAmount = 100 * rate
      setConvertedAmount(newAmount)
      setLastUpdated(new Date().toISOString())
      console.log('Refresh completed successfully')
    } catch (err) {
      console.error('Refresh failed:', err)
      setError('Failed to fetch rate.')
      setConvertedAmount(null)
    } finally {
      setIsConverting(false)
    }
  }

  useEffect(() => {
    if (isConverting && convertedAmount !== null) {
      setIsConverting(false);
    }
  }, [isConverting, convertedAmount]);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Currency Converter</h2>
        <button
          onClick={handleRefresh}
          disabled={isConverting}
          className={`ml-4 p-2 rounded-lg transition-all duration-200 ${
            isConverting 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
          }`}
          title="Refresh Converter"
          aria-label="Refresh Converter"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className={`w-6 h-6 ${isConverting ? 'animate-spin' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.003 7.003 0 0112 5c1.657 0 3.156.576 4.358 1.535M18.418 15A7.003 7.003 0 0112 19a6.978 6.978 0 01-4.358-1.535" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full rounded-md border-2 border-gray-200 pl-3 pr-16 focus:border-primary focus:ring-primary text-2xl py-4 hover:border-gray-300 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              title="Enter amount to convert"
            />
            
            {/* Currency Label - Right Side */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-16">
              <span className="text-gray-500 text-lg">{fromCurrency}</span>
            </div>
            
            {/* Increment/Decrement Arrows - Right Side */}
            <div className="absolute inset-y-0 right-0 flex flex-col">
              <button
                type="button"
                title="Increase amount"
                onMouseDown={() => startHold(handleIncrement)}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={() => startHold(handleIncrement)}
                onTouchEnd={stopHold}
                className="flex-1 flex items-center justify-center px-2 hover:bg-gray-100 transition-colors rounded-tr-md"
              >
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <div className="w-px bg-gray-300"></div>
              <button
                type="button"
                title="Decrease amount"
                onMouseDown={() => startHold(handleDecrement)}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={() => startHold(handleDecrement)}
                onTouchEnd={stopHold}
                className="flex-1 flex items-center justify-center px-2 hover:bg-gray-100 transition-colors rounded-br-md"
              >
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

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
          
          <button
            onClick={handleSwapCurrencies}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Swap Currencies</span>
          </button>
        </div>
      </div>

      {/* Conversion Result */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Converted Amount</p>
            <p className="text-3xl font-bold text-gray-900">
              {convertedAmount !== null && amount && !isNaN(parseFloat(amount)) ? convertedAmount.toFixed(2) : '---'}
            </p>
            <p className="text-sm text-gray-500">{toCurrency}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Exchange Rate</p>
            <p className="text-lg font-semibold text-gray-900">
              {fromCurrency === toCurrency ? '1.00' : 
               convertedAmount !== null && amount && !isNaN(parseFloat(amount)) && parseFloat(amount) !== 0 ? (convertedAmount / parseFloat(amount)).toFixed(4) : '---'}
            </p>
            <p className="text-xs text-gray-500">
              {isConverting ? 'Converting...' : 'Live Rate'}
            </p>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-gray-500">
              Last updated: {formatTimeAgo(lastUpdated)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrencyConverter
