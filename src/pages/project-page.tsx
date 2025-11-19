import ProjectPage04 from "@/templates/template-04/project-page";

function ProjectPage() {
  // const templateName = portfolioData?.template?.name;
  const templateName = "template-04";

  switch (templateName) {
    // case "template-03":
    //   return <ProjectPage03 />;
    case "template-04":
      return <ProjectPage04 />;
    default:
      return (
        <div className="max-w-4xl mx-auto py-20 text-red-500 font-semibold">
          The template you're looking for does not exist.
        </div>
      );
  }
}

export default ProjectPage;
