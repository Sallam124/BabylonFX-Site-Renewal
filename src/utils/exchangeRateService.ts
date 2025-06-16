import axios from 'axios';
import * as cheerio from 'cheerio';

interface TwelveDataResponse {
  rate: number;
  status: string;
}

interface CurrencyFreaksResponse {
  rates: {
    [key: string]: number;
  };
  status: string;
}

interface ExchangeRateResponse {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}

interface ECBResponse {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}

/**
 * Fetches real-time exchange rate between two currencies using a 3-step fallback system
 * @param from - Source currency code (e.g., 'CAD')
 * @param to - Target currency code (e.g., 'USD')
 * @returns Promise<number> - The exchange rate
 */
export async function getExchangeRate(from: string, to: string): Promise<number> {
  // Normalize currency codes to uppercase
  from = from.toUpperCase();
  to = to.toUpperCase();

  console.log('Starting exchange rate fetch for:', { from, to });

  // If currencies are the same, return 1
  if (from === to) return 1;

  // Step 1: Try ExchangeRate-API
  try {
    console.log(`Attempting to fetch from ExchangeRate-API: ${from}/${to}`);
    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
    console.log('ExchangeRate-API URL:', url);

    const response = await axios.get<ExchangeRateResponse>(
      url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the complete response structure
    console.log('ExchangeRate-API complete response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      dataKeys: response.data ? Object.keys(response.data) : [],
      rates: response.data?.rates ? Object.keys(response.data.rates) : []
    });

    if (!response.data) {
      throw new Error('Empty response from ExchangeRate-API');
    }

    if (!response.data.rates) {
      throw new Error('No rates in response');
    }

    // Log available rates
    console.log('Available rates:', response.data.rates);
    console.log('Requested rate for:', to, 'Value:', response.data.rates[to]);

    const rate = response.data.rates[to];
    if (typeof rate !== 'number') {
      throw new Error(`Invalid rate for ${to}: ${rate}`);
    }

    console.log(`Exchange rate fetched from ExchangeRate-API: ${from}/${to} = ${rate}`);
    return rate;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('ExchangeRate-API failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        responseData: error.response?.data ? JSON.stringify(error.response.data) : 'No data'
      });
    } else {
      console.error('ExchangeRate-API failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Step 2: Try ECB API as fallback
  try {
    console.log(`Attempting to fetch from ECB API: ${from}/${to}`);
    const url = 'https://api.exchangerate.host/latest';
    console.log('ECB API URL:', url);

    const response = await axios.get<ECBResponse>(
      url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('ECB API response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });

    if (!response.data || !response.data.rates) {
      throw new Error('Invalid response from ECB API');
    }

    // If base currency is not EUR, we need to convert
    if (from !== 'EUR') {
      const eurToFrom = response.data.rates[from];
      const eurToTo = response.data.rates[to];
      
      if (!eurToFrom || !eurToTo) {
        throw new Error(`Missing rates for conversion: ${from} or ${to}`);
      }

      // Convert from source currency to EUR, then to target currency
      const rate = eurToTo / eurToFrom;
      console.log(`Exchange rate calculated from ECB API: ${from}/${to} = ${rate}`);
      return rate;
    } else {
      // If base currency is EUR, we can use the rate directly
      const rate = response.data.rates[to];
      if (typeof rate !== 'number') {
        throw new Error(`Invalid rate for ${to}: ${rate}`);
      }
      console.log(`Exchange rate fetched from ECB API: ${from}/${to} = ${rate}`);
      return rate;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('ECB API failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url
      });
    } else {
      console.error('ECB API failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Step 3: Try CurrencyFreaks API as last resort
  try {
    const currencyFreaksKey = process.env.NEXT_PUBLIC_CURRENCYFREAKS_API_KEY;
    if (!currencyFreaksKey) {
      console.error('CurrencyFreaks API key is missing');
      throw new Error('CurrencyFreaks API key not configured');
    }

    console.log(`Attempting to fetch from CurrencyFreaks API: ${from}/${to}`);
    console.log('CurrencyFreaks API Key:', currencyFreaksKey.substring(0, 4) + '...');
    
    const url = `https://api.currencyfreaks.com/v2.0/rates/latest?base=${from}&symbols=${to}&apikey=${currencyFreaksKey}`;
    console.log('CurrencyFreaks Request URL:', url);
    
    try {
      const response = await axios.get<CurrencyFreaksResponse>(
        url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('CurrencyFreaks API full response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      if (response.data.status === 'success' && response.data.rates[to]) {
        console.log(`Exchange rate fetched from CurrencyFreaks API: ${from}/${to}`);
        return response.data.rates[to];
      } else {
        console.error('CurrencyFreaks API returned invalid response:', response.data);
        throw new Error(`Invalid response from CurrencyFreaks API: ${JSON.stringify(response.data)}`);
      }
    } catch (axiosError) {
      if (axios.isAxiosError(axiosError)) {
        console.error('CurrencyFreaks API request failed:', {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          message: axiosError.message,
          config: {
            url: axiosError.config?.url,
            method: axiosError.config?.method,
            headers: axiosError.config?.headers
          }
        });
      }
      throw axiosError;
    }
  } catch (error) {
    console.error('CurrencyFreaks API failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  // If all methods fail, throw an error
  throw new Error(`Failed to fetch exchange rate for ${from}/${to} from all sources`);
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
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN',
    'BRL', 'KRW', 'AED', 'RUB', 'SAR', 'JOD', 'KWD', 'IQD', 'BSD', 'BHD',
    'BOB', 'BGN', 'COP', 'CRC', 'DOP', 'EGP', 'ETB', 'GYD', 'HNL', 'HUF',
    'IDR', 'JMD', 'KES', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PEN', 'PHP',
    'PLN', 'QAR', 'SGD', 'ZAR', 'SEK', 'TWD', 'THB', 'TTD', 'TND', 'TRY',
    'VND', 'HKD'
  ];
} 