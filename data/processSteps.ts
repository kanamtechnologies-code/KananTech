export interface ProcessStep {
  id: number;
  title: string;
  purpose: string;
  whatYouProvide: string[];
  whatWeDo: string[];
  deliverables: string[];
  estimatedTimeline?: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery",
    purpose: "Align goals, audience, and success metrics",
    whatYouProvide: [
      "Current site (if any)",
      "Examples you like",
      "Must-have features",
    ],
    whatWeDo: [
      "Rapid audit",
      "Scope definition",
      "Project plan",
      "Timeline estimation",
    ],
    deliverables: [
      "Project brief",
      "Roadmap document",
    ],
    estimatedTimeline: "1-2 days",
  },
  {
    id: 2,
    title: "Design",
    purpose: "UI/UX direction + layout decisions",
    whatYouProvide: [
      "Brand notes (if available)",
      "Feedback on concepts",
    ],
    whatWeDo: [
      "Wireframes",
      "High-fidelity design",
      "Responsive layouts",
    ],
    deliverables: [
      "Design files",
      "Style direction document",
    ],
    estimatedTimeline: "1-2 weeks",
  },
  {
    id: 3,
    title: "Build",
    purpose: "Implement with clean code and performance in mind",
    whatYouProvide: [
      "Final copy/assets",
      "Or request copy support",
    ],
    whatWeDo: [
      "Development",
      "Form/automation integration",
      "Quality assurance",
    ],
    deliverables: [
      "Working staging site",
    ],
    estimatedTimeline: "2-4 weeks",
  },
  {
    id: 4,
    title: "Launch",
    purpose: "Ship confidently",
    whatYouProvide: [
      "Domain access",
      "Final approvals",
    ],
    whatWeDo: [
      "Deployment",
      "Analytics setup",
      "SEO basics",
      "Monitoring configuration",
    ],
    deliverables: [
      "Live site",
      "Handoff notes",
    ],
    estimatedTimeline: "1-2 days",
  },
  {
    id: 5,
    title: "Optimize & Support",
    purpose: "Improve conversions and keep things running",
    whatYouProvide: [
      "Goals and feedback",
      "Optional ongoing updates",
    ],
    whatWeDo: [
      "Iteration",
      "A/B tests (if needed)",
      "Maintenance",
      "Enhancements",
    ],
    deliverables: [
      "Monthly improvements",
      "Support SLA",
    ],
    estimatedTimeline: "Ongoing",
  },
];
