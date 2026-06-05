'use client';

import * as React from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   Component card previews — polished, compact, self-contained mini-previews
   per component slug. Used by both the theme builder (/themes) and the docs
   component gallery (/docs) so a component looks clean and consistent in a
   small card, instead of cramming the full-width docs demo into a tile.

   Extracted from the theme builder so both surfaces share one source of truth.
   ────────────────────────────────────────────────────────────────────────── */

export const COMPONENT_CARD_PREVIEWS: Record<string, { preview: () => React.ReactNode; height?: number }> = {
  /* ── Overlays rendered as frozen mockup cards ──────────────────────── */
  dialog: {
    height: 220,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        <div className="border-b border-border px-4 py-3">
          <p className="text-[13px] font-semibold">Edit profile</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Update your name and email address.</p>
        </div>
        <div className="space-y-2 px-4 py-3">
          <div className="rounded-lg border border-border bg-bg px-2.5 py-1.5 text-[11px] text-fg">Jane Doe</div>
          <div className="rounded-lg border border-border bg-bg px-2.5 py-1.5 text-[11px] text-muted-foreground">jane@company.com</div>
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-4 py-2.5">
          <div className="rounded-lg border border-border px-3 py-1 text-[10px] text-muted-foreground">Cancel</div>
          <div className="rounded-lg bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground">Save changes</div>
        </div>
      </div>
    ),
  },
  'alert-dialog': {
    height: 180,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        <div className="px-4 py-4">
          <p className="text-[13px] font-semibold">Delete workspace?</p>
          <p className="mt-1.5 text-[10px] text-muted-foreground leading-relaxed">
            This action is permanent. All projects, members, and billing history will be erased.
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-4 py-2.5">
          <div className="rounded-lg border border-border px-3 py-1 text-[10px] text-muted-foreground">Cancel</div>
          <div className="rounded-lg bg-destructive px-3 py-1 text-[10px] font-medium text-destructive-foreground">Delete workspace</div>
        </div>
      </div>
    ),
  },
  sheet: {
    height: 200,
    preview: () => (
      <div className="flex w-full overflow-hidden rounded-2xl border border-border" style={{ height: 180 }}>
        <div className="flex-1 bg-muted/20 p-3">
          <div className="space-y-2">
            <div className="h-2.5 w-3/4 rounded-full bg-border/70" />
            <div className="h-2 w-full rounded-full bg-border/40" />
            <div className="h-2 w-2/3 rounded-full bg-border/40" />
          </div>
        </div>
        <div className="w-[150px] shrink-0 border-l border-border bg-card p-3">
          <p className="mb-3 text-[10px] font-semibold">Filters</p>
          <div className="space-y-2">
            {['Status', 'Priority', 'Assignee', 'Date'].map(f => (
              <label key={f} className="flex cursor-pointer items-center gap-2">
                <div className="h-3 w-3 rounded border border-border bg-bg" />
                <span className="text-[10px] text-muted-foreground">{f}</span>
              </label>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-primary py-1 text-center text-[9px] font-medium text-primary-foreground">Apply filters</div>
        </div>
      </div>
    ),
  },
  drawer: {
    height: 190,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border" style={{ height: 170 }}>
        <div className="h-[90px] bg-muted/20 p-3">
          <div className="space-y-2">
            <div className="h-2.5 w-1/2 rounded-full bg-border/60" />
            <div className="h-2 w-3/4 rounded-full bg-border/40" />
          </div>
        </div>
        <div className="border-t border-border bg-card p-3">
          <div className="mx-auto mb-2.5 h-1 w-8 rounded-full bg-border" />
          <p className="mb-2 text-[10px] font-semibold">Sort by</p>
          <div className="flex gap-1.5">
            {[['Date', true], ['Name', false], ['Status', false]].map(([s, active]) => (
              <div key={String(s)} className={`rounded-lg border px-2.5 py-1 text-[9px] font-medium ${active ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{String(s)}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  tooltip: {
    height: 140,
    preview: () => (
      <div className="flex flex-col items-center gap-1 pt-3">
        <div className="rounded-lg bg-fg px-3 py-1.5 shadow-md">
          <p className="text-[10px] font-medium text-bg">Copy to clipboard</p>
        </div>
        <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid hsl(var(--color-fg))' }} />
        <button className="mt-1 rounded-lg border border-border bg-card px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm">Copy</button>
      </div>
    ),
  },
  popover: {
    height: 210,
    preview: () => (
      <div className="flex flex-col items-center gap-2">
        <div className="w-full rounded-2xl border border-border bg-card p-3.5 shadow-lg">
          <p className="mb-3 text-[10px] font-semibold">Appearance</p>
          <div className="space-y-2">
            {[['Light', true], ['Dark', false], ['System', false]].map(([m, checked]) => (
              <label key={String(m)} className="flex cursor-pointer items-center gap-2.5">
                <div className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${checked ? 'border-primary' : 'border-border'}`}>
                  {checked && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </div>
                <span className="text-[11px] text-muted-foreground">{String(m)}</span>
              </label>
            ))}
          </div>
        </div>
        <button className="rounded-lg border border-border bg-card px-3.5 py-1.5 text-[11px] text-muted-foreground shadow-sm">Settings ▾</button>
      </div>
    ),
  },
  'hover-card': {
    height: 190,
    preview: () => (
      <div className="w-full rounded-2xl border border-border bg-card p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/40 text-[14px] font-bold text-primary-foreground">J</div>
          <div>
            <p className="text-[12px] font-semibold">Jane Doe</p>
            <p className="text-[10px] text-muted-foreground">@janedoe · Joined 2022</p>
          </div>
        </div>
        <p className="mt-2.5 text-[10px] leading-relaxed text-muted-foreground">Design systems engineer. Building structyl in public.</p>
        <div className="mt-2.5 flex gap-4 text-[10px]">
          <span className="font-semibold">2.1k <span className="font-normal text-muted-foreground">followers</span></span>
          <span className="font-semibold">142 <span className="font-normal text-muted-foreground">following</span></span>
        </div>
      </div>
    ),
  },
  'dropdown-menu': {
    height: 210,
    preview: () => (
      <div className="w-full space-y-2">
        <button className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2 text-[12px] shadow-sm">
          <span className="font-medium">Options</span>
          <span className="text-muted-foreground text-[10px]">▾</span>
        </button>
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg">
          {[['Profile', '⌘P', null], ['Settings', '⌘,', null], null, ['Duplicate', '⌘D', null], null, ['Delete', '⌘⌫', 'destructive']].map((item, i) =>
            item === null
              ? <div key={i} className="my-0.5 h-px bg-border/60" />
              : <div key={String(item[0])} className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[10px] ${item[2] === 'destructive' ? 'text-destructive hover:bg-destructive/10' : 'text-fg hover:bg-muted/50'}`}>
                  <span>{item[0]}</span>
                  <span className="font-mono text-[9px] text-muted-foreground/60">{item[1]}</span>
                </div>
          )}
        </div>
      </div>
    ),
  },
  'context-menu': {
    height: 220,
    preview: () => (
      <div className="w-full space-y-2">
        <div className="flex h-10 items-center justify-center rounded-xl border-2 border-dashed border-border text-[10px] text-muted-foreground">Right-click area</div>
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg">
          {[['Open', null], ['Open in new tab', null], null, ['Copy link', '⌘C'], ['Share', null], null, ['Properties', null]].map((item, i) =>
            item === null
              ? <div key={i} className="my-0.5 h-px bg-border/60" />
              : <div key={String(item[0])} className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[10px] text-fg hover:bg-muted/50">
                  <span>{item[0]}</span>
                  {item[1] && <span className="font-mono text-[9px] text-muted-foreground/60">{item[1]}</span>}
                </div>
          )}
        </div>
      </div>
    ),
  },
  menubar: {
    height: 200,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-0.5 border-b border-border px-2 py-1.5">
          {['File', 'Edit', 'View', 'Help'].map((m, i) => (
            <div key={m} className={`rounded-md px-2.5 py-1 text-[10px] font-medium ${i === 1 ? 'bg-muted text-fg' : 'text-muted-foreground'}`}>{m}</div>
          ))}
        </div>
        <div className="ml-[48px] w-[148px] overflow-hidden border-x border-b border-border bg-card p-1">
          {[['Undo', '⌘Z'], ['Redo', '⇧⌘Z'], null, ['Cut', '⌘X'], ['Copy', '⌘C'], ['Paste', '⌘V']].map((item, i) =>
            item === null
              ? <div key={i} className="my-0.5 h-px bg-border/60" />
              : <div key={String(item[0])} className="flex justify-between rounded-lg px-2.5 py-1.5 text-[10px] text-fg hover:bg-muted/50">
                  <span>{item[0]}</span>
                  <span className="font-mono text-[9px] text-muted-foreground/50">{item[1]}</span>
                </div>
          )}
        </div>
      </div>
    ),
  },
  'navigation-menu': {
    height: 200,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-1 border-b border-border px-3 py-2">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">A</div>
          {['Products ▾', 'Docs', 'Blog'].map((item, i) => (
            <div key={item} className={`rounded-lg px-2.5 py-1 text-[10px] font-medium ${i === 0 ? 'bg-muted text-fg' : 'text-muted-foreground'}`}>{item}</div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-2.5">
          {[['Components', 'Browse 80+ UI primitives'], ['Templates', 'Pre-built page layouts'], ['Icons', 'Lucide icon set'], ['CLI', 'Scaffold with one command']].map(([t, d]) => (
            <div key={t} className="rounded-xl bg-muted/40 p-2.5 hover:bg-muted/70">
              <p className="text-[10px] font-semibold text-fg">{t}</p>
              <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  combobox: {
    height: 210,
    preview: () => (
      <div className="w-full space-y-1.5">
        <div className="flex items-center gap-1.5 rounded-xl border border-primary/60 bg-bg px-3 py-2 ring-2 ring-primary/20">
          <span className="flex-1 text-[11px]">React</span>
          <span className="text-[10px] text-muted-foreground">✕</span>
          <span className="text-[10px] text-muted-foreground">▾</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {[['React', true], ['Vue', false], ['Svelte', false], ['Angular', false]].map(([name, sel]) => (
            <div key={String(name)} className={`flex items-center justify-between px-3 py-2 text-[10px] ${sel ? 'bg-primary/5' : ''}`}>
              <span className={sel ? 'font-semibold text-fg' : 'text-muted-foreground'}>{String(name)}</span>
              {sel && <span className="text-[10px] text-primary">✓</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  command: {
    height: 210,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <span className="text-[11px] text-muted-foreground">⌘</span>
          <span className="flex-1 text-[11px] text-muted-foreground/50">Search components…</span>
          <span className="rounded border border-border px-1 text-[9px] text-muted-foreground/50">Esc</span>
        </div>
        <div className="p-1.5">
          <p className="px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/50">Components</p>
          {[['Button', 'Atoms', true], ['Dialog', 'Overlays', false], ['DataTable', 'Data', false]].map(([name, cat, active]) => (
            <div key={String(name)} className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[10px] ${active ? 'bg-primary/10' : ''}`}>
              <span className={active ? 'font-semibold text-fg' : 'text-muted-foreground'}>{String(name)}</span>
              <span className="text-[9px] text-muted-foreground/50">{String(cat)}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  /* ── Charts — need fixed height container ──────────────────────────── */
  chart: {
    height: 170,
    preview: () => (
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold">Monthly revenue</p>
          <p className="text-[10px] text-success">+18% ↑</p>
        </div>
        <div className="flex h-[90px] items-end gap-1">
          {[35, 55, 40, 70, 50, 85, 60, 90, 65, 75, 55, 95].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
              <div className="w-full rounded-t-[3px] bg-primary/80 transition-all hover:bg-primary" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-muted-foreground">
          {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
    ),
  },
  /* ── Data display ──────────────────────────────────────────────────── */
  'data-table': {
    height: 220,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border text-[10px]">
        <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-b border-border bg-muted/30 px-3 py-2">
          <div className="h-3 w-3 rounded border border-border" />
          <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Name</span>
          <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Status</span>
          <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Amount</span>
        </div>
        {[['INV-001', 'Paid', '$240.00', 'success'], ['INV-002', 'Pending', '$120.00', 'warning'], ['INV-003', 'Draft', '$380.00', 'muted'], ['INV-004', 'Paid', '$95.00', 'success']].map(([name, status, amount, color]) => (
          <div key={name} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-t border-border/50 px-3 py-2.5">
            <div className="h-3 w-3 rounded border border-border" />
            <span className="font-medium text-fg">{name}</span>
            <span className={`w-fit rounded-full px-2 py-0.5 text-[8px] font-semibold ${color === 'success' ? 'bg-success/10 text-success' : color === 'warning' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>{status}</span>
            <span className="tabular-nums text-muted-foreground">{amount}</span>
          </div>
        ))}
      </div>
    ),
  },
  table: {
    height: 200,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border text-[10px]">
        <div className="grid grid-cols-3 border-b border-border bg-muted/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span>Product</span><span>Category</span><span className="text-right">Price</span>
        </div>
        {[['Pro Plan', 'SaaS', '$49/mo'], ['Starter', 'SaaS', '$9/mo'], ['Enterprise', 'SaaS', 'Custom']].map(([n, c, p]) => (
          <div key={n} className="grid grid-cols-3 items-center border-t border-border/50 px-3 py-2.5">
            <span className="font-medium text-fg">{n}</span>
            <span className="text-muted-foreground">{c}</span>
            <span className="text-right font-mono text-muted-foreground">{p}</span>
          </div>
        ))}
      </div>
    ),
  },
  calendar: {
    height: 230,
    preview: () => {
      const days = [null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      return (
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold">May 2026</span>
            <div className="flex gap-1">
              {['‹', '›'].map(a => <div key={a} className="flex h-5 w-5 items-center justify-center rounded-md border border-border text-[10px] text-muted-foreground">{a}</div>)}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-[9px] text-muted-foreground">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="py-0.5 text-center font-semibold">{d}</div>)}
            {days.map((d, i) => (
              <div key={i} className={`flex aspect-square items-center justify-center rounded-md text-[9px] ${d === 27 ? 'bg-primary font-bold text-primary-foreground' : d && d < 27 ? 'text-muted-foreground/50' : d ? 'text-fg hover:bg-muted/50' : ''}`}>{d ?? ''}</div>
            ))}
          </div>
        </div>
      );
    },
  },
  'date-picker': {
    height: 220,
    preview: () => (
      <div className="w-full space-y-1.5">
        <div className="flex items-center gap-2 rounded-xl border border-primary/50 bg-bg px-3 py-2 ring-2 ring-primary/20">
          <span className="flex-1 text-[11px]">May 27, 2026</span>
          <span className="text-[11px] text-muted-foreground">📅</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold">May 2026</span>
            <div className="flex gap-1 text-[10px] text-muted-foreground">‹ ›</div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-[8px]">
            {['S','M','T','W','T','F','S'].map((d,i) => <div key={i} className="py-0.5 text-center font-semibold text-muted-foreground">{d}</div>)}
            {[null,null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((d,i) => (
              <div key={i} className={`flex aspect-square items-center justify-center rounded text-[8px] ${d===27?'bg-primary text-primary-foreground font-bold':d?'text-fg':''}`}>{d??''}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  'date-range-picker': {
    height: 200,
    preview: () => (
      <div className="w-full space-y-1.5">
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-border bg-bg px-2.5 py-2">
            <span className="text-[10px] text-muted-foreground">📅</span>
            <span className="text-[10px]">May 20</span>
          </div>
          <div className="flex items-center text-[10px] text-muted-foreground">→</div>
          <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-primary/50 bg-bg px-2.5 py-2 ring-2 ring-primary/20">
            <span className="text-[10px] text-muted-foreground">📅</span>
            <span className="text-[10px]">May 27</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card p-3 shadow-lg">
          <div className="grid grid-cols-7 gap-0.5 text-[8px]">
            {['S','M','T','W','T','F','S'].map((d,i) => <div key={i} className="py-0.5 text-center font-semibold text-muted-foreground">{d}</div>)}
            {[null,null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((d,i) => (
              <div key={i} className={`flex aspect-square items-center justify-center rounded text-[8px] ${d===20||d===27?'bg-primary text-primary-foreground font-bold':d&&d>20&&d<27?'bg-primary/15 text-primary':d?'text-fg':''}`}>{d??''}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  'date-time-picker': {
    height: 180,
    preview: () => (
      <div className="w-full space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Date</p>
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-bg px-2.5 py-2 text-[10px]">
              <span className="text-muted-foreground">📅</span> May 27, 2026
            </div>
          </div>
          <div>
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Time</p>
            <div className="flex items-center gap-1.5 rounded-xl border border-primary/50 bg-bg px-2.5 py-2 ring-2 ring-primary/20 text-[10px]">
              <span className="text-muted-foreground">🕐</span> 14:30
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
          <div className="flex flex-col items-center">
            <button className="text-[12px] text-muted-foreground">▲</button>
            <span className="text-[16px] font-bold tabular-nums">14</span>
            <button className="text-[12px] text-muted-foreground">▼</button>
          </div>
          <span className="text-[16px] font-bold text-muted-foreground">:</span>
          <div className="flex flex-col items-center">
            <button className="text-[12px] text-muted-foreground">▲</button>
            <span className="text-[16px] font-bold tabular-nums">30</span>
            <button className="text-[12px] text-muted-foreground">▼</button>
          </div>
        </div>
      </div>
    ),
  },
  'time-picker': {
    height: 150,
    preview: () => (
      <div className="w-full space-y-2">
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-bg px-3 py-2 text-[11px]">
          <span className="text-muted-foreground">🕐</span>
          <span>14:30</span>
          <span className="ml-auto text-muted-foreground/50">▾</span>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm">
          {[['14', 'HH'], ['30', 'MM']].map(([val, lbl], i) => (
            <React.Fragment key={lbl}>
              <div className="flex flex-col items-center gap-0.5">
                <div className="h-5 w-10 flex items-center justify-center rounded-md text-[10px] text-muted-foreground hover:bg-muted/50">▲</div>
                <div className="rounded-lg bg-primary/10 px-3 py-1 text-[16px] font-bold tabular-nums text-fg">{val}</div>
                <div className="h-5 w-10 flex items-center justify-center rounded-md text-[10px] text-muted-foreground hover:bg-muted/50">▼</div>
                <p className="text-[8px] font-semibold uppercase text-muted-foreground/50">{lbl}</p>
              </div>
              {i === 0 && <span className="text-[20px] font-bold text-muted-foreground">:</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    ),
  },
  'color-picker': {
    height: 200,
    preview: () => (
      <div className="w-full space-y-2.5">
        <div className="h-20 w-full overflow-hidden rounded-xl" style={{ background: 'linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-info)) 50%, hsl(var(--color-success)))' }}>
          <div className="flex h-full items-end p-2">
            <div className="h-4 w-4 rounded-full border-2 border-white shadow-md" style={{ background: 'hsl(var(--color-primary))' }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['#6366f1', '#ef4444', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#ec4899', '#475569'].map(c => (
            <div key={c} className="h-5 w-5 rounded-full border-2 border-card shadow-sm" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border px-2.5 py-1.5">
          <div className="h-5 w-5 rounded-md" style={{ background: 'hsl(var(--color-primary))' }} />
          <span className="flex-1 font-mono text-[10px] text-muted-foreground">#6366F1</span>
          <span className="text-[10px] text-muted-foreground/50">Alpha 100%</span>
        </div>
      </div>
    ),
  },
  'file-upload': {
    height: 160,
    preview: () => (
      <div className="w-full space-y-2">
        <div className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/3 p-5 text-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <span className="text-[16px]">↑</span>
          </div>
          <div>
            <p className="text-[11px] font-medium text-fg">Drop files here</p>
            <p className="text-[9px] text-muted-foreground">or <span className="text-primary underline">browse</span> · PNG, PDF up to 10 MB</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-success/30 bg-success/5 px-3 py-2">
          <div className="h-4 w-4 rounded-md bg-success/20 flex items-center justify-center text-[9px] text-success">✓</div>
          <span className="flex-1 text-[10px] text-fg font-medium">design-system.fig</span>
          <span className="text-[9px] text-muted-foreground">2.4 MB</span>
        </div>
      </div>
    ),
  },
  toast: {
    height: 200,
    preview: () => (
      <div className="w-full space-y-2">
        {[
          { title: 'Changes saved', desc: 'Profile updated successfully.', color: 'success' },
          { title: 'Sync complete', desc: '48 items were imported.', color: 'info' },
          { title: 'Low storage', desc: 'You are at 90% capacity.', color: 'warning' },
        ].map(({ title, desc, color }) => (
          <div key={title} className="flex items-start gap-3 rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-sm">
            <div className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full bg-${color}/20 flex items-center justify-center`}>
              <div className={`h-2 w-2 rounded-full bg-${color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold">{title}</p>
              <p className="text-[9px] text-muted-foreground">{desc}</p>
            </div>
            <span className="text-[10px] text-muted-foreground/40 shrink-0">✕</span>
          </div>
        ))}
      </div>
    ),
  },
  snackbar: {
    height: 160,
    preview: () => (
      <div className="w-full space-y-2">
        <div className="h-14 rounded-xl border border-border bg-muted/20 flex items-center justify-center text-[10px] text-muted-foreground/40">Page content</div>
        <div className="flex items-center justify-between rounded-xl bg-fg px-4 py-3 shadow-lg">
          <span className="text-[11px] font-medium text-bg">3 items deleted</span>
          <button className="ml-6 text-[10px] font-semibold text-primary">Undo</button>
        </div>
      </div>
    ),
  },
  backdrop: {
    height: 160,
    preview: () => (
      <div className="relative w-full overflow-hidden rounded-2xl border border-border" style={{ height: 140 }}>
        <div className="p-3 space-y-2">
          <div className="h-2.5 w-3/4 rounded-full bg-border/50" />
          <div className="h-2 w-full rounded-full bg-border/30" />
          <div className="h-2 w-1/2 rounded-full bg-border/30" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-overlay/70 backdrop-blur-[3px]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-[11px] font-medium text-white">Loading workspace…</p>
        </div>
      </div>
    ),
  },
  'app-bar': {
    height: 180,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border">
        <div className="flex items-center gap-3 bg-primary px-4 py-3">
          <button className="text-[18px] leading-none text-primary-foreground/80">☰</button>
          <span className="flex-1 text-[13px] font-semibold text-primary-foreground">Dashboard</span>
          <div className="flex items-center gap-1.5 rounded-lg bg-primary-foreground/15 px-2.5 py-1 text-[10px] text-primary-foreground/70">
            <span>⌕</span><span className="hidden sm:inline">Search</span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/20 text-[11px] font-bold text-primary-foreground">J</div>
        </div>
        <div className="bg-muted/20 p-4 text-center text-[10px] text-muted-foreground/40">Page content area</div>
      </div>
    ),
  },
  'bottom-navigation': {
    height: 170,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border">
        <div className="flex h-16 items-center justify-center bg-muted/20 text-[10px] text-muted-foreground/40">App content</div>
        <div className="flex border-t border-border bg-card">
          {[['⊞', 'Home', true], ['🔍', 'Search', false], ['♡', 'Saved', false], ['👤', 'Profile', false]].map(([icon, label, active]) => (
            <div key={String(label)} className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
              <span className="text-[15px] leading-none">{icon}</span>
              <span className="text-[8px] font-medium">{String(label)}</span>
              {active && <div className="h-0.5 w-5 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  'speed-dial': {
    height: 190,
    preview: () => (
      <div className="flex flex-col items-end gap-2 pr-2 pt-1">
        {[['✏️', 'Edit'], ['📎', 'Attach'], ['✉️', 'Share']].map(([icon, label]) => (
          <div key={String(label)} className="flex items-center gap-2">
            <span className="rounded-lg border border-border bg-card px-2 py-0.5 text-[9px] text-muted-foreground shadow-sm">{String(label)}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-[12px] shadow-sm">{String(icon)}</div>
          </div>
        ))}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-[20px] text-primary-foreground shadow-lg">+</div>
      </div>
    ),
  },
  timeline: {
    height: 210,
    preview: () => (
      <div className="w-full">
        {[
          ['Deployed to production', '2m ago', 'success'],
          ['All tests passed', '8m ago', 'success'],
          ['PR #241 merged', '15m ago', 'primary'],
          ['Review requested', '1h ago', 'border'],
        ].map(([event, time, color], i, arr) => (
          <div key={String(event)} className="relative flex gap-3">
            {i < arr.length - 1 && <div className="absolute left-[6px] top-4 h-full w-px bg-border/60" />}
            <div className={`z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${color === 'success' ? 'border-success bg-success/20' : color === 'primary' ? 'border-primary bg-primary/20' : 'border-border bg-bg'}`} />
            <div className="pb-3.5">
              <p className="text-[11px] font-medium text-fg">{String(event)}</p>
              <p className="text-[9px] text-muted-foreground">{String(time)}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  'image-list': {
    height: 180,
    preview: () => (
      <div className="grid w-full grid-cols-3 gap-1.5">
        {[
          ['from-primary/60 to-primary/20', 'row-span-2'],
          ['from-success/60 to-success/20', ''],
          ['from-info/60 to-info/20', ''],
          ['from-warning/60 to-warning/20', ''],
          ['from-destructive/60 to-destructive/20', ''],
          ['from-violet-500/60 to-violet-500/20', ''],
        ].map(([grad, span], i) => (
          <div key={i} className={`rounded-xl bg-gradient-to-br ${grad} ${span}`} style={{ aspectRatio: span ? '1/2' : '1/1' }} />
        ))}
      </div>
    ),
  },
  masonry: {
    height: 190,
    preview: () => (
      <div className="columns-3 gap-1.5 w-full">
        {[70, 45, 90, 55, 80, 50, 65, 40, 75].map((h, i) => (
          <div key={i} className="mb-1.5 break-inside-avoid w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted/20" style={{ height: h }} />
        ))}
      </div>
    ),
  },
  'transfer-list': {
    height: 190,
    preview: () => (
      <div className="flex w-full gap-2">
        {[['Available', ['React', 'Vue', 'Svelte']], ['Selected', ['Angular', 'Next.js']]].map(([title, items]) => (
          <div key={String(title)} className="flex-1 overflow-hidden rounded-xl border border-border">
            <div className="border-b border-border bg-muted/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{String(title)}</div>
            {(items as string[]).map(item => (
              <label key={item} className="flex cursor-pointer items-center gap-2 border-t border-border/50 px-3 py-2">
                <div className="h-2.5 w-2.5 rounded border border-border bg-bg" />
                <span className="text-[10px] text-muted-foreground">{item}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  resizable: {
    height: 160,
    preview: () => (
      <div className="flex w-full overflow-hidden rounded-2xl border border-border" style={{ height: 140 }}>
        <div className="w-[42%] bg-muted/30 p-3 space-y-1.5">
          <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">Sidebar</p>
          {['Dashboard', 'Users', 'Reports', 'Settings'].map(item => (
            <div key={item} className="h-5 w-full rounded-md bg-border/30 text-[9px] flex items-center px-2 text-muted-foreground">{item}</div>
          ))}
        </div>
        <div className="flex w-1.5 cursor-col-resize items-center justify-center bg-border/30">
          <div className="h-8 w-0.5 rounded-full bg-border" />
        </div>
        <div className="flex-1 p-3 space-y-1.5">
          <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">Main content</p>
          <div className="h-2 w-3/4 rounded-full bg-border/40" />
          <div className="h-2 w-full rounded-full bg-border/30" />
          <div className="h-2 w-1/2 rounded-full bg-border/30" />
        </div>
      </div>
    ),
  },
  carousel: {
    height: 170,
    preview: () => (
      <div className="w-full">
        <div className="flex gap-2 overflow-hidden">
          {[
            ['bg-primary/15 border-primary/30', 'Active users', '2,491', 'primary'],
            ['bg-success/10 border-success/20', 'Revenue', '$48.2k', 'success'],
            ['bg-info/10 border-info/20', 'Conversion', '3.6%', 'info'],
          ].map(([bg, label, val, color], i) => (
            <div key={label} className={`shrink-0 rounded-2xl border ${bg} p-4`} style={{ width: i === 0 ? '75%' : '65%' }}>
              <p className="text-[10px] text-muted-foreground">{label}</p>
              <p className={`mt-1 text-[20px] font-bold text-${color}`}>{val}</p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex justify-center gap-1.5">
          {[0, 1, 2].map(i => <div key={i} className={`rounded-full ${i === 0 ? 'w-4 bg-primary h-1.5' : 'w-1.5 h-1.5 bg-border'}`} />)}
        </div>
      </div>
    ),
  },
  'scroll-area': {
    height: 180,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border" style={{ height: 160 }}>
        <div className="flex h-full">
          <div className="flex-1 overflow-y-auto">
            {['Acetaminophen · 500mg', 'Ibuprofen · 200mg', 'Aspirin · 325mg', 'Naproxen · 250mg', 'Amoxicillin · 875mg', 'Metformin · 500mg', 'Lisinopril · 10mg', 'Atorvastatin · 20mg', 'Omeprazole · 20mg'].map(item => (
              <div key={item} className="border-b border-border/40 px-3 py-2 text-[10px] text-muted-foreground last:border-0">{item}</div>
            ))}
          </div>
          <div className="w-1.5 bg-muted/30 pr-0.5">
            <div className="mx-auto mt-1 h-10 w-1 rounded-full bg-border" />
          </div>
        </div>
      </div>
    ),
  },
  tree: {
    height: 190,
    preview: () => {
      const items = [
        { label: 'src/', depth: 0, open: true },
        { label: 'app/', depth: 1, open: true },
        { label: 'page.tsx', depth: 2, open: false, isFile: true },
        { label: 'layout.tsx', depth: 2, open: false, isFile: true },
        { label: 'components/', depth: 1, open: false },
        { label: 'lib/', depth: 1, open: false },
        { label: 'package.json', depth: 0, open: false, isFile: true },
      ];
      return (
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-card p-2 font-mono">
          {items.map((item, i) => (
            <div key={i} className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] ${i === 2 ? 'bg-primary/10' : 'hover:bg-muted/40'}`} style={{ paddingLeft: `${item.depth * 12 + 8}px` }}>
              <span className="text-muted-foreground/60">{item.isFile ? '📄' : item.open ? '📂' : '📁'}</span>
              <span className={item.isFile ? 'text-fg' : 'font-semibold text-fg'}>{item.label}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  /* ── Improve generic-looking previews ──────────────────────────────── */
  accordion: {
    height: 220,
    preview: () => (
      <div className="w-full space-y-1">
        {[
          ['What is structyl?', 'An accessible, themable React component library built on WAI-ARIA patterns and Tailwind CSS.', true],
          ['Is it production-ready?', '', false],
          ['TypeScript support?', '', false],
        ].map(([q, a, open]) => (
          <div key={String(q)} className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between px-3.5 py-2.5">
              <span className="text-[11px] font-medium">{String(q)}</span>
              <span className={`text-[10px] text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
            </div>
            {open && <div className="border-t border-border/50 px-3.5 py-2.5"><p className="text-[10px] leading-relaxed text-muted-foreground">{String(a)}</p></div>}
          </div>
        ))}
      </div>
    ),
  },
  tabs: {
    height: 210,
    preview: () => (
      <div className="w-full">
        <div className="flex border-b border-border">
          {['Account', 'Security', 'Billing'].map((t, i) => (
            <div key={t} className={`relative px-4 py-2 text-[11px] font-medium cursor-pointer ${i === 0 ? 'text-fg' : 'text-muted-foreground'}`}>
              {t}
              {i === 0 && <div className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
        <div className="space-y-2.5 p-3">
          {[['Display name', 'Jane Doe'], ['Username', '@janedoe'], ['Email', 'jane@company.com']].map(([label, val]) => (
            <div key={label} className="space-y-0.5">
              <p className="text-[9px] text-muted-foreground">{label}</p>
              <div className="rounded-lg border border-border px-2.5 py-1.5 text-[10px] text-fg">{val}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  card: {
    height: 210,
    preview: () => (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="h-20 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent p-3">
          <div className="h-10 w-10 rounded-xl border-2 border-card bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-sm">
            <span className="text-[14px] font-bold text-primary-foreground">A</span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-[13px] font-semibold">structyl</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Open-source React component library with 80+ components.</p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">React</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">TypeScript</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">Tailwind</span>
          </div>
        </div>
      </div>
    ),
  },
  alert: {
    height: 200,
    preview: () => (
      <div className="w-full space-y-2">
        {[
          ['Deployment complete', 'v2.0.4 is live in production.', 'success'],
          ['Build failed', '4 type errors found in src/app.', 'destructive'],
          ['Update available', 'structyl v2.1.0 is ready to install.', 'info'],
        ].map(([title, desc, color]) => (
          <div key={String(title)} className={`flex gap-2.5 rounded-xl border border-${color}/30 bg-${color}/5 px-3 py-2.5`}>
            <div className={`mt-0.5 h-3 w-3 shrink-0 rounded-full bg-${color}/20 flex items-center justify-center`}>
              <div className={`h-1.5 w-1.5 rounded-full bg-${color}`} />
            </div>
            <div>
              <p className={`text-[10px] font-semibold text-${color}`}>{String(title)}</p>
              <p className={`text-[9px] text-${color}/70`}>{String(desc)}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  stat: {
    height: 220,
    preview: () => (
      <div className="grid w-full grid-cols-3 gap-2">
        {[
          { label: 'Revenue', value: '$42.8k', badge: '+12%', cardCls: 'border-primary/30 bg-primary/5', dir: 'up' },
          { label: 'Errors', value: '14', badge: '+3', cardCls: 'border-destructive/30 bg-destructive/5', dir: 'down' },
          { label: 'Uptime', value: '99.9%', badge: 'stable', cardCls: 'border-success/30 bg-success/5', dir: 'up' },
        ].map(({ label, value, badge, cardCls, dir }) => (
          <div key={label} className={`flex flex-col gap-1 rounded-xl border p-3 ${cardCls}`}>
            <p className="text-[9px] font-medium text-muted-foreground">{label}</p>
            <p className="text-[16px] font-bold tracking-tight text-fg">{value}</p>
            <span className={`inline-flex w-fit items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-medium ${dir === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              {dir === 'up' ? '↑' : '↓'} {badge}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  typography: {
    height: 200,
    preview: () => (
      <div className="w-full space-y-2 p-1">
        <p className="text-[22px] font-bold leading-tight tracking-tight text-fg">Display heading</p>
        <p className="text-[16px] font-semibold text-fg">Section title</p>
        <p className="text-[13px] text-fg/80">Body text — the default paragraph style used for prose content.</p>
        <p className="text-[11px] text-muted-foreground">Subtitle — secondary information and metadata.</p>
        <p className="text-[9px] uppercase tracking-widest text-muted-foreground/70">OVERLINE LABEL</p>
        <p className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-fg/80 inline-block">code snippet</p>
      </div>
    ),
  },
  popconfirm: {
    height: 200,
    preview: () => (
      <div className="flex w-full items-center justify-center" style={{ height: 180 }}>
        <div className="w-64 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="p-3.5">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-warning">⚠</span>
              <div>
                <p className="text-[11px] font-semibold text-fg">Delete this record?</p>
                <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <div className="rounded-lg border border-border px-3 py-1 text-[9px] text-muted-foreground">Cancel</div>
              <div className="rounded-lg bg-destructive px-3 py-1 text-[9px] font-medium text-destructive-foreground">Delete</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  modal: {
    height: 200,
    preview: () => (
      <div className="relative w-full overflow-hidden rounded-2xl border border-border" style={{ height: 180 }}>
        <div className="absolute inset-0 bg-overlay/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <div className="border-b border-border px-4 py-3">
              <p className="text-[12px] font-semibold">Confirm action</p>
            </div>
            <div className="px-4 py-3 text-[10px] text-muted-foreground">Are you sure you want to proceed?</div>
            <div className="flex justify-end gap-2 border-t border-border px-4 py-2.5">
              <div className="rounded-lg border border-border px-3 py-1 text-[10px] text-muted-foreground">Cancel</div>
              <div className="rounded-lg bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground">Confirm</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
