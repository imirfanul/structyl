import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/changelog`;
const title = 'Changelog';
const description =
  'Release notes and version history for structyl — new components, fixes, and breaking changes across the @structyl packages, newest first.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function ChangelogLayout({ children }: { children: ReactNode }) {
  return children;
}
