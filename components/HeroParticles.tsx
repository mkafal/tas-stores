"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;

      // ── Scene ───────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 100);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // ── Particles ────────────────────────────────────────
      const COUNT = 90;
      const positions  = new Float32Array(COUNT * 3);
      const velocities = new Float32Array(COUNT * 3); // per-particle drift
      const phases     = new Float32Array(COUNT);     // sine-wave phase
      const colors     = new Float32Array(COUNT * 3);

      const palette = [
        new THREE.Color("#C9A227"),  // gold
        new THREE.Color("#A0522D"),  // sienna
        new THREE.Color("#FDF6E3"),  // cream
        new THREE.Color("#8B4513"),  // brown
        new THREE.Color("#4A7A25"),  // green
        new THREE.Color("#D4B645"),  // pale gold
      ];

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

        velocities[i * 3]     = (Math.random() - 0.5) * 0.0012; // x drift
        velocities[i * 3 + 1] = Math.random() * 0.004 + 0.001;  // upward
        velocities[i * 3 + 2] = 0;

        phases[i] = Math.random() * Math.PI * 2;

        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));

      const mat = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.38,
        sizeAttenuation: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // ── Animation ────────────────────────────────────────
      const pos = geo.attributes.position.array as Float32Array;
      let t = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.01;

        for (let i = 0; i < COUNT; i++) {
          const ph = phases[i];
          pos[i * 3]     += velocities[i * 3] + Math.sin(t * 0.6 + ph) * 0.0008;
          pos[i * 3 + 1] += velocities[i * 3 + 1];

          // Wrap vertically
          if (pos[i * 3 + 1] > 6.5)  pos[i * 3 + 1] = -6.5;
          // Wrap horizontally
          if (pos[i * 3]     >  12)   pos[i * 3]     = -12;
          if (pos[i * 3]     < -12)   pos[i * 3]     =  12;
        }

        geo.attributes.position.needsUpdate = true;
        points.rotation.y += 0.00025;
        renderer.render(scene, camera);
      };

      animate();

      // ── Resize ───────────────────────────────────────────
      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-[2]"
      style={{ pointerEvents: "none" }}
    />
  );
}
