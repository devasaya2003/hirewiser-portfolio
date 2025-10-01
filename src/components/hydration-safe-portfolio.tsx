'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, PortfolioDataProvider } from '@/components/portfolio-data-provider';

interface HydrationSafePortfolioProps {
  children: React.ReactNode;
  serverPortfolioData?: PortfolioData | null;
  serverError?: string | null;
}

export function HydrationSafePortfolio({ 
  children, 
  serverPortfolioData = null, 
  serverError = null 
}: HydrationSafePortfolioProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsHydrated(true);
      // Another small delay for smooth transition
      setTimeout(() => setShowTransition(true), 50);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // During SSR and initial hydration, show loading state
  if (!isHydrated || !showTransition) {
    return (
      <div suppressHydrationWarning>
        <PortfolioDataProvider
          portfolioData={null}
          isLoading={true}
          error={null}
        >
          {children}
        </PortfolioDataProvider>
      </div>
    );
  }

  // After hydration, show actual server data
  return (
    <PortfolioDataProvider
      portfolioData={serverPortfolioData}
      isLoading={false}
      error={serverError}
    >
      {children}
    </PortfolioDataProvider>
  );
}
