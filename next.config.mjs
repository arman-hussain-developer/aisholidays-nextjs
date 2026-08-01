/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: new URL(".", import.meta.url).pathname,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
