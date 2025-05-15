import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['https://f657-5-35-39-40.ngrok-free.app'], // ← сюда вставь свой ngrok-адрес
    },
  },
};

export default nextConfig;