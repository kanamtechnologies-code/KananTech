"use client";

import { motion } from "framer-motion";
import { Search, FileText, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "1",
    title: "Quick Discovery",
    description: "15–30 minute call to understand your manual processes and pain points",
  },
  {
    icon: FileText,
    number: "2",
    title: "Scope & Proposal",
    description: "Fixed deliverables, timeline, and pricing—no surprises",
  },
  {
    icon: Wrench,
    number: "3",
    title: "Build Sprint",
    description: "Weekly updates as we build. You stay in the loop throughout",
  },
  {
    icon: Rocket,
    number: "4",
    title: "Launch & Optimize",
    description: "Handoff, training, and optional monthly support for ongoing needs",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-section-bg">
      <div className="mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">
            How It Works
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto mb-4">
            Clear steps, fast delivery, no complexity
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card-bg rounded-lg p-6 border border-border h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-emerald-primary text-white rounded-full font-bold text-lg">
                      {step.number}
                    </div>
                    <Icon size={24} className="text-emerald-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-secondary-text text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-300 transform -translate-y-1/2" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

