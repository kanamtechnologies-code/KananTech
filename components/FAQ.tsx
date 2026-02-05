"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who is this for?",
    answer: "Education and workforce organizations, operations leaders, program directors, and ops managers. Also small-to-mid teams that are drowning in manual work—spreadsheets, reporting, follow-ups, data entry.",
  },
  {
    question: "What tools do you work with?",
    answer: "Google Workspace (Sheets, Docs, Forms, Apps Script), Slack, email platforms, common APIs, and web-based tools. We can also build custom dashboards and internal tools using modern web technologies.",
  },
  {
    question: "Do you build custom software or only automation?",
    answer: "Both. We focus on automation and internal tools that solve specific operational problems. If you need a full custom software platform, we can discuss scope and timeline. Most clients need automation and dashboards, which we deliver in 2–4 weeks.",
  },
  {
    question: "How does pricing work?",
    answer: "Fixed-scope pricing. Starting at $2,500, with most builds in the $3,500–$7,500 range depending on complexity. We provide a clear proposal with deliverables before starting. No hourly surprises.",
  },
  {
    question: "What do you need from us?",
    answer: "Access to the tools/systems you use, a clear description of the manual process you want to automate, and availability for a discovery call and weekly check-ins during the build. We handle the technical work.",
  },
  {
    question: "What happens after launch?",
    answer: "One week of post-launch support is included. After that, we offer optional monthly retainer support for updates, new features, or additional automation. Many clients start with a sprint, then add monthly support for ongoing needs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-section-bg">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-border rounded-lg overflow-hidden bg-card-bg shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-section-bg transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-primary-text">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-muted-text transition-transform flex-shrink-0 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 text-secondary-text"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

