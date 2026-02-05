export interface Project {
  slug: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  featured?: boolean;
  live?: boolean;
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    slug: "atlanta-elite-investment-properties",
    name: "Atlanta Elite Investment Properties",
    description:
      "Conversion-focused cash-offer site for Atlanta homeowners with a clear intake flow, trust sections, FAQs, and a simple “how it works” funnel.",
    url: "https://www.atlantaeliteinvestmentproperties.com/",
    tags: ["Website", "Landing Page", "Lead Capture", "Conversion"],
    featured: true,
    live: true,
    thumbnail: "/images/atlelite.png",
  },
  {
    slug: "thread-stead-services",
    name: "Thread Stead Services",
    description:
      "Service business website for Greater Atlanta featuring a service catalog, project gallery, and a high-intent estimate/request flow with strong trust signals.",
    url: "https://www.threadsteadservices.com/",
    tags: ["Website", "Local Services", "Lead Capture", "SEO"],
    featured: false,
    live: true,
    thumbnail: "/images/ThreadStead.png",
  },
  {
    slug: "brick-by-brick-lab",
    name: "Brick by Brick",
    description:
      "Service website for professional LEGO set building in Atlanta with clear service framing, testimonials, and quote-focused CTAs.",
    url: "https://www.brickbybricklab.com/",
    tags: ["Website", "Local Services", "Landing Page", "Lead Capture"],
    featured: false,
    live: true,
    thumbnail: "/images/Bricklab.png",
  },
];

