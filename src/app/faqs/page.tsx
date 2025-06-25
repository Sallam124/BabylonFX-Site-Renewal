'use client'

import { useState } from 'react'
import PageContainer from '@/components/PageContainer'

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
    question: 'How do I set up rate alerts?',
    answer: "Click on the <a href='/#rate-alert' class='inline-block bg-secondary hover:bg-secondary-light text-white font-bold py-1 px-3 rounded-md transition-colors duration-300'>Set Rate Alert</a> button on our homepage or rates page. Then, fill out the form with your desired currency pair, target exchange rate, and your email address. We'll notify you as soon as your target rate is reached!",
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
  {
    question: 'What is the fee for international money transfers?',
    answer: 'We offer money transfer to most countries worldwide for a flat fee of $7 CAD for up to $7000 CAD transferred. Please contact us to confirm if your destination country is included.',
  },
]

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <PageContainer>
        <div className="max-w-3xl mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-primary mb-8 fade-in-up">
            Find answers to common questions
          </h2>
        </div>

        {/* FAQs Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow p-8 border border-gray-200">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className={`fade-in-up${index > 8 ? '-delay-8' : index > 0 ? `-delay-${index}` : ''}`}>
                    <div
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
                            {openIndex === index ? '\u2212' : '+'}
                          </span>
                        </div>
                      </button>
                      {openIndex === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4 fade-in-up">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 fade-in-up-delay-1">
              Our team is here to help. Contact us for more information.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 fade-in-up-delay-2"
            >
              Contact Us
            </a>
          </div>
        </section>
      </PageContainer>
    </>
  )
}

export default FAQs 