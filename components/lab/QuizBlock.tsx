"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/content/lab/lessons";

export default function QuizBlock({
  title = "Knowledge Check",
  questions,
  onScoreChange,
}: {
  title?: string;
  questions: QuizQuestion[];
  onScoreChange?: (score: { correct: number; total: number }) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const score = useMemo(() => {
    const total = questions.length;
    const correct = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctOptionId ? 1 : 0), 0);
    return { correct, total };
  }, [answers, questions]);

  const allAnswered = Object.keys(answers).length === questions.length && questions.length > 0;

  // Fire score change when fully answered
  useEffect(() => {
    if (!allAnswered) return;
    onScoreChange?.(score);
  }, [allAnswered, onScoreChange, score]);

  return (
    <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-primary-text mb-4">{title}</h3>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = answers[q.id];
          const isCorrect = selected && selected === q.correctOptionId;
          const showFeedback = Boolean(selected);

          return (
            <div key={q.id} className="border border-border rounded-xl p-4 bg-section-bg">
              <p className="text-sm font-semibold text-primary-text mb-3">
                {idx + 1}. {q.prompt}
              </p>

              <div className="grid sm:grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const active = selected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                      className={`text-left px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                        active
                          ? "border-emerald-primary bg-emerald-tint text-emerald-dark"
                          : "border-border bg-white hover:border-emerald-primary/40"
                      }`}
                      aria-pressed={active}
                    >
                      <span className="text-sm text-secondary-text">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className={`mt-3 rounded-lg border p-3 ${isCorrect ? "bg-emerald-tint border-emerald-primary/30" : "bg-white border-border"}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="text-emerald-primary mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-primary-text">
                        {isCorrect ? "Correct" : "Not quite"}
                      </p>
                      <p className="text-sm text-secondary-text">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 text-sm text-secondary-text">
        Progress:{" "}
        <span className="font-semibold text-primary-text">{Math.min(Object.keys(answers).length, questions.length)}</span> / {questions.length} answered
      </div>
    </div>
  );
}

