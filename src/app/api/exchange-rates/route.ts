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

    // If no target currencies specified, return error
    if (targetCurrencies.length === 0) {
      return new NextResponse(JSON.stringify({
        error: 'No target currencies specified'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
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
          // Skip currencies not found in API response
          console.warn(`Rate not found for ${currency}`);
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
      
      return new NextResponse(JSON.stringify({
        error: 'Failed to fetch exchange rates from external API',
        message: 'External API is currently unavailable'
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
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