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
import Footer from '@/components/Footer'



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
          <h1 className={`text-5xl md:text-7xl font-extrabold tracking-wide mb-2 text-primary italic fade-in-up-delay-1 leading-tight pb-2 drop-shadow-lg text-center ${dmSerifDisplay.className}`}>
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
              
                             {/* Desktop: Overlapping Stack of Cards Layout with Hover Spread */}
               <div className="hidden lg:block w-full overflow-visible mt-16">
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

                                             {/* Mobile: Interactive Grid Layout */}
               <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                 {features.map((feature, index) => (
                   <motion.div 
                     key={index} 
                     className="w-full cursor-pointer"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ 
                       duration: 0.6, 
                       delay: index * 0.1,
                       ease: "easeOut"
                     }}
                     whileTap={{ 
                       scale: 0.95,
                       y: -2,
                       transition: { duration: 0.1 }
                     }}
                   >
                     <FeatureCard feature={feature} />
                   </motion.div>
                 ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>



        <Footer />
      </PageContainer>
    </>
  )
}