import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

const url = `${SITE_URL}/hooks`;
const title = 'React Hooks';
const description =
  "Browse structyl's SSR-safe, tree-shakeable React hooks for state, refs, DOM, browser APIs, and performance — each with a live example and TypeScript types.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'website' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function HooksLayout({ children }: { children: ReactNode }) {
  return children;
}
