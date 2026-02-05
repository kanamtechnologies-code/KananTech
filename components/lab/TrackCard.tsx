"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Brain, CheckCircle2, Cpu } from "lucide-react";
import type { LabTrack } from "@/content/lab/tracks";
import ProgressBar from "./ProgressBar";

function TrackIcon({ id }: { id: LabTrack["id"] }) {
  if (id === "coding") return <Brain size={20} className="text-white" />;
  if (id === "data") return <BarChart3 size={20} className="text-white" />;
  return <Cpu size={20} className="text-white" />;
}

export default function TrackCard({
  track,
  progressPercent,
  lessonsCount,
  continueHref,
}: {
  track: LabTrack;
  progressPercent: number;
  lessonsCount: number;
  continueHref: string;
}) {
  return (
    <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-primary rounded-md">
            <TrackIcon id={track.id} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary-text">{track.title}</h2>
            <p className="text-sm text-secondary-text">{lessonsCount} lessons • Free previews</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gold-50 text-gold-800 border border-gold-500/30">
          Learning Lab
        </span>
      </div>

      <p className="text-secondary-text mb-5">{track.description}</p>

      <div className="space-y-2 mb-5">
        {track.outcomes.slice(0, 3).map((o) => (
          <div key={o} className="flex items-start gap-2 text-sm text-secondary-text">
            <CheckCircle2 size={16} className="text-emerald-primary mt-0.5 flex-shrink-0" />
            <span>{o}</span>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <ProgressBar value={progressPercent} label="Your progress" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={continueHref}
          className="flex-1 px-5 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          {progressPercent > 0 ? "Continue track" : "Start track"}
          <ArrowRight size={18} />
        </Link>
        <Link
          href="/learning"
          className="flex-1 px-5 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
        >
          View programs
        </Link>
      </div>
    </div>
  );
}

