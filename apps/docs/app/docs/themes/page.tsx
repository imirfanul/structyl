'use client';

import * as React from 'react';
import { ChevronRight, ArrowUpRight, Sun, Moon, Monitor } from '@structyl/icons';
import { useTheme } from '@structyl/themes';
import { Box, Button, Input, Typography } from '@structyl/styled';
import { CodeBlock } from '../../../components/code-block';

/* ── Shared primitives ───────────────────────────────────────────────────── */

function PreviewBlock({
  title,
  description,
  children,
  code,
  lang = 'tsx',
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  lang?: string;
}) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  return (
    <Box className="mt-4">
      {title && <Typography as="h4" variant="h4" className="mb-1 text-sm font-semibold">{title}</Typography>}
      {description && <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">{description}</Typography>}
      <Box className="flex items-center border-b border-border">
        {(['preview', 'code'] as const).map(t => (
          <Button key={t} variant="ghost" onClick={() => setTab(t)}
            className={`relative px-3 py-2 text-sm font-medium capitalize transition-colors ${tab === t ? 'text-fg' : 'text-muted-foreground hover:text-fg'}`}>
            {t}
            {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
          </Button>
        ))}
      </Box>
      {tab === 'preview' ? (
        <Box className="min-h-[160px] overflow-hidden rounded-b-xl border border-t-0 border-border bg-gradient-to-br from-accent/20 to-transparent p-8 flex items-center justify-center">
          {children}
        </Box>
      ) : (
        <CodeBlock code={code} lang={lang} rounded="bottom" />
      )}
    </Box>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <Typography as="h2" variant="h2" className="mb-4 text-2xl font-semibold tracking-tight">{title}</Typography>
      {children}
    </section>
  );
}

function SubSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Box id={id} className="mt-8 scroll-mt-24">
      <Typography as="h3" variant="h3" className="mb-3 text-lg font-semibold">{title}</Typography>
      {children}
    </Box>
  );
}

function Callout({ variant = 'info', children }: { variant?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: 'border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-400',
    warning: 'border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-400',
    tip: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400',
  };
  const labels = { info: 'NOTE', warning: 'WARNING', tip: 'TIP' };
  return (
    <Box className={`my-4 rounded-lg border px-4 py-3 text-sm ${styles[variant]}`}>
      <span className="font-bold mr-2">{labels[variant]}:</span>
      {children}
    </Box>
  );
}

function PropsTable({ rows }: { rows: { prop: string; type: string; default?: string; description: string }[] }) {
  return (
    <Box className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-medium">Prop</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Default</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.prop} className="border-t border-border/60 align-top">
              <td className="px-3 py-2 font-mono font-medium text-primary">{r.prop}</td>
              <td className="px-3 py-2"><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{r.type}</code></td>
              <td className="px-3 py-2 font-mono text-muted-foreground text-[11px]">{r.default ?? '—'}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

/* ── Theme preview with simulated token application ──────────────────────── */

type ThemeName = 'slate' | 'zinc' | 'rose' | 'structyl';
type ModeName = 'light' | 'dark';

const THEME_PALETTES: Record<ThemeName, Record<ModeName, {
  bg: string; fg: string; card: string; primary: string; primaryFg: string;
  muted: string; mutedFg: string; border: string; success: string; destructive: string; warning: string; accent: string;
}>> = {
  slate: {
    light: { bg: '#ffffff', fg: '#0f172a', card: '#ffffff', primary: '#0f172a', primaryFg: '#f8fafc', muted: '#f1f5f9', mutedFg: '#64748b', border: '#e2e8f0', success: '#22c55e', destructive: '#ef4444', warning: '#f59e0b', accent: '#f1f5f9' },
    dark:  { bg: '#050d1a', fg: '#f8fafc', card: '#0a1628', primary: '#f8fafc', primaryFg: '#0f172a', muted: '#1e2d45', mutedFg: '#94a3b8', border: '#1e2d45', success: '#4ade80', destructive: '#f87171', warning: '#fbbf24', accent: '#1e293b' },
  },
  zinc: {
    light: { bg: '#ffffff', fg: '#09090b', card: '#ffffff', primary: '#18181b', primaryFg: '#fafafa', muted: '#f4f4f5', mutedFg: '#71717a', border: '#e4e4e7', success: '#22c55e', destructive: '#ef4444', warning: '#f59e0b', accent: '#f4f4f5' },
    dark:  { bg: '#0e0e10', fg: '#fafafa', card: '#141418', primary: '#fafafa', primaryFg: '#18181b', muted: '#27272a', mutedFg: '#a1a1aa', border: '#27272a', success: '#4ade80', destructive: '#f87171', warning: '#fbbf24', accent: '#28282c' },
  },
  rose: {
    light: { bg: '#ffffff', fg: '#09090b', card: '#ffffff', primary: '#e11d48', primaryFg: '#fff1f2', muted: '#f4f4f5', mutedFg: '#71717a', border: '#e4e4e7', success: '#22c55e', destructive: '#ef4444', warning: '#f59e0b', accent: '#f4f4f5' },
    dark:  { bg: '#0d0a0b', fg: '#f2f2f2', card: '#180f10', primary: '#e11d48', primaryFg: '#fff1f2', muted: '#262020', mutedFg: '#a1a1aa', border: '#2d2323', success: '#4ade80', destructive: '#f87171', warning: '#fbbf24', accent: '#261e1e' },
  },
  structyl: {
    light: { bg: '#f9f9fb', fg: '#2c2f38', card: '#ffffff', primary: '#5b5fc7', primaryFg: '#ffffff', muted: '#f5f5f6', mutedFg: '#9e9e9e', border: '#e5e5e8', success: '#66bb6a', destructive: '#e05675', warning: '#ff6d2d', accent: '#ede9fd' },
    dark:  { bg: '#2c2f38', fg: '#ffffff', card: '#333744', primary: '#c3c4f5', primaryFg: '#3b2d8a', muted: '#3b3f4d', mutedFg: '#9ba8b5', border: '#525252', success: '#81c784', destructive: '#f48fb1', warning: '#cc9966', accent: '#383c4a' },
  },
};

const THEME_DESCRIPTIONS: Record<ThemeName, string> = {
  slate: 'Cool blue-slate — the default. Professional, clean, high contrast.',
  zinc: 'Pure neutral gray. Minimal and versatile for any brand color.',
  rose: 'Bold rose primary on a neutral base. Energetic and modern.',
  structyl: 'Full MUI-inspired palette with indigo primary and rich semantic tokens.',
};

/* ── Live demos ──────────────────────────────────────────────────────────── */

function ThemeSwitcherDemo() {
  const { theme, setTheme, resolvedMode, setMode } = useTheme();

  const themes: ThemeName[] = ['slate', 'zinc', 'rose', 'structyl'];
  const pal = THEME_PALETTES[theme as ThemeName]?.[resolvedMode] ?? THEME_PALETTES.slate.light;

  return (
    <Box className="w-full max-w-lg space-y-4 font-sans text-sm">
      {/* Controls */}
      <Box className="flex flex-wrap gap-3">
        <Box className="space-y-1">
          <Typography as="p" variant="body2" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Theme</Typography>
          <Box className="flex gap-1">
            {themes.map(t => (
              <Button key={t} variant="ghost" onClick={() => setTheme(t)}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-medium capitalize transition-colors ${theme === t ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted/60'}`}>
                {t}
              </Button>
            ))}
          </Box>
        </Box>
        <Box className="space-y-1">
          <Typography as="p" variant="body2" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Mode</Typography>
          <Box className="flex gap-1">
            {([['light', Sun], ['dark', Moon], ['system', Monitor]] as const).map(([m, Icon]) => (
              <Button key={m} variant="ghost" onClick={() => setMode(m as 'light' | 'dark' | 'system')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${resolvedMode === m || m === 'system' ? 'border border-border hover:bg-muted/60' : 'border border-border hover:bg-muted/60'}`}>
                <Icon className="h-3.5 w-3.5" /> {m}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Mini component preview */}
      <Box className="overflow-hidden rounded-xl border" style={{ borderColor: pal.border, background: pal.bg }}>
        {/* Card */}
        <Box className="p-4 space-y-3">
          <Box className="flex items-center justify-between">
            <Typography as="p" variant="body2" className="font-semibold" style={{ color: pal.fg }}>Team members</Typography>
            <Button variant="ghost" className="rounded-lg px-3 py-1 text-[12px] font-medium" style={{ background: pal.primary, color: pal.primaryFg }}>
              Invite
            </Button>
          </Box>

          {/* Table rows */}
          {([['Alice Chen', 'Engineer', 'active'], ['Bob Smith', 'Designer', 'away'], ['Carol Wu', 'Product', 'active']] as [string, string, string][]).map(([name, role, status]) => (
            <Box key={name} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: pal.muted }}>
              <Box className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: pal.primary, color: pal.primaryFg }}>
                {name[0]}
              </Box>
              <Box className="flex-1 min-w-0">
                <Typography as="p" variant="body2" className="text-[13px] font-medium" style={{ color: pal.fg }}>{name}</Typography>
                <Typography as="p" variant="body2" className="text-[11px]" style={{ color: pal.mutedFg }}>{role}</Typography>
              </Box>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{
                background: status === 'active' ? `${pal.success}22` : `${pal.warning}22`,
                color: status === 'active' ? pal.success : pal.warning,
              }}>
                {status}
              </span>
            </Box>
          ))}

          {/* Button row */}
          <Box className="flex gap-2 pt-1">
            <Button variant="ghost" className="rounded-lg px-3 py-1.5 text-[12px] font-medium" style={{ background: pal.primary, color: pal.primaryFg }}>Save</Button>
            <Button variant="ghost" className="rounded-lg border px-3 py-1.5 text-[12px] font-medium" style={{ borderColor: pal.border, color: pal.fg }}>Cancel</Button>
            <Button variant="ghost" className="rounded-lg px-3 py-1.5 text-[12px] font-medium ml-auto" style={{ background: `${pal.destructive}15`, color: pal.destructive }}>Delete</Button>
          </Box>
        </Box>
      </Box>

      <Typography as="p" variant="body2" className="text-center font-mono text-[10px] text-muted-foreground">
        Current: theme=&quot;{theme}&quot; resolvedMode=&quot;{resolvedMode}&quot;
      </Typography>
    </Box>
  );
}

function TokenPaletteDemo() {
  const { theme, resolvedMode } = useTheme();
  const pal = THEME_PALETTES[theme as ThemeName]?.[resolvedMode] ?? THEME_PALETTES.slate.light;

  const groups = [
    {
      label: 'Base',
      tokens: [
        { name: 'bg', value: pal.bg, cssVar: '--color-bg', tailwind: 'bg-bg' },
        { name: 'fg', value: pal.fg, cssVar: '--color-fg', tailwind: 'text-fg' },
        { name: 'card', value: pal.card, cssVar: '--color-card', tailwind: 'bg-card' },
        { name: 'muted', value: pal.muted, cssVar: '--color-muted', tailwind: 'bg-muted' },
        { name: 'accent', value: pal.accent, cssVar: '--color-accent', tailwind: 'bg-accent' },
      ],
    },
    {
      label: 'Brand',
      tokens: [
        { name: 'primary', value: pal.primary, cssVar: '--color-primary', tailwind: 'bg-primary' },
        { name: 'primary-fg', value: pal.primaryFg, cssVar: '--color-primary-fg', tailwind: 'text-primary-foreground' },
        { name: 'muted-fg', value: pal.mutedFg, cssVar: '--color-muted-fg', tailwind: 'text-muted-foreground' },
        { name: 'border', value: pal.border, cssVar: '--color-border', tailwind: 'border-border' },
      ],
    },
    {
      label: 'Semantic',
      tokens: [
        { name: 'success', value: pal.success, cssVar: '--color-success', tailwind: 'text-success' },
        { name: 'warning', value: pal.warning, cssVar: '--color-warning', tailwind: 'text-warning' },
        { name: 'destructive', value: pal.destructive, cssVar: '--color-destructive', tailwind: 'text-destructive' },
      ],
    },
  ];

  return (
    <Box className="w-full space-y-4 font-sans text-sm">
      {groups.map(g => (
        <Box key={g.label}>
          <Typography as="p" variant="body2" className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{g.label}</Typography>
          <Box className="grid gap-2 sm:grid-cols-2">
            {g.tokens.map(t => (
              <Box key={t.name} className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
                <Box className="h-8 w-8 shrink-0 rounded-md border border-border/60 shadow-sm" style={{ background: t.value }} />
                <Box className="min-w-0 flex-1">
                  <Typography as="p" variant="body2" className="font-mono text-[11px] font-medium">{t.name}</Typography>
                  <Typography as="p" variant="body2" className="font-mono text-[10px] text-muted-foreground">{t.cssVar}</Typography>
                </Box>
                <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{t.tailwind}</code>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function CustomThemeDemo() {
  const [primaryHex, setPrimaryHex] = React.useState('#7c3aed');
  const [name, setName] = React.useState('My Brand');
  const [radius, setRadius] = React.useState('0.5rem');

  function hexToHsl(hex: string) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const r = parseInt(h.slice(0,2),16)/255, g = parseInt(h.slice(2,4),16)/255, b = parseInt(h.slice(4,6),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let hue = 0, sat = 0;
    const lum = (max+min)/2;
    if (max !== min) {
      const d = max - min;
      sat = lum > 0.5 ? d/(2-max-min) : d/(max+min);
      if (max === r) hue = ((g-b)/d+(g<b?6:0))/6;
      else if (max === g) hue = ((b-r)/d+2)/6;
      else hue = ((r-g)/d+4)/6;
    }
    return `${Math.round(hue*360)} ${Math.round(sat*100)}% ${Math.round(lum*100)}%`;
  }

  const hsl = hexToHsl(primaryHex);
  const isDark = parseInt(primaryHex.slice(5,7),16) + parseInt(primaryHex.slice(3,5),16) + parseInt(primaryHex.slice(1,3),16) < 380;
  const fgHex = isDark ? '#ffffff' : '#0f172a';

  const themeCode = `import type { ThemeConfig } from '@structyl/themes';

const myTheme: ThemeConfig = {
  light: {
    bg: '0 0% 100%',
    fg: '222 47% 11%',
    card: '0 0% 100%',
    primary: '${hsl}',
    'primary-fg': '${isDark ? '0 0% 100%' : '222 47% 11%'}',
    'primary-hover': '${hsl.replace(/(\d+)%\s*$/, m => Math.min(100, parseInt(m)+10)+'%')}',
    muted: '210 40% 96%',
    'muted-fg': '215 16% 47%',
    accent: '210 40% 96%',
    border: '214 32% 91%',
    ring: '${hsl}',
    destructive: '0 84% 60%',
    success: '142 71% 45%',
    warning: '38 92% 50%',
    // ... other tokens inherit from slate
  },
  dark: {
    // dark mode overrides
    bg: '222 47% 6%',
    fg: '210 40% 98%',
    primary: '${hsl}',
    'primary-fg': '${isDark ? '0 0% 100%' : '222 47% 11%'}',
    // ...
  },
};`;

  return (
    <Box className="w-full space-y-4 font-sans text-sm">
      {/* Controls */}
      <Box className="flex flex-wrap gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Primary color</span>
          <Box className="flex items-center gap-2">
            <input type="color" value={primaryHex} onChange={e => setPrimaryHex(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-border bg-transparent p-0.5" />
            <code className="font-mono text-[12px]">{primaryHex}</code>
          </Box>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Brand name</span>
          <Input size="sm" value={name} onChange={e => setName(e.target.value)}
            className="h-8 rounded-md border border-border bg-muted/30 px-2 text-[12px] outline-none focus:border-ring/40 focus:ring-2 focus:ring-ring/20" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Border radius</span>
          <select value={radius} onChange={e => setRadius(e.target.value)}
            className="h-8 rounded-md border border-border bg-muted/30 px-2 text-[12px] outline-none">
            {['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem'].map(r => <option key={r}>{r}</option>)}
          </select>
        </label>
      </Box>

      {/* Mini preview */}
      <Box className="overflow-hidden rounded-xl border border-border bg-white">
        <Box className="border-b border-gray-100 px-4 py-2.5 flex items-center gap-2" style={{ background: primaryHex }}>
          <Box className="h-5 w-5 rounded font-bold text-[10px] flex items-center justify-center" style={{ background: fgHex+'22', color: fgHex }}>
            {name[0]?.toUpperCase()}
          </Box>
          <span className="text-[12px] font-semibold" style={{ color: fgHex }}>{name}</span>
        </Box>
        <Box className="p-4 space-y-3">
          <Box className="flex gap-2">
            <Button variant="ghost" className="px-3 py-1.5 text-[12px] font-medium" style={{ background: primaryHex, color: fgHex, borderRadius: radius }}>
              Primary
            </Button>
            <Button variant="ghost" className="px-3 py-1.5 text-[12px] font-medium border text-gray-700" style={{ borderColor: primaryHex, color: primaryHex, borderRadius: radius }}>
              Outlined
            </Button>
            <Button variant="ghost" className="px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:bg-gray-50" style={{ borderRadius: radius }}>
              Ghost
            </Button>
          </Box>
          <Box className="flex gap-1.5">
            {['Active', 'Pending', 'Error'].map((label, i) => (
              <span key={label} className="px-2 py-0.5 text-[10px] font-semibold rounded-full" style={{
                background: [primaryHex+'22', '#f59e0b22', '#ef444422'][i],
                color: [primaryHex, '#d97706', '#dc2626'][i],
              }}>
                {label}
              </span>
            ))}
          </Box>
          <Box className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
            <Box className="h-2 w-2 rounded-full" style={{ background: primaryHex }} />
            <span className="text-[11px] text-gray-600">Token: <code className="font-mono" style={{ color: primaryHex }}>--color-primary: {hsl}</code></span>
          </Box>
        </Box>
      </Box>

      {/* Generated code */}
      <CodeBlock lang="ts" code={themeCode} />
    </Box>
  );
}

function ModeToggleDemo() {
  const { resolvedMode, setMode } = useTheme();
  return (
    <Box className="flex flex-col items-center gap-4">
      <Box className="flex overflow-hidden rounded-xl border border-border">
        {([['light', Sun, 'Light'], ['dark', Moon, 'Dark'], ['system', Monitor, 'System']] as const).map(([m, Icon, label]) => (
          <Button key={m} variant="ghost" onClick={() => setMode(m)}
            className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors ${resolvedMode === m ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/60 text-muted-foreground'}`}>
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </Box>
      <Typography as="p" variant="body2" className="font-mono text-[11px] text-muted-foreground">
        resolvedMode = &quot;{resolvedMode}&quot;
      </Typography>
    </Box>
  );
}

/* ── TOC ─────────────────────────────────────────────────────────────────── */

const TOC = [
  { id: 'overview', title: 'Overview' },
  { id: 'setup', title: 'Setup' },
  { id: 'theme-switching', title: 'Theme switching' },
  { id: 'mode-switching', title: 'Dark / light mode' },
  { id: 'token-palette', title: 'Token palette' },
  { id: 'token-reference', title: 'Token reference' },
  { id: 'using-tailwind', title: '→ In Tailwind' },
  { id: 'using-css', title: '→ In CSS / JS' },
  { id: 'custom-themes', title: 'Custom themes' },
  { id: 'extend-theme', title: '→ Extending built-ins' },
  { id: 'runtime-switching', title: '→ Runtime multi-theme' },
  { id: 'ssr', title: 'SSR & flash prevention' },
  { id: 'storage', title: 'Persistence & storage' },
  { id: 'api-reference', title: 'API Reference' },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ThemesDocsPage() {
  const [activeId, setActiveId] = React.useState('overview');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { const vis = entries.find(e => e.isIntersecting); if (vis) setActiveId(vis.target.id); },
      { rootMargin: '-10% 0px -75% 0px' },
    );
    TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <Box className="flex gap-12">
      <article className="min-w-0 flex-1">

        {/* Header */}
        <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <span>Docs</span>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span>Theming</span>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span className="font-medium text-fg">@structyl/themes</span>
        </nav>

        <Box id="overview" className="scroll-mt-20">
          <Box className="flex flex-wrap items-center gap-3">
            <Typography as="h1" variant="h1" className="text-4xl font-semibold tracking-tight">Themes</Typography>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">stable</span>
          </Box>
          <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">
            Runtime theming via CSS custom properties. Switch themes and color modes with zero flash,
            full TypeScript support, SSR compatibility, and automatic localStorage persistence.
          </Typography>

          {/* How it works */}
          <Box className="mt-6 overflow-hidden rounded-xl border border-border">
            <Box className="border-b border-border bg-muted/30 px-4 py-2.5">
              <Typography as="p" variant="body2" className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">How it works</Typography>
            </Box>
            <Box className="grid gap-px bg-border sm:grid-cols-3">
              {[
                ['1. Tokens as CSS vars', 'ThemeProvider writes --color-* variables on <html> whenever theme or mode changes.'],
                ['2. Tailwind reads vars', 'The Tailwind preset maps every utility class (bg-primary, text-muted-foreground, etc.) to the corresponding CSS variable.'],
                ['3. Components stay static', 'Components use only Tailwind classes — they never need to know which theme is active.'],
              ].map(([title, desc]) => (
                <Box key={title} className="bg-card p-4">
                  <Typography as="p" variant="body2" className="text-[13px] font-semibold">{title}</Typography>
                  <Typography as="p" variant="body2" className="mt-1 text-[12px] text-muted-foreground">{desc}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Built-in themes */}
          <Box className="mt-6 grid gap-3 sm:grid-cols-2">
            {(Object.entries(THEME_DESCRIPTIONS) as [ThemeName, string][]).map(([t, desc]) => {
              const pal = THEME_PALETTES[t].light;
              return (
                <Box key={t} className="flex gap-3 rounded-xl border border-border p-4">
                  <Box className="flex shrink-0 gap-1.5">
                    {[pal.primary, pal.success, pal.destructive, pal.warning].map((c, i) => (
                      <Box key={i} className="h-8 w-8 rounded-lg" style={{ background: c }} />
                    ))}
                  </Box>
                  <Box>
                    <Typography as="p" variant="body2" className="font-mono text-[13px] font-semibold capitalize">{t}</Typography>
                    <Typography as="p" variant="body2" className="mt-0.5 text-[12px] text-muted-foreground">{desc}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* ── Setup ──────────────────────────────────────────────────── */}
        <Section id="setup" title="Setup">
          <SubSection id="install" title="1. Install">
            <CodeBlock lang="bash" code={`pnpm add @structyl/themes`} />
          </SubSection>

          <SubSection id="provider" title="2. Wrap your app">
            <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">
              Place <code className="rounded bg-muted px-1 text-[12px]">ThemeProvider</code> at the root of your app —
              above any component that reads theme tokens or calls <code className="rounded bg-muted px-1 text-[12px]">useTheme</code>.
            </Typography>
            <CodeBlock lang="tsx" code={`// app/layout.tsx  (Next.js App Router)
import { ThemeProvider } from '@structyl/themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultTheme="slate"    // which color palette to use
          defaultMode="system"    // 'light' | 'dark' | 'system'
          storageKey="my-app-theme" // localStorage key (false to disable)
          enableTransitions={true}  // smooth CSS transitions on theme change
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`} />
            <Callout variant="info">
              Add <code className="rounded bg-muted px-1 text-[12px]">suppressHydrationWarning</code> to{' '}
              <code className="rounded bg-muted px-1 text-[12px]">{'<html>'}</code> — the ThemeProvider writes{' '}
              <code className="rounded bg-muted px-1 text-[12px]">data-theme</code> and{' '}
              <code className="rounded bg-muted px-1 text-[12px]">data-mode</code> attributes that would otherwise
              cause a hydration mismatch warning.
            </Callout>
          </SubSection>

          <SubSection id="tailwind" title="3. Add the Tailwind preset">
            <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">
              The preset maps every theme token to a Tailwind utility class so you can write
              <code className="rounded bg-muted px-1 mx-1 text-[12px]">bg-primary</code> instead of
              <code className="rounded bg-muted px-1 mx-1 text-[12px]">bg-[hsl(var(--color-primary))]</code>.
            </Typography>
            <CodeBlock lang="ts" code={`// tailwind.config.ts
import type { Config } from 'tailwindcss';
import structylPreset from '@structyl/styled/tailwind-preset'; // or your own

export default {
  presets: [structylPreset],
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
} satisfies Config;`} />
          </SubSection>
        </Section>

        {/* ── Theme switching ─────────────────────────────────────────── */}
        <Section id="theme-switching" title="Theme switching">
          <Typography as="p" variant="body2" className="mb-4 text-sm text-muted-foreground">
            Call <code className="rounded bg-muted px-1 text-[12px]">setTheme(name)</code> from{' '}
            <code className="rounded bg-muted px-1 text-[12px]">useTheme()</code> to switch the active palette at runtime.
            All CSS variables update instantly — no page reload needed.
          </Typography>
          <CodeBlock lang="tsx" code={`import { useTheme } from '@structyl/themes';

function ThemePicker() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex gap-2">
      {themes.map(name => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
            theme === name
              ? 'bg-primary text-primary-foreground'
              : 'border border-border hover:bg-muted/60',
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}`} />
          <PreviewBlock
            title="Live demo — try switching themes and modes"
            code={`const { theme, setTheme, setMode, resolvedMode } = useTheme();`}
          >
            <ThemeSwitcherDemo />
          </PreviewBlock>
        </Section>

        {/* ── Dark / light mode ──────────────────────────────────────── */}
        <Section id="mode-switching" title="Dark / light mode">
          <Typography as="p" variant="body2" className="mb-4 text-sm text-muted-foreground">
            Each theme ships a complete light and dark token set.{' '}
            <code className="rounded bg-muted px-1 text-[12px]">mode</code> can be{' '}
            <code className="rounded bg-muted px-1 text-[12px]">&apos;light&apos;</code>,{' '}
            <code className="rounded bg-muted px-1 text-[12px]">&apos;dark&apos;</code>, or{' '}
            <code className="rounded bg-muted px-1 text-[12px]">&apos;system&apos;</code> (follows{' '}
            <code className="rounded bg-muted px-1 text-[12px]">prefers-color-scheme</code>).
            The resolved mode is always either <code className="rounded bg-muted px-1 text-[12px]">&apos;light&apos;</code> or{' '}
            <code className="rounded bg-muted px-1 text-[12px]">&apos;dark&apos;</code>.
          </Typography>
          <CodeBlock lang="tsx" code={`import { useTheme } from '@structyl/themes';
import { Sun, Moon, Monitor } from '@structyl/icons';

function ModeToggle() {
  const { mode, setMode, resolvedMode } = useTheme();

  return (
    <button
      onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle color mode"
    >
      {resolvedMode === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}

// Full three-way picker (light / dark / system)
function ModePicker() {
  const { setMode, resolvedMode } = useTheme();
  return (
    <>
      <button onClick={() => setMode('light')}><Sun /> Light</button>
      <button onClick={() => setMode('dark')}><Moon /> Dark</button>
      <button onClick={() => setMode('system')}><Monitor /> System</button>
    </>
  );
}`} />
          <PreviewBlock title="Live demo" code={`const { setMode, resolvedMode } = useTheme();`}>
            <ModeToggleDemo />
          </PreviewBlock>
        </Section>

        {/* ── Token palette ───────────────────────────────────────────── */}
        <Section id="token-palette" title="Token palette">
          <Typography as="p" variant="body2" className="mb-4 text-sm text-muted-foreground">
            Every token is a CSS custom property on <code className="rounded bg-muted px-1 text-[12px]">:root</code>.
            The values below update live as you switch themes above.
          </Typography>
          <TokenPaletteDemo />
        </Section>

        {/* ── Token reference ─────────────────────────────────────────── */}
        <Section id="token-reference" title="Token reference">
          <Typography as="p" variant="body2" className="mb-4 text-sm text-muted-foreground">
            All tokens follow the naming convention{' '}
            <code className="rounded bg-muted px-1 text-[12px]">--color-{'{name}'}</code> and accept HSL channel values
            (<code className="rounded bg-muted px-1 text-[12px]">H S% L%</code>) so Tailwind can apply opacity modifiers
            like <code className="rounded bg-muted px-1 text-[12px]">bg-primary/50</code>.
          </Typography>

          {[
            {
              group: 'Base surface tokens',
              desc: 'Backgrounds and foregrounds for the page, cards, and overlays.',
              rows: [
                { token: 'bg', tailwind: 'bg-bg', desc: 'Page background' },
                { token: 'fg', tailwind: 'text-fg', desc: 'Default text color' },
                { token: 'card', tailwind: 'bg-card', desc: 'Card / panel surface' },
                { token: 'card-fg', tailwind: 'text-card-foreground', desc: 'Text on card surfaces' },
                { token: 'popover', tailwind: 'bg-popover', desc: 'Dropdown / tooltip background' },
                { token: 'popover-fg', tailwind: 'text-popover-foreground', desc: 'Text inside popovers' },
                { token: 'muted', tailwind: 'bg-muted', desc: 'Subtle background for sidebars, code blocks' },
                { token: 'muted-fg', tailwind: 'text-muted-foreground', desc: 'De-emphasized text (labels, placeholders)' },
                { token: 'accent', tailwind: 'bg-accent', desc: 'Hover background for interactive items' },
                { token: 'accent-fg', tailwind: 'text-accent-foreground', desc: 'Text on accent backgrounds' },
              ],
            },
            {
              group: 'Brand tokens',
              desc: 'Primary action color and its states. The main visual identity of the theme.',
              rows: [
                { token: 'primary', tailwind: 'bg-primary', desc: 'Main brand / action color' },
                { token: 'primary-fg', tailwind: 'text-primary-foreground', desc: 'Text on primary backgrounds' },
                { token: 'primary-hover', tailwind: 'hover:bg-primary-hover', desc: 'Hover state of primary' },
                { token: 'primary-active', tailwind: 'active:bg-primary-active', desc: 'Pressed state of primary' },
                { token: 'secondary', tailwind: 'bg-secondary', desc: 'Secondary brand color' },
                { token: 'secondary-fg', tailwind: 'text-secondary-foreground', desc: 'Text on secondary backgrounds' },
                { token: 'ring', tailwind: 'ring-ring', desc: 'Focus ring color' },
              ],
            },
            {
              group: 'Semantic tokens',
              desc: 'Status and feedback colors. Consistent across all themes.',
              rows: [
                { token: 'destructive', tailwind: 'bg-destructive / text-destructive', desc: 'Error and danger actions' },
                { token: 'destructive-fg', tailwind: 'text-destructive-foreground', desc: 'Text on destructive backgrounds' },
                { token: 'success', tailwind: 'bg-success / text-success', desc: 'Positive feedback' },
                { token: 'success-fg', tailwind: 'text-success-foreground', desc: 'Text on success backgrounds' },
                { token: 'warning', tailwind: 'bg-warning / text-warning', desc: 'Caution and warnings' },
                { token: 'warning-fg', tailwind: 'text-warning-foreground', desc: 'Text on warning backgrounds' },
                { token: 'info', tailwind: 'bg-info / text-info', desc: 'Informational messages' },
                { token: 'info-fg', tailwind: 'text-info-foreground', desc: 'Text on info backgrounds' },
              ],
            },
            {
              group: 'Border & input tokens',
              desc: 'Consistent borders, dividers, and form inputs.',
              rows: [
                { token: 'border', tailwind: 'border-border', desc: 'Default border color' },
                { token: 'border-strong', tailwind: 'border-border-strong', desc: 'Emphasized borders (dividers, separators)' },
                { token: 'input', tailwind: 'border-input', desc: 'Form input border' },
                { token: 'overlay', tailwind: 'bg-overlay', desc: 'Modal / dialog backdrop' },
              ],
            },
          ].map(({ group, desc, rows }) => (
            <Box key={group} className="mt-6">
              <Typography as="h3" variant="h3" className="text-base font-semibold">{group}</Typography>
              <Typography as="p" variant="body2" className="mb-3 mt-1 text-sm text-muted-foreground">{desc}</Typography>
              <Box className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">CSS variable</th>
                      <th className="px-3 py-2 font-medium">Tailwind class</th>
                      <th className="px-3 py-2 font-medium">Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(r => (
                      <tr key={r.token} className="border-t border-border/60">
                        <td className="px-3 py-2 font-mono font-medium text-primary">--color-{r.token}</td>
                        <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{r.tailwind}</td>
                        <td className="px-3 py-2 text-muted-foreground">{r.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          ))}

          <SubSection id="using-tailwind" title="Using tokens in Tailwind">
            <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">
              All theme tokens map directly to Tailwind utility classes. Use opacity modifiers freely
              — they work because the tokens are HSL channel values (no <code className="rounded bg-muted px-1 text-[12px]">hsl()</code> wrapper).
            </Typography>
            <CodeBlock lang="tsx" code={`// Surfaces
<div className="bg-bg text-fg" />
<div className="bg-card text-card-foreground rounded-xl border border-border" />
<div className="bg-muted text-muted-foreground" />

// Primary brand
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Save changes
</button>

// With opacity modifier
<div className="bg-primary/10 text-primary border border-primary/20">
  Tinted info box
</div>

// Semantic
<span className="text-success">✓ Published</span>
<span className="bg-destructive/10 text-destructive">Error</span>
<span className="bg-warning/10 text-warning">Warning</span>

// Border & focus ring
<input className="border-input focus-visible:ring-ring focus-visible:ring-2" />

// Dark mode — no extra classes needed!
// bg-muted is light on light mode, dark on dark mode automatically.`} />
          </SubSection>

          <SubSection id="using-css" title="Using tokens in CSS and JavaScript">
            <CodeBlock lang="css" code={`/* In any .css file */
.my-component {
  background-color: hsl(var(--color-primary));
  color: hsl(var(--color-primary-fg));
  border: 1px solid hsl(var(--color-border));
}

/* With alpha */
.overlay {
  background-color: hsl(var(--color-overlay) / 0.5);
}

/* Targeting a specific theme */
[data-theme='rose'] .my-component {
  /* Override only for rose theme */
  border-radius: 2rem;
}`} />
            <CodeBlock lang="ts" code={`// In JavaScript / TypeScript
// Read a CSS variable at runtime
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary'); // "222 47% 11%"

// Set a CSS variable directly (bypasses ThemeProvider — advanced usage)
document.documentElement.style.setProperty('--color-primary', '270 60% 50%');`} />
          </SubSection>
        </Section>

        {/* ── Custom themes ────────────────────────────────────────────── */}
        <Section id="custom-themes" title="Custom themes">
          <Typography as="p" variant="body2" className="mb-4 text-sm text-muted-foreground">
            Create a <code className="rounded bg-muted px-1 text-[12px]">ThemeConfig</code> object with{' '}
            <code className="rounded bg-muted px-1 text-[12px]">light</code> and{' '}
            <code className="rounded bg-muted px-1 text-[12px]">dark</code> token maps, then pass it to{' '}
            <code className="rounded bg-muted px-1 text-[12px]">ThemeProvider</code> via the{' '}
            <code className="rounded bg-muted px-1 text-[12px]">themes</code> prop. All values are HSL channel
            strings: <code className="rounded bg-muted px-1 text-[12px]">&quot;H S% L%&quot;</code>.
          </Typography>

          <PreviewBlock
            title="Interactive theme builder"
            description="Pick a primary color and see the generated ThemeConfig code"
            code={`import type { ThemeConfig } from '@structyl/themes';

const myTheme: ThemeConfig = {
  light: { primary: '270 60% 50%', ... },
  dark:  { primary: '270 60% 70%', ... },
};`}
          >
            <CustomThemeDemo />
          </PreviewBlock>

          <SubSection id="extend-theme" title="Extending a built-in theme">
            <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">
              Only override the tokens you need — spread from a built-in theme to inherit everything else.
              This is the easiest way to create a branded variant.
            </Typography>
            <CodeBlock lang="ts" code={`import { defaultThemes } from '@structyl/themes';
import type { ThemeConfig } from '@structyl/themes';

// Brand theme — only the primary changes, everything else from slate
const brandTheme: ThemeConfig = {
  light: {
    ...defaultThemes.slate.light,
    primary: '270 60% 50%',        // purple
    'primary-fg': '0 0% 100%',
    'primary-hover': '270 60% 57%',
    'primary-active': '270 60% 44%',
    ring: '270 60% 50%',
  },
  dark: {
    ...defaultThemes.slate.dark,
    primary: '270 60% 70%',
    'primary-fg': '270 30% 10%',
    'primary-hover': '270 60% 77%',
    ring: '270 60% 70%',
  },
};`} />
          </SubSection>

          <SubSection id="runtime-switching" title="Using custom themes at runtime">
            <CodeBlock lang="tsx" code={`// app/layout.tsx
import { ThemeProvider } from '@structyl/themes';
import { defaultThemes } from '@structyl/themes';
import { brandTheme } from '@/lib/brand-theme';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider
      defaultTheme="brand"
      // Merged with defaultThemes internally — built-ins still available
      themes={{ ...defaultThemes, brand: brandTheme }}
    >
      {children}
    </ThemeProvider>
  );
}

// Any component
function ThemePicker() {
  const { theme, setTheme, themes } = useTheme();
  // themes = ['slate', 'zinc', 'rose', 'structyl', 'brand']
  return themes.map(t => (
    <button key={t} onClick={() => setTheme(t)}>{t}</button>
  ));
}`} />
          </SubSection>

          <SubSection id="component-theme" title="Per-component overrides">
            <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">
              You can scope a theme to a subtree by writing the CSS variables directly on a wrapper element.
              This is useful for marketing sections with a different brand color from the rest of the app.
            </Typography>
            <CodeBlock lang="tsx" code={`// Scoped inline override — no ThemeProvider needed
function HeroBanner() {
  return (
    <section
      style={{
        '--color-primary': '270 60% 50%',
        '--color-primary-fg': '0 0% 100%',
        '--color-bg': '270 30% 6%',
        '--color-fg': '270 20% 98%',
      } as React.CSSProperties}
      className="bg-bg text-fg"
    >
      <h1 className="text-primary">Purple hero section</h1>
      <button className="bg-primary text-primary-foreground">Get started</button>
    </section>
  );
}`} />
          </SubSection>
        </Section>

        {/* ── SSR ──────────────────────────────────────────────────────── */}
        <Section id="ssr" title="SSR & flash prevention">
          <Typography as="p" variant="body2" className="mb-4 text-sm text-muted-foreground">
            Without special handling, server-rendered HTML always uses the default theme.
            When the client hydrates and reads localStorage, it switches — causing a visible flash.
            <code className="rounded bg-muted px-1 mx-1 text-[12px]">ThemeScript</code> prevents this by
            injecting an inline script that reads localStorage and sets the correct{' '}
            <code className="rounded bg-muted px-1 text-[12px]">data-theme</code> attribute{' '}
            <strong>before</strong> the browser paints.
          </Typography>
          <CodeBlock lang="tsx" code={`// app/layout.tsx — Next.js App Router
import { ThemeProvider, ThemeScript } from '@structyl/themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          ThemeScript must be the FIRST child of <head>.
          It runs synchronously, so it blocks paint — but only for ~1ms.
          The script reads localStorage and writes data-theme/data-mode
          to <html> before React hydrates.
        */}
        <ThemeScript storageKey="my-app-theme" defaultTheme="slate" defaultMode="system" />
      </head>
      <body>
        <ThemeProvider storageKey="my-app-theme" defaultTheme="slate" defaultMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`} />
          <Callout variant="tip">
            The <code className="rounded bg-muted px-1 text-[12px]">storageKey</code> in{' '}
            <code className="rounded bg-muted px-1 text-[12px]">ThemeScript</code> and{' '}
            <code className="rounded bg-muted px-1 text-[12px]">ThemeProvider</code> must match. They both default
            to <code className="rounded bg-muted px-1 text-[12px]">&apos;structyl-theme&apos;</code>.
          </Callout>
        </Section>

        {/* ── Storage ──────────────────────────────────────────────────── */}
        <Section id="storage" title="Persistence & storage">
          <Typography as="p" variant="body2" className="mb-4 text-sm text-muted-foreground">
            By default, the chosen theme and mode are persisted to{' '}
            <code className="rounded bg-muted px-1 text-[12px]">localStorage</code> under the key{' '}
            <code className="rounded bg-muted px-1 text-[12px]">structyl-theme</code> as
            <code className="rounded bg-muted px-1 mx-1 text-[12px]">{`{ theme, mode }`}</code>.
          </Typography>
          <CodeBlock lang="ts" code={`// Disable persistence (e.g. for theme preview / demo components)
<ThemeProvider storageKey={false}>
  {children}
</ThemeProvider>

// Custom storage key to avoid collisions between apps on the same domain
<ThemeProvider storageKey="my-app-v2-theme">
  {children}
</ThemeProvider>

// What's stored in localStorage:
// Key: "structyl-theme"
// Value: '{"theme":"rose","mode":"dark"}'`} />
        </Section>

        {/* ── API Reference ─────────────────────────────────────────────── */}
        <Section id="api-reference" title="API Reference">

          <SubSection id="ref-provider" title="ThemeProvider">
            <PropsTable rows={[
              { prop: 'defaultTheme', type: 'string', default: "'structyl'", description: "Name of the theme to use on first load. Must be a key in the themes map." },
              { prop: 'defaultMode', type: "'light' | 'dark' | 'system'", default: "'system'", description: "Color mode on first load. 'system' follows prefers-color-scheme." },
              { prop: 'storageKey', type: 'string | false', default: "'structyl-theme'", description: "localStorage key for persistence. Pass false to disable saving to storage." },
              { prop: 'enableTransitions', type: 'boolean', default: 'true', description: "When true, CSS transitions are active during theme switches. Pass false for instant switching (e.g. performance-sensitive UIs)." },
              { prop: 'themes', type: 'Record<string, ThemeConfig>', default: 'defaultThemes', description: "Custom theme map merged with built-in themes. Use to add or override themes." },
              { prop: 'attribute', type: 'string', default: "'data-theme'", description: "HTML attribute written to <html> with the active theme name. Change if you need data-color-scheme or similar." },
              { prop: 'children', type: 'React.ReactNode', description: "Your app." },
            ]} />
          </SubSection>

          <SubSection id="ref-use-theme" title="useTheme()">
            <Typography as="p" variant="body2" className="mb-3 text-sm text-muted-foreground">Must be called inside a <code className="rounded bg-muted px-1 text-[12px]">ThemeProvider</code>.</Typography>
            <Box className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Field</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['theme', 'string', 'Active theme name (e.g. "slate", "rose").'],
                    ['setTheme', '(name: string) => void', 'Switch the active theme. Persists to localStorage.'],
                    ['mode', "'light' | 'dark' | 'system'", "The mode setting. 'system' means it follows the OS."],
                    ['setMode', "(mode: ThemeMode) => void", 'Switch the color mode. Persists to localStorage.'],
                    ['resolvedMode', "'light' | 'dark'", "The actual rendered mode. Never 'system' — always resolved."],
                    ['themes', 'string[]', 'All available theme names (built-in + custom).'],
                  ].map(([f, t, d]) => (
                    <tr key={f} className="border-t border-border/60 align-top">
                      <td className="px-3 py-2 font-mono font-medium text-primary">{f}</td>
                      <td className="px-3 py-2"><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{t}</code></td>
                      <td className="px-3 py-2 text-muted-foreground">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </SubSection>

          <SubSection id="ref-theme-script" title="ThemeScript">
            <PropsTable rows={[
              { prop: 'storageKey', type: 'string', default: "'structyl-theme'", description: "Must match the storageKey passed to ThemeProvider." },
              { prop: 'defaultTheme', type: 'string', default: "'structyl'", description: "Fallback theme if no value exists in localStorage." },
              { prop: 'defaultMode', type: "'light' | 'dark' | 'system'", default: "'system'", description: "Fallback mode if no value exists in localStorage." },
            ]} />
          </SubSection>

          <SubSection id="ref-theme-config" title="ThemeConfig interface">
            <CodeBlock lang="ts" code={`interface ThemeConfig {
  light: Partial<ThemeTokens> & Record<string, string>;
  dark:  Partial<ThemeTokens> & Record<string, string>;
}

// All token names — you can override any subset
interface ThemeTokens {
  bg: string;            fg: string;
  card: string;          'card-fg': string;
  popover: string;       'popover-fg': string;
  primary: string;       'primary-fg': string;
  'primary-hover': string; 'primary-active': string;
  secondary: string;     'secondary-fg': string;
  muted: string;         'muted-fg': string;
  accent: string;        'accent-fg': string;
  destructive: string;   'destructive-fg': string;
  success: string;       'success-fg': string;
  warning: string;       'warning-fg': string;
  info: string;          'info-fg': string;
  border: string;        'border-strong': string;
  input: string;         ring: string;
  overlay: string;       shadow: string;
  // + 50 additional semantic sub-tokens (see types.ts)
  [key: string]: string; // arbitrary custom tokens
}`} />
          </SubSection>
        </Section>

        {/* Footer */}
        <Box className="mt-14 flex items-center justify-between">
          <a href="/themes" className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg">
            Open themes playground <ArrowUpRight className="h-3 w-3" />
          </a>
          <a href="https://github.com/imirfanul/structyl" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg">
            Edit on GitHub <ArrowUpRight className="h-3 w-3" />
          </a>
        </Box>
      </article>

      {/* ── TOC ───────────────────────────────────────────────────────── */}
      <aside className="hidden w-[180px] shrink-0 xl:block">
        <Box className="sticky top-[76px]">
          <Typography as="p" variant="body2" className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">On this page</Typography>
          <nav className="space-y-0.5">
            {TOC.map(({ id, title }) => (
              <a key={id} href={`#${id}`}
                className={`block border-l-2 py-1 pl-3 text-[12px] transition-colors ${
                  activeId === id ? 'border-primary font-medium text-primary' : 'border-transparent text-muted-foreground hover:text-fg'
                } ${title.startsWith('→') ? 'pl-5 text-[11px]' : ''}`}>
                {title}
              </a>
            ))}
          </nav>
        </Box>
      </aside>
    </Box>
  );
}
