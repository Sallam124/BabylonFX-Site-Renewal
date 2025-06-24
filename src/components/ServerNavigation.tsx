import Link from 'next/link'
import Image from 'next/image'

interface ServerNavigationProps {
  pathname: string
}

const ServerNavigation = ({ pathname }: ServerNavigationProps) => {
  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/babylon-logo.png"
                alt="BabylonFX"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/rates" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/rates') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Rates
            </Link>
            <Link 
              href="/services" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/services') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/faqs" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/faqs') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              FAQs
            </Link>
            <Link 
              href="/rate-alert" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/rate-alert') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Rate Alert
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default ServerNavigation 