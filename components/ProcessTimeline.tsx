"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { processSteps, ProcessStep } from "@/data/processSteps";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Update progress based on active step
  useEffect(() => {
    const stepProgress = ((activeStep - 1) / (processSteps.length - 1)) * 100;
    setProgress(stepProgress);
  }, [activeStep]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    // Scroll expanded panel into view on mobile
    if (window.innerWidth < 1024) {
      const element = document.getElementById(`step-panel-${stepId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  const handleNext = () => {
    if (activeStep < processSteps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, stepId: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStepClick(stepId);
    } else if (e.key === "ArrowRight" && stepId < processSteps.length) {
      e.preventDefault();
      handleStepClick(stepId + 1);
    } else if (e.key === "ArrowLeft" && stepId > 1) {
      e.preventDefault();
      handleStepClick(stepId - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm overflow-hidden"
      aria-label="Process Timeline"
    >
      <div className="mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Our Process
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            A clear, collaborative approach from discovery to launch and beyond
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative mb-20">
            {/* Progress line background */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-border" />
            
            {/* Progress line fill */}
            <motion.div
              className="absolute top-12 left-0 h-0.5 bg-emerald-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: isInView ? progress / 100 : 0,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
              style={{ width: "100%" }}
            />

            {/* Steps */}
            <div className="relative flex justify-between">
              {processSteps.map((step, index) => {
                const isActive = activeStep === step.id;
                const isCompleted = activeStep > step.id;
                const progressPosition = (index / (processSteps.length - 1)) * 100;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center"
                    style={{ position: "absolute", left: `${progressPosition}%`, transform: "translateX(-50%)" }}
                  >
                    {/* Step node */}
                    <button
                      onClick={() => handleStepClick(step.id)}
                      onKeyDown={(e) => handleKeyDown(e, step.id)}
                      className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                        isActive
                          ? "bg-emerald-primary ring-4 ring-gold-500/40 scale-110 shadow-lg shadow-emerald-primary/20"
                          : isCompleted
                          ? "bg-emerald-primary/60 ring-2 ring-emerald-primary/30"
                          : "bg-section-bg border-2 border-border hover:border-emerald-primary hover:ring-2 hover:ring-emerald-primary/20"
                      }`}
                      aria-label={`Step ${step.id}: ${step.title}`}
                      aria-expanded={isActive}
                      aria-controls={`step-panel-${step.id}`}
                    >
                      {isActive && !prefersReducedMotion && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-emerald-primary"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <span className={`font-bold text-base relative z-10 ${
                        isActive || isCompleted ? "text-white" : "text-primary-text"
                      }`}>
                        {step.id}
                      </span>
                    </button>

                    {/* Step title */}
                    <div className="mt-5 text-center max-w-[140px]">
                      <h3
                        className={`text-sm font-semibold transition-colors ${
                          isActive ? "text-emerald-primary" : "text-secondary-text"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handlePrevious}
              disabled={activeStep === 1}
              className="px-4 py-2 rounded-xl border border-border text-secondary-text hover:border-emerald-primary hover:text-emerald-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
              aria-label="Previous step"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={activeStep === processSteps.length}
              className="px-4 py-2 rounded-xl border border-border text-secondary-text hover:border-emerald-primary hover:text-emerald-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
              aria-label="Next step"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Desktop Details Panel */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            className="bg-section-bg rounded-2xl border border-border p-8 shadow-md hover:shadow-lg transition-shadow"
          >
            <StepDetails step={processSteps[activeStep - 1]} />
          </motion.div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {processSteps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;

            return (
              <div key={step.id} className="relative">
                {/* Vertical line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-border" />
                )}

                {/* Progress line fill */}
                {isCompleted && (
                  <motion.div
                    className="absolute left-7 top-14 bottom-0 w-0.5 bg-emerald-primary"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ originY: 0 }}
                  />
                )}

                <div className="flex gap-4">
                  {/* Step node */}
                  <button
                    onClick={() => handleStepClick(step.id)}
                    onKeyDown={(e) => handleKeyDown(e, step.id)}
                    className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                      isActive
                        ? "bg-emerald-primary ring-4 ring-gold-500/40 scale-110 shadow-lg shadow-emerald-primary/20"
                        : isCompleted
                        ? "bg-emerald-primary/60 ring-2 ring-emerald-primary/30"
                        : "bg-section-bg border-2 border-border"
                    }`}
                    aria-label={`Step ${step.id}: ${step.title}`}
                    aria-expanded={isActive}
                    aria-controls={`step-panel-${step.id}`}
                  >
                    {isActive && !prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-emerald-primary"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className={`font-bold text-base relative z-10 ${
                      isActive || isCompleted ? "text-white" : "text-primary-text"
                    }`}>
                      {step.id}
                    </span>
                  </button>

                  {/* Step content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors ${
                        isActive ? "text-emerald-primary" : "text-primary-text"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-secondary-text mb-3">{step.purpose}</p>

                    {/* Expandable details */}
                    <motion.div
                      id={`step-panel-${step.id}`}
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4">
                        <div className="bg-section-bg rounded-xl border border-border p-6">
                          <StepDetails step={step} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Step Details Component
function StepDetails({ step }: { step: ProcessStep }) {
  return (
    <div className="space-y-6">
      {/* Purpose */}
      <div>
        <h4 className="text-sm font-semibold text-emerald-primary uppercase tracking-wider mb-2">
          Purpose
        </h4>
        <p className="text-secondary-text">{step.purpose}</p>
      </div>

      {/* What You Provide & What We Do */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-primary-text mb-3">What You Provide</h4>
          <ul className="space-y-2">
            {step.whatYouProvide.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-secondary-text text-sm">
                <span className="text-emerald-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-primary-text mb-3">What We Do</h4>
          <ul className="space-y-2">
            {step.whatWeDo.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-secondary-text text-sm">
                <span className="text-emerald-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Deliverables */}
      <div>
        <h4 className="text-sm font-semibold text-primary-text mb-3">Deliverables</h4>
        <div className="flex flex-wrap gap-2">
          {step.deliverables.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-emerald-tint border border-emerald-primary/30 text-emerald-dark text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Estimated Timeline */}
      {step.estimatedTimeline && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gold-500 uppercase tracking-wider">
              Timeline
            </span>
            <span className="text-secondary-text text-sm">{step.estimatedTimeline}</span>
          </div>
        </div>
      )}
    </div>
  );
}
