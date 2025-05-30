import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/src/admin/:path*',
      },
    ];
  },
};

export default nextConfig;
