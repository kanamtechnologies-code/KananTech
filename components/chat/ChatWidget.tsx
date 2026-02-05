"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import ChatPanel from "./ChatPanel";

const OPEN_KEY = "kanam_concierge_open_v1";

export default function ChatWidget() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(OPEN_KEY);
      if (saved === "1") setOpen(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(OPEN_KEY, open ? "1" : "0");
    } catch {
      // ignore
    }
  }, [open]);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[60]">
        <AnimatePresence>
          {!open && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              onClick={() => setOpen(true)}
              className="group relative h-14 w-14 rounded-2xl bg-emerald-primary text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
              aria-label="Open Kanam Concierge chat"
            >
              <MessageCircle size={22} className="mx-auto" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full border-2 border-white" />
              <span className="pointer-events-none absolute -inset-1 rounded-2xl border border-emerald-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

