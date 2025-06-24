import { mockRates } from '@/utils/exchangeRateService'
import PageContainer from '@/components/PageContainer'
import PageHero from '@/components/PageHero'
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
    <PageContainer>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center h-24">
              <img
                src={images[0]}
                alt="Exchange Rates"
                className="h-16 w-auto md:h-24 rounded-lg shadow-lg object-contain fade-in-up"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-primary fade-in-up">
              Unbeatable Exchange Rates
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-2xl md:text-3xl font-semibold text-gray-700 fade-in-up-delay-1">
              Live. Transparent. Always in your favor.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 fade-in-up-delay-2">
              Scroll down to see today's best rates—trusted by thousands, updated every minute, and designed to help you get more for your money.
            </p>
          </div>
        </div>
      </section>

      {/* Rates Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full fade-in-up">
          <div className="overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flag
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Buy Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sell Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayRates.map((rate) => (
                    <tr key={rate.currency} className="hover:bg-gray-50">
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={rate.flag}
                            alt={`${rate.countryName} flag`}
                            width={30}
                            height={20}
                            className="rounded-sm"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{rate.currency}</div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rate.countryName}</div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rate.buyRate.toFixed(4)}</div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rate.sellRate.toFixed(4)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Rates are updated regularly. For the most accurate and up-to-date rates, please contact us directly or visit one of our locations.
          </div>
        </div>
      </section>

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
    </PageContainer>
  )
} 