"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Laptop,
  Shield,
  Users,
  Video,
  Building2,
  Layers3,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const whyBullets = [
  "Live instruction + Q&A (no passive video-only learning)",
  "Industry-certified instructors",
  "Structured labs + practical projects",
  "Role-relevant scenarios (ops, reporting, support)",
  "Responsible AI use (guardrails, verification, policy-ready)",
] as const;

const trainingSolutions = [
  {
    id: "ai",
    icon: Brain,
    title: "AI for Productivity (Practical)",
    description:
      "Help teams use AI tools to draft, summarize, and accelerate work—while keeping judgment and verification human-owned.",
    outcomes: [
      "Better prompting habits and clearer requests",
      "Verification checklist and quality standards",
      "Reusable templates for updates, briefs, and reporting",
      "Guardrails for sensitive data and policy alignment",
    ],
    topic: "Corporate Learning — AI for Productivity",
  },
  {
    id: "excel",
    icon: BarChart3,
    title: "Excel + Power BI (Reporting & Dashboards)",
    description:
      "Reduce reporting friction and improve dashboard literacy so teams can communicate clearly and act faster.",
    outcomes: [
      "Cleaner reporting cycles and fewer broken spreadsheets",
      "KPI-first dashboard habits for decision-makers",
      "Measures vs columns and model fundamentals (Power BI)",
      "Better consistency in definitions and team standards",
    ],
    topic: "Corporate Learning — Excel + Power BI",
  },
  {
    id: "python",
    icon: Laptop,
    title: "Python Essentials (Automation for Business)",
    description:
      "Practical Python foundations for teams who want to reduce manual work and build simple internal tools safely.",
    outcomes: [
      "Core Python patterns for real work (input, validation, loops)",
      "Debugging habits and safe iteration",
      "Small automations that reduce repetitive tasks",
      "A shared baseline so teams can maintain what they ship",
    ],
    topic: "Corporate Learning — Python Essentials",
  },
  {
    id: "aplus",
    icon: Shield,
    title: "CompTIA A+ Prep (IT Support Foundations)",
    description:
      "Cert-style preparation (not official materials) that strengthens support fundamentals and improves consistency in troubleshooting.",
    outcomes: [
      "Repeatable troubleshooting methodology and documentation habits",
      "Hardware, OS, and support tool fundamentals",
      "Role-ready practice questions with explanations",
      "Shared standards for handoffs and escalations",
    ],
    topic: "Corporate Learning — CompTIA A+",
  },
] as const;

const deliveryOptions = [
  {
    icon: Video,
    title: "Live Remote Training",
    bestFor: "Distributed teams and tight schedules",
    format: "Live sessions with guided labs + Q&A",
    outcomes: "Faster adoption with minimal disruption",
  },
  {
    icon: Building2,
    title: "On-site Workshops",
    bestFor: "Teams that benefit from in-room collaboration",
    format: "Workshop-style delivery with hands-on exercises",
    outcomes: "Alignment, shared standards, and momentum",
  },
  {
    icon: Layers3,
    title: "Hybrid Cohorts",
    bestFor: "Teams that need depth and repetition",
    format: "Live instruction + structured practice between sessions",
    outcomes: "Sustained skill growth and measurable behavior change",
  },
] as const;

const outcomesGrid = [
  "Faster reporting cycles",
  "Better dashboard literacy",
  "Less manual workflow overhead",
  "Better tool adoption",
  "Shared team standards",
] as const;

const engagementSteps = [
  { step: "1", title: "Discovery", desc: "Align audience, current gaps, and what outcomes matter." },
  { step: "2", title: "Plan", desc: "Confirm topics, labs, pacing, and delivery format for your schedule." },
  { step: "3", title: "Live Delivery", desc: "Human-led sessions with structured labs and role-relevant examples." },
  { step: "4", title: "Wrap-up + Next Steps", desc: "Summarize results, share resources, and recommend the next path." },
] as const;

const whatWeNeed = [
  "Team size",
  "Current tools (Excel/Power BI, Google Workspace, Microsoft 365)",
  "Goals (what should change after training?)",
  "Schedule + time zone constraints",
] as const;

const faqItems: FAQItem[] = [
  {
    question: "What team sizes do you support?",
    answer:
      "We support small cohorts through larger teams. The format recommendation depends on size, time zones, and how hands-on you want labs to be.",
  },
  {
    question: "Can you tailor training to our tools and workflows?",
    answer:
      "Yes. We can shape labs around your environment (Excel/Power BI, Google Workspace, Microsoft 365) and your real scenarios so the learning transfers to day-to-day work.",
  },
  {
    question: "What if our team has mixed skill levels?",
    answer:
      "That’s common. We use structured labs with optional challenge paths, so beginners build confidence while advanced learners stay engaged.",
  },
  {
    question: "Do we get recordings or resources?",
    answer:
      "We provide structured resources and recommended next steps. Recordings depend on your delivery format and internal policy; we can align during planning.",
  },
  {
    question: "How do you handle AI safety in the workplace?",
    answer:
      "We teach responsible AI usage: verification habits, guardrails for sensitive data, and policy-ready practices so teams can use tools without creating risk.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on format, hours, and scope. We provide a quote after a short consultation so it matches your team size and outcomes.",
  },
];

function scrollLink(href: string) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function HeroCtas() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-stretch sm:items-center">
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollLink("#contact");
        }}
        className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
      >
        Book a Free Consultation
        <ArrowRight size={18} />
      </a>
      <a
        href="#training-solutions"
        onClick={(e) => {
          e.preventDefault();
          scrollLink("#training-solutions");
        }}
        className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
      >
        View Training Options
      </a>
    </div>
  );
}

export default function CorporateLearningPageContent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card-bg/70 backdrop-blur-sm shadow-sm mb-16"
        >
          {/* Video background (solutions) */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-40 saturate-150"
              >
                <source src="/videos/SolutionsVid.mp4" type="video/mp4" />
              </video>
              {/* Light overlay keeps readability */}
              <div className="absolute inset-0 bg-white/60" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/55 to-emerald-tint/25" />
            </div>
          )}

          <div className="relative p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-tint text-emerald-dark border border-emerald-primary/30 text-sm font-semibold mb-4">
                  <Users size={16} />
                  Corporate Learning
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-4 text-balance">
                  Upskill your team with human-led training and real outcomes.
                </h1>
                <p className="text-lg sm:text-xl text-secondary-text mb-6 text-balance">
                  Practical training for working professionals—built for immediate application. We teach AI as a productivity tool (used responsibly) alongside the fundamentals teams need for reporting, automation, and support.
                </p>

                <HeroCtas />
                <div className="mt-6">
                  <Link
                    href="/learning"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
                  >
                    Back to Learning <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right-side hero visual (corp guy) */}
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm bg-card-bg/60 backdrop-blur-sm">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-emerald-tint/30" />
                </div>

                <div className="relative">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
                    <Image
                      src="/images/corpguy.jpg"
                      alt="Corporate training"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 520px"
                      priority
                    />
                    <div className="absolute inset-0 bg-white/10" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-sm font-semibold text-primary-text mb-1">Human-led delivery</p>
                    <p className="text-sm text-secondary-text">
                      Live instruction, structured labs, and role-relevant scenarios—built to respect your team’s time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2) WHY KANAM */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">
              Human-first training that respects your team’s time.
            </h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              This is built for busy teams: live instruction, guided labs, and role-relevant scenarios that transfer to real work.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5">
              <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
                <p className="text-sm font-semibold text-emerald-primary mb-2">Our approach</p>
                <h3 className="text-xl font-semibold text-primary-text mb-3">Training that transfers to the job</h3>
                <p className="text-secondary-text mb-4">
                  We teach fundamentals and practical patterns your team can apply immediately—then reinforce with guided labs and clear standards.
                </p>
                <ul className="space-y-2 text-sm text-secondary-text">
                  {[
                    "Hands-on labs tied to real scenarios",
                    "Clear quality standards and definitions",
                    "Resources and next steps for continued adoption",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="text-muted-text mt-1">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {whyBullets.map((b) => (
                  <div key={b} className="bg-card-bg rounded-2xl border border-border p-5 shadow-sm flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-primary mt-0.5 flex-shrink-0" />
                    <p className="text-secondary-text">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3) TRAINING SOLUTIONS */}
        <section id="training-solutions" className="py-16 bg-section-bg/70 backdrop-blur-sm rounded-2xl border border-border px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">Training solutions</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Choose a program aligned to how your team actually works. We’ll recommend the best fit during consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 pb-4">
            {trainingSolutions.map((p, index) => {
              const Icon = p.icon;
              const href = `?topic=${encodeURIComponent(p.topic)}#contact`;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-primary rounded-md">
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-text">{p.title}</h3>
                  </div>
                  <p className="text-secondary-text mb-4">{p.description}</p>
                  <ul className="space-y-2 mb-5">
                    {p.outcomes.map((o) => (
                      <li key={o} className="text-sm text-secondary-text flex items-start gap-2">
                        <span className="text-muted-text mt-1">•</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
                  >
                    Ask about this program <ArrowRight size={16} />
                  </a>
                </motion.div>
              );
            })}
          </div>

          <p className="text-sm text-muted-text pb-6">
            Note: We recommend the best format based on team size, goals, and schedule.
          </p>
        </section>

        {/* 4) DELIVERY OPTIONS */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">Delivery options</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              We’ll recommend the right format based on team size, goals, and schedule.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {deliveryOptions.map((o, index) => {
              const Icon = o.icon;
              return (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-tint border border-emerald-primary/20 rounded-md">
                      <Icon size={20} className="text-emerald-dark" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-text">{o.title}</h3>
                  </div>
                  <div className="space-y-3 text-sm text-secondary-text">
                    <div>
                      <p className="font-semibold text-primary-text">Best for</p>
                      <p>{o.bestFor}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-text">Format</p>
                      <p>{o.format}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-text">Typical outcomes</p>
                      <p>{o.outcomes}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5) WHAT YOUR TEAM LEAVES WITH */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">What your team leaves with</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Outcomes that translate into day-to-day execution and cleaner team standards.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {outcomesGrid.map((o) => (
              <div key={o} className="bg-card-bg rounded-2xl border border-border p-5 shadow-sm">
                <p className="text-sm font-semibold text-primary-text">{o}</p>
                <p className="text-sm text-muted-text mt-2">
                  Clear habits and shared standards—so the team stays aligned after the sessions.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6) HOW ENGAGEMENT WORKS */}
        <section className="py-16 bg-section-bg/70 backdrop-blur-sm rounded-2xl border border-border px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">How engagement works</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              A simple, clear flow that keeps outcomes aligned and delivery predictable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
            {engagementSteps.map((s, index) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-tint border border-emerald-primary/20 text-emerald-dark flex items-center justify-center text-sm font-bold">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text">{s.title}</h3>
                </div>
                <p className="text-secondary-text">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary-text mb-3">What we need from you</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {whatWeNeed.map((w) => (
                <li key={w} className="text-sm text-secondary-text flex items-start gap-2">
                  <span className="text-muted-text mt-1">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7) FAQ */}
        <FAQSection id="corporate-faq" title="Corporate Learning FAQ" items={faqItems} />

        {/* 8) CTA BLOCK */}
        <section className="py-16">
          <div className="bg-card-bg rounded-2xl border border-border border-t-2 border-t-gold-500 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-primary-text mb-3">Ready to level up your team?</h2>
            <p className="text-secondary-text mb-6 max-w-2xl">
              Book a free consultation or contact us. Tell us your team size, goals, and schedule—we’ll recommend the best format and a practical starting point.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollLink("#contact");
                }}
                className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Book a Free Consultation
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollLink("#contact");
                }}
                className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

