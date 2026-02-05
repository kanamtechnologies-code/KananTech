"use client";

import { ReactNode, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function LabLayout({
  sidebar,
  children,
  rightRail,
}: {
  sidebar: ReactNode;
  children: ReactNode;
  rightRail?: ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  const transition = useMemo(
    () => ({ duration: prefersReducedMotion ? 0 : 0.22 }),
    [prefersReducedMotion]
  );

  return (
    <div className="pt-24 lg:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-semibold text-secondary-text hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            aria-label="Open lesson list"
          >
            <PanelLeftOpen size={18} />
            Lessons
          </button>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">{sidebar}</div>
          <div className={rightRail ? "lg:col-span-6" : "lg:col-span-9"}>{children}</div>
          {rightRail && <div className="lg:col-span-3">{rightRail}</div>}
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          {children}
          {rightRail && <div className="mt-6">{rightRail}</div>}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 z-[60]"
            role="dialog"
            aria-modal="true"
            aria-label="Lesson list"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-primary-text/30"
              aria-label="Close drawer"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={transition}
              className="absolute left-0 top-0 bottom-0 w-[86%] max-w-sm bg-white border-r border-border p-4 overflow-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-primary-text">Lesson list</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-secondary-text hover:text-primary-text hover:bg-section-bg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                  aria-label="Close lesson list"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>
              {sidebar}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

