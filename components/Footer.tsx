"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Offer", href: "#offer" },
  { label: "Consulting", href: "/consulting" },
  { label: "Learning", href: "/learning" },
  { label: "Lab", href: "/lab" },
  { label: "Work", href: "/work" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-text text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Kanam Technologies</h3>
            <p className="text-xs font-medium text-emerald-primary uppercase tracking-wider mb-3">
              Move Forward
            </p>
            <p className="text-sm text-slate-400">
              Automation & AI systems that eliminate manual work in weeks, not months.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <p className="text-xs text-slate-500">
              All services subject to terms of engagement. Results may vary based on scope and requirements.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Kanam Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

