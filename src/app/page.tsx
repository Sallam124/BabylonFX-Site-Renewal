import Navigation from '@/components/Navigation'
import CurrencyConverter from '@/components/CurrencyConverter'

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-primary sm:text-5xl md:text-6xl">
                <span className="block">Professional Currency Exchange</span>
                <span className="block text-secondary mt-2">Your Trusted Partner in Canada</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Get the best rates for your currency exchange needs. Fast, secure, and reliable service for all your international money transfers.
              </p>
            </div>
          </div>
        </section>

        {/* Currency Converter Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Live Currency Converter</h2>
              <p className="mt-2 text-gray-600">Get real-time exchange rates and convert your currency instantly</p>
            </div>
            <CurrencyConverter />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-secondary text-4xl mb-4">💱</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Competitive Rates</h3>
                <p className="text-gray-600">Get the best exchange rates in the market with our competitive pricing.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-secondary text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Fast Service</h3>
                <p className="text-gray-600">Quick and efficient currency exchange services for all your needs.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-secondary text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Secure Transactions</h3>
                <p className="text-gray-600">Your security is our priority with our advanced security measures.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 