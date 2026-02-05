"use client";

export default function ProgressBar({
  value,
  label,
}: {
  value: number; // 0..100
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label && <div className="text-sm font-medium text-secondary-text mb-2">{label}</div>}
      <div className="h-2.5 w-full rounded-full bg-section-bg border border-border overflow-hidden">
        <div
          className="h-full bg-emerald-primary transition-all"
          style={{ width: `${clamped}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-2 text-xs text-muted-text">{clamped}% complete</div>
    </div>
  );
}

