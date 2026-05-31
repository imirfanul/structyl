'use client';

import * as React from 'react';
import { Copy, Check } from '@structyl/icons';

/* ── Token definitions ───────────────────────────────────────────────── */

type TokenGroup = {
  label: string;
  description: string;
  tokens: { name: string; var: string; tailwind: string; description: string }[];
};

const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: 'Background & Foreground',
    description: 'Base surface and text colors for the page.',
    tokens: [
      { name: 'bg',  var: '--color-bg',  tailwind: 'bg-bg / text-bg',   description: 'Page background' },
      { name: 'fg',  var: '--color-fg',  tailwind: 'bg-fg / text-fg',   description: 'Primary text color' },
    ],
  },
  {
    label: 'Card',
    description: 'Surface colors for card-like containers.',
    tokens: [
      { name: 'card',    var: '--color-card',    tailwind: 'bg-card',    description: 'Card background' },
      { name: 'card-fg', var: '--color-card-fg', tailwind: 'text-card-fg', description: 'Card text color' },
    ],
  },
  {
    label: 'Popover',
    description: 'Colors for floating elements like dropdowns and tooltips.',
    tokens: [
      { name: 'popover',    var: '--color-popover',    tailwind: 'bg-popover',    description: 'Popover background' },
      { name: 'popover-fg', var: '--color-popover-fg', tailwind: 'text-popover-fg', description: 'Popover text' },
    ],
  },
  {
    label: 'Primary',
    description: 'Main brand color used for buttons, links, and interactive focus rings.',
    tokens: [
      { name: 'primary',        var: '--color-primary',        tailwind: 'bg-primary',        description: 'Primary action color' },
      { name: 'primary-fg',     var: '--color-primary-fg',     tailwind: 'text-primary-fg',   description: 'Text on primary' },
      { name: 'primary-hover',  var: '--color-primary-hover',  tailwind: 'bg-primary-hover',  description: 'Hovered primary' },
      { name: 'primary-active', var: '--color-primary-active', tailwind: 'bg-primary-active', description: 'Pressed primary' },
    ],
  },
  {
    label: 'Secondary',
    description: 'Subdued variant for secondary actions.',
    tokens: [
      { name: 'secondary',    var: '--color-secondary',    tailwind: 'bg-secondary',    description: 'Secondary background' },
      { name: 'secondary-fg', var: '--color-secondary-fg', tailwind: 'text-secondary-fg', description: 'Secondary text' },
    ],
  },
  {
    label: 'Muted',
    description: 'Low-contrast surfaces and placeholder text.',
    tokens: [
      { name: 'muted',    var: '--color-muted',    tailwind: 'bg-muted',    description: 'Muted background' },
      { name: 'muted-fg', var: '--color-muted-fg', tailwind: 'text-muted-foreground', description: 'Muted / dimmed text' },
    ],
  },
  {
    label: 'Accent',
    description: 'Hover and selection highlight.',
    tokens: [
      { name: 'accent',    var: '--color-accent',    tailwind: 'bg-accent',    description: 'Hover highlight' },
      { name: 'accent-fg', var: '--color-accent-fg', tailwind: 'text-accent-foreground', description: 'Text on accent' },
    ],
  },
  {
    label: 'Semantic',
    description: 'Status colors for feedback states.',
    tokens: [
      { name: 'destructive',    var: '--color-destructive',    tailwind: 'bg-destructive',    description: 'Error / danger' },
      { name: 'destructive-fg', var: '--color-destructive-fg', tailwind: 'text-destructive-fg', description: 'Text on destructive' },
      { name: 'success',        var: '--color-success',        tailwind: 'bg-success / text-success', description: 'Success state' },
      { name: 'success-fg',     var: '--color-success-fg',     tailwind: 'text-success-fg',   description: 'Text on success' },
      { name: 'warning',        var: '--color-warning',        tailwind: 'bg-warning / text-warning', description: 'Warning state' },
      { name: 'warning-fg',     var: '--color-warning-fg',     tailwind: 'text-warning-fg',   description: 'Text on warning' },
      { name: 'info',           var: '--color-info',           tailwind: 'bg-info / text-info', description: 'Info state' },
      { name: 'info-fg',        var: '--color-info-fg',        tailwind: 'text-info-fg',      description: 'Text on info' },
    ],
  },
  {
    label: 'Border & Input',
    description: 'Stroke and input field colors.',
    tokens: [
      { name: 'border',       var: '--color-border',       tailwind: 'border-border',       description: 'Default border' },
      { name: 'border-strong', var: '--color-border-strong', tailwind: 'border-border-strong', description: 'Emphasized border' },
      { name: 'input',        var: '--color-input',        tailwind: 'border-input',        description: 'Input border' },
      { name: 'ring',         var: '--color-ring',         tailwind: 'ring-ring',           description: 'Focus ring' },
    ],
  },
];

/* ── Color swatch ────────────────────────────────────────────────────── */

function Swatch({ cssVar }: { cssVar: string }) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border/60 shadow-sm">
      {/* Checkerboard for transparent colors */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-conic-gradient(#ccc 0% 25%, white 0% 50%)',
          backgroundSize: '8px 8px',
        }}
      />
      <div
        className="absolute inset-0 rounded-lg"
        style={{ background: `hsl(var(${cssVar}))` }}
      />
    </div>
  );
}

/* ── Copy button ─────────────────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };
  return (
    <button
      onClick={copy}
      className="ml-auto flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-muted hover:text-fg"
    >
      {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default function DesignTokensPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Resources</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Design tokens</h1>
      <p className="mt-3 text-base text-muted-foreground">
        All design tokens are CSS custom properties injected by{' '}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">ThemeProvider</code>
        . They automatically update when the theme or color mode changes.
      </p>

      {/* Usage */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold tracking-tight">Usage</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Tokens are available as CSS custom properties and as Tailwind utility classes through the
          preset.
        </p>
        <div className="overflow-hidden rounded-lg border border-border bg-[#0d1117]">
          <div className="border-b border-white/10 px-3 py-1.5">
            <span className="font-mono text-[11px] text-white/40">css / tailwind</span>
          </div>
          <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed">
            <code className="font-mono text-[#c9d1d9]">{`/* CSS custom property */
background: hsl(var(--color-primary));

/* Tailwind class */
<div className="bg-primary text-primary-fg" />`}</code>
          </pre>
        </div>
      </section>

      {/* Token groups */}
      {TOKEN_GROUPS.map((group) => (
        <section key={group.label} className="mt-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">{group.label}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{group.description}</p>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Swatch</th>
                  <th className="px-4 py-2.5 font-medium">Token</th>
                  <th className="px-4 py-2.5 font-medium">Tailwind</th>
                  <th className="px-4 py-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map((token) => (
                  <tr key={token.name} className="group border-t border-border/60 align-middle">
                    <td className="px-4 py-3">
                      <Swatch cssVar={token.var} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-medium">{token.var}</code>
                        <CopyButton text={token.var} />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      {token.tailwind}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{token.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Theme note */}
      <section className="mt-10">
        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <h3 className="text-sm font-semibold">Themes change token values</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Switching between themes (slate, zinc, rose) or modes (light, dark) replaces all token
            values simultaneously. Your components automatically adapt — no class swapping needed.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['slate', 'zinc', 'rose'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
