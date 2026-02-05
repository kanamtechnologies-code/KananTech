"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";

const included = [
  "Discovery session to map your manual processes",
  "Custom automation, dashboard, or tool build",
  "Launch and handoff documentation",
  "One week of post-launch support",
];

const outcomes = [
  "5–20+ hours saved per week",
  "Faster reporting and visibility",
  "Fewer missed follow-ups",
  "Consistent, automated workflows",
];

export default function Offer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="offer" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">
            Kanam Automation Sprint
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            A fixed-scope engagement that delivers working automation in 2–4 weeks
          </p>
        </motion.div>

        {/* Section 1: What's Included - Slides from left */}
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="bg-card-bg rounded-lg border-t-2 border-t-gold-500 border border-border p-8 sm:p-10 shadow-md relative">
            <div className="absolute top-4 right-4">
              <Star size={20} className="text-gold-500 fill-gold-500" />
            </div>
            <h3 className="text-xl font-semibold text-primary-text mb-6">What&apos;s Included</h3>
            <ul className="space-y-4">
              {included.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="flex items-start gap-3"
                >
                  <Check size={20} className="text-emerald-primary mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-text">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Section 2: Typical Outcomes - Slides from right */}
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="bg-section-bg rounded-lg border border-border p-8 sm:p-10 shadow-md">
            <h3 className="text-xl font-semibold text-primary-text mb-6">Typical Outcomes</h3>
            <ul className="space-y-4">
              {outcomes.map((outcome, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="flex items-start gap-3"
                >
                  <Check size={20} className="text-emerald-primary mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-text">{outcome}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Section 3: Timeline & CTA - Slides from left */}
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="bg-card-bg rounded-lg border border-border p-8 sm:p-10 shadow-md">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary-text mb-4">Timeline & Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-primary text-white flex items-center justify-center text-sm font-semibold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-primary-text">Quick Discovery Call</p>
                    <p className="text-sm text-secondary-text">15–30 minutes to understand your needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-primary text-white flex items-center justify-center text-sm font-semibold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-primary-text">Fixed-Scope Proposal</p>
                    <p className="text-sm text-secondary-text">Clear deliverables, timeline, and investment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-primary text-white flex items-center justify-center text-sm font-semibold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-primary-text">Build & Launch</p>
                    <p className="text-sm text-secondary-text">2–4 weeks from kickoff to working automation</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Book a Call
              <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

