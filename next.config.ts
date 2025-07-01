import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com'],
    unoptimized: false,
  },

  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
