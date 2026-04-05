import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  eslint: {
    // This will allow the production build to complete 
    // even if there are formatting (Prettier) errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional: If you also hit Type errors, 
    // you can ignore them with this setting:
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
