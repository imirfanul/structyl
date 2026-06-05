'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight } from '@structyl/icons';
import { Box, Button, Input, InputGroup, Typography } from '@structyl/styled';
import { COMPONENTS, CATEGORIES, type ComponentEntry } from '../../lib/registry';
import { COMPONENT_CARD_PREVIEWS } from '../../lib/component-card-previews';
import { useNoAutofill } from '../../lib/use-no-autofill';

/* ──────────────────────────────────────────────────────────────────────────
   ComponentGallery — a browsable index of every component.

   Each tile renders the component's real live preview() inside a contained,
   centered frame and links to that component's own page (/docs/[slug]).
   Overlay / portal / feedback components are rendered inside a
   pointer-events-disabled wrapper so a tile stays a clean link and never
   auto-opens a dialog, toast, or menu on the index page.
   ────────────────────────────────────────────────────────────────────────── */

/** Renders a single preview, isolating render errors so one bad demo can't
 *  blank the whole gallery. */
class PreviewBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function GalleryTile({ entry }: { entry: ComponentEntry }) {
  // Prefer the curated compact card preview (shared with the theme builder) so
  // the tile looks clean; fall back to the full docs demo when none exists.
  const card = COMPONENT_CARD_PREVIEWS[entry.slug];
  const Preview = card?.preview ?? entry.preview;
  const frameMinH = card?.height ?? 200;

  // Overlay-link pattern: the whole card is NOT an <a>. A previewed component
  // may itself render an <a> or <button>, and nesting those inside an anchor is
  // invalid HTML (hydration error). Instead the card is a <div> and a single
  // absolutely-positioned <Link> overlays it — the preview is pointer-events
  // disabled, so clicks fall through to the overlay link.
  return (
    <Box className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:border-border-strong hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
      {/* Live preview frame — inert (decorative); not part of the tab order.
          Taller frame + generous padding so components have room to breathe.
          The inner wrapper clamps the demo width and centers it so wide docs
          previews don't overflow or shrink the whole tile. */}
      <Box
        className="relative flex flex-1 items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-br from-accent/20 to-transparent p-8"
        style={{ minHeight: frameMinH }}
      >
        <Box
          className="pointer-events-none flex max-h-full w-full max-w-2xl select-none items-center justify-center [&>*]:max-w-full"
          aria-hidden
          inert
        >
          <PreviewBoundary
            fallback={
              <span className="font-mono text-[11px] text-muted-foreground/60">
                {entry.name}
              </span>
            }
          >
            <Preview />
          </PreviewBoundary>
        </Box>
      </Box>

      {/* Meta */}
      <Box className="flex items-start justify-between gap-2 p-3.5">
        <Box className="min-w-0">
          <Typography as="p" variant="body2" className="truncate text-[13px] font-semibold">{entry.name}</Typography>
          <Typography as="p" variant="body2" className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-muted-foreground">
            {entry.description}
          </Typography>
        </Box>
        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
      </Box>

      {/* Full-card overlay link (the only interactive element in the tile). */}
      <Link
        href={`/docs/${entry.slug}`}
        className="absolute inset-0 z-10 rounded-xl focus:outline-none"
      >
        <span className="sr-only">{entry.name}</span>
      </Link>
    </Box>
  );
}

export function ComponentGallery() {
  const [query, setQuery] = React.useState('');
  const noAutofill = useNoAutofill();

  const q = query.toLowerCase().trim();
  const filtered = React.useMemo(
    () =>
      q
        ? COMPONENTS.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.category.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q),
          )
        : COMPONENTS,
    [q],
  );

  // Group filtered components by category, preserving CATEGORIES order.
  const grouped = React.useMemo(() => {
    const catSet = new Set<string>(CATEGORIES);
    const order = [...CATEGORIES, ...new Set(COMPONENTS.map((c) => c.category).filter((c) => !catSet.has(c)))];
    return order
      .map((cat) => ({ cat, items: filtered.filter((c) => c.category === cat) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  return (
    <Box>
      {/* Search */}
      <Box className="sticky top-[52px] z-20 -mx-6 mb-8 border-b border-border/40 bg-bg/80 px-6 py-4 backdrop-blur-md md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
        <Box className="max-w-md">
          <InputGroup
            startElement={<Search />}
            endElement={
              query ? (
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="pointer-events-auto text-muted-foreground transition-colors hover:text-fg"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : undefined
            }
          >
            <Input
              {...noAutofill}
              type="text"
              role="searchbox"
              name="structyl-component-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${COMPONENTS.length} components…`}
              className="[&::-webkit-search-cancel-button]:appearance-none"
            />
          </InputGroup>
        </Box>
      </Box>

      {grouped.length === 0 ? (
        <Typography as="p" variant="body2" className="py-16 text-center text-sm text-muted-foreground">
          No components match{' '}
          <span className="font-medium text-fg">&ldquo;{query}&rdquo;</span>.
        </Typography>
      ) : (
        <Box className="space-y-12">
          {grouped.map(({ cat, items }) => (
            <section key={cat} id={cat.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
              <Box className="mb-4 flex items-baseline gap-3">
                <Typography as="h2" variant="h2" className="text-lg font-semibold tracking-tight">{cat}</Typography>
                <span className="text-[12px] text-muted-foreground">{items.length}</span>
              </Box>
              <Box className="grid grid-cols-1 gap-5">
                {items.map((entry) => (
                  <GalleryTile key={entry.slug} entry={entry} />
                ))}
              </Box>
            </section>
          ))}
        </Box>
      )}
    </Box>
  );
}
