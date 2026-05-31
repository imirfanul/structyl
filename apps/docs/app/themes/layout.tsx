import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

const url = `${SITE_URL}/themes`;
const title = 'Theme Playground';
const description =
  'Build and preview custom structyl themes in real time — accent color, radius, typography, and dark mode — all powered by runtime CSS variables with no reload.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'website' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function ThemesLayout({ children }: { children: ReactNode }) {
  return children;
}
