"use client";

/**
 * ScrollRevealInit
 * ────────────────────────────────────────────────────────────
 * Layout-level client component — runs once per route change.
 *
 * What it does:
 *  1. Skips the first <section> (hero has its own entrance animations).
 *  2. For every other section:
 *     a. Wraps the section with a fade-up reveal when it enters the viewport.
 *     b. Staggers every direct .grid child so cards cascade in.
 *  3. No conflicts with AnimatedStats / SupplyChainFlow (they manage
 *     their own observers internally).
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay so the DOM is fully painted after route change
    const t = setTimeout(run, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

function run() {
  const allSections = Array.from(document.querySelectorAll("section"));
  // Skip index 0 (hero)
  const sections = allSections.slice(1);

  /* ── Observer for section wrappers ──────────────────────── */
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("sr-in");
          sectionObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -48px 0px" }
  );

  /* ── Observer for individual grid cards ─────────────────── */
  const cardObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("sr-in");
          cardObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  sections.forEach((section) => {
    // Section-level fade-up (only if not already tagged)
    if (!section.classList.contains("sr-section")) {
      section.classList.add("sr-section");
      sectionObs.observe(section);
    }

    // Stagger direct .grid children
    const gridItems = section.querySelectorAll(
      ":scope .grid > div, :scope .grid > article, :scope .grid > a, :scope .grid > li"
    );
    gridItems.forEach((item, idx) => {
      if (!item.classList.contains("sr-card")) {
        item.classList.add("sr-card");
        // Stagger capped at 420ms so large grids don't feel sluggish
        (item as HTMLElement).style.transitionDelay =
          `${Math.min(idx * 0.08, 0.42)}s`;
        cardObs.observe(item);
      }
    });
  });
}
