'use client'
import React, { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import CurrencyConverterWrapper from '@/components/CurrencyConverterWrapper'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { useRouter } from 'next/navigation'
import { useGlobalLoading } from '@/context/GlobalLoadingContext'
import { motion } from 'framer-motion'
import FeatureCard from '@/components/FeatureCard'
import { Inter, IBM_Plex_Sans, DM_Serif_Display, Marcellus } from 'next/font/google'

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
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins-icon lucide-coins w-8 h-8 text-yellow-500">
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    ),
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    title: 'Fast & Secure',
    description: 'Quick transactions with bank-level security and multiple payment options.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check-icon lucide-shield-check w-8 h-8 text-green-600">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    gradient: 'from-purple-600 to-pink-700',
  },
  {
    title: '24/7 Support',
    description: 'Our customer service team is available to help you anytime, anywhere.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-8 h-8 text-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    gradient: 'from-purple-600 to-pink-700',
  },
  {
    title: 'Multiple Locations',
    description: 'Convenient locations across Canada with extended business hours.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-8 h-8 text-red-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    gradient: 'from-orange-600 to-red-700',
  },
  {
    title: 'Business Solutions',
    description: 'Specialized services for businesses with international operations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-8 h-8 text-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
    gradient: 'from-yellow-600 to-orange-700',
  },
]

const inter = Inter({ subsets: ['latin'], weight: ['700'] })
const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '700'] })
const dmSerifDisplay = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], style: ['italic'] })
const marcellus = Marcellus({ subsets: ['latin'], weight: ['400'] })

export default function Home() {
  const router = useRouter();
  const { setLoading } = useGlobalLoading();
  const [stackOpen, setStackOpen] = useState(false);
  const cardWidth = 220;
  const overlap = 70;
  const gap = 1114;
  const stackWidth = cardWidth + (features.length - 1) * overlap;
  const spreadWidth = features.length * (cardWidth + gap) - gap;
  const center = Math.floor(features.length / 2);
  const spread = 190; // distance each card moves from center on hover
  const minGap = 10; // small gap between cards when stacked

  const handleNavigate = (href: string) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      <PageContainer>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-8 mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl  tracking-wide mb-2 text-primary  fade-in-up-delay-1 leading-tight pb-2 drop-shadow-lg text-center font-pmingliu">
            Effortless Currency Exchange
          </h1>
          <div className="mt-0 max-w-3xl mx-auto text-center fade-in-up-delay-1">
            <div className="text-2xl md:text-4xl  text-black leading-snug font-ciguatera">Fast, Reliable & Simple.</div>
            <div className={`text-lg md:text-xl text-gray-600 italic mt-0.5 ${marcellus.className}`}>Delivered to you by BabylonFX.</div>
          </div>
        </div>

        {/* Currency Converter Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <CurrencyConverterWrapper />
          </div>
        </section>

        {/* Features Section */}
        <AnimateOnScroll>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 fade-in-up">
                  Why Choose BabylonFX?
                </h2>
                <p className="text-xl text-gray-700 fade-in-up-delay-1">
                  Experience the difference with our comprehensive currency exchange services
                </p>
              </div>
              
              {/* Overlapping Stack of Cards Layout with Hover Spread */}
              <div className="w-full overflow-visible mt-16">
                <div
                  className="relative mx-auto"
                  style={{ width: `${stackWidth}px`, height: '400px' }}
                  onMouseLeave={() => setStackOpen(false)}
                  onMouseEnter={() => setStackOpen(true)}
                >
                  {features.map((feature, index) => {
                    let leftStacked = index * overlap;
                    if (index > 0) leftStacked += minGap * index;
                    let leftSpread, rotateZ = 0;
                    if (index === center) {
                      leftSpread = center * overlap;
                      rotateZ = 0;
                    } else {
                      leftSpread = center * overlap + (index - center) * spread;
                      if (index === 0) {
                        rotateZ = -6;
                      } else if (index === features.length - 1) {
                        rotateZ = 6;
                      } else if (Math.abs(index - center) === 1) {
                        rotateZ = index < center ? -4 : 4;
                      } else {
                        rotateZ = 0;
                      }
                    }
                    return (
                      <React.Fragment key={index}>
                        <motion.div
                          className="absolute w-[220px] h-[340px]"
                          animate={{
                            left: stackOpen ? leftSpread : leftStacked,
                            rotateZ: stackOpen ? rotateZ : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          style={{ zIndex: index }}
                        >
                          <div className="relative w-full h-full"
                            onMouseEnter={() => setStackOpen(true)}
                          >
                            <FeatureCard feature={feature} />
                    </div>
                        </motion.div>
                        {/* Add a hoverable gap between cards except after the last card */}
                        {index < features.length - 1 && (
                          <div
                            className="absolute top-0"
                            style={{
                              left: `${leftStacked + cardWidth - minGap / 2}px`,
                              width: `${minGap}px`,
                              height: '340px',
                              zIndex: 1000,
                              cursor: 'pointer',
                            }}
                            onMouseEnter={() => setStackOpen(true)}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                  </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Services Preview Section */}
        <AnimateOnScroll>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
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
                  <div className="text-4xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent"></div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">Currency Exchange</h3>
                  <p className="text-gray-700 mb-4">
                    Buy and sell all major and exotic currencies with competitive rates and transparent pricing.
                  </p>
                  <button
                    onClick={() => handleNavigate('/rates')}
                    className="inline-block bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View Rates
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up-delay-1 border border-blue-300">
                  <div className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"></div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">International Money Transfers</h3>
                  <p className="text-gray-700 mb-4">
                    Send money worldwide with our flat-fee service and no hidden charges.
                  </p>
                  <button
                    onClick={() => handleNavigate('/services')}
                    className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Call to Action */}
        <AnimateOnScroll>
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0d0d0d] via-[#232323] to-[#4a3d2a] text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div
              className="pointer-events-none absolute -bottom-32 -right-32 w-[800px] h-[800px] rounded-full blur-3xl"
              style={{
                opacity: 0.05,
                background: "radial-gradient(circle at 70% 70%, #a78bfa 0%, #60a5fa 10%, transparent 30%)"
              }}
            ></div>
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <div className="text-4xl md:text-5xl font-bold mb-6 fade-in-up"
                    style={{
                      background: "linear-gradient(90deg, #ffe7b2 0%, #ffe7b2 60%, #fff 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 8px rgba(255, 231, 178, 0.2))",
                      display: "inline-block",
                    }}>
                  Ready to Get Started?
                </div>
                <p className="text-xl md:text-2xl mb-8 fade-in-up-delay-1 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of satisfied customers who trust BabylonFX for their currency exchange needs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 fade-in-up">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Quick & Easy</h3>
                  <p className="text-gray-300 text-sm">Get started in minutes with our streamlined process</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 fade-in-up-delay-1">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Best Rates</h3>
                  <p className="text-gray-300 text-sm">Competitive rates with no hidden fees</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 fade-in-up-delay-2">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Secure & Safe</h3>
                  <p className="text-gray-300 text-sm">Bank-level security for all transactions</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 fade-in-up-delay-3">
                <button
                  onClick={() => handleNavigate('/contact')}
                  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="relative z-10">Contact Us Today</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
              <div className="text-center">
                <p className="text-gray-300 text-sm fade-in-up-delay-4">
                  Available 24/7 • Multiple Locations • Instant Support
                </p>
              </div>
            </div>
            {/* --- Footer content starts here --- */}
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold mb-4"
                      style={{
                        background: "linear-gradient(90deg, #ffe7b2 0%, #ffe7b2 60%, #fff 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 0 0.5px rgba(255, 231, 178, 0.005))",
                        display: "inline-block",
                      }}>
                    BabylonFX
                  </div>
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
                          className="text-gray-200 transition-all duration-300 text-lg group flex items-center relative"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300 relative">
                            {link.name}
                            <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
                          </span>
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
                          className="text-gray-200 transition-all duration-300 text-lg group flex items-center relative"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300 relative">
                            {link.name}
                            <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
                          </span>
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
                          className="text-gray-200 transition-all duration-300 text-lg group flex items-center relative"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300 relative">
                            {link.name}
                            <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Bottom Bar */}
              <div className="mt-6 pt-4 border-t border-white/20">
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
        </AnimateOnScroll>
      </PageContainer>
    </>
  )
}