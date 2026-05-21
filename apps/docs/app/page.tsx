import Link from 'next/link';
import { ArrowUpRight, Component, Layers, Palette, Table2 } from '@aura-ui/icons';
import { Button } from '@aura-ui/styled';

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-mono text-sm tracking-tight">
            <span className="size-2 rounded-full bg-primary" />
            <span className="font-semibold">aura-ui</span>
            <span className="text-muted-foreground">/ v0.0.1</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-fg">
              Docs
            </Link>
            <Link href="/components" className="text-muted-foreground hover:text-fg">
              Components
            </Link>
            <Link
              href="https://github.com"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-fg"
            >
              GitHub <ArrowUpRight className="size-3" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-col gap-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            v0.0.1 · in development
          </span>

          <h1 className="text-balance font-sans text-5xl font-medium tracking-tight md:text-7xl">
            A React component library
            <br />
            <span className="text-muted-foreground">designed for the long game.</span>
          </h1>

          <p className="max-w-2xl text-balance text-lg text-muted-foreground">
            Headless primitives. Tailwind-styled components. Runtime theming. A first-class
            DataTable. Everything you need, none of the lock-in.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/docs">Read the docs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/components">Browse components</Link>
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm text-muted-foreground">
            <span className="text-fg">$</span> pnpm add @aura-ui/styled @aura-ui/themes
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-4">
          {[
            {
              icon: Component,
              title: 'Headless',
              body: 'Accessible behavior primitives that work with any styling solution.',
            },
            {
              icon: Layers,
              title: 'Styled',
              body: 'Tailwind-styled wrappers, batteries included, copy-paste-friendly.',
            },
            {
              icon: Palette,
              title: 'Themed',
              body: 'Runtime theme switching with CSS variables. No FOUC.',
            },
            {
              icon: Table2,
              title: 'DataTable',
              body: 'Built-in. Sorting, filtering, virtualization, server-side data.',
            },
          ].map((pillar) => (
            <div key={pillar.title} className="bg-bg p-8">
              <pillar.icon className="mb-4 size-5 text-primary" aria-hidden />
              <h3 className="mb-1 font-medium">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
          <span>MIT © aura-ui contributors</span>
          <span className="font-mono">v0.0.1</span>
        </div>
      </footer>
    </div>
  );
}
