import { ExchangeRateProvider } from '@/context/ExchangeRateContext';

export default function RatesLayout({ children }: { children: React.ReactNode }) {
  return <ExchangeRateProvider>{children}</ExchangeRateProvider>;
} 