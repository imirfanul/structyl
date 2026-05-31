import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/design-tokens`;
const title = 'Design Tokens';
const description =
  "The structyl design-token system — colors, spacing, radius, typography, and shadows exposed as CSS variables that power runtime theming and dark mode.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function DesignTokensLayout({ children }: { children: ReactNode }) {
  return children;
}
