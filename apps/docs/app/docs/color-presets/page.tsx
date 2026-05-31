'use client';

import * as React from 'react';
import { Check, Copy } from '@structyl/icons';
import {
  COLOR_PRESETS,
  useColorPreset,
  createColorPreset,
} from '@structyl/themes';

/* ── Shared primitives ───────────────────────────────────────────────────── */

function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-mono text-[11px] text-white/40">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/90">
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed">
        <code className="font-mono text-[#c9d1d9]">{code}</code>
      </pre>
    </div>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-3 mt-12 scroll-mt-20 text-xl font-semibold tracking-tight">{children}</h2>;
}

function SubHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="mb-2 mt-8 scroll-mt-20 text-base font-semibold">{children}</h3>;
}

function PropRow({ name, type, def, desc }: { name: string; type: string; def?: string; desc: string }) {
  return (
    <tr className="border-b border-border/50">
      <td className="py-2.5 pr-4 font-mono text-[12px] text-primary">{name}</td>
      <td className="py-2.5 pr-4 font-mono text-[12px] text-muted-foreground">{type}</td>
      <td className="py-2.5 pr-4 font-mono text-[12px] text-muted-foreground">{def ?? '—'}</td>
      <td className="py-2.5 text-[13px] text-muted-foreground">{desc}</td>
    </tr>
  );
}

/* ── Live demos ──────────────────────────────────────────────────────────── */

function BuiltInPresetsDemo() {
  const { activeId, setPreset, clearPreset } = useColorPreset();
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="mb-4 text-sm text-muted-foreground">Click a preset — every primary-color token on this page updates live.</p>
      <div className="flex flex-wrap gap-3">
        {COLOR_PRESETS.map(({ id, name, hex }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => setPreset(id, hex)}
              className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-muted/50"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all"
                style={{
                  background: hex,
                  boxShadow: isActive ? `0 0 0 2px white, 0 0 0 3.5px ${hex}` : undefined,
                  transform: isActive ? 'scale(1.15)' : undefined,
                }}
              >
                {isActive && <Check className="h-4 w-4" />}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">{name}</span>
            </button>
          );
        })}
      </div>
      {activeId && (
        <button
          onClick={clearPreset}
          className="mt-4 rounded-lg border border-border/60 px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-border hover:text-fg"
        >
          Reset to default
        </button>
      )}
      <div className="mt-5 flex gap-2">
        <div className="rounded-lg bg-primary px-4 py-1.5 text-[12px] font-medium text-primary-foreground">Primary button</div>
        <div className="rounded-lg border border-primary px-4 py-1.5 text-[12px] font-medium text-primary">Outline button</div>
        <div className="rounded-lg bg-muted px-4 py-1.5 text-[12px] font-medium text-muted-foreground">Muted button</div>
      </div>
    </div>
  );
}

function CustomPresetDemo() {
  const brandPreset = React.useMemo(() => createColorPreset('brand', 'Brand', '#ff5500'), []);
  const { activeId, setPreset, clearPreset } = useColorPreset({ extraPresets: [brandPreset] });
  const isActive = activeId === 'brand';
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="mb-4 text-sm text-muted-foreground">
        A custom <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">#ff5500</code> preset created with <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">createColorPreset</code>.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => isActive ? clearPreset() : setPreset(brandPreset.id, brandPreset.hex)}
          className="flex items-center gap-2.5 rounded-xl border border-border px-4 py-2 transition-colors hover:bg-muted/50"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-white text-[11px]"
            style={{ background: brandPreset.hex, boxShadow: isActive ? `0 0 0 2px white, 0 0 0 3px ${brandPreset.hex}` : undefined }}
          >
            {isActive && <Check className="h-3.5 w-3.5" />}
          </span>
          <span className="text-[13px] font-medium">{isActive ? 'Active — click to reset' : 'Apply Brand Orange'}</span>
        </button>
      </div>
      {isActive && (
        <div className="mt-4 flex gap-2">
          <div className="rounded-lg bg-primary px-4 py-1.5 text-[12px] font-medium text-primary-foreground">Primary</div>
          <div className="rounded-lg border border-primary px-4 py-1.5 text-[12px] font-medium text-primary">Outline</div>
        </div>
      )}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ColorPresetsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">@structyl/themes</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Color Presets</h1>
        <p className="text-lg text-muted-foreground">
          10 built-in accent presets that override the primary color tokens at runtime — no theme rebuild needed. Extend with your own brand colors.
        </p>
      </div>

      {/* Install */}
      <CodeBlock lang="bash" code="pnpm add @structyl/themes" />

      {/* ── Built-in presets ── */}
      <SectionHeading id="built-in-presets">Built-in presets</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">COLOR_PRESETS</code> is a typed <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">as const</code> array of all 10 built-in accent colors. Import it for rendering your own picker UI.
      </p>
      <CodeBlock code={`import { COLOR_PRESETS } from '@structyl/themes';

// [
//   { id: 'structyl',   name: 'Structyl',   hex: '#5754a3' },
//   { id: 'indigo', name: 'Indigo', hex: '#6366f1' },
//   { id: 'ocean',  name: 'Ocean',  hex: '#0284c7' },
//   { id: 'rose',   name: 'Rose',   hex: '#e11d48' },
//   { id: 'forest', name: 'Forest', hex: '#16a34a' },
//   { id: 'sunset', name: 'Sunset', hex: '#f97316' },
//   { id: 'violet', name: 'Violet', hex: '#7c3aed' },
//   { id: 'slate',  name: 'Slate',  hex: '#475569' },
//   { id: 'ember',  name: 'Ember',  hex: '#be123c' },
//   { id: 'zinc',   name: 'Zinc',   hex: '#71717a' },
// ]`} />

      {/* ── useColorPreset ── */}
      <SectionHeading id="use-color-preset">useColorPreset</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        The primary way to work with presets in React. Must be used inside a <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">ThemeProvider</code>. Persists the selection to <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">localStorage</code> and automatically re-applies the preset after every theme or color-mode change.
      </p>

      <div className="mb-4">
        <BuiltInPresetsDemo />
      </div>

      <CodeBlock code={`'use client';
import { useColorPreset, COLOR_PRESETS } from '@structyl/themes';

function AccentPicker() {
  const { activeId, setPreset, clearPreset } = useColorPreset();

  return (
    <div className="flex gap-2">
      {COLOR_PRESETS.map(({ id, name, hex }) => (
        <button
          key={id}
          onClick={() => setPreset(id, hex)}
          title={name}
          style={{ background: hex }}
          className="h-7 w-7 rounded-full"
          aria-pressed={activeId === id}
        />
      ))}
      {activeId && (
        <button onClick={clearPreset}>Reset</button>
      )}
    </div>
  );
}`} />

      <SubHeading id="options">Options</SubHeading>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Option</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Default</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="px-3">
            <PropRow name="extraPresets" type="ColorPreset[]" def="[]" desc="Additional presets to add on top of the 10 built-ins. Built-ins always come first." />
            <PropRow name="storageKey" type="string" def="'structyl-color-preset'" desc="localStorage key used to persist the active preset. Override when you need multiple independent pickers on the same origin." />
          </tbody>
        </table>
      </div>

      <SubHeading id="return-value">Return value</SubHeading>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Property</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="px-3">
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4 font-mono text-[12px] text-primary">presets</td>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-muted-foreground">ColorPreset[]</td>
              <td className="py-2.5 text-[13px] text-muted-foreground">All available presets (built-ins + extraPresets).</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4 font-mono text-[12px] text-primary">activeId</td>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-muted-foreground">string | null</td>
              <td className="py-2.5 text-[13px] text-muted-foreground">ID of the active preset, or null when using the default theme.</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4 font-mono text-[12px] text-primary">activePreset</td>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-muted-foreground">ColorPreset | null</td>
              <td className="py-2.5 text-[13px] text-muted-foreground">Full preset object for the active ID.</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4 font-mono text-[12px] text-primary">setPreset</td>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-muted-foreground">(id, hex) =&gt; void</td>
              <td className="py-2.5 text-[13px] text-muted-foreground">Apply a preset — updates CSS vars and persists to localStorage.</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4 font-mono text-[12px] text-primary">clearPreset</td>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-muted-foreground">() =&gt; void</td>
              <td className="py-2.5 text-[13px] text-muted-foreground">Remove the override and restore the base theme&apos;s primary colors.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── createColorPreset ── */}
      <SectionHeading id="create-color-preset">createColorPreset</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Factory for creating typed preset objects. Pass the result to <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">extraPresets</code> in <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">useColorPreset</code>.
      </p>

      <div className="mb-4">
        <CustomPresetDemo />
      </div>

      <CodeBlock code={`import { createColorPreset, useColorPreset } from '@structyl/themes';

const brandPreset = createColorPreset('brand', 'Brand Blue', '#1a6cf0');
const seasonalPreset = createColorPreset('holiday', 'Holiday Red', '#c0392b');

function MyPicker() {
  const { presets, activeId, setPreset, clearPreset } = useColorPreset({
    extraPresets: [brandPreset, seasonalPreset],
  });
  // presets = [...COLOR_PRESETS, brandPreset, seasonalPreset]
}`} />

      {/* ── Imperative API ── */}
      <SectionHeading id="imperative-api">Imperative API</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Use these utilities outside of React (e.g. in event handlers, server actions, or non-React contexts). Both are no-ops in SSR environments.
      </p>
      <CodeBlock code={`import { applyColorPreset, clearColorPreset } from '@structyl/themes';

// Apply any hex color as the primary accent
applyColorPreset('#6366f1');
// Sets --color-primary, --color-ring, --color-primary-hover,
//       --color-primary-active, --color-primary-fg on <html>

// Remove the override, restoring the active theme's base colors
clearColorPreset();`} />

      {/* ── Types ── */}
      <SectionHeading id="types">Types</SectionHeading>
      <CodeBlock lang="ts" code={`import type { ColorPreset, ColorPresetId } from '@structyl/themes';

// Interface for any preset object (built-in or custom)
interface ColorPreset {
  id: string;
  name: string;
  hex: string;
}

// Union of all built-in preset IDs
type ColorPresetId =
  | 'structyl' | 'indigo' | 'ocean' | 'rose' | 'forest'
  | 'sunset' | 'violet' | 'slate' | 'ember' | 'zinc';`} />

      {/* ── Next.js note ── */}
      <SectionHeading id="nextjs">Next.js App Router</SectionHeading>
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
        <p className="text-sm font-medium text-warning">Client Component required</p>
        <p className="mt-1 text-sm text-muted-foreground">
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">useColorPreset</code> uses React state and effects, so any component that calls it must be marked <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">&apos;use client&apos;</code>. The imperative <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">applyColorPreset</code> / <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">clearColorPreset</code> functions are safe to import from any module — they guard against SSR automatically.
        </p>
      </div>
      <CodeBlock code={`'use client'; // required

import { useColorPreset } from '@structyl/themes';

export function AccentPicker() {
  const { activeId, setPreset } = useColorPreset();
  // ...
}`} />

      {/* ── How it works ── */}
      <SectionHeading id="how-it-works">How it works</SectionHeading>
      <p className="mb-3 text-sm text-muted-foreground">
        Presets work by overriding five CSS custom properties on <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">document.documentElement</code> after the <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">ThemeProvider</code> applies its base tokens:
      </p>
      <CodeBlock lang="css" code={`/* Applied by applyColorPreset('#6366f1') */
:root {
  --color-primary:        239 84% 67%;
  --color-ring:           239 84% 67%;
  --color-primary-hover:  239 84% 73%;
  --color-primary-active: 239 84% 59%;
  --color-primary-fg:     0 0% 100%;   /* white or dark, auto-calculated via WCAG */
}`} />
      <p className="mt-3 text-sm text-muted-foreground">
        Because <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">useColorPreset</code> watches <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">theme</code> and <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">resolvedMode</code> from <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">useTheme</code>, it automatically re-applies the override whenever the user switches themes or color modes — the base theme resets first, then the preset overwrites the five primary vars.
      </p>
    </div>
  );
}
