"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import type { LabLesson } from "@/content/lab/lessons";
import type { LabTrack } from "@/content/lab/tracks";
import CompletionBanner from "./CompletionBanner";
import QuizBlock from "./QuizBlock";
import CheckpointBlock from "./CheckpointBlock";
import ApplyItBlock from "./ApplyItBlock";
import { isLessonCompleted, markLessonComplete, setQuizScore, loadLabProgress } from "./LocalProgress";

export default function LessonPlayer({
  track,
  lesson,
  nextHref,
}: {
  track: LabTrack;
  lesson: LabLesson;
  nextHref: string | null;
}) {
  const [completed, setCompleted] = useState(false);
  const [quizScore, setLocalQuizScore] = useState<{ correct: number; total: number } | null>(null);

  useEffect(() => {
    setCompleted(isLessonCompleted(lesson.trackId, lesson.slug));

    const state = loadLabProgress();
    const score = state.byTrack[lesson.trackId].quizScores[lesson.slug];
    if (score) setLocalQuizScore(score);
  }, [lesson.slug, lesson.trackId]);

  const headerMeta = useMemo(
    () => ({ minutes: lesson.estimatedMinutes, sections: lesson.sections.length }),
    [lesson.estimatedMinutes, lesson.sections.length]
  );

  const markComplete = () => {
    markLessonComplete(lesson.trackId, lesson.slug);
    setCompleted(true);
  };

  return (
    <article className="space-y-6">
      <div className="bg-card-bg rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-tint text-emerald-dark border border-emerald-primary/30">
            {track.shortTitle} track
          </span>
          <span className="inline-flex items-center gap-2 text-xs text-muted-text">
            <Clock size={14} />
            {headerMeta.minutes} min
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-text mb-3">{lesson.title}</h1>
        <p className="text-secondary-text">
          Free preview lesson. Mark it complete to unlock a clean “next lesson” flow.
        </p>
      </div>

      <CompletionBanner completed={completed} quizSummary={quizScore} />

      {/* Sections */}
      <div className="space-y-4">
        {lesson.sections.map((s) => (
          <section key={s.heading} className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary-text mb-2">{s.heading}</h2>
            <p className="text-sm text-secondary-text whitespace-pre-line">{s.body}</p>
          </section>
        ))}
      </div>

      <QuizBlock
        questions={lesson.quiz}
        onScoreChange={(score) => {
          setLocalQuizScore(score);
          setQuizScore(lesson.trackId, lesson.slug, score);
        }}
      />

      <CheckpointBlock checkpoint={lesson.checkpoint} onAttempted={() => {}} />

      <ApplyItBlock applyIt={lesson.applyIt} />

      {/* Completion + Next */}
      <div className="bg-card-bg rounded-2xl border border-border border-t-2 border-t-gold-500 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-primary-text mb-2">Finish this lesson</h3>
        <p className="text-secondary-text mb-4">
          These sample lessons are free previews. Want the full program or corporate training? Book a quick call or contact us.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={markComplete}
            className="px-5 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
          >
            <CheckCircle2 size={18} />
            Mark lesson complete
          </button>

          <a
            href="/#contact"
            className="px-5 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
          >
            Contact Us
          </a>

          {nextHref && (
            <Link
              href={nextHref}
              className={`px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                completed
                  ? "bg-section-bg border border-border text-secondary-text hover:border-emerald-primary hover:text-emerald-primary"
                  : "bg-section-bg border border-border text-muted-text cursor-not-allowed"
              }`}
              aria-disabled={!completed}
              tabIndex={completed ? 0 : -1}
              onClick={(e) => {
                if (!completed) e.preventDefault();
              }}
            >
              Next lesson <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

