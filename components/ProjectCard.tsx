"use client";

import { ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card-bg rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
    >
      <div className={`relative ${project.featured ? "border-t-2 border-t-gold-500 pt-4 -mt-4 -mx-6 px-6" : ""}`}>
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          {project.featured && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gold-50 text-gold-800 border border-gold-500/30">
              Featured
            </span>
          )}
          {project.live && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-tint text-emerald-dark border border-emerald-primary/30">
              Live
            </span>
          )}
        </div>

        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-section-bg border border-border">
            <Image
              src={project.thumbnail}
              alt={`${project.name} thumbnail`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-primary-text mb-2 group-hover:text-emerald-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-secondary-text mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-section-bg text-muted-text border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Link */}
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-primary group-hover:gap-3 transition-all">
            <span>View site</span>
            <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </a>
  );
}

