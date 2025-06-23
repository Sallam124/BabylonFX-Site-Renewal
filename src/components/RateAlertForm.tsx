'use client'

import React, { useState } from 'react'
import { currencyNames } from '@/utils/exchangeRateService'

const RateAlertForm = ({ supportedCurrencies }: { supportedCurrencies: string[] }) => {
  const [buyCurrency, setBuyCurrency] = useState('USD')
  const [exchangeWith, setExchangeWith] = useState('CAD')
  const [desiredPrice, setDesiredPrice] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!buyCurrency || !exchangeWith || !desiredPrice || !email) {
      setError('Please fill out all fields.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mt-8">
        Thank you! We will notify you at {email} when {buyCurrency}/{exchangeWith} reaches {desiredPrice}.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-8 max-w-xl w-full mx-auto">
      <h3 className="text-xl font-bold text-primary mb-4">Set a Rate Alert</h3>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <div className="mb-4">
        <label htmlFor="buy-currency" className="block text-sm font-medium text-gray-700 mb-1">Currency to Buy</label>
        <select
          id="buy-currency"
          value={buyCurrency}
          onChange={e => setBuyCurrency(e.target.value)}
          className="block w-full rounded-md border-2 border-gray-200 p-2 focus:border-primary focus:ring-primary text-base"
        >
          {supportedCurrencies.map(cur => (
            <option key={cur} value={cur}>{cur} - {currencyNames[cur] || cur}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Desired Price</label>
        <input
          type="number"
          step="any"
          min="0"
          value={desiredPrice}
          onChange={e => setDesiredPrice(e.target.value)}
          className="block w-full rounded-md border-2 border-gray-200 p-2 focus:border-primary focus:ring-primary text-base"
          placeholder="e.g. 0.75"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exchange-with" className="block text-sm font-medium text-gray-700 mb-1">Currency to Exchange With</label>
        <select
          id="exchange-with"
          value={exchangeWith}
          onChange={e => setExchangeWith(e.target.value)}
          className="block w-full rounded-md border-2 border-gray-200 p-2 focus:border-primary focus:ring-primary text-base"
        >
          {supportedCurrencies.map(cur => (
            <option key={cur} value={cur}>{cur} - {currencyNames[cur] || cur}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full rounded-md border-2 border-gray-200 p-2 focus:border-primary focus:ring-primary text-base"
          placeholder="you@email.com"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-3 rounded hover:bg-secondary transition-colors text-base"
      >
        Set Alert
      </button>
    </form>
  )
}

export default RateAlertForm 