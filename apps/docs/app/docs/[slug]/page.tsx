'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Check, Copy, ArrowUpRight } from '@aura-ui/icons';
import { COMPONENTS, HOOKS, PACKAGES, type ComponentEntry } from '../../../lib/registry';
import { API } from '../../../lib/api-data';

const STATIC: Record<string, () => React.ReactNode> = {
  introduction: () => null,
  'getting-started': GettingStarted,
  accessibility: AccessibilityPage,
  hooks: HooksPage,
  packages: PackagesPage,
};

export default function DocPage() {
  const params = useParams();
  const slug = String(params.slug);

  if (slug === 'introduction') {
    if (typeof window !== 'undefined') window.location.replace('/docs');
    return null;
  }

  const Static = STATIC[slug];
  if (Static) return <Static />;

  const entry = COMPONENTS.find((c) => c.slug === slug);
  if (!entry) return notFound();
  return <ComponentDoc entry={entry} />;
}

/* ── Component doc ──────────────────────────────────────────────────── */

function ComponentDoc({ entry }: { entry: ComponentEntry }) {
  const api = entry.api ?? API[entry.slug];
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-primary text-xs font-semibold uppercase tracking-widest">
        {entry.category}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{entry.name}</h1>
      <p className="text-muted-foreground mt-3 text-base">{entry.description}</p>

      {/* Preview + code */}
      <PreviewBlock title="Basic usage" preview={entry.preview} code={entry.code} />

      {entry.examples && entry.examples.length > 0 && (
        <Section title="Examples">
          <div className="grid gap-8">
            {entry.examples.map((example) => (
              <PreviewBlock
                key={example.title}
                title={example.title}
                description={example.description}
                preview={example.preview}
                code={example.code}
                compact
              />
            ))}
          </div>
        </Section>
      )}

      {/* Features */}
      {entry.features.length > 0 && (
        <Section title="Features">
          <ul className="grid gap-2 sm:grid-cols-2">
            {entry.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="bg-success/15 text-success mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Installation */}
      <Section title="Installation">
        <CodeBlock code={`npx aura-ui add ${entry.slug}`} lang="bash" />
      </Section>

      {/* Anatomy */}
      {entry.anatomy && (
        <Section title="Anatomy">
          <p className="text-muted-foreground mb-2 text-sm">
            Import the parts and compose them together.
          </p>
          <CodeBlock code={entry.anatomy} lang="tsx" />
        </Section>
      )}

      {/* API Reference */}
      {api && api.length > 0 && (
        <Section title="API Reference">
          {api.map((part) => (
            <div key={part.name} className="mb-6">
              <h3 className="text-sm font-semibold">{part.name}</h3>
              <p className="text-muted-foreground mb-2 text-sm">{part.description}</p>
              <div className="border-border overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Prop</th>
                      <th className="px-3 py-2 font-medium">Type</th>
                      <th className="px-3 py-2 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {part.props.map((p) => (
                      <tr key={p.name} className="border-border/60 border-t align-top">
                        <td className="px-3 py-2 font-mono font-medium">{p.name}</td>
                        <td className="px-3 py-2">
                          <code className="bg-muted rounded px-1 py-0.5 font-mono text-[11px]">
                            {p.type}
                          </code>
                          <p className="text-muted-foreground mt-1">{p.description}</p>
                        </td>
                        <td className="text-muted-foreground px-3 py-2 font-mono">
                          {p.default ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Accessibility / Keyboard */}
      {entry.keyboard && entry.keyboard.length > 0 && (
        <Section title="Keyboard interactions">
          {entry.ariaPattern && (
            <p className="text-muted-foreground mb-2 text-sm">
              Adheres to the{' '}
              <a
                href={entry.ariaPattern}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                WAI-ARIA design pattern <ArrowUpRight className="inline h-3 w-3" />
              </a>
              .
            </p>
          )}
          <div className="border-border overflow-hidden rounded-lg border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Key</th>
                  <th className="px-3 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {entry.keyboard.map((k) => (
                  <tr key={k.key} className="border-border/60 border-t">
                    <td className="px-3 py-2">
                      <kbd className="border-border bg-muted rounded border px-1.5 py-0.5 font-mono text-[11px]">
                        {k.key}
                      </kbd>
                    </td>
                    <td className="text-muted-foreground px-3 py-2">{k.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <Footer />
    </article>
  );
}

/* ── Preview block with Preview / Code tabs ─────────────────────────── */

function PreviewBlock({
  title,
  description,
  preview,
  code,
  compact = false,
}: {
  title?: string;
  description?: string;
  preview: () => React.ReactNode;
  code: string;
  compact?: boolean;
}) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  return (
    <div className={compact ? '' : 'mt-8'}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? <p className="text-muted-foreground mt-1 text-sm">{description}</p> : null}
        </div>
      )}
      <div className="border-border flex items-center gap-1 border-b">
        {(['preview', 'code'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-3 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t ? 'text-fg' : 'text-muted-foreground hover:text-fg'
            }`}
          >
            {t}
            {tab === t && (
              <span className="bg-primary absolute inset-x-0 -bottom-px h-0.5 rounded-full" />
            )}
          </button>
        ))}
      </div>
      {tab === 'preview' ? (
        <div
          className={`border-border from-accent/20 min-w-0 overflow-hidden rounded-b-xl border border-t-0 bg-gradient-to-br to-transparent ${
            compact ? 'min-h-[180px] p-6' : 'min-h-[240px] p-10'
          }`}
        >
          <div className="flex w-full min-w-0 items-center justify-center">{preview()}</div>
        </div>
      ) : (
        <CodeBlock code={code} lang="tsx" rounded="bottom" />
      )}
    </div>
  );
}

/* ── Code block with copy ───────────────────────────────────────────── */

function CodeBlock({
  code,
  lang,
  rounded = 'all',
}: {
  code: string;
  lang: string;
  rounded?: 'all' | 'bottom';
}) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      void e;
    }
  };
  return (
    <div
      className={`border-border group relative border bg-[#0d1117] ${
        rounded === 'bottom' ? 'rounded-b-xl border-t-0' : 'rounded-lg'
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-mono text-[11px] text-white/40">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/90"
        >
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Footer() {
  return (
    <div className="border-border mt-14 flex items-center justify-between border-t pt-6 text-sm">
      <Link href="/docs" className="text-muted-foreground hover:text-fg transition-colors">
        ← Back to docs
      </Link>
      <a
        href="https://github.com/your-org/aura-ui"
        target="_blank"
        rel="noreferrer"
        className="text-muted-foreground hover:text-fg transition-colors"
      >
        Edit on GitHub <ArrowUpRight className="inline h-3 w-3" />
      </a>
    </div>
  );
}

/* ── Static pages ───────────────────────────────────────────────────── */

function GettingStarted() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-primary text-xs font-semibold uppercase tracking-widest">Overview</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Getting started</h1>
      <p className="text-muted-foreground mt-3 text-base">
        Install aura-ui and render your first component.
      </p>

      <Section title="1. Install">
        <CodeBlock code={`pnpm add @aura-ui/styled @aura-ui/themes`} lang="bash" />
      </Section>

      <Section title="2. Add the Tailwind preset">
        <CodeBlock
          code={`// tailwind.config.ts
import preset from '@aura-ui/styled/tailwind-preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
};`}
          lang="ts"
        />
      </Section>

      <Section title="3. Wrap your app in ThemeProvider">
        <CodeBlock
          code={`import { ThemeProvider } from '@aura-ui/themes';

export default function App({ children }) {
  return <ThemeProvider defaultTheme="slate">{children}</ThemeProvider>;
}`}
          lang="tsx"
        />
      </Section>

      <Section title="4. Use a component">
        <CodeBlock
          code={`import { Button } from '@aura-ui/styled';

export default function Page() {
  return <Button>Hello aura-ui</Button>;
}`}
          lang="tsx"
        />
      </Section>

      <Section title="Or use the CLI">
        <p className="text-muted-foreground mb-2 text-sm">
          Scaffold a project and copy component source directly into your codebase.
        </p>
        <CodeBlock code={`npx aura-ui init\nnpx aura-ui add button dialog select`} lang="bash" />
      </Section>
      <Footer />
    </article>
  );
}

function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-primary text-xs font-semibold uppercase tracking-widest">Overview</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Accessibility</h1>
      <p className="text-muted-foreground mt-3 text-base">
        Every component follows the WAI-ARIA Authoring Practices Guide.
      </p>
      <Section title="What you get for free">
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>• Correct roles, states and properties on every element.</li>
          <li>• Full keyboard navigation — every interaction is reachable without a mouse.</li>
          <li>• Focus management — trapping, restoration and roving tabindex where appropriate.</li>
          <li>• Screen-reader announcements via Title/Description parts.</li>
          <li>
            • <code className="bg-muted rounded px-1">:focus-visible</code> rings, never removed.
          </li>
          <li>
            • <code className="bg-muted rounded px-1">prefers-reduced-motion</code> respected by all
            animations.
          </li>
        </ul>
      </Section>
      <Footer />
    </article>
  );
}

function HooksPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-primary text-xs font-semibold uppercase tracking-widest">@aura-ui/hooks</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Hooks</h1>
      <p className="text-muted-foreground mt-3 text-base">
        24 reusable, SSR-safe, tree-shakeable React hooks. Import only what you use.
      </p>
      <div className="border-border mt-8 overflow-hidden rounded-lg border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Hook</th>
              <th className="px-3 py-2 font-medium">Signature</th>
              <th className="px-3 py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {HOOKS.map((h) => (
              <tr key={h.name} className="border-border/60 border-t align-top">
                <td className="text-primary px-3 py-2 font-mono font-medium">{h.name}</td>
                <td className="text-muted-foreground px-3 py-2 font-mono text-[11px]">
                  {h.signature}
                </td>
                <td className="text-muted-foreground px-3 py-2">{h.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </article>
  );
}

function PackagesPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-primary text-xs font-semibold uppercase tracking-widest">Monorepo</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Packages</h1>
      <p className="text-muted-foreground mt-3 text-base">
        Nine focused, independently-versioned packages. Use one, or all of them.
      </p>
      <div className="mt-8 grid gap-3">
        {PACKAGES.map((p) => (
          <div key={p.name} className="border-border bg-card rounded-xl border p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-primary font-mono text-sm font-semibold">{p.name}</h3>
              <code className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[11px]">
                {p.install}
              </code>
            </div>
            <p className="text-muted-foreground mt-1.5 text-sm">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.highlights.map((h) => (
                <span
                  key={h}
                  className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[11px]"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </article>
  );
}
