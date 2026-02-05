"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Building2,
  Brain,
  Server,
  Briefcase,
} from "lucide-react";
import { credentials, categories, Credential, CredentialCategory } from "@/data/credentials";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const categoryIcons: Record<CredentialCategory, React.ReactNode> = {
  "Leadership & Delivery": <Briefcase size={16} />,
  AI: <Brain size={16} />,
  "IT Foundations": <Server size={16} />,
  Productivity: <Building2 size={16} />,
};

const categoryColors: Record<CredentialCategory, string> = {
  "Leadership & Delivery": "bg-emerald-tint text-emerald-dark border-emerald-primary/30",
  AI: "bg-blue-50 text-blue-700 border-blue-300",
  "IT Foundations": "bg-purple-50 text-purple-700 border-purple-300",
  Productivity: "bg-gold-500/10 text-gold-600 border-gold-500/30",
};

export default function CredentialsSection() {
  const [activeFilter, setActiveFilter] = useState<CredentialCategory | "All">("All");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredCredentials =
    activeFilter === "All"
      ? credentials
      : credentials.filter((cred) => cred.categories.includes(activeFilter));

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const copyCredentialId = (credentialId: string) => {
    navigator.clipboard.writeText(`CSM Credential ID: ${credentialId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-tint text-emerald-dark border-emerald-primary";
      case "Earned":
        return "bg-section-bg text-secondary-text border-border";
      case "Previously certified":
        return "bg-section-bg text-muted-text border-border";
      default:
        return "bg-section-bg text-secondary-text border-border";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Credentials & Certifications
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Certified in Agile delivery and AI leadership, with a foundation in IT and productivity systems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Filter credentials by category"
        >
          {(["All", ...categories] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFilter(category);
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                activeFilter === category
                  ? "bg-emerald-primary text-white shadow-md"
                  : "bg-section-bg text-secondary-text border border-border hover:border-emerald-primary hover:text-emerald-primary"
              }`}
              role="tab"
              aria-selected={activeFilter === category}
              aria-controls={`filter-${category}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Credentials Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredCredentials.map((credential, index) => (
              <CredentialCard
                key={credential.id}
                credential={credential}
                isExpanded={expandedCards.has(credential.id)}
                onToggle={() => toggleCard(credential.id)}
                onCopyId={copyCredentialId}
                copied={copied}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Trust Microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-muted-text max-w-2xl mx-auto">
            Credentials support structured delivery, clear stakeholder alignment, and reliable execution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

interface CredentialCardProps {
  credential: Credential;
  isExpanded: boolean;
  onToggle: () => void;
  onCopyId: (id: string) => void;
  copied: boolean;
  index: number;
  prefersReducedMotion: boolean;
}

function CredentialCard({
  credential,
  isExpanded,
  onToggle,
  onCopyId,
  copied,
  index,
  prefersReducedMotion,
}: CredentialCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-tint text-emerald-dark border-emerald-primary";
      case "Earned":
        return "bg-section-bg text-secondary-text border-border";
      case "Previously certified":
        return "bg-section-bg text-muted-text border-border";
      default:
        return "bg-section-bg text-secondary-text border-border";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: index * 0.1,
      }}
      whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all group"
    >
      {/* Top Row: Issuer Badge + Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-emerald-primary" />
          <span className="text-sm font-semibold text-secondary-text">
            {credential.issuer}
          </span>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            credential.status
          )}`}
        >
          {credential.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-primary-text mb-4">
        {credential.title}
      </h3>

      {/* Meta Row: Issued Date + Credential ID */}
      <div className="space-y-2 mb-4">
        {credential.issued && (
          <div className="text-sm text-secondary-text">
            <span className="font-medium">Issued:</span> {credential.issued}
          </div>
        )}
        {credential.credentialId && (
          <div className="text-sm text-secondary-text">
            <span className="font-medium">Credential ID:</span> {credential.credentialId}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {credential.categories.map((category) => (
          <span
            key={category}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[category]}`}
          >
            {categoryIcons[category]}
            {category}
          </span>
        ))}
      </div>

      {/* View Details Button */}
      <button
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-emerald-primary hover:bg-emerald-tint rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
        aria-expanded={isExpanded}
        aria-controls={`details-${credential.id}`}
      >
        <span>View details</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`details-${credential.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border space-y-4">
              {/* Skills */}
              {credential.skills && credential.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary-text uppercase tracking-wider mb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {credential.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-section-bg text-secondary-text text-xs rounded-full border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Microsoft Office Items */}
              {credential.items && credential.items.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary-text uppercase tracking-wider mb-2">
                    Certifications
                  </h4>
                  <ul className="space-y-1">
                    {credential.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-secondary-text"
                      >
                        <span className="text-emerald-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CompTIA A+ History */}
              {credential.history && credential.history.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary-text uppercase tracking-wider mb-2">
                    Certification History
                  </h4>
                  <ul className="space-y-2">
                    {credential.history.map((period, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-secondary-text"
                      >
                        <span className="font-medium">Issued:</span> {period.issued}
                        {period.expires && (
                          <>
                            {" "}
                            <span className="font-medium">–</span> {period.expires}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verification Button (CSM only) */}
              {credential.id === "csm" && credential.credentialId && (
                <div className="pt-2">
                  <button
                    onClick={() => onCopyId(credential.credentialId!)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-primary border border-emerald-primary rounded-lg hover:bg-emerald-tint transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                    aria-label="Copy CSM credential ID"
                  >
                    <ClipboardCopy size={16} />
                    Verification
                  </button>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 px-3 py-2 bg-emerald-tint text-emerald-dark text-xs rounded-lg"
                    >
                      Copied credential ID
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
