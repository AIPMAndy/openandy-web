"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, getAllTags } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("全部");
  const tags = getAllTags();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "全部" || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <header className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-light text-text-primary mb-2">
            AI 酋长Andy 的开源项目
          </h1>
          <p className="text-base text-text-muted">
            用 AI 改变世界，让每个人都能驾驭 AI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            🔍
          </span>
          <input
            type="text"
            placeholder="搜索项目..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-muted"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                selectedTag === tag
                  ? "bg-text-primary text-white border-text-primary"
                  : "bg-white text-text-muted border-border hover:border-text-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-sm text-text-muted">
          <span>共 {projects.length} 个项目</span>
          <span>•</span>
          <span>{projects.reduce((sum, p) => sum + parseInt(p.stars), 0)} stars</span>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-text-muted">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm">没有找到相关项目</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-muted">
            © 2026 AI 酋长Andy ·{" "}
            <a
              href="https://github.com/AIPMAndy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
            {" · "}
            <span>微信：AI PMAndy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
