"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGlobalLoading } from "@/context/GlobalLoadingContext";

export default function RouteLoader() {
  const pathname = usePathname();
  const { loading, setLoading } = useGlobalLoading();
  const [wasLoading, setWasLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const MIN_LOADING_TIME = 350; // Minimum 350ms to show animation

  // Hide spinner with minimum display time
  useEffect(() => {
    if (wasLoading) {
      const currentTime = Date.now();
      const elapsedTime = startTime ? currentTime - startTime : 0;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        setLoading(false);
        setWasLoading(false);
        setStartTime(null);
      }, remainingTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Track if loading was triggered and set start time
  useEffect(() => {
    if (loading) {
      setWasLoading(true);
      setStartTime(Date.now());
    }
  }, [loading]);

  if (!loading) return null;
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