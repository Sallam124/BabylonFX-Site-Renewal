'use client'

import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useGlobalLoading } from '@/context/GlobalLoadingContext'

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
  const router = useRouter()
  const { setLoading } = useGlobalLoading()

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

  // Custom navigation handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    if (path !== pathname) {
      setLoading(true)
      router.push(path)
    }
  }

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 transition-colors transition-opacity ${
        scrolled 
          ? 'bg-white/60 backdrop-blur-md shadow-lg' 
          : 'bg-gradient-to-r from-[#1a1a2e] to-[#e94560]'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 flex items-center -ml-2 cursor-pointer"
              onClick={e => {
                e.preventDefault();
                if (pathname !== '/') {
                  setLoading(true);
                  router.push('/');
                }
              }}
            >
              <Image
                src="/images/babylon-logo.png"
                alt="BabylonFX Logo"
                width={180}
                height={48}
                className={`h-10 w-auto transition-all duration-500 transition-colors transition-opacity ${
                  scrolled ? 'brightness-100 opacity-100' : 'brightness-0 invert opacity-80'
                }`}
              />
            </a>

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
                    <a
                      href={item.path}
                      onClick={e => handleNavClick(e, item.path)}
                      className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
                        pathname === item.path
                          ? scrolled 
                            ? 'bg-gradient-to-r from-[#ffd700] to-[#ffc107] text-black font-semibold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                            : 'bg-white/20 text-white backdrop-blur-sm'
                          : scrolled
                            ? 'text-gray-600 hover:ring-2 hover:ring-yellow-400/80 hover:ring-offset-2 hover:shadow-yellow-300/40 hover:text-black hover:font-semibold transition-all duration-300'
                            : 'text-white hover:ring-2 hover:ring-yellow-400/80 hover:ring-offset-2 hover:shadow-yellow-300/40 hover:text-yellow-200 transition-all duration-300'
                      }`}
                    >
                      {item.name}
                    </a>
                  </div>
                ) : (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={e => handleNavClick(e, item.path)}
                    className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
                      pathname === item.path
                        ? scrolled 
                          ? 'bg-gradient-to-r from-[#ffd700] to-[#ffc107] text-black font-semibold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                          : 'bg-white/20 text-white backdrop-blur-sm'
                        : scrolled
                          ? 'text-gray-600 hover:ring-2 hover:ring-yellow-400/80 hover:ring-offset-2 hover:shadow-yellow-300/40 hover:text-black hover:font-semibold transition-all duration-300'
                          : 'text-white hover:ring-2 hover:ring-yellow-400/80 hover:ring-offset-2 hover:shadow-yellow-300/40 hover:text-yellow-200 transition-all duration-300'
                    }`}
                  >
                    {item.name}
                  </a>
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