import Navigation from '@/components/Navigation'

const services = [
  {
    title: 'Currency Exchange',
    description: 'Get the best rates for your currency exchange needs. We offer competitive rates for all major currencies.',
    icon: '💱',
  },
  {
    title: 'International Money Transfers',
    description: 'Send money abroad quickly and securely with our international transfer services.',
    icon: '🌍',
  },
  {
    title: 'Business Solutions',
    description: 'Specialized currency exchange services for businesses of all sizes.',
    icon: '💼',
  },
  {
    title: 'Travel Money',
    description: 'Order foreign currency for your travels with our convenient travel money service.',
    icon: '✈️',
  },
  {
    title: 'Currency Cards',
    description: 'Multi-currency cards for secure and convenient spending abroad.',
    icon: '💳',
  },
  {
    title: 'Rate Alerts',
    description: 'Set up alerts to notify you when your desired exchange rate is reached.',
    icon: '🔔',
  },
]

export default function Services() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                Our Services
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Comprehensive currency exchange solutions tailored to your needs
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Visit our location or contact us to learn more about our services
            </p>
            <a
              href="/contact"
              className="inline-block bg-secondary hover:bg-secondary-light text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </>
  )
} 