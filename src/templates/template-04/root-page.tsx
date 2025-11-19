import React, { useState, useEffect, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { ThemeProvider } from "./components/theme-provider";
import Projects from "./components/Projects";
import Work from "./components/Work";


function RootPage04() {
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData, isLoading, error } = getAllDetailsWithTemplate();
  const [cardHeight, setCardHeight] = useState("100vh");
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);

  // Calculate and update the card height based on content
  useEffect(() => {
    const calculateHeight = () => {
      // Wait for DOM to be fully rendered
      setTimeout(() => {
        if (
          headerRef.current &&
          heroRef.current &&
          projectsRef.current &&
          workRef.current
        ) {
          // Get the top position of header
          const headerTop =
            headerRef.current.getBoundingClientRect().top + window.scrollY;

          // Get the bottom position of work section
          const workBottom =
            workRef.current.getBoundingClientRect().bottom + window.scrollY;

          // Calculate the total height from header to work section
          const totalHeight = workBottom - headerTop;

          // Set the card height
          setCardHeight(`${totalHeight + 30}px`);
        }
      }, 100);
    };

    // Calculate on initial render
    calculateHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading portfolio data...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading portfolio data</p>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div className="min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
        {/* Main content area */}
        <div className="relative">
          {/* Vertical separators like itsmehi */}
          <div className="absolute left-15 -top-20 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>
          <div className="absolute right-15 -top-20 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>
          
          <div className="px-[60px]">
            {/* Header */}
            <header className="relative" ref={headerRef}>
              <Header portfolioData={portfolioData} />
            </header>

            {/* Hero section */}
            <div className="hero-section relative" ref={heroRef} id="hero">
              <Hero portfolioData={portfolioData} />
            </div>
            <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />

            {/* Content after hero section */}
            <div
              className="relative min-h-[50vh] w-full"
              ref={projectsRef}
              id="projects"
            >
              <Projects projects={portfolioData.projects} />
            </div>

            <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
            <div
              className="relative min-h-[50vh] w-full"
              ref={workRef}
              id="work"
            >
              <Work experiences={portfolioData.experience} />
            </div>

            <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default RootPage04;
