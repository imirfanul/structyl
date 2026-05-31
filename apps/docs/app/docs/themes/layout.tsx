import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/themes`;
const title = 'Theming';
const description =
  'Theme structyl at runtime with ThemeProvider and CSS variables — light, dark, and system modes, accent presets, and an SSR-safe anti-flash script.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function DocsThemesLayout({ children }: { children: ReactNode }) {
  return children;
}
