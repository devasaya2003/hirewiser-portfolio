import React from "react";

// Work component - displays work experience data from root file
const Work: React.FC<{ experiences: any }> = ({ experiences }) => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">work</h1>
      <div className="max-w-2xl">
        {!experiences || experiences.length === 0 ? (
          <div className="text-center py-12 border border-[var(--border)] rounded-lg bg-[var(--muted)]">
            <p className="text-[var(--muted-foreground)]">No work experience to display</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">Check if experience data exists in portfolio</p>
          </div>
        ) : (
          experiences?.map((experience) => (
            <div key={experience.id} className="mb-8">
              <div className="flex items-start">
                {experience.companyLogo && (
                  <div className="w-10 h-10 mr-4 flex-shrink-0">
                    {experience.companyWebsite ? (
                      <a
                        href={experience.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src={experience.companyLogo}
                          alt={`${experience.company} logo`}
                          className="w-full h-full rounded-full object-cover border border-[var(--border)]"
                        />
                      </a>
                    ) : (
                      <img
                        src={experience.companyLogo}
                        alt={`${experience.company} logo`}
                        className="w-full h-full rounded-full object-cover border border-[var(--border)]"
                      />
                    )}
                  </div>
                )}

                <div>
                  <h3 className="text-base font-medium text-[var(--foreground)]">
                    {experience.companyWebsite ? (
                      <a
                        href={experience.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      experience.company
                    )}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">
                    {experience.position}
                  </p>
                  <ul className="text-sm text-[var(--foreground)] list-disc pl-4 marker:text-[var(--muted-foreground)]">
                    {experience.description && (
                      <li className="mb-2">
                        {experience.description}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Work;