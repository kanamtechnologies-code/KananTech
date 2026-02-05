"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { ArrowRight, MessageCircle, RefreshCcw, Send, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import MessageBubble from "./MessageBubble";
import QuickReplies from "./QuickReplies";
import { siteMap } from "@/lib/chat/siteMap";
import { TextStreamChatTransport, type UIMessage } from "ai";

const STORAGE_KEY = "kanam_concierge_messages_v1";
const LEAD_KEY = "kanam_concierge_lead_v1";

const QUICK_ACTIONS = [
  "What do you do?",
  "I need tech consulting",
  "Help me pick a learning track",
  "Try a free lesson",
  "Corporate training",
  "CompTIA A+ path",
  "Python + AI path",
  "Excel + Power BI path",
  "Book a call",
];

function hasHighIntent(text: string) {
  const t = text.toLowerCase();
  return (
    t.includes("hire") ||
    t.includes("need help") ||
    t.includes("want help") ||
    t.includes("corporate training") ||
    t.includes("enroll") ||
    t.includes("sign up") ||
    t.includes("work with you") ||
    t.includes("consulting")
  );
}

type Lead = { name: string; email: string; need: string };

export default function ChatPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const transition = useMemo(
    () => ({ duration: prefersReducedMotion ? 0 : 0.22 }),
    [prefersReducedMotion]
  );

  const [lead, setLead] = useState<Lead | null>(null);
  const [leadMode, setLeadMode] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
  const [leadForm, setLeadForm] = useState<Lead>({ name: "", email: "", need: "" });

  const initialMessages: UIMessage[] = [
    {
      id: "welcome",
      role: "assistant",
      parts: [
        {
          type: "text",
          text:
            "Hi — I’m Kanam Concierge. I can help you navigate the site, choose a learning track, try a free lesson, or talk through consulting.\n\nWhat are you trying to do today?",
        },
      ],
    },
  ];

  const { messages, setMessages, sendMessage, status, error, clearError } = useChat<UIMessage>({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
    messages: initialMessages,
  });

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  // Load persisted state once
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed as UIMessage[]);
      }
    } catch {
      // ignore
    }
    try {
      const rawLead = window.localStorage.getItem(LEAD_KEY);
      if (rawLead) setLead(JSON.parse(rawLead));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist messages
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const reset = () => {
    setMessages(initialMessages);
    setInput("");
    setLeadMode(false);
    setPendingUserMessage(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const pickQuickReply = async (text: string) => {
    setInput(text);
    await sendMessage({ text });
    setInput("");
  };

  const interceptAndSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    if (!lead && !leadMode && hasHighIntent(text)) {
      setLeadMode(true);
      setPendingUserMessage(text);
      setInput("");
      return;
    }

    await sendMessage({ text });
    setInput("");
  };

  const submitLead = async () => {
    const name = leadForm.name.trim();
    const email = leadForm.email.trim();
    const need = leadForm.need.trim();
    if (!name || !email || !need) return;

    const nextLead = { name, email, need };
    setLead(nextLead);
    setLeadMode(false);
    setLeadForm({ name: "", email: "", need: "" });
    if (typeof window !== "undefined") window.localStorage.setItem(LEAD_KEY, JSON.stringify(nextLead));

    const context = pendingUserMessage ? `\nOriginal message: ${pendingUserMessage}` : "";
    setPendingUserMessage(null);

    await sendMessage({
      text: `Lead info:\nName: ${name}\nEmail: ${email}\nNeed: ${need}${context}`,
    });
  };

  const helperLinks = useMemo(() => {
    // small, stable list for the header/footer area
    const find = (href: string) => siteMap.routes.find((r) => r.href === href);
    return [
      find("/consulting"),
      find("/learning"),
      find("/lab"),
      find("/contact"),
    ].filter(Boolean) as { label: string; href: string; description: string }[];
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Kanam Concierge chat"
        >
          <button
            type="button"
            className="absolute inset-0 bg-primary-text/30"
            onClick={onClose}
            aria-label="Close chat overlay"
          />

          <motion.div
            initial={{ y: prefersReducedMotion ? 0 : 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: prefersReducedMotion ? 0 : 24, opacity: 0 }}
            transition={transition}
            className="relative w-full sm:w-[420px] lg:w-[460px] max-h-[85vh] bg-white rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-white/95 backdrop-blur-sm flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-primary flex items-center justify-center shadow-sm">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary-text">Kanam Concierge</div>
                  <div className="text-xs text-secondary-text">Consulting + Learning Help</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="p-2 rounded-lg text-secondary-text hover:text-primary-text hover:bg-section-bg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                  aria-label="Reset chat"
                  title="Reset chat"
                >
                  <RefreshCcw size={18} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-secondary-text hover:text-primary-text hover:bg-section-bg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div ref={scrollRef} className="px-4 py-4 space-y-4 overflow-auto max-h-[58vh] sm:max-h-[60vh]">
              {error && (
                <div className="bg-white border border-border rounded-xl p-4">
                  <div className="text-sm font-semibold text-primary-text mb-1">Chat is unavailable</div>
                  <div className="text-sm text-secondary-text">
                    The assistant can’t respond right now. Most commonly this means <code className="text-xs bg-section-bg border border-border rounded px-1.5 py-0.5">OPENAI_API_KEY</code> isn’t set.
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => clearError()}
                      className="px-4 py-2.5 border border-border text-secondary-text font-semibold rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors"
                    >
                      Try again
                    </button>
                    <Link
                      href="/contact"
                      className="px-4 py-2.5 bg-emerald-primary text-white font-semibold rounded-xl hover:bg-emerald-hover transition-all text-center shadow-sm hover:shadow-md"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              )}

              {messages.length <= 2 && (
                <div className="bg-section-bg border border-border rounded-xl p-4">
                  <div className="text-xs font-semibold text-primary-text mb-2">Quick actions</div>
                  <QuickReplies items={QUICK_ACTIONS} onPick={pickQuickReply} />
                  <div className="mt-3 text-[11px] text-muted-text">
                    Tip: try “Help me pick a learning track” or “Try a free lesson”.
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {leadMode && (
                <div className="bg-emerald-tint border border-emerald-primary/30 rounded-2xl p-4">
                  <div className="text-sm font-semibold text-emerald-dark mb-2">
                    Quick details so we can follow up
                  </div>
                  <div className="grid gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-dark mb-1" htmlFor="lead-name">
                        Name
                      </label>
                      <input
                        id="lead-name"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-emerald-primary/30 rounded-lg bg-white focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-dark mb-1" htmlFor="lead-email">
                        Email
                      </label>
                      <input
                        id="lead-email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-emerald-primary/30 rounded-lg bg-white focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
                        placeholder="you@company.com"
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-dark mb-1" htmlFor="lead-need">
                        What do you need help with?
                      </label>
                      <textarea
                        id="lead-need"
                        value={leadForm.need}
                        onChange={(e) => setLeadForm((p) => ({ ...p, need: e.target.value }))}
                        className="w-full px-3 py-2 border border-emerald-primary/30 rounded-lg bg-white focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
                        placeholder="Goal + timeline (if you have one)…"
                        rows={3}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={submitLead}
                        className="px-4 py-2.5 bg-emerald-primary text-white font-semibold rounded-xl hover:bg-emerald-hover transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                      >
                        Send details
                      </button>
                      <Link
                        href="/contact"
                        className="px-4 py-2.5 border border-emerald-primary/30 text-emerald-dark font-semibold rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
                      >
                        Or use the contact form
                      </Link>
                    </div>
                    <div className="text-[11px] text-emerald-dark/80">
                      AI assistant — verify critical details.
                    </div>
                  </div>
                </div>
              )}

              {!leadMode && lead && (
                <div className="bg-section-bg border border-border rounded-xl p-4">
                  <div className="text-xs font-semibold text-primary-text mb-2">Saved details</div>
                  <div className="text-sm text-secondary-text">
                    {lead.name} • {lead.email}
                  </div>
                  <div className="mt-2 flex gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
                    >
                      Contact Us <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / input */}
            <div className="px-4 py-3 border-t border-border bg-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {helperLinks.slice(0, 3).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-xs font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <form onSubmit={interceptAndSend} className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="sr-only" htmlFor="chat-input">
                    Message Kanam Concierge
                  </label>
                  <textarea
                    id="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-xl focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors resize-none"
                    placeholder="Ask about consulting, learning tracks, or try lessons…"
                    disabled={isLoading || leadMode}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || leadMode || !input.trim()}
                  className="h-[44px] px-4 bg-emerald-primary text-white font-semibold rounded-xl hover:bg-emerald-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                >
                  <Send size={16} />
                  Send
                </button>
              </form>
              <div className="mt-2 text-[11px] text-muted-text">
                AI assistant — verify critical details.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

