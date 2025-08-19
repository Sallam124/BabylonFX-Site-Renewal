'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { formatTimeAgo } from '@/utils/timeUtils'
import { getExchangeRate } from '@/utils/exchangeRateService'
import { useExchangeRates } from '@/context/ExchangeRateContext'
import Decimal from 'decimal.js'

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
          <span className="text-base font-times">{value}</span>
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
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{option.value}</span>
                  <span className="text-xs text-gray-500 font-times">{option.label}</span>
                </div>
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
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('CAD')
  const [convertedAmount, setConvertedAmount] = useState<Decimal | null>(null)
  const [isConverting, setIsConverting] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const step = new Decimal(1) // Use Decimal for step increments

  // Extended list of currencies
  const currencies = [
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'JOD', name: 'Jordanian Dinar' },
    { code: 'KWD', name: 'Kuwaiti Dinar' },
    { code: 'IQD', name: 'Iraqi Dinar' },
    { code: 'BSD', name: 'Bahamian Dollar' },
    { code: 'BHD', name: 'Bahraini Dinar' },
    { code: 'BOB', name: 'Bolivian Boliviano' },
    { code: 'BGN', name: 'Bulgarian Lev' },
    { code: 'COP', name: 'Colombian Peso' },
    { code: 'CRC', name: 'Costa Rican Colón' },
    { code: 'DOP', name: 'Dominican Peso' },
    { code: 'EGP', name: 'Egyptian Pound' },
    { code: 'ETB', name: 'Ethiopian Birr' },
    { code: 'GYD', name: 'Guyanese Dollar' },
    { code: 'HNL', name: 'Honduran Lempira' },
    { code: 'HUF', name: 'Hungarian Forint' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'JMD', name: 'Jamaican Dollar' },
    { code: 'KES', name: 'Kenyan Shilling' },
    { code: 'NPR', name: 'Nepalese Rupee' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'NOK', name: 'Norwegian Krone' },
    { code: 'OMR', name: 'Omani Rial' },
    { code: 'PKR', name: 'Pakistani Rupee' },
    { code: 'PEN', name: 'Peruvian Sol' },
    { code: 'PHP', name: 'Philippine Peso' },
    { code: 'PLN', name: 'Polish Zloty' },
    { code: 'QAR', name: 'Qatari Riyal' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'ZAR', name: 'South African Rand' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'TWD', name: 'Taiwan Dollar' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'TTD', name: 'Trinidad & Tobago Dollar' },
    { code: 'TND', name: 'Tunisian Dinar' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'VND', name: 'Vietnamese Dong' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
  ]

  const handleIncrement = () => {
    setAmount(prev => {
      const prevNum = new Decimal(prev || 0)
      const newAmount = prevNum.plus(step)
      setTimeout(() => {
        handleConvert(newAmount)
      }, 0)
      return newAmount.toString()
    })
  }

  const handleDecrement = () => {
    setAmount(prev => {
      const prevNum = new Decimal(prev || 0)
      const newAmount = Decimal.max(prevNum.minus(step), 0)
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

  // Add context usage
  const { rates, isLoading: ratesLoading, error: ratesError, refreshRates, lastUpdated: contextLastUpdated } = useExchangeRates();

  // Ensure rates are fetched if not loaded
  useEffect(() => {
    if (!rates && !ratesLoading && refreshRates) {
      refreshRates();
    }
  }, [rates, ratesLoading, refreshRates]);

  // Extract conversion logic to a separate function with Decimal precision
  const handleConvert = async (numericAmount?: Decimal) => {
    const amountToConvert = numericAmount !== undefined ? numericAmount : new Decimal(amount || 0);
    
    // Handle zero or negative amounts immediately
    if (amountToConvert.isZero() || amountToConvert.isNegative()) {
      setConvertedAmount(null);
      setIsConverting(false);
      setError(null);
      return;
    }
    
    // Handle same currency conversion
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amountToConvert);
      setLastUpdated(new Date().toISOString());
      setIsConverting(false);
      setError(null);
      return;
    }
    
    setError(null);
    
    // Use cached CAD-based rates for any pair with Decimal precision
    if (rates) {
      const cadToFrom = fromCurrency === 'CAD' ? new Decimal(1) : new Decimal(rates[fromCurrency] || 0);
      const cadToTo = toCurrency === 'CAD' ? new Decimal(1) : new Decimal(rates[toCurrency] || 0);
      
      if (cadToFrom.isZero() || cadToTo.isZero()) {
        setError('Exchange rate not available');
        setConvertedAmount(null);
        setIsConverting(false);
        return;
      }
      
      let rate: Decimal;
      if (fromCurrency === 'CAD') {
        rate = cadToTo;
      } else if (toCurrency === 'CAD') {
        rate = new Decimal(1).dividedBy(cadToFrom);
      } else {
        rate = cadToTo.dividedBy(cadToFrom);
      }
      
      setConvertedAmount(amountToConvert.times(rate));
      setLastUpdated(contextLastUpdated);
      setIsConverting(false);
      return;
    }
    
    // Fallback: fetch directly if not in cache
    try {
      const rate = await getExchangeRate(fromCurrency, toCurrency);
      setConvertedAmount(amountToConvert.times(new Decimal(rate)));
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError('Failed to fetch rate.');
      setConvertedAmount(null);
    } finally {
      setIsConverting(false);
    }
  };

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      // Check if amount is zero, empty, or invalid before converting to Decimal
      const trimmedAmount = amount?.trim();
      if (!trimmedAmount || trimmedAmount === '0' || trimmedAmount === '00' || parseFloat(trimmedAmount) === 0) {
        // Clear conversion result and stop loading for zero amounts
        setConvertedAmount(null);
        setIsConverting(false);
        setError(null);
        return;
      }
      
      const currentAmount = new Decimal(trimmedAmount);
      // Only convert if amount is valid (not zero or negative)
      if (!currentAmount.isZero() && !currentAmount.isNegative()) {
        // Set loading state immediately and clear previous result
        setIsConverting(true);
        setConvertedAmount(null);
        setError(null);
        handleConvert();
      } else {
        // Clear conversion result and stop loading for invalid amounts
        setConvertedAmount(null);
        setIsConverting(false);
        setError(null);
      }
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
      MXN: 'mx.png', BRL: 'br.png', KRW: 'kr.png', AED: 'ae.png',
      RUB: 'ru.png', SAR: 'sa.png', JOD: 'jo.png', KWD: 'kw.png',
      IQD: 'iq.png', BSD: 'bs.png', BHD: 'bh.png', BOB: 'bo.png',
      BGN: 'bg.png', COP: 'co.png', CRC: 'cr.png', DOP: 'do.png',
      EGP: 'eg.png', ETB: 'et.png', GYD: 'gy.png', HNL: 'hn.png',
      HUF: 'hu.png', IDR: 'id.png', JMD: 'jm.png', KES: 'ke.png',
      NPR: 'np.png', NZD: 'nz.png', NOK: 'no.png', OMR: 'om.png',
      PKR: 'pk.png', PEN: 'pe.png', PHP: 'ph.png', PLN: 'pl.png',
      QAR: 'qa.png', SGD: 'sg.png', ZAR: 'za.png', SEK: 'se.png',
      TWD: 'tw.png', THB: 'th.png', TTD: 'tt.png', TND: 'tn.png',
      TRY: 'tr.png', VND: 'vn.png', HKD: 'hk.png', CHF: 'ch.png'
    }
    return `/images/flags/${flagMap[currencyCode.toUpperCase()] || 'default.png'}`
  }
  
  const currencyOptions = currencies.map(currency => ({
    value: currency.code,
    label: currency.name,
    flag: getFlagPath(currency.code)
  }))

  // Refresh handler - improved version
  const handleRefresh = async () => {
    if (refreshRates) {
      setIsConverting(true);
      setError(null);
      try {
        await refreshRates();
        // Re-run conversion after refresh if amount is valid
        const currentAmount = new Decimal(amount || 0);
        if (!currentAmount.isZero() && !currentAmount.isNegative()) {
          handleConvert();
        }
      } catch (error) {
        setError('Failed to refresh rates');
      } finally {
        setIsConverting(false);
      }
    }
  };

  // Remove this useEffect as it's interfering with the loading state
  // The loading state should only be managed by handleConvert and the main useEffect

  // Helper to get the current exchange rate for the selected pair with Decimal precision
  const getCurrentRate = (): Decimal | null => {
    if (fromCurrency === toCurrency) return new Decimal(1);
    if (rates) {
      const cadToFrom = fromCurrency === 'CAD' ? new Decimal(1) : new Decimal(rates[fromCurrency] || 0);
      const cadToTo = toCurrency === 'CAD' ? new Decimal(1) : new Decimal(rates[toCurrency] || 0);
      
      if (cadToFrom.isZero() || cadToTo.isZero()) return null;
      
      if (fromCurrency === 'CAD') return cadToTo;
      if (toCurrency === 'CAD') return new Decimal(1).dividedBy(cadToFrom);
      return cadToTo.dividedBy(cadToFrom);
    }
    return null;
  };

  if (ratesLoading || !rates) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 text-lg font-semibold">Loading live exchange rates...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 !pointer-events-auto !opacity-100 !z-[10] relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-gray-900 font-times font-normal">Currency Converter</h2>
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
              onChange={(e) => {
                const value = e.target.value;
                // Prevent minus sign and negative numbers completely
                if (value === '' || (!value.includes('-') && parseFloat(value) >= 0)) {
                  setAmount(value);
                }
              }}
              onKeyDown={(e) => {
                // Prevent minus sign from being typed
                if (e.key === '-') {
                  e.preventDefault();
                }
              }}
              min="0"
              step="0.01"
              className="block w-full rounded-md border-2 border-gray-200 pl-3 pr-16 focus:border-primary focus:ring-primary text-2xl py-4 hover:border-gray-300 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              title="Enter amount to convert"
            />
            
            {/* Currency Label - Right Side */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-16">
              <span className="text-gray-500 text-lg font-times">{fromCurrency}</span>
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
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span >Swap Currencies</span>
          </button>
        </div>
      </div>

      {/* Conversion Result */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center min-h-[80px]">
          {(() => {
            const trimmedAmount = amount?.trim();
            const isZeroAmount = !trimmedAmount || trimmedAmount === '0' || trimmedAmount === '00' || parseFloat(trimmedAmount) === 0;
            
            if (isConverting && !isZeroAmount) {
              return (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                  <p className="text-gray-600 text-base font-medium">Converting...</p>
                </div>
              );
            }
            
            return (
              <>
                <div>
                  <p className="text-sm text-gray-600">Converted Amount</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isZeroAmount ? '0.00' : (convertedAmount !== null && amount && !new Decimal(amount).isNaN() ? convertedAmount.toFixed(2) : '---')}
                  </p>
                  <p className="text-sm text-gray-500 font-times">{toCurrency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-sans">Exchange Rate</p>
                  <p className="text-lg font-semibold text-gray-900 font-times">
                    {(() => {
                      const rate = getCurrentRate();
                      return rate !== null ? rate.toFixed(4) : '---';
                    })()}
                  </p>
                  <p className="text-xs text-gray-500 font-sans">Live Rate</p>
                </div>
              </>
            );
          })()}
        </div>
        
        {lastUpdated && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-gray-500 font-sans">
              Last updated: {formatTimeAgo(lastUpdated)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrencyConverter
