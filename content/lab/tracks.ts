export type LabTrackId = "coding" | "data" | "a-plus";

export type LabTrack = {
  id: LabTrackId;
  title: string;
  shortTitle: string;
  description: string;
  outcomes: string[];
  lessonSlugs: string[];
};

export const labTracks: LabTrack[] = [
  {
    id: "coding",
    title: "Coding Track",
    shortTitle: "Coding",
    description: "Python foundations plus practical AI tool usage for modern delivery.",
    outcomes: [
      "Write and read basic Python confidently",
      "Use control flow and lists to solve simple problems",
      "Use AI tools responsibly and verify outputs",
    ],
    lessonSlugs: ["python-basics-variables", "python-control-flow", "ai-tools-for-devs"],
  },
  {
    id: "data",
    title: "Data Track",
    shortTitle: "Data",
    description: "Excel + Power BI skills focused on reporting clarity and cert-style practice.",
    outcomes: [
      "Use tables, filters, and core formulas reliably",
      "Answer cert-style questions with explanations",
      "Choose visuals and model basics for dashboards",
    ],
    lessonSlugs: ["excel-foundations", "excel-cert-style-practice", "powerbi-intro-dashboards"],
  },
  {
    id: "a-plus",
    title: "IT Track",
    shortTitle: "CompTIA A+",
    description: "Cert-style practice across hardware, troubleshooting, and OS support basics.",
    outcomes: [
      "Understand core hardware concepts and common ports",
      "Apply a troubleshooting methodology with safety in mind",
      "Navigate basic Windows support tasks and tools",
    ],
    lessonSlugs: ["aplus-hardware-basics", "aplus-troubleshooting-methodology", "aplus-os-and-support"],
  },
];

export function getLabTrack(trackId: string | undefined): LabTrack | undefined {
  return labTracks.find((t) => t.id === trackId);
}

