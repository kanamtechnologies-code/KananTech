"use client";

import { useEffect, useMemo, useState } from "react";
import type { LabLesson } from "@/content/lab/lessons";
import type { LabTrack } from "@/content/lab/tracks";
import LabLayout from "@/components/lab/LabLayout";
import LessonSidebar from "@/components/lab/LessonSidebar";
import LessonPlayer from "@/components/lab/LessonPlayer";
import ProgressBar from "@/components/lab/ProgressBar";
import { getTrackCompletionPercent, loadLabProgress } from "@/components/lab/LocalProgress";

export default function LabLessonShell({
  track,
  lessons,
  lesson,
  nextHref,
}: {
  track: LabTrack;
  lessons: LabLesson[];
  lesson: LabLesson;
  nextHref: string | null;
}) {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const state = loadLabProgress();
    const completed = state.byTrack[track.id].completedLessons ?? [];
    setCompletedSlugs(completed);
    setProgressPercent(getTrackCompletionPercent(track.id, lessons.map((l) => l.slug)));
  }, [lessons, track.id, lesson.slug]);

  const rightRail = useMemo(() => {
    return (
      <div className="bg-card-bg border border-border rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-primary-text mb-3">Track progress</p>
        <ProgressBar value={progressPercent} />
        <p className="mt-4 text-xs text-muted-text">
          Progress saves to local storage on this device.
        </p>
      </div>
    );
  }, [progressPercent]);

  return (
    <LabLayout
      sidebar={
        <LessonSidebar
          track={track}
          lessons={lessons}
          activeSlug={lesson.slug}
          completedSlugs={completedSlugs}
        />
      }
      rightRail={rightRail}
    >
      <LessonPlayer track={track} lesson={lesson} nextHref={nextHref} />
    </LabLayout>
  );
}

