import { mockRates } from '@/utils/exchangeRateService'
import ClientRatesHero from './ClientRatesHero'
import Image from 'next/image'

const images = ['/images/rates/rates.png', '/images/rates/rates2.png', '/images/rates/rates3.png', '/images/rates/rates4.png', '/images/rates/rates5.png']

const supportedCurrencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CNY', 'DKK', 'CHF', 'INR', 'MXN', 'BRL', 'KRW', 'AED', 'RUB', 'SAR', 'JOD', 'KWD', 'IQD', 'BSD', 'BHD', 'BOB', 'BGN', 'COP', 'CRC', 'DOP', 'EGP', 'ETB', 'GYD', 'HNL', 'HUF', 'IDR', 'JMD', 'KES', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PEN', 'PHP', 'PLN', 'QAR', 'SGD', 'ZAR', 'SEK', 'TWD', 'THB', 'TTD', 'TND', 'TRY', 'VND', 'HKD'
]

const countryNames: { [key: string]: string } = {
  'USD': 'United States', 'EUR': 'European Union', 'GBP': 'United Kingdom', 'JPY': 'Japan', 'AUD': 'Australia',
  'CNY': 'China', 'DKK': 'Denmark', 'CHF': 'Switzerland', 'INR': 'India', 'MXN': 'Mexico', 'BRL': 'Brazil',
  'KRW': 'South Korea', 'AED': 'United Arab Emirates', 'RUB': 'Russia', 'SAR': 'Saudi Arabia', 'JOD': 'Jordan',
  'KWD': 'Kuwait', 'IQD': 'Iraq', 'BSD': 'Bahamas', 'BHD': 'Bahrain', 'BOB': 'Bolivia', 'BGN': 'Bulgaria',
  'COP': 'Colombia', 'CRC': 'Costa Rica', 'DOP': 'Dominican Republic', 'EGP': 'Egypt', 'ETB': 'Ethiopia',
  'GYD': 'Guyana', 'HNL': 'Honduras', 'HUF': 'Hungary', 'IDR': 'Indonesia', 'JMD': 'Jamaica', 'KES': 'Kenya',
  'NPR': 'Nepal', 'NZD': 'New Zealand', 'NOK': 'Norway', 'OMR': 'Oman', 'PKR': 'Pakistan', 'PEN': 'Peru',
  'PHP': 'Philippines', 'PLN': 'Poland', 'QAR': 'Qatar', 'SGD': 'Singapore', 'ZAR': 'South Africa', 'SEK': 'Sweden',
  'TWD': 'Taiwan', 'THB': 'Thailand', 'TTD': 'Trinidad and Tobago', 'TND': 'Tunisia', 'TRY': 'Turkey', 'VND': 'Vietnam', 'HKD': 'Hong Kong'
}

const flagMap: { [key: string]: string } = {
  'USD': 'usa', 'EUR': 'eu', 'GBP': 'gb', 'JPY': 'jp', 'AUD': 'au', 'CNY': 'cn', 'DKK': 'dk', 'CHF': 'ch', 'INR': 'in', 'MXN': 'mx', 'BRL': 'br', 'KRW': 'kr', 'AED': 'ae', 'RUB': 'ru', 'SAR': 'sa', 'JOD': 'jo', 'KWD': 'kw', 'IQD': 'iq', 'BSD': 'bs', 'BHD': 'bh', 'BOB': 'bo', 'BGN': 'bg', 'COP': 'co', 'CRC': 'cr', 'DOP': 'do', 'EGP': 'eg', 'ETB': 'et', 'GYD': 'gy', 'HNL': 'hn', 'HUF': 'hu', 'IDR': 'id', 'JMD': 'jm', 'KES': 'ke', 'NPR': 'np', 'NZD': 'nz', 'NOK': 'no', 'OMR': 'om', 'PKR': 'pk', 'PEN': 'pe', 'PHP': 'ph', 'PLN': 'pl', 'QAR': 'qa', 'SGD': 'sg', 'ZAR': 'za', 'SEK': 'se', 'TWD': 'tw', 'THB': 'th', 'TTD': 'tt', 'TND': 'tn', 'TRY': 'tr', 'VND': 'vn', 'HKD': 'hk'
}

function getFlagPath(currencyCode: string): string {
  return `/images/flags/${flagMap[currencyCode] || currencyCode.toLowerCase()}.png`
}

export default function RatesPage() {
  const spread = 0.005 // 0.5% spread
  const baseCurrency = 'CAD'
  const displayRates = supportedCurrencies
    .filter(currency => currency !== baseCurrency)
    .map(currency => ({
      currency,
      countryName: countryNames[currency] || currency,
      flag: getFlagPath(currency),
      buyRate: mockRates[currency] * (1 + spread),
      sellRate: mockRates[currency] * (1 - spread)
    }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <ClientRatesHero displayRates={displayRates} />
      {/* Disclaimer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p>
              * Rates are subject to change without notice. Please contact us for the most up-to-date rates.
              <br />
              ** Minimum transaction amounts may apply. Please visit our location for more details.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 