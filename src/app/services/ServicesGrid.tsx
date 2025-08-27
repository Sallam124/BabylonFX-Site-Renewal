'use client';
import { useScrollFadeIn } from '@/utils/useScrollFadeIn';

const services = [
  {
    title: 'Currency Exchange',
    description: `Babylon Monetary Services buys and sells all tradable major and exotic currencies. For a list of our rates for major currencies we handle, visit the rates section. For any other exotic currencies or currencies not included in our rates section, please contact us for about their rates. We have multiple methods of payment for purchasing a foreign currency, including cash, bankdraft and wire transfer*. *Wire transfer in USD or CAD only.`,
    icon: '',
  },
  {
    title: 'International Money Transfers',
    description: `Babylon Monetary Services transfers money worldwide for thousands of clients every year. Besides currency exchange, money transfer is our most popular service as we maintain a no hidden fee policy. We offer money transfer to most countries worldwide for a flat fee of $7 CAD for up to $7000 CAD transferred. We encourage customers to contact us ahead of time to inquire whether their country is included in this offer.`,
    icon: '',
  },
  {
    title: 'Wire Transfers',
    description: `At Babylon Monetary Services, we realize how frustrating it is to get monetary services at other institutions – the long lines, the slow work pace, and the work hours. We know how disappointing it is to make your way to your bank during your lunch break because it closes at 4:00 pm, only not to be served because of a long wait line.`,
    icon: '',
  },
  {
    title: 'Business Solutions',
    description: 'Specialized currency exchange services for businesses of all sizes.',
    icon: '',
  },
  {
    title: 'Travel Money',
    description: 'Order foreign currency for your travels with our convenient travel money service.',
    icon: '',
  },
  {
    title: 'Currency Cards',
    description: 'Multi-currency cards for secure and convenient spending abroad.',
    icon: '',
  },
  {
    title: 'Rate Alerts',
    description: 'Set up alerts to notify you when your desired exchange rate is reached.',
    icon: '',
    link: '/#rate-alert',
  },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const fadeRef = useScrollFadeIn();
        return (
          <div
            key={index}
            ref={fadeRef as React.LegacyRef<HTMLDivElement>}
            className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 fade-in-up scroll-trigger${index > 0 ? `-delay-${index}` : ''}`}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
            <p className={`${service.title === 'International Money Transfers' || service.title === 'Currency Exchange' ? 'text-black' : 'text-gray-600'} mb-4`}>{service.description}</p>
            {service.title === 'Rate Alerts' && (
              <a
                href="/rate-alert"
                className="inline-block bg-secondary hover:bg-secondary-light text-white font-bold py-2 px-6 rounded-2xl transition-colors duration-300 mt-2"
              >
                Set a Rate Alert
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
} 