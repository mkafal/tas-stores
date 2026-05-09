"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  raw: number;
  suffix: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { raw: 10000, suffix: "+",   label: "Certified Farmers",       sub: "IMS-registered" },
  { raw: 2800,  suffix: " MT", label: "Cocoa Exported / Year",   sub: "Premium grade" },
  { raw: 3,     suffix: "",    label: "Certifications",           sub: "EU · USDA · Fairtrade" },
  { raw: 5,     suffix: "",    label: "Export Markets",           sub: "Europe & North America" },
  { raw: 26,    suffix: " yrs",label: "In Operations",            sub: "Since 2000" },
];

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function Counter({ stat, active }: { stat: Stat; active: boolean }) {
  const [displayed, setDisplayed] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number>(0);
  const DURATION = 1800; // ms

  useEffect(() => {
    if (!active) return;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const value = Math.round(easeOutQuart(progress) * stat.raw);
      setDisplayed(value);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, stat.raw]);

  const formatted =
    stat.raw >= 1000
      ? displayed.toLocaleString()
      : displayed.toString();

  return (
    <div className="text-center px-4">
      <div className="font-serif text-3xl lg:text-4xl font-bold text-gold-400 tabular-nums">
        {formatted}
        <span className="text-2xl">{stat.suffix}</span>
      </div>
      <div className="text-cream-100 font-semibold text-sm mt-1">{stat.label}</div>
      <div className="text-brown-400 text-xs mt-0.5">{stat.sub}</div>
    </div>
  );
}

export default function AnimatedStats() {
  const ref    = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          setFired(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fired]);

  return (
    <div
      ref={ref}
      className="bg-brown-900 py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x lg:divide-brown-700">
          {STATS.map((stat) => (
            <Counter key={stat.label} stat={stat} active={fired} />
          ))}
        </div>
      </div>
    </div>
  );
}
