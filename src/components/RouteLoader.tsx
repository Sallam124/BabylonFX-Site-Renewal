"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGlobalLoading } from "@/context/GlobalLoadingContext";

export default function RouteLoader() {
  const pathname = usePathname();
  const { loading, setLoading } = useGlobalLoading();
  const [wasLoading, setWasLoading] = useState(false);

  // Hide spinner as soon as the route changes
  useEffect(() => {
    if (wasLoading) {
      setLoading(false);
      setWasLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Track if loading was triggered
  useEffect(() => {
    if (loading) setWasLoading(true);
  }, [loading]);

  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Animated Bar Loader */}
      <div className="flex space-x-1 mb-1">
        <span className="block w-2 h-8 bg-white rounded animate-barLoader" />
        <span className="block w-2 h-8 bg-white rounded animate-barLoader bar-delay-1" />
        <span className="block w-2 h-8 bg-white rounded animate-barLoader bar-delay-2" />
        <span className="block w-2 h-8 bg-white rounded animate-barLoader bar-delay-3" />
      </div>
      <img
        src="/images/name-logo.svg"
        alt="BabylonFX Name Logo"
        className="h-8 w-auto"
        style={{ display: 'block', filter: 'brightness(2.5) contrast(1.2)' }}
      />
      <style jsx global>{`
        @keyframes barLoader {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1.2); opacity: 1; }
        }
        .animate-barLoader {
          animation: barLoader 1s infinite cubic-bezier(0.4,0,0.2,1);
        }
        .bar-delay-1 { animation-delay: 0.15s; }
        .bar-delay-2 { animation-delay: 0.3s; }
        .bar-delay-3 { animation-delay: 0.45s; }
      `}</style>
    </div>
  );
} 