'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getExchangeRate } from '@/utils/exchangeRateService';

interface ExchangeRateContextType {
  rates: { [key: string]: number } | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string;
  supportedCurrencies: string[];
  refreshRates: () => Promise<void>;
}

const ExchangeRateContext = createContext<ExchangeRateContextType | undefined>(undefined);

export const useExchangeRates = () => {
  const context = useContext(ExchangeRateContext);
  if (context === undefined) {
    throw new Error('useExchangeRates must be used within an ExchangeRateProvider');
  }
  return context;
};

export const ExchangeRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Define supported currencies
  const supportedCurrencies = [
    'CAD', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CNY', 'DKK', 'CHF', 'INR',
    'MXN', 'BRL', 'KRW', 'AED', 'RUB', 'SAR', 'JOD', 'KWD', 'IQD', 'BSD',
    'BHD', 'BOB', 'BGN', 'COP', 'CRC', 'DOP', 'EGP', 'ETB', 'GYD', 'HNL',
    'HUF', 'IDR', 'JMD', 'KES', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PEN',
    'PHP', 'PLN', 'QAR', 'SGD', 'ZAR', 'SEK', 'TWD', 'THB', 'TTD', 'TND',
    'TRY', 'VND', 'HKD'
  ];

  const fetchRates = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const baseCurrency = 'CAD';
      const newRates: { [key: string]: number } = {};

      // Fetch rates for all supported currencies
      for (const currency of supportedCurrencies) {
        if (currency === baseCurrency) continue;

        try {
          const rate = await getExchangeRate(baseCurrency, currency);
          newRates[currency] = rate;
        } catch (error) {
          console.error(`Failed to fetch rate for ${currency}:`, error);
          // Continue with other currencies even if one fails
        }
      }

      setRates(newRates);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch exchange rates');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRates = async () => {
    await fetchRates();
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update rates every minute
    return () => clearInterval(interval);
  }, []);

  const value = {
    rates,
    isLoading,
    error,
    lastUpdated,
    supportedCurrencies,
    refreshRates
  };

  return (
    <ExchangeRateContext.Provider value={value}>
      {children}
    </ExchangeRateContext.Provider>
  );
}; 