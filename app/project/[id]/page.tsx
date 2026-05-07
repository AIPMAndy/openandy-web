"use client";

import { getProjectById } from "@/lib/projects";
import Link from "next/link";
import { use } from "react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-text-secondary">项目未找到</p>
          <Link href="/" className="text-sm text-text-muted mt-2 block hover:text-text-primary">
            返回发现页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Back link */}
        <Link href="/" className="text-sm text-text-muted mb-6 inline-block hover:text-text-primary">
          ← 返回发现页
        </Link>

        {/* Header */}
        <div className="bg-white border border-border rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-bg flex items-center justify-center text-3xl border border-border">
              {project.emoji}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-normal text-text-primary mb-2">
                {project.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span>⭐ {project.stars} stars</span>
                <span>{project.language}</span>
                <span>by {project.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white border border-border rounded-lg p-6 mb-6">
          <h2 className="text-base font-medium text-text-primary mb-3">
            项目简介
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Review */}
        <div className="bg-white border border-border rounded-lg p-6 mb-6 border-l-4 border-l-text-primary">
          <h2 className="text-base font-medium text-text-primary mb-3">
            💬 AI酋长Andy 点评
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.review}
          </p>
        </div>

        {/* Tags */}
        <div className="bg-white border border-border rounded-lg p-6 mb-6">
          <h2 className="text-base font-medium text-text-primary mb-3">标签</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-bg text-text-muted border border-border rounded"
              >
                {tag}
              </span>
            ))}
            {project.trending && (
              <span className="px-3 py-1 text-xs bg-text-primary text-white rounded">
                🔥 Trending
              </span>
            )}
            {project.featured && (
              <span className="px-3 py-1 text-xs bg-text-primary text-white rounded">
                ⭐ Featured
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="text-base font-medium text-text-primary mb-3">
            相关链接
          </h2>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-bg border border-border rounded-lg hover:border-text-muted transition-colors"
          >
            <svg className="w-6 h-6 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <div>
              <p className="text-sm text-text-primary font-medium">GitHub 仓库</p>
              <p className="text-xs text-text-muted">{project.github}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
