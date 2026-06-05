'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, ArrowUpRight, Eye } from '@structyl/icons';
import { Box, Typography } from '@structyl/styled';
import { COMPONENTS, type ComponentEntry, type ApiPart } from '../../../../lib/registry';
import { API } from '../../../../lib/api-data';
import { CodeBlock } from '../../../../components/code-block';
import { DocsNotFound } from '../../../../components/docs-not-found';

/* ──────────────────────────────────────────────────────────────────────────
   /docs/api/[slug] — dedicated, MUI-style full API reference for one component.

   Sections, top to bottom:
     1. Title + breadcrumb + "View component" link
     2. Import
     3. Props (one table per part, each prop with its own anchor id)
     4. Anatomy (if present)
     5. Keyboard interactions (if present)
     6. Source code link

   The right-hand "On this page" TOC is granular: it lists every part heading
   AND every individual prop name, deep-linkable, and highlights on scroll.
   ────────────────────────────────────────────────────────────────────────── */

function slugifyProp(part: string, prop: string): string {
  return `prop-${part}-${prop}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
}

function importLine(entry: ComponentEntry): string {
  // Compound components (api part names contain a dot) import the namespace.
  const root = entry.name.replace(/\s+/g, '');
  return `import { ${root} } from '@structyl/styled';`;
}

export default function ApiReferencePage() {
  const params = useParams();
  const slug = String(params.slug);
  const entry = COMPONENTS.find((c) => c.slug === slug);
  if (!entry) {
    return (
      <DocsNotFound
        title="No API reference for that."
        message="This component doesn't exist, so there's no API to document. Browse the catalogue to find what you need."
      />
    );
  }

  const api: ApiPart[] | undefined = entry.api ?? API[entry.slug];

  return <ApiReference entry={entry} api={api} />;
}

type TocEntry = { id: string; label: string; depth: 0 | 1 };

function ApiReference({ entry, api }: { entry: ComponentEntry; api?: ApiPart[] }) {
  const [activeId, setActiveId] = React.useState<string>('');

  // Build the granular TOC: each part, then each of its props.
  const toc: TocEntry[] = React.useMemo(() => {
    const items: TocEntry[] = [{ id: 'import', label: 'Import', depth: 0 }];
    if (api?.length) {
      items.push({ id: 'props', label: 'Props', depth: 0 });
      for (const part of api) {
        const partId = `part-${part.name.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`;
        items.push({ id: partId, label: part.name, depth: 0 });
        for (const p of part.props) {
          items.push({ id: slugifyProp(part.name, p.name), label: p.name, depth: 1 });
        }
      }
    }
    if (entry.anatomy) items.push({ id: 'anatomy', label: 'Anatomy', depth: 0 });
    if (entry.keyboard?.length) items.push({ id: 'keyboard', label: 'Keyboard', depth: 0 });
    items.push({ id: 'source', label: 'Source', depth: 0 });
    return items;
  }, [api, entry.anatomy, entry.keyboard]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -80% 0px' },
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <Box className="flex gap-12">
      {/* Main */}
      <article className="min-w-0 flex-1">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground">
          <Link href="/docs" className="transition-colors hover:text-fg">Docs</Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span>Component API</span>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span className="font-medium text-fg">{entry.name}</span>
        </nav>

        {/* Title */}
        <Box className="flex flex-wrap items-center justify-between gap-3">
          <Typography as="h1" variant="h1" className="text-4xl font-semibold tracking-tight">{entry.name} API</Typography>
          <Link
            href={`/docs/${entry.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-fg"
          >
            <Eye className="h-3.5 w-3.5" />
            View component
          </Link>
        </Box>
        <Typography as="p" variant="body2" className="mt-3 max-w-2xl text-base text-muted-foreground">
          The full prop reference for the <span className="font-medium text-fg">{entry.name}</span>{' '}
          component. {entry.description}
        </Typography>

        {/* Import */}
        <Section id="import" title="Import">
          <CodeBlock code={importLine(entry)} lang="tsx" />
        </Section>

        {/* Props */}
        {api && api.length > 0 ? (
          <Section id="props" title="Props">
            {api.map((part) => {
              const partId = `part-${part.name.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`;
              return (
                <Box key={part.name} id={partId} className="mb-8 scroll-mt-20">
                  <Typography as="h3" variant="h3" className="font-mono text-sm font-semibold text-primary">{part.name}</Typography>
                  {part.description && (
                    <Typography as="p" variant="body2" className="mb-3 mt-1 text-sm text-muted-foreground">{part.description}</Typography>
                  )}
                  <Box className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 font-medium">Prop</th>
                          <th className="px-3 py-2 font-medium">Type</th>
                          <th className="px-3 py-2 font-medium">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        {part.props.map((p) => {
                          const propId = slugifyProp(part.name, p.name);
                          return (
                            <tr key={p.name} id={propId} className="scroll-mt-20 border-t border-border/60 align-top">
                              <td className="px-3 py-2.5">
                                <a
                                  href={`#${propId}`}
                                  className="group inline-flex items-center gap-1 font-mono font-medium text-fg"
                                >
                                  {p.name}
                                  <span className="text-muted-foreground/0 transition-colors group-hover:text-muted-foreground">
                                    #
                                  </span>
                                </a>
                              </td>
                              <td className="px-3 py-2.5">
                                <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                                  {p.type}
                                </code>
                                <Typography as="p" variant="body2" className="mt-1.5 text-muted-foreground">{p.description}</Typography>
                              </td>
                              <td className="whitespace-nowrap px-3 py-2.5 font-mono text-muted-foreground">
                                {p.default ?? '—'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Box>
                </Box>
              );
            })}
          </Section>
        ) : (
          <Section id="props" title="Props">
            <Box className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center">
              <Typography as="p" variant="body2" className="text-sm text-muted-foreground">
                A detailed prop reference for this component is coming soon. In the meantime, see the{' '}
                <Link href={`/docs/${entry.slug}`} className="text-primary hover:underline">
                  component page
                </Link>{' '}
                for usage examples.
              </Typography>
            </Box>
          </Section>
        )}

        {/* Anatomy */}
        {entry.anatomy && (
          <Section id="anatomy" title="Anatomy">
            <Typography as="p" variant="body2" className="mb-2 text-sm text-muted-foreground">Import the parts and compose them together.</Typography>
            <CodeBlock code={entry.anatomy} lang="tsx" />
          </Section>
        )}

        {/* Keyboard */}
        {entry.keyboard && entry.keyboard.length > 0 && (
          <Section id="keyboard" title="Keyboard interactions">
            {entry.ariaPattern && (
              <Typography as="p" variant="body2" className="mb-2 text-sm text-muted-foreground">
                Adheres to the{' '}
                <a href={entry.ariaPattern} target="_blank" rel="noreferrer" className="text-primary underline-offset-2 hover:underline">
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
                        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">{k.key}</kbd>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{k.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Section>
        )}

        {/* Source */}
        <Section id="source" title="Source code">
          <Typography as="p" variant="body2" className="text-sm text-muted-foreground">
            If you didn&apos;t find what you need here, read the{' '}
            <a
              href={`https://github.com/imirfanul/structyl/tree/master/packages/styled/src/${entry.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              component implementation <ArrowUpRight className="inline h-3 w-3" />
            </a>
            .
          </Typography>
        </Section>
      </article>

      {/* On this page */}
      {toc.length > 1 && (
        <aside className="hidden w-[200px] shrink-0 xl:block">
          <Box className="sticky top-[76px] max-h-[calc(100vh-100px)] overflow-y-auto">
            <Typography as="p" variant="body2" className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              On this page
            </Typography>
            <nav className="space-y-0.5">
              {toc.map(({ id, label, depth }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block border-l-2 py-1 text-[12px] transition-colors ${
                    depth === 1 ? 'pl-6 font-mono text-[11px]' : 'pl-3'
                  } ${
                    activeId === id
                      ? 'border-primary font-medium text-primary'
                      : 'border-transparent text-muted-foreground hover:text-fg'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </Box>
        </aside>
      )}
    </Box>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <Typography as="h2" variant="h2" className="mb-3 text-xl font-semibold tracking-tight">{title}</Typography>
      {children}
    </section>
  );
}
