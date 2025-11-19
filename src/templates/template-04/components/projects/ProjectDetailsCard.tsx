import React from "react";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectMeta } from "./ProjectMeta";


interface ProjectLink {
  id: string;
  linkTitle: string;
  linkUrl: string;
}

interface ProjectSkill {
  id: string;
  skill: {
    id: string;
    name: string;
  };
}

interface Project {
  id: string;
  title: string;
  description?: string;
  previewImageUrl?: string;
  status?: string;
  startedAt?: string;
  timeline?: string;
  role?: string;
  team?: string;
  projectLinks?: ProjectLink[];
  projectSkillset?: ProjectSkill[];
}

interface ProjectDetailsCardProps {
  project: Project;
  relatedProjects?: Project[];
}

export function ProjectDetailsCard({
  project,
  relatedProjects = [],
}: ProjectDetailsCardProps) {
  const technologies = project.projectSkillset || [];
  const projectLinks = project.projectLinks || [];

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="space-y-4">
        {project.previewImageUrl && (
          <div className="rounded-xl overflow-hidden border border-[var(--border)]">
            <img
              src={project.previewImageUrl}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">{project.title}</h1>
          <div className="flex items-center gap-4 text-[var(--muted-foreground)]">
            {project.status && (
              <span className="font-medium">{project.status}</span>
            )}
            {project.startedAt && (
              <span>{new Date(project.startedAt).getFullYear()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Project Meta */}
      <ProjectMeta
        timeline={project.timeline}
        role={project.role}
        team={project.team}
        status={project.status}
      />

      {/* Description */}
      <ProjectDescription description={project.description} />

      {/* Links Section */}
      <ProjectLinks projectLinks={projectLinks} />

      {/* Tech Stack */}
      <ProjectTechStack technologies={technologies} />

      {/* Related Projects */}
      <RelatedProjects projects={relatedProjects} />
    </div>
  );
}
