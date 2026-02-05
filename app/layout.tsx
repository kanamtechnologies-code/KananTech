import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "Kanam Technologies | Automation & AI Systems for Operations Teams",
  description: "Eliminate manual work in weeks, not months. Automation sprints, dashboards, and applied AI for education and workforce organizations.",
  keywords: ["automation", "workflow automation", "operations automation", "AI systems", "dashboard development", "internal tools"],
  authors: [{ name: "Kanam Technologies" }],
  openGraph: {
    title: "Kanam Technologies | Automation & AI Systems",
    description: "Eliminate manual work in weeks, not months. Fixed-scope automation sprints for operations teams.",
    type: "website",
    locale: "en_US",
    siteName: "Kanam Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanam Technologies | Automation & AI Systems",
    description: "Eliminate manual work in weeks, not months.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Kanam Technologies",
              "description": "Automation and AI systems that eliminate manual work for operations teams",
              "serviceType": "Business Automation Services",
              "areaServed": "United States",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://kanamtech.com",
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        {/* Global video background (light theme) */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-150"
          >
            <source src="/videos/HeroVid.mp4" type="video/mp4" />
          </video>
          {/* Light overlay keeps readability while letting motion show through */}
          <div className="absolute inset-0 bg-white/30" />
        </div>

        <div className="relative z-10">
          {children}
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}

