export type SiteRoute = {
  label: string;
  href: string;
  description: string;
};

// Keep this small and explicit—it's used by the concierge to guide navigation.
export const siteMap: {
  routes: SiteRoute[];
  aliases: Record<string, string>;
} = {
  routes: [
    {
      label: "Home",
      href: "/",
      description: "Overview of Kanam Technologies and primary CTAs.",
    },
    {
      label: "Consulting",
      href: "/consulting",
      description:
        "Tech consulting and delivery: websites, lightweight automation, dashboards, applied AI, and support.",
    },
    {
      label: "Learning",
      href: "/learning",
      description: "Learning programs hub: Corporate, Personal, and Children’s bootcamp.",
    },
    {
      label: "Corporate Learning",
      href: "/learning/corporate",
      description: "Team upskilling programs and engagement formats.",
    },
    {
      label: "Personal Learning",
      href: "/learning/personal",
      description: "Individual learning tracks: Python, Excel/Power BI, CompTIA A+.",
    },
    {
      label: "Children’s Bootcamp",
      href: "/learning/children",
      description: "Structured children’s coding bootcamp overview.",
    },
    {
      label: "Work",
      href: "/work",
      description: "Live examples of websites and tools shipped.",
    },
    {
      label: "Learning Lab",
      href: "/lab",
      description: "Free interactive lesson previews across tracks.",
    },
    {
      label: "Lab Progress",
      href: "/lab/progress",
      description: "Student dashboard: progress across tracks.",
    },
    {
      label: "Try a Coding lesson",
      href: "/lab/coding/python-basics-variables",
      description: "Start the Coding track with Python variables and types.",
    },
    {
      label: "Try a Data lesson",
      href: "/lab/data/excel-foundations",
      description: "Start the Data track with Excel foundations.",
    },
    {
      label: "Try an IT lesson",
      href: "/lab/a-plus/aplus-hardware-basics",
      description: "Start the IT track with A+ hardware basics.",
    },
    {
      label: "Sandbox",
      href: "/sandbox",
      description: "Interactive demos of Kanam’s approach to systems and UI.",
    },
    {
      label: "Credentials",
      href: "/credentials",
      description: "Credentials & certifications page.",
    },
    {
      label: "Contact",
      href: "/contact",
      description: "Contact page (or use the contact section on Home).",
    },
  ],

  // Aliases requested for concierge routing support.
  aliases: {
    "/learning/kids": "/learning/children",
    "/lab/python-ai": "/lab/coding/python-basics-variables",
    "/lab/excel-powerbi": "/lab/data/excel-foundations",
    "/lab/comptia-a": "/lab/a-plus/aplus-hardware-basics",
    "/book": "/contact",
  },
};

