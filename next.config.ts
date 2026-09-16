import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      { source: "/_design", destination: "/design-preview" },
      { source: "/_design/:path*", destination: "/design-preview/:path*" },
    ];
  },
};

export default nextConfig;
