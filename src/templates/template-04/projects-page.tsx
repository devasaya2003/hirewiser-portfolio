import { useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import ProjectsList from "./components/projects/ProjectsList";
import BackButton from "./components/projects/BackButton";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";

function ProjectsPage04() {
  const { getAllProjectsWithTemplate } = usePortfolio();
  const { data: projectsData, error } = getAllProjectsWithTemplate();

  // Get email from portfolio context
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full bg-[var(--background)] relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
          <Header portfolioData={portfolioData} />
          <div className="max-w-4xl mx-auto py-20 text-center">
            <p className="text-[var(--muted-foreground)]">
              An error occurred while fetching projects.
            </p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full bg-[var(--background)] relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
          <Header portfolioData={portfolioData} />
          <div className="max-w-4xl mx-auto py-20 text-center">
            <p className="text-[var(--muted-foreground)]">No projects found.</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div className="min-h-screen w-full bg-[var(--background)] relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
        {/* Vertical separators like itsmehi */}
        <div className="absolute left-15 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden" />
        <div className="absolute right-15 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden" />

        <div className="px-[34px] pt-7">
          <div className="px-8">
            <Header portfolioData={portfolioData} />
          </div>

          <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-0">
            <div className="text-center sm:text-left">
              <BackButton
                to="/"
                className="mb-6 px-4 py-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/10 shadow-lg transition-all duration-300 mx-auto sm:mx-0 inline-flex items-center"
                label="Back to Home"
              />
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-2">
                All Projects
              </h1>
              <p className="text-[var(--muted-foreground)] mb-8">
                Explore my complete portfolio of projects
              </p>
            </div>

            <ProjectsList projects={projectsData} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProjectsPage04;
