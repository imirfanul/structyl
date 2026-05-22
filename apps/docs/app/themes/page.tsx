'use client';

import * as React from 'react';
import { Button, Card, Input, Label, Badge, Alert } from '@aura-ui/styled';

/* ── hex ⇄ HSL helpers ──────────────────────────────────────────────── */

function hexToHslString(hex: string): string {
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

/* ── token definitions ──────────────────────────────────────────────── */

interface TokenDef {
  key: string;
  label: string;
  cssVar: string;
  group: string;
}

const TOKENS: TokenDef[] = [
  { key: 'bg', label: 'Background', cssVar: '--color-bg', group: 'Surface' },
  { key: 'fg', label: 'Foreground (text)', cssVar: '--color-fg', group: 'Surface' },
  { key: 'card', label: 'Card', cssVar: '--color-card', group: 'Surface' },
  { key: 'cardFg', label: 'Card text', cssVar: '--color-card-fg', group: 'Surface' },
  { key: 'primary', label: 'Primary', cssVar: '--color-primary', group: 'Brand' },
  { key: 'primaryFg', label: 'Primary text', cssVar: '--color-primary-fg', group: 'Brand' },
  { key: 'secondary', label: 'Secondary', cssVar: '--color-secondary', group: 'Brand' },
  { key: 'secondaryFg', label: 'Secondary text', cssVar: '--color-secondary-fg', group: 'Brand' },
  { key: 'accent', label: 'Accent', cssVar: '--color-accent', group: 'Brand' },
  { key: 'accentFg', label: 'Accent text', cssVar: '--color-accent-fg', group: 'Brand' },
  { key: 'muted', label: 'Muted', cssVar: '--color-muted', group: 'Neutral' },
  { key: 'mutedFg', label: 'Muted text', cssVar: '--color-muted-fg', group: 'Neutral' },
  { key: 'border', label: 'Border', cssVar: '--color-border', group: 'Neutral' },
  { key: 'ring', label: 'Focus ring', cssVar: '--color-ring', group: 'Neutral' },
  { key: 'destructive', label: 'Destructive', cssVar: '--color-destructive', group: 'Status' },
  { key: 'destructiveFg', label: 'Destructive text', cssVar: '--color-destructive-fg', group: 'Status' },
];

type TokenState = Record<string, string>; // key → hex

const DEFAULTS: TokenState = {
  bg: '#ffffff',
  fg: '#0f172a',
  card: '#ffffff',
  cardFg: '#0f172a',
  primary: '#0f172a',
  primaryFg: '#f8fafc',
  secondary: '#f1f5f9',
  secondaryFg: '#0f172a',
  accent: '#f1f5f9',
  accentFg: '#0f172a',
  muted: '#f1f5f9',
  mutedFg: '#64748b',
  border: '#e2e8f0',
  ring: '#0f172a',
  destructive: '#ef4444',
  destructiveFg: '#ffffff',
};

const GROUPS = ['Surface', 'Brand', 'Neutral', 'Status'];

/* Quick brand presets so users don't have to pick from scratch */
const PRESETS = [
  { name: 'Indigo', primary: '#6366f1', ring: '#6366f1' },
  { name: 'Blue', primary: '#3b82f6', ring: '#3b82f6' },
  { name: 'Emerald', primary: '#10b981', ring: '#10b981' },
  { name: 'Rose', primary: '#e11d48', ring: '#e11d48' },
  { name: 'Orange', primary: '#f97316', ring: '#f97316' },
  { name: 'Violet', primary: '#8b5cf6', ring: '#8b5cf6' },
  { name: 'Slate', primary: '#0f172a', ring: '#0f172a' },
];

export default function ThemeGeneratorPage() {
  const [tokens, setTokens] = React.useState<TokenState>(DEFAULTS);
  const [radius, setRadius] = React.useState(0.5);
  const [copied, setCopied] = React.useState(false);

  const cssVars: React.CSSProperties = React.useMemo(() => {
    const style: Record<string, string> = {};
    for (const t of TOKENS) {
      style[t.cssVar] = hexToHslString(tokens[t.key] ?? '#000000');
    }
    style['--radius'] = `${radius}rem`;
    style['--color-input'] = hexToHslString(tokens.border ?? '#e2e8f0');
    style['--color-popover'] = hexToHslString(tokens.card ?? '#ffffff');
    style['--color-popover-fg'] = hexToHslString(tokens.cardFg ?? '#0f172a');
    return style as React.CSSProperties;
  }, [tokens, radius]);

  const cssOutput = React.useMemo(() => {
    const lines = TOKENS.map(
      (t) => `  ${t.cssVar}: ${hexToHslString(tokens[t.key] ?? '#000')};`,
    );
    lines.push(`  --radius: ${radius}rem;`);
    return `:root {\n${lines.join('\n')}\n}`;
  }, [tokens, radius]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { void e; }
  };

  const setToken = (key: string, hex: string) =>
    setTokens((prev) => ({ ...prev, [key]: hex }));

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[380px_1fr]">
        {/* Controls */}
        <aside>
          <h1 className="text-2xl font-semibold tracking-tight">Theme generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick colors visually — no HSL maths. Copy the CSS when you&apos;re done.
          </p>

          {/* Brand presets */}
          <div className="mt-5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Brand preset
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setTokens((prev) => ({ ...prev, primary: p.primary, ring: p.ring }))}
                  className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:border-border-strong"
                >
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: p.primary }} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {GROUPS.map((group) => (
              <div key={group}>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {group}
                </div>
                <div className="space-y-1.5">
                  {TOKENS.filter((t) => t.group === group).map((t) => (
                    <ColorRow
                      key={t.key}
                      label={t.label}
                      value={tokens[t.key] ?? '#000000'}
                      onChange={(hex) => setToken(t.key, hex)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Radius */}
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Radius
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { label: 'None', v: 0 },
                  { label: 'S', v: 0.25 },
                  { label: 'M', v: 0.5 },
                  { label: 'L', v: 0.75 },
                  { label: 'XL', v: 1 },
                ].map((r) => (
                  <button
                    key={r.v}
                    onClick={() => setRadius(r.v)}
                    className={`flex flex-col items-center gap-1 rounded-md border px-2 py-2 text-[10px] font-medium transition-colors ${
                      radius === r.v ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                    }`}
                  >
                    <span className="h-5 w-5 border-2 border-fg" style={{ borderRadius: `${r.v}rem` }} />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => { setTokens(DEFAULTS); setRadius(0.5); }}>
                Reset
              </Button>
              <Button className="flex-1" onClick={copy}>
                {copied ? 'Copied!' : 'Copy CSS'}
              </Button>
            </div>
          </div>
        </aside>

        {/* Live preview */}
        <section style={cssVars} className="rounded-2xl border border-border bg-bg p-8 text-fg">
          <h2 className="text-lg font-semibold">Live preview</h2>
          <p className="text-sm text-muted-foreground">Every component reflects your colors instantly.</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Card.Root>
              <Card.Header>
                <Card.Title>Card title</Card.Title>
                <Card.Description>Card description text.</Card.Description>
              </Card.Header>
              <Card.Content>
                <Input placeholder="Type something…" />
              </Card.Content>
            </Card.Root>
            <div className="space-y-3">
              <Alert.Root>
                <Alert.Title>Heads up</Alert.Title>
                <Alert.Description>Tokens flow through every component.</Alert.Description>
              </Alert.Root>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Label>Focus ring</Label>
                <Input placeholder="Click to focus" className="w-40" />
              </div>
            </div>
          </div>

          <details className="mt-6 rounded-lg border border-border bg-muted/30 p-3 text-sm" open>
            <summary className="cursor-pointer font-medium">CSS output</summary>
            <pre className="mt-2 overflow-auto text-xs leading-relaxed">{cssOutput}</pre>
          </details>
        </section>
      </div>
    </div>
  );
}

/* ── A single color control: swatch picker + hex field ──────────────── */

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card px-2.5 py-1.5">
      <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border">
        <span className="block h-full w-full" style={{ background: value }} />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
      </label>
      <span className="flex-1 text-sm">{label}</span>
      <input
        value={value.toUpperCase()}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
        }}
        className="w-[78px] rounded bg-muted/60 px-1.5 py-1 text-right font-mono text-xs uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        spellCheck={false}
      />
    </div>
  );
}
