/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed to enable API routes
  basePath: '/invoice',
  assetPrefix: '/invoice',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
