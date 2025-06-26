import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Currency Exchange', href: '/services#currency-exchange' },
      { name: 'International Transfers', href: '/services#international-transfers' },
      { name: 'Business Solutions', href: '/services#business-solutions' },
      { name: 'Travel Money', href: '/services#travel-money' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'FAQs', href: '/faqs' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'AML Policy', href: '/aml-policy' },
      { name: 'Compliance', href: '/compliance' },
    ],
  }

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0d0d0d] via-[#232323] to-[#6e5a36] text-white w-full z-50 shadow-lg">
      {/* Top-right Glow */}
      <div className="absolute top-0 right-0 w-96 h-1 bg-gradient-to-bl from-blue-400 to-purple-400 rounded-full blur-3xl opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4">
              BabylonFX
            </h3>
            <p className="text-gray-200 max-w-sm leading-relaxed mb-4">
              A family-owned business founded in spring, 2008, on a single premise: Complete transparency in conducting business.
            </p>
            <p className="text-gray-200 mb-6">
              Your trusted partner in currency exchange services across Canada.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/babylonfx"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5 text-gray-200 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://x.com/BabylonMS"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5 text-gray-200 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/officialbabylonfx/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 text-gray-200 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-cyan-300 transition-all duration-300 text-lg group flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-emerald-300 transition-all duration-300 text-lg group flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-purple-300 transition-all duration-300 text-lg group flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} BabylonFX. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-300 text-sm">
                Licensed by FINTRAC | Registration #: M12345678
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer 