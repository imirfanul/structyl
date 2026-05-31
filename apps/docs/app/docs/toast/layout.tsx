import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/toast`;
const title = 'Toast';
const description =
  'Imperative and declarative toast notifications in structyl — the toast() API, the useToast hook, and an accessible <Toaster /> with full keyboard support.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function DocsToastLayout({ children }: { children: ReactNode }) {
  return children;
}
