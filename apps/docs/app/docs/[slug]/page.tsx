'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Check,
  Copy,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Monitor,
  Tablet,
  Smartphone,
  Star,
  Heart,
  Home,
  Settings,
  Bell,
  Search,
  User,
  Mail,
  ChevronDown,
} from '@aura-ui/icons';
import { COMPONENTS, HOOKS, PACKAGES, type ComponentEntry } from '../../../lib/registry';
import { API } from '../../../lib/api-data';

/* ── Status styles ───────────────────────────────────────────────────── */

const STATUS_STYLES: Record<string, string> = {
  stable: 'bg-emerald-500/10 text-emerald-600',
  beta: 'bg-amber-500/10 text-amber-600',
  new: 'bg-blue-500/10 text-blue-500',
  deprecated: 'bg-red-500/10 text-red-500',
};

/* ── Static pages map ────────────────────────────────────────────────── */

const STATIC: Record<string, () => React.ReactNode> = {
  introduction: () => null,
  'getting-started': GettingStarted,
  accessibility: AccessibilityPage,
  hooks: HooksPage,
  packages: PackagesPage,
};

/* ── Entry point ─────────────────────────────────────────────────────── */

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

/* ── Component doc ───────────────────────────────────────────────────── */

type TocItem = { id: string; title: string };

function ComponentDoc({ entry }: { entry: ComponentEntry }) {
  const api = entry.api ?? API[entry.slug];
  const idx = COMPONENTS.findIndex((c) => c.slug === entry.slug);
  const prev = idx > 0 ? (COMPONENTS[idx - 1] ?? null) : null;
  const next = idx < COMPONENTS.length - 1 ? (COMPONENTS[idx + 1] ?? null) : null;
  const [activeId, setActiveId] = React.useState('overview');

  const toc: TocItem[] = [
    { id: 'overview', title: 'Overview' },
    ...(entry.examples?.length ? [{ id: 'examples', title: 'Examples' }] : []),
    ...(entry.features.length ? [{ id: 'features', title: 'Features' }] : []),
    { id: 'installation', title: 'Installation' },
    ...(entry.anatomy ? [{ id: 'anatomy', title: 'Anatomy' }] : []),
    ...(api?.length ? [{ id: 'api-reference', title: 'API Reference' }] : []),
    ...(entry.keyboard?.length
      ? [{ id: 'keyboard-interactions', title: 'Keyboard interactions' }]
      : []),
  ];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-10% 0px -75% 0px' },
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.slug]);

  return (
    <div className="flex gap-12">
      {/* ── Main content ──────────────────────────────────────────── */}
      <article className="min-w-0 flex-1">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Link href="/docs" className="transition-colors hover:text-fg">
            Docs
          </Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span>{entry.category}</span>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span className="font-medium text-fg">{entry.name}</span>
        </nav>

        {/* Title + status badge */}
        <div id="overview" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">{entry.name}</h1>
            <StatusBadge status={((entry as unknown) as Record<string, unknown>).status as string ?? 'stable'} />
          </div>
          <p className="mt-3 text-base text-muted-foreground">{entry.description}</p>
          <PreviewBlock title="Basic usage" preview={entry.preview} code={entry.code} />
        </div>

        {/* Examples */}
        {entry.examples && entry.examples.length > 0 && (
          <Section id="examples" title="Examples">
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
          <Section id="features" title="Features">
            <ul className="grid gap-2 sm:grid-cols-2">
              {entry.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Installation */}
        <Section id="installation" title="Installation">
          <InstallBlock slug={entry.slug} />
        </Section>

        {/* Anatomy */}
        {entry.anatomy && (
          <Section id="anatomy" title="Anatomy">
            <p className="mb-2 text-sm text-muted-foreground">
              Import the parts and compose them together.
            </p>
            <CodeBlock code={entry.anatomy} lang="tsx" />
          </Section>
        )}

        {/* API Reference */}
        {api && api.length > 0 && (
          <Section id="api-reference" title="API Reference">
            {api.map((part) => (
              <div key={part.name} className="mb-6">
                <h3 className="text-sm font-semibold">{part.name}</h3>
                <p className="mb-2 text-sm text-muted-foreground">{part.description}</p>
                <div className="overflow-hidden rounded-lg border border-border">
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
                        <tr key={p.name} className="border-t border-border/60 align-top">
                          <td className="px-3 py-2 font-mono font-medium">{p.name}</td>
                          <td className="px-3 py-2">
                            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                              {p.type}
                            </code>
                            <p className="mt-1 text-muted-foreground">{p.description}</p>
                          </td>
                          <td className="px-3 py-2 font-mono text-muted-foreground">
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

        {/* Keyboard interactions */}
        {entry.keyboard && entry.keyboard.length > 0 && (
          <Section id="keyboard-interactions" title="Keyboard interactions">
            {entry.ariaPattern && (
              <p className="mb-2 text-sm text-muted-foreground">
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
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Key</th>
                    <th className="px-3 py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.keyboard.map((k) => (
                    <tr key={k.key} className="border-t border-border/60">
                      <td className="px-3 py-2">
                        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                          {k.key}
                        </kbd>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{k.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        <NavFooter prev={prev} next={next} />
      </article>

      {/* ── Table of contents ─────────────────────────────────────── */}
      {toc.length > 2 && (
        <aside className="hidden w-[180px] shrink-0 xl:block">
          <div className="sticky top-[76px]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              On this page
            </p>
            <nav className="space-y-0.5">
              {toc.map(({ id, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block border-l-2 py-1 pl-3 text-[12px] transition-colors ${
                    activeId === id
                      ? 'border-primary font-medium text-primary'
                      : 'border-transparent text-muted-foreground hover:text-fg'
                  }`}
                >
                  {title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}

/* ── Status badge ────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const s = status in STATUS_STYLES ? status : 'stable';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${STATUS_STYLES[s]}`}
    >
      {s}
    </span>
  );
}

/* ── Install block ───────────────────────────────────────────────────── */

type PM = 'pnpm' | 'npm' | 'yarn' | 'bun';
const PMS: PM[] = ['pnpm', 'npm', 'yarn', 'bun'];

function InstallBlock({ slug }: { slug: string }) {
  const [pm, setPm] = React.useState<PM>('pnpm');
  const cmds: Record<PM, string> = {
    pnpm: `pnpm dlx aura-ui add ${slug}`,
    npm: `npx aura-ui add ${slug}`,
    yarn: `yarn dlx aura-ui add ${slug}`,
    bun: `bunx aura-ui add ${slug}`,
  };
  return (
    <div>
      <div className="mb-2 flex items-center gap-0.5">
        {PMS.map((p) => (
          <button
            key={p}
            onClick={() => setPm(p)}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
              pm === p
                ? 'bg-accent text-fg'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-fg'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <CodeBlock code={cmds[pm]} lang="bash" />
    </div>
  );
}

/* ── Preview block with responsive viewport toggle ───────────────────── */

type Viewport = 'full' | 'tablet' | 'mobile';
const VP_ICONS = { full: Monitor, tablet: Tablet, mobile: Smartphone } as const;
const VP_MAX: Record<Viewport, string> = { full: '100%', tablet: '768px', mobile: '375px' };

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
  const [viewport, setViewport] = React.useState<Viewport>('full');

  return (
    <div className={compact ? '' : 'mt-8'}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center border-b border-border">
        <div className="flex items-center gap-1">
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
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Viewport toggles */}
        {tab === 'preview' && (
          <div className="ml-auto flex items-center gap-0.5 pr-1">
            {(['full', 'tablet', 'mobile'] as Viewport[]).map((v) => {
              const Icon = VP_ICONS[v];
              return (
                <button
                  key={v}
                  onClick={() => setViewport(v)}
                  title={v}
                  className={`rounded p-1.5 transition-colors ${
                    viewport === v
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-fg'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {tab === 'preview' ? (
        <div
          className={`overflow-hidden rounded-b-xl border border-t-0 border-border bg-gradient-to-br from-accent/20 to-transparent ${
            compact ? 'min-h-[180px] p-6' : 'min-h-[240px] p-10'
          }`}
        >
          <div
            className="mx-auto transition-all duration-300"
            style={{ maxWidth: VP_MAX[viewport] }}
          >
            <div className="flex w-full items-center justify-center">{preview()}</div>
          </div>
        </div>
      ) : (
        <CodeBlock code={code} lang="tsx" rounded="bottom" />
      )}
    </div>
  );
}

/* ── Code block ──────────────────────────────────────────────────────── */

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
      className={`relative border border-border bg-[#0d1117] ${
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

/* ── Section ─────────────────────────────────────────────────────────── */

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`mt-10 ${id ? 'scroll-mt-20' : ''}`}>
      <h2 className="mb-3 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

/* ── Prev / Next + Edit on GitHub ────────────────────────────────────── */

function NavFooter({ prev, next }: { prev: ComponentEntry | null; next: ComponentEntry | null }) {
  return (
    <div className="mt-14 space-y-6">
      <div className="flex justify-end">
        <a
          href="https://github.com/your-org/aura-ui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      {(prev || next) && (
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="group flex flex-col rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent/30"
            >
              <span className="mb-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                <ChevronLeft className="h-3 w-3" /> Previous
              </span>
              <span className="text-[13px] font-medium transition-colors group-hover:text-primary">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group flex flex-col rounded-xl border border-border p-4 text-right transition-colors hover:border-primary/40 hover:bg-accent/30"
            >
              <span className="mb-1 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                Next <ChevronRight className="h-3 w-3" />
              </span>
              <span className="text-[13px] font-medium transition-colors group-hover:text-primary">
                {next.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}

/* ── Static pages ────────────────────────────────────────────────────── */

function GettingStarted() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Overview</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Getting started</h1>
      <p className="mt-3 text-base text-muted-foreground">
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
        <p className="mb-2 text-sm text-muted-foreground">
          Scaffold a project and copy component source directly into your codebase.
        </p>
        <CodeBlock code={`npx aura-ui init\nnpx aura-ui add button dialog select`} lang="bash" />
      </Section>

      <div className="mt-14 flex justify-end">
        <a
          href="https://github.com/your-org/aura-ui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Overview</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Accessibility</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Every component follows the WAI-ARIA Authoring Practices Guide.
      </p>
      <Section title="What you get for free">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Correct roles, states and properties on every element.</li>
          <li>• Full keyboard navigation — every interaction is reachable without a mouse.</li>
          <li>• Focus management — trapping, restoration and roving tabindex where appropriate.</li>
          <li>• Screen-reader announcements via Title/Description parts.</li>
          <li>
            • <code className="rounded bg-muted px-1">:focus-visible</code> rings, never removed.
          </li>
          <li>
            • <code className="rounded bg-muted px-1">prefers-reduced-motion</code> respected by
            all animations.
          </li>
        </ul>
      </Section>
      <div className="mt-14 flex justify-end">
        <a
          href="https://github.com/your-org/aura-ui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function HooksPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        @aura-ui/hooks
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Hooks</h1>
      <p className="mt-3 text-base text-muted-foreground">
        24 reusable, SSR-safe, tree-shakeable React hooks. Import only what you use.
      </p>
      <div className="mt-8 overflow-hidden rounded-lg border border-border">
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
              <tr key={h.name} className="border-t border-border/60 align-top">
                <td className="px-3 py-2 font-mono font-medium text-primary">{h.name}</td>
                <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">
                  {h.signature}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{h.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-14 flex justify-end">
        <a
          href="https://github.com/your-org/aura-ui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

/* ── Package page supplementary data ─────────────────────────────────── */

type PkgExtra = {
  stats: { label: string; value: string }[];
  code: string;
  lang: string;
  exports: string[];
  preview?: () => React.ReactNode;
};

const SAMPLE_ICONS = [Star, Heart, Home, Settings, Bell, Search, User, Mail] as const;

const PKG_EXTRA: Record<string, PkgExtra> = {
  '@aura-ui/core': {
    stats: [{ label: 'Bundle', value: '~8 kB' }, { label: 'Exports', value: '12' }, { label: 'Deps', value: '1' }],
    code: `import { Slot, Primitive } from '@aura-ui/core';\n\n// Render any element while keeping behavior\nconst Button = React.forwardRef(({ asChild, ...props }, ref) => {\n  const Comp = asChild ? Slot : 'button';\n  return <Comp ref={ref} {...props} />;\n});`,
    lang: 'tsx',
    exports: ['Slot', 'Primitive', 'Portal', 'Presence', 'FocusScope', 'DismissableLayer', 'RovingFocusGroup', 'Popper', 'createContext', 'composeRefs', 'useId', 'useControllableState'],
  },
  '@aura-ui/hooks': {
    stats: [{ label: 'Bundle', value: '~3 kB' }, { label: 'Hooks', value: '24' }, { label: 'Deps', value: '0' }],
    code: `import { useBoolean, useDebounce, useHotkeys } from '@aura-ui/hooks';\n\nconst { value: open, on, off } = useBoolean(false);\nconst debouncedQuery = useDebounce(query, 300);\nuseHotkeys('mod+k', () => setOpen(true));`,
    lang: 'ts',
    exports: ['useBoolean', 'useToggle', 'useCounter', 'usePrevious', 'useDebounce', 'useThrottle', 'useLocalStorage', 'useCopyToClipboard', 'useMediaQuery', 'useDarkMode', 'useWindowSize', 'useClickOutside', 'useEventListener', 'useKeyPress', 'useHotkeys', 'useMount', 'useUnmount', 'useUpdateEffect', 'useId', 'useLatest', 'useCallbackRef', 'useComposedRefs', 'useControllableState', 'useIsomorphicLayoutEffect'],
    preview: () => {
      const [n, setN] = React.useState(0);
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setN(c => c - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-fg">−</button>
            <span className="w-12 text-center font-mono text-2xl font-bold">{n}</span>
            <button onClick={() => setN(c => c + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-fg">+</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Live — useCounter hook</p>
        </div>
      );
    },
  },
  '@aura-ui/utils': {
    stats: [{ label: 'Bundle', value: '<1.5 kB' }, { label: 'Exports', value: '15' }, { label: 'Side effects', value: 'none' }],
    code: `import { cn, composeEventHandlers } from '@aura-ui/utils';\n\n// Merge Tailwind classes safely\nconst cls = cn('px-4 py-2 rounded-lg', variant === 'ghost' && 'bg-transparent', className);\n\n// Compose multiple onClick handlers\nconst onClick = composeEventHandlers(userOnClick, internalOnClick);`,
    lang: 'ts',
    exports: ['cn', 'composeEventHandlers', 'isFunction', 'isObject', 'isString', 'clamp', 'noop', 'pick', 'omit', 'chunk', 'uniq', 'groupBy', 'camelCase', 'kebabCase', 'capitalize'],
  },
  '@aura-ui/themes': {
    stats: [{ label: 'Bundle', value: '~2 kB' }, { label: 'Themes', value: '3' }, { label: 'Tokens', value: '30+' }],
    code: `import { ThemeProvider, useTheme } from '@aura-ui/themes';\n\n// Wrap your app\nexport default function Root({ children }) {\n  return (\n    <ThemeProvider defaultTheme="slate" defaultMode="system">\n      {children}\n    </ThemeProvider>\n  );\n}\n\n// Use anywhere\nconst { theme, setTheme, resolvedMode } = useTheme();`,
    lang: 'tsx',
    exports: ['ThemeProvider', 'useTheme', 'ThemeScript', 'defaultThemes', 'type Theme', 'type ThemeMode'],
    preview: () => (
      <div className="flex items-center gap-5">
        {[{ name: 'slate', bg: '#1e40af', fg: '#0f172a' }, { name: 'zinc', bg: '#71717a', fg: '#18181b' }, { name: 'rose', bg: '#be123c', fg: '#fff1f2' }].map(t => (
          <div key={t.name} className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full shadow-md" style={{ background: t.fg }}>
              <div className="h-5 w-5 rounded-full" style={{ background: t.bg }} />
            </div>
            <span className="text-[11px] text-muted-foreground">{t.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  '@aura-ui/primitives': {
    stats: [{ label: 'Bundle', value: '~15 kB' }, { label: 'Components', value: '50+' }, { label: 'A11y', value: 'WAI-ARIA' }],
    code: `import { Dialog } from '@aura-ui/primitives';\n\n<Dialog.Root open={open} onOpenChange={setOpen}>\n  <Dialog.Trigger asChild>\n    <button>Open</button>\n  </Dialog.Trigger>\n  <Dialog.Portal>\n    <Dialog.Overlay />\n    <Dialog.Content>\n      <Dialog.Title>Title</Dialog.Title>\n      <Dialog.Close />\n    </Dialog.Content>\n  </Dialog.Portal>\n</Dialog.Root>`,
    lang: 'tsx',
    exports: ['Button', 'Dialog', 'Tooltip', 'Popover', 'Select', 'Tabs', 'Accordion', 'Checkbox', 'RadioGroup', 'Switch', 'Slider', 'Separator', 'Avatar', 'Badge', 'Label', '+ 35 more'],
  },
  '@aura-ui/styled': {
    stats: [{ label: 'Bundle', value: '~22 kB' }, { label: 'Components', value: '45+' }, { label: 'Variants', value: 'tailwind-variants' }],
    code: `import { Button, Dialog, Badge } from '@aura-ui/styled';\n\n<Button variant="outline" size="sm">Cancel</Button>\n<Button>Save changes</Button>\n<Badge variant="success">Published</Badge>`,
    lang: 'tsx',
    exports: ['Button', 'Dialog', 'Drawer', 'Sheet', 'Tooltip', 'Popover', 'Select', 'Combobox', 'Tabs', 'Accordion', 'Input', 'Textarea', 'Checkbox', 'RadioGroup', 'Switch', 'Slider', 'Badge', 'Avatar', 'Card', 'Skeleton', 'DatePicker', '+ 24 more'],
    preview: () => (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90">Default</button>
          <button className="rounded-lg border border-border px-4 py-1.5 text-[13px] font-medium text-fg transition-colors hover:bg-accent">Outline</button>
          <button className="rounded-lg px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-fg">Ghost</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[['default','bg-primary/10 text-primary'], ['success','bg-emerald-500/10 text-emerald-600'], ['warning','bg-amber-500/10 text-amber-600'], ['destructive','bg-red-500/10 text-red-500']].map(([v, cls]) => (
            <span key={v} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${cls}`}>{v}</span>
          ))}
        </div>
      </div>
    ),
  },
  '@aura-ui/data-table': {
    stats: [{ label: 'Bundle', value: '~38 kB' }, { label: 'Engine', value: 'TanStack' }, { label: 'Rows', value: '100k+ virtual' }],
    code: `import { DataTable } from '@aura-ui/data-table';\n\n<DataTable\n  data={users}\n  columns={columns}\n  enableSorting\n  enableFiltering\n  enablePagination\n  enableColumnPinning\n  enableVirtualization\n/>`,
    lang: 'tsx',
    exports: ['DataTable', 'useDataTable', 'createColumnHelper', 'type DataTableColumn', 'type DataTableFilterGroup', 'type DataTableBulkAction', 'type DataTableView', 'DataTablePagination'],
    preview: () => (
      <div className="w-full overflow-hidden rounded-lg border border-border text-xs">
        <div className="flex border-b border-border bg-muted/50">
          {['Name', 'Role', 'Status'].map(h => <div key={h} className="flex-1 px-3 py-2 font-medium text-muted-foreground">{h}</div>)}
        </div>
        {[['Alice Chen', 'Engineer', 'Active'], ['Bob Smith', 'Designer', 'Active'], ['Carol Wu', 'PM', 'Away']].map(([n, r, s]) => (
          <div key={n} className="flex border-t border-border/60">
            <div className="flex-1 px-3 py-2 font-medium">{n}</div>
            <div className="flex-1 px-3 py-2 text-muted-foreground">{r}</div>
            <div className="flex-1 px-3 py-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>{s}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  '@aura-ui/icons': {
    stats: [{ label: 'Icons', value: '1000+' }, { label: 'Per-icon', value: '~0.5 kB' }, { label: 'Source', value: 'lucide-react' }],
    code: `import { Star, Heart, Settings } from '@aura-ui/icons';\n\n// Fully tree-shakeable — only imported icons are bundled\n<Star className="h-5 w-5 text-amber-500" />\n<Heart className="h-5 w-5 text-red-500" strokeWidth={1.5} />`,
    lang: 'tsx',
    exports: SAMPLE_ICONS.map(I => I.displayName ?? 'Icon').concat(['…1000+ more']),
    preview: () => (
      <div className="grid grid-cols-4 gap-2">
        {SAMPLE_ICONS.map((Icon, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 rounded-lg border border-border/50 p-2.5 transition-colors hover:bg-accent/40">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-[9px] text-muted-foreground">{Icon.displayName}</span>
          </div>
        ))}
      </div>
    ),
  },
  '@aura-ui/cli': {
    stats: [{ label: 'Type', value: 'devDependency' }, { label: 'Commands', value: '3' }, { label: 'Node', value: '>=18' }],
    code: `# Initialize a new project\nnpx aura-ui init\n\n# Add components to your project\nnpx aura-ui add button dialog select combobox\n\n# Add multiple at once\nnpx aura-ui add --all`,
    lang: 'bash',
    exports: ['aura-ui init', 'aura-ui add <component>', 'aura-ui add --all'],
  },
};

const ARCH_LAYERS = [
  { label: 'Foundation', pkgs: ['@aura-ui/core', '@aura-ui/utils'], color: 'bg-blue-500/10 border-blue-500/20 text-blue-600' },
  { label: 'Behavior',   pkgs: ['@aura-ui/hooks', '@aura-ui/themes', '@aura-ui/primitives'], color: 'bg-violet-500/10 border-violet-500/20 text-violet-600' },
  { label: 'UI',         pkgs: ['@aura-ui/styled', '@aura-ui/icons'], color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' },
  { label: 'Data',       pkgs: ['@aura-ui/data-table'], color: 'bg-amber-500/10 border-amber-500/20 text-amber-600' },
  { label: 'Tooling',    pkgs: ['@aura-ui/cli'], color: 'bg-muted border-border text-muted-foreground' },
];

function PackageCard({ pkg }: { pkg: typeof PACKAGES[number] }) {
  const extra = PKG_EXTRA[pkg.name];
  const [codeOpen, setCodeOpen] = React.useState(false);
  const [exportsOpen, setExportsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(pkg.install);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 p-5">
        <div>
          <h3 className="font-mono text-sm font-semibold text-primary">{pkg.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
        </div>
        <button
          onClick={copyInstall}
          className="group flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-fg"
        >
          {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
          {pkg.install}
        </button>
      </div>

      {/* Stats row */}
      {extra && (
        <div className="flex flex-wrap gap-4 border-t border-border/50 bg-muted/20 px-5 py-3">
          {extra.stats.map(s => (
            <div key={s.label} className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">{s.label}</span>
              <span className="mt-0.5 font-mono text-[13px] font-semibold text-fg">{s.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 px-5 py-3">
        {pkg.highlights.map(h => (
          <span key={h} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] text-accent-foreground">{h}</span>
        ))}
      </div>

      {/* Live preview */}
      {extra?.preview && (
        <div className="mx-5 mb-4 flex min-h-[100px] items-center justify-center rounded-xl border border-border/60 bg-gradient-to-br from-accent/20 to-transparent p-5">
          {extra.preview()}
        </div>
      )}

      {/* Expandable code snippet */}
      {extra?.code && (
        <div className="border-t border-border/50">
          <button
            onClick={() => setCodeOpen(o => !o)}
            className="flex w-full items-center gap-2 px-5 py-2.5 text-left text-[12px] text-muted-foreground transition-colors hover:bg-muted/30 hover:text-fg"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${codeOpen ? 'rotate-180' : ''}`} />
            Usage example
          </button>
          {codeOpen && (
            <div className="border-t border-border/50 bg-[#0d1117]">
              <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed">
                <code className="font-mono text-[#c9d1d9]">{extra.code}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Expandable exports */}
      {extra?.exports && (
        <div className="border-t border-border/50">
          <button
            onClick={() => setExportsOpen(o => !o)}
            className="flex w-full items-center gap-2 px-5 py-2.5 text-left text-[12px] text-muted-foreground transition-colors hover:bg-muted/30 hover:text-fg"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${exportsOpen ? 'rotate-180' : ''}`} />
            What&apos;s inside ({extra.exports.length})
          </button>
          {exportsOpen && (
            <div className="border-t border-border/50 px-5 py-4">
              <div className="flex flex-wrap gap-1.5">
                {extra.exports.map(e => (
                  <code key={e} className="rounded-md border border-border/50 bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {e}
                  </code>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PackagesPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Monorepo</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Packages</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Nine focused, independently-versioned packages. Use one, or all of them.
      </p>

      {/* Architecture layers */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border bg-muted/30 px-4 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">Architecture</p>
        </div>
        <div className="p-4 space-y-2">
          {ARCH_LAYERS.map(layer => (
            <div key={layer.label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">{layer.label}</span>
              <div className="flex flex-1 flex-wrap gap-1.5">
                {layer.pkgs.map(p => (
                  <span key={p} className={`rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium ${layer.color}`}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package cards */}
      <div className="mt-8 grid gap-4">
        {PACKAGES.map(p => <PackageCard key={p.name} pkg={p} />)}
      </div>

      <div className="mt-14 flex justify-end">
        <a href="https://github.com/your-org/aura-ui" target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg">
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
