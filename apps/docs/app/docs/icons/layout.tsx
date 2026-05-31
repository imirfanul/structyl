import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/icons`;
const title = 'Icons';
const description =
  'Use the @structyl/icons set — 1000+ typed, tree-shakeable SVG components re-exported from lucide-react and ready for React 18 and 19.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function DocsIconsLayout({ children }: { children: ReactNode }) {
  return children;
}
