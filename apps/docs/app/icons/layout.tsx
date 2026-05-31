import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

const url = `${SITE_URL}/icons`;
const title = 'Icons';
const description =
  "Search structyl's 1000+ tree-shakeable SVG icons, built on lucide-react and typed for React 18 and 19, with copy-paste import snippets for each.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'website' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function IconsLayout({ children }: { children: ReactNode }) {
  return children;
}
