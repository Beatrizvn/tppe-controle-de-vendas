import { NextConfig } from "next";

const nextConfig: NextConfig  = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, 
      aggregateTimeout: 300, 
    };
    return config;
  },
};

module.exports = nextConfig;
