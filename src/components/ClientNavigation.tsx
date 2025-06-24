'use client'

import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// Lazy load mobile menu component
const MobileMenu = lazy(() => import('./MobileMenu'))

// Throttle function for scroll events
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  let lastExecTime = 0
  return (...args: any[]) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

const ClientNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showRatesDropdown, setShowRatesDropdown] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Services', path: '/services', icon: '💱' },
    { name: 'Rates', path: '/rates', icon: '📊' },
    { name: 'About Us', path: '/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/contact', icon: '📞' },
    { name: 'FAQs', path: '/faqs', icon: '❓' },
  ]

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      setScrolled(window.scrollY > 20)
    }, 16), // ~60fps
    []
  )

  // Scroll effect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-gradient-to-r from-[#1a1a2e] to-[#e94560]'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center -ml-2">
              <Image
                src="/images/babylon-logo.png"
                alt="BabylonFX Logo"
                width={180}
                height={48}
                className={`h-10 w-auto transition-all duration-300 ${
                  scrolled ? 'brightness-100' : 'brightness-0 invert'
                }`}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-3 rounded-full transition-all duration-300 ${
                scrolled 
                  ? 'bg-gray-100 hover:bg-gray-200' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <span className="sr-only">Open menu</span>
              <div className="w-7 h-7 flex flex-col justify-center items-center gap-2">
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-gray-800' : 'bg-white'
                } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-gray-800' : 'bg-white'
                } ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-gray-800' : 'bg-white'
                } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                item.name === 'Rates' ? (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setShowRatesDropdown(true)}
                    onMouseLeave={() => setShowRatesDropdown(false)}
                  >
                    <Link
                      href={item.path}
                      className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
                        pathname === item.path
                          ? scrolled 
                            ? 'bg-gradient-to-r from-[#ffd700] to-[#ffc107] text-black font-semibold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                            : 'bg-white/20 text-white backdrop-blur-sm'
                          : scrolled
                            ? 'text-gray-600 hover:bg-gradient-to-r hover:from-[#ffd700]/60 hover:to-[#ffc107]/60 hover:text-black hover:font-semibold hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300'
                            : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {showRatesDropdown && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link
                          href="/rate-alert"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                        >
                          Set Rate Alert
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
                      pathname === item.path
                        ? scrolled 
                          ? 'bg-gradient-to-r from-[#ffd700] to-[#ffc107] text-black font-semibold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                          : 'bg-white/20 text-white backdrop-blur-sm'
                        : scrolled
                          ? 'text-gray-600 hover:bg-gradient-to-r hover:from-[#ffd700]/60 hover:to-[#ffc107]/60 hover:text-black hover:font-semibold hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300'
                          : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-24"></div>

      {/* Lazy-loaded Mobile Menu */}
      {isMenuOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden">
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          </div>
        }>
          <MobileMenu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)}
            navItems={navItems}
            pathname={pathname}
          />
        </Suspense>
      )}
    </>
  )
}

export default ClientNavigation 