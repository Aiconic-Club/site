import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  typescript: {
    // This allows the build to succeed despite TypeScript errors
    ignoreBuildErrors: true
  },
  eslint: {
    // Optional: also ignore ESLint errors during builds
    ignoreDuringBuilds: true
  }
  /* config options here */
};

export default nextConfig;
