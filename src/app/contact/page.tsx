'use client'

import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import PageContainer from '@/components/PageContainer'
import AnimateOnScroll from '@/components/AnimateOnScroll'

// Dynamically import LocationMap to reduce initial bundle size
const LocationMap = dynamic(() => import('@/components/LocationMap'), {
  loading: () => (
    <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
  ssr: false
})

const locations = [
  {
    name: 'Ottawa',
    address: '2535 Bank St, Ottawa, ON K1V 8R9',
    phone: '613-521-6002',
    hours: [
      'Monday – Friday: 10:00 AM – 5:30 PM',
      'Saturday: 10:00 AM – 5:00 PM',
      'Sunday: CLOSED'
    ],
    mapsUrl: 'https://maps.google.com/?q=2535+Bank+St,+Ottawa,+ON+K1V+8R9'
  },
  {
    name: 'Mississauga',
    address: '3060 Hurontario St, Mississauga, ON L5B 1N7',
    phone: '905-566-9393',
    hours: [
      'Monday – Saturday: 10:00 AM – 6:00 PM',
      'Sunday: CLOSED'
    ],
    mapsUrl: 'https://maps.google.com/?q=3060+Hurontario+St,+Mississauga,+ON+L5B+1N7'
  },
  {
    name: 'Scarborough',
    address: '1975 Lawrence Ave East, Scarborough, ON M1R 2Z2',
    phone: '416-840-0086 / 9295',
    hours: [
      'Monday – Saturday: 10:00 AM – 6:00 PM',
      'Sunday: CLOSED'
    ],
    mapsUrl: 'https://maps.google.com/?q=1975+Lawrence+Ave+East,+Scarborough,+ON+M1R+2Z2'
  },
  {
    name: 'Windsor',
    address: '793 Wyandotte St E, Windsor, ON N9A 3J5',
    phone: '519-968-3558',
    hours: [
      'Monday – Saturday: 10:00 AM – 6:00 PM',
      'Sunday: CLOSED'
    ],
    mapsUrl: 'https://maps.google.com/?q=793+Wyandotte+St+E,+Windsor,+ON+N9A+3J5'
  }
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, always succeed
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <PageContainer>
        {/* Map Section - now at the top */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12 fade-in-up">
              <div className="w-full">
                <h2 className="font-extrabold text-5xl text-gray-800 mb-6 text-center">Our Locations</h2>
                <LocationMap />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <AnimateOnScroll>
                <div className="bg-white p-8 rounded-lg shadow-lg fade-in-up">
                  <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="rates">Exchange Rates</option>
                        <option value="services">Our Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-2xl shadow-md transition-all duration-300 disabled:opacity-50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                    {submitStatus === 'success' && (
                      <div className="text-green-600 text-center mt-6 border-t border-gray-200 pt-6">
                        Thank you for your message. We'll get back to you soon!
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="text-red-600 text-center">
                        Sorry, there was an error sending your message. Please try again.
                      </div>
                    )}
                  </form>
                </div>
              </AnimateOnScroll>
              {/* Contact Information */}
              <AnimateOnScroll>
                <div className="bg-white p-8 rounded-lg shadow-lg fade-in-up-delay-1">
                  <h2 className="text-2xl font-bold text-primary mb-6">Our Information</h2>
                  {/* General Contact Info */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-[#ffd700] mr-3" fill="none" stroke="black" viewBox="1 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href="mailto:info@babylonfx.com"
                        className="text-gray-600 hover:text-[#d4af37] transition-all duration-300 -ml-1"
                      >
                        info@babylonfx.com
                      </a>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {locations.map((location) => (
                      <div key={location.name} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                        <div className="flex items-start mt-2">
                          <Image
                            src="/icons/pin.png"
                            alt="Location"
                            width={20}
                            height={20}
                            className="mt-0 mr-3 -ml-1"
                          />
                          <a 
                            href={location.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-[#d4af37] transition-all duration-300"
                          >
                            {location.address}
                          </a>
                        </div>
                        <div className="flex items-center mt-2">
                          <Image
                            src="/icons/phone.png"
                            alt="Phone"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          <a 
                            href={`tel:${location.phone.replace(/\s+/g, '')}`}
                            className="text-gray-600 hover:text-[#d4af37] transition-all duration-300"
                          >
                            {location.phone}
                          </a>
                        </div>
                        <div className="mt-2">
                          {location.hours.map((hour, index) => (
                            <p key={index} className="text-gray-600 text-sm">{hour}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </PageContainer>
    </>
  )
}

export default Contact 