import type { MetadataRoute } from 'next';
import { SITE_URL, COMPONENT_SLUGS, STATIC_DOC_SLUGS } from '../lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,          lastModified: now, changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${SITE_URL}/docs`, lastModified: now, changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${SITE_URL}/themes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/docs/icons`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/docs/hooks`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const staticDocRoutes: MetadataRoute.Sitemap = STATIC_DOC_SLUGS.map((slug) => ({
    url: `${SITE_URL}/docs/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const componentRoutes: MetadataRoute.Sitemap = COMPONENT_SLUGS.map(({ slug }) => ({
    url: `${SITE_URL}/docs/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...staticDocRoutes, ...componentRoutes];
}
