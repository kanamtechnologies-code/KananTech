"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Consulting", href: "/consulting" },
  { label: "Learning", href: "/learning" },
  { label: "Lab", href: "/lab" },
  { label: "Work", href: "/work" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // Anchor link: if the target exists on the current page, scroll to it.
      // Otherwise, fall back to the home page anchor (keeps existing behavior for home-only sections).
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
        return;
      }

      window.location.href = `/${href}`;
      setIsMobileMenuOpen(false);
    } else {
      // Page link - handled by Next.js Link
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b-2 border-border shadow-md"
          : "bg-white border-b border-border"
      }`}
    >
      <nav className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="flex items-center gap-0 hover:opacity-80 transition-opacity"
            aria-label="Kanam Technologies Home"
          >
            {/* Larger logo (matches the earlier "big logo" feel) with stable alignment */}
            <div className="h-12 w-12 lg:h-20 lg:w-20 flex-shrink-0 flex items-center justify-center -translate-y-[1px]">
              <Image
                src="/images/Logo.png"
                alt="K"
                width={80}
                height={80}
                sizes="(min-width: 1024px) 80px, 48px"
                className="block h-full w-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col -ml-[6px] lg:-ml-[10px]">
              <span className="text-xl lg:text-2xl font-semibold leading-none text-primary-text hover:text-emerald-primary transition-colors">
                anam Technologies
              </span>
              <span className="text-[10px] lg:text-xs font-medium text-emerald-primary uppercase tracking-wider leading-tight">
                Move Forward
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-secondary-text hover:text-emerald-primary transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-secondary-text hover:text-emerald-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-4 py-2 bg-emerald-primary text-white text-sm font-medium rounded-xl hover:bg-emerald-hover transition-all shadow-sm hover:-translate-y-0.5"
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-secondary-text hover:text-primary-text"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-border mt-2"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                link.href.startsWith("#") ? (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-sm font-medium text-secondary-text hover:text-emerald-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-left text-sm font-medium text-secondary-text hover:text-emerald-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <button
                onClick={() => handleNavClick("#contact")}
                className="px-4 py-2 bg-emerald-primary text-white text-sm font-medium rounded-xl hover:bg-emerald-hover transition-all text-center shadow-sm hover:-translate-y-0.5"
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

