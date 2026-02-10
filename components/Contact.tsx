"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Send, Mail, Phone, CheckCircle2 } from "lucide-react";

export default function Contact({ subject }: { subject?: string } = {}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.honeypot) {
      return; // Silent fail for bots
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          message: subject ? `[Topic: ${subject}]\n\n${formData.message}` : formData.message,
          honeypot: formData.honeypot,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          organization: "",
          message: "",
          honeypot: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@kanamtech.com";
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

  // Optional prefill support for CTAs (e.g., /consulting?topic=Dashboards#contact)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const topic = params.get("topic")?.trim();
      const preset = params.get("message")?.trim();

      if (!topic && !preset) return;

      setFormData((prev) => {
        // Only prefill if the user hasn't started typing yet
        if (prev.message.trim().length > 0) return prev;

        const nextMessage =
          preset ||
          `Hi Kanam — I'm interested in ${topic}. Can we discuss scope, timeline, and next steps?`;

        return { ...prev, message: nextMessage };
      });
    } catch {
      // no-op
    }
  }, []);

  // Optional subject default (used by pages like Kids Bootcamp)
  useEffect(() => {
    if (!subject) return;
    setFormData((prev) => {
      if (prev.message.trim().length > 0) return prev;
      return {
        ...prev,
        message: `Hi Kanam — I'm interested in ${subject}. My child’s experience level is: \n\nWhat we’re hoping they learn/build is: \n\nTimeline / cohort preference: `,
      };
    });
  }, [subject]);

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mb-4">
            Get Started
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            If you can describe the manual process, we can usually automate it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-section-bg rounded-lg border border-border p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-primary-text mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-text mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-primary-text mb-1">
                  Organization *
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  required
                  minLength={2}
                  maxLength={200}
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-text mb-1">
                  What do you want to improve? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-primary focus:border-emerald-primary transition-colors"
                />
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-emerald-primary text-sm bg-emerald-tint px-4 py-3 rounded-lg border border-emerald-primary/20">
                  <CheckCircle2 size={16} />
                  <span>Message sent! We&apos;ll get back to you soon.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="text-red-600 text-sm">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </motion.div>

          {/* Scheduling & Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Calendly Embed Placeholder */}
            {calendlyUrl ? (
              <div className="bg-card-bg rounded-lg border border-border p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-primary-text mb-4">Book a Call</h3>
                <div
                  className="calendly-inline-widget"
                  data-url={calendlyUrl}
                  style={{ minHeight: "600px" }}
                />
                <script
                  type="text/javascript"
                  src="https://assets.calendly.com/assets/external/widget.js"
                  async
                />
              </div>
            ) : (
              <div className="bg-card-bg rounded-lg border border-border p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-primary-text mb-4">Book a Call</h3>
                <p className="text-secondary-text mb-4">
                  Add your Calendly URL to the <code className="text-sm bg-white px-2 py-1 rounded border border-border">NEXT_PUBLIC_CALENDLY_URL</code> environment variable to embed your scheduling widget here.
                </p>
                <a
                  href={`mailto:${contactEmail}?subject=Book a Call`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Email to Schedule
                  <Mail size={18} />
                </a>
              </div>
            )}

            {/* Direct Contact */}
            <div className="bg-section-bg rounded-lg border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-primary-text mb-4">Direct Contact</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 text-secondary-text hover:text-emerald-primary transition-colors"
                >
                  <Mail size={20} />
                  <span>{contactEmail}</span>
                </a>
                {process.env.NEXT_PUBLIC_PHONE && (
                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                    className="flex items-center gap-3 text-secondary-text hover:text-emerald-primary transition-colors"
                  >
                    <Phone size={20} />
                    <span>{process.env.NEXT_PUBLIC_PHONE}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

