"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brown-900 shadow-lg shadow-brown-950/30"
          : "bg-brown-900/95 backdrop-blur-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-forest-800 text-cream-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>Sierra Leone&apos;s Leading Certified Cocoa &amp; Coffee Exporter Since 2000</span>
          <div className="flex items-center gap-6">
            <a href="tel:+23276111112" className="hover:text-gold-400 transition-colors">
              +232 76 111112
            </a>
            <a href="mailto:info@tasstores.com" className="hover:text-gold-400 transition-colors">
              info@tasstores.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="https://static.wixstatic.com/media/879aa2_bdfdfe3cfa574e37b07b1af36309b459~mv2.png"
              alt="TAS Stores Logo"
              width={140}
              height={54}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream-200 hover:text-gold-400 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-brown-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 bg-gold-500 hover:bg-gold-400 text-brown-900 px-5 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              Request a Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-cream-100 p-2 rounded-md hover:bg-brown-800 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-brown-900 border-t border-brown-800 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-cream-200 hover:text-gold-400 py-3 text-sm font-medium border-b border-brown-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-gold-500 hover:bg-gold-400 text-brown-900 px-5 py-3 rounded-md text-sm font-semibold transition-colors"
          >
            Request a Quote
          </Link>
          <div className="mt-4 pt-4 border-t border-brown-800 text-cream-300 text-xs space-y-1">
            <p>+232 76 111112</p>
            <p>info@tasstores.com</p>
          </div>
        </div>
      )}
    </header>
  );
}
