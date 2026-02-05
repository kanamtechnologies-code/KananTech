"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, MessageSquare, Palette } from "lucide-react";

export default function SandboxWelcome() {
  
  const modules = [
    {
      id: "conversion",
      title: "Conversion Tuner",
      icon: <Sparkles size={24} />,
      description: "Optimize website performance",
    },
    {
      id: "automation",
      title: "Automation Builder",
      icon: <Zap size={24} />,
      description: "See workflow automation in action",
    },
    {
      id: "ai",
      title: "AI Assistant",
      icon: <MessageSquare size={24} />,
      description: "Get instant recommendations",
    },
    {
      id: "components",
      title: "UI Studio",
      icon: <Palette size={24} />,
      description: "Build a mini interface",
    },
  ];

  const scrollToModule = (moduleId: string) => {
    // Scroll to the sandbox content section
    setTimeout(() => {
      const element = document.getElementById("sandbox-content");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Set the active module via URL hash
      window.location.hash = moduleId;
      // Trigger module switch by dispatching a custom event
      window.dispatchEvent(new CustomEvent("switchModule", { detail: moduleId }));
    }, 100);
  };

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text mb-4">
            Welcome to the Sandbox
          </h1>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto mb-8">
            Explore interactive demos of our solutions. Click any module below to jump in, or scroll to browse all demos.
          </p>
        </motion.div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {modules.map((module, index) => (
            <motion.button
              key={module.id}
              onClick={() => scrollToModule(module.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-border hover:border-emerald-primary hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="text-emerald-primary group-hover:scale-110 transition-transform">
                  {module.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary-text mb-1">
                    {module.title}
                  </h3>
                  <p className="text-sm text-secondary-text mb-3">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-primary text-sm font-medium">
                    <span>Try it</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-muted-text mb-2">Scroll to explore all modules</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            <ArrowRight size={20} className="text-emerald-primary rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
