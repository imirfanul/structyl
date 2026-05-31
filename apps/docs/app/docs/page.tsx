'use client';

import Link from 'next/link';
import { ArrowUpRight } from '@structyl/icons';
import { COMPONENTS } from '../../lib/registry';

export default function DocsHome() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Documentation</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Introduction</h1>
      <p className="mt-3 text-base text-muted-foreground">
        structyl is an open-source React component library with three layers — headless
        behaviour primitives, Tailwind-styled components, and a runtime theme system —
        plus a first-class DataTable.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/docs/getting-started"
          className="group rounded-xl border border-border bg-card p-5 transition-all duration-smooth hover:border-border-strong hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Getting started</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Install the packages and render your first component.</p>
        </Link>
        <Link
          href="/docs/button"
          className="group rounded-xl border border-border bg-card p-5 transition-all duration-smooth hover:border-border-strong hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Browse components</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{COMPONENTS.length}+ documented components with live previews.</p>
        </Link>
        <Link
          href="/docs/hooks"
          className="group rounded-xl border border-border bg-card p-5 transition-all duration-smooth hover:border-border-strong hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Hooks</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">24 SSR-safe, tree-shakeable React hooks.</p>
        </Link>
        <Link
          href="/docs/packages"
          className="group rounded-xl border border-border bg-card p-5 transition-all duration-smooth hover:border-border-strong hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Packages</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Nine focused, independently-versioned packages.</p>
        </Link>
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Three pillars</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li><strong className="text-fg">Accessible primitives</strong> — WAI-ARIA APG-compliant headless behaviour.</li>
        <li><strong className="text-fg">Styled layer</strong> — Tailwind-styled components driven by theme tokens.</li>
        <li><strong className="text-fg">Runtime theming</strong> — CSS-variable themes you can swap or generate.</li>
      </ul>
    </div>
  );
}
