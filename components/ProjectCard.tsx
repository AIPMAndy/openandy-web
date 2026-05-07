"use client";

import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a 
      href={project.github} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-white border border-border p-5 rounded-lg hover:border-text-muted hover:shadow-sm transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.emoji}</span>
            <div>
              <h3 className="text-base font-normal text-text-primary">
                {project.name}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">{project.author}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-text-muted">
            <span className="text-xs">⭐</span>
            <span className="text-xs">{project.stars}</span>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-bg text-text-muted border border-border rounded"
            >
              {tag}
            </span>
          ))}
          {project.trending && (
            <span className="px-2 py-0.5 text-xs bg-text-primary text-white rounded">
              🔥 Trending
            </span>
          )}
          {project.featured && (
            <span className="px-2 py-0.5 text-xs bg-text-primary text-white rounded">
              ⭐ Featured
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
