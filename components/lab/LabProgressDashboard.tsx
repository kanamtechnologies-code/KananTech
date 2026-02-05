"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";
import { labTracks } from "@/content/lab/tracks";
import { getLesson, getTrackLessons } from "@/content/lab/lessons";
import ProgressBar from "@/components/lab/ProgressBar";
import LabCtaBlock from "@/components/lab/LabCtaBlock";
import {
  getContinueSlug,
  getRecentCompletions,
  getTrackCompletionPercent,
} from "@/components/lab/LocalProgress";

export default function LabProgressDashboard() {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const trackSummaries = useMemo(() => {
    return labTracks.map((t) => {
      const lessons = getTrackLessons(t.id);
      const slugs = lessons.map((l) => l.slug);
      const percent = ready ? getTrackCompletionPercent(t.id, slugs) : 0;
      const continueSlug = ready ? getContinueSlug(t.id, slugs) : (slugs[0] ?? "");
      const continueHref = `/lab/${t.id}/${continueSlug}`;
      const recent = ready ? getRecentCompletions(t.id) : [];

      const recentResolved = recent
        .map((r) => {
          const lesson = getLesson(t.id, r.slug);
          if (!lesson) return null;
          return { ...r, title: lesson.title, href: `/lab/${t.id}/${lesson.slug}` };
        })
        .filter(Boolean) as { slug: string; completedAt: number; title: string; href: string }[];

      return { track: t, percent, continueHref, recent: recentResolved };
    });
  }, [ready]);

  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-tint text-emerald-dark border border-emerald-primary/30 text-sm font-semibold mb-4">
            <GraduationCap size={16} />
            Student Dashboard
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4">Your Learning Lab progress</h1>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto">
            Progress is saved in your browser on this device. Continue a track, revisit lessons, and keep momentum.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {trackSummaries.map((s, index) => (
            <motion.div
              key={s.track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-semibold text-primary-text">{s.track.shortTitle}</h2>
                <span className="text-xs font-semibold text-emerald-primary">{s.percent}%</span>
              </div>

              <ProgressBar value={s.percent} />

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href={s.continueHref}
                  className="px-5 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Continue
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href={`/lab/${s.track.id}/${s.track.lessonSlugs[0]}`}
                  className="px-5 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
                >
                  View lessons
                </Link>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-primary-text mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-muted-text" />
                  Recently completed
                </p>
                {s.recent.length === 0 ? (
                  <p className="text-sm text-muted-text">Complete a lesson to see it here.</p>
                ) : (
                  <ul className="space-y-2">
                    {s.recent.slice(0, 3).map((r) => (
                      <li key={`${s.track.id}-${r.slug}`}>
                        <Link href={r.href} className="text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors">
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <LabCtaBlock />
        </div>
      </div>
    </div>
  );
}

