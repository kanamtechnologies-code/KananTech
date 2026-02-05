"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { ApplyIt } from "@/content/lab/lessons";

export default function ApplyItBlock({ applyIt }: { applyIt: ApplyIt }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [answer, setAnswer] = useState("");
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={18} className="text-gold-500" />
        <h3 className="text-lg font-semibold text-primary-text">Apply it</h3>
      </div>

      <p className="text-sm text-secondary-text whitespace-pre-line mb-4">{applyIt.prompt}</p>

      <label className="block text-sm font-semibold text-primary-text mb-2" htmlFor="apply-it-answer">
        Your response
      </label>
      <textarea
        id="apply-it-answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={5}
        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
        placeholder="Write your approach..."
      />

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowExample((v) => !v)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 rounded"
          aria-expanded={showExample}
        >
          {showExample ? "Hide example solution" : "Show example solution"}
          <ChevronDown size={16} className={`transition-transform ${showExample ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {showExample && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              className="mt-3 overflow-hidden"
            >
              <div className="bg-section-bg border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-primary-text mb-2">Example solution</p>
                <p className="text-sm text-secondary-text whitespace-pre-line">{applyIt.exampleSolution}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

