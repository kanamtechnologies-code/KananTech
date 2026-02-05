export type CredentialCategory =
  | "Leadership & Delivery"
  | "AI"
  | "IT Foundations"
  | "Productivity";

export type CredentialStatus = "Active" | "Earned" | "Previously certified";

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issued?: string;
  credentialId?: string;
  skills?: string[];
  status: CredentialStatus;
  categories: CredentialCategory[];
  items?: string[]; // For Microsoft Office certifications
  history?: Array<{ issued: string; expires?: string }>; // For CompTIA A+
}

export const credentials: Credential[] = [
  {
    id: "csm",
    title: "Certified ScrumMaster (CSM)",
    issuer: "Scrum Alliance",
    issued: "Nov 2025",
    credentialId: "2146879",
    skills: ["Scrum", "Agile Methodologies"],
    status: "Active",
    categories: ["Leadership & Delivery"],
  },
  {
    id: "generative-ai-leader",
    title: "Generative AI Leader",
    issuer: "Google",
    issued: "Jul 2025",
    skills: ["Artificial Intelligence (AI)", "Leadership"],
    status: "Active",
    categories: ["AI", "Leadership & Delivery"],
  },
  {
    id: "comptia-it-fundamentals",
    title: "CompTIA IT Fundamentals+",
    issuer: "CompTIA",
    status: "Earned",
    categories: ["IT Foundations"],
  },
  {
    id: "microsoft-office-2013",
    title: "Microsoft Office Certifications (2013)",
    issuer: "Microsoft",
    status: "Earned",
    categories: ["Productivity"],
    items: [
      "Microsoft Excel 2013 Certification",
      "Microsoft Outlook 2013",
      "Microsoft PowerPoint 2013",
      "Microsoft Word 2013 Certification",
    ],
  },
  {
    id: "comptia-a-plus",
    title: "CompTIA A+",
    issuer: "CompTIA",
    status: "Previously certified",
    categories: ["IT Foundations"],
    history: [
      { issued: "Apr 2017", expires: "Apr 2020" },
      { issued: "Apr 2020", expires: "Apr 2023" },
    ],
  },
];

export const categories: CredentialCategory[] = [
  "Leadership & Delivery",
  "AI",
  "IT Foundations",
  "Productivity",
];
