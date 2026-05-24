'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Check, Copy, RotateCcw, Sun, Moon } from '@aura-ui/icons';
import { Button } from '@aura-ui/styled';
import { useTheme } from '@aura-ui/themes';
import { COMPONENTS, CATEGORIES } from '../../lib/registry';

/* ── hex → HSL string ───────────────────────────────────────────────── */

function hexToHsl(hex: string): string {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = (parseInt(h.slice(0, 2), 16) || 0) / 255;
  const g = (parseInt(h.slice(2, 4), 16) || 0) / 255;
  const b = (parseInt(h.slice(4, 6), 16) || 0) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  let sat = 0;
  const lum = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = lum > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  return `${Math.round(hue * 360)} ${Math.round(sat * 100)}% ${Math.round(lum * 100)}%`;
}

const ACCENTS = [
  { name: 'Slate', hex: '#0f172a' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Lime', hex: '#65a30d' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Violet', hex: '#8b5cf6' },
];

const RADII = [
  { name: 'None', v: '0' },
  { name: 'Small', v: '0.3rem' },
  { name: 'Medium', v: '0.5rem' },
  { name: 'Large', v: '0.75rem' },
  { name: 'Full', v: '1rem' },
];

const SCALES = [
  { name: '90%', v: 0.9 },
  { name: '95%', v: 0.95 },
  { name: '100%', v: 1 },
  { name: '105%', v: 1.05 },
  { name: '110%', v: 1.1 },
];

export default function ThemesPlayground() {
  const { resolvedMode, setMode } = useTheme();
  const [accent, setAccent] = React.useState('#6366f1');
  const [radius, setRadius] = React.useState('0.5rem');
  const [scale, setScale] = React.useState(1);
  const [copied, setCopied] = React.useState(false);

  // Apply tokens to <html> so portaled overlays inherit them too
  React.useEffect(() => {
    const root = document.documentElement;
    const hsl = hexToHsl(accent);
    root.style.setProperty('--color-primary', hsl);
    root.style.setProperty('--color-ring', hsl);
    root.style.setProperty('--radius', radius);
    root.style.fontSize = `${16 * scale}px`;
    return () => {
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-ring');
      root.style.removeProperty('--radius');
      root.style.fontSize = '';
    };
  }, [accent, radius, scale]);

  const css = `:root {
  --color-primary: ${hexToHsl(accent)};
  --color-ring: ${hexToHsl(accent)};
  --radius: ${radius};
}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { void e; }
  };

  const reset = () => {
    setAccent('#6366f1');
    setRadius('0.5rem');
    setScale(1);
  };

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-glass">
        <div className="mx-auto flex h-14 max-w-[1500px] items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">aura-ui</span>
          </Link>
          <span className="text-sm text-muted-foreground">/ Themes playground</span>
          <Link href="/docs" className="ml-auto text-sm text-muted-foreground hover:text-fg transition-colors">
            Documentation
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[1fr_300px]">
        {/* Component showcase */}
        <main className="min-w-0 px-6 py-10 lg:px-10">
          <h1 className="text-3xl font-semibold tracking-tight">Themes playground</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Tune the theme on the right and watch every component react instantly. Copy the CSS when it looks right.
          </p>

          <div className="mt-8 space-y-10">
            {CATEGORIES.map((cat) => {
              const items = COMPONENTS.filter((c) => c.category === cat);
              if (!items.length) return null;
              return (
                <section key={cat}>
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {cat}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((c) => (
                      <div
                        key={c.slug}
                        className="flex flex-col rounded-xl border border-border/60 bg-card"
                      >
                        <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
                          <span className="text-xs font-medium">{c.name}</span>
                          <Link
                            href={`/docs/${c.slug}`}
                            className="text-[10px] text-muted-foreground hover:text-primary transition-colors"
                          >
                            Docs →
                          </Link>
                        </div>
                        <div className="flex flex-1 items-center justify-center p-6 min-h-[120px]">
                          <PreviewBoundary slug={c.slug}>{c.preview()}</PreviewBoundary>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>

        {/* Docked theme panel */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-auto border-l border-border/60 bg-card/30 px-5 py-6 lg:block">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold tracking-tight">Theme</h2>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Live — applies to every component.</p>

          <div className="mt-6 space-y-6">
            {/* Accent */}
            <Panel title="Accent color">
              <div className="grid grid-cols-6 gap-2">
                {ACCENTS.map((a) => (
                  <button
                    key={a.name}
                    onClick={() => setAccent(a.hex)}
                    title={a.name}
                    className={`relative h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-card transition-all duration-snappy active:scale-90 ${
                      accent === a.hex ? 'ring-primary' : 'ring-transparent hover:ring-border-strong'
                    }`}
                    style={{ background: a.hex }}
                  >
                    {accent === a.hex && (
                      <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border">
                  <span className="block h-full w-full" style={{ background: accent }} />
                  <input
                    type="color"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </label>
                <input
                  value={accent.toUpperCase()}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-full rounded-md border border-border bg-bg px-2 py-1 font-mono text-xs uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  spellCheck={false}
                />
              </div>
            </Panel>

            {/* Radius */}
            <Panel title="Radius">
              <div className="grid grid-cols-5 gap-1.5">
                {RADII.map((r) => (
                  <button
                    key={r.v}
                    onClick={() => setRadius(r.v)}
                    className={`flex flex-col items-center gap-1 rounded-md border px-1 py-2 text-[9px] font-medium transition-colors ${
                      radius === r.v ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                    }`}
                  >
                    <span className="h-5 w-5 border-2 border-fg" style={{ borderRadius: r.v }} />
                    {r.name}
                  </button>
                ))}
              </div>
            </Panel>

            {/* Scaling */}
            <Panel title="Scaling">
              <div className="grid grid-cols-5 gap-1.5">
                {SCALES.map((s) => (
                  <button
                    key={s.v}
                    onClick={() => setScale(s.v)}
                    className={`rounded-md border px-1 py-2 text-[10px] font-medium tabular-nums transition-colors ${
                      scale === s.v ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </Panel>

            {/* Appearance */}
            <Panel title="Appearance">
              <div className="grid grid-cols-2 gap-2">
                {(['light', 'dark'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-xs font-medium capitalize transition-colors ${
                      resolvedMode === m
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-border-strong'
                    }`}
                  >
                    {m === 'light' ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                    {m}
                  </button>
                ))}
              </div>
            </Panel>

            {/* CSS output */}
            <Panel title="CSS">
              <pre className="rounded-md border border-border bg-muted/50 p-2.5 text-[10px] leading-relaxed font-mono overflow-x-auto">
                {css}
              </pre>
            </Panel>

            {/* Actions */}
            <div className="sticky bottom-0 -mx-5 flex gap-2 border-t border-border/50 bg-card/95 px-5 py-3 backdrop-blur">
              <Button variant="outline" size="sm" onClick={reset} className="flex-1 gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </Button>
              <Button size="sm" onClick={copy} className="flex-1 gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy theme'}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

class PreviewBoundary extends React.Component<
  { slug: string; children: React.ReactNode },
  { error: boolean }
> {
  override state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  override componentDidCatch(err: unknown) {
    console.error(`[preview-error] slug=${this.props.slug}`, err);
  }
  override render() {
    if (this.state.error) {
      return <span className="text-xs text-destructive">⚠ {this.props.slug}</span>;
    }
    return this.props.children;
  }
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}
