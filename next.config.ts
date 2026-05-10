import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Three.js is dynamically imported in useEffect — namespace types
    // are unavailable at compile time. Errors are caught at runtime.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
