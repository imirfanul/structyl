'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  X,
  BookOpen,
  Zap,
  Accessibility,
  LayoutGrid,
  Code2,
  Package,
  Sun,
  Moon,
  ChevronRight,
  Palette,
  History,
  Keyboard,
  Clock,
  Database,
  Paintbrush,
} from '@aura-ui/icons';
import { useTheme } from '@aura-ui/themes';
import { COMPONENTS, CATEGORIES, HOOKS } from '../../lib/registry';

/* ── Navigation structure ────────────────────────────────────────────── */

const OVERVIEW = [
  { slug: 'introduction',    title: 'Introduction',    href: '/docs/introduction',    icon: BookOpen },
  { slug: 'getting-started', title: 'Getting started', href: '/docs/getting-started', icon: Zap },
  { slug: 'accessibility',   title: 'Accessibility',   href: '/docs/accessibility',   icon: Accessibility },
  { slug: 'icons',           title: 'Icons',           href: '/docs/icons',           icon: LayoutGrid },
  { slug: 'hooks',           title: 'Hooks',           href: '/docs/hooks',           icon: Code2 },
  { slug: 'packages',        title: 'Packages',        href: '/docs/packages',        icon: Package },
  { slug: 'themes-docs',    title: 'Themes',           href: '/docs/themes',          icon: Paintbrush },
  { slug: 'api-client',     title: 'API Client',       href: '/docs/api-client',      icon: Database },
];

const RESOURCES = [
  { slug: 'design-tokens',      title: 'Design tokens',      href: '/docs/design-tokens',      icon: Palette },
  { slug: 'changelog',          title: 'Changelog',          href: '/docs/changelog',           icon: History },
  { slug: 'keyboard-shortcuts', title: 'Keyboard shortcuts', href: '/docs/keyboard-shortcuts',  icon: Keyboard },
];

type RecentItem = { slug: string; name: string };

/* ── Layout ──────────────────────────────────────────────────────────── */

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resolvedMode, setMode } = useTheme();
  const [query, setQuery] = React.useState('');
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [recentlyViewed, setRecentlyViewed] = React.useState<RecentItem[]>([]);

  const filtered = COMPONENTS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  // Load recently viewed from localStorage on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = JSON.parse(window.localStorage.getItem('aura-recently-viewed') ?? '[]') as RecentItem[];
      setRecentlyViewed(stored);
    } catch { /* ignore */ }
  }, []);

  // Track component page visits
  React.useEffect(() => {
    const match = pathname.match(/^\/docs\/([^/]+)$/);
    if (!match) return;
    const slug = match[1];
    if (!slug) return;
    const component = COMPONENTS.find((c) => c.slug === slug);
    if (!component) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.slug !== slug);
      const next = [{ slug, name: component.name }, ...filtered].slice(0, 5);
      try { window.localStorage.setItem('aura-recently-viewed', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [pathname]);

  // Global ⌘K shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg">

      {/* ── Top nav ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-[52px] max-w-[1440px] items-center gap-6 px-5">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            {/* dark logo (light text on dark squircle) */}
            <img src="/logo.svg" alt="aura-ui" className="hidden h-7 w-auto dark:block" />
            {/* light logo (dark text on dark squircle) */}
            <img src="/logo-light.svg" alt="aura-ui" className="block h-7 w-auto dark:hidden" />
          </Link>

          <span className="hidden text-lg text-border/80 md:block">/</span>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { label: 'Docs',   href: '/docs' },
              { label: 'Themes', href: '/themes' },
              { label: 'Icons',  href: '/docs/icons' },
              { label: 'Hooks',  href: '/docs/hooks' },
            ].map(({ label, href }) => {
              const active = pathname === href || (href !== '/docs' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? 'bg-accent text-fg'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-fg'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Global search trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-fg md:flex"
              aria-label="Open search"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="ml-2 rounded border border-border/60 bg-bg px-1 py-0.5 font-mono text-[9px] tracking-wide">
                ⌘K
              </kbd>
            </button>
            {/* Mobile search icon */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-fg md:hidden"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-fg"
            >
              {resolvedMode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Body grid ─────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-[240px_1fr]">

        {/* ── Sidebar ───────────────────────────────────────────── */}
        <aside className="sticky top-[52px] hidden h-[calc(100vh-52px)] overflow-y-auto border-r border-border/50 md:flex md:flex-col">

          {/* Search */}
          <div className="px-3 pb-3 pt-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="h-8 w-full rounded-lg border border-border/70 bg-muted/30 pl-8 pr-7 text-[12.5px] outline-none placeholder:text-muted-foreground/60 transition-shadow focus-visible:border-ring/40 focus-visible:ring-2 focus-visible:ring-ring/20"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-fg"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-3 pb-6">

            {/* Overview */}
            <SidebarSection label="Overview">
              {OVERVIEW.map(({ href, title, icon: Icon }) => (
                <SidebarItem key={href} href={href} active={pathname === href}>
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {title}
                </SidebarItem>
              ))}
            </SidebarSection>

            <div className="my-2 border-t border-border/40" />

            {/* Resources */}
            <SidebarSection label="Resources">
              {RESOURCES.map(({ href, title, icon: Icon }) => (
                <SidebarItem key={href} href={href} active={pathname === href}>
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {title}
                </SidebarItem>
              ))}
            </SidebarSection>

            <div className="my-2 border-t border-border/40" />

            {/* Component categories */}
            {CATEGORIES.map((cat) => {
              const items = filtered.filter((c) => c.category === cat);
              if (!items.length) return null;
              return (
                <SidebarSection key={cat} label={cat}>
                  {items.map((c) => {
                    const href = `/docs/${c.slug}`;
                    return (
                      <SidebarItem key={c.slug} href={href} active={pathname === href}>
                        {c.name}
                      </SidebarItem>
                    );
                  })}
                </SidebarSection>
              );
            })}

            {/* Recently viewed */}
            {recentlyViewed.length > 0 && !query && (
              <>
                <div className="my-2 border-t border-border/40" />
                <SidebarSection label="Recently viewed">
                  {recentlyViewed.map(({ slug, name }) => {
                    const href = `/docs/${slug}`;
                    return (
                      <SidebarItem key={slug} href={href} active={pathname === href}>
                        <Clock className="h-3 w-3 shrink-0 opacity-50" />
                        {name}
                      </SidebarItem>
                    );
                  })}
                </SidebarSection>
              </>
            )}
          </nav>

          {/* Install badge */}
          <div className="border-t border-border/40 px-3 py-3">
            <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2.5 text-[11px]">
              <p className="font-mono font-medium text-muted-foreground">pnpm add @aura-ui/styled</p>
            </div>
          </div>
        </aside>

        {/* ── Page content ─────────────────────────────────────── */}
        <main className="min-w-0 px-6 py-10 md:px-10 lg:px-14">{children}</main>
      </div>

      {/* ── Command palette ──────────────────────────────────────── */}
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </div>
  );
}

/* ── Command palette ─────────────────────────────────────────────────── */

const QUICK_LINKS = [
  { label: 'Getting started',    href: '/docs/getting-started',      tag: 'docs' },
  { label: 'Components',         href: '/docs',                      tag: 'docs' },
  { label: 'Icons',              href: '/docs/icons',                tag: 'icons' },
  { label: 'Hooks',              href: '/docs/hooks',                tag: 'hooks' },
  { label: 'Themes',             href: '/docs/themes',               tag: 'docs' },
  { label: 'API Client',         href: '/docs/api-client',           tag: 'package' },
  { label: 'Design tokens',      href: '/docs/design-tokens',        tag: 'docs' },
  { label: 'Themes playground',  href: '/themes',                    tag: 'themes' },
];

// Static pages that should be discoverable via search
const STATIC_PAGES = [
  { name: 'Themes',           sub: 'Runtime theming, dark mode, custom themes, CSS token reference',       href: '/docs/themes',          keywords: ['theme', 'dark', 'light', 'color', 'mode', 'css', 'variable', 'token', 'custom', 'palette', 'brand', 'ssr', 'flash'] },
  { name: 'API Client',       sub: 'Axios wrapper with React 18 cache, retries, mutations, SSR',          href: '/docs/api-client',      keywords: ['api', 'client', 'axios', 'fetch', 'query', 'mutation', 'cache', 'infinite', 'suspense', 'ssr', 'data'] },
  { name: 'Getting started',  sub: 'Install aura-ui and render your first component',                     href: '/docs/getting-started', keywords: ['start', 'install', 'setup', 'begin'] },
  { name: 'Hooks',            sub: '24 reusable, SSR-safe, tree-shakeable React hooks',                   href: '/docs/hooks',            keywords: ['hook', 'use', 'react'] },
  { name: 'Packages',         sub: 'Nine focused, independently-versioned packages',                      href: '/docs/packages',        keywords: ['package', 'monorepo', 'core', 'styled', 'themes', 'icons'] },
  { name: 'Accessibility',    sub: 'WAI-ARIA compliant keyboard navigation and screen reader support',    href: '/docs/accessibility',   keywords: ['a11y', 'aria', 'keyboard', 'screen reader', 'wcag'] },
  { name: 'Design tokens',    sub: 'CSS variables and Tailwind theme tokens',                             href: '/docs/design-tokens',   keywords: ['token', 'color', 'css', 'variable', 'tailwind'] },
  { name: 'Changelog',        sub: 'Release history and breaking changes',                                href: '/docs/changelog',       keywords: ['changelog', 'release', 'version', 'breaking'] },
];

type ResultType = 'component' | 'hook' | 'icon' | 'page';
interface SearchResult { type: ResultType; name: string; sub: string; href: string }

const TAG_STYLES: Record<ResultType, string> = {
  component: 'bg-blue-500/10 text-blue-500',
  hook:      'bg-violet-500/10 text-violet-500',
  icon:      'bg-amber-500/10 text-amber-600',
  page:      'bg-emerald-500/10 text-emerald-600',
};

function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = React.useState('');
  const [cursor, setCursor] = React.useState(0);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => { inputRef.current?.focus(); }, []);

  const results = React.useMemo((): SearchResult[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const comps: SearchResult[] = COMPONENTS
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 6)
      .map((c) => ({ type: 'component', name: c.name, sub: c.category, href: `/docs/${c.slug}` }));

    const hooks: SearchResult[] = HOOKS
      .filter((h) => h.name.toLowerCase().includes(q) || h.description.toLowerCase().includes(q))
      .slice(0, 4)
      .map((h) => ({ type: 'hook', name: h.name, sub: h.description, href: `/docs/hooks?q=${encodeURIComponent(h.name)}` }));

    const iconEntry: SearchResult[] = q.length >= 2
      ? [{ type: 'icon', name: `Search icons for "${q}"`, sub: 'Browse the icon library', href: `/docs/icons?q=${encodeURIComponent(q)}` }]
      : [];

    const pages: SearchResult[] = STATIC_PAGES
      .filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.sub.toLowerCase().includes(q) ||
        p.keywords.some((kw) => kw.includes(q)),
      )
      .map((p) => ({ type: 'page', name: p.name, sub: p.sub, href: p.href }));

    return [...pages, ...comps, ...hooks, ...iconEntry];
  }, [query]);

  React.useEffect(() => { setCursor(0); }, [results]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && results[cursor]) { router.push(results[cursor].href); onClose(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [results, cursor, onClose, router]);

  const navigate = (href: string) => { router.push(href); onClose(); };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-[12%] z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">

        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, hooks, pages, icons…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-fg">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            esc
          </kbd>
        </div>

        {query.trim() ? (
          results.length > 0 ? (
            <ul className="max-h-[380px] overflow-y-auto py-1.5">
              {results.map((r, i) => (
                <li key={r.href}>
                  <button
                    onClick={() => navigate(r.href)}
                    onMouseEnter={() => setCursor(i)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${cursor === i ? 'bg-accent' : 'hover:bg-accent/40'}`}
                  >
                    <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${TAG_STYLES[r.type]}`}>
                      {r.type}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{r.name}</p>
                      {r.sub && <p className="truncate text-[11px] text-muted-foreground">{r.sub}</p>}
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No results for{' '}
              <span className="font-medium text-fg">&ldquo;{query}&rdquo;</span>
            </p>
          )
        ) : (
          <div className="py-2">
            <p className="px-4 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              Quick links
            </p>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent/40"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                    <span className="flex-1 text-[13px] text-muted-foreground hover:text-fg">
                      {link.label}
                    </span>
                    <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                      link.tag === 'docs'    ? 'bg-blue-500/10 text-blue-500' :
                      link.tag === 'icons'   ? 'bg-amber-500/10 text-amber-600' :
                      link.tag === 'hooks'   ? 'bg-violet-500/10 text-violet-500' :
                      link.tag === 'package' ? 'bg-emerald-500/10 text-emerald-600' :
                                               'bg-emerald-500/10 text-emerald-600'
                    }`}>
                      {link.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-5 border-t border-border bg-muted/20 px-4 py-2">
          {[['↑↓', 'navigate'], ['↵', 'open'], ['esc', 'close']].map(([key, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <kbd className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-[9px]">{key}</kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Sidebar primitives ──────────────────────────────────────────────── */

function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">
        {label}
      </p>
      <div className="space-y-px">{children}</div>
    </div>
  );
}

function SidebarItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-2 rounded-lg px-2.5 py-[6px] text-[13px] transition-colors ${
        active
          ? 'bg-primary/8 font-medium text-primary'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-fg'
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
      )}
      {children}
    </Link>
  );
}
