'use client'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/65 backdrop-blur-md transition-opacity duration-300">
      {/* Animated Bar Loader (|||||) - all bars animate */}
      <div className="flex space-x-1 mb-1">
        <span className="block w-2 h-8 bg-white rounded animate-barLoader" />
        <span className="block w-2 h-8 bg-white rounded animate-barLoader bar-delay-1" />
        <span className="block w-2 h-8 bg-white rounded animate-barLoader bar-delay-2" />
        <span className="block w-2 h-8 bg-white rounded animate-barLoader bar-delay-3" />
        <span className="block w-2 h-8 bg-white rounded animate-barLoader bar-delay-4" />
      </div>
      <img
        src="/images/name-logo.svg"
        alt="BabylonFX Name Logo"
        className="h-8 w-auto"
        style={{ display: 'block', filter: 'brightness(2.5) contrast(1.2)' }}
      />
    </div>
  );
} 