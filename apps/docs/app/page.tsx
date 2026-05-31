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
import { Button } from '@structyl/styled';
import { GITHUB_URL } from '../lib/site-config';
import { ThemePresetPicker, COLOR_PRESETS, applyColorPreset, clearColorPreset, type PresetId } from '../components/theme-preset-picker';

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
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ── CopyButton ────────────────────────────────────────────────────────────── */
function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
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
    </button>
  );
}

/* ── MockSwitch ────────────────────────────────────────────────────────────── */
function MockSwitch({ defaultOn = true }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn(v => !v)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${on ? 'bg-primary' : 'bg-muted-foreground/30'}`}
    >
      <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
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
  const accent  = ACCENT_THEMES[themeIdx] ?? ACCENT_THEMES[0]!;
  const sorted  = [...TABLE_ROWS].sort((a, b) => sortDir === 'desc' ? b.score - a.score : a.score - b.score);
  const tabs: { id: Tab; label: string }[] = [
    { id: 'components', label: 'Components' },
    { id: 'datatable',  label: 'DataTable'  },
    { id: 'theming',    label: 'Theming'    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-bg shadow-2xl shadow-black/20 ring-1 ring-white/5">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-border/50 bg-muted/40 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="size-[11px] rounded-full bg-red-500/70" />
          <div className="size-[11px] rounded-full bg-yellow-500/70" />
          <div className="size-[11px] rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-0.5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3 py-1 text-[12px] font-medium transition-all ${
                tab === t.id
                  ? 'bg-bg text-fg shadow-sm'
                  : 'text-muted-foreground hover:text-fg'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="w-20" />
      </div>

      {/* body */}
      <div className="min-h-[320px] p-5">

        {/* ── Components tab ─────────────────────────────────── */}
        {tab === 'components' && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Default</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="outline">Outline</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
                <Button size="sm" variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Badges</p>
              <div className="flex flex-wrap gap-2">
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
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Inputs & controls</p>
              <div className="flex items-center gap-3">
                <input
                  placeholder="Search components…"
                  readOnly
                  className="h-8 flex-1 rounded-lg border border-border/70 bg-muted/30 px-3 text-sm outline-none placeholder:text-muted-foreground/60"
                />
                <MockSwitch />
                <div className="flex h-8 items-center gap-1 rounded-lg border border-border/70 bg-muted/30 px-3 text-sm text-muted-foreground">
                  Select… <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DataTable tab ──────────────────────────────────── */}
        {tab === 'datatable' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
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
            </div>

            <div className="overflow-hidden rounded-lg border border-border/60">
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
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Showing 1–5 of 5 results</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(p => (
                  <button key={p} className={`flex h-6 min-w-6 items-center justify-center rounded px-1.5 text-[11px] ${p === 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/60'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Theming tab ────────────────────────────────────── */}
        {tab === 'theming' && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Runtime accent — click to switch</p>
              <div className="flex flex-wrap gap-2">
                {ACCENT_THEMES.map((c, i) => (
                  <button
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
                  </button>
                ))}
              </div>
            </div>
            <div
              className="overflow-hidden rounded-xl border p-5 transition-all duration-500"
              style={{ borderColor: accent.border, background: accent.alpha }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: accent.from }}>Analytics overview</p>
                  <p className="text-[11px] text-muted-foreground">Updated 2 min ago</p>
                </div>
                <button
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg,${accent.from},${accent.to})` }}
                >
                  Export CSV
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[['Revenue', '$48.2k', '+12%'], ['Users', '9,834', '+8%'], ['Sessions', '24.1k', '+23%']].map(([label, val, ch]) => (
                  <div key={label} className="rounded-lg bg-bg/60 p-3">
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                    <p className="mt-0.5 text-base font-bold">{val}</p>
                    <p className="text-[10px] font-medium" style={{ color: accent.from }}>{ch}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Runtime theming</p>
          <h2 className="text-4xl font-bold tracking-tight">10 accent presets. Instant switching.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Click any preset — the entire page updates live with no reload and no flash of unstyled content.
            Your choice is remembered across pages.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-8">
            <div className="grid grid-cols-5 gap-4 sm:grid-cols-10">
              {COLOR_PRESETS.map(({ id, name, hex }) => {
                const isActive = activeId === id;
                return (
                  <button
                    key={id}
                    onClick={() => select(id, hex)}
                    title={name}
                    className="group flex flex-col items-center gap-2 rounded-xl p-2 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  </button>
                );
              })}
            </div>

            {activeId && (
              <div className="mt-6 flex items-center justify-center gap-3 border-t border-border/40 pt-6">
                <span className="text-sm text-muted-foreground">
                  Accent: <span className="font-semibold text-fg">{COLOR_PRESETS.find(p => p.id === activeId)?.name}</span>
                </span>
                <button
                  onClick={reset}
                  className="rounded-lg border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-fg"
                >
                  Reset to default
                </button>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Build a fully custom theme — colors, radius, shadows, fonts — in the playground.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/themes" className="inline-flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Open Theme Playground
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────────────── */
export default function Page() {
  const { resolvedMode, setMode } = useTheme();
  const isDark = resolvedMode === 'dark';

  return (
    <div className="min-h-screen bg-bg text-fg">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
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
            <button
              onClick={() => setMode(isDark ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-fg"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-24">
        {/* ambient glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(77,246,201,0.10) 0%, transparent 75%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/4 top-32 h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'rgba(110,139,255,0.07)' }}
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* badge */}
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            v1.0.0 — Stable release
          </div>

          {/* headline */}
          <h1 className="animate-fade-up delay-100 text-balance text-5xl font-bold tracking-tight md:text-7xl">
            The React UI library
            <br />
            with an{' '}
            <span className="animate-shimmer bg-gradient-to-r from-[#4DF6C9] via-[#6E8BFF] to-[#A973FF] bg-clip-text text-transparent">
              structyl.
            </span>
          </h1>

          {/* subtext */}
          <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            90+ accessible components. Tailwind-styled. Runtime theming with no FOUC.
            A first-class DataTable that Radix deliberately omits.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 mt-8 flex flex-wrap items-center justify-center gap-3">
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
          </div>

          {/* install */}
          <div className="animate-fade-up delay-400 mx-auto mt-6 flex w-fit items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-4 py-2.5 font-mono text-sm text-muted-foreground">
            <span className="text-muted-foreground/50">$</span>
            <span className="text-fg">pnpm add</span>
            <span>@structyl/styled @structyl/themes</span>
            <CopyButton text="pnpm add @structyl/styled @structyl/themes" />
          </div>
        </div>

        {/* interactive preview */}
        <div className="animate-fade-up delay-500 mx-auto mt-16 max-w-4xl px-6">
          <ComponentPreview />
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/50 md:grid-cols-5 md:divide-y-0">
            {[
              { value: '90+',   label: 'Components'   },
              { value: '9',     label: 'Packages'     },
              { value: '100%',  label: 'TypeScript'   },
              { value: 'WAI-ARIA', label: 'Accessible' },
              { value: 'MIT',   label: 'License'      },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-6 text-center">
                <span className="text-2xl font-bold tracking-tight">{value}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature pillars ──────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Why structyl</p>
            <h2 className="text-4xl font-bold tracking-tight">Everything you need. Nothing you don&apos;t.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Four layers working together so you spend time building products, not configuring UI infrastructure.
            </p>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2">
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
                <div
                  className="group relative h-full rounded-2xl border border-border/60 p-8 transition-all duration-300 hover:border-border"
                  style={{ background: `radial-gradient(circle at top left, ${f.glow}, transparent 60%)` }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-bg shadow-sm">
                      <f.icon className={`h-5 w-5 ${f.color}`} />
                    </div>
                    <span className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {f.pill}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  <Link
                    href="/docs/getting-started"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-fg"
                  >
                    Learn more <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ───────────────────────────────────────────────────── */}
      <section className="border-y border-border/50 bg-muted/20 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">How it compares</p>
            <h2 className="text-4xl font-bold tracking-tight">The gaps other libraries leave open.</h2>
          </FadeIn>

          <FadeIn>
            <div className="overflow-hidden rounded-2xl border border-border/60">
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
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Theme presets ────────────────────────────────────────────────── */}
      <ThemePresetsSection />

      {/* ── Getting started ──────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Get started</p>
            <h2 className="text-4xl font-bold tracking-tight">Up and running in minutes.</h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
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
            ].map(({ step, title, code }) => (
              <FadeIn key={step}>
                <div className="h-full rounded-2xl border border-border/60 bg-muted/20 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-muted-foreground/50">{step}</span>
                      <span className="text-sm font-medium">{title}</span>
                    </div>
                    <CopyButton text={code} className="text-muted-foreground" />
                  </div>
                  <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-muted-foreground">
                    <code>{code}</code>
                  </pre>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/docs/getting-started">
                Read the full guide <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────────────────── */}
      <section className="border-t border-border/50 bg-muted/20 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Architecture</p>
            <h2 className="text-4xl font-bold tracking-tight">Nine focused, tree-shakeable packages.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Install only what you use. Each package is independently versioned, fully typed, and ships both ESM and CJS.
            </p>
          </FadeIn>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                <div
                  className="group flex items-start gap-3 rounded-xl border border-border/60 p-4 transition-all duration-300 hover:border-border"
                  style={{ background: `radial-gradient(circle at top left, ${pkg.glow}, transparent 70%)` }}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-bg">
                    <pkg.icon className={`h-4 w-4 ${pkg.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-semibold">{pkg.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{pkg.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(77,246,201,0.07) 0%, transparent 70%)' }}
        />
        <FadeIn className="relative mx-auto max-w-2xl px-6">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Start building today.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Free, open-source, MIT licensed. No hidden costs, no vendor lock-in.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/docs/getting-started">
                Get started <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">Browse components</Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.svg"       alt="structyl" className="hidden h-6 w-auto dark:block" />
              <img src="/logo-light.svg" alt="structyl" className="block  h-6 w-auto dark:hidden" />
              <span className="text-xs text-muted-foreground">MIT © 2025 structyl contributors</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <Link href="/docs" className="transition-colors hover:text-fg">Docs</Link>
              <Link href="/docs/getting-started" className="transition-colors hover:text-fg">Getting started</Link>
              <Link href="/themes" className="transition-colors hover:text-fg">Themes</Link>
              <Link href="/docs/changelog" className="transition-colors hover:text-fg">Changelog</Link>
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-fg">
                GitHub <ArrowUpRight className="h-3 w-3" />
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
