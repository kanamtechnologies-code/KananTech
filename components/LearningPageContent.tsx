"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, Laptop, Shield } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const tiles = [
  {
    title: "Corporate Learning",
    description: "Upskill teams with structured training tied to real work outcomes.",
    href: "/learning/corporate",
    icon: Users,
  },
  {
    title: "Personal Learning",
    description: "Clear learning tracks for individuals—no fluff, just progress.",
    href: "/learning/personal",
    icon: GraduationCap,
  },
  {
    title: "Children’s Coding Bootcamp",
    description: "Structured, safe instruction with real projects and clear goals.",
    href: "/learning/children",
    icon: Shield,
  },
] as const;

const tracks = [
  {
    title: "Coding (Python + AI tools)",
    icon: Laptop,
    bullets: [
      "Who it’s for: beginners through early-intermediate learners",
      "Outcomes: build small apps, automate tasks, use AI tools responsibly",
      "Formats: corporate cohorts, 1:1 coaching, workshops",
    ],
  },
  {
    title: "Excel + Power BI (reporting)",
    icon: GraduationCap,
    bullets: [
      "Who it’s for: analysts, ops teams, program teams",
      "Outcomes: cleaner reporting, dashboards, faster decision support",
      "Formats: team workshops, multi-week cohorts, office hours",
    ],
  },
  {
    title: "CompTIA A+ (cert prep)",
    icon: Shield,
    bullets: [
      "Who it’s for: aspiring IT support + entry-level IT roles",
      "Outcomes: structured prep, hands-on practice, readiness planning",
      "Formats: cohorts, guided study plan, review sessions",
    ],
  },
  {
    title: "Children’s bootcamp",
    icon: Users,
    bullets: [
      "Who it’s for: families looking for structured learning and real projects",
      "Outcomes: fundamentals, problem-solving, confidence building",
      "Formats: cohorts + guided projects",
    ],
  },
] as const;

const delivery = [
  { title: "Live online", description: "Interactive sessions with hands-on practice." },
  { title: "In-person", description: "Available based on location and cohort size." },
  { title: "Hybrid", description: "Combine live sessions with structured async work." },
  { title: "Team workshops", description: "Short, outcome-based workshops for teams." },
] as const;

function DualCtas() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
      <a
        href="#contact"
        className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
      >
        Book a 15-min Call
        <ArrowRight size={18} />
      </a>
      <a
        href="#contact"
        className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
      >
        Contact Us
      </a>
    </div>
  );
}

export default function LearningPageContent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card-bg/70 backdrop-blur-sm shadow-sm">
            {/* Video accent (Learning) */}
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
                  <source src="/videos/LearningVid.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-white/55" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/40 to-emerald-tint/30" />
              </div>
            )}

            <div className="relative p-8 sm:p-10 lg:p-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-6 text-balance">
                Training that’s practical, structured, and built for real outcomes.
              </h1>
              <p className="text-lg sm:text-xl text-secondary-text max-w-3xl mx-auto text-balance mb-8">
                Corporate upskilling + personal learning tracks (coding, Excel/Power BI, CompTIA A+), plus a children’s bootcamp—delivered with clear goals and hands-on work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-4">
                <Link
                  href="/learning/corporate"
                  className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Explore Corporate Training
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/learning/personal"
                  className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary hover:bg-white/60 transition-colors text-center"
                >
                  Explore Personal Learning
                </Link>
              </div>

              <Link
                href="/learning/children"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
              >
                Children’s bootcamp details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tiles */}
        <section className="py-10">
          <div className="grid md:grid-cols-3 gap-6">
            {tiles.map((t, index) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-primary rounded-md">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-primary-text">{t.title}</h2>
                  </div>
                  <p className="text-secondary-text mb-5">{t.description}</p>
                  <Link
                    href={t.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
                  >
                    Learn more <ArrowRight size={16} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* What we teach */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">What we teach</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Practical tracks with clear outcomes—so learners can apply skills immediately.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((trk, index) => {
              const Icon = trk.icon;
              return (
                <motion.div
                  key={trk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-section-bg rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} className="text-emerald-primary" />
                    <h3 className="text-lg font-semibold text-primary-text">{trk.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {trk.bullets.map((b) => (
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

        {/* Delivery */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">How training is delivered</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Choose the format that fits your team’s schedule. Custom curriculum is available for organizations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {delivery.map((d, index) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-primary-text mb-2">{d.title}</h3>
                <p className="text-secondary-text">{d.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA + related links */}
        <section className="py-16">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 bg-card-bg rounded-2xl border border-border border-t-2 border-t-gold-500 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary-text mb-3">Want a training plan that actually sticks?</h2>
              <p className="text-secondary-text mb-6 max-w-2xl">
                Tell us your audience, timeline, and what outcomes matter most. We’ll recommend a track and format that fits.
              </p>
              <DualCtas />
            </div>

            <div className="bg-section-bg rounded-2xl border border-border p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-3">Related links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/learning/corporate" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                    Corporate programs
                  </Link>
                </li>
                <li>
                  <Link href="/learning/personal" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                    Personal tracks
                  </Link>
                </li>
                <li>
                  <Link href="/learning/children" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                    Children’s bootcamp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

