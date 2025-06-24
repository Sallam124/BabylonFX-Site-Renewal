'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NavItem {
  name: string
  path: string
  icon: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  pathname: string
}

const MobileMenu = ({ isOpen, onClose, navItems, pathname }: MobileMenuProps) => {
  return (
    <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
      isOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
    }`}>
      <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
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
                onClick={onClose}
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
                  onClick={onClose}
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
                onClick={onClose}
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
  )
}

export default MobileMenu 