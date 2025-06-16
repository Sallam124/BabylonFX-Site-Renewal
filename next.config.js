/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly expose environment variables
  env: {
    NEXT_PUBLIC_TWELVE_DATA_API_KEY: process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY,
    NEXT_PUBLIC_CURRENCYFREAKS_API_KEY: process.env.NEXT_PUBLIC_CURRENCYFREAKS_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/w40/**',
      },
    ],
  },
}

module.exports = nextConfig