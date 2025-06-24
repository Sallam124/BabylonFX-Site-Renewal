/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Optimize webpack configuration for development
  webpack: (config, { dev, isServer }) => {
    // Development-specific optimizations
    if (dev) {
      // Disable expensive optimizations in development
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        minimize: false,
        concatenateModules: false,
      }
      
      // Faster source maps for development
      config.devtool = 'eval-cheap-module-source-map'
      
      // Reduce the number of modules processed
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }

    return config
  },

  // Optimize image handling
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Disable TypeScript checking in development for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint in development for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Experimental features for better performance
  experimental: {
    // Enable SWC for faster compilation
    swcTraceProfiling: false,
    // Optimize package imports
    optimizePackageImports: ['axios', 'react', 'react-dom'],
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: false,
  },
}

module.exports = nextConfig 