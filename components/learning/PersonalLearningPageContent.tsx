"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Laptop, BarChart3, Shield, Clock } from "lucide-react";

const tracks = [
  {
    title: "Coding: Python foundations → AI tools usage",
    icon: Laptop,
    who: "New learners, career switchers, and teams needing practical automation skills.",
    ableToDo: [
      "Write small scripts to reduce repetitive work",
      "Build simple tools and workflows",
      "Use AI tools to draft, summarize, and structure work responsibly",
    ],
    time: "2–4 hours/week for steady progress (self-paced + optional live sessions).",
    topic: "Personal learning — Coding (Python + AI tools)",
  },
  {
    title: "Excel + Power BI: fundamentals → dashboards → cert prep",
    icon: BarChart3,
    who: "Ops leaders, analysts, program teams, and anyone responsible for reporting.",
    ableToDo: [
      "Clean and model data more consistently",
      "Build dashboards with clear KPIs",
      "Reduce time spent on manual reporting cycles",
    ],
    time: "2–3 hours/week for fundamentals; add time for dashboard projects.",
    topic: "Personal learning — Excel + Power BI",
  },
  {
    title: "CompTIA A+: full exam prep track",
    icon: Shield,
    who: "Aspiring IT support roles and early-career IT professionals.",
    ableToDo: [
      "Follow a structured study plan",
      "Practice with hands-on lab-style exercises",
      "Track readiness and close knowledge gaps",
    ],
    time: "4–6 hours/week depending on your timeline and starting point.",
    topic: "Personal learning — CompTIA A+",
  },
] as const;

function InterestCtas({ topic }: { topic: string }) {
  const href = `/?topic=${encodeURIComponent(topic)}#contact`;
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-stretch sm:items-center">
      <Link
        href={href}
        className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
      >
        Join the interest list
        <ArrowRight size={18} />
      </Link>
      <a
        href="#contact"
        className="px-6 py-3 border border-border text-secondary-text font-medium rounded-xl hover:border-emerald-primary hover:text-emerald-primary transition-colors text-center"
      >
        Contact Us
      </a>
    </div>
  );
}

export default function PersonalLearningPageContent() {
  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-emerald-primary mb-3">Personal Learning</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-6 text-balance">
            Learn skills you can use immediately.
          </h1>
          <p className="text-lg sm:text-xl text-secondary-text max-w-3xl mx-auto text-balance">
            Choose a track with clear outcomes and a practical pace. This is designed for steady progress and real application—not vague inspiration.
          </p>
          <div className="mt-6">
            <Link href="/learning" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors">
              Back to Learning <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Tracks */}
        <section className="py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">Choose a track</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Pick the path that matches your goals and your timeline.
            </p>
          </motion.div>

          <div className="space-y-6">
            {tracks.map((t, index) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-card-bg rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-tint border border-emerald-primary/20 rounded-md">
                          <Icon size={20} className="text-emerald-dark" />
                        </div>
                        <h3 className="text-2xl font-semibold text-primary-text">{t.title}</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-semibold text-primary-text mb-2">Who it’s for</p>
                          <p className="text-secondary-text">{t.who}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary-text mb-2">Suggested time</p>
                          <p className="text-secondary-text flex items-start gap-2">
                            <Clock size={16} className="text-emerald-primary mt-1 flex-shrink-0" />
                            <span>{t.time}</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-sm font-semibold text-primary-text mb-2">What you’ll be able to do</p>
                        <ul className="space-y-2">
                          {t.ableToDo.map((b) => (
                            <li key={b} className="text-sm text-secondary-text flex items-start gap-2">
                              <span className="text-muted-text mt-1">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:w-[340px] bg-section-bg border border-border rounded-2xl p-6">
                      <p className="text-sm font-semibold text-primary-text mb-2">Next step</p>
                      <p className="text-secondary-text mb-4">
                        Join the interest list and tell us your goal and timeline. We’ll reply with the best starting point and format.
                      </p>
                      <InterestCtas topic={t.topic} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Related links */}
        <section className="py-16">
          <div className="bg-section-bg rounded-2xl border border-border p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-3">Related links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learning/corporate" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                  Corporate programs
                </Link>
              </li>
              <li>
                <Link href="/learning/children" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                  Children’s bootcamp
                </Link>
              </li>
              <li>
                <Link href="/consulting" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                  Consulting services
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

