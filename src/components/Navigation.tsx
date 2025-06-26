'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showRatesDropdown, setShowRatesDropdown] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Services', path: '/services', icon: '💱' },
    { name: 'Rates', path: '/rates', icon: '📊' },
    { name: 'About Us', path: '/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/contact', icon: '📞' },
    { name: 'FAQs', path: '/faqs', icon: '❓' },
  ]

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
                  scrolled ? 'brightness-200 contrast-150' : 'brightness-200 contrast-150 invert'
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

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
        isMenuOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
      }`}>
        <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <Image
                  src="/images/babylon-logo.png"
                  alt="BabylonFX Logo"
                  width={140}
                  height={36}
                  className="h-9 w-auto"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2.5 rounded-full hover:bg-gray-100"
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-6 py-8 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center px-5 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                      pathname === item.path
                        ? 'bg-gradient-to-r from-[#ffd700] to-[#ffc107] text-black font-semibold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-[#ffd700] hover:to-[#ffc107] hover:text-black hover:font-semibold hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-4 text-2xl">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
                {/* Mobile-only Rate Alert link */}
                <Link
                  href="/rate-alert"
                  className={`flex items-center px-5 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                    pathname === '/rate-alert'
                      ? 'bg-gradient-to-r from-[#ffd700] to-[#ffc107] text-black font-semibold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-[#ffd700] hover:to-[#ffc107] hover:text-black hover:font-semibold hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-4 text-2xl">🔔</span>
                  Rate Alert
                </Link>
              </nav>
            </div>
            <div className="p-6 border-t">
              <div className="flex justify-center space-x-6">
                <a href="tel:+1234567890" className="p-3 text-gray-600 hover:text-[#ffd700] hover:scale-110 transition-all duration-300">
                  <span className="sr-only">Call us</span>
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a href="https://wa.me/1234567890" className="p-3 text-gray-600 hover:text-[#ffd700] hover:scale-110 transition-all duration-300">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation 