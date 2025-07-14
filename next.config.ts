import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'unsplash.com',
      'localhost',
      'site.test'
    ],

  },

  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ⛔ تجاهل TypeScript وقت الـ build
  },
};

export default nextConfig;
