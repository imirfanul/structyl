/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@aura-ui/core',
    '@aura-ui/hooks',
    '@aura-ui/utils',
    '@aura-ui/themes',
    '@aura-ui/primitives',
    '@aura-ui/styled',
    '@aura-ui/data-table',
    '@aura-ui/icons',
    '@aura-ui/video-player',
  ],
};

export default nextConfig;
