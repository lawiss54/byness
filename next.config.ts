import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://analytics.tiktok.com
        https://ads.tiktok.com
        https://www.googletagmanager.com
        https://www.google-analytics.com
        https://va.vercel-scripts.com
        https://www.google-analytics.com
        https://connect.facebook.net;
      style-src 'self' 'unsafe-inline';
      connect-src 'self'
        https://analytics.tiktok.com
        https://ads.tiktok.com
        https://www.google-analytics.com
        https://www.facebook.com;
      img-src * data: blob:;
      frame-src https://analytics.tiktok.com https://ads.tiktok.com;
    `.replace(/\n/g, ''),
  },
];


const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'unsplash.com',
      'localhost',
      'site.test',
      'res.cloudinary.com',
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
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)', // جميع الصفحات
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
