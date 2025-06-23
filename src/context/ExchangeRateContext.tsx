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
  // Mock rates as fallback for immediate functionality
  const mockRates: { [key: string]: number } = {
    'USD': 0.74, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 110.5, 'AUD': 1.12,
    'CNY': 5.35, 'DKK': 5.08, 'CHF': 0.65, 'INR': 61.8, 'MXN': 12.45,
    'BRL': 3.67, 'KRW': 990.2, 'AED': 2.72, 'RUB': 67.8, 'SAR': 2.78,
    'JOD': 0.52, 'KWD': 0.23, 'IQD': 1080.5, 'BSD': 0.74, 'BHD': 0.28,
    'BOB': 5.12, 'BGN': 1.33, 'COP': 2900.8, 'CRC': 380.5, 'DOP': 43.2,
    'EGP': 22.8, 'ETB': 42.1, 'GYD': 154.7, 'HNL': 18.3, 'HUF': 260.4,
    'IDR': 11500.2, 'JMD': 114.8, 'KES': 118.9, 'NPR': 98.4, 'NZD': 1.21,
    'NOK': 7.85, 'OMR': 0.28, 'PKR': 205.6, 'PEN': 2.78, 'PHP': 41.2,
    'PLN': 2.98, 'QAR': 2.70, 'SGD': 1.00, 'ZAR': 13.8, 'SEK': 7.65,
    'TWD': 23.4, 'THB': 26.8, 'TTD': 5.02, 'TND': 2.31, 'TRY': 20.1,
    'VND': 18250.3, 'HKD': 5.78
  };

  const [rates, setRates] = useState<{ [key: string]: number } | null>(null); // Start with no rates
  const [isLoading, setIsLoading] = useState(true); // Start as loading
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString()); // Set initial timestamp

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

      // Set a timeout for the entire fetch operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 15000); // 15 second timeout
      });

      const fetchPromise = (async () => {
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
        return newRates;
      })();

      const result = await Promise.race([fetchPromise, timeoutPromise]) as { [key: string]: number };
      
      setRates(result);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch exchange rates');
      
      // Keep using mock rates as fallback
      setRates(mockRates);
      setLastUpdated(new Date().toISOString());
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRates = async () => {
    await fetchRates();
  };

  useEffect(() => {
    fetchRates(); // Fetch immediately on mount
    const interval = setInterval(fetchRates, 60000); // Update rates every minute
    return () => {
      clearInterval(interval);
    };
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