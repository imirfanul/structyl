'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sparkles, Check, Copy, RotateCcw, Sun, Moon, Download, Plus, Trash2, Monitor,
  Link2, Upload, Undo2, ChevronDown, ChevronUp,
} from '@aura-ui/icons';
import { Button } from '@aura-ui/styled';
import { useTheme } from '@aura-ui/themes';
import { COMPONENTS, CATEGORIES } from '../../lib/registry';

/* ── Types ───────────────────────────────────────────────────────────── */

type CustomColor = { id: string; name: string; hex: string };
type ShadowDef = { blur: number; spread: number; opacity: number };
type ShadowsState = { sm: ShadowDef; md: ShadowDef; lg: ShadowDef };
type DurationsState = { fast: number; normal: number; slow: number };
type ThemeSnap = {
  primary: string; destructive: string; success: string; warning: string; info: string;
  radius: string; scale: number; customColors: CustomColor[];
  fontSans: string; fontMono: string; shadows: ShadowsState;
  density: string; easing: string; durations: DurationsState; borderWidth: string;
};

/* ── HSL utilities ───────────────────────────────────────────────────── */

function hexToHslParts(hex: string): { h: number; s: number; l: number } {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const r = (parseInt(h.slice(0, 2), 16) || 0) / 255;
  const g = (parseInt(h.slice(2, 4), 16) || 0) / 255;
  const b = (parseInt(h.slice(4, 6), 16) || 0) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, sat = 0;
  const lum = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = lum > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(hue * 360), s: Math.round(sat * 100), l: Math.round(lum * 100) };
}

function hslStr({ h, s, l }: { h: number; s: number; l: number }) {
  return `${h} ${s}% ${l}%`;
}
function hexToHsl(hex: string) { return hslStr(hexToHslParts(hex)); }
function shiftL(p: { h: number; s: number; l: number }, d: number) {
  return { ...p, l: Math.max(2, Math.min(97, p.l + d)) };
}
function contrastFg(p: { h: number; s: number; l: number }) {
  return p.l > 55 ? '222 47% 11%' : '0 0% 100%';
}
function toKebab(s: string) {
  return s.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/* ── WCAG utilities ──────────────────────────────────────────────────── */

function linearize(c: number) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function relativeLuminance(hex: string) {
  const h = hex.replace('#', '');
  if (h.length !== 6) return 0;
  return 0.2126 * linearize(parseInt(h.slice(0, 2), 16))
       + 0.7152 * linearize(parseInt(h.slice(2, 4), 16))
       + 0.0722 * linearize(parseInt(h.slice(4, 6), 16));
}
function contrastRatio(a: string, b: string) {
  const l1 = relativeLuminance(a), l2 = relativeLuminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function wcagLevel(r: number): 'AAA' | 'AA' | 'AA Large' | 'Fail' {
  if (r >= 7) return 'AAA';
  if (r >= 4.5) return 'AA';
  if (r >= 3) return 'AA Large';
  return 'Fail';
}

/* ── Import helpers ──────────────────────────────────────────────────── */

function hslPartsToHex({ h, s, l }: { h: number; s: number; l: number }): string {
  const sN = s / 100, lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lN - c / 2;
  let r = 0, g = 0, bv = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; bv = x; } else if (h < 240) { g = x; bv = c; }
  else if (h < 300) { r = x; bv = c; } else { r = c; bv = x; }
  const toH = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toH(r)}${toH(g)}${toH(bv)}`;
}
function parseHslString(s: string) {
  const p = s.trim().split(/[\s,%]+/).filter(Boolean);
  if (p.length < 3) return null;
  const h = parseFloat(p[0] ?? ''), sv = parseFloat(p[1] ?? ''), lv = parseFloat(p[2] ?? '');
  if (isNaN(h) || isNaN(sv) || isNaN(lv)) return null;
  return { h, s: sv, l: lv };
}
function parseCSSVars(css: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css)) !== null) vars[(m[1] ?? '').trim()] = (m[2] ?? '').trim();
  return vars;
}

/* ── Shadow helper ───────────────────────────────────────────────────── */

function shadowStr(def: ShadowDef, size: 'sm' | 'md' | 'lg') {
  const offsets = { sm: '0 1px', md: '0 4px', lg: '0 8px' };
  return `${offsets[size]} ${def.blur}px ${def.spread}px hsl(var(--color-shadow) / ${(def.opacity / 100).toFixed(2)})`;
}

/* ── CSS generator ───────────────────────────────────────────────────── */

function generateCSS(
  primary: string, destructive: string, success: string, warning: string, info: string,
  radius: string, customColors: CustomColor[],
  fontSans: string, fontMono: string,
  shadows: ShadowsState, density: string, easing: string,
  durations: DurationsState, borderWidth: string,
): string {
  const p = hexToHslParts(primary), d = hexToHslParts(destructive);
  const s = hexToHslParts(success), w = hexToHslParts(warning), n = hexToHslParts(info);
  const pStr = hslStr(p), pFg = contrastFg(p);
  const densityScale = density === 'compact' ? '0.875' : density === 'relaxed' ? '1.125' : '1';
  const customVars = (i: string) => customColors.length
    ? '\n' + customColors.map(c => `${i}--color-${toKebab(c.name)}: ${hexToHsl(c.hex)};`).join('\n') : '';

  const baseBlock = (i = '  ') => `${i}--radius: ${radius};
${i}--font-sans: ${fontSans};
${i}--font-mono: ${fontMono};
${i}--density: ${densityScale};
${i}--border-width: ${borderWidth};
${i}--shadow-sm: ${shadowStr(shadows.sm, 'sm')};
${i}--shadow-md: ${shadowStr(shadows.md, 'md')};
${i}--shadow-lg: ${shadowStr(shadows.lg, 'lg')};
${i}--duration-fast: ${durations.fast}ms;
${i}--duration-normal: ${durations.normal}ms;
${i}--duration-slow: ${durations.slow}ms;
${i}--ease-default: ${easing};`;

  const light = (i = '  ') => `${i}--color-bg: 0 0% 100%;
${i}--color-fg: 222 47% 11%;
${i}--color-card: 0 0% 100%;
${i}--color-card-fg: 222 47% 11%;
${i}--color-popover: 0 0% 100%;
${i}--color-popover-fg: 222 47% 11%;
${i}--color-primary: ${pStr};
${i}--color-primary-fg: ${pFg};
${i}--color-primary-hover: ${hslStr(shiftL(p, 6))};
${i}--color-primary-active: ${hslStr(shiftL(p, -8))};
${i}--color-secondary: 210 40% 96%;
${i}--color-secondary-fg: 222 47% 11%;
${i}--color-muted: 210 40% 96%;
${i}--color-muted-fg: 215 16% 47%;
${i}--color-accent: 210 40% 96%;
${i}--color-accent-fg: 222 47% 11%;
${i}--color-destructive: ${hslStr(d)};
${i}--color-destructive-fg: 0 0% 100%;
${i}--color-success: ${hslStr(s)};
${i}--color-success-fg: 0 0% 100%;
${i}--color-warning: ${hslStr(w)};
${i}--color-warning-fg: 38 92% 8%;
${i}--color-info: ${hslStr(n)};
${i}--color-info-fg: 0 0% 100%;
${i}--color-border: 214 32% 91%;
${i}--color-border-strong: 214 24% 80%;
${i}--color-input: 214 32% 91%;
${i}--color-ring: ${pStr};
${i}--color-overlay: 222 47% 11%;
${i}--color-shadow: 222 47% 11%;${customVars(i)}`;

  const dark = (i = '  ') => `${i}--color-bg: 222 47% 6%;
${i}--color-fg: 210 40% 98%;
${i}--color-card: 222 47% 8%;
${i}--color-card-fg: 210 40% 98%;
${i}--color-popover: 222 35% 10%;
${i}--color-popover-fg: 210 40% 98%;
${i}--color-primary: ${pStr};
${i}--color-primary-fg: ${pFg};
${i}--color-primary-hover: ${hslStr(shiftL(p, 6))};
${i}--color-primary-active: ${hslStr(shiftL(p, -8))};
${i}--color-secondary: 217 33% 17%;
${i}--color-secondary-fg: 210 40% 98%;
${i}--color-muted: 217 33% 17%;
${i}--color-muted-fg: 215 20% 65%;
${i}--color-accent: 217 33% 20%;
${i}--color-accent-fg: 210 40% 98%;
${i}--color-destructive: ${hslStr(shiftL(d, -10))};
${i}--color-destructive-fg: 0 0% 100%;
${i}--color-success: ${hslStr(shiftL(s, 5))};
${i}--color-success-fg: 0 0% 100%;
${i}--color-warning: ${hslStr(shiftL(w, 5))};
${i}--color-warning-fg: 38 92% 8%;
${i}--color-info: ${hslStr(shiftL(n, 7))};
${i}--color-info-fg: 0 0% 100%;
${i}--color-border: 217 33% 20%;
${i}--color-border-strong: 217 25% 30%;
${i}--color-input: 217 33% 20%;
${i}--color-ring: ${pStr};
${i}--color-overlay: 0 0% 0%;
${i}--color-shadow: 0 0% 0%;${customVars(i)}`;

  return `/* ─────────────────────────────────────────────────────────
   Generated by aura-ui Theme Builder · ${new Date().toISOString().slice(0, 10)}
   Paste into globals.css
───────────────────────────────────────────────────────── */

:root {
${baseBlock()}
}

/* ── Light mode ─────────────────────────────────────────── */
:root[data-mode="light"],
:root:not([data-mode="dark"]) {
${light()}
}

/* ── Dark mode ──────────────────────────────────────────── */
:root[data-mode="dark"] {
${dark()}
}

/* ── System preference fallback ─────────────────────────── */
@media (prefers-color-scheme: dark) {
  :root:not([data-mode="light"]) {
${dark('    ')}
  }
}`;
}

/* ── Tailwind config generator ───────────────────────────────────────── */

function generateTailwindConfig(customColors: CustomColor[]): string {
  const core = [
    'bg','fg','card','card-fg','popover','popover-fg',
    'primary','primary-fg','primary-hover','primary-active',
    'secondary','secondary-fg','muted','muted-fg','accent','accent-fg',
    'destructive','destructive-fg','success','success-fg',
    'warning','warning-fg','info','info-fg',
    'border','border-strong','input','ring',
  ];
  const entries = [
    ...core.map(k => `        "${k}": "hsl(var(--color-${k}))"`),
    ...customColors.map(c => `        "${toKebab(c.name)}": "hsl(var(--color-${toKebab(c.name)}))"`)
  ].join(',\n');
  return `// tailwind.config.js
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
${entries},
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "calc(var(--radius) * 0.75)",
        lg: "calc(var(--radius) * 1.25)",
        xl: "calc(var(--radius) * 1.5)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
} satisfies Config;`;
}

/* ── Download helpers ────────────────────────────────────────────────── */

function makeDownload(content: string, filename: string, type: string) {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

/* ── Constants ───────────────────────────────────────────────────────── */

const ACCENT_PRESETS = [
  { name: 'Slate', hex: '#475569' }, { name: 'Indigo', hex: '#6366f1' },
  { name: 'Blue', hex: '#3b82f6' }, { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Emerald', hex: '#10b981' }, { name: 'Lime', hex: '#84cc16' },
  { name: 'Amber', hex: '#f59e0b' }, { name: 'Orange', hex: '#f97316' },
  { name: 'Red', hex: '#ef4444' }, { name: 'Rose', hex: '#e11d48' },
  { name: 'Pink', hex: '#ec4899' }, { name: 'Violet', hex: '#8b5cf6' },
];

const THEME_PRESETS = [
  { name: 'Indigo',  primary: '#6366f1', destructive: '#ef4444', success: '#10b981', warning: '#f59e0b', info: '#06b6d4', radius: '0.5rem' },
  { name: 'Ocean',   primary: '#0284c7', destructive: '#dc2626', success: '#059669', warning: '#d97706', info: '#0891b2', radius: '0.5rem' },
  { name: 'Rose',    primary: '#e11d48', destructive: '#dc2626', success: '#16a34a', warning: '#d97706', info: '#0284c7', radius: '0.75rem' },
  { name: 'Forest',  primary: '#16a34a', destructive: '#dc2626', success: '#15803d', warning: '#ca8a04', info: '#0891b2', radius: '0.375rem' },
  { name: 'Sunset',  primary: '#f97316', destructive: '#dc2626', success: '#16a34a', warning: '#d97706', info: '#0284c7', radius: '0.5rem' },
  { name: 'Violet',  primary: '#7c3aed', destructive: '#dc2626', success: '#16a34a', warning: '#d97706', info: '#0284c7', radius: '0.5rem' },
  { name: 'Slate',   primary: '#475569', destructive: '#dc2626', success: '#16a34a', warning: '#ca8a04', info: '#0284c7', radius: '0.25rem' },
  { name: 'Ember',   primary: '#be123c', destructive: '#9f1239', success: '#15803d', warning: '#b45309', info: '#0369a1', radius: '0.75rem' },
];

const RADII = [
  { name: 'None', v: '0rem' }, { name: 'XS', v: '0.25rem' },
  { name: 'SM', v: '0.375rem' }, { name: 'MD', v: '0.5rem' },
  { name: 'LG', v: '0.75rem' }, { name: 'XL', v: '1rem' },
  { name: 'Full', v: '9999px' },
];

const SCALES = [
  { name: '90%', v: 0.9 }, { name: '95%', v: 0.95 }, { name: '100%', v: 1 },
  { name: '105%', v: 1.05 }, { name: '110%', v: 1.1 },
];

const FONT_SANS_OPTIONS = [
  { name: 'System', value: 'system-ui, sans-serif' },
  { name: 'Inter', value: '"Inter", system-ui, sans-serif' },
  { name: 'Geist', value: '"Geist", system-ui, sans-serif' },
  { name: 'Manrope', value: '"Manrope", system-ui, sans-serif' },
  { name: 'DM Sans', value: '"DM Sans", system-ui, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
];

const FONT_MONO_OPTIONS = [
  { name: 'System', value: 'ui-monospace, monospace' },
  { name: 'JetBrains', value: '"JetBrains Mono", ui-monospace, monospace' },
  { name: 'Fira Code', value: '"Fira Code", ui-monospace, monospace' },
  { name: 'Consolas', value: 'Consolas, ui-monospace, monospace' },
];

const EASING_OPTIONS = [
  { name: 'Ease', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { name: 'Spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { name: 'Linear', value: 'linear' },
  { name: 'Sharp', value: 'cubic-bezier(0.4, 0, 1, 1)' },
];

const DURATION_PRESETS = [
  { name: 'Fast', fast: 100, normal: 150, slow: 250 },
  { name: 'Default', fast: 150, normal: 200, slow: 400 },
  { name: 'Slow', fast: 250, normal: 350, slow: 600 },
];

const DENSITY_OPTIONS = [
  { name: 'Compact', v: 'compact' },
  { name: 'Default', v: 'default' },
  { name: 'Relaxed', v: 'relaxed' },
];

const BORDER_WIDTH_OPTIONS = [
  { name: 'Thin', v: '0.5px' },
  { name: 'Default', v: '1px' },
  { name: 'Thick', v: '2px' },
];

const DEFAULT_SHADOWS: ShadowsState = {
  sm: { blur: 4, spread: 0, opacity: 8 },
  md: { blur: 8, spread: 0, opacity: 12 },
  lg: { blur: 16, spread: -4, opacity: 16 },
};

const DEFAULT_DURATIONS: DurationsState = { fast: 150, normal: 200, slow: 400 };

/* ── Sub-components ──────────────────────────────────────────────────── */

function ContrastBadge({ ratio }: { ratio: number }) {
  const level = wcagLevel(ratio);
  const cls = {
    'AAA': 'bg-success/15 text-success',
    'AA': 'bg-primary/15 text-primary',
    'AA Large': 'bg-warning/15 text-warning',
    'Fail': 'bg-destructive/15 text-destructive',
  }[level];
  return (
    <span className={`inline-flex rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold ${cls}`}>
      {level} {ratio.toFixed(1)}:1
    </span>
  );
}

function ContrastChecker({ primary, destructive, success, warning, info }: {
  primary: string; destructive: string; success: string; warning: string; info: string;
}) {
  const WHITE = '#ffffff', DARK = '#1a2236';
  const pairs = [
    { label: 'Primary / white', fg: primary, bg: WHITE },
    { label: 'Primary / dark', fg: primary, bg: DARK },
    { label: 'Destructive / white', fg: destructive, bg: WHITE },
    { label: 'Success / white', fg: success, bg: WHITE },
    { label: 'Warning / white', fg: warning, bg: WHITE },
    { label: 'Info / white', fg: info, bg: WHITE },
  ];
  return (
    <div className="space-y-2">
      {pairs.map(({ label, fg, bg }) => (
        <div key={label} className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="h-4 w-4 shrink-0 rounded border border-border" style={{ background: fg }} />
            <span className="truncate text-[10px] text-muted-foreground">{label}</span>
          </div>
          <ContrastBadge ratio={contrastRatio(fg, bg)} />
        </div>
      ))}
    </div>
  );
}

function ShadowEditor({ shadows, onChange }: {
  shadows: ShadowsState; onChange: (s: ShadowsState) => void;
}) {
  return (
    <div className="space-y-5">
      {(['sm', 'md', 'lg'] as const).map(size => {
        const def = shadows[size];
        const update = (patch: Partial<ShadowDef>) => onChange({ ...shadows, [size]: { ...def, ...patch } });
        return (
          <div key={size} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {size.toUpperCase()}
              </span>
              <div className="h-6 w-10 rounded border border-border bg-card" style={{ boxShadow: shadowStr(def, size) }} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-[9px] text-muted-foreground">
              {[
                { label: `Blur ${def.blur}px`, min: 0, max: 32, val: def.blur, key: 'blur' as const },
                { label: `Spread ${def.spread}px`, min: -8, max: 8, val: def.spread, key: 'spread' as const },
                { label: `Opacity ${def.opacity}%`, min: 0, max: 40, val: def.opacity, key: 'opacity' as const },
              ].map(({ label, min, max, val, key }) => (
                <label key={key} className="space-y-1">
                  <span>{label}</span>
                  <input type="range" min={min} max={max} value={val}
                    onChange={e => update({ [key]: +e.target.value })}
                    className="w-full accent-primary" />
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FontPicker({ label, value, options, onChange }: {
  label: string; value: string;
  options: { name: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)}
            className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium transition-colors ${
              value === o.value ? 'border-primary bg-accent' : 'border-border text-muted-foreground hover:border-border-strong'
            }`}
            style={{ fontFamily: o.value }}>
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Panel({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="space-y-2.5 border-b border-border/40 pb-5">
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">{title}</p>
        {open
          ? <ChevronUp className="h-3 w-3 text-muted-foreground/40" />
          : <ChevronDown className="h-3 w-3 text-muted-foreground/40" />}
      </button>
      {open && children}
    </div>
  );
}

function ColorRow({ label, hex, onChange, presets, onSnap }: {
  label: string; hex: string; onChange: (v: string) => void;
  presets?: { name: string; hex: string }[]; onSnap?: () => void;
}) {
  return (
    <div className="space-y-1.5">
      {label && <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">{label}</p>}
      {presets && (
        <div className="flex flex-wrap gap-1.5">
          {presets.map(a => (
            <button key={a.hex} onClick={() => { onSnap?.(); onChange(a.hex); }} title={a.name}
              className={`relative h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-card transition-all active:scale-90 ${
                hex === a.hex ? 'ring-primary' : 'ring-transparent hover:ring-border'
              }`}
              style={{ background: a.hex }}>
              {hex === a.hex && <Check className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow" />}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border">
          <span className="block h-full w-full" style={{ background: hex }} />
          <input type="color" value={hex} onFocus={onSnap} onChange={e => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
        </label>
        <input value={hex.toUpperCase()} onFocus={onSnap} onChange={e => onChange(e.target.value)}
          className="h-7 w-full rounded-md border border-border bg-bg px-2 font-mono text-[11px] uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          spellCheck={false} maxLength={7} />
      </div>
    </div>
  );
}

class PreviewBoundary extends React.Component<
  { slug: string; children: React.ReactNode }, { error: boolean }
> {
  override state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  override componentDidCatch(e: unknown) { void e; }
  override render() {
    if (this.state.error)
      return <div className="flex h-full min-h-[80px] items-center justify-center">
        <span className="text-[10px] text-muted-foreground/50">Preview unavailable</span>
      </div>;
    return this.props.children;
  }
}

function ImportModal({ onClose, onImport }: {
  onClose: () => void; onImport: (v: Record<string, string>) => void;
}) {
  const [text, setText] = React.useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
        <h2 className="text-base font-semibold">Import CSS variables</h2>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Paste your CSS. Matching aura-ui tokens will be loaded into the builder.
        </p>
        <textarea value={text} onChange={e => setText(e.target.value)} autoFocus
          placeholder={`:root {\n  --color-primary: 239 84% 67%;\n  --radius: 0.5rem;\n}`}
          className="mt-3 h-44 w-full resize-none rounded-xl border border-border bg-bg p-3 font-mono text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring/30" />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-[12px] text-muted-foreground hover:text-fg">Cancel</button>
          <button onClick={() => { onImport(parseCSSVars(text)); onClose(); }} disabled={!text.trim()}
            className="rounded-lg bg-primary px-4 py-2 text-[12px] font-medium text-primary-foreground disabled:opacity-50">Import</button>
        </div>
      </div>
    </div>
  );
}

/* ── Live showcase ───────────────────────────────────────────────────── */

function LiveShowcase({ forcedMode }: { forcedMode?: 'light' | 'dark' }) {
  const [tab, setTab] = React.useState('Overview');
  const [checked, setChecked] = React.useState(true);

  const vars = forcedMode ? ({
    '--color-bg':       forcedMode === 'light' ? '0 0% 100%'    : '222 47% 6%',
    '--color-fg':       forcedMode === 'light' ? '222 47% 11%'  : '210 40% 98%',
    '--color-card':     forcedMode === 'light' ? '0 0% 100%'    : '222 47% 8%',
    '--color-border':   forcedMode === 'light' ? '214 32% 91%'  : '217 33% 20%',
    '--color-muted':    forcedMode === 'light' ? '210 40% 96%'  : '217 33% 17%',
    '--color-muted-fg': forcedMode === 'light' ? '215 16% 47%'  : '215 20% 65%',
  } as React.CSSProperties) : {};

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[hsl(var(--color-bg))] text-[hsl(var(--color-fg))] shadow-lg" style={vars}>
      {forcedMode ? (
        <div className="flex items-center gap-1.5 border-b border-[hsl(var(--color-border))] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-[hsl(var(--color-muted-fg))]">
          {forcedMode === 'light' ? <Sun className="h-2.5 w-2.5" /> : <Moon className="h-2.5 w-2.5" />}
          {forcedMode}
        </div>
      ) : (
        <div className="flex items-center gap-3 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]/40 px-2.5 py-1 text-[11px] text-[hsl(var(--color-muted-fg))]">
            <Monitor className="h-3 w-3" /> app.company.com
          </div>
        </div>
      )}
      <div className="flex min-h-[380px]">
        <div className="hidden w-[130px] shrink-0 border-r border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))]/50 p-3 sm:block" style={vars}>
          <p className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-widest text-[hsl(var(--color-muted-fg))]/60">Nav</p>
          {['Dashboard', 'Users', 'Settings', 'Reports'].map(item => (
            <div key={item} className={`mb-0.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${item === 'Users' ? 'bg-primary/10 text-primary' : 'text-[hsl(var(--color-muted-fg))]'}`}>
              {item}
            </div>
          ))}
          <div className="mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-2 py-1 text-[10px] text-destructive">3 alerts</div>
        </div>
        <div className="flex-1 space-y-4 p-4" style={vars}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--color-fg))]">Users</h3>
              <p className="text-[11px] text-[hsl(var(--color-muted-fg))]">Manage your team</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg border border-[hsl(var(--color-border))] px-3 py-1.5 text-[11px] text-[hsl(var(--color-muted-fg))]">Export</button>
              <button className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground">+ Invite</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[['Total', '2,491', '+12%', true], ['Active', '148', '+3%', true], ['Issues', '3', '-62%', false]].map(([lbl, v, ch, up]) => (
              <div key={String(lbl)} className="rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-3" style={vars}>
                <p className="text-[10px] text-[hsl(var(--color-muted-fg))]">{lbl}</p>
                <p className="mt-1 text-lg font-bold text-[hsl(var(--color-fg))]">{v}</p>
                <p className={`text-[10px] font-medium ${up ? 'text-success' : 'text-destructive'}`}>{String(ch)}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-0.5 border-b border-[hsl(var(--color-border))]">
            {['Overview', 'Active', 'Pending'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`relative px-3 py-2 text-[11px] font-medium ${tab === t ? 'text-[hsl(var(--color-fg))]' : 'text-[hsl(var(--color-muted-fg))]'}`}>
                {t}
                {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border border-[hsl(var(--color-border))]">
            <div className="grid grid-cols-4 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-fg))]">
              <span>Name</span><span>Role</span><span>Status</span><span className="text-right">Action</span>
            </div>
            {[['Alice Chen','Admin','Active',true],['Bob Smith','Editor','Away',false],['Carol Wu','Viewer','Active',true]].map(([nm,role,st,active]) => (
              <div key={String(nm)} className="grid grid-cols-4 items-center border-t border-[hsl(var(--color-border))]/60 px-3 py-2.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">{String(nm)[0]}</div>
                  <span className="font-medium text-[hsl(var(--color-fg))]">{nm}</span>
                </div>
                <span className="text-[hsl(var(--color-muted-fg))]">{role}</span>
                <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-semibold ${active ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{st}</span>
                <button className="text-right text-[10px] text-primary">Edit</button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--color-border))] p-3">
            <div onClick={() => setChecked(c => !c)}
              className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border-2 transition-colors ${checked ? 'border-primary bg-primary' : 'border-[hsl(var(--color-border))]'}`}>
              {checked && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
            </div>
            <span className="flex-1 text-[11px] text-[hsl(var(--color-muted-fg))]">Send weekly digest emails</span>
            <span className="rounded-full bg-info/10 px-2 py-0.5 text-[9px] font-semibold text-info">Beta</span>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/5 px-3 py-2.5">
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-warning" />
            <p className="text-[11px] text-warning">3 users have pending invitations expiring today.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────── */

export default function ThemesPlayground() {
  const { resolvedMode, setMode } = useTheme();

  const [primary,     setPrimary]     = React.useState('#6366f1');
  const [destructive, setDestructive] = React.useState('#ef4444');
  const [success,     setSuccess]     = React.useState('#10b981');
  const [warning,     setWarning]     = React.useState('#f59e0b');
  const [info,        setInfo]        = React.useState('#06b6d4');
  const [radius,      setRadius]      = React.useState('0.5rem');
  const [scale,       setScale]       = React.useState(1);
  const [customColors, setCustomColors] = React.useState<CustomColor[]>([]);
  const [fontSans,    setFontSans]    = React.useState('system-ui, sans-serif');
  const [fontMono,    setFontMono]    = React.useState('ui-monospace, monospace');
  const [shadows,     setShadows]     = React.useState<ShadowsState>(DEFAULT_SHADOWS);
  const [density,     setDensity]     = React.useState('default');
  const [easing,      setEasing]      = React.useState('cubic-bezier(0.4, 0, 0.2, 1)');
  const [durations,   setDurations]   = React.useState<DurationsState>(DEFAULT_DURATIONS);
  const [borderWidth, setBorderWidth] = React.useState('1px');

  const [copied,       setCopied]      = React.useState(false);
  const [sharedCopied, setSharedCopied] = React.useState(false);
  const [cssOpen,      setCssOpen]     = React.useState(false);
  const [twOpen,       setTwOpen]      = React.useState(false);
  const [importOpen,   setImportOpen]  = React.useState(false);
  const [splitView,    setSplitView]   = React.useState(false);
  const [addingColor,  setAddingColor] = React.useState(false);
  const [newColorName, setNewColorName] = React.useState('');
  const [newColorHex,  setNewColorHex]  = React.useState('#8b5cf6');

  const historyRef = React.useRef<ThemeSnap[]>([]);
  const [canUndo, setCanUndo] = React.useState(false);

  const getSnap = React.useCallback((): ThemeSnap => ({
    primary, destructive, success, warning, info, radius, scale, customColors,
    fontSans, fontMono, shadows, density, easing, durations, borderWidth,
  }), [primary, destructive, success, warning, info, radius, scale, customColors,
       fontSans, fontMono, shadows, density, easing, durations, borderWidth]);

  const snap = React.useCallback(() => {
    historyRef.current = [...historyRef.current.slice(-9), getSnap()];
    setCanUndo(true);
  }, [getSnap]);

  const undo = () => {
    const prev = historyRef.current.pop();
    if (!prev) return;
    setPrimary(prev.primary); setDestructive(prev.destructive); setSuccess(prev.success);
    setWarning(prev.warning); setInfo(prev.info); setRadius(prev.radius); setScale(prev.scale);
    setCustomColors(prev.customColors); setFontSans(prev.fontSans); setFontMono(prev.fontMono);
    setShadows(prev.shadows); setDensity(prev.density); setEasing(prev.easing);
    setDurations(prev.durations); setBorderWidth(prev.borderWidth);
    if (historyRef.current.length === 0) setCanUndo(false);
  };

  // Load from URL hash on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    try {
      const st: Partial<ThemeSnap> = JSON.parse(atob(hash));
      if (st.primary) setPrimary(st.primary);
      if (st.destructive) setDestructive(st.destructive);
      if (st.success) setSuccess(st.success);
      if (st.warning) setWarning(st.warning);
      if (st.info) setInfo(st.info);
      if (st.radius) setRadius(st.radius);
      if (st.scale) setScale(st.scale);
      if (st.fontSans) setFontSans(st.fontSans);
      if (st.fontMono) setFontMono(st.fontMono);
      if (st.density) setDensity(st.density);
      if (st.easing) setEasing(st.easing);
      if (st.durations) setDurations(st.durations);
      if (st.borderWidth) setBorderWidth(st.borderWidth);
    } catch { /* ignore */ }
  }, []);

  // Apply tokens to :root
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const p = hexToHslParts(primary);
    const sets: [string, string][] = [
      ['--color-primary', hslStr(p)],
      ['--color-ring', hslStr(p)],
      ['--color-primary-hover', hslStr(shiftL(p, 6))],
      ['--color-primary-active', hslStr(shiftL(p, -8))],
      ['--color-destructive', hexToHsl(destructive)],
      ['--color-success', hexToHsl(success)],
      ['--color-warning', hexToHsl(warning)],
      ['--color-info', hexToHsl(info)],
      ['--radius', radius],
      ['--font-sans', fontSans],
      ['--font-mono', fontMono],
      ['--shadow-sm', shadowStr(shadows.sm, 'sm')],
      ['--shadow-md', shadowStr(shadows.md, 'md')],
      ['--shadow-lg', shadowStr(shadows.lg, 'lg')],
      ['--duration-fast', `${durations.fast}ms`],
      ['--duration-normal', `${durations.normal}ms`],
      ['--duration-slow', `${durations.slow}ms`],
      ['--ease-default', easing],
      ['--border-width', borderWidth],
    ];
    sets.forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.fontSize = `${16 * scale}px`;
    customColors.forEach(c => root.style.setProperty(`--color-${toKebab(c.name)}`, hexToHsl(c.hex)));
    return () => {
      sets.forEach(([k]) => root.style.removeProperty(k));
      customColors.forEach(c => root.style.removeProperty(`--color-${toKebab(c.name)}`));
      root.style.fontSize = '';
    };
  }, [primary, destructive, success, warning, info, radius, fontSans, fontMono,
      shadows, durations, easing, borderWidth, scale, customColors]);

  const css = generateCSS(primary, destructive, success, warning, info, radius, customColors,
    fontSans, fontMono, shadows, density, easing, durations, borderWidth);
  const twConfig = generateTailwindConfig(customColors);

  const copy = async () => {
    try { await navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* ignore */ }
  };

  const shareUrl = async () => {
    if (typeof window === 'undefined') return;
    const encoded = btoa(JSON.stringify(getSnap()));
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    try { await navigator.clipboard.writeText(url); setSharedCopied(true); setTimeout(() => setSharedCopied(false), 2500); } catch { /* ignore */ }
  };

  const applyPreset = (preset: typeof THEME_PRESETS[0]) => {
    snap();
    setPrimary(preset.primary); setDestructive(preset.destructive);
    setSuccess(preset.success); setWarning(preset.warning);
    setInfo(preset.info); setRadius(preset.radius);
  };

  const importVars = (vars: Record<string, string>) => {
    const toHex = (key: string) => {
      const val = vars[key]; if (!val) return null;
      const parts = parseHslString(val); if (!parts) return null;
      return hslPartsToHex(parts);
    };
    snap();
    const p = toHex('color-primary'); if (p) setPrimary(p);
    const d = toHex('color-destructive'); if (d) setDestructive(d);
    const s = toHex('color-success'); if (s) setSuccess(s);
    const w = toHex('color-warning'); if (w) setWarning(w);
    const n = toHex('color-info'); if (n) setInfo(n);
    if (vars['radius']) setRadius(vars['radius']);
    if (vars['font-sans']) setFontSans(vars['font-sans']);
    if (vars['font-mono']) setFontMono(vars['font-mono']);
    if (vars['border-width']) setBorderWidth(vars['border-width']);
  };

  const reset = () => {
    snap();
    setPrimary('#6366f1'); setDestructive('#ef4444'); setSuccess('#10b981');
    setWarning('#f59e0b'); setInfo('#06b6d4'); setRadius('0.5rem'); setScale(1);
    setCustomColors([]); setFontSans('system-ui, sans-serif');
    setFontMono('ui-monospace, monospace'); setShadows(DEFAULT_SHADOWS);
    setDensity('default'); setEasing('cubic-bezier(0.4, 0, 0.2, 1)');
    setDurations(DEFAULT_DURATIONS); setBorderWidth('1px');
  };

  const addCustomColor = () => {
    if (!newColorName.trim()) return;
    setCustomColors(prev => [...prev, { id: Date.now().toString(), name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName(''); setNewColorHex('#8b5cf6'); setAddingColor(false);
  };

  return (
    <div className="bg-bg text-fg min-h-screen">
      {importOpen && <ImportModal onClose={() => setImportOpen(false)} onImport={importVars} />}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-[52px] max-w-[1500px] items-center gap-3 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-[13px] font-semibold tracking-tight">aura-ui</span>
          </Link>
          <span className="hidden text-sm text-muted-foreground md:block">/ Theme Builder</span>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setImportOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:text-fg sm:flex">
              <Upload className="h-3.5 w-3.5" /> Import
            </button>
            <button onClick={shareUrl}
              className="hidden items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:text-fg sm:flex">
              {sharedCopied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
              {sharedCopied ? 'Copied!' : 'Share'}
            </button>
            <button onClick={copy}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-medium text-primary-foreground hover:opacity-90">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
            <button onClick={() => makeDownload(css, 'aura-theme.css', 'text/css')}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:text-fg">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[1fr_320px]">

        {/* ── Left: showcase ──────────────────────────────────────── */}
        <main className="min-w-0 px-6 py-8 lg:px-10">
          <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Theme Builder</h1>
              <p className="mt-1 text-sm text-muted-foreground">Configure on the right — every component updates live.</p>
            </div>
            <button onClick={() => setSplitView(s => !s)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                splitView ? 'border-primary bg-accent' : 'border-border text-muted-foreground hover:text-fg'
              }`}>
              <Monitor className="h-3.5 w-3.5" />
              {splitView ? 'Single view' : 'Split light/dark'}
            </button>
          </div>

          <section className="mb-10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Live preview</p>
            {splitView ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <LiveShowcase forcedMode="light" />
                <LiveShowcase forcedMode="dark" />
              </div>
            ) : (
              <LiveShowcase />
            )}
          </section>

          <div className="space-y-10">
            {CATEGORIES.map(cat => {
              const items = COMPONENTS.filter(c => c.category === cat);
              if (!items.length) return null;
              return (
                <section key={cat}>
                  <div className="mb-3 flex items-center gap-3">
                    <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">{cat}</h2>
                    <span className="text-[10px] text-muted-foreground/40">{items.length}</span>
                    <div className="h-px flex-1 bg-border/40" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map(c => (
                      <div key={c.slug} className="group flex flex-col rounded-xl border border-border bg-card transition-shadow hover:shadow-sm">
                        <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
                          <span className="text-[12px] font-medium">{c.name}</span>
                          <Link href={`/docs/${c.slug}`} className="text-[10px] text-muted-foreground/50 group-hover:text-primary">Docs →</Link>
                        </div>
                        <div className="flex min-h-[120px] flex-1 items-center justify-center overflow-hidden p-5">
                          <div className="w-full min-w-0">
                            <PreviewBoundary slug={c.slug}>{c.preview()}</PreviewBoundary>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
          <p className="mt-8 text-center text-[11px] text-muted-foreground/40">
            {COMPONENTS.length} components · all react to your theme in real time
          </p>
        </main>

        {/* ── Right: builder panel ─────────────────────────────────── */}
        <aside className="sticky top-[52px] hidden h-[calc(100vh-52px)] overflow-y-auto border-l border-border/50 bg-card/30 lg:block">
          <div className="space-y-0 px-5 py-5">

            <Panel title="Theme presets">
              <div className="grid grid-cols-4 gap-1.5">
                {THEME_PRESETS.map(preset => (
                  <button key={preset.name} onClick={() => applyPreset(preset)} title={preset.name}
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-border p-2.5 text-[9px] font-medium transition-all hover:border-primary hover:bg-accent">
                    <div className="h-5 w-5 rounded-full"
                      style={{ background: preset.primary, boxShadow: `0 0 0 2px ${preset.primary}44` }} />
                    <span className="text-muted-foreground group-hover:text-fg">{preset.name}</span>
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Primary color">
              <ColorRow label="" hex={primary} onChange={setPrimary} presets={ACCENT_PRESETS} onSnap={snap} />
            </Panel>

            <Panel title="Semantic colors" defaultOpen={false}>
              <div className="space-y-3">
                <ColorRow label="Destructive" hex={destructive} onChange={setDestructive} onSnap={snap} />
                <ColorRow label="Success" hex={success} onChange={setSuccess} onSnap={snap} />
                <ColorRow label="Warning" hex={warning} onChange={setWarning} onSnap={snap} />
                <ColorRow label="Info" hex={info} onChange={setInfo} onSnap={snap} />
              </div>
            </Panel>

            <Panel title="Contrast checker" defaultOpen={false}>
              <ContrastChecker primary={primary} destructive={destructive} success={success} warning={warning} info={info} />
            </Panel>

            <Panel title="Custom colors" defaultOpen={false}>
              {customColors.length > 0 && (
                <div className="mb-2 space-y-2">
                  {customColors.map(c => (
                    <div key={c.id} className="flex items-center gap-2">
                      <div className="h-5 w-5 shrink-0 rounded-full border border-border" style={{ background: c.hex }} />
                      <code className="flex-1 truncate font-mono text-[10px] text-muted-foreground">--color-{toKebab(c.name)}</code>
                      <label className="relative h-6 w-6 cursor-pointer overflow-hidden rounded border border-border">
                        <span className="block h-full w-full" style={{ background: c.hex }} />
                        <input type="color" value={c.hex}
                          onChange={e => setCustomColors(prev => prev.map(x => x.id === c.id ? { ...x, hex: e.target.value } : x))}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                      </label>
                      <button onClick={() => setCustomColors(prev => prev.filter(x => x.id !== c.id))}
                        className="text-muted-foreground/40 hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {addingColor ? (
                <div className="space-y-2 rounded-xl border border-border p-3">
                  <input value={newColorName} onChange={e => setNewColorName(e.target.value)}
                    placeholder="Token name (e.g. brand)" autoFocus
                    onKeyDown={e => { if (e.key === 'Enter') addCustomColor(); if (e.key === 'Escape') setAddingColor(false); }}
                    className="h-8 w-full rounded-lg border border-border bg-bg px-2.5 text-[12px] outline-none focus-visible:ring-2 focus-visible:ring-ring/30" />
                  <div className="flex gap-2">
                    <label className="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border">
                      <span className="block h-full w-full" style={{ background: newColorHex }} />
                      <input type="color" value={newColorHex} onChange={e => setNewColorHex(e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                    </label>
                    <button onClick={addCustomColor} disabled={!newColorName.trim()}
                      className="flex-1 rounded-lg bg-primary py-1.5 text-[12px] font-medium text-primary-foreground disabled:opacity-50">Add</button>
                    <button onClick={() => setAddingColor(false)}
                      className="rounded-lg border border-border px-3 text-[12px] text-muted-foreground hover:text-fg">Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setAddingColor(true)}
                  className="flex w-full items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2.5 text-[12px] text-muted-foreground hover:border-primary/40 hover:text-fg">
                  <Plus className="h-3.5 w-3.5" /> Add custom color token
                </button>
              )}
            </Panel>

            <Panel title="Appearance">
              <div className="grid grid-cols-3 gap-1.5">
                {([['light', Sun], ['dark', Moon], ['system', Monitor]] as const).map(([m, Icon]) => (
                  <button key={m} onClick={() => setMode(m === 'system' ? 'system' : m)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-[11px] font-medium capitalize ${
                      (m === 'system' ? resolvedMode !== 'light' && resolvedMode !== 'dark' : resolvedMode === m)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-muted-foreground hover:border-border-strong hover:text-fg'
                    }`}>
                    <Icon className="h-3 w-3" /> {m}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Border radius">
              <div className="grid grid-cols-4 gap-1.5">
                {RADII.map(r => (
                  <button key={r.v} onClick={() => { snap(); setRadius(r.v); }}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-1 py-2.5 text-[9px] font-medium ${
                      radius === r.v ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                    }`}>
                    <span className="h-5 w-5 border-2 border-current" style={{ borderRadius: r.v === '9999px' ? '50%' : r.v }} />
                    {r.name}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Font scale">
              <div className="grid grid-cols-5 gap-1.5">
                {SCALES.map(s => (
                  <button key={s.v} onClick={() => { snap(); setScale(s.v); }}
                    className={`rounded-lg border py-2 text-[10px] font-medium tabular-nums ${
                      scale === s.v ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                    }`}>
                    {s.name}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Typography" defaultOpen={false}>
              <div className="space-y-4">
                <FontPicker label="Sans-serif" value={fontSans} options={FONT_SANS_OPTIONS}
                  onChange={v => { snap(); setFontSans(v); }} />
                <FontPicker label="Monospace" value={fontMono} options={FONT_MONO_OPTIONS}
                  onChange={v => { snap(); setFontMono(v); }} />
              </div>
            </Panel>

            <Panel title="Density" defaultOpen={false}>
              <div className="grid grid-cols-3 gap-1.5">
                {DENSITY_OPTIONS.map(d => (
                  <button key={d.v} onClick={() => { snap(); setDensity(d.v); }}
                    className={`rounded-lg border py-2 text-[11px] font-medium ${
                      density === d.v ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                    }`}>
                    {d.name}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground/60">
                Sets <code className="font-mono">--density</code>: {density === 'compact' ? '0.875' : density === 'relaxed' ? '1.125' : '1'}
              </p>
            </Panel>

            <Panel title="Border width" defaultOpen={false}>
              <div className="grid grid-cols-3 gap-1.5">
                {BORDER_WIDTH_OPTIONS.map(b => (
                  <button key={b.v} onClick={() => { snap(); setBorderWidth(b.v); }}
                    className={`rounded-lg border py-2 text-[11px] font-medium ${
                      borderWidth === b.v ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                    }`}>
                    {b.name}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Shadows" defaultOpen={false}>
              <ShadowEditor shadows={shadows} onChange={setShadows} />
            </Panel>

            <Panel title="Animations" defaultOpen={false}>
              <div className="space-y-3">
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">Easing</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {EASING_OPTIONS.map(e => (
                      <button key={e.value} onClick={() => { snap(); setEasing(e.value); }}
                        className={`rounded-lg border py-1.5 text-[10px] font-medium ${
                          easing === e.value ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                        }`}>
                        {e.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">Duration preset</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {DURATION_PRESETS.map(d => (
                      <button key={d.name} onClick={() => { snap(); setDurations({ fast: d.fast, normal: d.normal, slow: d.slow }); }}
                        className={`rounded-lg border py-1.5 text-[10px] font-medium ${
                          durations.normal === d.normal ? 'border-primary bg-accent' : 'border-border hover:border-border-strong'
                        }`}>
                        {d.name}
                      </button>
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground/60">{durations.fast}ms / {durations.normal}ms / {durations.slow}ms</p>
                </div>
              </div>
            </Panel>

            <Panel title="Generated CSS" defaultOpen={false}>
              <button onClick={() => setCssOpen(o => !o)}
                className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-fg">
                <span>{cssOpen ? 'Hide' : 'Preview full CSS'}</span>
                <span className="font-mono text-[10px]">{css.split('\n').length} lines</span>
              </button>
              {cssOpen && (
                <pre className="max-h-[260px] overflow-y-auto rounded-xl border border-border bg-[#0d1117] p-3 font-mono text-[10px] leading-relaxed text-[#c9d1d9]">
                  {css}
                </pre>
              )}
            </Panel>

            <Panel title="Tailwind config" defaultOpen={false}>
              <button onClick={() => setTwOpen(o => !o)}
                className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-fg">
                <span>{twOpen ? 'Hide' : 'Preview tailwind.config.js'}</span>
              </button>
              {twOpen && (
                <>
                  <pre className="max-h-[260px] overflow-y-auto rounded-xl border border-border bg-[#0d1117] p-3 font-mono text-[10px] leading-relaxed text-[#c9d1d9]">
                    {twConfig}
                  </pre>
                  <button onClick={() => makeDownload(twConfig, 'tailwind.config.js', 'text/javascript')}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-fg">
                    <Download className="h-3.5 w-3.5" /> Download tailwind.config.js
                  </button>
                </>
              )}
            </Panel>

          </div>

          {/* Sticky footer */}
          <div className="sticky bottom-0 flex gap-2 border-t border-border bg-card/95 px-5 py-3 backdrop-blur-md">
            <Button variant="outline" size="sm" onClick={undo} disabled={!canUndo} className="gap-1.5 px-3" title="Undo last change">
              <Undo2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="sm" onClick={reset} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
            <Button size="sm" onClick={copy} className="flex-1 gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'CSS'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => makeDownload(css, 'aura-theme.css', 'text/css')} className="gap-1.5 px-3">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
