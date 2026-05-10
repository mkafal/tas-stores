"use client";

/**
 * VideoIntro
 * ──────────────────────────────────────────────────────────────
 * Full-screen brand-film intro shown to visitors on first arrival.
 * Plays once per browser session (sessionStorage flag).
 *
 * Layout: portrait 9:16 video frame centered on screen,
 * blurred video fill on either side (social-media-on-desktop look).
 *
 * Phases:
 *  "enter"   → dark splash with dim video preview + play prompt
 *  "playing" → framed video with audio + skip control + progress
 *  "done"    → component unmounts, site content visible
 */

import { useEffect, useRef, useState } from "react";

type Phase = "enter" | "playing" | "done";

export default function VideoIntro() {
  const [phase, setPhase]       = useState<Phase | null>(null);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const rafRef    = useRef<number>(0);

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
      v.muted = true;
      v.play();
    });
  };

  if (!phase || phase === "done") return null;

  return (
    <>
      <style>{`
        @keyframes introPulse {
          0%,100% { transform: scale(1);    box-shadow: 0 0 0 0   rgba(201,162,39,0); }
          50%      { transform: scale(1.06); box-shadow: 0 0 0 12px rgba(201,162,39,0.14); }
        }
        @keyframes introFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes storyGlow {
          0%,100% { box-shadow: 0 0 0 2px rgba(201,162,39,0.25); }
          50%      { box-shadow: 0 0 0 4px rgba(201,162,39,0.50); }
        }
        .intro-prompt  { animation: introFadeIn 0.9s ease both 0.4s; }
        .play-btn      { animation: introPulse  2.8s ease-in-out infinite; }
        .story-avatar  { animation: storyGlow   2.6s ease-in-out infinite; }
        .intro-wrap    { transition: opacity 0.85s cubic-bezier(0.22,0.61,0.36,1); }
        .intro-wrap.exiting { opacity: 0; }
      `}</style>

      <div
        className={`intro-wrap fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${exiting ? "exiting" : ""}`}
      >

        {/* ══ BACKGROUND: blurred video fill ══════════════════ */}
        {/* Separate video element — muted autoplay, no controls */}
        <video
          src="/video/intro-cocoa.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "scale(1.10)",
            filter: "blur(32px) brightness(0.20) saturate(1.5)",
          }}
        />

        {/* Warm brand tint over blurred background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(44,26,14,0.55) 0%, rgba(15,8,3,0.78) 50%, rgba(50,28,8,0.55) 100%)",
          }}
        />

        {/* ══ SIDE DECORATIONS (desktop only) ═════════════════ */}
        {/* Left vertical label */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-5">
          <div style={{ width: 1, height: 72, background: "rgba(201,162,39,0.28)" }} />
          <span style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: 10,
            letterSpacing: "0.32em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "rgba(201,162,39,0.35)",
          }}>
            Sierra Leone · West Africa
          </span>
          <div style={{ width: 1, height: 72, background: "rgba(201,162,39,0.28)" }} />
        </div>

        {/* Right vertical label */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-5">
          <div style={{ width: 1, height: 72, background: "rgba(201,162,39,0.28)" }} />
          <span style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: 10,
            letterSpacing: "0.32em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "rgba(201,162,39,0.35)",
          }}>
            EU Organic · Fairtrade · USDA
          </span>
          <div style={{ width: 1, height: 72, background: "rgba(201,162,39,0.28)" }} />
        </div>

        {/* ══ PHONE / SOCIAL MEDIA FRAME ═══════════════════════ */}
        <div
          className="relative z-10 flex-shrink-0"
          style={{
            height: "min(90vh, 820px)",
            aspectRatio: "9 / 16",
            borderRadius: 22,
            overflow: "hidden",
            border: "1.5px solid rgba(201,162,39,0.40)",
            boxShadow:
              "0 0 0 1px rgba(201,162,39,0.10), " +
              "0 48px 96px rgba(0,0,0,0.85), " +
              "0 0 80px rgba(201,162,39,0.07)",
          }}
        >
          {/* ── Main video inside frame ─────────────────────── */}
          <video
            ref={videoRef}
            src="/video/intro-cocoa.mp4"
            playsInline
            preload="auto"
            onEnded={dismiss}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity:    phase === "playing" ? 1 : 0.30,
              filter:     phase === "playing" ? "none" : "blur(1px) brightness(0.45)",
              transition: "opacity 0.8s ease, filter 0.8s ease",
            }}
            muted
          />

          {/* Radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.52) 100%)",
            }}
          />

          {/* ── IG Reel-style story progress bar (top) ──────── */}
          <div className="absolute top-0 inset-x-0 z-30 px-3 pt-2">
            <div className="w-full h-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: "#C9A227",
                  transition: "none",
                }}
              />
            </div>
          </div>

          {/* ── IG Reel-style header ─────────────────────────── */}
          <div
            className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 pt-6 pb-4"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, transparent 100%)",
            }}
          >
            <div className="flex items-center gap-2.5">
              {/* Story avatar ring */}
              <div
                className="story-avatar flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(44,26,14,0.95)",
                  border: "1.5px solid #C9A227",
                }}
              >
                <span style={{ fontSize: 8, fontWeight: 800, color: "#D4B645", letterSpacing: "0.02em" }}>
                  TAS
                </span>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(253,246,227,0.92)", lineHeight: 1.3 }}>
                  TAS Stores
                </p>
                <p style={{ fontSize: 10, color: "rgba(253,246,227,0.42)", lineHeight: 1.3 }}>
                  Origin Story
                </p>
              </div>
            </div>

            {/* Skip button — shown only while playing */}
            {phase === "playing" && (
              <button
                onClick={dismiss}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all hover:bg-white/15"
                style={{
                  border: "1px solid rgba(253,246,227,0.22)",
                  color: "rgba(253,246,227,0.60)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Skip
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* ── Bottom gradient + location / cert tags ────────── */}
          {phase === "playing" && (
            <div
              className="absolute bottom-0 inset-x-0 z-20 px-4 pb-6 pt-14"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="rgba(201,162,39,0.85)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style={{ fontSize: 11, color: "rgba(201,162,39,0.85)", fontWeight: 600 }}>
                  Sierra Leone
                </span>
              </div>
              <p style={{ fontSize: 10, color: "rgba(253,246,227,0.32)", letterSpacing: "0.04em" }}>
                10,000+ farmers · EU Organic · Fairtrade
              </p>
            </div>
          )}

          {/* ══ ENTER PROMPT (overlaid on dim frame) ═════════ */}
          {phase === "enter" && (
            <div
              className="intro-prompt absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 text-center px-7"
              style={{ background: "rgba(0,0,0,0.30)" }}
            >
              {/* Brand rule */}
              <div className="flex items-center gap-2">
                <div style={{ width: 22, height: 1, background: "#C9A227" }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: "#D4B645" }}>
                  TAS Stores
                </span>
                <div style={{ width: 22, height: 1, background: "#C9A227" }} />
              </div>

              <h2
                className="font-serif font-bold"
                style={{ fontSize: "clamp(1.25rem,3.5vw,1.75rem)", color: "#FDF6E3", lineHeight: 1.18 }}
              >
                From the Heart<br />
                <span style={{ color: "#D4B645" }}>of West Africa</span>
              </h2>

              <p className="text-[11px]" style={{ color: "rgba(253,246,227,0.48)", maxWidth: 200 }}>
                A story of soil, craft, and 10,000 farmers
              </p>

              {/* Play button */}
              <button
                onClick={handlePlay}
                className="play-btn mt-1 flex items-center justify-center rounded-full border-2 transition-colors hover:bg-white/10"
                style={{ width: 64, height: 64, borderColor: "#C9A227" }}
                aria-label="Watch intro"
              >
                <svg width="20" height="22" viewBox="0 0 22 24" fill="none">
                  <path d="M2 2L20 12L2 22V2Z" fill="#C9A227" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </button>

              <p className="text-[10px]" style={{ color: "rgba(253,246,227,0.28)" }}>
                🔊 Sound on · 48s
              </p>

              <button
                onClick={dismiss}
                className="text-[10px] underline underline-offset-4 transition-opacity hover:opacity-80"
                style={{ color: "rgba(253,246,227,0.28)" }}
              >
                Skip intro
              </button>
            </div>
          )}
        </div>
        {/* ── end frame ─────────────────────────────────────── */}

      </div>
    </>
  );
}
