import type { Metadata } from 'next';
import { SITE_URL, COMPONENT_SLUGS } from '../../../lib/site-config';

/* ── Per-slug metadata ─────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const entry = COMPONENT_SLUGS.find((c) => c.slug === slug);

  if (!entry) {
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const url = `${SITE_URL}/docs/${slug}`;
    return {
      title,
      alternates: { canonical: url },
      openGraph: { title: `${title} | structyl`, url, type: 'article' },
    };
  }

  const title = entry.name;
  const description = `${entry.description} Part of the structyl ${entry.category.toLowerCase()} components — accessible, TypeScript-first, Tailwind-styled.`;
  const url = `${SITE_URL}/docs/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | structyl`,
      description,
      url,
      type: 'article',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | structyl`,
      description,
    },
  };
}

/* ── JSON-LD per component ─────────────────────────────────────────────── */

function ComponentJsonLd({ slug }: { slug: string }) {
  const entry = COMPONENT_SLUGS.find((c) => c.slug === slug);
  if (!entry) return null;

  const url = `${SITE_URL}/docs/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}/#article`,
        headline: `${entry.name} — structyl component`,
        description: entry.description,
        url,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: {
          '@type': 'SoftwareSourceCode',
          name: entry.name,
          description: entry.description,
          programmingLanguage: 'TypeScript',
          runtimePlatform: 'React',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',       item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Docs',       item: `${SITE_URL}/docs` },
            { '@type': 'ListItem', position: 3, name: entry.name,   item: url },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ── Layout ────────────────────────────────────────────────────────────── */

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <ComponentJsonLd slug={slug} />
      {children}
    </>
  );
}
