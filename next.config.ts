import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "diplomaticfreight.com",
          },
        ],
        destination: "https://www.diplomaticfreight.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
