'use client';

import * as React from 'react';
import { Box, Typography } from '@structyl/styled';

/* ── Changelog data ──────────────────────────────────────────────────── */

type ChangeType = 'feat' | 'fix' | 'breaking' | 'perf' | 'docs';

type ChangeEntry = {
  version: string;
  date: string;
  changes: { type: ChangeType; package: string; description: string }[];
};

const RELEASES: ChangeEntry[] = [
  {
    version: '1.1.0',
    date: 'June 2026',
    changes: [
      { type: 'feat',  package: '@structyl/styled',       description: 'All components now accept and forward native HTML attributes (onClick, onMouseEnter, onFocus, className, style, id, tabIndex, aria-*, data-*, …) to their root element; internal handlers compose and className merges' },
      { type: 'feat',  package: '@structyl/themes',       description: 'Default theme is now "structyl" — ThemeProvider and ThemeScript default from "slate" to "structyl" (pass defaultTheme="slate" to keep the previous default)' },
      { type: 'feat',  package: '@structyl/themes',       description: 'Add useColorPreset({ defaultPresetId }) to pre-select an accent preset on first load' },
      { type: 'fix',   package: '@structyl/themes',       description: 'Accent presets no longer reset when toggling light/dark mode — re-applied after ThemeProvider via a MutationObserver instead of relying on effect order' },
      { type: 'fix',   package: '@structyl/video-player', description: 'Fix YouTube embeds collapsing to zero height in apps whose Tailwind lacks the aspect-video utility' },
      { type: 'fix',   package: '@structyl/video-player', description: 'Settings menu is now responsive and the control bar wraps instead of clipping on narrow players' },
      { type: 'fix',   package: 'docs',                   description: 'Fix DataTable example overflowing into the "On this page" panel' },
      { type: 'fix',   package: 'docs',                   description: 'Component Prev/Next navigation now follows the sidebar order' },
      { type: 'feat',  package: 'docs',                   description: 'Sidebar is now a collapsible drawer on small screens (hamburger toggle)' },
      { type: 'docs',  package: 'all packages',           description: 'Add author, repository, and homepage (www.structyl.com) metadata; releases now publish with npm provenance' },
    ],
  },
  {
    version: '0.5.0',
    date: 'May 2026',
    changes: [
      { type: 'feat',     package: '@structyl/data-table', description: 'Add virtual scrolling with @tanstack/react-virtual for 100k+ row datasets' },
      { type: 'feat',     package: '@structyl/data-table', description: 'Column pinning — pin columns left or right with drag-and-drop reorder' },
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Combobox component with multi-select and async search support' },
      { type: 'feat',     package: '@structyl/styled',     description: 'Add DatePicker and DateRangePicker components' },
      { type: 'feat',     package: '@structyl/hooks',      description: 'Add useIntersectionObserver, useResizeObserver, useEventListener hooks' },
      { type: 'perf',     package: '@structyl/styled',     description: 'Tree-shake unused variant classes at build time via tailwind-variants v0.3' },
      { type: 'fix',      package: '@structyl/themes',     description: 'Fix color-scheme flash on initial page load in dark mode' },
      { type: 'docs',     package: 'docs',                description: 'Add interactive design tokens page and component status badges' },
    ],
  },
  {
    version: '0.4.0',
    date: 'April 2026',
    changes: [
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Skeleton component with animated pulse and wave variants' },
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Select component with search, groups, and virtualised options' },
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Slider, Switch, and Checkbox with indeterminate state' },
      { type: 'feat',     package: '@structyl/hooks',      description: 'Add useDarkMode, useHotkeys, useClickOutside, useCopyToClipboard' },
      { type: 'breaking', package: '@structyl/primitives', description: 'Rename Dialog.Panel → Dialog.Content to align with Radix naming' },
      { type: 'fix',      package: '@structyl/styled',     description: 'Fix focus-ring not visible in high-contrast mode' },
      { type: 'fix',      package: '@structyl/data-table', description: 'Fix row selection state not preserved across paginated views' },
    ],
  },
  {
    version: '0.3.0',
    date: 'March 2026',
    changes: [
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Dialog, Sheet, and Drawer components with focus trapping' },
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Tabs and Accordion with compound component API' },
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Tooltip and Popover via @floating-ui/react' },
      { type: 'feat',     package: '@structyl/data-table', description: 'Initial DataTable release with sorting, filtering, and pagination' },
      { type: 'feat',     package: '@structyl/themes',     description: 'Add zinc and rose theme presets in addition to the default slate' },
      { type: 'perf',     package: '@structyl/icons',      description: 'Lazy-load icons via dynamic import to reduce initial bundle' },
      { type: 'docs',     package: 'docs',                description: 'Launch interactive icon browser with search and copy-to-clipboard' },
    ],
  },
  {
    version: '0.2.0',
    date: 'February 2026',
    changes: [
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Badge, Card, Avatar, and Separator components' },
      { type: 'feat',     package: '@structyl/styled',     description: 'Add Input, Textarea, and Label with form integration' },
      { type: 'feat',     package: '@structyl/hooks',      description: 'Add useDebounce, useThrottle, useLocalStorage, useMediaQuery' },
      { type: 'feat',     package: '@structyl/themes',     description: 'Initial ThemeProvider with CSS variable injection and system mode support' },
      { type: 'breaking', package: '@structyl/styled',     description: 'Move Button variants from class strings to tailwind-variants API' },
      { type: 'fix',      package: '@structyl/core',       description: 'Fix Slot component not merging event handlers correctly' },
    ],
  },
  {
    version: '0.1.0',
    date: 'January 2026',
    changes: [
      { type: 'feat', package: '@structyl/core',       description: 'Initial release with Slot, Primitive, and createContext utilities' },
      { type: 'feat', package: '@structyl/primitives', description: 'Initial headless primitives: Button, Dialog (partial), Tooltip' },
      { type: 'feat', package: '@structyl/styled',     description: 'Initial styled layer: Button with size/variant/shape axes' },
      { type: 'feat', package: '@structyl/hooks',      description: 'Initial hooks: useBoolean, useToggle, useCounter, usePrevious, useMount' },
      { type: 'docs', package: 'docs',                description: 'Launch docs site with getting-started guide and component API reference' },
    ],
  },
];

/* ── Badge styles ────────────────────────────────────────────────────── */

const TYPE_STYLES: Record<ChangeType, string> = {
  feat:     'bg-blue-500/10 text-blue-500',
  fix:      'bg-emerald-500/10 text-emerald-600',
  breaking: 'bg-red-500/10 text-red-500',
  perf:     'bg-violet-500/10 text-violet-500',
  docs:     'bg-amber-500/10 text-amber-600',
};

const TYPE_LABELS: Record<ChangeType, string> = {
  feat:     'feature',
  fix:      'fix',
  breaking: 'breaking',
  perf:     'perf',
  docs:     'docs',
};

/* ── Page ────────────────────────────────────────────────────────────── */

export default function ChangelogPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <Typography as="p" variant="body2" className="text-xs font-semibold uppercase tracking-widest text-primary">Resources</Typography>
      <Typography as="h1" variant="h1" className="mt-2 text-4xl font-semibold tracking-tight">Changelog</Typography>
      <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">
        All notable changes to structyl packages. We follow{' '}
        <a
          href="https://semver.org"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          semantic versioning
        </a>
        .
      </Typography>

      {/* Legend */}
      <Box className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(TYPE_STYLES) as ChangeType[]).map((t) => (
          <span
            key={t}
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_STYLES[t]}`}
          >
            {TYPE_LABELS[t]}
          </span>
        ))}
      </Box>

      {/* Releases */}
      <Box className="relative mt-10">
        {/* Timeline line */}
        <Box className="absolute left-[9px] top-2 bottom-0 w-px bg-border/60" />

        <Box className="space-y-12">
          {RELEASES.map((release) => (
            <Box key={release.version} className="relative pl-8">
              {/* Timeline dot */}
              <Box className="absolute left-0 top-1.5 flex h-[18px] w-[18px] items-center justify-center">
                <Box className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-bg" />
              </Box>

              {/* Version header */}
              <Box className="mb-4 flex flex-wrap items-baseline gap-3">
                <Typography as="h2" variant="h2" className="text-xl font-semibold tracking-tight">v{release.version}</Typography>
                <span className="text-[12px] text-muted-foreground">{release.date}</span>
              </Box>

              {/* Changes */}
              <Box className="space-y-2.5">
                {release.changes.map((change, i) => (
                  <Box key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TYPE_STYLES[change.type]}`}
                    >
                      {TYPE_LABELS[change.type]}
                    </span>
                    <Box className="min-w-0 flex-1">
                      <Typography as="p" variant="body2" className="text-sm text-fg">{change.description}</Typography>
                      <Typography as="p" variant="body2" className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                        {change.package}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer note */}
      <Box className="mt-14 rounded-xl border border-border bg-muted/20 p-5 text-sm text-muted-foreground">
        For the full git history, see the{' '}
        <a
          href="https://github.com/imirfanul/structyl/commits/main"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          commit log on GitHub
        </a>
        .
      </Box>
    </article>
  );
}
