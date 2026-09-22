import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/deuren/enkele-deur",
        destination: "/configurator",
        permanent: true,
      },
      {
        source: "/deuren/enkele-deur-met-vast-paneel",
        destination: "/configurator",
        permanent: true,
      },
      {
        source: "/deuren/dubbele-deur",
        destination: "/configurator",
        permanent: true,
      },
      {
        source: "/deuren/dubbele-deur-met-vast-paneel",
        destination: "/configurator",
        permanent: true,
      },
      {
        source: "/deuren/complete-scheidingswand",
        destination: "/configurator",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/_design", destination: "/design-preview" },
      { source: "/_design/:path*", destination: "/design-preview/:path*" },
    ];
  },
};

export default nextConfig;
