'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Button, Typography } from '@structyl/styled';
import { Bug, Home, RefreshCw, ArrowUpRight, Coffee } from '@structyl/icons';
import { GITHUB_URL } from '../lib/site-config';

/* ──────────────────────────────────────────────────────────────────────────
   500 — Something broke

   Next.js error boundary for the app. Client component; receives `reset` to
   retry the failed render. Uses a red/amber accent to read as "error" rather
   than the teal "not found", with light dev humor and a retry button.
   ────────────────────────────────────────────────────────────────────────── */

const QUIPS = [
  'A wild exception appeared. It used Stack Trace. It was super effective.',
  "Don't worry — it's not you, it's our 0 unit tests for this path.",
  'The server needs a coffee. ☕ So do we.',
  'Somewhere, a Promise was rejected and took it personally.',
  'We caught this so you don’t have to. Mostly.',
];

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log for observability (no-op in prod consoles, useful in dev).
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  // Deterministic quip per error so it doesn't flicker on re-render.
  const quip = QUIPS[(error?.digest?.length ?? error?.message?.length ?? 0) % QUIPS.length];

  return (
    <Box className="relative flex min-h-screen flex-col overflow-hidden bg-bg text-fg">
      {/* Ambient glows — warm/error palette */}
      <Box
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(251,113,133,0.12) 0%, transparent 75%)' }}
      />
      <Box
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-40 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'rgba(245,158,11,0.08)' }}
      />

      {/* Minimal header */}
      <header className="relative z-10 mx-auto flex h-14 w-full max-w-6xl items-center px-6">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="structyl" className="hidden h-7 w-auto dark:block" />
          <img src="/logo-light.svg" alt="structyl" className="block h-7 w-auto dark:hidden" />
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        {/* Big 500 with a buzzing bug as the middle zero */}
        <Box className="flex select-none items-center justify-center gap-2 md:gap-4">
          {['5', null, '0'].map((c, i) =>
            c ? (
              <span
                key={i}
                className="bg-gradient-to-br from-[#fb7185] via-[#f43f5e] to-[#f59e0b] bg-clip-text text-[7rem] font-bold leading-none tracking-tight text-transparent md:text-[10rem]"
              >
                {c}
              </span>
            ) : (
              <span
                key={i}
                className="flex h-[7rem] w-[7rem] items-center justify-center md:h-[10rem] md:w-[10rem]"
              >
                <Bug
                  className="animate-buzz h-20 w-20 text-[#fb7185] drop-shadow-[0_8px_24px_rgba(251,113,133,0.35)] md:h-28 md:w-28"
                  strokeWidth={1.25}
                />
              </span>
            ),
          )}
        </Box>

        <Typography as="h1" variant="h1" className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">
          Well, that wasn&apos;t supposed to happen.
        </Typography>
        <Typography as="p" variant="body2" className="mt-3 text-balance text-muted-foreground">{quip}</Typography>

        {/* Error digest (safe to show — no stack/source) */}
        {error?.digest && (
          <code className="mt-4 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
            ref: {error.digest}
          </code>
        )}

        {/* CTAs */}
        <Box className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={() => reset()}>
            <RefreshCw className="h-4 w-4" /> Try again
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">
              <Home className="h-4 w-4" /> Back home
            </Link>
          </Button>
        </Box>

        <Link
          href={`${GITHUB_URL}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-1 text-[12px] text-muted-foreground/70 transition-colors hover:text-fg"
        >
          <Coffee className="h-3 w-3" />
          Still broken? Open an issue and we&apos;ll take a look
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </main>
    </Box>
  );
}
