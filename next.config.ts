import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   const apiUrl = process.env.API_URL || 'http://localhost:8000/api/v1';
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       destination: `${apiUrl}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
