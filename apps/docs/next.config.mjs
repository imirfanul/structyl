/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@structyl/core',
    '@structyl/hooks',
    '@structyl/utils',
    '@structyl/themes',
    '@structyl/primitives',
    '@structyl/styled',
    '@structyl/data-table',
    '@structyl/icons',
    '@structyl/video-player',
  ],
};

export default nextConfig;
