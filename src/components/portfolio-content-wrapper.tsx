'use client';

import { useState, useEffect } from 'react';
import { PortfolioDataProvider, PortfolioData } from "@/components/portfolio-data-provider";
import { PortfolioContent } from '@/components/portfolio-content';

export default function PortfolioContentWrapper({ portfolioData }: { portfolioData: PortfolioData }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Use a small delay to ensure server/client render matching
    const timer = setTimeout(() => {
      setHydrated(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!hydrated) {
    // Return a loading state that matches what the server renders initially
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>  
      </div>
    );
  }

  return (
    <PortfolioDataProvider portfolioData={portfolioData} isLoading={false} error={null}>
      <PortfolioContent portfolioData={portfolioData} />
    </PortfolioDataProvider>
  );
}
