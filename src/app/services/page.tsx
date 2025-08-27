import PageContainer from '@/components/PageContainer'

const services = [
  {
    title: 'Currency Exchange',
    description: `We buy and sell all major and exotic currencies at competitive rates. Payments are accepted in cash or debit, ensuring secure, reliable, and efficient transactions for every exchange.`,
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    ),
    features: [
      'Most major and exotic currencies',
      'Competitive exchange rates',
      'Multiple payment methods',
      'No hidden fees',
      'Fast and secure transactions'
    ]
  },
  {
    title: 'International Money Transfers',
    description: `We make international money transfers simple and transparent. Thousands of clients rely on Babylon Monetary Services each year to send funds safely, quickly, and without hidden fees.`,
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    features: [
      'Worldwide money transfers',
      'Fast delivery times',
      'No hidden charges',
      'High-capacity transfers available '
    ]
  }
]

const currentYear = new Date().getFullYear()

export default function Services() {
  return (
    <>
      <PageContainer>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-8 mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-4 text-primary fade-in-up-delay-0">
            Our Services
          </h1>
          <p className="-mt-2 max-w-2xl mx-auto text-2xl md:text-2xl font-light text-gray-700 fade-in-up-delay-1 text-center">
            Discover the range of services we offer to meet your currency exchange needs
          </p>
        </div>
        
        <section className="py-16 px-4 sm:px-6 lg:px-8 fade-in-up-delay-2">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up${index > 0 ? `-delay-${index}` : ''} border border-gray-200`}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-primary">{service.title}</h3>
                  </div>
                  
                  <p className={`${service.title === 'International Money Transfers' || service.title === 'Currency Exchange' ? 'text-black' : 'text-gray-600'} mb-6 text-lg leading-relaxed`}>{service.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-primary mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700 border-b border-gray-200 pb-2">
                          <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <a 
                      href="/contact#contact-info" 
                      className="text-base block w-full bg-primary hover:bg-secondary text-white font-light py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-center"
                    >
                      Contact us to learn more
                    </a>
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