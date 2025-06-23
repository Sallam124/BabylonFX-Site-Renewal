'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Rate {
  currency: string
  countryName: string
  flag: string
  buyRate: number
  sellRate: number
}

interface ClientRatesHeroProps {
  displayRates: Rate[]
}

const images = ['/images/rates/rates.png', '/images/rates/rates2.png', '/images/rates/rates3.png', '/images/rates/rates4.png', '/images/rates/rates5.png']

export default function ClientRatesHero({ displayRates }: ClientRatesHeroProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center h-24">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[0]}
                  src={images[0]}
                  alt="Exchange Rates"
                  className="h-16 w-auto md:h-24 rounded-lg shadow-lg object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-primary">
              Unbeatable Exchange Rates
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-2xl md:text-3xl font-semibold text-gray-700">
              Live. Transparent. Always in your favor.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
              Scroll down to see today's best rates—trusted by thousands, updated every minute, and designed to help you get more for your money.
            </p>
          </div>
        </div>
      </section>

      {/* Rates Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
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
        </motion.div>
      </section>
    </>
  )
} 