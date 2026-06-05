'use client';

import * as React from 'react';
import './globals.css';

/* ──────────────────────────────────────────────────────────────────────────
   global-error — last-resort boundary for failures in the ROOT layout itself
   (where app/error.tsx cannot run). It must render its own <html>/<body> and
   cannot depend on ThemeProvider or shared components, so it is intentionally
   self-contained and minimal. Inline styles are used here on purpose: this is
   the documented exception where the normal theming layer may be unavailable.
   ────────────────────────────────────────────────────────────────────────── */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          background: '#0a0a0b',
          color: '#e5e7eb',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(4rem, 18vw, 9rem)',
            fontWeight: 800,
            lineHeight: 1,
            backgroundImage: 'linear-gradient(135deg, #fb7185, #f43f5e, #f59e0b)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          500
        </div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          The whole app tripped over a wire.
        </h1>
        <p style={{ color: '#9ca3af', maxWidth: '28rem', margin: 0 }}>
          Something failed before the page could even load. We&apos;ve logged it —
          give it another shot.
        </p>
        {error?.digest && (
          <code
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.7rem',
              color: '#9ca3af',
              border: '1px solid #27272a',
              borderRadius: '0.5rem',
              padding: '0.4rem 0.7rem',
            }}
          >
            ref: {error.digest}
          </code>
        )}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => reset()}
            style={{
              cursor: 'pointer',
              borderRadius: '0.6rem',
              border: 'none',
              padding: '0.6rem 1.1rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#0a0a0b',
              background: 'linear-gradient(135deg, #fb7185, #f43f5e)',
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              borderRadius: '0.6rem',
              border: '1px solid #3f3f46',
              padding: '0.6rem 1.1rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#e5e7eb',
              textDecoration: 'none',
            }}
          >
            Back home
          </a>
        </div>
      </body>
    </html>
  );
}
