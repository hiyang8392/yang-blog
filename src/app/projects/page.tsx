import { Metadata } from "next";
import { getProjects } from "@/lib/db/data/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "所有專案",
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="py-8 sm:py-12">
      <h1 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        所有專案
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
