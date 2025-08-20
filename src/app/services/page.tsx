import PageContainer from '@/components/PageContainer'

const services = [
  {
    title: 'Currency Exchange',
    description: `Babylon Monetary Services buys and sells all tradable major and exotic currencies. We handle all major and exotic currencies with competitive rates. For any specific currency inquiries, please contact us for current rates. We have multiple methods of payment for purchasing a foreign currency, including cash, bankdraft and wire transfer*. *Wire transfer in USD or CAD only.`,
    icon: (
      <svg className="w-12 h-12 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    ),
    features: [
      'All major and exotic currencies',
      'Competitive exchange rates',
      'Multiple payment methods',
      'No hidden fees',
      'Fast and secure transactions'
    ]
  },
  {
    title: 'International Money Transfers',
    description: `Babylon Monetary Services transfers money worldwide for thousands of clients every year. Besides currency exchange, money transfer is our most popular service as we maintain a no hidden fee policy. We offer money transfer to most countries worldwide for a flat fee of $7 CAD for up to $7000 CAD transferred. We encourage customers to contact us ahead of time to inquire whether their country is included in this offer.`,
    icon: (
      <svg className="w-12 h-12 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    features: [
      'Worldwide money transfers',
      'Flat fee of $7 CAD',
      'Up to $7000 CAD per transfer',
      'No hidden charges',
      'Fast delivery times'
    ]
  }
]

const currentYear = new Date().getFullYear()

export default function Services() {
  return (
    <>
      <PageContainer>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-8 mb-8 px-4 sm:px-6 lg:px-8 bg-black py-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white font-ciguatera fade-in-up-delay-0">
            Our Services
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-2xl md:text-3xl font-bold text-[#FFD700] fade-in-up-delay-1 text-center font-ciguatera">
            Discover the range of services we offer to meet your currency exchange needs
          </p>
        </div>
        
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black fade-in-up-delay-2">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up${index > 0 ? `-delay-${index}` : ''} border border-gray-800 hover:border-[#FFD700]/20`}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white font-ciguatera">{service.title}</h3>
                  </div>
                  
                  <p className="text-white mb-6 text-lg leading-relaxed font-semibold">{service.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-[#FFD700] mb-3 font-ciguatera">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-white font-semibold">
                          <svg className="w-5 h-5 text-[#FFD700] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] hover:from-[#B8860B] hover:to-[#FFD700] text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-ciguatera">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageContainer>
    </>
  )
} 