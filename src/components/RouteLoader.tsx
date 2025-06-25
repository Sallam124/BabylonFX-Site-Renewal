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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary" />
    </div>
  );
} 