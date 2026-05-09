"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Dust-particle layer ────────────────────────────────────────────────── */
function useDustCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; maxOpacity: number;
      life: number; maxLife: number;
      color: string; phase: number;
    };

    const palette = ["#C9A227", "#D4B645", "#A07820", "#F0D9C4"];

    const make = (): Particle => ({
      x:          Math.random() * (canvas?.width  ?? 1000),
      y:          canvas ? canvas.height + 10 : 1000,
      vx:         (Math.random() - 0.5) * 0.35,
      vy:         -(Math.random() * 0.6 + 0.15),
      size:       Math.random() * 1.8 + 0.4,
      maxOpacity: Math.random() * 0.5 + 0.15,
      life:       0,
      maxLife:    Math.random() * 0.6 + 0.4,
      color:      palette[Math.floor(Math.random() * palette.length)],
      phase:      Math.random() * Math.PI * 2,
    });

    const particles: Particle[] = Array.from({ length: 70 }, make);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.life += 0.004;
        p.x    += p.vx + Math.sin(p.life * 3 + p.phase) * 0.25;
        p.y    += p.vy;

        if (p.y < -10 || p.life >= p.maxLife) {
          Object.assign(p, make());
        }

        const fade = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.globalAlpha = p.maxOpacity * fade;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src: "https://static.wixstatic.com/media/879aa2_d2611ee263fd4b51b4f9fdd907d8111b~mv2_d_6000_4000_s_4_2.jpg",
    alt: "Sierra Leone cocoa harvest",
    pos: "center 40%",
  },
  {
    src: "https://static.wixstatic.com/media/879aa2_e998c0bce14e4395b9c377ea040d5e86~mv2_d_6000_4000_s_4_2.jpg",
    alt: "Organic cocoa pods on tree — golden hour",
    pos: "center 55%",
  },
  {
    src: "https://static.wixstatic.com/media/879aa2_1ecd25fca2a24d97968ecf7e6f51efaf~mv2_d_3888_2592_s_4_2.jpg",
    alt: "Farmers in Sierra Leone cocoa fields",
    pos: "center 35%",
  },
];

export default function HeroCinematic() {
  const [active, setActive]     = useState(0);
  const [prev,   setPrev]       = useState<number | null>(null);
  const [fading, setFading]     = useState(false);
  const [ready,  setReady]      = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDustCanvas(canvasRef);

  /* Cinematic opening — brief black hold then reveal */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* Image crossfade cycle */
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (active + 1) % SLIDES.length;
      setPrev(active);
      setActive(next);
      setFading(true);
      const t = setTimeout(() => { setPrev(null); setFading(false); }, 1800);
      return () => clearTimeout(t);
    }, 7000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <>
      {/* ── Cinematic keyframes ── */}
      <style>{`
        @keyframes cinematicOpen {
          0%   { opacity: 0; filter: brightness(0) blur(8px); transform: scale(1.08); }
          25%  { opacity: 0.6; filter: brightness(0.25) blur(3px); }
          100% { opacity: 1; filter: brightness(0.58) saturate(1.25) contrast(1.08); transform: scale(1.0); }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.0)  translate(0%,   0%); }
          35%  { transform: scale(1.04) translate(-0.5%, 0.3%); }
          70%  { transform: scale(1.02) translate(0.3%, -0.2%); }
          100% { transform: scale(1.0)  translate(0%,   0%); }
        }
        @keyframes slideOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes slideIn {
          0%   { opacity: 0; transform: scale(1.06); filter: brightness(0.3); }
          100% { opacity: 1; transform: scale(1.0);  filter: brightness(0.58) saturate(1.25) contrast(1.08); }
        }
        @keyframes rimPulse {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.42; }
        }
        @keyframes badgeIn {
          0%   { opacity: 0; transform: translateX(-14px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes titleIn {
          0%   { opacity: 0; transform: translateY(22px) skewY(1deg); }
          100% { opacity: 1; transform: translateY(0) skewY(0); }
        }
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPip {
          0%   { transform: translateY(-110%); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateY(220%); opacity: 0; }
        }
        @keyframes lineGrow {
          0%   { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        .film-open    { animation: cinematicOpen 2.6s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .ken-burns    { animation: kenBurns 14s ease-in-out infinite; }
        .slide-in     { animation: slideIn  1.6s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .slide-out    { animation: slideOut 1.6s ease-in-out forwards; }
        .rim-pulse    { animation: rimPulse 5s ease-in-out infinite; }

        .hero-badge   { animation: badgeIn 0.9s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 0.9s; }
        .hero-line    { animation: lineGrow 0.7s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 1.1s; transform-origin: left; }
        .hero-h1-1    { animation: titleIn  1.0s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 1.4s; }
        .hero-h1-2    { animation: titleIn  1.0s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 1.65s; }
        .hero-sub     { animation: fadeUp   1.0s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 2.1s; }
        .hero-ctas    { animation: fadeUp   1.0s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 2.5s; }
        .hero-certs   { animation: fadeUp   0.9s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 2.9s; }
        .scroll-ind   { animation: fadeUp   0.8s cubic-bezier(0.22,0.61,0.36,1) both; animation-delay: 3.3s; }
        .scroll-pip   { animation: scrollPip 2.2s ease-in-out infinite; animation-delay: 3.6s; }
      `}</style>

      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

        {/* ── Image layers ─────────────────────────────── */}

        {/* Previous image (fading out) */}
        {prev !== null && (
          <div className={`absolute inset-0 ${fading ? "slide-out" : ""}`}>
            <Image
              src={SLIDES[prev].src}
              alt={SLIDES[prev].alt}
              fill
              className="object-cover"
              style={{ objectPosition: SLIDES[prev].pos, filter: "brightness(0.58) saturate(1.25) contrast(1.08)" }}
            />
          </div>
        )}

        {/* Active image */}
        <div className={`absolute inset-0 ${ready ? (prev !== null ? "slide-in" : "film-open") : "opacity-0"}`}>
          <div className={ready && prev === null ? "ken-burns absolute inset-0" : "absolute inset-0"}>
            <Image
              src={SLIDES[active].src}
              alt={SLIDES[active].alt}
              fill
              className="object-cover"
              priority={active === 0}
              style={{
                objectPosition: SLIDES[active].pos,
                filter: "brightness(0.58) saturate(1.25) contrast(1.08)",
              }}
            />
          </div>
        </div>

        {/* ── Overlays ──────────────────────────────────── */}

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 38% 50%, transparent 18%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        {/* Left dark panel — keeps text readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,4,1,0.88) 0%, rgba(10,4,1,0.62) 38%, rgba(10,4,1,0.18) 65%, transparent 82%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(26,15,7,0.55) 0%, transparent 100%)" }}
        />

        {/* Warm amber rim-light — emanates from right, mimics natural golden-hour rim */}
        <div
          className="absolute inset-0 rim-pulse pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 82% 42%, rgba(201,162,39,0.14) 0%, rgba(160,80,20,0.07) 35%, transparent 62%)",
          }}
        />
        {/* Secondary warmer rim at bottom-right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 75% 85%, rgba(180,90,15,0.10) 0%, transparent 45%)",
          }}
        />

        {/* Cinematic letterbox bars */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />

        {/* Golden dust particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: "screen", opacity: 0.9 }}
        />

        {/* ── Content ───────────────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-24 pb-20">
          <div className="max-w-[600px]">

            {/* Eyebrow badge */}
            <div className="hero-badge flex items-center gap-3 mb-7">
              <div
                className="hero-line h-px w-10"
                style={{ background: "#C9A227" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "#D4B645" }}
              >
                Sierra Leone · Est. 1997
              </span>
            </div>

            {/* Headline — two-line stagger */}
            <h1 className="font-serif font-bold leading-[1.06] mb-7" style={{ fontSize: "clamp(2.6rem,5.5vw,4rem)" }}>
              <span
                className="hero-h1-1 block"
                style={{ color: "#FDF6E3" }}
              >
                From the Heart
              </span>
              <span
                className="hero-h1-2 block"
                style={{ color: "#D4B645" }}
              >
                of West Africa
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className="hero-sub text-base sm:text-lg leading-relaxed mb-9 max-w-[520px]"
              style={{ color: "rgba(253,246,227,0.72)" }}
            >
              Certified organic cocoa &amp; coffee — cultivated by 10,000+ farmers across Sierra Leone
              and exported with full farm-to-port traceability to Europe and North America.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-wrap gap-4 items-center mb-10">
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
                style={{ border: "1px solid rgba(253,246,227,0.35)", color: "#FDF6E3" }}
              >
                Explore Products
              </Link>
            </div>

            {/* Certification dots */}
            <div className="hero-certs flex items-center gap-6 flex-wrap">
              {["EU Organic", "Fairtrade", "USDA NOP"].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#C9A227", boxShadow: "0 0 6px 1px rgba(201,162,39,0.5)" }}
                  />
                  <span className="text-xs font-medium" style={{ color: "rgba(212,182,69,0.85)" }}>
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 right-8 sm:right-12 flex gap-2 z-10 scroll-ind">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrev(active); setActive(i); setFading(true); }}
              className="transition-all duration-500 rounded-full"
              style={{
                width:      i === active ? "24px" : "6px",
                height:     "6px",
                background: i === active ? "#C9A227" : "rgba(253,246,227,0.35)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-ind absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ color: "rgba(253,246,227,0.35)" }}
        >
          <span className="text-[10px] uppercase tracking-[0.22em] font-medium">Scroll</span>
          <div
            className="w-px h-9 overflow-hidden"
            style={{ background: "rgba(201,162,39,0.2)" }}
          >
            <div
              className="scroll-pip w-full"
              style={{ height: "45%", background: "#C9A227" }}
            />
          </div>
        </div>

      </section>
    </>
  );
}
