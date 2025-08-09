import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';

// Input validation schema
const ExchangeRateQuerySchema = z.object({
  base: z.string().length(3).toUpperCase().default('CAD'),
  targets: z.string().optional().transform(val => 
    val ? val.split(',').map(c => c.trim().toUpperCase()) : []
  )
});

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
    
    // Validate input parameters
    const validationResult = ExchangeRateQuerySchema.safeParse({
      base: searchParams.get('base'),
      targets: searchParams.get('targets')
    });

    if (!validationResult.success) {
      return new NextResponse(JSON.stringify({ 
        error: 'Invalid input parameters',
        details: validationResult.error.errors 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
    }

    const { base: baseCurrency, targets: targetCurrencies } = validationResult.data;

    // If no target currencies specified, return all mock rates
    if (targetCurrencies.length === 0) {
      return new NextResponse(JSON.stringify({
        base: baseCurrency,
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
      // Use ExchangeRate-API with optional API key
      const apiKey = process.env.EXCHANGE_RATE_API_KEY;
      const url = apiKey 
        ? `https://api.exchangerate-api.com/v4/latest/${baseCurrency}?api_key=${apiKey}`
        : `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

      const response = await axios.get<ExchangeRateResponse>(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout for bulk request
      });

      if (!response.data?.rates) {
        throw new Error('No rates data received from external API');
      }

      // Extract only the requested currencies
      const rates: {[key: string]: number} = {};
      targetCurrencies.forEach(currency => {
        if (response.data.rates[currency]) {
          rates[currency] = response.data.rates[currency];
        } else {
          // Fallback to mock rate if not found
          rates[currency] = mockRates[currency] || 1;
        }
      });

      return new NextResponse(JSON.stringify({
        base: baseCurrency,
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
      console.error('External API error:', error);
      
      // Return mock rates as fallback
      const rates: {[key: string]: number} = {};
      targetCurrencies.forEach(currency => {
        rates[currency] = mockRates[currency] || 1;
      });

      return new NextResponse(JSON.stringify({
        base: baseCurrency,
        rates,
        date: new Date().toISOString(),
        source: 'mock',
        warning: 'Using fallback data due to external API error'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=300, stale-while-revalidate=600'
        }
      });
    }
  } catch (error) {
    console.error('Exchange rate API error:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Internal server error',
      message: 'Failed to process exchange rate request'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
} 