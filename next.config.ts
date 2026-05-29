import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake large icon/animation barrels for smaller client bundles.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  images: {
    // Add remote CMS/CDN hosts here if you serve gallery photos remotely.
    remotePatterns: [],
  },
};

export default nextConfig;
