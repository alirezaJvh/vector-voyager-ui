import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       destination: `${apiUrl}/api/v1/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
