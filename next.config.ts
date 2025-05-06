import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/stories",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
