"use client";

import { CheckCircle2 } from "lucide-react";

export default function CompletionBanner({
  completed,
  quizSummary,
}: {
  completed: boolean;
  quizSummary?: { correct: number; total: number } | null;
}) {
  if (!completed && !quizSummary) return null;

  return (
    <div className="rounded-2xl border border-border bg-section-bg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${completed ? "text-emerald-primary" : "text-muted-text"}`}>
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary-text">
            {completed ? "Lesson complete" : "In progress"}
          </p>
          {quizSummary && (
            <p className="text-sm text-secondary-text">
              Quiz score: <span className="font-semibold text-primary-text">{quizSummary.correct}</span> /{" "}
              {quizSummary.total}
            </p>
          )}
        </div>
      </div>
      {completed && (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-tint text-emerald-dark border border-emerald-primary/30">
          Completed
        </span>
      )}
    </div>
  );
}

