"use client";

import dynamic from "next/dynamic";

const WorldGlobe = dynamic(() => import("@/components/WorldGlobe"), { ssr: false });

export default function GlobeSection() {
  return (
    <div className="relative h-[420px] sm:h-[500px]">
      <WorldGlobe />
    </div>
  );
}
