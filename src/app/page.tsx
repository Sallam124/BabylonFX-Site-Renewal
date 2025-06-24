import React from 'react'
import PageContainer from '@/components/PageContainer'
import CurrencyConverterWrapper from '@/components/CurrencyConverterWrapper'

const currentYear = new Date().getFullYear()

const footerLinks = {
  services: [
    { name: 'Currency Exchange', href: '/services#currency-exchange' },
    { name: 'International Transfers', href: '/services#international-transfers' },
    { name: 'Business Solutions', href: '/services#business-solutions' },
    { name: 'Travel Money', href: '/services#travel-money' },
    { name: 'Rate Alert', href: '/rate-alert' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQs', href: '/faqs' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'AML Policy', href: '/aml-policy' },
    { name: 'Compliance', href: '/compliance' },
  ],
}

const features = [
  {
    title: 'Competitive Rates',
    description: 'Get the best exchange rates with our transparent pricing and no hidden fees.',
    icon: '💰',
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    title: 'Fast & Secure',
    description: 'Quick transactions with bank-level security and multiple payment options.',
    icon: '⚡',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    title: '24/7 Support',
    description: 'Our customer service team is available to help you anytime, anywhere.',
    icon: '🛡️',
    gradient: 'from-purple-600 to-pink-700',
  },
  {
    title: 'Multiple Locations',
    description: 'Convenient locations across Canada with extended business hours.',
    icon: '📍',
    gradient: 'from-orange-600 to-red-700',
  },
  {
    title: 'Business Solutions',
    description: 'Specialized services for businesses with international operations.',
    icon: '💼',
    gradient: 'from-yellow-600 to-orange-700',
  },
  {
    title: 'Rate Alerts',
    description: 'Set up alerts to get notified when your desired exchange rate is reached.',
    icon: '🔔',
    gradient: 'from-cyan-600 to-blue-700',
  },
]

export default function Home() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-8 mb-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-gray-800 via-blue-800 to-purple-900 bg-clip-text text-transparent fade-in-up leading-tight pb-2">
          Currency Exchange Made Simple
        </h1>
        <p className="mt-2 max-w-3xl mx-auto text-2xl md:text-3xl font-semibold text-center text-gray-700 fade-in-up-delay-1 leading-relaxed">
          Fast, reliable, and accurate currency conversion for Canadian businesses and individuals
        </p>
      </div>

      {/* Currency Converter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <CurrencyConverterWrapper />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 fade-in-up">
              Why Choose BabylonFX?
            </h2>
            <p className="text-xl text-gray-700 fade-in-up-delay-1">
              Experience the difference with our comprehensive currency exchange services
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up border border-white/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-4xl mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-100 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4 fade-in-up">
              Our Services
            </h2>
            <p className="text-xl text-gray-700 fade-in-up-delay-1">
              Comprehensive currency solutions for all your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up border border-emerald-300">
              <div className="text-4xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">💱</div>
              <h3 className="text-2xl font-semibold text-primary mb-4">Currency Exchange</h3>
              <p className="text-gray-700 mb-4">
                Buy and sell all major and exotic currencies with competitive rates and transparent pricing.
              </p>
              <a
                href="/rates"
                className="inline-block bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Rates
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up-delay-1 border border-blue-300">
              <div className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">🌍</div>
              <h3 className="text-2xl font-semibold text-primary mb-4">International Money Transfers</h3>
              <p className="text-gray-700 mb-4">
                Send money worldwide with our flat-fee service and no hidden charges.
              </p>
              <a
                href="/services"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl mb-8 fade-in-up-delay-1 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust BabylonFX for their currency exchange needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 fade-in-up">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Quick & Easy</h3>
              <p className="text-gray-300 text-sm">Get started in minutes with our streamlined process</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 fade-in-up-delay-1">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Best Rates</h3>
              <p className="text-gray-300 text-sm">Competitive rates with no hidden fees</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 fade-in-up-delay-2">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Secure & Safe</h3>
              <p className="text-gray-300 text-sm">Bank-level security for all transactions</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 fade-in-up-delay-3">
            <a
              href="/contact"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="relative z-10">Contact Us Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a
              href="/rate-alert"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="relative z-10">Set Rate Alert</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-gray-300 text-sm fade-in-up-delay-4">
              Available 24/7 • Multiple Locations • Instant Support
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Same Colors as Ready to Get Started */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-bl from-pink-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4">
                BabylonFX
              </h3>
              <p className="text-gray-200 max-w-sm leading-relaxed mb-4">
                A family-owned business founded in spring, 2008, on a single premise: Complete transparency in conducting business.
              </p>
              <p className="text-gray-200 mb-6">
                Your trusted partner in currency exchange services across Canada.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/babylonfx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5 text-gray-200 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/BabylonMS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5 text-gray-200 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/officialbabylonfx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5 text-gray-200 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Services Links */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-200 hover:text-cyan-300 transition-all duration-300 text-lg group flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-200 hover:text-emerald-300 transition-all duration-300 text-lg group flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-200 hover:text-purple-300 transition-all duration-300 text-lg group flex items-center"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">
                © {currentYear} BabylonFX. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-300 text-sm">
                  Licensed by FINTRAC | Registration #: M12345678
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}