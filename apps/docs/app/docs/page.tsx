import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from '@structyl/icons';
import { Box, Typography } from '@structyl/styled';
import { SITE_URL, COMPONENT_SLUGS } from '../../lib/site-config';
import { ComponentGallery } from './component-gallery';

// COMPONENT_SLUGS is server-safe (plain module). Reading COMPONENTS.length here
// would yield 0 — registry.tsx is a 'use client' module and this is a Server
// Component, so its runtime array isn't materialised on the server.
// Two catalogue slugs (label, modal) have no registry entry, so exclude them to
// match the number of tiles the gallery actually renders.
const MISSING_FROM_REGISTRY = new Set(['label', 'modal']);
const COMPONENT_COUNT = COMPONENT_SLUGS.filter(
  ({ slug }) => !MISSING_FROM_REGISTRY.has(slug),
).length;

const url = `${SITE_URL}/docs`;
const title = 'Components';
const description =
  'Browse all structyl components with live previews. Each component has its own page with examples, a full API reference, and accessibility notes.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'website' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

const QUICK_LINKS = [
  { href: '/docs/getting-started', title: 'Getting started', sub: 'Install and render your first component.' },
  { href: '/docs/hooks', title: 'Hooks', sub: '24 SSR-safe, tree-shakeable React hooks.' },
  { href: '/docs/packages', title: 'Packages', sub: 'Nine focused, versioned packages.' },
  { href: '/docs/themes', title: 'Theming', sub: 'Runtime CSS-variable themes.' },
];

export default function DocsHome() {
  return (
    <Box className="mx-auto max-w-[1100px]">
      {/* Intro header */}
      <Typography as="p" variant="body2" className="text-xs font-semibold uppercase tracking-widest text-primary">Documentation</Typography>
      <Typography as="h1" variant="h1" className="mt-2 text-4xl font-semibold tracking-tight">Components</Typography>
      <Typography as="p" variant="body2" className="mt-3 max-w-2xl text-base text-muted-foreground">
        {COMPONENT_COUNT} accessible, themable components. Preview any one below, then open its
        page for examples and a full API reference.
      </Typography>

      <Box className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-border-strong hover:shadow-md"
          >
            <Box className="flex items-center justify-between">
              <Typography as="h3" variant="h3" className="text-[13px] font-semibold">{l.title}</Typography>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Box>
            <Typography as="p" variant="body2" className="mt-1 text-[12px] text-muted-foreground">{l.sub}</Typography>
          </Link>
        ))}
      </Box>

      {/* Gallery */}
      <Box className="mt-12">
        <ComponentGallery />
      </Box>
    </Box>
  );
}
