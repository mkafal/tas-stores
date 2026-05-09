"use client";

import { useEffect, useRef } from "react";

// ── Geo helpers ───────────────────────────────────────────────────────────────
const RADIUS = 2.2;

function latLonTo3D(lat: number, lon: number, r: number): [number, number, number] {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const ORIGIN = { name: "Sierra Leone", lat: 8.46, lon: -11.78 };
const DESTINATIONS = [
  { name: "Netherlands",    lat: 52.13, lon:   5.29 },
  { name: "United Kingdom", lat: 51.51, lon:  -0.13 },
  { name: "Belgium",        lat: 50.85, lon:   4.35 },
  { name: "France",         lat: 46.23, lon:   2.21 },
  { name: "United States",  lat: 37.09, lon: -95.71 },
];

export default function WorldGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;

      // ── Renderer ───────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // ── Scene & Camera ──────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 1.2, 7);
      camera.lookAt(0, 0, 0);

      // ── Lighting ────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xfdf6e3, 0.6));
      const dirLight = new THREE.DirectionalLight(0xfff4cc, 1.2);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);
      const backLight = new THREE.DirectionalLight(0x2d5016, 0.3);
      backLight.position.set(-5, -3, -5);
      scene.add(backLight);

      // ── Globe body ──────────────────────────────────────
      const globeGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
      const globeMat = new THREE.MeshStandardMaterial({
        color:     0x1a2e0a,   // very dark forest
        roughness: 0.85,
        metalness: 0.05,
      });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      scene.add(globe);

      // ── Wireframe overlay ───────────────────────────────
      const wfGeo = new THREE.SphereGeometry(RADIUS * 1.002, 24, 24);
      const wfMat = new THREE.MeshBasicMaterial({
        color:       0xc9a227,
        wireframe:   true,
        transparent: true,
        opacity:     0.09,
        depthWrite:  false,
      });
      scene.add(new THREE.Mesh(wfGeo, wfMat));

      // ── Atmosphere glow ─────────────────────────────────
      const atmGeo = new THREE.SphereGeometry(RADIUS * 1.08, 32, 32);
      const atmMat = new THREE.MeshBasicMaterial({
        color:       0x4a7a25,
        transparent: true,
        opacity:     0.06,
        side:        THREE.BackSide,
        depthWrite:  false,
      });
      scene.add(new THREE.Mesh(atmGeo, atmMat));

      // ── Helpers ─────────────────────────────────────────
      const makeArc = (
        fromLat: number, fromLon: number,
        toLat:   number, toLon:   number,
        liftFactor: number
      ) => {
        const fromVec = new THREE.Vector3(...latLonTo3D(fromLat, fromLon, RADIUS));
        const toVec   = new THREE.Vector3(...latLonTo3D(toLat,   toLon,   RADIUS));
        // Control point: midpoint pushed outward
        const mid = new THREE.Vector3().addVectors(fromVec, toVec).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(RADIUS + liftFactor);
        return new THREE.QuadraticBezierCurve3(fromVec, mid, toVec);
      };

      const makeMarker = (
        lat: number, lon: number,
        color: number, size: number,
        glowColor: number
      ) => {
        const [x, y, z] = latLonTo3D(lat, lon, RADIUS + 0.03);
        // Core dot
        const core = new THREE.Mesh(
          new THREE.SphereGeometry(size, 16, 16),
          new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.7 })
        );
        core.position.set(x, y, z);
        // Halo
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(size * 2.2, 16, 16),
          new THREE.MeshBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: 0.18,
            depthWrite: false,
          })
        );
        halo.position.set(x, y, z);
        scene.add(core, halo);
      };

      // ── Origin marker — Sierra Leone (gold, large) ──────
      makeMarker(ORIGIN.lat, ORIGIN.lon, 0xc9a227, 0.065, 0xc9a227);

      // ── Destination markers & arcs ───────────────────────
      const arcs: { curve: THREE.QuadraticBezierCurve3; dot: THREE.Mesh; offset: number }[] = [];

      DESTINATIONS.forEach((dest, i) => {
        makeMarker(dest.lat, dest.lon, 0xfdf6e3, 0.042, 0xfdf6e3);

        const curve = makeArc(
          ORIGIN.lat, ORIGIN.lon,
          dest.lat,   dest.lon,
          0.7 + Math.random() * 0.4
        );

        // Static arc tube
        const points  = curve.getPoints(60);
        const arcGeo  = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat  = new THREE.LineBasicMaterial({
          color:       0xc9a227,
          transparent: true,
          opacity:     0.22,
          depthWrite:  false,
        });
        scene.add(new THREE.Line(arcGeo, arcMat));

        // Traveling dot
        const dotMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.038, 8, 8),
          new THREE.MeshStandardMaterial({
            color:            0xd4b645,
            emissive:         0xc9a227,
            emissiveIntensity: 1.2,
          })
        );
        scene.add(dotMesh);
        arcs.push({ curve, dot: dotMesh, offset: i / DESTINATIONS.length });
      });

      // ── Mouse drag ──────────────────────────────────────
      let isDragging  = false;
      let prevX       = 0;
      let prevY       = 0;
      let autoRotate  = true;
      let groupRotY   = 0;
      let groupRotX   = 0;

      const group = new THREE.Group();
      // Move everything into the group
      scene.children.slice().forEach((child) => {
        if (child !== dirLight && child !== backLight) {
          scene.remove(child);
          group.add(child);
        }
      });
      scene.add(group);
      scene.add(dirLight);
      scene.add(backLight);

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        autoRotate = false;
        prevX = e.clientX;
        prevY = e.clientY;
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        groupRotY += dx * 0.005;
        groupRotX += dy * 0.004;
        groupRotX  = Math.max(-0.8, Math.min(0.8, groupRotX));
        prevX = e.clientX;
        prevY = e.clientY;
      };
      const onMouseUp = () => {
        isDragging = false;
        setTimeout(() => { autoRotate = true; }, 2000);
      };

      // Touch support
      const onTouchStart = (e: TouchEvent) => {
        isDragging = true;
        autoRotate = false;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - prevX;
        const dy = e.touches[0].clientY - prevY;
        groupRotY += dx * 0.005;
        groupRotX += dy * 0.004;
        groupRotX  = Math.max(-0.8, Math.min(0.8, groupRotX));
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      };
      const onTouchEnd = () => {
        isDragging = false;
        setTimeout(() => { autoRotate = true; }, 2000);
      };

      mount.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup",   onMouseUp);
      mount.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove,  { passive: true });
      window.addEventListener("touchend",  onTouchEnd);

      // ── Animation loop ─────────────────────────────────
      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.008;

        if (autoRotate) groupRotY += 0.0025;
        group.rotation.y = groupRotY;
        group.rotation.x = groupRotX;

        // Animate traveling dots along arcs
        arcs.forEach(({ curve, dot, offset }) => {
          const progress = ((t * 0.18 + offset) % 1);
          const pos = curve.getPoint(progress);
          dot.position.copy(pos);
          // Fade in/out at endpoints
          const opacity = Math.sin(progress * Math.PI);
          (dot.material as THREE.MeshStandardMaterial).opacity = opacity;
          (dot.material as THREE.MeshStandardMaterial).transparent = true;
        });

        renderer.render(scene, camera);
      };

      animate();

      // ── Resize ─────────────────────────────────────────
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
        window.removeEventListener("resize",     onResize);
        window.removeEventListener("mousemove",  onMouseMove);
        window.removeEventListener("mouseup",    onMouseUp);
        window.removeEventListener("touchmove",  onTouchMove);
        window.removeEventListener("touchend",   onTouchEnd);
        mount.removeEventListener("mousedown",   onMouseDown);
        mount.removeEventListener("touchstart",  onTouchStart);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <div className="relative w-full h-full" ref={mountRef} style={{ cursor: "grab" }} />
  );
}
