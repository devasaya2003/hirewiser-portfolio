import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import type { GetUserPortfolioV3Response } from "@/types/portfolio.types";
import { useNavigate } from "react-router-dom";

interface ProjectProps {
  title: string;
  link: string;
  logo: string;
  description: string;
  preview?: string;
  id: string; // Add id to ProjectProps
}

const ProjectItem: React.FC<ProjectProps> = ({
  title,
  link,
  logo,
  description,
  preview = "/default.png",
  id, // Add id to destructured props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      {/* Project Photo 
      <div className="mb-4">
        <img
          src={preview}
          alt={`${title} preview`}
          className="w-full h-48 object-cover rounded-lg border border-[var(--border)]"
        />
      </div> */}
      
      <div className="flex items-start">
        <div className="w-10 h-10 mr-4 flex-shrink-0">
          <img
            src={logo}
            alt={`${title} logo`}
            className="w-full h-full rounded-full object-cover border border-[var(--border)]"
          />
        </div>

        <div>
          <span className="relative inline-block">
            <button
              onClick={() => navigate(`/projects/${id}`)}
              className="text-base text-[var(--foreground)] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group flex items-center bg-transparent border-0 p-0"
             
            >
              {title}
              <svg
                className="w-4 h-4 ml-0.5 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
            {isHovered && (
              <div className="absolute z-10 px-3 py-2 text-sm text-white bg-[var(--tooltip)] rounded-md shadow-lg -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs">{description}</p>
                <div className="absolute top-3 -left-2 w-4 h-4 bg-[var(--tooltip)] border-l border-b border-[var(--tooltip-border)] transform rotate-45"></div>
              </div>
            )}
          </span>
          <p className="text-sm text-[var(--muted-foreground)] mt-1 truncate">
            {description.length > 100 ? `${description.substring(0, 85)}...` : description}
          </p>
        </div>
      </div>
    </div>
  );
};

const preloadMedia = (preview: string) => {
  const img = new Image();
  img.src = preview;

  if (
    preview.endsWith(".mp4") ||
    preview.endsWith(".webm") ||
    preview.endsWith(".mov")
  ) {
    const video = document.createElement("video");
    video.src = preview;
  }
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const navigate = useNavigate();

  useEffect(() => {
    projects?.forEach((project) => {
      if (project.previewImageUrl) {
        preloadMedia(project.previewImageUrl);
      }
    });
  }, [projects]);

  const displayedProjects = projects?.slice(0, 4);

  const navigateToProjectsPage = () => {
    navigate('/projects');
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        projects
      </h1>
      <div className="max-w-2xl">
        {displayedProjects?.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            link={project.link || "#"}
            logo={project.previewImageUrl || "/default.png"}
            description={project.description || ""}
            preview={project.previewImageUrl || "/default.png"}
            id={project.id}
          />
        ))}
        
        {projects && projects.length > 3 && (
          <button
            onClick={navigateToProjectsPage}
            className="mt-4 text-[var(--link)] hover:underline text-sm font-medium"
          >
            Show all projects
          </button>
        )}
      </div>
    
    </div>
  );
};

export default Projects;