"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
       
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-6 text-balance">
            Websites, automation, and AI systems—delivered in <span className="relative inline-block"><span className="relative z-10">weeks</span><span className="absolute bottom-0 left-0 right-0 h-1 bg-gold-500/40"></span></span>, not months.
          </h1>
          <p className="text-lg sm:text-xl text-secondary-text mb-8 max-w-2xl mx-auto text-balance">
            Kanam helps operations leaders and program teams move faster with high-converting websites, internal dashboards, and automation that removes manual work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Book a 15-min Call
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

