'use client'
import RateAlertForm from '@/components/RateAlertForm'
import PageContainer from '@/components/PageContainer'
import PageHero from '@/components/PageHero'

// Define supported currencies directly in the page
const supportedCurrencies = [
  'CAD', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CNY', 'DKK', 'CHF', 'INR',
  'MXN', 'BRL', 'KRW', 'AED', 'RUB', 'SAR', 'JOD', 'KWD', 'IQD', 'BSD',
  'BHD', 'BOB', 'BGN', 'COP', 'CRC', 'DOP', 'EGP', 'ETB', 'GYD', 'HNL',
  'HUF', 'IDR', 'JMD', 'KES', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PEN',
  'PHP', 'PLN', 'QAR', 'SGD', 'ZAR', 'SEK', 'TWD', 'THB', 'TTD', 'TND',
  'TRY', 'VND', 'HKD'
]

export default function RateAlertPage() {
  return (
    <PageContainer>
      <PageHero 
        title="Set a Rate Alert" 
        subtitle="Get notified when your desired exchange rate is reached. Fill out the form below to set up a personalized rate alert." 
      />
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <RateAlertForm supportedCurrencies={supportedCurrencies} />
      </div>
    </PageContainer>
  )
} 