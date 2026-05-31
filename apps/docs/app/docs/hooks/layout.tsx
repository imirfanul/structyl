import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/hooks`;
const title = 'Hooks';
const description =
  'Reference for the @structyl/hooks package — useControllableState, useDebounce, useMediaQuery, useLocalStorage, and more, all SSR-safe, typed, and tree-shakeable.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function DocsHooksLayout({ children }: { children: ReactNode }) {
  return children;
}
