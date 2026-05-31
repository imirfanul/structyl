import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/keyboard-shortcuts`;
const title = 'Keyboard Shortcuts';
const description =
  'The keyboard interactions structyl components implement out of the box, following the WAI-ARIA Authoring Practices for fully accessible navigation.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function KeyboardShortcutsLayout({ children }: { children: ReactNode }) {
  return children;
}
