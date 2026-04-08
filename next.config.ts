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
  async headers() {
    return [
      {
        // This explicitly tells Vercel to let your WordPress site access the API
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, 
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-sandbox-id, Authorization" },
        ]
      }
    ]
  }
};

export default nextConfig;
