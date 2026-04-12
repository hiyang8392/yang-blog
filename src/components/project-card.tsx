import { ExternalLinkIcon } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/generated/prisma";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col p-5 rounded-xl border border-border bg-card transition-colors hover:bg-accent">
      <a
        href={project.demoUrl || project.githubUrl || ""}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 font-semibold text-lg text-foreground"
      >
        {project.name}
      </a>
      {project.description && (
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      )}
      <div className="mt-auto flex items-center gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLinkIcon className="size-4" />
            Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
