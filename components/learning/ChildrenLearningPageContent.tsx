"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Users, Gamepad2, Laptop, CheckCircle2, Sparkles, GraduationCap, Brain, Code, Wand2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Image from "next/image";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const infoChips = [
  "Live, human-led instruction",
  "Beginner-friendly",
  "Projects kids actually build",
] as const;

const humanFirstBullets = [
  "Live teaching and guidance — kids can ask questions and get unstuck in real time.",
  "Fundamentals first — no copy/paste learning. We explain the “why,” not just the steps.",
  "Encouraging, structured practice — short exercises that build confidence each session.",
  "AI supports learning (clarify, brainstorm, debug) — it does not do the work for them.",
] as const;

const curriculumCards = [
  {
    icon: Code,
    title: "Coding Fundamentals",
    bullets: [
      "Inputs/outputs and simple logic",
      "Problem-solving habits and debugging",
      "Reading code and explaining what it does",
      "Small challenges that build confidence",
    ],
  },
  {
    icon: Brain,
    title: "Python for Beginners",
    bullets: [
      "Variables, types, and control flow",
      "Loops and lists (beginner level)",
      "Writing small programs step-by-step",
      "Safe habits: test, iterate, and explain",
    ],
  },
  {
    icon: Wand2,
    title: "AI Tools (Used the Right Way)",
    bullets: [
      "Prompting basics (clear asks, useful context)",
      "How to verify outputs and avoid “AI guessing”",
      "Using AI to clarify and debug responsibly",
      "Good digital judgment and boundaries",
    ],
  },
  {
    icon: Sparkles,
    title: "Projects & Creativity",
    bullets: [
      "Build projects that feel like real apps",
      "Add features and polish over time",
      "Explain your work and reflect on learning",
      "End with a simple “showcase” moment",
    ],
  },
] as const;

const projects = [
  "Rock-Paper-Scissors",
  "Quiz Game",
  "Random Story Generator",
  "Mini Habit Tracker",
  "Simple Text Adventure",
  "Beginner Chatbot (guided)",
] as const;

const howItWorks = [
  { step: "1", title: "Orientation + setup", desc: "We help with tooling basics so kids can start confidently." },
  { step: "2", title: "Live lessons (guided)", desc: "Short instruction + examples, led by real instructors." },
  { step: "3", title: "Practice + mini challenges", desc: "Hands-on exercises with support when they get stuck." },
  { step: "4", title: "Showcase day + next steps", desc: "Share what they built and recommend a next pathway." },
] as const;

const faqItems: FAQItem[] = [
  {
    question: "Who is this for?",
    answer:
      "Kids who are curious about coding and want a structured, beginner-friendly start. We adjust pacing and projects based on experience level.",
  },
  {
    question: "Does my child need experience?",
    answer:
      "No. The bootcamp is designed for beginners. If your child has experience, we’ll add challenge options and additional features to their projects.",
  },
  {
    question: "What will my child need (laptop, internet)?",
    answer:
      "A laptop and reliable internet are recommended. We’ll share simple setup guidance before the cohort starts so families aren’t guessing.",
  },
  {
    question: "How do you use AI with kids?",
    answer:
      "We teach AI as a learning tool: clarifying concepts, brainstorming ideas, and debugging responsibly. Kids still write and explain their own code. AI does not replace learning or effort.",
  },
  {
    question: "What do parents receive (updates, progress)?",
    answer:
      "Clear communication on what’s being covered and what your child is building. We focus on visible progress and confidence, not just “time spent.”",
  },
  {
    question: "What’s next after the bootcamp?",
    answer:
      "We’ll recommend a next step based on your child’s interests: more Python projects, a deeper fundamentals track, or a guided mini portfolio of beginner apps.",
  },
];

export default function ChildrenLearningPageContent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card-bg/70 backdrop-blur-sm shadow-sm mb-16"
        >
          {/* Video background (student) */}
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
                <source src="/videos/student.mp4" type="video/mp4" />
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
                  <GraduationCap size={16} />
                  Kids Coding Bootcamp
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-4 text-balance">
                  Real coding skills. Real instructors. Real confidence.
                </h1>
                <p className="text-lg sm:text-xl text-secondary-text mb-6 text-balance">
                  A beginner-friendly, structured bootcamp with live, human-led instruction. We teach AI in a useful and safe way—AI supports learning (clarify, brainstorm, debug), but it never replaces the work.
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {infoChips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-border text-sm text-secondary-text"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    Ask About the Next Cohort
                    <ArrowRight size={18} />
                  </a>
                  <Link
                    href="/lab"
                    className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary hover:bg-white/60 transition-colors text-center"
                  >
                    Try a Free Lesson
                  </Link>
                </div>
                <div className="mt-6">
                  <Link
                    href="/learning"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
                  >
                    Back to Learning <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm bg-card-bg/60 backdrop-blur-sm">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-emerald-tint/30" />
                </div>

                <div className="relative">
                  <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                    <Image
                      src="/videos/girlStudent.jpg"
                      alt="Student learning"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 520px"
                      priority
                    />
                    <div className="absolute inset-0 bg-white/10" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-sm font-semibold text-primary-text mb-1">Human-led instruction</p>
                    <p className="text-sm text-secondary-text">
                      Taught by industry-certified professionals. Clear goals, encouraging guidance, and projects kids can be proud of.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2) WHY HUMAN-FIRST */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">Human-led. Human-first.</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Kids learn faster when someone real is teaching, encouraging, and correcting habits early.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {humanFirstBullets.map((b, index) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm flex items-start gap-3"
              >
                <CheckCircle2 size={20} className="text-emerald-primary mt-0.5 flex-shrink-0" />
                <p className="text-secondary-text">{b}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3) WHAT THEY’LL LEARN */}
        <section className="py-16 bg-section-bg/70 backdrop-blur-sm rounded-2xl border border-border px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">What they’ll learn</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              A curriculum snapshot designed for beginners—with room to level up.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-2">
            {curriculumCards.map((c, index) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-primary rounded-md">
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-text">{c.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {c.bullets.map((b) => (
                      <li key={b} className="text-sm text-secondary-text flex items-start gap-2">
                        <span className="text-muted-text mt-1">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4) PROJECTS KIDS BUILD */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">Projects kids build</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Exciting, realistic projects that help kids see progress quickly.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, idx) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="bg-card-bg rounded-2xl border border-border p-5 shadow-sm flex items-start gap-3"
              >
                <div className="p-2 bg-emerald-tint border border-emerald-primary/20 rounded-md">
                  <Gamepad2 size={18} className="text-emerald-dark" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-text">{p}</p>
                  <p className="text-sm text-muted-text">Guided build with room to customize.</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-text">
            Projects are adjusted by age and experience.
          </p>
        </section>

        {/* 5) HOW IT WORKS */}
        <section className="py-16 bg-section-bg/70 backdrop-blur-sm rounded-2xl border border-border px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">How it works</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Live instruction (online or in-person depending on cohort), with a clear rhythm and checkpoints.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-2">
            {howItWorks.map((s, index) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
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
        </section>

        {/* 6) PARENT FAQ */}
        <FAQSection id="kids-faq" title="Parent FAQ" items={faqItems} />

        {/* 7) CTA BLOCK */}
        <section className="py-16">
          <div className="bg-card-bg rounded-2xl border border-border border-t-2 border-t-gold-500 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-primary-text mb-3">Ready to help your child build real skills?</h2>
            <p className="text-secondary-text mb-6 max-w-2xl">
              Tell us your child’s age and experience level, and we’ll recommend the right starting point.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Ask About the Next Cohort
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-text">
              Prefer to start with a preview? <Link href="/lab" className="text-emerald-primary font-semibold hover:text-emerald-hover">Try a free lesson</Link>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

