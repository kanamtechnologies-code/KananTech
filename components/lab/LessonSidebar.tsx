"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import type { LabTrack } from "@/content/lab/tracks";
import type { LabLesson } from "@/content/lab/lessons";

export default function LessonSidebar({
  track,
  lessons,
  activeSlug,
  completedSlugs,
}: {
  track: LabTrack;
  lessons: LabLesson[];
  activeSlug: string;
  completedSlugs: string[];
}) {
  const completed = new Set(completedSlugs);

  return (
    <div className="bg-card-bg border border-border rounded-2xl p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold text-emerald-primary uppercase tracking-wider">Track</p>
        <h2 className="text-lg font-semibold text-primary-text">{track.title}</h2>
        <p className="text-sm text-secondary-text mt-1">{track.description}</p>
      </div>

      <nav aria-label={`${track.title} lessons`}>
        <ul className="space-y-2">
          {lessons.map((l) => {
            const isActive = l.slug === activeSlug;
            const isDone = completed.has(l.slug);
            return (
              <li key={l.slug}>
                <Link
                  href={`/lab/${track.id}/${l.slug}`}
                  className={`flex items-start gap-2 rounded-xl px-3 py-2 border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                    isActive
                      ? "border-emerald-primary bg-emerald-tint"
                      : "border-transparent hover:border-emerald-primary/30 hover:bg-section-bg"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 size={18} className="text-emerald-primary" />
                    ) : (
                      <Circle size={18} className="text-muted-text" />
                    )}
                  </span>
                  <span className="flex-1">
                    <span className={`block text-sm font-semibold ${isActive ? "text-emerald-dark" : "text-primary-text"}`}>
                      {l.title}
                    </span>
                    <span className="block text-xs text-muted-text">{l.estimatedMinutes} min</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

