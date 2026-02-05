"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import QuizBlock from "@/components/lab/QuizBlock";
import type { QuizQuestion } from "@/content/lab/lessons";

export default function TrackPreviewPage({
  title,
  subtitle,
  objectives,
  estimatedMinutes,
  startHref,
  quizQuestions,
  recommended,
}: {
  title: string;
  subtitle: string;
  objectives: string[];
  estimatedMinutes: number;
  startHref: string;
  quizQuestions: QuizQuestion[];
  recommended: {
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}) {
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);

  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-tint text-emerald-dark border border-emerald-primary/30 text-sm font-semibold mb-4">
            <GraduationCap size={16} />
            Free Lab Preview
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4 text-balance">{title}</h1>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto text-balance">{subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-card-bg border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary-text mb-3">Objectives</h2>
            <ul className="space-y-2">
              {objectives.map((o) => (
                <li key={o} className="text-sm text-secondary-text flex items-start gap-2">
                  <span className="text-muted-text mt-1">•</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-section-bg border border-border rounded-2xl p-6">
            <div className="text-sm font-semibold text-primary-text mb-2">Estimated time</div>
            <div className="text-3xl font-bold text-emerald-primary mb-3">{estimatedMinutes} min</div>
            <Link
              href={startHref}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Start Lesson
              <ArrowRight size={18} />
            </Link>
            <div className="mt-3 text-xs text-muted-text">
              These sample lessons are free previews (not official certification materials).
            </div>
          </div>
        </div>

        <QuizBlock
          title="Mini quiz (preview)"
          questions={quizQuestions}
          onScoreChange={(s) => setScore(s)}
        />

        {score && (
          <div className="mt-8 bg-card-bg border border-border border-t-2 border-t-gold-500 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold-50 border border-gold-500/30 rounded-lg">
                <Sparkles size={18} className="text-gold-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary-text mb-2">Get a recommended track</h3>
                <p className="text-secondary-text mb-4">
                  Score: <span className="font-semibold text-primary-text">{score.correct}</span> / {score.total}.{" "}
                  {score.correct >= Math.ceil(score.total * 0.67)
                    ? "Nice. You’re ready to continue with the full track preview."
                    : "Good start. If you want a smoother ramp, start with fundamentals and build confidence."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={recommended.primaryHref}
                    className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    {recommended.primaryLabel}
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href={recommended.secondaryHref}
                    className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
                  >
                    {recommended.secondaryLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

