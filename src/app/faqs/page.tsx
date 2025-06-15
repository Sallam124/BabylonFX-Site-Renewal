'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

const faqs = [
  {
    question: 'What currencies do you exchange?',
    answer: 'We exchange all major currencies including USD, EUR, GBP, JPY, AUD, and many more. Please visit our Rates page for a complete list of available currencies and current rates.',
  },
  {
    question: 'Do I need to make an appointment?',
    answer: 'No appointment is necessary for most transactions. However, for large transactions or special requests, we recommend calling ahead to ensure we can accommodate your needs.',
  },
  {
    question: 'What identification do I need to bring?',
    answer: 'For transactions under $3,000, one piece of government-issued photo ID is required. For transactions over $3,000, two pieces of ID are required, including one government-issued photo ID.',
  },
  {
    question: 'Are your rates competitive?',
    answer: 'Yes, we offer competitive rates and no hidden fees. Our rates are updated in real-time to ensure you get the best possible value for your currency exchange.',
  },
  {
    question: 'Do you offer business services?',
    answer: 'Yes, we provide specialized currency exchange services for businesses, including bulk currency exchange, international wire transfers, and corporate accounts.',
  },
  {
    question: 'What are your business hours?',
    answer: 'We are open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays and major holidays.',
  },
  {
    question: 'Do you buy back foreign currency?',
    answer: 'Yes, we buy back most major currencies. Please visit our location with your currency and valid ID to exchange it back to Canadian dollars.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, debit cards, and bank drafts. For large transactions, we recommend calling ahead to confirm the best payment method.',
  },
]

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Find answers to common questions about our services
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-primary">
                        {faq.question}
                      </h3>
                      <span className="text-secondary">
                        {openIndex === index ? '−' : '+'}
                      </span>
                    </div>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8">
              Our team is here to help. Contact us for more information.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default FAQs 