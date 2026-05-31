/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // /docs/introduction was a client-side redirect listed in the sitemap;
      // make it a real permanent redirect so crawlers don't index an empty page.
      { source: '/docs/introduction', destination: '/docs', permanent: true },
    ];
  },
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
