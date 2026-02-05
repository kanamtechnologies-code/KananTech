"use client";

import { ArrowRight } from "lucide-react";

export default function LabCtaBlock() {
  return (
    <div className="bg-card-bg rounded-2xl border border-border border-t-2 border-t-gold-500 p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-primary-text mb-3">
        Want the full program or corporate training?
      </h2>
      <p className="text-secondary-text mb-6 max-w-2xl">
        These sample lessons are free previews. If you want a structured track, guided practice, or team training, we’ll recommend the right format.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/#contact"
          className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          Book a 15-min Call
          <ArrowRight size={18} />
        </a>
        <a
          href="/#contact"
          className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
        >
          Contact Us
        </a>
      </div>
      <p className="text-xs text-muted-text mt-4">
        Note: lessons include cert-style practice questions; they are not official certification materials.
      </p>
    </div>
  );
}

