"use client";

import { motion } from "framer-motion";
import { Workflow, BarChart3, Brain, Globe } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Link from "next/link";

const solutions = [
  {
    icon: Globe,
    title: "Websites & Landing Pages",
    description: "Fast, modern sites that look premium and convert",
    href: "/?topic=Conversion-ready%20websites#contact",
    examples: [
      "Marketing sites + landing pages",
      "Performance, SEO basics, analytics",
      "Forms, booking, and integrations",
    ],
  },
  {
    icon: Workflow,
    title: "Automation & Workflows",
    description: "Streamline repetitive tasks across your tech stack",
    href: "/?topic=Automation%20%26%20workflow%20systems#contact",
    examples: [
      "Google Workspace automation (Sheets, Docs, Forms)",
      "Slack and email workflow automation",
      "Internal operations and data sync",
    ],
  },
  {
    icon: BarChart3,
    title: "Dashboards & Internal Tools",
    description: "Real-time visibility into operations and performance",
    href: "/?topic=Dashboards%20%26%20reporting#contact",
    examples: [
      "Custom reporting dashboards",
      "Admin and management tools",
      "Data aggregation and visualization",
    ],
  },
  {
    icon: Brain,
    title: "Applied AI",
    description: "Practical AI that assists without the hype",
    href: "/?topic=Applied%20AI%20(practical)#contact",
    examples: [
      "Automated report generation and summaries",
      "Smart matching and recommendations",
      "Intelligent data processing",
    ],
  },
];

export default function Solutions() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-section-bg/70 backdrop-blur-sm">
      <div className="mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card-bg/70 backdrop-blur-sm shadow-sm">
            {/* Video accent (Solutions) */}
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
                <div className="absolute inset-0 bg-white/55" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-emerald-tint/30" />
              </div>
            )}

            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">
                    What We Build
                  </h2>
                  <p className="text-lg text-secondary-text max-w-2xl">
                    Websites and systems that eliminate manual work and improve visibility.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-border bg-white/70 backdrop-blur-sm p-5 shadow-sm">
                    <p className="text-sm font-semibold text-primary-text mb-2">Built for momentum</p>
                    <ul className="space-y-2">
                      {[
                        "Clear reporting and dashboards",
                        "Reliable intake and follow-ups",
                        "Automation that reduces manual work",
                      ].map((item) => (
                        <li key={item} className="text-sm text-secondary-text flex items-start gap-2">
                          <span className="text-muted-text mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Link
                  href={solution.href}
                  className="group block h-full bg-card-bg rounded-lg p-6 border border-border hover:border-emerald-primary/30 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                  aria-label={`Learn more about ${solution.title}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-primary rounded-md">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-text group-hover:text-emerald-primary transition-colors">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-secondary-text mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.examples.map((example, i) => (
                      <li key={i} className="text-sm text-secondary-text flex items-start gap-2">
                        <span className="text-muted-text mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 text-sm font-semibold text-emerald-primary">
                    Learn more →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

