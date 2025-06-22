'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import TimeAgo from './TimeAgo'
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
  const [amount, setAmount] = useState(100)
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
    setAmount(prev => +(prev + step).toFixed(2))
  }

  const handleDecrement = () => {
    setAmount(prev => Math.max(0, +(prev - step).toFixed(2)))
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

  useEffect(() => {
    const handleConvert = async () => {
      const numericAmount = amount
      if (!numericAmount || numericAmount <= 0) {
        setConvertedAmount(null)
        setIsConverting(false)
        return
      }
      if (fromCurrency === toCurrency) {
        setConvertedAmount(numericAmount)
        setLastUpdated(new Date().toISOString())
        setIsConverting(false)
        return
      }

      setIsConverting(true)
      setError(null)
      
      try {
        const rate = await getExchangeRate(fromCurrency, toCurrency)
        setConvertedAmount(numericAmount * rate)
        setLastUpdated(new Date().toISOString())
      } catch (err) {
        setError('Failed to fetch rate.')
        setConvertedAmount(null)
      } finally {
        setIsConverting(false)
      }
    }
    
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h2>
      
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
              onChange={(e) => setAmount(+e.target.value)}
              className="block w-full rounded-md border-2 border-gray-200 pl-3 pr-16 focus:border-primary focus:ring-primary text-2xl py-4 hover:border-gray-300 transition-colors"
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
        </div>
      </div>

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

      <div className="mt-6 min-h-[96px]">
        {isConverting ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 rounded-lg p-4 border-2 border-red-200">
            <p className="text-sm font-medium">{error}</p>
          </div>
        ) : convertedAmount !== null ? (
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <p className="text-sm text-gray-500">Converted Amount</p>
            <p className="text-2xl font-bold text-gray-900">
            {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 h-full flex items-center justify-center">
            <p className="text-gray-500">Enter an amount to convert</p>
          </div>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-500 h-5 text-center">
        {!isConverting && !error && lastUpdated && (
          <span>
            This was updated <TimeAgo timestamp={lastUpdated} />
          </span>
        )}
      </div>
    </div>
  )
}

export default CurrencyConverter
