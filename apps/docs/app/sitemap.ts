import type { MetadataRoute } from 'next';
import { SITE_URL, COMPONENT_SLUGS, STATIC_DOC_SLUGS } from '../lib/site-config';

export const dynamic = 'force-static';

// Slugs present in COMPONENT_SLUGS (used for the catalogue/SEO) that do NOT have
// a corresponding registry entry, so /docs/<slug> and /docs/api/<slug> both 404.
// Excluded here so the sitemap only advertises pages that actually resolve.
const MISSING_FROM_REGISTRY = new Set(['label', 'modal']);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const componentSlugs = COMPONENT_SLUGS.filter(
    ({ slug }) => !MISSING_FROM_REGISTRY.has(slug),
  );

  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL,                          lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/docs`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/themes`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/hooks`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/icons`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/docs/color-presets`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...STATIC_DOC_SLUGS.map((slug) => ({
      url: `${SITE_URL}/docs/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...componentSlugs.map(({ slug }) => ({
      url: `${SITE_URL}/docs/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Dedicated per-component API reference pages (/docs/api/<slug>).
    ...componentSlugs.map(({ slug }) => ({
      url: `${SITE_URL}/docs/api/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  // Dedupe by URL, keeping the highest-priority entry for each.
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    const existing = byUrl.get(entry.url);
    if (!existing || (entry.priority ?? 0) > (existing.priority ?? 0)) {
      byUrl.set(entry.url, entry);
    }
  }
  return [...byUrl.values()];
}
