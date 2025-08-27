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
  const [currentPath, setCurrentPath] = useState('')

  const pathname = usePathname()
  const router = useRouter()
  const { loading, setLoading } = useGlobalLoading()

  // Update current path when pathname changes
  useEffect(() => {
    setCurrentPath(pathname)
  }, [pathname])

  const navItems = [
    { name: 'Home', path: '/', icon: '' },
    { name: 'Services', path: '/services', icon: '' },
    { name: 'Rates', path: '/rates', icon: '' },
    { name: 'About Us', path: '/about', icon: '' },
    { name: 'Contact', path: '/contact', icon: '' },
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
    if (path !== currentPath) {
      setCurrentPath(path) // Update immediately
      setLoading(true) // Always show loading animation
      router.push(path)
    }
  }

  return (
    <>
      {/* Main Navigation */}
      <nav         className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 transition-colors transition-opacity rounded-2xl ${
        scrolled 
          ? 'bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/30' 
          : 'bg-white/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/30'
                      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 flex items-center -ml-2 cursor-pointer"
              onClick={e => {
                e.preventDefault();
                if (currentPath !== '/') {
                  setCurrentPath('/');
                  setLoading(true); // Always show loading animation
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
                  scrolled ? 'brightness-100 opacity-100' : 'brightness-100 opacity-100'
                }`}
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-full transition-all duration-300 bg-gray-800/10 hover:bg-gray-800/20"
            >
              <span className="sr-only">Open menu</span>
              <div className="w-7 h-7 flex flex-col justify-center items-center gap-1.5">
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-gray-800' : 'bg-gray-800'
                } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-gray-800' : 'bg-gray-800'
                } ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-gray-800' : 'bg-gray-800'
                } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={e => handleNavClick(e, item.path)}
                                                          className={`px-3 py-1.5 text-base transition-all duration-300 ease-out no-underline hover:no-underline relative group text-gray-800 ${
                      currentPath === item.path ? 'selected' : ''
                    }`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="relative inline-block">
                      {item.name}
                      <div className={`absolute left-0 bottom-0 w-full h-[1.9px] bg-black transform transition-transform duration-300 ease-out origin-left ${
                        currentPath === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></div>
                    </span>
                  </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-32"></div>

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