import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/api-client`;
const title = 'API Client';
const description =
  'Data fetching for any React framework with @structyl/api-client — an Axios client with a built-in query cache, plus hooks for queries, mutations, infinite, suspense, and SSR.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function ApiClientLayout({ children }: { children: ReactNode }) {
  return children;
}
