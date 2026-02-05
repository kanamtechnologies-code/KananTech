"use client";

import { motion } from "framer-motion";

const examples = [
  {
    title: "Workforce Program Reporting Dashboard",
    problem: "Program director spending 8+ hours weekly compiling participant data from spreadsheets, emails, and forms into reports for funders.",
    solution: "Built automated dashboard that aggregates data from Google Sheets, Forms, and email into real-time reports with visualizations.",
    result: "Reporting time reduced from 8 hours to 30 minutes per week. Faster, more accurate funder updates.",
  },
  {
    title: "Student Follow-up Automation",
    problem: "Operations team manually tracking follow-ups across multiple spreadsheets, leading to missed check-ins and inconsistent communication.",
    solution: "Automated workflow that syncs student data, sends scheduled follow-up emails, and logs interactions in a central dashboard.",
    result: "Follow-up completion rate increased from 65% to 95%. Team saved 6 hours per week on manual tracking.",
  },
  {
    title: "Application Matching System",
    problem: "Small team manually matching applicants to programs using spreadsheets, taking days and prone to errors.",
    solution: "Custom matching tool with automated scoring and recommendations, integrated with existing data sources.",
    result: "Matching time reduced from 3 days to 2 hours. More consistent, data-driven placements.",
  },
];

export default function Proof() {
  return (
    <section id="results" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">
            What We Can Build Quickly
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Real examples of automation sprints that delivered results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-section-bg rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-primary-text mb-4">
                {example.title}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-primary-text mb-1">Problem:</p>
                  <p className="text-sm text-secondary-text">{example.problem}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-text mb-1">Solution:</p>
                  <p className="text-sm text-secondary-text">{example.solution}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-text mb-1">Result:</p>
                  <p className="text-sm text-secondary-text">{example.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-section-bg rounded-lg p-8 border border-border max-w-3xl mx-auto shadow-sm"
        >
          {/* Intentionally left empty (content removed per request) */}
        </motion.div>
      </div>
    </section>
  );
}

