const services = [
  {
    title: 'Currency Exchange',
    description: `Babylon Monetary Services buys and sells all tradable major and exotic currencies. For a list of our rates for major currencies we handle, visit the rates section. For any other exotic currencies or currencies not included in our rates section, please contact us for about their rates. We have multiple methods of payment for purchasing a foreign currency, including cash, bankdraft and wire transfer*. *Wire transfer in USD or CAD only.`,
    icon: '💱',
  },
  {
    title: 'International Money Transfers',
    description: `Babylon Monetary Services transfers money worldwide for thousands of clients every year. Besides currency exchange, money transfer is our most popular service as we maintain a no hidden fee policy. We offer money transfer to most countries worldwide for a flat fee of $7 CAD for up to $7000 CAD transferred. We encourage customers to contact us ahead of time to inquire whether their country is included in this offer.`,
    icon: '🌍',
  },
  {
    title: 'Wire Transfers',
    description: `At Babylon Monetary Services, we realize how frustrating it is to get monetary services at other institutions – the long lines, the slow work pace, and the work hours. We know how disappointing it is to make your way to your bank during your lunch break because it closes at 4:00 pm, only not to be served because of a long wait line.`,
    icon: '🔗',
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
    link: '/#rate-alert',
  },
]

export default function Services() {
  return (
    <>
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
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {service.title === 'Rate Alerts' && (
                    <a
                      href="/rate-alert"
                      className="inline-block bg-secondary hover:bg-secondary-light text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 mt-2"
                    >
                      Set a Rate Alert
                    </a>
                  )}
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