import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/forms`;
const title = 'Forms';
const description =
  'Headless, schema-driven forms for React with @structyl/forms — a from-scratch chainable validator, a useForm reactive engine, and Form/Field components built on structyl’s accessible form primitives. Zero dependencies beyond structyl.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function FormsLayout({ children }: { children: ReactNode }) {
  return children;
}
