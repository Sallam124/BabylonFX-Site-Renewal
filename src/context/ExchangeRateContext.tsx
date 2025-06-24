'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getBulkExchangeRates, getCachedRates, isCacheValid, fetchAndCacheRates, getSupportedCurrencies } from '@/utils/exchangeRateService';

interface ExchangeRateContextType {
  rates: { [key: string]: number } | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string;
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
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to load rates from cache or fetch if needed
  const loadRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const baseCurrency = 'CAD';
      const supportedCurrencies = getSupportedCurrencies().filter(c => c !== baseCurrency);
      let newRates: { [key: string]: number };
      if (isCacheValid()) {
        newRates = getCachedRates()!;
      } else {
        newRates = await fetchAndCacheRates(baseCurrency, supportedCurrencies);
      }
      setRates(newRates);
      setLastUpdated(Date.now());
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch exchange rates');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Manual refresh handler (always fetch and cache)
  const refreshRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const baseCurrency = 'CAD';
      const supportedCurrencies = getSupportedCurrencies().filter(c => c !== baseCurrency);
      const newRates = await fetchAndCacheRates(baseCurrency, supportedCurrencies);
      setRates(newRates);
      setLastUpdated(Date.now());
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch exchange rates');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // On mount, load from cache or fetch
  useEffect(() => {
    loadRates();
    // Set up 5 min auto-refresh
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      refreshRates();
    }, 5 * 60 * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loadRates, refreshRates]);

  const value = useMemo(() => ({
    rates,
    isLoading,
    error,
    lastUpdated: new Date(lastUpdated).toISOString(),
    refreshRates
  }), [rates, isLoading, error, lastUpdated, refreshRates]);

  return (
    <ExchangeRateContext.Provider value={value}>
      {children}
    </ExchangeRateContext.Provider>
  );
}; 