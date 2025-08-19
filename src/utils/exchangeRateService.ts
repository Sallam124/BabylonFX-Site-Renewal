import axios from 'axios';

interface ExchangeRateResponse {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
  source: string;
}



// Module-level cache
let cachedRates: { [key: string]: number } | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in ms

export function getCachedRates(): { [key: string]: number } | null {
  return cachedRates;
}

export function isCacheValid(): boolean {
  if (!cachedRates || !cacheTimestamp) return false;
  return Date.now() - cacheTimestamp < CACHE_DURATION;
}

export async function fetchAndCacheRates(baseCurrency: string, targetCurrencies: string[]): Promise<{ [key: string]: number }> {
  // Always fetch fresh data and update cache
  const rates = await _fetchBulkRates(baseCurrency, targetCurrencies);
  cachedRates = rates;
  cacheTimestamp = Date.now();
  return rates;
}

async function _fetchBulkRates(baseCurrency: string, targetCurrencies: string[]): Promise<{[key: string]: number}> {
  // Normalize currency codes to uppercase
  baseCurrency = baseCurrency.toUpperCase();
  const normalizedTargets = targetCurrencies.map(c => c.toUpperCase());

  try {
    // Use our API route without cache busting for better performance
    const targetsParam = normalizedTargets.join(',');
    const url = `/api/exchange-rates?base=${baseCurrency}&targets=${targetsParam}`;

    const response = await axios.get<ExchangeRateResponse>(url, {
      timeout: 10000 // 10 second timeout for bulk request
    });

    if (!response.data?.rates) {
      throw new Error('No rates data received');
    }

    // Extract only the requested currencies
    const rates: {[key: string]: number} = {};
    normalizedTargets.forEach(currency => {
      if (response.data.rates[currency]) {
        rates[currency] = response.data.rates[currency];
      } else {
        // Skip currencies not found in API response
        console.warn(`Rate not found for ${currency}`);
      }
    });

    return rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw new Error('Failed to fetch exchange rates from API');
  }
}

// Updated getBulkExchangeRates to use cache
export async function getBulkExchangeRates(baseCurrency: string, targetCurrencies: string[]): Promise<{[key: string]: number}> {
  if (isCacheValid()) {
    return cachedRates!;
  }
  return await fetchAndCacheRates(baseCurrency, targetCurrencies);
}

/**
 * Fetches real-time exchange rate between two currencies using our API route
 * @param from - Source currency code (e.g., 'CAD')
 * @param to - Target currency code (e.g., 'USD')
 * @returns Promise<number> - The exchange rate
 */
export async function getExchangeRate(from: string, to: string): Promise<number> {
  // Normalize currency codes to uppercase
  from = from.toUpperCase();
  to = to.toUpperCase();

  // If currencies are the same, return 1
  if (from === to) return 1;

  try {
    // Use our API route without cache busting for better performance
    const url = `/api/exchange-rates?base=${from}&targets=${to}`;

    const response = await axios.get<ExchangeRateResponse>(url, {
      timeout: 5000 // 5 second timeout
    });

    if (!response.data?.rates?.[to]) {
      throw new Error(`Rate not found for ${to}`);
    }

    const rate = response.data.rates[to];
    return rate;
  } catch (error) {
    console.error(`Failed to fetch exchange rate for ${to}:`, error);
    throw new Error(`Failed to fetch exchange rate for ${to}`);
  }
}

/**
 * Helper function to validate currency codes
 * @param code - Currency code to validate
 * @returns boolean - Whether the currency code is valid
 */
export function isValidCurrencyCode(code: string): boolean {
  // Basic validation - 3 uppercase letters
  return /^[A-Z]{3}$/.test(code);
}

/**
 * Helper function to get all supported currencies
 * @returns string[] - Array of supported currency codes
 */
export function getSupportedCurrencies(): string[] {
  return [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'DKK', 'INR', 'MXN',
    'BRL', 'KRW', 'AED', 'RUB', 'SAR', 'JOD', 'KWD', 'IQD', 'BSD', 'BHD',
    'BOB', 'BGN', 'COP', 'CRC', 'DOP', 'EGP', 'ETB', 'GYD', 'HNL', 'HUF',
    'IDR', 'JMD', 'KES', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PEN', 'PHP',
    'PLN', 'QAR', 'SGD', 'ZAR', 'SEK', 'TWD', 'THB', 'TTD', 'TND', 'TRY',
    'VND', 'HKD'
  ];
}

export const currencyNames: { [key: string]: string } = {
  'USD': 'United States Dollar',
  'EUR': 'Euro',
  'GBP': 'British Pound',
  'JPY': 'Japanese Yen',
  'AUD': 'Australian Dollar',
  'CNY': 'Chinese Yuan',
  'DKK': 'Danish Krone',
  'CHF': 'Swiss Franc',
  'INR': 'Indian Rupee',
  'MXN': 'Mexican Peso',
  'BRL': 'Brazilian Real',
  'KRW': 'South Korean Won',
  'AED': 'UAE Dirham',
  'RUB': 'Russian Ruble',
  'SAR': 'Saudi Riyal',
  'JOD': 'Jordanian Dinar',
  'KWD': 'Kuwaiti Dinar',
  'IQD': 'Iraqi Dinar',
  'BSD': 'Bahamian Dollar',
  'BHD': 'Bahraini Dinar',
  'BOB': 'Bolivian Boliviano',
  'BGN': 'Bulgarian Lev',
  'COP': 'Colombian Peso',
  'CRC': 'Costa Rican Colón',
  'DOP': 'Dominican Peso',
  'EGP': 'Egyptian Pound',
  'ETB': 'Ethiopian Birr',
  'GYD': 'Guyanese Dollar',
  'HNL': 'Honduran Lempira',
  'HUF': 'Hungarian Forint',
  'IDR': 'Indonesian Rupiah',
  'JMD': 'Jamaican Dollar',
  'KES': 'Kenyan Shilling',
  'NPR': 'Nepalese Rupee',
  'NZD': 'New Zealand Dollar',
  'NOK': 'Norwegian Krone',
  'OMR': 'Omani Rial',
  'PKR': 'Pakistani Rupee',
  'PEN': 'Peruvian Sol',
  'PHP': 'Philippine Peso',
  'PLN': 'Polish Zloty',
  'QAR': 'Qatari Riyal',
  'SGD': 'Singapore Dollar',
  'ZAR': 'South African Rand',
  'SEK': 'Swedish Krona',
  'TWD': 'Taiwan Dollar',
  'THB': 'Thai Baht',
  'TTD': 'Trinidad & Tobago Dollar',
  'TND': 'Tunisian Dinar',
  'TRY': 'Turkish Lira',
  'VND': 'Vietnamese Dong',
  'HKD': 'Hong Kong Dollar',
  'CAD': 'Canadian Dollar',
}; 