import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com'
    ],
    unoptimized: false,
  },

  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
