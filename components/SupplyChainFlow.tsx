"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    step: "01",
    icon: "🌱",
    title: "Farm Harvest",
    description:
      "Certified farmers in Kenema, Kono & Kailahun harvest cocoa pods and ferment beans 5–7 days using 100% organic practices.",
  },
  {
    step: "02",
    icon: "⚖️",
    title: "Collection & IMS",
    description:
      "Agents collect beans at buying centers. Every bag is moisture-checked, graded, and registered in our IMS traceability system.",
  },
  {
    step: "03",
    icon: "🏭",
    title: "Grading & Packing",
    description:
      "Expert technicians dry beans to export standard, grade into Grade 1 / Grade 2, and pack into branded 63 kg jute bags.",
  },
  {
    step: "04",
    icon: "🚢",
    title: "FOB Export",
    description:
      "Bags truck to Freetown port, pass phytosanitary inspection, load into containers and ship FOB to Europe or North America.",
  },
];

export default function SupplyChainFlow() {
  const ref   = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-cream-200" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">
            Full Traceability
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-900 mt-2">
            From Farm to Port
          </h2>
          <p className="text-brown-600 mt-4 max-w-2xl mx-auto">
            Our IMS tracks every bag from individual farmer to export container — giving
            buyers complete supply chain transparency and EU CSDDD-ready documentation.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-brown-200 z-0">
            {/* Animated fill */}
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-forest-600 origin-left transition-transform"
              style={{
                transform:    `scaleX(${visible ? 1 : 0})`,
                transitionDuration: "1400ms",
                transitionDelay:    "300ms",
              }}
            />
            {/* Traveling dot */}
            {visible && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-400 shadow-[0_0_8px_2px_rgba(201,162,39,0.6)]"
                style={{
                  animation: "travelDot 3s ease-in-out infinite",
                  animationDelay: "1.8s",
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((step, i) => (
              <div
                key={step.step}
                className="bg-white rounded-xl p-6 border border-brown-100 hover:shadow-lg hover:shadow-brown-200/40 transition-all duration-300 hover:-translate-y-1"
                style={{
                  opacity:   visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 600ms ease ${i * 150 + 200}ms, transform 600ms ease ${i * 150 + 200}ms`,
                }}
              >
                {/* Step badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-[52px] h-[52px] rounded-full border-2 border-gold-500/40 flex items-center justify-center text-xl bg-cream-100 flex-shrink-0"
                    style={{
                      boxShadow: visible
                        ? "0 0 0 4px rgba(201,162,39,0.12), 0 0 16px 4px rgba(201,162,39,0.08)"
                        : "none",
                      transition: `box-shadow 600ms ease ${i * 150 + 600}ms`,
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-gold-500 text-xs font-bold tracking-widest">
                    STEP {step.step}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-brown-900 text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-brown-500 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Progress dot (mobile connector) */}
                {i < STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-4 bg-brown-200" />
                      <div className="w-2 h-2 rounded-full bg-gold-400" />
                      <div className="w-px h-4 bg-brown-200" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-10 text-center transition-all duration-700"
          style={{
            opacity:   visible ? 1 : 0,
            transitionDelay: "900ms",
          }}
        >
          <a
            href="/sustainability"
            className="inline-flex items-center gap-2 text-forest-700 hover:text-forest-600 font-semibold text-sm transition-colors"
          >
            View our sustainability & impact report
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Keyframe for traveling dot */}
      <style>{`
        @keyframes travelDot {
          0%   { left: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
