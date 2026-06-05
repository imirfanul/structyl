'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Button, Typography } from '@structyl/styled';
import {
  Ghost,
  Home,
  Search,
  Compass,
  RotateCcw,
  ChevronRight,
  ArrowUpRight,
} from '@structyl/icons';
import { GITHUB_URL } from '../lib/site-config';

/* ──────────────────────────────────────────────────────────────────────────
   404 — Not Found

   A friendly "this component wandered off" page. On-brand with the homepage:
   ambient glows, shimmer-gradient numerals, the site logo, and the Button
   component. A rotating set of dev-humor quips keeps it light; the "respawn"
   button re-rolls the quip for a tiny easter egg.
   ────────────────────────────────────────────────────────────────────────── */

const QUIPS = [
  'This component never made it past code review.',
  'We looked everywhere — even in node_modules.',
  'Error: page is in another castle. 🍄',
  'It compiled, then it ghosted. 👻',
  'That route is headless, but not in the good way.',
  'undefined is not a page (sorry).',
  'Tree-shaken a little too hard, perhaps.',
  '404 props expected, 0 received.',
  'This page lost its key prop and re-rendered into the void.',
  'Have you tried turning the URL off and on again?',
];

const SUGGESTIONS = [
  { label: 'Components', href: '/docs', icon: Compass },
  { label: 'Getting started', href: '/docs/getting-started', icon: ChevronRight },
  { label: 'Themes', href: '/themes', icon: ChevronRight },
  { label: 'Hooks', href: '/docs/hooks', icon: ChevronRight },
];

export default function NotFound() {
  const [quip, setQuip] = React.useState(0);
  const [spins, setSpins] = React.useState(0);

  const respawn = () => {
    setQuip((q) => (q + 1 + Math.floor(QUIPS.length * 0.37)) % QUIPS.length);
    setSpins((s) => s + 1);
  };

  return (
    <Box className="relative flex min-h-screen flex-col overflow-hidden bg-bg text-fg">
      {/* Ambient glows (match homepage hero) */}
      <Box
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(77,246,201,0.10) 0%, transparent 75%)' }}
      />
      <Box
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-40 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'rgba(110,139,255,0.07)' }}
      />

      {/* Minimal header */}
      <header className="relative z-10 mx-auto flex h-14 w-full max-w-6xl items-center px-6">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="structyl" className="hidden h-7 w-auto dark:block" />
          <img src="/logo-light.svg" alt="structyl" className="block h-7 w-auto dark:hidden" />
        </Link>
      </header>

      {/* Body */}
      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        {/* Big 404 with a ghost as the middle zero */}
        <Box className="flex select-none items-center justify-center gap-2 md:gap-4">
          {['4', null, '4'].map((c, i) =>
            c ? (
              <span
                key={i}
                className="animate-shimmer bg-gradient-to-r from-[#4DF6C9] via-[#6E8BFF] to-[#A973FF] bg-clip-text text-[7rem] font-bold leading-none tracking-tight text-transparent md:text-[10rem]"
              >
                {c}
              </span>
            ) : (
              <span
                key={i}
                className="flex h-[7rem] w-[7rem] items-center justify-center md:h-[10rem] md:w-[10rem]"
              >
                <Ghost
                  className="animate-float h-20 w-20 text-[#6E8BFF] drop-shadow-[0_8px_24px_rgba(110,139,255,0.35)] md:h-28 md:w-28"
                  strokeWidth={1.25}
                />
              </span>
            ),
          )}
        </Box>

        <Typography as="h1" variant="h1" className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">
          This page wandered off.
        </Typography>

        {/* Rotating quip */}
        <Typography as="p" variant="body2" key={spins} className="animate-fade-in mt-3 min-h-[1.5rem] text-balance text-muted-foreground">
          {QUIPS[quip]}
        </Typography>

        {/* CTAs */}
        <Box className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="h-4 w-4" /> Back home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">
              <Search className="h-4 w-4" /> Browse components
            </Link>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={respawn}
            aria-label="New excuse"
          >
            <RotateCcw className={`h-4 w-4 transition-transform duration-500 ${spins ? 'rotate-[360deg]' : ''}`} />
            Respawn
          </Button>
        </Box>

        {/* Quick links */}
        <Box className="mt-12 w-full">
          <Typography as="p" variant="body2" className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
            Maybe you were looking for
          </Typography>
          <Box className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SUGGESTIONS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card px-3 py-2.5 text-[13px] font-medium text-muted-foreground transition-all hover:border-border-strong hover:text-fg hover:shadow-sm"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            ))}
          </Box>
        </Box>

        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-1 text-[12px] text-muted-foreground/70 transition-colors hover:text-fg"
        >
          Think this link should exist? Tell us on GitHub
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </main>
    </Box>
  );
}
