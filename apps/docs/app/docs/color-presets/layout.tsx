import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

const url = `${SITE_URL}/docs/color-presets`;
const title = 'Color Presets';
const description =
  "Switch structyl's accent color instantly with built-in presets or generate your own — all driven by runtime CSS variables, with no reload and no flash.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | structyl`, description, url, type: 'article' },
  twitter: { card: 'summary_large_image', title: `${title} | structyl`, description },
};

export default function ColorPresetsLayout({ children }: { children: ReactNode }) {
  return children;
}
