'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { useTheme } from '@structyl/themes';
import {
  ArrowUpRight, Sun, Moon, Copy, Check,
  Layers, Palette, Table2, Zap, Shield, Code2,
  ChevronRight, ChevronDown, ChevronUp,
  Accessibility, Package, Database,
} from '@structyl/icons';
import { Box, Button, Switch, Input, Select, Typography } from '@structyl/styled';
import { GITHUB_URL } from '../lib/site-config';
import { ThemePresetPicker, COLOR_PRESETS, applyColorPreset, clearColorPreset, type PresetId } from '../components/theme-preset-picker';
import { CodeBlock } from '../components/code-block';

/* ── useInView ─────────────────────────────────────────────────────────────── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <Box
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </Box>
  );
}

/* ── CopyButton ────────────────────────────────────────────────────────────── */
function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label="Copy to clipboard"
      className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors hover:bg-white/10 ${className}`}
    >
      {copied
        ? <><Check className="h-3.5 w-3.5 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
        : <><Copy className="h-3.5 w-3.5" /><span>Copy</span></>}
    </Button>
  );
}


/* ── ComponentPreview ──────────────────────────────────────────────────────── */
type Tab = 'components' | 'datatable' | 'theming';

const ACCENT_THEMES = [
  { name: 'Teal',   from: '#4DF6C9', to: '#23C7D6', alpha: 'rgba(77,246,201,0.15)',   border: 'rgba(77,246,201,0.35)'   },
  { name: 'Indigo', from: '#818cf8', to: '#4f46e5', alpha: 'rgba(110,139,255,0.15)',  border: 'rgba(110,139,255,0.35)'  },
  { name: 'Violet', from: '#c084fc', to: '#7c3aed', alpha: 'rgba(192,132,252,0.15)',  border: 'rgba(192,132,252,0.35)'  },
  { name: 'Rose',   from: '#fb7185', to: '#e11d48', alpha: 'rgba(251,113,133,0.15)',  border: 'rgba(251,113,133,0.35)'  },
];

const TABLE_ROWS = [
  { name: 'Sarah Kim',    role: 'Designer',  status: 'Active',   score: 98 },
  { name: 'Alex Carter',  role: 'Engineer',  status: 'Active',   score: 94 },
  { name: 'Morgan Lee',   role: 'PM',        status: 'Away',     score: 87 },
  { name: 'Jordan Park',  role: 'Engineer',  status: 'Inactive', score: 72 },
  { name: 'Taylor Wong',  role: 'Designer',  status: 'Active',   score: 91 },
];

function ComponentPreview() {
  const [tab, setTab]       = useState<Tab>('components');
  const [themeIdx, setThemeIdx] = useState(0);
  const [sortDir, setSortDir]   = useState<'desc' | 'asc'>('desc');
  const [switchOn, setSwitchOn] = useState(true);
  const [framework, setFramework] = useState('');
  const accent  = ACCENT_THEMES[themeIdx] ?? ACCENT_THEMES[0]!;
  const sorted  = [...TABLE_ROWS].sort((a, b) => sortDir === 'desc' ? b.score - a.score : a.score - b.score);
  const tabs: { id: Tab; label: string }[] = [
    { id: 'components', label: 'Components' },
    { id: 'datatable',  label: 'DataTable'  },
    { id: 'theming',    label: 'Theming'    },
  ];

  return (
    <Box className="overflow-hidden rounded-2xl border border-border/60 bg-bg shadow-2xl shadow-black/20 ring-1 ring-white/5">
      {/* window chrome */}
      <Box className="flex items-center gap-3 border-b border-border/50 bg-muted/40 px-4 py-3">
        <Box className="flex gap-1.5">
          <Box className="size-[11px] rounded-full bg-red-500/70" />
          <Box className="size-[11px] rounded-full bg-yellow-500/70" />
          <Box className="size-[11px] rounded-full bg-emerald-500/70" />
        </Box>
        <Box className="flex flex-1 items-center justify-center gap-0.5">
          {tabs.map(t => (
            <Button
              variant="ghost"
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3 py-1 text-[12px] font-medium transition-all ${
                tab === t.id
                  ? 'bg-bg text-fg shadow-sm'
                  : 'text-muted-foreground hover:text-fg'
              }`}
            >
              {t.label}
            </Button>
          ))}
        </Box>
        <Box className="w-20" />
      </Box>

      {/* body */}
      <Box className="min-h-[320px] p-5">

        {/* ── Components tab ─────────────────────────────────── */}
        {tab === 'components' && (
          <Box className="flex flex-col gap-5">
            <Box>
              <Typography as="p" variant="body2" className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Buttons</Typography>
              <Box className="flex flex-wrap gap-2">
                <Button size="sm">Default</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="outline">Outline</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
                <Button size="sm" variant="destructive">Destructive</Button>
              </Box>
            </Box>
            <Box>
              <Typography as="p" variant="body2" className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Badges</Typography>
              <Box className="flex flex-wrap gap-2">
                {[
                  ['Default',     'bg-primary/10 text-primary border-primary/20'],
                  ['Success',     'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'],
                  ['Warning',     'bg-amber-500/10 text-amber-600 border-amber-500/20'],
                  ['Destructive', 'bg-red-500/10 text-red-500 border-red-500/20'],
                  ['Info',        'bg-blue-500/10 text-blue-500 border-blue-500/20'],
                ].map(([label, cls]) => (
                  <span key={label} className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${cls}`}>
                    {label}
                  </span>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography as="p" variant="body2" className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Inputs & controls</Typography>
              <Box className="flex items-center gap-3">
                <Input
                  size="sm"
                  placeholder="Search components…"
                  className="flex-1"
                />
                <Switch
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                  aria-label="Toggle setting"
                />
                <Select.Root value={framework} onValueChange={setFramework}>
                  <Select.Trigger className="h-8 w-[130px] text-sm">
                    <Select.Value placeholder="Select…" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="react">React</Select.Item>
                    <Select.Item value="vue">Vue</Select.Item>
                    <Select.Item value="svelte">Svelte</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>
            </Box>
          </Box>
        )}

        {/* ── DataTable tab ──────────────────────────────────── */}
        {tab === 'datatable' && (
          <Box className="flex flex-col gap-3">
            <Box className="flex items-center gap-2">
              <Input
                size="sm"
                placeholder="Filter…"
                readOnly
                className="h-7 w-36 rounded-lg border border-border/70 bg-muted/30 px-2.5 text-xs outline-none placeholder:text-muted-foreground/60"
              />
              {['Role', 'Status'].map(f => (
                <span key={f} className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/20 px-2 py-1 text-[11px] text-muted-foreground">
                  {f} <ChevronDown className="h-3 w-3" />
                </span>
              ))}
              <span className="ml-auto text-[11px] text-muted-foreground">5 rows</span>
            </Box>

            <Box className="overflow-hidden rounded-lg border border-border/60">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/30">
                    <th className="px-3 py-2.5 text-left font-semibold text-muted-foreground">Name</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-muted-foreground">Role</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-muted-foreground">Status</th>
                    <th
                      className="cursor-pointer px-3 py-2.5 text-right font-semibold text-muted-foreground hover:text-fg"
                      onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
                    >
                      <span className="inline-flex items-center justify-end gap-0.5">
                        Score {sortDir === 'desc' ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {sorted.map(row => (
                    <tr key={row.name} className="transition-colors hover:bg-muted/20">
                      <td className="px-3 py-2 font-medium">{row.name}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.role}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          row.status === 'Active'   ? 'bg-emerald-500/10 text-emerald-500' :
                          row.status === 'Away'     ? 'bg-amber-500/10 text-amber-600' :
                                                     'bg-muted text-muted-foreground'
                        }`}>
                          <span className={`size-1.5 rounded-full ${
                            row.status === 'Active' ? 'bg-emerald-500' :
                            row.status === 'Away'   ? 'bg-amber-500' :
                                                     'bg-muted-foreground'
                          }`} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-medium">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            <Box className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Showing 1–5 of 5 results</span>
              <Box className="flex gap-1">
                {[1, 2, 3].map(p => (
                  <Button variant="ghost" key={p} className={`flex h-6 min-w-6 items-center justify-center rounded px-1.5 text-[11px] ${p === 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/60'}`}>
                    {p}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* ── Theming tab ────────────────────────────────────── */}
        {tab === 'theming' && (
          <Box className="flex flex-col gap-5">
            <Box>
              <Typography as="p" variant="body2" className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Runtime accent — click to switch</Typography>
              <Box className="flex flex-wrap gap-2">
                {ACCENT_THEMES.map((c, i) => (
                  <Button
                    variant="ghost"
                    key={c.name}
                    onClick={() => setThemeIdx(i)}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                    style={{
                      background: c.alpha,
                      borderColor: c.border,
                      color: c.from,
                      transform: themeIdx === i ? 'scale(1.06)' : undefined,
                      boxShadow: themeIdx === i ? `0 0 12px ${c.alpha}` : undefined,
                    }}
                  >
                    <span className="size-2.5 rounded-full" style={{ background: `linear-gradient(135deg,${c.from},${c.to})` }} />
                    {c.name}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box
              className="overflow-hidden rounded-xl border p-5 transition-all duration-500"
              style={{ borderColor: accent.border, background: accent.alpha }}
            >
              <Box className="mb-4 flex items-center justify-between">
                <Box>
                  <Typography as="p" variant="body2" className="text-sm font-semibold" style={{ color: accent.from }}>Analytics overview</Typography>
                  <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">Updated 2 min ago</Typography>
                </Box>
                <Button
                  variant="ghost"
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg,${accent.from},${accent.to})` }}
                >
                  Export CSV
                </Button>
              </Box>
              <Box className="grid grid-cols-3 gap-3">
                {[['Revenue', '$48.2k', '+12%'], ['Users', '9,834', '+8%'], ['Sessions', '24.1k', '+23%']].map(([label, val, ch]) => (
                  <Box key={label} className="rounded-lg bg-bg/60 p-3">
                    <Typography as="p" variant="body2" className="text-[10px] text-muted-foreground">{label}</Typography>
                    <Typography as="p" variant="body2" className="mt-0.5 text-base font-bold">{val}</Typography>
                    <Typography as="p" variant="body2" className="text-[10px] font-medium" style={{ color: accent.from }}>{ch}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ── ThemePresetsSection ───────────────────────────────────────────────────── */
function ThemePresetsSection() {
  const [activeId, setActiveId] = useState<PresetId | null>(null);

  // Hydrate from storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('structyl-color-preset') as PresetId | null;
      if (stored && COLOR_PRESETS.some(p => p.id === stored)) setActiveId(stored);
    } catch { /* ignore */ }
  }, []);

  const select = (id: PresetId, hex: string) => {
    setActiveId(id);
    applyColorPreset(hex);
    try { localStorage.setItem('structyl-color-preset', id); } catch { /* ignore */ }
  };

  const reset = () => {
    setActiveId(null);
    clearColorPreset();
    try { localStorage.removeItem('structyl-color-preset'); } catch { /* ignore */ }
  };

  return (
    <section className="py-28">
      <Box className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-14 text-center">
          <Typography as="p" variant="body2" className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Runtime theming</Typography>
          <Typography as="h2" variant="h2" className="text-4xl font-bold tracking-tight">10 accent presets. Instant switching.</Typography>
          <Typography as="p" variant="body2" className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Click any preset — the entire page updates live with no reload and no flash of unstyled content.
            Your choice is remembered across pages.
          </Typography>
        </FadeIn>

        <FadeIn>
          <Box className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-8">
            <Box className="grid grid-cols-5 gap-4 sm:grid-cols-10">
              {COLOR_PRESETS.map(({ id, name, hex }) => {
                const isActive = activeId === id;
                return (
                  <Button
                    variant="ghost"
                    key={id}
                    onClick={() => select(id, hex)}
                    title={name}
                    className="group flex h-auto flex-col items-center gap-2 rounded-xl p-2 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className="flex size-10 items-center justify-center rounded-full transition-all duration-200"
                      style={{
                        background: hex,
                        boxShadow: isActive ? `0 0 0 3px white, 0 0 0 5px ${hex}` : '0 2px 8px rgba(0,0,0,0.15)',
                        transform:  isActive ? 'scale(1.15)' : undefined,
                      }}
                    >
                      {isActive && <Check className="h-4 w-4 text-white drop-shadow-sm" />}
                    </span>
                    <span className={`text-[11px] font-medium transition-colors ${isActive ? 'text-fg' : 'text-muted-foreground group-hover:text-fg'}`}>
                      {name}
                    </span>
                  </Button>
                );
              })}
            </Box>

            {activeId && (
              <Box className="mt-6 flex items-center justify-center gap-3 border-t border-border/40 pt-6">
                <span className="text-sm text-muted-foreground">
                  Accent: <span className="font-semibold text-fg">{COLOR_PRESETS.find(p => p.id === activeId)?.name}</span>
                </span>
                <Button
                  variant="ghost"
                  onClick={reset}
                  className="rounded-lg border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-fg"
                >
                  Reset to default
                </Button>
              </Box>
            )}
          </Box>
        </FadeIn>

        <FadeIn className="mt-10 flex flex-col items-center gap-4 text-center">
          <Typography as="p" variant="body2" className="text-sm text-muted-foreground">
            Build a fully custom theme — colors, radius, shadows, fonts — in the playground.
          </Typography>
          <Button variant="outline" size="lg" asChild>
            <Link href="/themes" className="inline-flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Open Theme Playground
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </Box>
    </section>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────────────── */
export default function Page() {
  const { resolvedMode, setMode } = useTheme();
  const isDark = resolvedMode === 'dark';

  return (
    <Box className="min-h-screen bg-bg text-fg">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-bg/80 backdrop-blur-md">
        <Box className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg"       alt="structyl" className="hidden h-7 w-auto dark:block" />
            <img src="/logo-light.svg" alt="structyl" className="block  h-7 w-auto dark:hidden" />
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/docs" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-fg">
              Docs
            </Link>
            <Link href="/themes" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-fg">
              Themes
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-fg"
            >
              GitHub <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <ThemePresetPicker />
            <Button
              variant="ghost"
              onClick={() => setMode(isDark ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-fg"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
        </Box>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-24">
        {/* ambient glows */}
        <Box
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(77,246,201,0.10) 0%, transparent 75%)' }}
        />
        <Box
          aria-hidden
          className="pointer-events-none absolute left-1/4 top-32 h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'rgba(110,139,255,0.07)' }}
        />

        <Box className="relative mx-auto max-w-4xl px-6 text-center">
          {/* badge */}
          <Box className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            v1.1.0 — Stable release
          </Box>

          {/* headline */}
          <Typography as="h1" variant="h1" className="animate-fade-up delay-100 text-balance text-5xl font-bold tracking-tight md:text-7xl">
            The React UI library
            <br />
            with{' '}
            <span className="animate-shimmer bg-gradient-to-r from-[#4DF6C9] via-[#6E8BFF] to-[#A973FF] bg-clip-text text-transparent">
              structure.
            </span>
          </Typography>

          {/* subtext */}
          <Typography as="p" variant="body2" className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            90+ accessible components. Tailwind-styled. Runtime theming with no FOUC.
            A first-class DataTable that Radix deliberately omits.
          </Typography>

          {/* CTAs */}
          <Box className="animate-fade-up delay-300 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/docs/getting-started">
                Get started <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Box>

          {/* install */}
          <Box className="animate-fade-up delay-400 mx-auto mt-6 flex w-fit items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-4 py-2.5 font-mono text-sm text-muted-foreground">
            <span className="text-muted-foreground/50">$</span>
            <span className="text-fg">pnpm add</span>
            <span>@structyl/styled @structyl/themes</span>
            <CopyButton text="pnpm add @structyl/styled @structyl/themes" />
          </Box>
        </Box>

        {/* interactive preview */}
        <Box className="animate-fade-up delay-500 mx-auto mt-16 max-w-4xl px-6">
          <ComponentPreview />
        </Box>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="border-y border-border/50 bg-muted/20">
        <Box className="mx-auto max-w-6xl">
          <Box className="grid grid-cols-2 divide-x divide-y divide-border/50 md:grid-cols-5 md:divide-y-0">
            {[
              { value: '90+',   label: 'Components'   },
              { value: '9',     label: 'Packages'     },
              { value: '100%',  label: 'TypeScript'   },
              { value: 'WAI-ARIA', label: 'Accessible' },
              { value: 'MIT',   label: 'License'      },
            ].map(({ value, label }) => (
              <Box key={label} className="flex flex-col items-center justify-center py-6 text-center">
                <span className="text-2xl font-bold tracking-tight">{value}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{label}</span>
              </Box>
            ))}
          </Box>
        </Box>
      </section>

      {/* ── Feature pillars ──────────────────────────────────────────────── */}
      <section className="py-28">
        <Box className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <Typography as="p" variant="body2" className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Why structyl</Typography>
            <Typography as="h2" variant="h2" className="text-4xl font-bold tracking-tight">Everything you need. Nothing you don&apos;t.</Typography>
            <Typography as="p" variant="body2" className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Four layers working together so you spend time building products, not configuring UI infrastructure.
            </Typography>
          </FadeIn>

          <Box className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Layers,
                color: 'text-[#4DF6C9]',
                glow:  'rgba(77,246,201,0.10)',
                title: 'Headless Primitives',
                body:  'WAI-ARIA compliant behavior with zero styling. Every keyboard interaction, ARIA role, and focus management pattern follows the official spec. Bring your own styles, get accessibility for free.',
                pill: 'WAI-ARIA APG',
              },
              {
                icon: Palette,
                color: 'text-[#6E8BFF]',
                glow:  'rgba(110,139,255,0.10)',
                title: 'Tailwind Styled',
                body:  'A full-coverage styled layer built on top of the headless primitives. Variant-driven with tailwind-variants. Ships as a real package — not a copy-paste collection.',
                pill: 'tailwind-variants',
              },
              {
                icon: Zap,
                color: 'text-[#A973FF]',
                glow:  'rgba(169,115,255,0.10)',
                title: 'Runtime Theming',
                body:  'Switch themes at runtime without a page reload. CSS variables, ThemeProvider, zero FOUC. Build multi-brand apps, user-customizable UIs, or simple dark mode — all in one system.',
                pill: 'No FOUC',
              },
              {
                icon: Table2,
                color: 'text-[#fb7185]',
                glow:  'rgba(251,113,133,0.10)',
                title: 'First-class DataTable',
                body:  'The feature every app needs and every headless library skips. Built on @tanstack/table-core with sorting, filtering, virtualization, server-side pagination, row selection, and column resizing.',
                pill: '@tanstack/table',
              },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 80}>
                <Box
                  className="group relative h-full rounded-2xl border border-border/60 p-8 transition-all duration-300 hover:border-border"
                  style={{ background: `radial-gradient(circle at top left, ${f.glow}, transparent 60%)` }}
                >
                  <Box className="mb-5 flex items-center gap-3">
                    <Box className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-bg shadow-sm">
                      <f.icon className={`h-5 w-5 ${f.color}`} />
                    </Box>
                    <span className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {f.pill}
                    </span>
                  </Box>
                  <Typography as="h3" variant="h3" className="mb-2 text-lg font-semibold">{f.title}</Typography>
                  <Typography as="p" variant="body2" className="text-sm leading-relaxed text-muted-foreground">{f.body}</Typography>
                  <Link
                    href="/docs/getting-started"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-fg"
                  >
                    Learn more <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Box>
      </section>

      {/* ── Comparison ───────────────────────────────────────────────────── */}
      <section className="border-y border-border/50 bg-muted/20 py-28">
        <Box className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-12 text-center">
            <Typography as="p" variant="body2" className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">How it compares</Typography>
            <Typography as="h2" variant="h2" className="text-4xl font-bold tracking-tight">The gaps other libraries leave open.</Typography>
          </FadeIn>

          <FadeIn>
            <Box className="overflow-hidden rounded-2xl border border-border/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40">
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    {['structyl', 'Radix UI', 'shadcn/ui', 'MUI'].map(lib => (
                      <th key={lib} className={`px-6 py-4 text-center font-semibold ${lib === 'structyl' ? 'text-[#4DF6C9]' : ''}`}>
                        {lib}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {[
                    ['Headless primitives',   true,  true,  false, false],
                    ['Tailwind styled layer', true,  false, true,  false],
                    ['Runtime theming',       true,  false, false, true ],
                    ['Built-in DataTable',    true,  false, false, true ],
                    ['TypeScript first',      true,  true,  true,  true ],
                    ['Real npm package',      true,  true,  false, true ],
                    ['WAI-ARIA compliant',    true,  true,  true,  false],
                  ].map(([feature, ...vals]) => (
                    <tr key={feature as string} className="transition-colors hover:bg-muted/20">
                      <td className="px-6 py-3.5 text-muted-foreground">{feature as string}</td>
                      {(vals as boolean[]).map((v, i) => (
                        <td key={i} className="px-6 py-3.5 text-center">
                          {v
                            ? <Check className={`mx-auto h-4 w-4 ${i === 0 ? 'text-[#4DF6C9]' : 'text-emerald-500'}`} />
                            : <span className="mx-auto block h-0.5 w-4 rounded bg-border/60" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </FadeIn>
        </Box>
      </section>

      {/* ── Theme presets ────────────────────────────────────────────────── */}
      <ThemePresetsSection />

      {/* ── Getting started ──────────────────────────────────────────────── */}
      <section className="py-28">
        <Box className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <Typography as="p" variant="body2" className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Get started</Typography>
            <Typography as="h2" variant="h2" className="text-4xl font-bold tracking-tight">Up and running in minutes.</Typography>
          </FadeIn>

          <Box className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Install packages',
                lang: 'bash',
                code: 'pnpm add @structyl/styled\npnpm add @structyl/themes',
              },
              {
                step: '02',
                title: 'Wrap with ThemeProvider',
                lang: 'tsx',
                code: `import { ThemeProvider } from '@structyl/themes';\n\nexport default function Layout({ children }) {\n  return (\n    <ThemeProvider defaultTheme="slate">\n      {children}\n    </ThemeProvider>\n  );\n}`,
              },
              {
                step: '03',
                title: 'Use components',
                lang: 'tsx',
                code: `import { Button } from '@structyl/styled';\n\nexport default function Page() {\n  return (\n    <Button variant="outline">\n      Hello, structyl\n    </Button>\n  );\n}`,
              },
            ].map(({ step, title, lang, code }) => (
              <FadeIn key={step}>
                <Box className="h-full overflow-hidden rounded-2xl border border-border/60">
                  <Box className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2.5">
                    <span className="font-mono text-xs font-bold text-muted-foreground/50">{step}</span>
                    <span className="text-sm font-medium">{title}</span>
                  </Box>
                  <CodeBlock code={code} lang={lang} rounded="none" className="border-0" />
                </Box>
              </FadeIn>
            ))}
          </Box>

          <FadeIn className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/docs/getting-started">
                Read the full guide <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </Box>
      </section>

      {/* ── Packages ─────────────────────────────────────────────────────── */}
      <section className="border-t border-border/50 bg-muted/20 py-28">
        <Box className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <Typography as="p" variant="body2" className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Architecture</Typography>
            <Typography as="h2" variant="h2" className="text-4xl font-bold tracking-tight">Nine focused, tree-shakeable packages.</Typography>
            <Typography as="p" variant="body2" className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Install only what you use. Each package is independently versioned, fully typed, and ships both ESM and CJS.
            </Typography>
          </FadeIn>

          <Box className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: '@structyl/primitives', desc: 'Headless WAI-ARIA primitives',             icon: Accessibility, color: 'text-[#4DF6C9]', glow: 'rgba(77,246,201,0.08)'   },
              { name: '@structyl/styled',     desc: 'Tailwind-styled component layer',          icon: Layers,        color: 'text-[#6E8BFF]', glow: 'rgba(110,139,255,0.08)' },
              { name: '@structyl/themes',     desc: 'ThemeProvider + runtime token system',     icon: Palette,       color: 'text-[#A973FF]', glow: 'rgba(169,115,255,0.08)' },
              { name: '@structyl/data-table', desc: 'Feature-complete DataTable component',     icon: Table2,        color: 'text-[#fb7185]', glow: 'rgba(251,113,133,0.08)' },
              { name: '@structyl/hooks',      desc: '24 SSR-safe, tree-shakeable hooks',        icon: Zap,           color: 'text-amber-400',  glow: 'rgba(251,191,36,0.08)'  },
              { name: '@structyl/icons',      desc: 'Lucide icon set, typed and consistent',    icon: Shield,        color: 'text-[#4DF6C9]', glow: 'rgba(77,246,201,0.08)'  },
              { name: '@structyl/utils',      desc: 'cn(), type guards, and pure utilities',    icon: Code2,         color: 'text-[#6E8BFF]', glow: 'rgba(110,139,255,0.08)' },
              { name: '@structyl/core',       desc: 'Slot, Primitive, createContext helpers',   icon: Package,       color: 'text-[#A973FF]', glow: 'rgba(169,115,255,0.08)' },
              { name: '@structyl/cli',        desc: 'shadcn-style component installer',         icon: Database,      color: 'text-[#fb7185]', glow: 'rgba(251,113,133,0.08)' },
            ].map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 50}>
                <Box
                  className="group flex items-start gap-3 rounded-xl border border-border/60 p-4 transition-all duration-300 hover:border-border"
                  style={{ background: `radial-gradient(circle at top left, ${pkg.glow}, transparent 70%)` }}
                >
                  <Box className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-bg">
                    <pkg.icon className={`h-4 w-4 ${pkg.color}`} />
                  </Box>
                  <Box className="min-w-0">
                    <Typography as="p" variant="body2" className="truncate font-mono text-xs font-semibold">{pkg.name}</Typography>
                    <Typography as="p" variant="body2" className="mt-0.5 text-xs text-muted-foreground">{pkg.desc}</Typography>
                  </Box>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Box>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 text-center">
        <Box
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(77,246,201,0.07) 0%, transparent 70%)' }}
        />
        <FadeIn className="relative mx-auto max-w-2xl px-6">
          <Typography as="h2" variant="h2" className="text-4xl font-bold tracking-tight md:text-5xl">Start building today.</Typography>
          <Typography as="p" variant="body2" className="mt-4 text-lg text-muted-foreground">
            Free, open-source, MIT licensed. No hidden costs, no vendor lock-in.
          </Typography>
          <Box className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/docs/getting-started">
                Get started <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">Browse components</Link>
            </Button>
          </Box>
        </FadeIn>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/50">
        <Box className="mx-auto max-w-6xl px-6 py-10">
          <Box className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <Box className="flex items-center gap-3">
              <img src="/logo.svg"       alt="structyl" className="hidden h-6 w-auto dark:block" />
              <img src="/logo-light.svg" alt="structyl" className="block  h-6 w-auto dark:hidden" />
              <span className="text-xs text-muted-foreground">MIT © 2025 structyl contributors</span>
            </Box>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <Link href="/docs" className="transition-colors hover:text-fg">Docs</Link>
              <Link href="/docs/getting-started" className="transition-colors hover:text-fg">Getting started</Link>
              <Link href="/themes" className="transition-colors hover:text-fg">Themes</Link>
              <Link href="/docs/changelog" className="transition-colors hover:text-fg">Changelog</Link>
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-fg">
                GitHub <ArrowUpRight className="h-3 w-3" />
              </Link>
            </nav>
          </Box>
        </Box>
      </footer>
    </Box>
  );
}
