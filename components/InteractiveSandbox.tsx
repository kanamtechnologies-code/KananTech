"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  MessageSquare,
  Palette,
  ClipboardCopy,
  RotateCcw,
  CheckCircle2,
  X,
  HelpCircle,
  Clock,
  FileText,
  Shield,
  Target,
  Info,
  AlertTriangle,
  CheckCircle,
  Circle,
  Users,
  Activity,
  TrendingUp,
  Timer,
  Download,
  Calendar,
  Briefcase,
  AlertCircle,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  ArrowUpDown,
  Filter,
  Eye,
  EyeOff,
  Save,
  Copy,
  Check,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Module = "conversion" | "automation" | "ai" | "components";

interface ModuleConfig {
  id: Module;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const modules: ModuleConfig[] = [
  {
    id: "conversion",
    title: "Conversion Tuner",
    icon: <Sparkles size={20} />,
    description: "Optimize website performance and conversions",
  },
  {
    id: "automation",
    title: "Automation Builder",
    icon: <Zap size={20} />,
    description: "See how automations streamline workflows",
  },
  {
    id: "ai",
    title: "AI Assistant",
    icon: <MessageSquare size={20} />,
    description: "Get instant project recommendations",
  },
  {
    id: "components",
    title: "UI Components",
    icon: <Palette size={20} />,
    description: "Explore design system tokens",
  },
];

export default function InteractiveSandbox() {
  const [activeModule, setActiveModule] = useState<Module>("conversion");
  const prefersReducedMotion = usePrefersReducedMotion();

  // Listen for module switch events from welcome section
  useEffect(() => {
    const handleModuleSwitch = (e: CustomEvent) => {
      const moduleId = e.detail as Module;
      if (["conversion", "automation", "ai", "components"].includes(moduleId)) {
        setActiveModule(moduleId);
      }
    };

    window.addEventListener("switchModule", handleModuleSwitch as EventListener);
    return () => window.removeEventListener("switchModule", handleModuleSwitch as EventListener);
  }, []);

  return (
    <section
      id="sandbox-content"
      className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
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
            Try the Sandbox
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Explore interactive demos of our solutions and see how they work in
            real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Module Selector */}
          <div className="lg:col-span-1">
            <div className="bg-section-bg/80 backdrop-blur-sm rounded-xl border border-border p-2 space-y-1">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveModule(module.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                    activeModule === module.id
                      ? "bg-emerald-primary text-white shadow-md"
                      : "text-secondary-text hover:bg-white hover:text-primary-text"
                  }`}
                  aria-label={`Switch to ${module.title} module`}
                  aria-pressed={activeModule === module.id}
                >
                  <span
                    className={
                      activeModule === module.id ? "text-white" : "text-emerald-primary"
                    }
                  >
                    {module.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{module.title}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        activeModule === module.id
                          ? "text-white/80"
                          : "text-muted-text"
                      }`}
                    >
                      {module.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Badge */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-tint border border-emerald-primary/20 rounded-full text-xs font-medium text-emerald-dark">
                <Sparkles size={14} />
                Powered by systems thinking
              </span>
            </div>
          </div>

          {/* Demo Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                  }}
                >
                  {activeModule === "conversion" && <ConversionTuner />}
                  {activeModule === "automation" && <AutomationBuilder />}
                  {activeModule === "ai" && <AIAssistant />}
                  {activeModule === "components" && <UIComponents />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Module 1: Conversion Tuner
function ConversionTuner() {
  const [loadSpeed, setLoadSpeed] = useState(2);
  const [formFields, setFormFields] = useState(5);
  const [trustSignals, setTrustSignals] = useState(true);
  const [clearCTA, setClearCTA] = useState(true);
  const [showGuide, setShowGuide] = useState(true);
  const [showScoreTooltip, setShowScoreTooltip] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Check localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("conversionTunerGuideDismissed");
      if (dismissed) {
        setShowGuide(false);
      }
    }
  }, []);

  // Calculate impact breakdown
  const calculateImpact = () => {
    let speedImpact = 0;
    let formImpact = 0;
    let trustImpact = 0;
    let ctaImpact = 0;

    // Speed impact (peaks at 1-2s)
    if (loadSpeed <= 1) speedImpact = 25;
    else if (loadSpeed <= 2) speedImpact = 20;
    else if (loadSpeed <= 2.5) speedImpact = 15;
    else if (loadSpeed <= 3) speedImpact = 5;
    else if (loadSpeed <= 4) speedImpact = -5;
    else speedImpact = -20;

    // Form impact (optimal 2-4 fields)
    if (formFields <= 2) formImpact = 20;
    else if (formFields <= 4) formImpact = 15;
    else if (formFields <= 5) formImpact = 5;
    else if (formFields <= 6) formImpact = -5;
    else if (formFields <= 8) formImpact = -15;
    else formImpact = -25;

    // Trust impact
    trustImpact = trustSignals ? 15 : -10;

    // CTA impact
    ctaImpact = clearCTA ? 15 : -10;

    return { speedImpact, formImpact, trustImpact, ctaImpact };
  };

  const impacts = calculateImpact();
  const baseScore = 50;
  const totalScore = Math.max(
    0,
    Math.min(100, baseScore + impacts.speedImpact + impacts.formImpact + impacts.trustImpact + impacts.ctaImpact)
  );

  // Generate recommendations
  const generateRecommendations = () => {
    const recs: Array<{
      title: string;
      description: string;
      severity: "High impact" | "Medium impact" | "Quick win";
      icon: React.ReactNode;
    }> = [];

    if (loadSpeed > 3) {
      recs.push({
        title: "Improve load speed below 2s",
        description: "Pages loading over 3 seconds lose visitors before they can convert.",
        severity: "High impact",
        icon: <Clock size={16} />,
      });
    } else if (loadSpeed > 2) {
      recs.push({
        title: "Optimize load speed to under 2s",
        description: "Aim for 1-2 seconds for maximum conversion potential.",
        severity: "Medium impact",
        icon: <Clock size={16} />,
      });
    }

    if (formFields > 6) {
      recs.push({
        title: "Reduce form fields",
        description: "Cut fields to 4 or fewer to reduce friction and increase signups.",
        severity: "High impact",
        icon: <FileText size={16} />,
      });
    } else if (formFields > 4) {
      recs.push({
        title: "Consider reducing form fields",
        description: "Fewer fields typically lead to higher conversion rates.",
        severity: "Medium impact",
        icon: <FileText size={16} />,
      });
    }

    if (!trustSignals) {
      recs.push({
        title: "Add 1–2 trust signals near the CTA",
        description: "Testimonials, reviews, or guarantees help visitors feel safe.",
        severity: "Quick win",
        icon: <Shield size={16} />,
      });
    }

    if (!clearCTA) {
      recs.push({
        title: "Make your main CTA more specific",
        description: "A clear, action-oriented button tells users exactly what to do next.",
        severity: "Medium impact",
        icon: <Target size={16} />,
      });
    }

    if (recs.length === 0) {
      recs.push({
        title: "Great configuration!",
        description: "Your site is optimized for conversions. Keep monitoring and testing.",
        severity: "Quick win",
        icon: <CheckCircle2 size={16} />,
      });
    }

    return recs;
  };

  const recommendations = generateRecommendations();

  const getScoreColor = () => {
    if (totalScore >= 85) return "text-emerald-primary";
    if (totalScore >= 70) return "text-emerald-primary";
    if (totalScore >= 40) return "text-gold-500";
    return "text-orange-500";
  };

  const getScoreInterpretation = () => {
    if (totalScore >= 85) return "Excellent";
    if (totalScore >= 70) return "Strong";
    if (totalScore >= 40) return "Good foundation";
    return "High friction";
  };

  const dismissGuide = () => {
    setShowGuide(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("conversionTunerGuideDismissed", "true");
    }
  };

  const applyPreset = (preset: "typical" | "high-performing" | "needs-improvement") => {
    // Animate transitions
    if (!prefersReducedMotion) {
      // Smooth transitions for sliders
      const transition = { duration: 0.6, ease: "easeOut" };
      
      if (preset === "typical") {
        setLoadSpeed(3.5);
        setFormFields(7);
        setTrustSignals(false);
        setClearCTA(true);
      } else if (preset === "high-performing") {
        setLoadSpeed(1.5);
        setFormFields(3);
        setTrustSignals(true);
        setClearCTA(true);
      } else if (preset === "needs-improvement") {
        setLoadSpeed(5);
        setFormFields(10);
        setTrustSignals(false);
        setClearCTA(false);
      }
    } else {
      // Instant for reduced motion
      if (preset === "typical") {
        setLoadSpeed(3.5);
        setFormFields(7);
        setTrustSignals(false);
        setClearCTA(true);
      } else if (preset === "high-performing") {
        setLoadSpeed(1.5);
        setFormFields(3);
        setTrustSignals(true);
        setClearCTA(true);
      } else if (preset === "needs-improvement") {
        setLoadSpeed(5);
        setFormFields(10);
        setTrustSignals(false);
        setClearCTA(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-primary-text mb-2">
          Website Conversion Tuner
        </h3>
        <p className="text-secondary-text text-sm">
          Adjust these factors to see how they impact conversion potential
        </p>
      </div>

      {/* How to Use Guide */}
      <AnimatePresence>
        {showGuide ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="bg-emerald-tint border border-emerald-primary/30 rounded-xl p-5 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-sm font-semibold text-emerald-dark">
                How to use this
              </h4>
              <button
                onClick={dismissGuide}
                className="text-emerald-dark hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 rounded"
                aria-label="Dismiss guide"
              >
                <X size={18} />
              </button>
            </div>
            <ol className="space-y-2 text-sm text-emerald-dark mb-4">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">1.</span>
                <span>Adjust the sliders and toggles to match your current site</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">2.</span>
                <span>Watch the Conversion Score update in real time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">3.</span>
                <span>Use the recommendations to improve performance</span>
              </li>
            </ol>
            <button
              onClick={dismissGuide}
              className="px-4 py-2 bg-emerald-primary text-white text-sm font-medium rounded-lg hover:bg-emerald-hover transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            >
              Got it
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-border rounded-full hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            aria-label="Show tips"
          >
            <HelpCircle size={14} />
            Show tips
          </button>
        )}
      </AnimatePresence>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyPreset("typical")}
          className="px-4 py-2 text-sm border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
          aria-label="Apply typical small business site preset"
        >
          Typical Small Business Site
        </button>
        <button
          onClick={() => applyPreset("high-performing")}
          className="px-4 py-2 text-sm border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
          aria-label="Apply high-performing landing page preset"
        >
          High-Performing Landing Page
        </button>
        <button
          onClick={() => applyPreset("needs-improvement")}
          className="px-4 py-2 text-sm border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
          aria-label="Apply needs improvement preset"
        >
          Needs Improvement
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Page Load Speed */}
          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Page Load Speed: {loadSpeed}s
            </label>
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.5"
              value={loadSpeed}
              onChange={(e) => setLoadSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-emerald-primary"
              aria-label="Page load speed slider"
            />
            <div className="flex justify-between text-xs text-muted-text mt-1">
              <span>0.5s</span>
              <span>6s</span>
            </div>
            <p className="text-xs text-secondary-text mt-2">
              Faster pages keep visitors from bouncing before they take action.
            </p>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Form Fields: {formFields}
            </label>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={formFields}
              onChange={(e) => setFormFields(parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-emerald-primary"
              aria-label="Form fields slider"
            />
            <div className="flex justify-between text-xs text-muted-text mt-1">
              <span>2</span>
              <span>12</span>
            </div>
            <p className="text-xs text-secondary-text mt-2">
              More fields usually reduce signups—people quit when it feels like work.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
            <div className="flex-1">
              <span className="text-sm font-semibold text-primary-text block mb-1">
                Trust Signals
              </span>
              <p className="text-xs text-secondary-text">
                Testimonials, reviews, and guarantees help visitors feel safe choosing you.
              </p>
            </div>
            <button
              onClick={() => setTrustSignals(!trustSignals)}
              className={`ml-4 relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                trustSignals ? "bg-emerald-primary" : "bg-border"
              }`}
              aria-label={`Toggle trust signals: ${trustSignals ? "on" : "off"}`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  trustSignals ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Clear CTA */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
            <div className="flex-1">
              <span className="text-sm font-semibold text-primary-text block mb-1">
                Clear CTA
              </span>
              <p className="text-xs text-secondary-text">
                A strong call-to-action tells users exactly what to do next.
              </p>
            </div>
            <button
              onClick={() => setClearCTA(!clearCTA)}
              className={`ml-4 relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                clearCTA ? "bg-emerald-primary" : "bg-border"
              }`}
              aria-label={`Toggle clear CTA: ${clearCTA ? "on" : "off"}`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  clearCTA ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <button
            onClick={() => {
              setLoadSpeed(2);
              setFormFields(5);
              setTrustSignals(true);
              setClearCTA(true);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border text-secondary-text rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            aria-label="Reset conversion tuner"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score & Impact Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Conversion Score */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="text-xs font-medium text-muted-text uppercase tracking-wider">
                  Conversion Score
                </div>
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowScoreTooltip(true)}
                    onMouseLeave={() => setShowScoreTooltip(false)}
                    onFocus={() => setShowScoreTooltip(true)}
                    onBlur={() => setShowScoreTooltip(false)}
                    className="text-muted-text hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 rounded"
                    aria-label="Conversion score explanation"
                  >
                    <Info size={14} />
                  </button>
                  {showScoreTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-primary-text text-white text-xs p-3 rounded-lg shadow-lg z-10">
                      This score estimates how likely visitors are to complete an action based on friction, clarity, and trust.
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center mb-4">
                <motion.div
                  className={`text-5xl font-bold ${getScoreColor()} transition-colors`}
                  key={totalScore}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                >
                  {totalScore}
                </motion.div>
                <div className="text-xs text-muted-text mt-2">out of 100</div>
                <div className={`text-sm font-semibold mt-2 ${getScoreColor()}`}>
                  {getScoreInterpretation()}
                </div>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full ${
                    totalScore >= 70
                      ? "bg-emerald-primary"
                      : totalScore >= 40
                      ? "bg-gold-500"
                      : "bg-orange-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${totalScore}%` }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                />
              </div>
            </div>

            {/* Impact Breakdown */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h4 className="text-sm font-semibold text-primary-text mb-4">
                Impact Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary-text">Speed impact:</span>
                  <span
                    className={`text-sm font-semibold ${
                      impacts.speedImpact >= 0 ? "text-emerald-primary" : "text-orange-500"
                    }`}
                  >
                    {impacts.speedImpact >= 0 ? "+" : ""}
                    {impacts.speedImpact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary-text">Form friction:</span>
                  <span
                    className={`text-sm font-semibold ${
                      impacts.formImpact >= 0 ? "text-emerald-primary" : "text-orange-500"
                    }`}
                  >
                    {impacts.formImpact >= 0 ? "+" : ""}
                    {impacts.formImpact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary-text">Trust boost:</span>
                  <span
                    className={`text-sm font-semibold ${
                      impacts.trustImpact >= 0 ? "text-emerald-primary" : "text-orange-500"
                    }`}
                  >
                    {impacts.trustImpact >= 0 ? "+" : ""}
                    {impacts.trustImpact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary-text">CTA clarity:</span>
                  <span
                    className={`text-sm font-semibold ${
                      impacts.ctaImpact >= 0 ? "text-emerald-primary" : "text-orange-500"
                    }`}
                  >
                    {impacts.ctaImpact >= 0 ? "+" : ""}
                    {impacts.ctaImpact}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h4 className="text-sm font-semibold text-primary-text mb-4">
              Preview
            </h4>
            <div className="bg-section-bg rounded-lg p-6 border border-border">
              <h5 className="text-lg font-bold text-primary-text mb-2">
                Get Started Today
              </h5>
              <p className="text-sm text-secondary-text mb-4">
                Join thousands of businesses improving their operations
              </p>
              {trustSignals && (
                <div className="flex items-center gap-2 mb-4 text-xs text-secondary-text">
                  <Shield size={14} className="text-emerald-primary" />
                  <span>Trusted by 10,000+ businesses</span>
                </div>
              )}
              <div className="space-y-2 mb-4">
                {Array.from({ length: formFields }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-white border border-border rounded px-3 flex items-center text-xs text-muted-text"
                  >
                    {i === 0 ? "Name" : i === 1 ? "Email" : `Field ${i + 1}`}
                  </div>
                ))}
              </div>
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                  clearCTA
                    ? "bg-emerald-primary text-white hover:bg-emerald-hover"
                    : "bg-border text-secondary-text"
                }`}
              >
                {clearCTA ? "Start Your Free Trial" : "Submit"}
              </button>
              <div className="mt-3 text-xs text-muted-text text-center">
                Load time: {loadSpeed}s
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h4 className="text-sm font-semibold text-primary-text mb-4">
              Recommendations
            </h4>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 bg-section-bg rounded-lg border border-border"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-emerald-primary mt-0.5">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-primary-text">
                          {rec.title}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            rec.severity === "High impact"
                              ? "bg-orange-100 text-orange-700"
                              : rec.severity === "Medium impact"
                              ? "bg-gold-500/20 text-gold-600"
                              : "bg-emerald-tint text-emerald-dark"
                          }`}
                        >
                          {rec.severity}
                        </span>
                      </div>
                      <p className="text-xs text-secondary-text">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What You're Simulating */}
      <div className="bg-section-bg rounded-xl border border-border p-6">
        <p className="text-sm text-secondary-text">
          <strong className="text-primary-text">What you&apos;re simulating:</strong>{" "}
          This sandbox simulates how common UX factors can influence conversion
          potential.{" "}
          <span className="text-muted-text italic">
            Results are directional, not exact—use them to guide improvements.
          </span>
        </p>
      </div>

      {/* Use Cases */}
      <div className="pt-6 border-t border-border">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              What this demonstrates
            </h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Real-time conversion optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Data-driven UX improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Performance impact analysis</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              Typical use cases
            </h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Landing page optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Form conversion analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>E-commerce checkout flows</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Module 2: Automation Builder
function AutomationBuilder() {
  const [formData, setFormData] = useState({
    requestorName: "",
    requestorEmail: "",
    requestType: "",
    priority: "",
    timeline: "",
    stakeholder: "",
    successCriteria: "",
    risksConstraints: "",
    notes: "",
  });
  const [workflowStep, setWorkflowStep] = useState<number | null>(null);
  const [eventLogs, setEventLogs] = useState<string[]>([]);
  const [auditTrail, setAuditTrail] = useState<string[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"events" | "audit">("events");
  const [showGuide, setShowGuide] = useState(true);
  const [operationalSignals, setOperationalSignals] = useState<any>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Check localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("automationBuilderGuideDismissed");
      if (dismissed) {
        setShowGuide(false);
      }
    }
  }, []);

  const workflowStages = [
    {
      name: "Intake Validation",
      owner: "Automation",
      sla: "< 5 min",
      description: "Validate request completeness and routing rules",
    },
    {
      name: "Triage & Routing",
      owner: "PMO",
      sla: "same day",
      description: "Assign to appropriate delivery team",
    },
    {
      name: "Create Work Item",
      owner: "System",
      sla: "< 2 min",
      description: "Generate work item in tracking system",
    },
    {
      name: "Notify Stakeholders",
      owner: "System",
      sla: "< 1 min",
      description: "Send notifications to requestor and team",
    },
    {
      name: "Schedule Follow-up",
      owner: "System",
      sla: "< 1 min",
      description: "Set follow-up reminders based on timeline",
    },
    {
      name: "Generate Exec Summary",
      owner: "System",
      sla: "< 1 min",
      description: "Create executive summary for visibility",
    },
  ];

  const runAutomation = async () => {
    if (!formData.requestorName || !formData.requestorEmail || !formData.requestType) {
      alert("Please fill in all required fields");
      return;
    }

    setIsRunning(true);
    setEventLogs([]);
    setAuditTrail([]);
    setSummary(null);
    setOperationalSignals(null);
    const startTime = Date.now();

    for (let i = 0; i < workflowStages.length; i++) {
      setWorkflowStep(i);
      const timestamp = new Date().toLocaleTimeString();
      const dateStamp = new Date().toISOString();

      // Event log entries
      const eventMessages = [
        `[${timestamp}] Intake validation started for ${formData.requestType} request`,
        `[${timestamp}] Routing to ${formData.stakeholder || "default"} team`,
        `[${timestamp}] Work item #${Math.floor(Math.random() * 10000)} created`,
        `[${timestamp}] Notifications sent to ${formData.requestorEmail} and delivery team`,
        `[${timestamp}] Follow-up scheduled for ${formData.timeline || "ASAP"}`,
        `[${timestamp}] Executive summary generated and distributed`,
      ];

      // Audit trail entries
      const auditMessages = [
        `[${dateStamp}] SYSTEM: Validation completed | Owner: Automation | Status: Passed`,
        `[${dateStamp}] PMO: Request triaged | Priority: ${formData.priority || "Normal"} | Assigned to: ${formData.stakeholder || "Delivery Lead"}`,
        `[${dateStamp}] SYSTEM: Work item created | ID: ${Math.floor(Math.random() * 10000)} | Type: ${formData.requestType}`,
        `[${dateStamp}] SYSTEM: Notifications sent | Recipients: 3 | Channels: Email, Slack`,
        `[${dateStamp}] SYSTEM: Follow-up scheduled | Date: ${formData.timeline || "ASAP"} | Owner: PMO`,
        `[${dateStamp}] SYSTEM: Summary generated | Recipients: 5 | Status: Complete`,
      ];

      setEventLogs((prev) => [...prev, eventMessages[i]]);
      setAuditTrail((prev) => [...prev, auditMessages[i]]);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    const endTime = Date.now();
    const cycleTime = ((endTime - startTime) / 1000).toFixed(0);
    const cycleTimeFormatted = `${Math.floor(parseInt(cycleTime) / 60)}m ${parseInt(cycleTime) % 60}s`;

    setWorkflowStep(null);
    setSummary({
      requestorName: formData.requestorName,
      requestType: formData.requestType,
      priority: formData.priority,
      timeline: formData.timeline,
      stakeholder: formData.stakeholder,
      status: "Complete",
    });

    setOperationalSignals({
      cycleTime: cycleTimeFormatted,
      slaHealth: "On track",
      ownership: "PMO",
      riskFlags: formData.risksConstraints ? 1 : 0,
      nextCheckIn: formData.timeline || "ASAP",
    });

    setIsRunning(false);
  };

  const reset = () => {
    setFormData({
      requestorName: "",
      requestorEmail: "",
      requestType: "",
      priority: "",
      timeline: "",
      stakeholder: "",
      successCriteria: "",
      risksConstraints: "",
      notes: "",
    });
    setWorkflowStep(null);
    setEventLogs([]);
    setAuditTrail([]);
    setSummary(null);
    setOperationalSignals(null);
    setIsRunning(false);
  };

  const dismissGuide = () => {
    setShowGuide(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("automationBuilderGuideDismissed", "true");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-primary-text mb-2">
          Automation Builder
        </h3>
        <p className="text-secondary-text text-sm">
          See how intake requests turn into consistent execution with clear ownership
        </p>
      </div>

      {/* How to Use Guide */}
      <AnimatePresence>
        {showGuide ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="bg-emerald-tint border border-emerald-primary/30 rounded-xl p-5 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-sm font-semibold text-emerald-dark">
                How to use this automation preview
              </h4>
              <button
                onClick={dismissGuide}
                className="text-emerald-dark hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 rounded"
                aria-label="Dismiss guide"
              >
                <X size={18} />
              </button>
            </div>
            <ol className="space-y-2 text-sm text-emerald-dark mb-3">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">1.</span>
                <span>Enter a sample request (like a stakeholder intake).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">2.</span>
                <span>Run the workflow to see handoffs and system actions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">3.</span>
                <span>Review the outcome summary and operational signals.</span>
              </li>
            </ol>
            <p className="text-xs text-emerald-dark mb-4 italic">
              <strong>Why it matters:</strong> This shows how intake turns into consistent execution with clear ownership.
            </p>
            <button
              onClick={dismissGuide}
              className="px-4 py-2 bg-emerald-primary text-white text-sm font-medium rounded-lg hover:bg-emerald-hover transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            >
              Got it
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-border rounded-full hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            aria-label="Show tips"
          >
            <HelpCircle size={14} />
            Show tips
          </button>
        )}
      </AnimatePresence>

      {/* What You're Simulating */}
      <div className="bg-section-bg rounded-xl border border-border p-4">
        <p className="text-sm text-secondary-text">
          <strong className="text-primary-text">What you&apos;re simulating:</strong>{" "}
          This sandbox simulates an intake-to-execution workflow: validation → routing → notifications → follow-up scheduling → audit trail.{" "}
          <span className="text-muted-text italic">
            No external systems are contacted—this is a local simulation.
          </span>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stakeholder Intake Form */}
        <div className="lg:col-span-1 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              Stakeholder Intake
            </h4>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Requestor Name *
            </label>
            <input
              type="text"
              value={formData.requestorName}
              onChange={(e) => setFormData({ ...formData, requestorName: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              placeholder="Jane Smith"
              aria-label="Requestor name input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Requestor Email *
            </label>
            <input
              type="email"
              value={formData.requestorEmail}
              onChange={(e) => setFormData({ ...formData, requestorEmail: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              placeholder="jane@company.com"
              aria-label="Requestor email input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Request Type *
            </label>
            <select
              value={formData.requestType}
              onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              aria-label="Request type selection"
            >
              <option value="">Select request type</option>
              <option value="Website Build">Website Build</option>
              <option value="Automation">Automation</option>
              <option value="AI Assistant">AI Assistant</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Priority *
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              aria-label="Priority selection"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Timeline *
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              aria-label="Timeline selection"
            >
              <option value="">Select timeline</option>
              <option value="ASAP">ASAP</option>
              <option value="2 weeks">2 weeks</option>
              <option value="30 days">30 days</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Stakeholder / Dept *
            </label>
            <select
              value={formData.stakeholder}
              onChange={(e) => setFormData({ ...formData, stakeholder: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              aria-label="Stakeholder selection"
            >
              <option value="">Select stakeholder</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Training">Training</option>
              <option value="Product">Product</option>
              <option value="Executive">Executive</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Success Criteria
            </label>
            <textarea
              value={formData.successCriteria}
              onChange={(e) => setFormData({ ...formData, successCriteria: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              rows={2}
              placeholder="What does success look like?"
              aria-label="Success criteria textarea"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Risks / Constraints
            </label>
            <textarea
              value={formData.risksConstraints}
              onChange={(e) => setFormData({ ...formData, risksConstraints: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              rows={2}
              placeholder="Known risks or constraints..."
              aria-label="Risks and constraints textarea"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
              rows={2}
              placeholder="Additional context..."
              aria-label="Notes textarea"
            />
          </div>

          <p className="text-xs text-muted-text italic">
            Think of this like a lightweight request intake that prevents ambiguity and missed handoffs.
          </p>

          <div className="flex gap-3">
            <button
              onClick={runAutomation}
              disabled={isRunning}
              className="flex-1 px-6 py-3 bg-emerald-primary text-white font-medium rounded-lg hover:bg-emerald-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
              aria-label="Run workflow"
            >
              {isRunning ? "Running..." : "Run Workflow"}
            </button>
            <button
              onClick={reset}
              className="px-4 py-3 border border-border text-secondary-text rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
              aria-label="Reset automation builder"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Workflow Pipeline & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workflow Pipeline */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h4 className="text-sm font-semibold text-primary-text mb-4">
              Workflow Pipeline
            </h4>
            <div className="space-y-4">
              {workflowStages.map((stage, index) => {
                const isActive = workflowStep === index;
                const isCompleted = workflowStep !== null && workflowStep > index;
                const isPending = workflowStep === null || workflowStep < index;

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      opacity: isPending ? 0.6 : 1,
                    }}
                    className={`p-4 rounded-lg border ${
                      isActive
                        ? "border-emerald-primary bg-emerald-tint"
                        : isCompleted
                        ? "border-emerald-primary/30 bg-emerald-tint/30"
                        : "border-border bg-section-bg"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-primary-text">
                            {stage.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              isActive
                                ? "bg-emerald-primary text-white"
                                : isCompleted
                                ? "bg-emerald-primary/60 text-white"
                                : "bg-section-bg text-muted-text"
                            }`}
                          >
                            {isActive
                              ? "Running"
                              : isCompleted
                              ? "Completed"
                              : "Pending"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-secondary-text">
                          <span>Owner: {stage.owner}</span>
                          <span>SLA: {stage.sla}</span>
                        </div>
                        <p className="text-xs text-muted-text mt-1">{stage.description}</p>
                      </div>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-emerald-primary text-white ring-4 ring-emerald-primary/20"
                            : isCompleted
                            ? "bg-emerald-primary/60 text-white"
                            : "bg-section-bg text-muted-text"
                        }`}
                      >
                        {isCompleted ? <CheckCircle size={18} /> : index + 1}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Operational Signals */}
          {operationalSignals && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-border p-6"
            >
              <h4 className="text-sm font-semibold text-primary-text mb-4">
                Operational Signals
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-xs text-muted-text mb-1">Cycle Time</div>
                  <div className="text-lg font-semibold text-primary-text flex items-center gap-1">
                    <Timer size={16} className="text-emerald-primary" />
                    {operationalSignals.cycleTime}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-text mb-1">SLA Health</div>
                  <div className="text-lg font-semibold text-emerald-primary flex items-center gap-1">
                    <Activity size={16} />
                    {operationalSignals.slaHealth}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-text mb-1">Ownership</div>
                  <div className="text-lg font-semibold text-primary-text flex items-center gap-1">
                    <Users size={16} className="text-emerald-primary" />
                    {operationalSignals.ownership}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-text mb-1">Risk Flags</div>
                  <div className="text-lg font-semibold flex items-center gap-1">
                    {operationalSignals.riskFlags > 0 ? (
                      <>
                        <AlertTriangle size={16} className="text-orange-500" />
                        <span className="text-orange-500">{operationalSignals.riskFlags}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} className="text-emerald-primary" />
                        <span className="text-emerald-primary">0</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-text mb-1">Next Check-in</div>
                  <div className="text-lg font-semibold text-primary-text">
                    {operationalSignals.nextCheckIn}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Log + Audit Trail */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                  activeTab === "events"
                    ? "bg-emerald-primary text-white"
                    : "bg-section-bg text-secondary-text hover:text-primary-text"
                }`}
                aria-label="View event log"
              >
                Event Log
              </button>
              <button
                onClick={() => setActiveTab("audit")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                  activeTab === "audit"
                    ? "bg-emerald-primary text-white"
                    : "bg-section-bg text-secondary-text hover:text-primary-text"
                }`}
                aria-label="View audit trail"
              >
                Audit Trail
              </button>
            </div>
            <div className="bg-section-bg rounded-lg p-4 max-h-64 overflow-y-auto">
              {activeTab === "events" ? (
                <div className="space-y-1 font-mono text-xs text-secondary-text">
                  {eventLogs.length > 0 ? (
                    eventLogs.map((log, index) => (
                      <div key={index} className="opacity-90">
                        {log}
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-text">Waiting for workflow to start...</div>
                  )}
                </div>
              ) : (
                <div className="space-y-1 font-mono text-xs text-secondary-text">
                  {auditTrail.length > 0 ? (
                    auditTrail.map((log, index) => (
                      <div key={index} className="opacity-90">
                        {log}
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-text">No audit trail entries yet...</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Executive Summary */}
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-tint rounded-xl border border-emerald-primary/30 p-6"
            >
              <h4 className="text-sm font-semibold text-emerald-dark mb-3">
                Executive Summary
              </h4>
              <div className="space-y-2 text-sm text-emerald-dark">
                <div>
                  <span className="font-medium">Requestor:</span> {summary.requestorName}
                </div>
                <div>
                  <span className="font-medium">Request Type:</span> {summary.requestType}
                </div>
                <div>
                  <span className="font-medium">Priority:</span> {summary.priority || "Normal"}
                </div>
                <div>
                  <span className="font-medium">Timeline:</span> {summary.timeline || "ASAP"}
                </div>
                <div>
                  <span className="font-medium">Stakeholder:</span> {summary.stakeholder || "Unassigned"}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-emerald-primary">{summary.status}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Use Cases */}
      <div className="pt-6 border-t border-border">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              What this demonstrates
            </h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Automated workflow orchestration with clear ownership</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Operational visibility and SLA tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Complete audit trail for governance</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              Typical use cases
            </h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Stakeholder request intake and routing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Project initiation workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Change management processes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Module 3: AI Assistant
function AIAssistant() {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string; quickReplies?: string[] }>
  >([
    {
      role: "assistant",
      content:
        "I'm your Requirements Assistant. I'll help you turn your request into a clear project brief with defined scope, success criteria, and next steps.",
    },
  ]);
  const [input, setInput] = useState("");
  const [projectBrief, setProjectBrief] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [executiveMode, setExecutiveMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scenario, setScenario] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Check localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("aiAssistantGuideDismissed");
      if (dismissed) {
        setShowGuide(false);
      }
    }
  }, []);

  const questions = [
    {
      id: "outcome",
      question: "What outcome matters most?",
      quickReplies: ["Lead Gen", "Operational Efficiency", "Visibility & Reporting"],
      executive: "Primary outcome?",
    },
    {
      id: "stakeholders",
      question: "Who is the primary stakeholder and who approves final scope?",
      quickReplies: ["Internal Users", "External Customers", "Both"],
      executive: "Stakeholders & approver?",
    },
    {
      id: "timeline",
      question: "What\u2019s the timeline and what happens if we miss it?",
      quickReplies: ["Budget is fixed", "Timeline is fixed", "Both flexible"],
      executive: "Timeline & constraints?",
    },
    {
      id: "integrations",
      question: "Do you have existing tools we must integrate with?",
      quickReplies: ["Google Forms", "Slack", "Email", "CRM", "None"],
      executive: "Required integrations?",
    },
    {
      id: "success",
      question: "What does success look like in 30 days?",
      quickReplies: [],
      executive: "30-day success metrics?",
    },
  ];

  const generateBrief = () => {
    const outcome = answers.outcome || "Not specified";
    const stakeholders = answers.stakeholders || "Not specified";
    const timeline = answers.timeline || "Not specified";
    const integrations = answers.integrations || "None";
    const success = answers.success || "Not specified";

    const scenarioType = scenario || "general";
    let summary = "";
    let primaryGoal = "";
    let targetUsers = "";
    let scopeIn: string[] = [];
    let scopeOut: string[] = [];
    let successCriteria: string[] = [];
    let timelineMilestones: string[] = [];
    let risksConstraints: string[] = [];
    let ownership: Record<string, string> = {};
    let nextSteps: string[] = [];

    if (scenarioType === "website") {
      summary = `Launch a new website within 30 days to ${outcome.toLowerCase()}.`;
      primaryGoal = outcome;
      targetUsers = stakeholders;
      scopeIn = ["Responsive website", "SEO optimization", "Contact forms", "Analytics setup"];
      scopeOut = ["E-commerce functionality", "User accounts", "Third-party integrations"];
      successCriteria = [
        success || "Website live and accessible",
        "Page load time under 2 seconds",
        "Mobile-responsive design",
      ];
      timelineMilestones = ["Week 1: Design approval", "Week 2: Development", "Week 3: Content & testing", "Week 4: Launch"];
      risksConstraints = timeline.includes("fixed") ? ["Fixed timeline requires fast decisions"] : [];
      ownership = {
        Requestor: "Stakeholder",
        Approver: "Executive Sponsor",
        "Delivery Lead": "PMO",
      };
      nextSteps = [
        "Schedule kickoff meeting with stakeholders",
        "Gather brand assets and content",
        "Set up project tracking board",
      ];
    } else if (scenarioType === "automation") {
      summary = `Automate intake and follow-up processes to ${outcome.toLowerCase()}.`;
      primaryGoal = outcome;
      targetUsers = stakeholders;
      scopeIn = ["Intake form automation", "Notification system", "Follow-up scheduling", integrations !== "None" ? `Integration with ${integrations}` : "Basic automation"];
      scopeOut = ["Complex workflow logic", "Multi-system orchestration"];
      successCriteria = [
        success || "Automation reduces manual work by 50%",
        "All requests routed within 5 minutes",
        "Zero missed follow-ups",
      ];
      timelineMilestones = ["Week 1: Requirements & design", "Week 2: Build & test", "Week 3: Deploy & train"];
      risksConstraints = integrations !== "None" ? [`Integration complexity with ${integrations}`] : [];
      ownership = {
        Requestor: "Operations Lead",
        Approver: "Director",
        "Delivery Lead": "Automation Team",
      };
      nextSteps = [
        "Map current manual process",
        "Identify integration points",
        "Define success metrics",
      ];
    } else if (scenarioType === "ops-workflow") {
      summary = `Fix and streamline a messy operational process to improve ${outcome.toLowerCase()}.`;
      primaryGoal = outcome;
      targetUsers = stakeholders;
      scopeIn = ["Process documentation", "Workflow automation", "Visibility dashboard", "Error handling"];
      scopeOut = ["Complete system replacement", "Multi-department changes"];
      successCriteria = [
        success || "Process time reduced by 40%",
        "Error rate below 2%",
        "Full visibility into process status",
      ];
      timelineMilestones = ["Week 1: Process audit", "Week 2: Solution design", "Week 3-4: Build & deploy"];
      risksConstraints = ["Legacy system dependencies", "Change management required"];
      ownership = {
        Requestor: "Operations Manager",
        Approver: "Program Director",
        "Delivery Lead": "Technical PM",
      };
      nextSteps = [
        "Conduct process audit with stakeholders",
        "Document current pain points",
        "Design improved workflow",
      ];
    } else {
      summary = `Deliver a solution to achieve ${outcome.toLowerCase()} for ${stakeholders.toLowerCase()}.`;
      primaryGoal = outcome;
      targetUsers = stakeholders;
      scopeIn = ["Core functionality", "Basic integrations"];
      scopeOut = ["Advanced features", "Custom integrations"];
      successCriteria = [success || "Project delivered on time and within scope"];
      timelineMilestones = ["Discovery", "Design", "Build", "Launch"];
      risksConstraints = [];
      ownership = {
        Requestor: "Stakeholder",
        Approver: "Executive",
        "Delivery Lead": "PMO",
      };
      nextSteps = [
        "Schedule discovery session",
        "Define detailed requirements",
        "Create project plan",
      ];
    }

    return {
      summary,
      primaryGoal,
      targetUsers,
      scopeIn,
      scopeOut,
      successCriteria,
      timelineMilestones,
      risksConstraints,
      ownership,
      nextSteps,
    };
  };

  const handlePreset = (preset: string) => {
    let initialMessage = "";
    let scenarioType = "";

    if (preset === "website") {
      initialMessage = "Launch a new website in 30 days";
      scenarioType = "website";
    } else if (preset === "automation") {
      initialMessage = "Automate intake + follow-ups";
      scenarioType = "automation";
    } else if (preset === "ops-workflow") {
      initialMessage = "Fix a messy process (Ops workflow)";
      scenarioType = "ops-workflow";
    }

    setScenario(scenarioType);
    setCurrentQuestion(0);
    setAnswers({});
    setMessages([
      {
        role: "assistant",
        content:
          "I'm your Requirements Assistant. I'll help you turn your request into a clear project brief with defined scope, success criteria, and next steps.",
      },
      { role: "user" as const, content: initialMessage },
    ]);
    handleSend(initialMessage, true);
  };

  const handleSend = (text?: string, isPreset = false) => {
    const userMessage = text || input.trim();
    if (!userMessage && !text && !isPreset) return;

    const newAnswers = { ...answers };
    if (currentQuestion < questions.length && userMessage) {
      newAnswers[questions[currentQuestion].id] = userMessage;
      setAnswers(newAnswers);
    }

    const newMessages = [
      ...messages,
      { role: "user" as const, content: userMessage },
    ];
    setMessages(newMessages);
    setInput("");
    setIsProcessing(true);

    setTimeout(() => {
      let response = "";
      const nextQuestionIndex = currentQuestion + 1;

      if (currentQuestion < questions.length - 1) {
        const nextQuestion = questions[nextQuestionIndex];
        response = executiveMode ? nextQuestion.executive : nextQuestion.question;
        setCurrentQuestion(nextQuestionIndex);
      } else {
        response = executiveMode
          ? "Generating your project brief..."
          : "Perfect! I have everything I need. Generating your project brief now...";
        const brief = generateBrief();
        setProjectBrief(brief);
      }

      const quickReplies =
        currentQuestion < questions.length - 1
          ? questions[nextQuestionIndex]?.quickReplies || []
          : [];

      setMessages([
        ...newMessages,
        {
          role: "assistant" as const,
          content: response,
          quickReplies: quickReplies.length > 0 ? quickReplies : undefined,
        },
      ]);

      setIsProcessing(false);
    }, 1000);
  };

  const copyBrief = () => {
    if (!projectBrief) return;
    const text = `PROJECT BRIEF

Summary: ${projectBrief.summary}

Primary Goal: ${projectBrief.primaryGoal}
Target Users: ${projectBrief.targetUsers}

Scope (In):
${projectBrief.scopeIn.map((s: string) => `- ${s}`).join("\n")}

Scope (Out):
${projectBrief.scopeOut.map((s: string) => `- ${s}`).join("\n")}

Success Criteria:
${projectBrief.successCriteria.map((s: string) => `- ${s}`).join("\n")}

Timeline & Milestones:
${projectBrief.timelineMilestones.map((s: string) => `- ${s}`).join("\n")}

Risks & Constraints:
${projectBrief.risksConstraints.length > 0 ? projectBrief.risksConstraints.map((s: string) => `- ${s}`).join("\n") : "None identified"}

Ownership / Roles:
${Object.entries(projectBrief.ownership).map(([k, v]) => `${k}: ${v}`).join("\n")}

Recommended Next Steps:
${projectBrief.nextSteps.map((s: string) => `- ${s}`).join("\n")}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyJSON = () => {
    if (!projectBrief) return;
    navigator.clipboard.writeText(JSON.stringify(projectBrief, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateAgenda = () => {
    if (!projectBrief) return "";
    return `15-Minute Alignment Agenda

1. Review Project Brief (2 min)
   - Summary: ${projectBrief.summary}
   - Primary Goal: ${projectBrief.primaryGoal}

2. Confirm Scope Boundaries (3 min)
   - In scope: ${projectBrief.scopeIn.slice(0, 2).join(", ")}
   - Out of scope: ${projectBrief.scopeOut.slice(0, 2).join(", ")}

3. Validate Success Criteria (3 min)
   - ${projectBrief.successCriteria.slice(0, 2).join("\n   - ")}

4. Confirm Timeline & Ownership (4 min)
   - Timeline: ${projectBrief.timelineMilestones[0]}
   - Owner: ${Object.values(projectBrief.ownership)[2]}

5. Decisions Needed (3 min)
   - Approve scope boundaries?
   - Confirm success metrics?
   - Assign delivery lead?`;
  };

  const copyAgenda = () => {
    const agenda = generateAgenda();
    navigator.clipboard.writeText(agenda);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "I'm your Requirements Assistant. I'll help you turn your request into a clear project brief with defined scope, success criteria, and next steps.",
      },
    ]);
    setInput("");
    setProjectBrief(null);
    setCurrentQuestion(0);
    setScenario(null);
    setAnswers({});
    setIsProcessing(false);
  };

  const dismissGuide = () => {
    setShowGuide(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("aiAssistantGuideDismissed", "true");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-primary-text mb-2">
          Requirements Assistant
        </h3>
        <p className="text-secondary-text text-sm">
          Turn fuzzy requests into clear project briefs with defined scope, success criteria, and next steps
        </p>
      </div>

      {/* How to Use Guide */}
      <AnimatePresence>
        {showGuide ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="bg-emerald-tint border border-emerald-primary/30 rounded-xl p-5 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-sm font-semibold text-emerald-dark">
                How to use the Requirements Assistant
              </h4>
              <button
                onClick={dismissGuide}
                className="text-emerald-dark hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 rounded"
                aria-label="Dismiss guide"
              >
                <X size={18} />
              </button>
            </div>
            <ol className="space-y-2 text-sm text-emerald-dark mb-3">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">1.</span>
                <span>Choose what you&apos;re trying to build (Website, Automation, or Both).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">2.</span>
                <span>Answer a few prompts to clarify goals and constraints.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">3.</span>
                <span>Review the Project Brief and recommended next steps.</span>
              </li>
            </ol>
            <p className="text-xs text-emerald-dark mb-4 italic">
              <strong>Why it matters:</strong> Directors use structured intake to reduce rework and align stakeholders fast.
            </p>
            <button
              onClick={dismissGuide}
              className="px-4 py-2 bg-emerald-primary text-white text-sm font-medium rounded-lg hover:bg-emerald-hover transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            >
              Got it
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-border rounded-full hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            aria-label="Show tips"
          >
            <HelpCircle size={14} />
            Show tips
          </button>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          {/* Executive Mode Toggle */}
          <div className="flex items-center justify-between p-3 bg-section-bg rounded-lg border border-border">
            <span className="text-sm font-semibold text-primary-text">Executive Mode</span>
            <button
              onClick={() => setExecutiveMode(!executiveMode)}
              className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
                executiveMode ? "bg-emerald-primary" : "bg-border"
              }`}
              aria-label={`Toggle executive mode: ${executiveMode ? "on" : "off"}`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  executiveMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Quick-Start Presets */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePreset("website")}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                aria-label="Launch a new website in 30 days"
              >
                Launch a new website in 30 days
              </button>
              <button
                onClick={() => handlePreset("automation")}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                aria-label="Automate intake + follow-ups"
              >
                Automate intake + follow-ups
              </button>
              <button
                onClick={() => handlePreset("ops-workflow")}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                aria-label="Fix a messy process (Ops workflow)"
              >
                Fix a messy process (Ops workflow)
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl border border-border p-4 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-emerald-primary text-white"
                        : "bg-section-bg text-primary-text"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-section-bg rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-emerald-primary rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-emerald-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-emerald-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length > 1 && messages[messages.length - 1]?.quickReplies && (
              <div className="flex flex-wrap gap-2 mb-3">
                {messages[messages.length - 1].quickReplies?.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="px-3 py-1.5 text-xs border border-border rounded-full hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                    aria-label={`Quick reply: ${reply}`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
                aria-label="Chat input"
                disabled={isProcessing}
              />
              <button
                onClick={() => handleSend()}
                disabled={isProcessing || !input.trim()}
                className="px-4 py-2 bg-emerald-primary text-white rounded-lg hover:bg-emerald-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border text-secondary-text rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            aria-label="Reset assistant"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* What Assistant Captures + Project Brief */}
        <div className="lg:col-span-1 space-y-4">
          {/* What Assistant Captures */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h4 className="text-sm font-semibold text-primary-text mb-4">
              What this assistant captures
            </h4>
            <ul className="space-y-2 text-xs text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Goal & audience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Priority & timeline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Definition of done (success criteria)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Constraints & risks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Recommended approach</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Next steps & ownership</span>
              </li>
            </ul>
          </div>

          {/* Project Brief */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-primary-text">
                Project Brief
              </h4>
              {projectBrief && (
                <div className="flex gap-2">
                  <button
                    onClick={copyBrief}
                    className="p-1.5 text-emerald-primary hover:bg-emerald-tint rounded transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                    aria-label="Copy brief"
                    title="Copy brief"
                  >
                    <ClipboardCopy size={14} />
                  </button>
                  <button
                    onClick={copyJSON}
                    className="p-1.5 text-emerald-primary hover:bg-emerald-tint rounded transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                    aria-label="Copy as JSON"
                    title="Copy as JSON"
                  >
                    <FileText size={14} />
                  </button>
                  <button
                    onClick={copyAgenda}
                    className="p-1.5 text-emerald-primary hover:bg-emerald-tint rounded transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                    aria-label="Generate meeting agenda"
                    title="Generate 15-min alignment agenda"
                  >
                    <Calendar size={14} />
                  </button>
                </div>
              )}
            </div>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 px-3 py-2 bg-emerald-tint text-emerald-dark text-xs rounded-lg"
              >
                Copied to clipboard!
              </motion.div>
            )}
            {projectBrief ? (
              <motion.div
                key={JSON.stringify(projectBrief)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="space-y-4 max-h-[600px] overflow-y-auto"
              >
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Summary
                  </div>
                  <p className="text-sm text-secondary-text">{projectBrief.summary}</p>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Primary Goal
                  </div>
                  <p className="text-sm text-secondary-text">{projectBrief.primaryGoal}</p>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Target Users / Audience
                  </div>
                  <p className="text-sm text-secondary-text">{projectBrief.targetUsers}</p>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Scope (In)
                  </div>
                  <ul className="space-y-1">
                    {projectBrief.scopeIn.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-secondary-text"
                      >
                        <span className="text-emerald-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Scope (Out)
                  </div>
                  <ul className="space-y-1">
                    {projectBrief.scopeOut.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-secondary-text"
                      >
                        <span className="text-muted-text mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Success Criteria
                  </div>
                  <ul className="space-y-1">
                    {projectBrief.successCriteria.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-secondary-text"
                      >
                        <span className="text-emerald-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Timeline & Milestones
                  </div>
                  <ul className="space-y-1">
                    {projectBrief.timelineMilestones.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-secondary-text"
                      >
                        <span className="text-emerald-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Risks & Constraints
                  </div>
                  {projectBrief.risksConstraints.length > 0 ? (
                    <ul className="space-y-1">
                      {projectBrief.risksConstraints.map((item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-secondary-text"
                        >
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-text">None identified</p>
                  )}
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Ownership / Roles
                  </div>
                  <div className="space-y-1">
                    {Object.entries(projectBrief.ownership).map(([role, owner]) => (
                      <div key={role} className="text-sm text-secondary-text">
                        <span className="font-medium">{role}:</span> {owner as string}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-text uppercase tracking-wider mb-1">
                    Recommended Next Steps
                  </div>
                  <ul className="space-y-1">
                    {projectBrief.nextSteps.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-secondary-text"
                      >
                        <span className="text-emerald-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <p className="text-sm text-muted-text">
                Answer the prompts to generate your project brief
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="pt-6 border-t border-border">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              What this demonstrates
            </h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Structured requirement gathering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Clear scope boundaries and success criteria</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Faster stakeholder alignment</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              Typical use cases
            </h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Project initiation and scoping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Stakeholder requirement clarification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Pre-meeting alignment preparation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Module 4: UI Studio
type Template = "dashboard" | "landing" | "intake" | "report";

interface DashboardControls {
  kpiDensity: "compact" | "comfortable";
  navigation: "topBar" | "leftRail";
  dataRichness: 3 | 6;
  sorting: boolean;
  filters: boolean;
  actionPattern: "primaryCTA" | "inline";
}

interface LandingControls {
  heroLayout: "centered" | "split";
  ctaStyle: "solid" | "soft" | "outline";
  socialProof: "none" | "reviews" | "logos";
  formFriction: 3 | 6 | 10;
  urgencyBanner: boolean;
}

interface IntakeControls {
  strictness: "lightweight" | "standard" | "governance";
  requiredFields: "low" | "med" | "high";
  approvalPath: "single" | "multi";
  slaBadge: boolean;
  riskChecks: boolean;
}

interface ReportControls {
  narrative: "summary" | "metrics";
  charts: boolean;
  highlights: 3 | 5 | 8;
  statusStyle: "dots" | "pills";
  exportActions: boolean;
}

type Controls = DashboardControls | LandingControls | IntakeControls | ReportControls;

function UIComponents() {
  const [template, setTemplate] = useState<Template>("dashboard");
  const [showGuide, setShowGuide] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const prefersReducedMotion = usePrefersReducedMotion();

  // Dashboard controls
  const [dashboardControls, setDashboardControls] = useState<DashboardControls>({
    kpiDensity: "comfortable",
    navigation: "leftRail",
    dataRichness: 6,
    sorting: true,
    filters: true,
    actionPattern: "inline",
  });

  // Landing controls
  const [landingControls, setLandingControls] = useState<LandingControls>({
    heroLayout: "centered",
    ctaStyle: "solid",
    socialProof: "reviews",
    formFriction: 6,
    urgencyBanner: true,
  });

  // Intake controls
  const [intakeControls, setIntakeControls] = useState<IntakeControls>({
    strictness: "standard",
    requiredFields: "med",
    approvalPath: "single",
    slaBadge: true,
    riskChecks: true,
  });

  // Report controls
  const [reportControls, setReportControls] = useState<ReportControls>({
    narrative: "summary",
    charts: true,
    highlights: 5,
    statusStyle: "pills",
    exportActions: true,
  });

  // Check localStorage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("uiStudioGuideDismissed");
      if (dismissed) {
        setShowGuide(false);
      }
    }
  }, []);

  // Handle Escape key for modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  const dismissGuide = () => {
    setShowGuide(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("uiStudioGuideDismissed", "true");
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTableSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.email.includes("@")) errors.email = "Invalid email";
    if (!formData.message) errors.message = "Message is required";

    if (Object.keys(errors).length === 0) {
      showToastMessage("Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const getCurrentControls = (): Controls => {
    switch (template) {
      case "dashboard":
        return dashboardControls;
      case "landing":
        return landingControls;
      case "intake":
        return intakeControls;
      case "report":
        return reportControls;
    }
  };

  const copyConfig = () => {
    const config = {
      template,
      controls: getCurrentControls(),
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    showToastMessage("Configuration copied!");
  };

  const copyBuildNotes = () => {
    const notes = generateBuildNotes();
    navigator.clipboard.writeText(notes);
    showToastMessage("Build notes copied!");
  };

  const generateBuildNotes = () => {
    const controls = getCurrentControls();
    let notes = `Implementation Notes: ${template.charAt(0).toUpperCase() + template.slice(1)} Template\n\n`;

    if (template === "dashboard") {
      const c = controls as DashboardControls;
      notes += `- KPI Density: ${c.kpiDensity}\n`;
      notes += `- Navigation: ${c.navigation}\n`;
      notes += `- Data Richness: ${c.dataRichness} KPIs\n`;
      notes += `- Table Features: Sorting ${c.sorting ? "On" : "Off"}, Filters ${c.filters ? "On" : "Off"}\n`;
      notes += `- Action Pattern: ${c.actionPattern === "primaryCTA" ? "Primary CTA" : "Inline actions"}\n`;
    } else if (template === "landing") {
      const c = controls as LandingControls;
      notes += `- Hero Layout: ${c.heroLayout}\n`;
      notes += `- CTA Style: ${c.ctaStyle}\n`;
      notes += `- Social Proof: ${c.socialProof}\n`;
      notes += `- Form Fields: ${c.formFriction}\n`;
      notes += `- Urgency Banner: ${c.urgencyBanner ? "On" : "Off"}\n`;
    } else if (template === "intake") {
      const c = controls as IntakeControls;
      notes += `- Intake Strictness: ${c.strictness}\n`;
      notes += `- Required Fields: ${c.requiredFields}\n`;
      notes += `- Approval Path: ${c.approvalPath === "single" ? "Single approver" : "Multi-stakeholder"}\n`;
      notes += `- SLA Badge: ${c.slaBadge ? "Show" : "Hide"}\n`;
      notes += `- Risk Checks: ${c.riskChecks ? "On" : "Off"}\n`;
      notes += `\nAdds triage, risk flags, ownership, and SLA visibility.`;
    } else if (template === "report") {
      const c = controls as ReportControls;
      notes += `- Narrative Style: ${c.narrative === "summary" ? "Summary-first" : "Metrics-first"}\n`;
      notes += `- Charts: ${c.charts ? "Show" : "Hide"}\n`;
      notes += `- Highlights: ${c.highlights} bullets\n`;
      notes += `- Status Style: ${c.statusStyle}\n`;
      notes += `- Export Actions: ${c.exportActions ? "On" : "Off"}\n`;
    }

    return notes;
  };

  const applyPreset = (preset: "minimal" | "highVisibility") => {
    if (template === "dashboard") {
      if (preset === "minimal") {
        setDashboardControls({
          kpiDensity: "compact",
          navigation: "topBar",
          dataRichness: 3,
          sorting: false,
          filters: false,
          actionPattern: "primaryCTA",
        });
      } else {
        setDashboardControls({
          kpiDensity: "comfortable",
          navigation: "leftRail",
          dataRichness: 6,
          sorting: true,
          filters: true,
          actionPattern: "inline",
        });
      }
    } else if (template === "landing") {
      if (preset === "minimal") {
        setLandingControls({
          heroLayout: "centered",
          ctaStyle: "outline",
          socialProof: "none",
          formFriction: 3,
          urgencyBanner: false,
        });
      } else {
        setLandingControls({
          heroLayout: "split",
          ctaStyle: "solid",
          socialProof: "logos",
          formFriction: 10,
          urgencyBanner: true,
        });
      }
    } else if (template === "intake") {
      if (preset === "minimal") {
        setIntakeControls({
          strictness: "lightweight",
          requiredFields: "low",
          approvalPath: "single",
          slaBadge: false,
          riskChecks: false,
        });
      } else {
        setIntakeControls({
          strictness: "governance",
          requiredFields: "high",
          approvalPath: "multi",
          slaBadge: true,
          riskChecks: true,
        });
      }
    } else if (template === "report") {
      if (preset === "minimal") {
        setReportControls({
          narrative: "metrics",
          charts: false,
          highlights: 3,
          statusStyle: "dots",
          exportActions: false,
        });
      } else {
        setReportControls({
          narrative: "summary",
          charts: true,
          highlights: 8,
          statusStyle: "pills",
          exportActions: true,
        });
      }
    }
  };

  const reset = () => {
    setDashboardControls({
      kpiDensity: "comfortable",
      navigation: "leftRail",
      dataRichness: 6,
      sorting: true,
      filters: true,
      actionPattern: "inline",
    });
    setLandingControls({
      heroLayout: "centered",
      ctaStyle: "solid",
      socialProof: "reviews",
      formFriction: 6,
      urgencyBanner: true,
    });
    setIntakeControls({
      strictness: "standard",
      requiredFields: "med",
      approvalPath: "single",
      slaBadge: true,
      riskChecks: true,
    });
    setReportControls({
      narrative: "summary",
      charts: true,
      highlights: 5,
      statusStyle: "pills",
      exportActions: true,
    });
    setFormData({ name: "", email: "", message: "" });
    setFormErrors({});
    setSortColumn(null);
    setShowModal(false);
  };

  const templates = [
    { id: "dashboard" as Template, label: "Executive Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "landing" as Template, label: "Lead Gen Landing", icon: <Target size={20} /> },
    { id: "intake" as Template, label: "Stakeholder Intake", icon: <ClipboardList size={20} /> },
    { id: "report" as Template, label: "Weekly Report", icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-primary-text mb-2">
          UI Studio: Build a Mini Interface
        </h3>
        <p className="text-secondary-text text-sm">
          Choose a template, customize controls, and interact with a live preview
        </p>
      </div>

      {/* How to Use Guide */}
      <AnimatePresence>
        {showGuide ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="bg-emerald-tint border border-emerald-primary/30 rounded-xl p-5 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-sm font-semibold text-emerald-dark">
                Build a mini interface
              </h4>
              <button
                onClick={dismissGuide}
                className="text-emerald-dark hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 rounded"
                aria-label="Dismiss guide"
              >
                <X size={18} />
              </button>
            </div>
            <ol className="space-y-2 text-sm text-emerald-dark mb-4">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">1.</span>
                <span>Pick a template.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">2.</span>
                <span>Adjust controls.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">3.</span>
                <span>Interact with the preview.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-primary">4.</span>
                <span>Copy configuration.</span>
              </li>
            </ol>
            <button
              onClick={dismissGuide}
              className="px-4 py-2 bg-emerald-primary text-white text-sm font-medium rounded-lg hover:bg-emerald-hover transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            >
              Got it
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-border rounded-full hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
            aria-label="Show tips"
          >
            <HelpCircle size={14} />
            Show tips
          </button>
        )}
      </AnimatePresence>

      {/* Template Picker */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {templates.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            whileHover={prefersReducedMotion ? {} : { y: -2 }}
            className={`p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
              template === t.id
                ? "border-emerald-primary bg-emerald-tint shadow-md"
                : "border-border bg-white hover:border-emerald-primary/50"
            }`}
            aria-label={`Select ${t.label} template`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={template === t.id ? "text-emerald-primary" : "text-secondary-text"}>
                {t.icon}
              </div>
              <span className={`text-sm font-semibold ${
                template === t.id ? "text-emerald-primary" : "text-primary-text"
              }`}>
                {t.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Studio Controls */}
        <div className="space-y-6">
          <div className="bg-section-bg rounded-xl border border-border p-6">
            <h4 className="text-sm font-semibold text-primary-text mb-4">
              Studio Controls
            </h4>
            <div className="space-y-4">
              {/* Template-specific controls */}
              {template === "dashboard" && (
                <>
                  <ControlGroup label="KPI Density">
                    {(["compact", "comfortable"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setDashboardControls({ ...dashboardControls, kpiDensity: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          dashboardControls.kpiDensity === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="Navigation">
                    {(["topBar", "leftRail"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setDashboardControls({ ...dashboardControls, navigation: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          dashboardControls.navigation === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt === "topBar" ? "Top Bar" : "Left Rail"}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="Data Richness">
                    {([3, 6] as const).map((num) => (
                      <button
                        key={num}
                        onClick={() => setDashboardControls({ ...dashboardControls, dataRichness: num })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          dashboardControls.dataRichness === num
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {num} KPIs
                      </button>
                    ))}
                  </ControlGroup>
                  <ToggleControl
                    label="Table Sorting"
                    value={dashboardControls.sorting}
                    onChange={(val) => setDashboardControls({ ...dashboardControls, sorting: val })}
                  />
                  <ToggleControl
                    label="Table Filters"
                    value={dashboardControls.filters}
                    onChange={(val) => setDashboardControls({ ...dashboardControls, filters: val })}
                  />
                  <ControlGroup label="Action Pattern">
                    {(["primaryCTA", "inline"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setDashboardControls({ ...dashboardControls, actionPattern: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          dashboardControls.actionPattern === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt === "primaryCTA" ? "Primary CTA" : "Inline Actions"}
                      </button>
                    ))}
                  </ControlGroup>
                </>
              )}

              {template === "landing" && (
                <>
                  <ControlGroup label="Hero Layout">
                    {(["centered", "split"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLandingControls({ ...landingControls, heroLayout: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          landingControls.heroLayout === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="CTA Style">
                    {(["solid", "soft", "outline"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLandingControls({ ...landingControls, ctaStyle: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          landingControls.ctaStyle === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="Social Proof">
                    {(["none", "reviews", "logos"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLandingControls({ ...landingControls, socialProof: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          landingControls.socialProof === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="Form Fields">
                    {([3, 6, 10] as const).map((num) => (
                      <button
                        key={num}
                        onClick={() => setLandingControls({ ...landingControls, formFriction: num })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          landingControls.formFriction === num
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {num === 3 ? "Short" : num === 6 ? "Medium" : "Long"}
                      </button>
                    ))}
                  </ControlGroup>
                  <ToggleControl
                    label="Urgency Banner"
                    value={landingControls.urgencyBanner}
                    onChange={(val) => setLandingControls({ ...landingControls, urgencyBanner: val })}
                  />
                </>
              )}

              {template === "intake" && (
                <>
                  <ControlGroup label="Intake Strictness">
                    {(["lightweight", "standard", "governance"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setIntakeControls({ ...intakeControls, strictness: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          intakeControls.strictness === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt === "governance" ? "Governance-heavy" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="Required Fields">
                    {(["low", "med", "high"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setIntakeControls({ ...intakeControls, requiredFields: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          intakeControls.requiredFields === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="Approval Path">
                    {(["single", "multi"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setIntakeControls({ ...intakeControls, approvalPath: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          intakeControls.approvalPath === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt === "single" ? "Single Approver" : "Multi-stakeholder"}
                      </button>
                    ))}
                  </ControlGroup>
                  <ToggleControl
                    label="SLA Badge"
                    value={intakeControls.slaBadge}
                    onChange={(val) => setIntakeControls({ ...intakeControls, slaBadge: val })}
                  />
                  <ToggleControl
                    label="Risk Checks"
                    value={intakeControls.riskChecks}
                    onChange={(val) => setIntakeControls({ ...intakeControls, riskChecks: val })}
                  />
                </>
              )}

              {template === "report" && (
                <>
                  <ControlGroup label="Narrative Style">
                    {(["summary", "metrics"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setReportControls({ ...reportControls, narrative: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          reportControls.narrative === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt === "summary" ? "Summary-first" : "Metrics-first"}
                      </button>
                    ))}
                  </ControlGroup>
                  <ToggleControl
                    label="Charts"
                    value={reportControls.charts}
                    onChange={(val) => setReportControls({ ...reportControls, charts: val })}
                  />
                  <ControlGroup label="Highlights">
                    {([3, 5, 8] as const).map((num) => (
                      <button
                        key={num}
                        onClick={() => setReportControls({ ...reportControls, highlights: num })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          reportControls.highlights === num
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </ControlGroup>
                  <ControlGroup label="Status Style">
                    {(["dots", "pills"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setReportControls({ ...reportControls, statusStyle: opt })}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          reportControls.statusStyle === opt
                            ? "bg-emerald-primary text-white border-emerald-primary"
                            : "bg-white text-secondary-text border-border hover:border-emerald-primary"
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </ControlGroup>
                  <ToggleControl
                    label="Export Actions"
                    value={reportControls.exportActions}
                    onChange={(val) => setReportControls({ ...reportControls, exportActions: val })}
                  />
                </>
              )}
            </div>

            {/* Presets */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => applyPreset("minimal")}
                  className="flex-1 px-3 py-2 text-xs border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                >
                  Minimal
                </button>
                <button
                  onClick={() => applyPreset("highVisibility")}
                  className="flex-1 px-3 py-2 text-xs border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                >
                  High Visibility
                </button>
              </div>
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border text-secondary-text rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                aria-label="Reset controls"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Surface */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-primary-text">
                Live Preview Surface
              </h4>
              <span className="px-2 py-1 text-xs bg-emerald-tint text-emerald-dark rounded-full border border-emerald-primary/30">
                Preview is interactive
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={template}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="min-h-[400px]"
              >
                {template === "dashboard" && (
                  <DashboardPreview
                    controls={dashboardControls}
                    onSort={handleTableSort}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onButtonClick={() => showToastMessage("Saved!")}
                    onModalOpen={() => setShowModal(true)}
                  />
                )}
                {template === "landing" && (
                  <LandingPreview
                    controls={landingControls}
                    formData={formData}
                    formErrors={formErrors}
                    onFormChange={(field, value) => setFormData({ ...formData, [field]: value })}
                    onFormSubmit={handleFormSubmit}
                    onButtonClick={() => showToastMessage("Request submitted!")}
                  />
                )}
                {template === "intake" && (
                  <IntakePreview
                    controls={intakeControls}
                    onButtonClick={() => showToastMessage("Request submitted!")}
                  />
                )}
                {template === "report" && (
                  <ReportPreview
                    controls={reportControls}
                    onExport={() => showToastMessage("Exporting PDF...")}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Export Actions */}
          <div className="bg-section-bg rounded-xl border border-border p-6">
            <h4 className="text-sm font-semibold text-primary-text mb-4">
              Export
            </h4>
            <div className="flex gap-3">
              <button
                onClick={copyConfig}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border text-secondary-text rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                aria-label="Copy configuration JSON"
              >
                <Copy size={16} />
                Copy Config (JSON)
              </button>
              <button
                onClick={copyBuildNotes}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border text-secondary-text rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
                aria-label="Copy build notes"
              >
                <FileText size={16} />
                Copy Build Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-primary-text text-white px-4 py-3 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl border border-border p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-primary-text">Request Details</h4>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-muted-text hover:text-primary-text transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 rounded"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 text-sm text-secondary-text">
                <div>
                  <span className="font-medium">Request ID:</span> #12345
                </div>
                <div>
                  <span className="font-medium">Status:</span> In Progress
                </div>
                <div>
                  <span className="font-medium">Owner:</span> PMO Team
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  showToastMessage("Details saved!");
                }}
                className="mt-4 w-full px-4 py-2 bg-emerald-primary text-white rounded-lg hover:bg-emerald-hover transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* What this demonstrates + Implementation Notes */}
      <div className="pt-6 border-t border-border">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              What this demonstrates
            </h4>
            <ul className="space-y-2 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Consistent UI patterns across interfaces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Faster delivery with reusable templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Stakeholder clarity through visual previews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>UX polish and micro-interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Governance options for different use cases</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-text mb-3">
              Implementation Notes
            </h4>
            <p className="text-sm text-secondary-text">
              {template === "intake"
                ? "Adds triage, risk flags, ownership, and SLA visibility."
                : template === "dashboard"
                ? "Provides executive visibility with customizable KPI density and navigation patterns."
                : template === "landing"
                ? "Optimizes conversion with flexible hero layouts, CTA styles, and form friction controls."
                : "Delivers clear reporting with configurable narrative styles, charts, and status indicators."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-primary-text mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ToggleControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
      <span className="text-xs font-semibold text-primary-text">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2 ${
          value ? "bg-emerald-primary" : "bg-border"
        }`}
        aria-label={`Toggle ${label}: ${value ? "on" : "off"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

// Preview Components
function DashboardPreview({
  controls,
  onSort,
  sortColumn,
  sortDirection,
  onButtonClick,
  onModalOpen,
}: {
  controls: DashboardControls;
  onSort: (col: string) => void;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  onButtonClick: () => void;
  onModalOpen: () => void;
}) {
  const tableData = [
    { id: 1, project: "Website Redesign", status: "On Track", owner: "PMO", value: "$45K" },
    { id: 2, project: "Automation Sprint", status: "At Risk", owner: "Delivery", value: "$28K" },
    { id: 3, project: "AI Integration", status: "On Track", owner: "Tech", value: "$62K" },
  ];

  const sortedData = [...tableData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof typeof a];
    const bVal = b[sortColumn as keyof typeof b];
    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      {/* Navigation */}
      {controls.navigation === "topBar" ? (
        <div className="flex items-center justify-between p-3 bg-section-bg rounded-lg border border-border">
          <span className="text-sm font-semibold text-primary-text">Dashboard</span>
          <div className="flex gap-2">
            <button
              onClick={onButtonClick}
              className="px-3 py-1.5 text-xs bg-emerald-primary text-white rounded-lg hover:bg-emerald-hover transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="w-20 bg-section-bg rounded-lg border border-border p-3">
            <div className="space-y-2">
              <div className="h-2 bg-emerald-primary rounded" />
              <div className="h-2 bg-border rounded" />
              <div className="h-2 bg-border rounded" />
            </div>
          </div>
          <div className="flex-1" />
        </div>
      )}

      {/* KPIs */}
      <div
        className={`grid gap-3 ${
          controls.dataRichness === 3 ? "grid-cols-3" : "grid-cols-3"
        }`}
      >
        {Array.from({ length: controls.dataRichness }).map((_, i) => (
          <div
            key={i}
            className={`p-4 bg-section-bg rounded-lg border border-border ${
              controls.kpiDensity === "compact" ? "p-3" : "p-4"
            }`}
          >
            <div className="text-xs text-muted-text mb-1">KPI {i + 1}</div>
            <div className="text-lg font-bold text-primary-text">
              ${(Math.random() * 100).toFixed(0)}K
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-section-bg">
            <tr>
              <th
                className="text-left p-3 font-semibold text-primary-text cursor-pointer hover:bg-border transition-colors"
                onClick={() => controls.sorting && onSort("project")}
              >
                <div className="flex items-center gap-2">
                  Project
                  {controls.sorting && sortColumn === "project" && (
                    <ArrowUpDown size={14} className="text-emerald-primary" />
                  )}
                </div>
              </th>
              <th
                className="text-left p-3 font-semibold text-primary-text cursor-pointer hover:bg-border transition-colors"
                onClick={() => controls.sorting && onSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  {controls.sorting && sortColumn === "status" && (
                    <ArrowUpDown size={14} className="text-emerald-primary" />
                  )}
                </div>
              </th>
              <th className="text-left p-3 font-semibold text-primary-text">Owner</th>
              <th className="text-right p-3 font-semibold text-primary-text">Value</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-t border-border hover:bg-section-bg transition-colors">
                <td className="p-3 text-secondary-text">{row.project}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.status === "On Track"
                        ? "bg-emerald-tint text-emerald-dark"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3 text-secondary-text">{row.owner}</td>
                <td className="p-3 text-right text-secondary-text">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      {controls.actionPattern === "primaryCTA" ? (
        <button
          onClick={onModalOpen}
          className="w-full px-4 py-3 bg-emerald-primary text-white rounded-lg hover:bg-emerald-hover transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:ring-offset-2"
        >
          Add New Project
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onButtonClick}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors"
          >
            Export
          </button>
          <button
            onClick={onModalOpen}
            className="px-4 py-2 text-sm bg-emerald-primary text-white rounded-lg hover:bg-emerald-hover transition-colors"
          >
            Add Item
          </button>
        </div>
      )}

      {/* Filters */}
      {controls.filters && (
        <div className="flex items-center gap-2 p-3 bg-section-bg rounded-lg border border-border">
          <Filter size={14} className="text-muted-text" />
          <span className="text-xs text-secondary-text">Active filters: Status, Owner</span>
        </div>
      )}
    </div>
  );
}

function LandingPreview({
  controls,
  formData,
  formErrors,
  onFormChange,
  onFormSubmit,
  onButtonClick,
}: {
  controls: LandingControls;
  formData: { name: string; email: string; message: string };
  formErrors: Record<string, string>;
  onFormChange: (field: string, value: string) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  onButtonClick: () => void;
}) {
  const getCTAClass = () => {
    if (controls.ctaStyle === "solid") {
      return "bg-emerald-primary text-white hover:bg-emerald-hover";
    } else if (controls.ctaStyle === "soft") {
      return "bg-emerald-tint text-emerald-dark hover:bg-emerald-primary/20";
    } else {
      return "border-2 border-emerald-primary text-emerald-primary hover:bg-emerald-tint";
    }
  };

  return (
    <div className="space-y-4">
      {/* Urgency Banner */}
      {controls.urgencyBanner && (
        <div className="p-3 bg-gold-500/10 border border-gold-500/30 rounded-lg text-center">
          <span className="text-xs font-medium text-gold-600">
            Limited time: Get started today and save 20%
          </span>
        </div>
      )}

      {/* Hero */}
      {controls.heroLayout === "centered" ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-primary-text mb-3">
            Transform Your Operations
          </h2>
          <p className="text-secondary-text mb-6">
            Automation and AI systems that eliminate manual work in weeks—not months.
          </p>
          <button
            onClick={onButtonClick}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${getCTAClass()}`}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-primary-text mb-3">
              Transform Your Operations
            </h2>
            <p className="text-secondary-text mb-6">
              Automation and AI systems that eliminate manual work.
            </p>
            <button
              onClick={onButtonClick}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${getCTAClass()}`}
            >
              Get Started
            </button>
          </div>
          <div className="bg-section-bg rounded-lg border border-border p-8 flex items-center justify-center">
            <span className="text-muted-text text-sm">Image Placeholder</span>
          </div>
        </div>
      )}

      {/* Social Proof */}
      {controls.socialProof === "reviews" && (
        <div className="p-4 bg-section-bg rounded-lg border border-border">
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-gold-500">★</span>
            ))}
          </div>
          <p className="text-xs text-secondary-text">
            &quot;This changed how we operate. Highly recommend!&quot; — Sarah M.
          </p>
        </div>
      )}
      {controls.socialProof === "logos" && (
        <div className="flex items-center justify-center gap-6 p-4 bg-section-bg rounded-lg border border-border">
          {["Company A", "Company B", "Company C"].map((name, i) => (
            <div key={i} className="text-xs text-muted-text font-semibold">{name}</div>
          ))}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onFormSubmit} className="space-y-3">
        {Array.from({ length: controls.formFriction }).map((_, i) => {
          if (i === 0) {
            return (
              <div key={i}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => onFormChange("name", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary ${
                    formErrors.name ? "border-orange-500" : "border-border"
                  }`}
                />
                {formErrors.name && (
                  <p className="text-xs text-orange-500 mt-1">{formErrors.name}</p>
                )}
              </div>
            );
          } else if (i === 1) {
            return (
              <div key={i}>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => onFormChange("email", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary ${
                    formErrors.email ? "border-orange-500" : "border-border"
                  }`}
                />
                {formErrors.email && (
                  <p className="text-xs text-orange-500 mt-1">{formErrors.email}</p>
                )}
              </div>
            );
          } else if (i === 2) {
            return (
              <div key={i}>
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => onFormChange("message", e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary ${
                    formErrors.message ? "border-orange-500" : "border-border"
                  }`}
                />
                {formErrors.message && (
                  <p className="text-xs text-orange-500 mt-1">{formErrors.message}</p>
                )}
              </div>
            );
          } else {
            return (
              <input
                key={i}
                type="text"
                placeholder={`Field ${i + 1}`}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary"
              />
            );
          }
        })}
        <button
          type="submit"
          className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${getCTAClass()}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function IntakePreview({
  controls,
  onButtonClick,
}: {
  controls: IntakeControls;
  onButtonClick: () => void;
}) {
  const requiredFieldsCount =
    controls.requiredFields === "low" ? 2 : controls.requiredFields === "med" ? 4 : 6;

  return (
    <div className="space-y-4">
      <div className="p-4 bg-section-bg rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-primary-text mb-2">Stakeholder Intake</h3>
        <p className="text-xs text-secondary-text mb-4">
          Strictness: {controls.strictness} | Required: {requiredFieldsCount} fields
        </p>

        <div className="space-y-3">
          {Array.from({ length: requiredFieldsCount }).map((_, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder={`Field ${i + 1} ${i < 2 ? "*" : ""}`}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary"
              />
            </div>
          ))}
        </div>

        {controls.riskChecks && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-orange-600" />
              <span className="text-xs font-semibold text-orange-700">Risk Check</span>
            </div>
            <p className="text-xs text-orange-600">
              This request may require additional approval due to scope.
            </p>
          </div>
        )}

        {controls.slaBadge && (
          <div className="mt-4 flex items-center gap-2">
            <Timer size={14} className="text-emerald-primary" />
            <span className="text-xs text-secondary-text">SLA: Response within 24 hours</span>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {controls.approvalPath === "multi" && (
            <div className="flex-1 p-2 bg-section-bg rounded border border-border text-xs text-secondary-text">
              Multi-stakeholder approval required
            </div>
          )}
          <button
            onClick={onButtonClick}
            className="px-4 py-2 bg-emerald-primary text-white rounded-lg hover:bg-emerald-hover transition-colors text-sm"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportPreview({
  controls,
  onExport,
}: {
  controls: ReportControls;
  onExport: () => void;
}) {
  return (
    <div className="space-y-4">
      {controls.narrative === "summary" ? (
        <div className="p-4 bg-section-bg rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-primary-text mb-3">Weekly Summary</h3>
          <p className="text-sm text-secondary-text mb-4">
            This week we completed 3 major milestones and launched 2 new features. Team velocity
            increased by 15%.
          </p>
          <div className="space-y-2">
            {Array.from({ length: controls.highlights }).map((_, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-secondary-text">
                <span className="text-emerald-primary mt-1">•</span>
                <span>Highlight {i + 1}: Key achievement or update</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-section-bg rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Key Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            {["Metric 1", "Metric 2", "Metric 3"].map((label, i) => (
              <div key={i}>
                <div className="text-xs text-muted-text mb-1">{label}</div>
                <div className="text-xl font-bold text-primary-text">
                  {Math.floor(Math.random() * 100)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {controls.charts && (
        <div className="p-4 bg-section-bg rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-primary-text mb-3">Performance Chart</h4>
          <div className="flex items-end gap-2 h-32">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-primary rounded-t"
                style={{ height: `${Math.random() * 80 + 20}%` }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {["Project A", "Project B", "Project C"].map((project, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-section-bg rounded-lg border border-border"
          >
            <span className="text-sm text-secondary-text">{project}</span>
            {controls.statusStyle === "pills" ? (
              <span className="px-2 py-1 bg-emerald-tint text-emerald-dark rounded-full text-xs">
                On Track
              </span>
            ) : (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-primary rounded-full" />
                <div className="w-2 h-2 bg-border rounded-full" />
                <div className="w-2 h-2 bg-border rounded-full" />
              </div>
            )}
          </div>
        ))}
      </div>

      {controls.exportActions && (
        <button
          onClick={onExport}
          className="w-full px-4 py-2 border border-border rounded-lg hover:border-emerald-primary hover:text-emerald-primary transition-colors text-sm"
        >
          Export PDF
        </button>
      )}
    </div>
  );
}
