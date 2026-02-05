"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Globe,
  Workflow,
} from "lucide-react";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const whatWeDo = [
  {
    icon: Workflow,
    title: "Automation & Workflow Systems",
    description: "Reduce manual steps and prevent missed handoffs with reliable workflows.",
    bullets: ["Intake + routing workflows", "Notifications + follow-ups", "Data sync across tools"],
    topic: "Automation & workflow systems",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Reporting",
    description: "Turn scattered data into visibility that leaders can actually use.",
    bullets: ["Operational dashboards", "Executive summaries", "Reporting pipelines + metrics"],
    topic: "Dashboards & reporting",
  },
  {
    icon: Globe,
    title: "Conversion-ready Websites",
    description: "Premium sites that load fast and move visitors to a clear next step.",
    bullets: ["Landing pages + marketing sites", "Forms + booking + integrations", "Analytics + SEO basics"],
    topic: "Conversion-ready websites",
  },
  {
    icon: Brain,
    title: "Applied AI (practical)",
    description: "Assist your team with summaries, triage, and structured outputs—no hype.",
    bullets: ["Auto-generated updates + summaries", "Smart categorization + routing", "Drafting + data cleanup"],
    topic: "Applied AI (practical)",
  },
] as const;

const engagementOptions = [
  {
    title: "Automation Sprint (2–4 weeks)",
    price: "Starting at $2,500",
    description:
      "A fixed-scope sprint to ship a specific workflow, dashboard, or internal tool quickly.",
    bullets: ["Clear deliverables", "Weekly check-ins", "Launch + handoff"],
  },
  {
    title: "Build + Optimize",
    price: "Most builds $3,500–$7,500 depending on scope",
    description:
      "Build the first version fast, then improve conversion, visibility, and reliability over time.",
    bullets: ["Project delivery", "Analytics + iteration", "Monthly support option"],
  },
  {
    title: "Advisory / Fractional",
    price: "Engagements tailored to your cadence",
    description:
      "Planning, oversight, and decision support for teams shipping systems and internal tools.",
    bullets: ["Roadmaps + priorities", "Risk/quality review", "Stakeholder alignment"],
  },
] as const;

const howWeWork = [
  {
    title: "Discovery",
    description: "Align outcomes, constraints, and what “done” means.",
  },
  {
    title: "Scope",
    description: "Define deliverables and timeline with no ambiguity.",
  },
  {
    title: "Build Sprint",
    description: "Ship quickly with tight feedback loops and clean execution.",
  },
  {
    title: "Launch + Support",
    description: "Go live confidently, then iterate based on real signals.",
  },
] as const;

const consultingFaqs: FAQItem[] = [
  {
    question: "Who is consulting for?",
    answer:
      "Operations leaders, program directors/TPMs, and teams that need cleaner execution: fewer manual steps, clearer visibility, and better follow-through. If a process lives in spreadsheets, inboxes, or Slack threads, it’s usually a fit.",
  },
  {
    question: "What tools/stack do you use?",
    answer:
      "We often work with Google Workspace (Sheets/Docs/Forms/Apps Script), Slack, email, and modern web tooling for dashboards and internal apps. We choose the simplest reliable approach that fits your team and constraints.",
  },
  {
    question: "Do you integrate with Google Workspace or Slack?",
    answer:
      "Yes. Common builds include form intake → routing → notifications, Slack-based approvals, and automated reporting summaries delivered on a schedule.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most fixed-scope sprints ship in 2–4 weeks. Larger builds vary, but we aim to get a working version live quickly and then iterate.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Fixed-scope pricing with clear deliverables. Sprints start at $2,500 and most builds land in the $3,500–$7,500 range depending on scope and complexity. You’ll see the plan before we start—no hourly surprises.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We include post-launch support for stabilization and handoff, then you can choose monthly support for iteration, enhancements, and ongoing improvements.",
  },
];

function CtaRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-stretch sm:items-center ${className}`}>
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

export default function ConsultingPageContent() {
  return (
    <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-10 items-center mb-16"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-6 text-balance">
              Websites and operational systems—delivered in weeks, not months.
            </h1>
            <p className="text-lg sm:text-xl text-secondary-text mb-8 text-balance">
              Kanam helps operations and program teams move faster with conversion-ready websites, automation that removes manual work, dashboards that improve visibility, and practical AI that supports execution.
            </p>

            <CtaRow className="mb-6" />

            <div className="mt-6">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
              >
                View Work <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="border-b border-border pb-4 mb-6">
              <p className="text-sm font-semibold text-emerald-primary">What you can expect</p>
              <h2 className="text-2xl font-semibold text-primary-text mt-1">A clean build + a clear handoff</h2>
              <p className="text-secondary-text mt-2">
                We focus on reliability, visibility, and outcomes—not busywork. You’ll know what’s shipping, when, and how success is measured.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Cycle time", value: "↓", note: "Fewer steps and faster follow-ups" },
                { label: "Visibility", value: "↑", note: "Dashboards + clear reporting" },
                { label: "Manual work", value: "↓", note: "Automations that stick" },
                { label: "Conversion", value: "↑", note: "Clear flows and UX polish" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl bg-section-bg border border-border p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-secondary-text">{k.label}</p>
                    <p className="text-lg font-bold text-emerald-primary">{k.value}</p>
                  </div>
                  <p className="text-sm text-muted-text">{k.note}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What we do */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">What we do</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Focused builds that remove friction, improve reporting, and make execution easier for your team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whatWeDo.map((item, index) => {
              const Icon = item.icon;
              const topicHref = `/?topic=${encodeURIComponent(item.topic)}#contact`;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-card-bg rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-primary rounded-md">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-text">{item.title}</h3>
                  </div>
                  <p className="text-secondary-text mb-4">{item.description}</p>
                  <ul className="space-y-2 mb-5">
                    {item.bullets.map((b) => (
                      <li key={b} className="text-sm text-secondary-text flex items-start gap-2">
                        <span className="text-muted-text mt-1">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={topicHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-primary hover:text-emerald-hover transition-colors"
                  >
                    Talk to us about this <ArrowRight size={16} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Engagement options */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">Engagement options</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              Simple options that keep scope clear and outcomes predictable.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {engagementOptions.map((opt, index) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`rounded-2xl border border-border p-6 shadow-sm ${
                  index === 0 ? "bg-card-bg border-t-2 border-t-gold-500" : "bg-section-bg"
                }`}
              >
                <h3 className="text-xl font-semibold text-primary-text mb-2">{opt.title}</h3>
                <p className="text-sm font-semibold text-emerald-primary mb-3">{opt.price}</p>
                <p className="text-secondary-text mb-4">{opt.description}</p>
                <ul className="space-y-2">
                  {opt.bullets.map((b) => (
                    <li key={b} className="text-sm text-secondary-text flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-primary mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How we work */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">How we work</h2>
            <p className="text-lg text-secondary-text max-w-3xl">
              A tight process that keeps decisions clear and delivery fast.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWork.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-tint border border-emerald-primary/20 text-emerald-dark flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text">{step.title}</h3>
                </div>
                <p className="text-secondary-text">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQSection id="consulting-faq" title="Consulting FAQ" items={consultingFaqs} />

        {/* CTA + Related links */}
        <section className="py-16">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 bg-card-bg rounded-2xl border border-border border-t-2 border-t-gold-500 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary-text mb-3">
                Ready to remove manual work and ship something reliable?
              </h2>
              <p className="text-secondary-text mb-6 max-w-2xl">
                Bring a process, report, or website flow that’s slowing you down. We’ll map the simplest path to a clean build and a clear outcome.
              </p>
              <CtaRow />
            </div>

            <div className="bg-section-bg rounded-2xl border border-border p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-3">Related links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/work" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                    View Work
                  </Link>
                </li>
                <li>
                  <Link href="/learning" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                    Explore Learning
                  </Link>
                </li>
                <li>
                  <Link href="/credentials" className="text-emerald-primary hover:text-emerald-hover font-semibold">
                    Credentials & Certifications
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

