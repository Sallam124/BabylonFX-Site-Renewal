import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface ExchangeRateResponse {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}

// Mock exchange rates as fallback when APIs fail
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const baseCurrency = searchParams.get('base') || 'CAD';
    const targetCurrencies = searchParams.get('targets')?.split(',') || [];

    // Normalize currency codes to uppercase
    const normalizedBase = baseCurrency.toUpperCase();
    const normalizedTargets = targetCurrencies.map(c => c.toUpperCase());

    // If no target currencies specified, return all mock rates
    if (normalizedTargets.length === 0) {
      return new NextResponse(JSON.stringify({
        base: normalizedBase,
        rates: mockRates,
        date: new Date().toISOString(),
        source: 'mock'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=600, stale-while-revalidate=1200'
        }
      });
    }

    try {
      // Use ExchangeRate-API without cache busting for better performance
      const url = `https://api.exchangerate-api.com/v4/latest/${normalizedBase}`;

      const response = await axios.get<ExchangeRateResponse>(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
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
          // Fallback to mock rate if not found
          rates[currency] = mockRates[currency] || 1;
        }
      });

      return new NextResponse(JSON.stringify({
        base: normalizedBase,
        rates,
        date: response.data.date,
        source: 'api'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=600, stale-while-revalidate=1200'
        }
      });
    } catch (error) {
      // Return mock rates as fallback
      const rates: {[key: string]: number} = {};
      normalizedTargets.forEach(currency => {
        rates[currency] = mockRates[currency] || 1;
      });

      return new NextResponse(JSON.stringify({
        base: normalizedBase,
        rates,
        date: new Date().toISOString(),
        source: 'mock'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=300, stale-while-revalidate=600'
        }
      });
    }
  } catch (error) {
    console.error('Exchange rate API error:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch exchange rates' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
} 