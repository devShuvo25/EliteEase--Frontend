import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all domains
      },
      {
        protocol: 'http',
        hostname: '**', // allow all http domains if needed
      },
    ],
  },
};

export default nextConfig;
