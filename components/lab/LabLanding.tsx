"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { labTracks } from "@/content/lab/tracks";
import { getTrackLessons } from "@/content/lab/lessons";
import TrackCard from "@/components/lab/TrackCard";
import LabCtaBlock from "@/components/lab/LabCtaBlock";
import { getContinueSlug, getTrackCompletionPercent } from "@/components/lab/LocalProgress";

export default function LabLanding() {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const cards = useMemo(() => {
    return labTracks.map((t) => {
      const lessons = getTrackLessons(t.id);
      const lessonSlugs = lessons.map((l) => l.slug);
      const progress = ready ? getTrackCompletionPercent(t.id, lessonSlugs) : 0;
      const continueSlug = ready ? getContinueSlug(t.id, lessonSlugs) : (lessonSlugs[0] ?? "");
      const continueHref = `/lab/${t.id}/${continueSlug}`;
      return { track: t, lessonsCount: lessons.length, progress, continueHref };
    });
  }, [ready]);

  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-tint text-emerald-dark border border-emerald-primary/30 text-sm font-semibold mb-4">
            <GraduationCap size={16} />
            Kanam Learning Lab
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-6 text-balance">
            Try lessons like a real school.
          </h1>
          <p className="text-lg sm:text-xl text-secondary-text max-w-3xl mx-auto text-balance">
            Explore polished, interactive lesson previews across Coding, Data, and IT (CompTIA A+). Progress saves automatically on this device.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lab/progress"
              className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              View your progress
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/learning"
              className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
            >
              Explore training programs
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {cards.map((c, index) => (
            <motion.div
              key={c.track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <TrackCard
                track={c.track}
                progressPercent={c.progress}
                lessonsCount={c.lessonsCount}
                continueHref={c.continueHref}
              />
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

