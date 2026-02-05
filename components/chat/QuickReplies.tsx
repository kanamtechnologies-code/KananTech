"use client";

export default function QuickReplies({
  items,
  onPick,
}: {
  items: string[];
  onPick: (text: string) => void;
}) {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onPick(t)}
          className="px-3 py-1.5 rounded-full border border-border bg-section-bg text-xs font-semibold text-secondary-text hover:border-emerald-primary/40 hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
        >
          {t}
        </button>
      ))}
    </div>
  );
}

