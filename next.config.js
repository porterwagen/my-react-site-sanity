/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'], // WebP and AVIF for better browser support
    domains: ['cms.awesomedemo.com'],
     deviceSizes: [320, 375, 640, 768, 1024, 1280],
    imageSizes: [400, 800], // 1x and 2x for 380px container
    minimumCacheTTL: 0, // Cache for at least 60 seconds in development
  },
  // Protect sensitive directories from being publicly accessible
  async headers() {
    return [
      {
        source: '/data/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'none'",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;