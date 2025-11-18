import React, { useState } from "react";
import { ExternalLink, Github, Twitter, Linkedin, Mail } from "lucide-react";
import type { GetUserPortfolioV3Response } from "@/types/portfolio.types";

interface LinkWithTooltipProps {
  text: string;
  description: React.ReactNode;
  href?: string;
  imageUrl?: string;
}

const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  text,
  description,
  href,
  imageUrl,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {href ? (
        <a
          href={href}
          className="text-[var(--link)] hover:underline cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <span className="text-[var(--link)] hover:underline cursor-pointer">
          {text}
        </span>
      )}

      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 left-0 top-8 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {imageUrl && (
            <div className="w-full h-40 overflow-hidden rounded mb-2">
              <img
                src={imageUrl}
                alt="tooltip illustration"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-1">{description}</div>
          <span className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></span>
        </div>
      )}
    </span>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-[var(--link)] text-sm hover:underline flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <svg
        className="w-3 h-3 ml-0.5"
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
    </a>
  );
};

interface ProjectLinkProps {
  href: string;
  name: string;
  description: string;
}

const ProjectLink: React.FC<ProjectLinkProps> = ({
  href,
  name,
  description,
}) => {
  return (
    <div className="mb-1">
      <a
        href={href}
        className="text-[var(--link)] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
      <span className="text-xs text-[var(--muted-foreground)] ml-1">
        — {description}
      </span>
    </div>
  );
};

interface SongLinkProps {
  title: string;
  artist: string;
  href: string;
}

const SongLink: React.FC<SongLinkProps> = ({ title, artist, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="inline-flex items-center mr-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mr-1">
        <img
          src="/cd.png"
          alt="CD icon"
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isHovered ? "rotate-[360deg]" : ""
          }`}
        />
      </div>
      <a
        href={href}
        className="text-[var(--link)] text-sm hover:underline mr-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
      <span className="text-[var(--muted-foreground)] text-xs">by</span>
      <span className="font-medium text-xs ml-1">{artist}</span>
    </div>
  );
};

interface HeroProps {
  portfolioData: GetUserPortfolioV3Response;
}

const Hero: React.FC<HeroProps> = ({ portfolioData }) => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        hi, i&apos;m {portfolioData.firstName.toLowerCase()}.
      </h1>
      <div className="max-w-2xl">
        <p className="mb-4 text-base text-[var(--foreground)]">
          {portfolioData.headerText || "i build things on the internet."}
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          {portfolioData.skillset?.slice(0, 4).map((skill, index) => (
            <span key={skill.id}>
              <LinkWithTooltip
                text={skill.name.toLowerCase()}
                description={skill.description || skill.name}
              />
              {index < (portfolioData.skillset?.slice(0, 4).length || 0) - 1 && ", "}
            </span>
          ))} — whatever gets the job done.
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          {portfolioData.description}
        </p>

        <div className="mb-8">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">projects</p>
          <div className="space-y-1">
            {portfolioData.projects?.slice(0, 3).map((project) => (
              <ProjectLink
                key={project.id}
                href={project.projectLink || "#"}
                name={project.title}
                description={project.description}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">
            find me around
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {portfolioData.links?.map((link) => (
              <SocialLink
                key={link.id}
                href={link.linkUrl || "#"}
                label={link.linkTitle?.toLowerCase() || ""}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-[var(--muted-foreground)] mb-2">
            listening to
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <SongLink
              href="#"
              title="Blinding Lights"
              artist="The Weeknd"
            />
            <SongLink
              href="#"
              title="Levitating"
              artist="Dua Lipa"
            />
            <SongLink
              href="#"
              title="Stay"
              artist="The Kid LAROI & Justin Bieber"
            />
          </div>
        </div>
        <SocialLink href="https://duckwhocodes.hashnode.dev/" label="Blog" />
      </div>
    </div>
  );
};

export default Hero;