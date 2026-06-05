'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
} from '@structyl/icons';
import { Box, Button, Typography } from '@structyl/styled';
import { COMPONENTS, CATEGORIES, HOOKS, PACKAGES, type ComponentEntry } from '../../../lib/registry';
import { API } from '../../../lib/api-data';
import { CodeBlock } from '../../../components/code-block';
import { DocsNotFound } from '../../../components/docs-not-found';

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
  if (!entry) return <DocsNotFound />;
  return <ComponentDoc entry={entry} />;
}

/* ── Component doc ───────────────────────────────────────────────────── */

type TocItem = { id: string; title: string };

function ComponentDoc({ entry }: { entry: ComponentEntry }) {
  const api = entry.api ?? API[entry.slug];
  // Order components exactly like the sidebar (grouped by CATEGORIES) so Prev/Next
  // follow the visible order. Any uncategorised component is appended at the end.
  const catSet = new Set<string>(CATEGORIES);
  const orderedComponents = [
    ...CATEGORIES.flatMap((cat) => COMPONENTS.filter((c) => c.category === cat)),
    ...COMPONENTS.filter((c) => !catSet.has(c.category)),
  ];
  const idx = orderedComponents.findIndex((c) => c.slug === entry.slug);
  const prev = idx > 0 ? (orderedComponents[idx - 1] ?? null) : null;
  const next = idx >= 0 && idx < orderedComponents.length - 1 ? (orderedComponents[idx + 1] ?? null) : null;
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
    <Box className="flex gap-12">
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
        <Box id="overview" className="scroll-mt-20">
          <Box className="flex flex-wrap items-center gap-3">
            <Typography as="h1" variant="h1" className="text-4xl font-semibold tracking-tight">{entry.name}</Typography>
            <StatusBadge status={((entry as unknown) as Record<string, unknown>).status as string ?? 'stable'} />
          </Box>
          <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">{entry.description}</Typography>
          <PreviewBlock title="Basic usage" preview={entry.preview} code={entry.code} />
        </Box>

        {/* Examples */}
        {entry.examples && entry.examples.length > 0 && (
          <Section id="examples" title="Examples">
            {/* grid-cols-1 → minmax(0,1fr): lets the track shrink below content
                min-content so wide examples (e.g. DataTable) can't blow the
                column out past the article into the TOC. Bare `grid` uses an
                auto (min-content) track, which overflowed. */}
            <Box className="grid grid-cols-1 gap-8">
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
            </Box>
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
            <Typography as="p" variant="body2" className="mb-2 text-sm text-muted-foreground">
              Import the parts and compose them together.
            </Typography>
            <CodeBlock code={entry.anatomy} lang="tsx" />
          </Section>
        )}

        {/* API Reference — lives on its own dedicated route; link to it
            here rather than duplicating the full props tables. */}
        {api && api.length > 0 && (
          <Section id="api-reference" title="API Reference">
            <Link
              href={`/docs/api/${entry.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-border-strong hover:shadow-sm"
            >
              <Box className="min-w-0">
                <Typography as="p" variant="body2" className="text-sm font-medium">{entry.name} API reference</Typography>
                <Typography as="p" variant="body2" className="mt-0.5 text-[13px] text-muted-foreground">
                  Full props, types, defaults
                  {api.length > 1 ? `, and all ${api.length} parts` : ''}.
                </Typography>
              </Box>
              <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-primary">
                View API
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Section>
        )}

        {/* Keyboard interactions */}
        {entry.keyboard && entry.keyboard.length > 0 && (
          <Section id="keyboard-interactions" title="Keyboard interactions">
            {entry.ariaPattern && (
              <Typography as="p" variant="body2" className="mb-2 text-sm text-muted-foreground">
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
              </Typography>
            )}
            <Box className="overflow-hidden rounded-lg border border-border">
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
            </Box>
          </Section>
        )}

        <NavFooter prev={prev} next={next} />
      </article>

      {/* ── Table of contents ─────────────────────────────────────── */}
      {toc.length > 2 && (
        <aside className="hidden w-[180px] shrink-0 xl:block">
          <Box className="sticky top-[76px]">
            <Typography as="p" variant="body2" className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              On this page
            </Typography>
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
          </Box>
        </aside>
      )}
    </Box>
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
    pnpm: `pnpm dlx structyl add ${slug}`,
    npm: `npx structyl add ${slug}`,
    yarn: `yarn dlx structyl add ${slug}`,
    bun: `bunx structyl add ${slug}`,
  };
  return (
    <Box>
      <Box className="mb-2 flex items-center gap-0.5">
        {PMS.map((p) => (
          <Button
            key={p}
            variant="ghost"
            onClick={() => setPm(p)}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
              pm === p
                ? 'bg-accent text-fg'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-fg'
            }`}
          >
            {p}
          </Button>
        ))}
      </Box>
      <CodeBlock code={cmds[pm]} lang="bash" />
    </Box>
  );
}

/* ── Preview block with responsive viewport toggle ───────────────────── */

type Viewport = 'full' | 'tablet' | 'mobile';
const VP_ICONS = { full: Monitor, tablet: Tablet, mobile: Smartphone } as const;
const VP_MAX: Record<Viewport, string> = { full: '100%', tablet: '768px', mobile: '375px' };

function PreviewBlock({
  title,
  description,
  preview: Preview,
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
    <Box className={compact ? '' : 'mt-8'}>
      {title && (
        <Box className="mb-3">
          <Typography as="h3" variant="h3" className="text-sm font-semibold">{title}</Typography>
          {description ? (
            <Typography as="p" variant="body2" className="mt-1 text-sm text-muted-foreground">{description}</Typography>
          ) : null}
        </Box>
      )}

      {/* Tab bar */}
      <Box className="flex items-center border-b border-border">
        <Box className="flex items-center gap-1">
          {(['preview', 'code'] as const).map((t) => (
            <Button
              key={t}
              variant="ghost"
              onClick={() => setTab(t)}
              className={`relative px-3 py-2 text-sm font-medium capitalize transition-colors ${
                tab === t ? 'text-fg' : 'text-muted-foreground hover:text-fg'
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </Button>
          ))}
        </Box>

        {/* Viewport toggles */}
        {tab === 'preview' && (
          <Box className="ml-auto flex items-center gap-0.5 pr-1">
            {(['full', 'tablet', 'mobile'] as Viewport[]).map((v) => {
              const Icon = VP_ICONS[v];
              return (
                <Button
                  key={v}
                  variant="ghost"
                  onClick={() => setViewport(v)}
                  title={v}
                  className={`rounded p-1.5 transition-colors ${
                    viewport === v
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-fg'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </Button>
              );
            })}
          </Box>
        )}
      </Box>

      {tab === 'preview' ? (
        <Box
          className={`overflow-hidden rounded-b-xl border border-t-0 border-border bg-gradient-to-br from-accent/20 to-transparent ${
            compact ? 'min-h-[180px] p-6' : 'min-h-[240px] p-10'
          }`}
        >
          <Box
            className="mx-auto transition-all duration-300"
            style={{ maxWidth: VP_MAX[viewport] }}
          >
            <Box className="flex w-full items-center justify-center"><Preview /></Box>
          </Box>
        </Box>
      ) : (
        <CodeBlock code={code} lang="tsx" rounded="bottom" />
      )}
    </Box>
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
      <Typography as="h2" variant="h2" className="mb-3 text-xl font-semibold tracking-tight">{title}</Typography>
      {children}
    </section>
  );
}

/* ── Prev / Next + Edit on GitHub ────────────────────────────────────── */

function NavFooter({ prev, next }: { prev: ComponentEntry | null; next: ComponentEntry | null }) {
  return (
    <Box className="mt-14 space-y-6">
      <Box className="flex justify-end">
        <a
          href="https://github.com/imirfanul/structyl"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </Box>

      {(prev || next) && (
        <Box className="grid grid-cols-2 gap-4 border-t border-border pt-6">
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
            <Box />
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
            <Box />
          )}
        </Box>
      )}
    </Box>
  );
}

/* ── Static pages ────────────────────────────────────────────────────── */

function GettingStarted() {
  return (
    <article className="mx-auto max-w-3xl">
      <Typography as="p" variant="body2" className="text-xs font-semibold uppercase tracking-widest text-primary">Overview</Typography>
      <Typography as="h1" variant="h1" className="mt-2 text-4xl font-semibold tracking-tight">Getting started</Typography>
      <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">
        Install structyl and render your first component.
      </Typography>

      <Section title="1. Install">
        <CodeBlock code={`pnpm add @structyl/styled @structyl/themes`} lang="bash" />
      </Section>

      <Section title="2. Add the Tailwind preset">
        <CodeBlock
          code={`// tailwind.config.ts
import preset from '@structyl/styled/tailwind-preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
};`}
          lang="ts"
        />
      </Section>

      <Section title="3. Wrap your app in ThemeProvider">
        <CodeBlock
          code={`import { ThemeProvider } from '@structyl/themes';

export default function App({ children }) {
  return <ThemeProvider defaultTheme="slate">{children}</ThemeProvider>;
}`}
          lang="tsx"
        />
      </Section>

      <Section title="4. Use a component">
        <CodeBlock
          code={`import { Button } from '@structyl/styled';

export default function Page() {
  return <Button>Hello structyl</Button>;
}`}
          lang="tsx"
        />
      </Section>

      <Section title="Or use the CLI">
        <Typography as="p" variant="body2" className="mb-2 text-sm text-muted-foreground">
          Scaffold a project and copy component source directly into your codebase.
        </Typography>
        <CodeBlock code={`npx structyl init\nnpx structyl add button dialog select`} lang="bash" />
      </Section>

      <Box className="mt-14 flex justify-end">
        <a
          href="https://github.com/imirfanul/structyl"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </Box>
    </article>
  );
}

function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <Typography as="p" variant="body2" className="text-xs font-semibold uppercase tracking-widest text-primary">Overview</Typography>
      <Typography as="h1" variant="h1" className="mt-2 text-4xl font-semibold tracking-tight">Accessibility</Typography>
      <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">
        Every component follows the WAI-ARIA Authoring Practices Guide.
      </Typography>
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
      <Box className="mt-14 flex justify-end">
        <a
          href="https://github.com/imirfanul/structyl"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </Box>
    </article>
  );
}

function HooksPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <Typography as="p" variant="body2" className="text-xs font-semibold uppercase tracking-widest text-primary">
        @structyl/hooks
      </Typography>
      <Typography as="h1" variant="h1" className="mt-2 text-4xl font-semibold tracking-tight">Hooks</Typography>
      <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">
        24 reusable, SSR-safe, tree-shakeable React hooks. Import only what you use.
      </Typography>
      <Box className="mt-8 overflow-hidden rounded-lg border border-border">
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
      </Box>
      <Box className="mt-14 flex justify-end">
        <a
          href="https://github.com/imirfanul/structyl"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg"
        >
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </Box>
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
  '@structyl/core': {
    stats: [{ label: 'Bundle', value: '~8 kB' }, { label: 'Exports', value: '12' }, { label: 'Deps', value: '1' }],
    code: `import { Slot, Primitive } from '@structyl/core';\n\n// Render any element while keeping behavior\nconst Button = React.forwardRef(({ asChild, ...props }, ref) => {\n  const Comp = asChild ? Slot : 'button';\n  return <Comp ref={ref} {...props} />;\n});`,
    lang: 'tsx',
    exports: ['Slot', 'Primitive', 'Portal', 'Presence', 'FocusScope', 'DismissableLayer', 'RovingFocusGroup', 'Popper', 'createContext', 'composeRefs', 'useId', 'useControllableState'],
  },
  '@structyl/hooks': {
    stats: [{ label: 'Bundle', value: '~3 kB' }, { label: 'Hooks', value: '24' }, { label: 'Deps', value: '0' }],
    code: `import { useBoolean, useDebounce, useHotkeys } from '@structyl/hooks';\n\nconst { value: open, on, off } = useBoolean(false);\nconst debouncedQuery = useDebounce(query, 300);\nuseHotkeys('mod+k', () => setOpen(true));`,
    lang: 'ts',
    exports: ['useBoolean', 'useToggle', 'useCounter', 'usePrevious', 'useDebounce', 'useThrottle', 'useLocalStorage', 'useCopyToClipboard', 'useMediaQuery', 'useDarkMode', 'useWindowSize', 'useClickOutside', 'useEventListener', 'useKeyPress', 'useHotkeys', 'useMount', 'useUnmount', 'useUpdateEffect', 'useId', 'useLatest', 'useCallbackRef', 'useComposedRefs', 'useControllableState', 'useIsomorphicLayoutEffect'],
    preview: () => {
      function CounterDemo() {
        const [n, setN] = React.useState(0);
        return (
          <Box className="flex flex-col items-center gap-3">
            <Box className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => setN(c => c - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-fg">−</Button>
              <span className="w-12 text-center font-mono text-2xl font-bold">{n}</span>
              <Button variant="ghost" onClick={() => setN(c => c + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-fg">+</Button>
            </Box>
            <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">Live — useCounter hook</Typography>
          </Box>
        );
      }
      return <CounterDemo />;
    },
  },
  '@structyl/utils': {
    stats: [{ label: 'Bundle', value: '<1.5 kB' }, { label: 'Exports', value: '15' }, { label: 'Side effects', value: 'none' }],
    code: `import { cn, composeEventHandlers } from '@structyl/utils';\n\n// Merge Tailwind classes safely\nconst cls = cn('px-4 py-2 rounded-lg', variant === 'ghost' && 'bg-transparent', className);\n\n// Compose multiple onClick handlers\nconst onClick = composeEventHandlers(userOnClick, internalOnClick);`,
    lang: 'ts',
    exports: ['cn', 'composeEventHandlers', 'isFunction', 'isObject', 'isString', 'clamp', 'noop', 'pick', 'omit', 'chunk', 'uniq', 'groupBy', 'camelCase', 'kebabCase', 'capitalize'],
  },
  '@structyl/themes': {
    stats: [{ label: 'Bundle', value: '~2 kB' }, { label: 'Themes', value: '3' }, { label: 'Tokens', value: '30+' }],
    code: `import { ThemeProvider, useTheme } from '@structyl/themes';\n\n// Wrap your app\nexport default function Root({ children }) {\n  return (\n    <ThemeProvider defaultTheme="slate" defaultMode="system">\n      {children}\n    </ThemeProvider>\n  );\n}\n\n// Use anywhere\nconst { theme, setTheme, resolvedMode } = useTheme();`,
    lang: 'tsx',
    exports: ['ThemeProvider', 'useTheme', 'ThemeScript', 'defaultThemes', 'type Theme', 'type ThemeMode'],
    preview: () => (
      <Box className="flex items-center gap-5">
        {[{ name: 'slate', bg: '#1e40af', fg: '#0f172a' }, { name: 'zinc', bg: '#71717a', fg: '#18181b' }, { name: 'rose', bg: '#be123c', fg: '#fff1f2' }].map(t => (
          <Box key={t.name} className="flex flex-col items-center gap-2">
            <Box className="flex h-12 w-12 items-center justify-center rounded-full shadow-md" style={{ background: t.fg }}>
              <Box className="h-5 w-5 rounded-full" style={{ background: t.bg }} />
            </Box>
            <span className="text-[11px] text-muted-foreground">{t.name}</span>
          </Box>
        ))}
      </Box>
    ),
  },
  '@structyl/primitives': {
    stats: [{ label: 'Bundle', value: '~15 kB' }, { label: 'Components', value: '50+' }, { label: 'A11y', value: 'WAI-ARIA' }],
    code: `import { Dialog } from '@structyl/primitives';\n\n<Dialog.Root open={open} onOpenChange={setOpen}>\n  <Dialog.Trigger asChild>\n    <button>Open</button>\n  </Dialog.Trigger>\n  <Dialog.Portal>\n    <Dialog.Overlay />\n    <Dialog.Content>\n      <Dialog.Title>Title</Dialog.Title>\n      <Dialog.Close />\n    </Dialog.Content>\n  </Dialog.Portal>\n</Dialog.Root>`,
    lang: 'tsx',
    exports: ['Button', 'Dialog', 'Tooltip', 'Popover', 'Select', 'Tabs', 'Accordion', 'Checkbox', 'RadioGroup', 'Switch', 'Slider', 'Separator', 'Avatar', 'Badge', 'Label', '+ 35 more'],
  },
  '@structyl/styled': {
    stats: [{ label: 'Bundle', value: '~22 kB' }, { label: 'Components', value: '45+' }, { label: 'Variants', value: 'tailwind-variants' }],
    code: `import { Button, Dialog, Badge } from '@structyl/styled';\n\n<Button variant="outline" size="sm">Cancel</Button>\n<Button>Save changes</Button>\n<Badge variant="success">Published</Badge>`,
    lang: 'tsx',
    exports: ['Button', 'Dialog', 'Drawer', 'Sheet', 'Tooltip', 'Popover', 'Select', 'Combobox', 'Tabs', 'Accordion', 'Input', 'Textarea', 'Checkbox', 'RadioGroup', 'Switch', 'Slider', 'Badge', 'Avatar', 'Card', 'Skeleton', 'DatePicker', '+ 24 more'],
    preview: () => (
      <Box className="flex flex-col gap-3">
        <Box className="flex flex-wrap gap-2">
          <Button variant="ghost" className="rounded-lg bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90">Default</Button>
          <Button variant="ghost" className="rounded-lg border border-border px-4 py-1.5 text-[13px] font-medium text-fg transition-colors hover:bg-accent">Outline</Button>
          <Button variant="ghost" className="rounded-lg px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-fg">Ghost</Button>
        </Box>
        <Box className="flex flex-wrap gap-1.5">
          {[['default','bg-primary/10 text-primary'], ['success','bg-emerald-500/10 text-emerald-600'], ['warning','bg-amber-500/10 text-amber-600'], ['destructive','bg-red-500/10 text-red-500']].map(([v, cls]) => (
            <span key={v} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${cls}`}>{v}</span>
          ))}
        </Box>
      </Box>
    ),
  },
  '@structyl/data-table': {
    stats: [{ label: 'Bundle', value: '~38 kB' }, { label: 'Engine', value: 'TanStack' }, { label: 'Rows', value: '100k+ virtual' }],
    code: `import { DataTable } from '@structyl/data-table';\n\n<DataTable\n  data={users}\n  columns={columns}\n  enableSorting\n  enableFiltering\n  enablePagination\n  enableColumnPinning\n  enableVirtualization\n/>`,
    lang: 'tsx',
    exports: ['DataTable', 'useDataTable', 'createColumnHelper', 'type DataTableColumn', 'type DataTableFilterGroup', 'type DataTableBulkAction', 'type DataTableView', 'DataTablePagination'],
    preview: () => (
      <Box className="w-full overflow-hidden rounded-lg border border-border text-xs">
        <Box className="flex border-b border-border bg-muted/50">
          {['Name', 'Role', 'Status'].map(h => <Box key={h} className="flex-1 px-3 py-2 font-medium text-muted-foreground">{h}</Box>)}
        </Box>
        {[['Alice Chen', 'Engineer', 'Active'], ['Bob Smith', 'Designer', 'Active'], ['Carol Wu', 'PM', 'Away']].map(([n, r, s]) => (
          <Box key={n} className="flex border-t border-border/60">
            <Box className="flex-1 px-3 py-2 font-medium">{n}</Box>
            <Box className="flex-1 px-3 py-2 text-muted-foreground">{r}</Box>
            <Box className="flex-1 px-3 py-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>{s}</span>
            </Box>
          </Box>
        ))}
      </Box>
    ),
  },
  '@structyl/icons': {
    stats: [{ label: 'Icons', value: '1000+' }, { label: 'Per-icon', value: '~0.5 kB' }, { label: 'Source', value: 'lucide-react' }],
    code: `import { Star, Heart, Settings } from '@structyl/icons';\n\n// Fully tree-shakeable — only imported icons are bundled\n<Star className="h-5 w-5 text-amber-500" />\n<Heart className="h-5 w-5 text-red-500" strokeWidth={1.5} />`,
    lang: 'tsx',
    exports: SAMPLE_ICONS.map(I => I.displayName ?? 'Icon').concat(['…1000+ more']),
    preview: () => (
      <Box className="grid grid-cols-4 gap-2">
        {SAMPLE_ICONS.map((Icon, i) => (
          <Box key={i} className="flex flex-col items-center gap-1.5 rounded-lg border border-border/50 p-2.5 transition-colors hover:bg-accent/40">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-[9px] text-muted-foreground">{Icon.displayName}</span>
          </Box>
        ))}
      </Box>
    ),
  },
  '@structyl/cli': {
    stats: [{ label: 'Type', value: 'devDependency' }, { label: 'Commands', value: '3' }, { label: 'Node', value: '>=18' }],
    code: `# Initialize a new project\nnpx structyl init\n\n# Add components to your project\nnpx structyl add button dialog select combobox\n\n# Add multiple at once\nnpx structyl add --all`,
    lang: 'bash',
    exports: ['structyl init', 'structyl add <component>', 'structyl add --all'],
  },
  '@structyl/api-client': {
    stats: [
      { label: 'Bundle', value: '~6 kB' },
      { label: 'Peer deps', value: 'axios + react' },
      { label: 'Cache', value: 'useSyncExternalStore' },
    ],
    code: `import { ApiProvider, useApiQuery, useApiMutation } from '@structyl/api-client';
import { createApiClient } from '@structyl/api-client';

// 1. Create a client
const apiClient = createApiClient({
  baseURL: 'https://api.example.com',
  getAuthToken: () => localStorage.getItem('token'),
  refreshToken: () => refreshMyToken(),
});

// 2. Wrap your app
<ApiProvider client={apiClient}>
  <App />
</ApiProvider>

// 3. Fetch data
const { data, isLoading, error, refetch } = useApiQuery('/users', {
  staleTime: 60_000,
  retry: 2,
  select: (users) => users.filter((u) => u.active),
});

// 4. Mutate
const { mutate } = useApiMutation('/users', {
  method: 'POST',
  invalidates: [['/users']],
  onSuccess: (user) => toast('Created!'),
});`,
    lang: 'tsx',
    exports: [
      'useApiQuery',
      'useApiMutation',
      'useInfiniteApiQuery',
      'useApiQueries',
      'useSuspenseApiQuery',
      'usePrefetch',
      'ApiProvider',
      'useApiClient',
      'useApiContext',
      'createApiClient',
      'ApiClient',
      'QueryClient',
      'persistCache',
      'ApiDevTools (subpath)',
      'prefetchApiQuery (server)',
      'dehydrate / hydrate (server)',
    ],
    preview: () => {
      function ApiClientDemo() {
        type User = { id: number; name: string; role: string };
        const MOCK_USERS: User[] = [
          { id: 1, name: 'Alice Chen', role: 'Engineer' },
          { id: 2, name: 'Bob Smith', role: 'Designer' },
          { id: 3, name: 'Carol Wu', role: 'Product' },
        ];
        const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');
        const [users, setUsers] = React.useState<User[]>([]);
        const [selected, setSelected] = React.useState<number | null>(null);
        const [mutating, setMutating] = React.useState(false);

        const fetchUsers = React.useCallback(() => {
          setStatus('loading');
          setUsers([]);
          setTimeout(() => {
            setUsers(MOCK_USERS);
            setStatus('success');
          }, 800);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        React.useEffect(() => { fetchUsers(); }, [fetchUsers]);

        const deleteUser = (id: number) => {
          setSelected(id);
          setMutating(true);
          setTimeout(() => {
            setUsers((prev) => prev.filter((u) => u.id !== id));
            setMutating(false);
            setSelected(null);
          }, 600);
        };

        return (
          <Box className="w-full max-w-sm space-y-3 font-sans">
            {/* Hook status bar */}
            <Box className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
              <Box className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full transition-colors ${
                  status === 'loading' ? 'animate-pulse bg-amber-400' :
                  status === 'success' ? 'bg-emerald-400' : 'bg-border'
                }`} />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {status === 'loading' ? 'useApiQuery › fetching…' :
                   status === 'success' ? `useApiQuery › ${users.length} users` : 'idle'}
                </span>
              </Box>
              <Button
                variant="ghost"
                onClick={fetchUsers}
                disabled={status === 'loading'}
                className="rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-fg disabled:opacity-40"
              >
                refetch()
              </Button>
            </Box>

            {/* User list */}
            <Box className="overflow-hidden rounded-lg border border-border">
              {status === 'loading' ? (
                <Box className="space-y-px">
                  {[1, 2, 3].map((i) => (
                    <Box key={i} className="flex items-center gap-3 border-b border-border/60 p-3 last:border-0">
                      <Box className="h-7 w-7 animate-pulse rounded-full bg-muted" />
                      <Box className="flex-1 space-y-1.5">
                        <Box className="h-2.5 w-24 animate-pulse rounded bg-muted" />
                        <Box className="h-2 w-16 animate-pulse rounded bg-muted" />
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : users.length === 0 ? (
                <Typography as="p" variant="body2" className="py-6 text-center text-[12px] text-muted-foreground">No users</Typography>
              ) : (
                <Box className="divide-y divide-border/60">
                  {users.map((u) => (
                    <Box key={u.id} className="flex items-center gap-3 p-3">
                      <Box className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                        {u.name[0]}
                      </Box>
                      <Box className="flex-1 min-w-0">
                        <Typography as="p" variant="body2" className="text-[13px] font-medium leading-none">{u.name}</Typography>
                        <Typography as="p" variant="body2" className="mt-0.5 text-[11px] text-muted-foreground">{u.role}</Typography>
                      </Box>
                      <Button
                        variant="ghost"
                        onClick={() => deleteUser(u.id)}
                        disabled={mutating}
                        className="rounded-md px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-40"
                      >
                        {selected === u.id && mutating ? '…' : 'delete'}
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Mutation status */}
            {mutating && (
              <Box className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                <span className="font-mono text-[11px] text-amber-600">useApiMutation › DELETE /users/{selected}</span>
              </Box>
            )}
          </Box>
        );
      }
      return <ApiClientDemo />;
    },
  },
};

const ARCH_LAYERS = [
  { label: 'Foundation', pkgs: ['@structyl/core', '@structyl/utils'], color: 'bg-blue-500/10 border-blue-500/20 text-blue-600' },
  { label: 'Behavior',   pkgs: ['@structyl/hooks', '@structyl/themes', '@structyl/primitives'], color: 'bg-violet-500/10 border-violet-500/20 text-violet-600' },
  { label: 'UI',         pkgs: ['@structyl/styled', '@structyl/icons'], color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' },
  { label: 'Data',       pkgs: ['@structyl/data-table', '@structyl/api-client'], color: 'bg-amber-500/10 border-amber-500/20 text-amber-600' },
  { label: 'Tooling',    pkgs: ['@structyl/cli'], color: 'bg-muted border-border text-muted-foreground' },
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
    <Box className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-sm">
      {/* Header */}
      <Box className="flex flex-wrap items-start justify-between gap-3 p-5">
        <Box>
          <Typography as="h3" variant="h3" className="font-mono text-sm font-semibold text-primary">{pkg.name}</Typography>
          <Typography as="p" variant="body2" className="mt-1 text-sm text-muted-foreground">{pkg.description}</Typography>
        </Box>
        <Button
          variant="ghost"
          onClick={copyInstall}
          className="group flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-fg"
        >
          {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
          {pkg.install}
        </Button>
      </Box>

      {/* Stats row */}
      {extra && (
        <Box className="flex flex-wrap gap-4 border-t border-border/50 bg-muted/20 px-5 py-3">
          {extra.stats.map(s => (
            <Box key={s.label} className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">{s.label}</span>
              <span className="mt-0.5 font-mono text-[13px] font-semibold text-fg">{s.value}</span>
            </Box>
          ))}
        </Box>
      )}

      {/* Tags */}
      <Box className="flex flex-wrap gap-1.5 px-5 py-3">
        {pkg.highlights.map(h => (
          <span key={h} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] text-accent-foreground">{h}</span>
        ))}
      </Box>

      {/* Live preview */}
      {extra?.preview && (() => {
        const PkgPreview = extra.preview!;
        return (
          <Box className="mx-5 mb-4 flex min-h-[100px] items-center justify-center rounded-xl border border-border/60 bg-gradient-to-br from-accent/20 to-transparent p-5">
            <PkgPreview />
          </Box>
        );
      })()}

      {/* Expandable code snippet */}
      {extra?.code && (
        <Box className="border-t border-border/50">
          <Button
            variant="ghost"
            onClick={() => setCodeOpen(o => !o)}
            className="flex w-full items-center gap-2 px-5 py-2.5 text-left text-[12px] text-muted-foreground transition-colors hover:bg-muted/30 hover:text-fg"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${codeOpen ? 'rotate-180' : ''}`} />
            Usage example
          </Button>
          {codeOpen && (
            <CodeBlock code={extra.code} lang={extra.lang} rounded="none" className="border-0 border-t border-border/50" />
          )}
        </Box>
      )}

      {/* Expandable exports */}
      {extra?.exports && (
        <Box className="border-t border-border/50">
          <Button
            variant="ghost"
            onClick={() => setExportsOpen(o => !o)}
            className="flex w-full items-center gap-2 px-5 py-2.5 text-left text-[12px] text-muted-foreground transition-colors hover:bg-muted/30 hover:text-fg"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${exportsOpen ? 'rotate-180' : ''}`} />
            What&apos;s inside ({extra.exports.length})
          </Button>
          {exportsOpen && (
            <Box className="border-t border-border/50 px-5 py-4">
              <Box className="flex flex-wrap gap-1.5">
                {extra.exports.map(e => (
                  <code key={e} className="rounded-md border border-border/50 bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {e}
                  </code>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

function PackagesPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <Typography as="p" variant="body2" className="text-xs font-semibold uppercase tracking-widest text-primary">Monorepo</Typography>
      <Typography as="h1" variant="h1" className="mt-2 text-4xl font-semibold tracking-tight">Packages</Typography>
      <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">
        Nine focused, independently-versioned packages. Use one, or all of them.
      </Typography>

      {/* Architecture layers */}
      <Box className="mt-8 overflow-hidden rounded-xl border border-border">
        <Box className="border-b border-border bg-muted/30 px-4 py-2.5">
          <Typography as="p" variant="body2" className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">Architecture</Typography>
        </Box>
        <Box className="p-4 space-y-2">
          {ARCH_LAYERS.map(layer => (
            <Box key={layer.label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">{layer.label}</span>
              <Box className="flex flex-1 flex-wrap gap-1.5">
                {layer.pkgs.map(p => (
                  <span key={p} className={`rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium ${layer.color}`}>
                    {p}
                  </span>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Package cards */}
      <Box className="mt-8 grid gap-4">
        {PACKAGES.map(p => <PackageCard key={p.name} pkg={p} />)}
      </Box>

      <Box className="mt-14 flex justify-end">
        <a href="https://github.com/imirfanul/structyl" target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg">
          Edit on GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
      </Box>
    </article>
  );
}
