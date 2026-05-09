"use client";

/**
 * HeroCocoaScene
 * ─────────────────────────────────────────────────────────────
 * Three.js live-rendered 3D cocoa pod with cinematic studio
 * lighting — inspired by the dark, warm-rimlit cocoa pod images.
 *
 * Scene:
 *  • Custom LatheGeometry cocoa pod (teardrop + 10 longitudinal ridges)
 *  • Warm amber rim-light from upper-right (PointLight)
 *  • Very dim fill + ambient so >90% of pod stays in shadow
 *  • Pulsing atmospheric glow halo
 *  • Floating gold dust particles
 *  • Slow Y-rotation + gentle float / tilt oscillation
 *  • ACES filmic tone mapping for HDR look
 */

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroCocoaScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let running = true;
    let cleanupFn: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const mount = mountRef.current;
      if (!mount || !running) return;

      /* ── Renderer ─────────────────────────────────────────── */
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(mount.offsetWidth, mount.offsetHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mount.appendChild(renderer.domElement);

      /* ── Scene ────────────────────────────────────────────── */
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050200);
      scene.fog = new THREE.FogExp2(0x050200, 0.055);

      /* ── Camera ───────────────────────────────────────────── */
      const camera = new THREE.PerspectiveCamera(
        42,
        mount.offsetWidth / mount.offsetHeight,
        0.1,
        60
      );
      camera.position.set(0, 0.3, 6.5);

      /* ── Cocoa pod geometry ───────────────────────────────── */
      // Lathe profile: narrow tip at bottom, widest at ~45%, tapers to narrower top
      const profilePoints: [number, number][] = [
        [0.00,  -1.80],
        [0.12,  -1.60],
        [0.28,  -1.30],
        [0.50,  -0.90],
        [0.68,  -0.45],
        [0.78,   0.00],
        [0.80,   0.40],
        [0.74,   0.80],
        [0.62,   1.15],
        [0.46,   1.45],
        [0.28,   1.65],
        [0.10,   1.78],
        [0.00,   1.85],
      ];

      const lathePoints = profilePoints.map(([r, y]) => new THREE.Vector2(r, y));
      const podGeo = new THREE.LatheGeometry(lathePoints, 48, 0, Math.PI * 2);

      // Displace vertices to create 10 longitudinal ridges
      const pos = podGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const r = Math.sqrt(x * x + z * z);
        if (r < 0.001) continue;
        const angle = Math.atan2(z, x);
        // Ridge bump: 10 ridges, ~8% amplitude
        const ridge = 1 + 0.082 * Math.cos(angle * 10);
        pos.setX(i, x * ridge);
        pos.setZ(i, z * ridge);
      }
      pos.needsUpdate = true;
      podGeo.computeVertexNormals();

      // Material — dark reddish-brown like an unripe/ripe cocoa pod
      const podMat = new THREE.MeshStandardMaterial({
        color:     new THREE.Color(0x3A1506),
        roughness: 0.80,
        metalness: 0.02,
        envMapIntensity: 0.4,
      });

      const pod = new THREE.Mesh(podGeo, podMat);
      pod.castShadow = true;
      pod.rotation.z = 0.25; // slight tilt — like held naturally
      scene.add(pod);

      // Stem
      const stemGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.35, 10);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x1E0A03, roughness: 0.95 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 2.02;
      stem.rotation.z = -0.12;
      pod.add(stem);

      /* ── Lighting ─────────────────────────────────────────── */

      // 1. Warm amber KEY light — strong rim from upper-right
      //    This is the "golden hour" rim that catches the pod ridges
      const rimLight = new THREE.PointLight(new THREE.Color(0xC9921A), 18, 18);
      rimLight.position.set(3.8, 3.0, 2.5);
      rimLight.castShadow = true;
      scene.add(rimLight);

      // 2. Secondary warm accent — lower right (fills the bottom curve)
      const accentLight = new THREE.PointLight(new THREE.Color(0xD4A827), 6, 12);
      accentLight.position.set(2.5, -1.5, 3.0);
      scene.add(accentLight);

      // 3. Very dim cool fill from left — barely separates pod from bg
      const fillLight = new THREE.PointLight(new THREE.Color(0x1A2A3A), 1.8, 10);
      fillLight.position.set(-4.5, 0.5, 2.0);
      scene.add(fillLight);

      // 4. Ambient — almost zero, preserves deep shadow mood
      scene.add(new THREE.AmbientLight(0x100805, 0.6));

      /* ── Atmospheric glow disc behind pod ─────────────────── */
      const glowGeo = new THREE.SphereGeometry(2.8, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color:       new THREE.Color(0xC9921A),
        transparent: true,
        opacity:     0.028,
        side:        THREE.BackSide,
        depthWrite:  false,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glow);

      // Brighter inner glow
      const innerGlowGeo = new THREE.SphereGeometry(1.5, 32, 32);
      const innerGlowMat = new THREE.MeshBasicMaterial({
        color:       new THREE.Color(0xD4B230),
        transparent: true,
        opacity:     0.018,
        side:        THREE.BackSide,
        depthWrite:  false,
      });
      const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
      pod.add(innerGlow);

      /* ── Dust particles ───────────────────────────────────── */
      const PARTICLE_COUNT = 180;
      const pPos   = new Float32Array(PARTICLE_COUNT * 3);
      const pCol   = new Float32Array(PARTICLE_COUNT * 3);
      const pSpeeds: number[] = [];
      const pPhases: number[] = [];

      const goldPalette = [
        [0.788, 0.572, 0.102],
        [0.831, 0.659, 0.153],
        [0.941, 0.769, 0.290],
        [0.627, 0.408, 0.082],
        [0.953, 0.847, 0.525],
      ];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 10;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1.5;
        const c = goldPalette[Math.floor(Math.random() * goldPalette.length)];
        pCol[i * 3]     = c[0];
        pCol[i * 3 + 1] = c[1];
        pCol[i * 3 + 2] = c[2];
        pSpeeds.push(Math.random() * 0.003 + 0.001);
        pPhases.push(Math.random() * Math.PI * 2);
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color",    new THREE.BufferAttribute(pCol, 3));
      const pMat = new THREE.PointsMaterial({
        size:         0.032,
        vertexColors: true,
        transparent:  true,
        opacity:      0.55,
        sizeAttenuation: true,
        depthWrite:   false,
      });
      const dustPoints = new THREE.Points(pGeo, pMat);
      scene.add(dustPoints);

      /* ── Animation loop ───────────────────────────────────── */
      let t = 0;
      const animate = () => {
        if (!running) return;
        requestAnimationFrame(animate);
        t += 0.006;

        // Pod — slow rotation, gentle float, subtle z-tilt oscillation
        pod.rotation.y  = t * 0.22;
        pod.position.y  = Math.sin(t * 0.55) * 0.10;
        pod.rotation.z  = 0.25 + Math.sin(t * 0.38) * 0.04;

        // Rim light pulse — mimics atmospheric shimmer
        rimLight.intensity   = 18 + Math.sin(t * 0.9) * 1.6;
        accentLight.intensity = 6 + Math.sin(t * 1.4 + 1) * 0.8;

        // Glow breathes
        glowMat.opacity = 0.025 + Math.sin(t * 0.7) * 0.006;

        // Particles — slow drift upward + lateral sine
        const pPosArr = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          pPosArr[i * 3]     += Math.sin(t * 0.8 + pPhases[i]) * 0.003;
          pPosArr[i * 3 + 1] += pSpeeds[i];
          // Wrap top → bottom
          if (pPosArr[i * 3 + 1] > 4.5) {
            pPosArr[i * 3 + 1] = -4.5;
          }
        }
        pGeo.attributes.position.needsUpdate = true;

        // Dust cloud slow rotation
        dustPoints.rotation.y = t * 0.012;

        renderer.render(scene, camera);
      };
      animate();

      /* ── Resize handler ───────────────────────────────────── */
      const onResize = () => {
        if (!mount) return;
        const w = mount.offsetWidth;
        const h = mount.offsetHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanupFn = () => {
        running = false;
        window.removeEventListener("resize", onResize);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        podGeo.dispose();
        podMat.dispose();
        pGeo.dispose();
        pMat.dispose();
        glowGeo.dispose();
        glowMat.dispose();
      };
    })();

    return () => {
      running = false;
      cleanupFn?.();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes badgeSlide {
          from { opacity:0; transform:translateX(-16px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes lineGrow {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }
        @keyframes titleRise {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scrollPip {
          0%   { transform:translateY(-110%); opacity:0; }
          25%  { opacity:1; }
          100% { transform:translateY(240%); opacity:0; }
        }
        .h-badge  { animation: badgeSlide 0.85s cubic-bezier(0.22,0.61,0.36,1) both 1.0s; }
        .h-line   { animation: lineGrow   0.65s cubic-bezier(0.22,0.61,0.36,1) both 1.15s; transform-origin:left; }
        .h-t1     { animation: titleRise  1.0s  cubic-bezier(0.22,0.61,0.36,1) both 1.4s; }
        .h-t2     { animation: titleRise  1.0s  cubic-bezier(0.22,0.61,0.36,1) both 1.65s; }
        .h-sub    { animation: fadeUp     1.0s  cubic-bezier(0.22,0.61,0.36,1) both 2.1s; }
        .h-ctas   { animation: fadeUp     1.0s  cubic-bezier(0.22,0.61,0.36,1) both 2.5s; }
        .h-certs  { animation: fadeUp     0.9s  cubic-bezier(0.22,0.61,0.36,1) both 2.9s; }
        .h-scroll { animation: fadeUp     0.8s  cubic-bezier(0.22,0.61,0.36,1) both 3.2s; }
        .pip      { animation: scrollPip  2.0s  ease-in-out infinite           3.6s; }
      `}</style>

      <section className="relative min-h-screen overflow-hidden bg-black flex items-center">

        {/* Three.js canvas container */}
        <div ref={mountRef} className="absolute inset-0 z-0" />

        {/* Cinematic vignette — heavier on left to keep text readable */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, transparent 15%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.80) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(100deg, rgba(5,2,0,0.90) 0%, rgba(5,2,0,0.65) 35%, rgba(5,2,0,0.15) 62%, transparent 78%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-36 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(5,2,0,0.60) 0%, transparent 100%)" }}
        />

        {/* Cinematic letterbox lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/5 z-[2]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/5 z-[2]" />

        {/* ── Text content ────────────────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-24 pb-20">
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

            {/* Title */}
            <h1
              className="font-serif font-bold leading-[1.06] mb-7"
              style={{ fontSize: "clamp(2.5rem,5.2vw,3.8rem)" }}
            >
              <span className="h-t1 block" style={{ color: "#FDF6E3" }}>
                From the Heart
              </span>
              <span className="h-t2 block" style={{ color: "#D4B645" }}>
                of West Africa
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="h-sub text-base sm:text-[1.05rem] leading-relaxed mb-9 max-w-[500px]"
              style={{ color: "rgba(253,246,227,0.68)" }}
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
        <div
          className="h-scroll absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        >
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
