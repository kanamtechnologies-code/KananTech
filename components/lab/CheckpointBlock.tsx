"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";
import type { Checkpoint } from "@/content/lab/lessons";

export default function CheckpointBlock({
  checkpoint,
  onAttempted,
}: {
  checkpoint: Checkpoint;
  onAttempted?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [shortAnswer, setShortAnswer] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const feedback = useMemo(() => {
    if (!submitted) return null;

    if (checkpoint.type === "single_select") {
      const isCorrect = selected === checkpoint.correctOptionId;
      return {
        isCorrect,
        explanation: checkpoint.explanation,
      };
    }

    const normalized = shortAnswer.toLowerCase();
    const hits = checkpoint.expectedKeywords.filter((k) => normalized.includes(k.toLowerCase())).length;
    const isGood = hits >= Math.max(1, Math.ceil(checkpoint.expectedKeywords.length / 3));
    return {
      isCorrect: isGood,
      explanation: isGood
        ? "Good direction. Compare your answer to the rubric and example below to tighten it."
        : "Not quite yet. Use the rubric and example below, then refine your answer.",
    };
  }, [checkpoint, selected, shortAnswer, submitted]);

  const submit = () => {
    setSubmitted(true);
    onAttempted?.();
  };

  return (
    <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardCheck size={18} className="text-emerald-primary" />
        <h3 className="text-lg font-semibold text-primary-text">Checkpoint</h3>
      </div>

      <p className="text-sm text-secondary-text mb-4">{checkpoint.prompt}</p>

      {checkpoint.type === "single_select" ? (
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {checkpoint.options.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
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
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-primary-text mb-2" htmlFor="checkpoint-answer">
            Your answer
          </label>
          <textarea
            id="checkpoint-answer"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
            placeholder="Type your response..."
          />
        </div>
      )}

      <button
        type="button"
        onClick={submit}
        className="px-5 py-2.5 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
      >
        Submit checkpoint
      </button>

      {feedback && (
        <div className={`mt-4 rounded-xl border p-4 ${feedback.isCorrect ? "bg-emerald-tint border-emerald-primary/30" : "bg-white border-border"}`}>
          <div className="flex items-start gap-2">
            {feedback.isCorrect ? (
              <CheckCircle2 size={18} className="text-emerald-primary mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className="text-sm font-semibold text-primary-text">
                {feedback.isCorrect ? "Good" : "Needs work"}
              </p>
              <p className="text-sm text-secondary-text">{feedback.explanation}</p>
            </div>
          </div>

          {checkpoint.type === "short_answer" && (
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="bg-section-bg border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-primary-text mb-2">Rubric</p>
                <ul className="space-y-2">
                  {checkpoint.rubric.map((r) => (
                    <li key={r} className="text-sm text-secondary-text flex items-start gap-2">
                      <span className="text-muted-text mt-1">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-section-bg border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-primary-text mb-2">Example solution</p>
                <p className="text-sm text-secondary-text whitespace-pre-line">{checkpoint.exampleAnswer}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

