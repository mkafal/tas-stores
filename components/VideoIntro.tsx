"use client";

/**
 * VideoIntro
 * ──────────────────────────────────────────────────────────────
 * Full-screen brand-film intro shown to visitors on first arrival.
 * Plays once per browser session (sessionStorage flag).
 *
 * Phases:
 *  "enter"   → dark splash with dim video preview + play prompt
 *  "playing" → full-screen video with audio + skip control + progress
 *  "done"    → component unmounts, site content visible
 */

import { useEffect, useRef, useState } from "react";

type Phase = "enter" | "playing" | "done";

export default function VideoIntro() {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef   = useRef<number>(0);

  /* ── Only show once per session ─────────────────────────── */
  useEffect(() => {
    if (sessionStorage.getItem("tas-intro-seen")) {
      setPhase("done");
    } else {
      setPhase("enter");
    }
  }, []);

  /* ── Progress bar ────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "playing") return;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration) setProgress(v.currentTime / v.duration);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  const dismiss = () => {
    setExiting(true);
    sessionStorage.setItem("tas-intro-seen", "1");
    setTimeout(() => setPhase("done"), 900);
  };

  const handlePlay = () => {
    setPhase("playing");
    const v = videoRef.current;
    if (!v) return;
    v.muted  = false;
    v.volume = 0.85;
    v.play().catch(() => {
      // Fallback: browser still blocked audio — play muted
      v.muted = true;
      v.play();
    });
  };

  if (!phase || phase === "done") return null;

  return (
    <>
      <style>{`
        @keyframes introPulse {
          0%,100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(201,162,39,0); }
          50%      { transform: scale(1.06); box-shadow: 0 0 0 12px rgba(201,162,39,0.12); }
        }
        @keyframes introFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0; }
        }
        .intro-prompt { animation: introFadeIn 0.9s ease both 0.4s; }
        .play-btn     { animation: introPulse  2.8s ease-in-out infinite; }
        .intro-wrap {
          transition: opacity 0.85s cubic-bezier(0.22,0.61,0.36,1);
        }
        .intro-wrap.exiting { opacity: 0; }
      `}</style>

      <div
        className={`intro-wrap fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden ${exiting ? "exiting" : ""}`}
      >
        {/* ── Video element (always mounted for preload) ─────── */}
        <video
          ref={videoRef}
          src="/video/intro-cocoa.mp4"
          playsInline
          preload="auto"
          onEnded={dismiss}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: phase === "playing" ? 1 : 0.18,
            filter:  phase === "playing" ? "none" : "blur(2px) brightness(0.5)",
            transition: "opacity 0.8s ease, filter 0.8s ease",
          }}
          // Start muted so browser allows autoplay for the dim preview
          muted
        />

        {/* ── Vignette over playing video ────────────────────── */}
        {phase === "playing" && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        )}

        {/* ── ENTER PROMPT ──────────────────────────────────── */}
        {phase === "enter" && (
          <div className="intro-prompt relative z-10 flex flex-col items-center gap-6 text-center px-6">
            {/* Brand mark */}
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: 32, height: 1, background: "#C9A227" }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.32em]"
                style={{ color: "#D4B645" }}
              >
                TAS Stores
              </span>
              <div style={{ width: 32, height: 1, background: "#C9A227" }} />
            </div>

            <h2
              className="font-serif font-bold"
              style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)", color: "#FDF6E3", lineHeight: 1.15 }}
            >
              From the Heart<br />
              <span style={{ color: "#D4B645" }}>of West Africa</span>
            </h2>

            <p className="text-sm" style={{ color: "rgba(253,246,227,0.52)", maxWidth: 280 }}>
              A story of soil, craft, and 10,000 farmers
            </p>

            {/* Play button */}
            <button
              onClick={handlePlay}
              className="play-btn mt-2 flex items-center justify-center rounded-full border-2 transition-colors hover:bg-white/10"
              style={{
                width: 72, height: 72,
                borderColor: "#C9A227",
              }}
              aria-label="Watch intro"
            >
              {/* Triangle */}
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                <path d="M2 2L20 12L2 22V2Z" fill="#C9A227" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </button>

            <p className="text-xs" style={{ color: "rgba(253,246,227,0.30)" }}>
              🔊 Sound on · 48s
            </p>

            {/* Skip link */}
            <button
              onClick={dismiss}
              className="text-xs underline underline-offset-4 mt-1 transition-opacity hover:opacity-80"
              style={{ color: "rgba(253,246,227,0.30)" }}
            >
              Skip intro
            </button>
          </div>
        )}

        {/* ── PLAYING CONTROLS ──────────────────────────────── */}
        {phase === "playing" && (
          <>
            {/* Skip button — top right */}
            <button
              onClick={dismiss}
              className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all hover:bg-white/15"
              style={{
                border: "1px solid rgba(253,246,227,0.30)",
                color: "rgba(253,246,227,0.70)",
                backdropFilter: "blur(8px)",
              }}
            >
              Skip
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* TAS mark — top left */}
            <div
              className="absolute top-6 left-6 z-20 flex items-center gap-2"
              style={{ color: "#D4B645", opacity: 0.8 }}
            >
              <div style={{ width: 20, height: 1, background: "currentColor" }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">TAS Stores</span>
            </div>

            {/* Progress bar — bottom */}
            <div className="absolute bottom-0 inset-x-0 z-20 h-[2px] bg-white/10">
              <div
                className="h-full transition-none"
                style={{ width: `${progress * 100}%`, background: "#C9A227" }}
              />
            </div>

            {/* Episode title — bottom left */}
            <div
              className="absolute bottom-6 left-6 z-20"
              style={{ color: "rgba(253,246,227,0.45)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] font-medium">Origin Story</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(253,246,227,0.28)" }}>Sierra Leone</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
