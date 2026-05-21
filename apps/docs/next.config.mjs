/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@your-lib/core',
    '@your-lib/hooks',
    '@your-lib/utils',
    '@your-lib/themes',
    '@your-lib/primitives',
    '@your-lib/styled',
    '@your-lib/data-table',
    '@your-lib/icons',
  ],
};

export default nextConfig;
