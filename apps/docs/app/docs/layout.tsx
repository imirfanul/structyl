'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Search } from '@aura-ui/icons';
import { Button } from '@aura-ui/styled';
import { useTheme } from '@aura-ui/themes';
import { COMPONENTS, CATEGORIES } from '../../lib/registry';

const OVERVIEW = [
  { slug: 'introduction', title: 'Introduction' },
  { slug: 'getting-started', title: 'Getting started' },
  { slug: 'accessibility', title: 'Accessibility' },
  { slug: 'hooks', title: 'Hooks' },
  { slug: 'packages', title: 'Packages' },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resolvedMode, setMode } = useTheme();
  const [query, setQuery] = React.useState('');

  const filtered = COMPONENTS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-glass">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">aura-ui</span>
          </Link>
          <nav className="hidden gap-5 text-sm md:flex">
            <Link href="/docs" className="font-medium text-fg">Documentation</Link>
            <Link href="/themes" className="text-muted-foreground hover:text-fg transition-colors">Themes</Link>
            <Link href="/docs/hooks" className="text-muted-foreground hover:text-fg transition-colors">Hooks</Link>
            <Link href="/docs/packages" className="text-muted-foreground hover:text-fg transition-colors">Packages</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {resolvedMode === 'dark' ? '☀' : '☾'}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border/60 px-4 py-6 md:block">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              className="h-8 w-full rounded-md border border-border bg-bg pl-8 pr-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>

          <SidebarGroup title="Overview">
            {OVERVIEW.map((o) => (
              <SidebarLink key={o.slug} href={`/docs/${o.slug}`} active={pathname === `/docs/${o.slug}`}>
                {o.title}
              </SidebarLink>
            ))}
          </SidebarGroup>

          {CATEGORIES.map((cat) => {
            const items = filtered.filter((c) => c.category === cat);
            if (!items.length) return null;
            return (
              <SidebarGroup key={cat} title={cat}>
                {items.map((c) => (
                  <SidebarLink key={c.slug} href={`/docs/${c.slug}`} active={pathname === `/docs/${c.slug}`}>
                    {c.name}
                  </SidebarLink>
                ))}
              </SidebarGroup>
            );
          })}
        </aside>

        {/* Content */}
        <main className="min-w-0 px-6 py-10 md:px-12">{children}</main>
      </div>
    </div>
  );
}

function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function SidebarLink({
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
      className={`relative block rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-snappy ${
        active
          ? 'bg-accent font-medium text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent/50 hover:text-fg'
      }`}
    >
      {active && <span className="absolute -left-4 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />}
      {children}
    </Link>
  );
}
