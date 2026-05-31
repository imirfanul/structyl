import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider, ThemeScript } from '@structyl/themes';
import { Toaster } from '@structyl/styled';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, GITHUB_URL, NPM_URL, COMPONENT_SLUGS } from '../lib/site-config';
import './globals.css';

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Accessible React Component Library`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'react component library',
    'ui library',
    'tailwind components',
    'accessible components',
    'headless ui',
    'typescript ui',
    'data table react',
    'dark mode react',
    'WAI-ARIA',
    'radix alternative',
    'shadcn alternative',
    'theming react',
    'open source ui',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Accessible React Component Library`,
    description: SITE_DESCRIPTION,
    // og:image is auto-wired from app/opengraph-image.png (static file convention)
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Accessible React Component Library`,
    description: SITE_DESCRIPTION,
    // twitter:image is auto-wired from app/twitter-image.png (static file convention)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // NOTE: no site-wide `alternates.canonical` here — a blanket canonical is
  // inherited by every route and would make all pages canonicalize to `/`.
  // Each route declares its own self-referential canonical; the homepage
  // self-canonicalizes by absence.
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

/* ── JSON-LD structured data ───────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [GITHUB_URL, NPM_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/docs/{search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      softwareVersion: '1.0.0',
      programmingLanguage: ['TypeScript', 'JavaScript'],
      runtimePlatform: 'React',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Accessible headless primitives (WAI-ARIA)',
        'Tailwind CSS v4 styled components',
        'Runtime theming with CSS variables',
        'Dark mode support',
        'First-class DataTable',
        'TypeScript-first',
        'Next.js App Router compatible',
        'SSR-safe',
        '90+ components',
      ],
      downloadUrl: NPM_URL,
      codeRepository: GITHUB_URL,
      license: 'https://opensource.org/licenses/MIT',
      author: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE_NAME} — Accessible React Component Library`,
      description: SITE_DESCRIPTION,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#software` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        ],
      },
    },
  ],
};

/* ── GEO: FAQPage schema ───────────────────────────────────────────────── */

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is structyl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'structyl is an open-source, TypeScript-first React component library with 90+ accessible components. It combines WAI-ARIA compliant headless primitives with Tailwind CSS v4 styled wrappers, a runtime theming system, and a first-class DataTable — all in independently-versioned npm packages.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does structyl differ from shadcn/ui?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'structyl ships as actual npm packages (pnpm add @structyl/styled) rather than copy-paste code snippets. It adds a runtime theming system that switches themes without a page reload, a feature-complete DataTable, 24+ React hooks, and 90+ components — significantly more than shadcn/ui out of the box.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does structyl compare to Radix UI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'structyl builds on the same headless-first philosophy as Radix UI but adds a complete Tailwind-styled layer, runtime theming with CSS variables, dark mode, a DataTable, and chart components. Radix is primitives-only; structyl is a full component library ready to use.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is structyl compatible with Next.js App Router?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. All structyl components that use React hooks are marked with 'use client'. The library is SSR-safe and fully compatible with Next.js 15 App Router and React Server Components.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does structyl support dark mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. structyl includes a ThemeProvider that supports system, light, and dark modes. Theme switches happen instantly using CSS custom properties — no page reload required and no flash of unstyled content.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install structyl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install the main package with: pnpm add @structyl/styled (or npm install @structyl/styled). Then wrap your app in ThemeProvider from @structyl/themes and add Toaster from @structyl/styled to your root layout.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is structyl free and open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. structyl is MIT licensed and completely free. All packages are published to npm under the @structyl scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does structyl support TypeScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. structyl is built with TypeScript strict mode throughout. All components export their prop types and the library ships with full type definitions. There is no any usage in the public API.',
      },
    },
    {
      '@type': 'Question',
      name: 'What styling system does structyl use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'structyl uses Tailwind CSS v4 for styling, tailwind-variants for type-safe variant APIs, and tailwind-merge for class conflict resolution. All colors and design tokens are CSS custom properties that integrate with the runtime theming system.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does structyl have a DataTable component?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. structyl includes a first-class DataTable in the @structyl/data-table package, built on @tanstack/table-core. It supports sorting, multi-column filtering, pagination, row selection, column resizing, and row virtualization via @tanstack/react-virtual.',
      },
    },
  ],
};

/* ── GEO: HowTo schema (installation) ─────────────────────────────────── */

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to install and set up structyl',
  description: 'Step-by-step guide to install structyl React component library and render your first component.',
  totalTime: 'PT5M',
  supply: [{ '@type': 'HowToSupply', name: 'Node.js 18+' }, { '@type': 'HowToSupply', name: 'React 18+ or 19+' }],
  tool: [{ '@type': 'HowToTool', name: 'pnpm, npm, or yarn' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Install the package',
      text: 'Run: pnpm add @structyl/styled @structyl/themes',
      url: `${SITE_URL}/docs/getting-started`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add ThemeProvider to your root layout',
      text: "Import ThemeProvider from @structyl/themes and wrap your app. Add the ThemeScript before ThemeProvider to prevent flash of unstyled content.",
      url: `${SITE_URL}/docs/getting-started`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add Toaster for toast notifications',
      text: 'Import Toaster from @structyl/styled and place it inside your root layout body. This enables the imperative toast API anywhere in your app.',
      url: `${SITE_URL}/docs/getting-started`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Import and use a component',
      text: "Import any component from @structyl/styled, for example: import { Button } from '@structyl/styled'; Then render it: <Button variant=\"default\">Hello</Button>",
      url: `${SITE_URL}/docs/getting-started`,
    },
  ],
};

/* ── GEO: ItemList schema (component catalogue) ────────────────────────── */

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'structyl React components',
  description: 'Complete list of 90+ accessible React components in the structyl library.',
  url: `${SITE_URL}/docs`,
  numberOfItems: COMPONENT_SLUGS.length,
  itemListElement: COMPONENT_SLUGS.map(({ name, description, slug }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    description,
    url: `${SITE_URL}/docs/${slug}`,
  })),
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="slate" defaultMode="system" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider defaultTheme="slate" defaultMode="system">
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
