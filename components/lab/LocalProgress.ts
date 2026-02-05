"use client";

import type { LabTrackId } from "@/content/lab/tracks";

const STORAGE_KEY = "kanam_learning_lab_progress_v1";

export type QuizScore = { correct: number; total: number };

export type LabProgressState = {
  byTrack: Record<
    LabTrackId,
    {
      completedLessons: string[];
      quizScores: Record<string, QuizScore>;
      recent: { slug: string; completedAt: number }[];
    }
  >;
};

const emptyState: LabProgressState = {
  byTrack: {
    coding: { completedLessons: [], quizScores: {}, recent: [] },
    data: { completedLessons: [], quizScores: {}, recent: [] },
    "a-plus": { completedLessons: [], quizScores: {}, recent: [] },
  },
};

function safeParse(json: string | null): unknown {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function loadLabProgress(): LabProgressState {
  if (typeof window === "undefined") return emptyState;
  const raw = safeParse(window.localStorage.getItem(STORAGE_KEY));

  if (!raw || typeof raw !== "object") return emptyState;
  const obj = raw as Partial<LabProgressState>;
  if (!obj.byTrack || typeof obj.byTrack !== "object") return emptyState;

  // Merge (forward compatible)
  return {
    byTrack: {
      coding: { ...emptyState.byTrack.coding, ...(obj.byTrack as any).coding },
      data: { ...emptyState.byTrack.data, ...(obj.byTrack as any).data },
      "a-plus": { ...emptyState.byTrack["a-plus"], ...(obj.byTrack as any)["a-plus"] },
    },
  };
}

export function saveLabProgress(state: LabProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function markLessonComplete(trackId: LabTrackId, slug: string) {
  const state = loadLabProgress();
  const track = state.byTrack[trackId];
  if (!track.completedLessons.includes(slug)) {
    track.completedLessons = [slug, ...track.completedLessons];
    track.recent = [{ slug, completedAt: Date.now() }, ...track.recent].slice(0, 8);
    saveLabProgress(state);
  }
}

export function setQuizScore(trackId: LabTrackId, lessonSlug: string, score: QuizScore) {
  const state = loadLabProgress();
  state.byTrack[trackId].quizScores[lessonSlug] = score;
  saveLabProgress(state);
}

export function isLessonCompleted(trackId: LabTrackId, slug: string): boolean {
  const state = loadLabProgress();
  return state.byTrack[trackId].completedLessons.includes(slug);
}

export function getTrackCompletionPercent(trackId: LabTrackId, lessonSlugs: string[]): number {
  const state = loadLabProgress();
  const completed = state.byTrack[trackId].completedLessons;
  if (lessonSlugs.length === 0) return 0;
  const count = lessonSlugs.filter((s) => completed.includes(s)).length;
  return Math.round((count / lessonSlugs.length) * 100);
}

export function getContinueSlug(trackId: LabTrackId, lessonSlugs: string[]): string | null {
  const state = loadLabProgress();
  const completed = new Set(state.byTrack[trackId].completedLessons);
  const next = lessonSlugs.find((s) => !completed.has(s));
  return next ?? (lessonSlugs[0] ?? null);
}

export function getRecentCompletions(trackId: LabTrackId) {
  const state = loadLabProgress();
  return state.byTrack[trackId].recent ?? [];
}

