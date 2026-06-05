'use client';

import * as React from 'react';

import { Box, Typography } from '@structyl/styled';

/* ── Shortcut data ───────────────────────────────────────────────────── */

type ShortcutGroup = {
  label: string;
  shortcuts: { keys: string[]; description: string }[];
};

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    label: 'Global',
    shortcuts: [
      { keys: ['⌘', 'K'],   description: 'Open global search / command palette' },
      { keys: ['Esc'],       description: 'Close modal, dialog, popover, or search' },
      { keys: ['?'],         description: 'Open keyboard shortcuts reference (this page)' },
    ],
  },
  {
    label: 'Search & Navigation',
    shortcuts: [
      { keys: ['↑', '↓'],   description: 'Move up / down through search results' },
      { keys: ['↵'],         description: 'Open the focused search result' },
      { keys: ['Tab'],       description: 'Move focus to the next interactive element' },
      { keys: ['Shift', 'Tab'], description: 'Move focus to the previous interactive element' },
    ],
  },
  {
    label: 'Component interactions',
    shortcuts: [
      { keys: ['Enter', 'Space'], description: 'Activate focused button, checkbox, or toggle' },
      { keys: ['←', '→'],        description: 'Navigate between tabs, radio options, or slider values' },
      { keys: ['Home'],           description: 'Jump to first item in a list or menu' },
      { keys: ['End'],            description: 'Jump to last item in a list or menu' },
      { keys: ['↑', '↓'],        description: 'Navigate dropdown menu items' },
    ],
  },
  {
    label: 'Dialog & Modal',
    shortcuts: [
      { keys: ['Esc'],          description: 'Close the dialog without saving' },
      { keys: ['Tab'],          description: 'Cycle focus within the dialog (trapped)' },
      { keys: ['Shift', 'Tab'], description: 'Cycle focus backwards within the dialog' },
    ],
  },
  {
    label: 'DataTable',
    shortcuts: [
      { keys: ['↑', '↓'],        description: 'Navigate between rows' },
      { keys: ['Space'],          description: 'Select / deselect the focused row' },
      { keys: ['Shift', 'Space'], description: 'Range-select rows (hold Shift while pressing Space)' },
      { keys: ['⌘', 'A'],        description: 'Select all visible rows' },
      { keys: ['Esc'],           description: 'Clear row selection' },
    ],
  },
];

/* ── Key cap ─────────────────────────────────────────────────────────── */

function KeyCap({ label }: { label: string }) {
  return (
    <kbd className="inline-flex items-center justify-center rounded-md border border-border bg-muted px-2 py-1 font-mono text-[12px] font-medium text-fg shadow-[0_2px_0_hsl(var(--color-border))] transition-transform active:translate-y-px">
      {label}
    </kbd>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default function KeyboardShortcutsPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <Typography as="p" variant="body2" className="text-xs font-semibold uppercase tracking-widest text-primary">Resources</Typography>
      <Typography as="h1" variant="h1" className="mt-2 text-4xl font-semibold tracking-tight">Keyboard shortcuts</Typography>
      <Typography as="p" variant="body2" className="mt-3 text-base text-muted-foreground">
        structyl components are fully keyboard-navigable. Every interactive pattern follows the{' '}
        <a
          href="https://www.w3.org/WAI/ARIA/apg/"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          WAI-ARIA Authoring Practices Guide
        </a>
        .
      </Typography>

      <Box className="mt-10 space-y-10">
        {SHORTCUT_GROUPS.map((group) => (
          <section key={group.label}>
            <Typography as="h2" variant="h2" className="mb-4 text-xl font-semibold tracking-tight">{group.label}</Typography>
            <Box className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs text-muted-foreground">
                  <tr>
                    <th className="w-[220px] px-4 py-2.5 font-medium">Keys</th>
                    <th className="px-4 py-2.5 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {group.shortcuts.map((shortcut, i) => (
                    <tr key={i} className="border-t border-border/60">
                      <td className="px-4 py-3">
                        <Box className="flex flex-wrap items-center gap-1.5">
                          {shortcut.keys.map((key, j) => (
                            <React.Fragment key={j}>
                              <KeyCap label={key} />
                              {j < shortcut.keys.length - 1 && (
                                <span className="text-[11px] text-muted-foreground">+</span>
                              )}
                            </React.Fragment>
                          ))}
                        </Box>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{shortcut.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </section>
        ))}
      </Box>

      {/* A11y note */}
      <Box className="mt-10 rounded-xl border border-border bg-muted/20 p-5">
        <Typography as="h3" variant="h3" className="text-sm font-semibold">Testing keyboard accessibility</Typography>
        <Typography as="p" variant="body2" className="mt-1.5 text-sm text-muted-foreground">
          All components are tested with axe-core in CI. For manual testing, use{' '}
          <a
            href="https://www.nvaccess.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            NVDA
          </a>{' '}
          on Windows and{' '}
          <a
            href="https://support.apple.com/guide/voiceover"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            VoiceOver
          </a>{' '}
          on macOS / iOS. Components ship with correct ARIA roles, states, and properties.
        </Typography>
      </Box>
    </article>
  );
}
