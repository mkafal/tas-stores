"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Ensure autoplay on mobile (requires muted)
    v.muted = true;
    v.play().catch(() => {});
    const onCanPlay = () => setLoaded(true);
    v.addEventListener("canplaythrough", onCanPlay);
    return () => v.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  return (
    <>
      <style>{`
        @keyframes badgeSlide {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes titleRise {
          from { opacity: 0; transform: translateY(26px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPip {
          0%   { transform: translateY(-110%); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translateY(240%);  opacity: 0; }
        }
        @keyframes videoReveal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .vid-layer  { animation: videoReveal 1.8s ease-in forwards; }
        .h-badge    { animation: badgeSlide  0.85s cubic-bezier(0.22,0.61,0.36,1) both 1.2s; }
        .h-line     { animation: lineGrow    0.65s cubic-bezier(0.22,0.61,0.36,1) both 1.35s; transform-origin: left; }
        .h-t1       { animation: titleRise   1.0s  cubic-bezier(0.22,0.61,0.36,1) both 1.55s; }
        .h-t2       { animation: titleRise   1.0s  cubic-bezier(0.22,0.61,0.36,1) both 1.82s; }
        .h-sub      { animation: fadeUp      1.0s  cubic-bezier(0.22,0.61,0.36,1) both 2.25s; }
        .h-ctas     { animation: fadeUp      1.0s  cubic-bezier(0.22,0.61,0.36,1) both 2.65s; }
        .h-certs    { animation: fadeUp      0.9s  cubic-bezier(0.22,0.61,0.36,1) both 3.05s; }
        .h-scroll   { animation: fadeUp      0.8s  cubic-bezier(0.22,0.61,0.36,1) both 3.4s; }
        .pip        { animation: scrollPip   2.0s  ease-in-out infinite           3.8s; }
      `}</style>

      <section className="relative min-h-screen overflow-hidden bg-black flex items-center">

        {/* ── Video background ─────────────────────────────── */}
        <div className={`absolute inset-0 z-0 ${loaded ? "vid-layer" : "opacity-0"}`}>
          <video
            ref={videoRef}
            src="/video/hero-cocoa.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>

        {/* ── Overlays ──────────────────────────────────────── */}

        {/* Deep cinematic vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 55% 45%, transparent 10%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Left panel — keeps text legible against the macro footage */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(5,2,0,0.92) 0%, rgba(5,2,0,0.72) 32%, rgba(5,2,0,0.28) 58%, transparent 75%)",
          }}
        />

        {/* Warm amber colour grade — ties the video to brand palette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(201,146,26,0.08) 0%, transparent 55%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Bottom fade to page */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(5,2,0,0.70) 0%, transparent 100%)" }}
        />

        {/* Letterbox lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/6 z-[2]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/6 z-[2]" />

        {/* ── Content ───────────────────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-28 pb-24">
          <div className="max-w-[580px]">

            {/* Eyebrow */}
            <div className="h-badge flex items-center gap-3 mb-7">
              <div
                className="h-line h-px w-10"
                style={{ background: "#C9A227" }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.30em]"
                style={{ color: "#D4B645" }}
              >
                Sierra Leone · Est. 1997
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif font-bold leading-[1.06] mb-7"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)" }}
            >
              <span className="h-t1 block" style={{ color: "#FDF6E3" }}>
                From the Heart
              </span>
              <span className="h-t2 block" style={{ color: "#D4B645" }}>
                of West Africa
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className="h-sub text-base sm:text-[1.06rem] leading-relaxed mb-9 max-w-[510px]"
              style={{ color: "rgba(253,246,227,0.70)" }}
            >
              Certified organic cocoa &amp; coffee — cultivated by 10,000+ farmers
              across Sierra Leone, exported with full farm-to-port traceability
              to Europe and North America.
            </p>

            {/* CTAs */}
            <div className="h-ctas flex flex-wrap gap-4 items-center mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ background: "#C9A227", color: "#1A0F07" }}
              >
                Request a Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all duration-200 hover:bg-white/10"
                style={{ border: "1px solid rgba(253,246,227,0.30)", color: "#FDF6E3" }}
              >
                Explore Products
              </Link>
            </div>

            {/* Certification dots */}
            <div className="h-certs flex items-center gap-6 flex-wrap">
              {["EU Organic", "Fairtrade", "USDA NOP"].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#C9A227",
                      boxShadow: "0 0 6px 2px rgba(201,162,39,0.45)",
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "rgba(212,182,69,0.82)" }}
                  >
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="h-scroll absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
          <span
            className="text-[10px] uppercase tracking-[0.22em] font-medium"
            style={{ color: "rgba(253,246,227,0.30)" }}
          >
            Scroll
          </span>
          <div
            className="w-px h-9 overflow-hidden"
            style={{ background: "rgba(201,162,39,0.18)" }}
          >
            <div
              className="pip w-full"
              style={{ height: "45%", background: "#C9A227" }}
            />
          </div>
        </div>

      </section>
    </>
  );
}
