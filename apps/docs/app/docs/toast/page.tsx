'use client';

import * as React from 'react';
import { Check, Copy } from '@aura-ui/icons';
import { Button } from '@aura-ui/styled';
import { toast, Toaster } from '@aura-ui/styled';

/* ── Shared primitives ───────────────────────────────────────────────────── */

function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-mono text-[11px] text-white/40">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/90">
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

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-3 mt-12 scroll-mt-20 text-xl font-semibold tracking-tight">{children}</h2>;
}

function SubHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="mb-2 mt-8 scroll-mt-20 text-base font-semibold">{children}</h3>;
}

function PropRow({ name, type, def, desc }: { name: string; type: string; def?: string; desc: string }) {
  return (
    <tr className="border-b border-border/50">
      <td className="py-2.5 pr-4 align-top font-mono text-[12px] text-primary">{name}</td>
      <td className="py-2.5 pr-4 align-top font-mono text-[12px] text-muted-foreground">{type}</td>
      <td className="py-2.5 pr-4 align-top font-mono text-[12px] text-muted-foreground">{def ?? '—'}</td>
      <td className="py-2.5 align-top text-[13px] text-muted-foreground">{desc}</td>
    </tr>
  );
}

/* ── Live demos ──────────────────────────────────────────────────────────── */

function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-5">
      <Button variant="outline" size="sm" onClick={() => toast.success('Changes saved', { description: 'Your profile has been updated.' })}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.error('Upload failed', { description: 'The file exceeds the 10 MB limit.', retry: () => toast.success('File uploaded!') })}>
        Error + Retry
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.warning('Storage almost full', { description: 'You are at 90% capacity.' })}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.info('Update available', { description: 'Refresh to get the latest features.' })}>
        Info
      </Button>
      <Button variant="outline" size="sm" onClick={() => {
        const id = toast.loading('Uploading…');
        setTimeout(() => toast.success('Upload complete', { id, description: 'Your file is ready.' }), 2500);
      }}>
        Loading → Success
      </Button>
      <Button variant="outline" size="sm" onClick={() =>
        toast.promise(
          new Promise<string>((res) => setTimeout(() => res('done'), 2000)),
          { loading: 'Processing…', success: 'Done!', error: 'Something went wrong.' },
        )
      }>
        Promise
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.show({ title: 'Custom action', action: { label: 'Undo', onClick: () => toast.info('Undone!') } })}>
        Custom action
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </div>
  );
}

function PlacementDemo() {
  const positions: Array<{ h: 'left' | 'center' | 'right'; v: 'top' | 'bottom'; label: string }> = [
    { h: 'left',   v: 'top',    label: 'Top left' },
    { h: 'center', v: 'top',    label: 'Top center' },
    { h: 'right',  v: 'top',    label: 'Top right' },
    { h: 'left',   v: 'bottom', label: 'Bottom left' },
    { h: 'center', v: 'bottom', label: 'Bottom center' },
    { h: 'right',  v: 'bottom', label: 'Bottom right' },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-card p-5">
      {positions.map(({ h, v, label }) => (
        <Button
          key={`${h}-${v}`}
          variant="outline"
          size="sm"
          onClick={() => toast.info(label, { horizontal: h, vertical: v })}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ToastPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Toaster is needed for demos — one instance is enough */}
      <Toaster />

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">@aura-ui/styled</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Toast</h1>
        <p className="text-lg text-muted-foreground">
          Imperative, globally-scoped toast notifications. Drop <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">&lt;Toaster /&gt;</code> once in your root layout and call <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">toast.*</code> from anywhere — event handlers, async functions, or outside React.
        </p>
      </div>

      {/* Install */}
      <CodeBlock lang="bash" code="pnpm add @aura-ui/styled" />

      {/* ── Setup ── */}
      <SectionHeading id="setup">Setup</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Add <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">&lt;Toaster /&gt;</code> once anywhere in your component tree — typically the root layout. Toasts fired anywhere in your app will render there.
      </p>
      <CodeBlock code={`// app/layout.tsx
import { Toaster } from '@aura-ui/styled';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`} />

      {/* ── Variants ── */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">Six built-in variants — try them all live below.</p>
      <div className="mb-4">
        <VariantsDemo />
      </div>
      <CodeBlock code={`import { toast } from '@aura-ui/styled';

toast.success('Changes saved', { description: 'Your profile has been updated.' });
toast.error('Upload failed', { retry: () => upload() });
toast.warning('Storage almost full');
toast.info('Update available');
toast.loading('Processing…');                // duration: Infinity by default
toast.show({ title: 'Custom', variant: 'default' }); // full control`} />

      {/* ── Promise ── */}
      <SubHeading id="promise">Promise toast</SubHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">toast.promise</code> shows a loading state while the promise is pending, then automatically transitions to success or error.
      </p>
      <CodeBlock code={`toast.promise(
  fetch('/api/save').then(r => r.json()),
  {
    loading: 'Saving…',
    success: (data) => \`Saved \${data.name}!\`,
    error:   (err)  => \`Error: \${err.message}\`,
  },
);`} />

      {/* ── Placement ── */}
      <SectionHeading id="placement">Placement</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Set the default position on <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">&lt;Toaster /&gt;</code>, or override per-toast via <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">horizontal</code> / <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">vertical</code> options.
      </p>
      <div className="mb-4">
        <PlacementDemo />
      </div>
      <CodeBlock code={`// Default for all toasts — bottom right
<Toaster horizontal="right" vertical="bottom" />

// Override for a specific toast
toast.error('Auth expired', { horizontal: 'center', vertical: 'top' });`} />

      {/* ── Update / dedup ── */}
      <SectionHeading id="update">Update & dedup</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Passing the same <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">id</code> to any <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">toast.*</code> call replaces the existing toast rather than stacking a new one.
      </p>
      <CodeBlock code={`const id = toast.loading('Uploading file…');

// Later — replaces the loading toast in-place
toast.success('Upload complete!', { id, description: 'Your file is ready.' });
toast.error('Upload failed',      { id, retry: () => upload() });`} />

      {/* ── Dismiss & remove ── */}
      <SectionHeading id="dismiss">Dismiss & remove</SectionHeading>
      <CodeBlock code={`const id = toast.info('You have 3 unread messages');

toast.dismiss(id);   // plays the exit animation
toast.remove(id);    // instant removal, no animation
toast.dismiss();     // dismiss ALL toasts`} />

      {/* ── Toaster props ── */}
      <SectionHeading id="toaster-props">Toaster props</SectionHeading>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Prop</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Default</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="px-3">
            <PropRow name="horizontal" type="'left' | 'center' | 'right'" def="'right'" desc="Default horizontal alignment for toasts." />
            <PropRow name="vertical" type="'top' | 'bottom'" def="'bottom'" desc="Default vertical alignment for toasts." />
            <PropRow name="maxToasts" type="number" def="5" desc="Maximum number of toasts visible at once per position group." />
            <PropRow name="className" type="string" def="—" desc="Extra classes forwarded to the viewport wrapper." />
          </tbody>
        </table>
      </div>

      {/* ── toast options ── */}
      <SectionHeading id="toast-options">Toast options</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">Passed as the second argument to any <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">toast.*</code> method.</p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Option</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Default</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="px-3">
            <PropRow name="id" type="string" def="auto" desc="Reuse to update an existing toast instead of stacking a new one." />
            <PropRow name="description" type="string" def="—" desc="Secondary text shown below the title." />
            <PropRow name="variant" type="ToastVariant" def="'default'" desc="One of: default | success | error | warning | info | loading." />
            <PropRow name="duration" type="number" def="4000" desc="Auto-dismiss delay in ms. Pass Infinity to keep until manually dismissed." />
            <PropRow name="horizontal" type="'left' | 'center' | 'right'" def="Toaster default" desc="Override horizontal placement for this toast." />
            <PropRow name="vertical" type="'top' | 'bottom'" def="Toaster default" desc="Override vertical placement for this toast." />
            <PropRow name="retry" type="() => void" def="—" desc="Adds a Retry button that calls this function when clicked." />
            <PropRow name="action" type="{ label: string; onClick: () => void }" def="—" desc="Custom action button. Takes priority over retry for the button label." />
            <PropRow name="onDismiss" type="(id: string) => void" def="—" desc="Called right before the toast is dismissed." />
          </tbody>
        </table>
      </div>

      {/* ── useToast ── */}
      <SectionHeading id="use-toast">useToast</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Subscribe to the toast store from inside a React component. Useful for building a custom <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">Toaster</code> or reading the current toast list.
      </p>
      <CodeBlock code={`import { useToast } from '@aura-ui/styled';

function CustomToaster() {
  const { toasts, dismiss, remove } = useToast();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts
        .filter(t => t.open)
        .map(t => (
          <div key={t.id} className="rounded-xl bg-card border border-border px-4 py-3 shadow-lg">
            <p className="font-semibold">{t.title}</p>
            {t.description && <p className="text-sm text-muted-foreground">{t.description}</p>}
            <button onClick={() => dismiss(t.id)}>Close</button>
          </div>
        ))
      }
    </div>
  );
}`} />

      {/* ── Accessibility ── */}
      <SectionHeading id="accessibility">Accessibility</SectionHeading>
      <p className="mb-3 text-sm text-muted-foreground">
        Toast is built on the Radix Toast primitive which handles ARIA live regions automatically:
      </p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        <li>• The viewport has <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">role="region"</code> and <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">aria-label="Notifications"</code></li>
        <li>• Each toast is announced to screen readers as a live region update</li>
        <li>• Focus is not moved to the toast — users can continue their current task</li>
        <li>• The hotkey <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">F8</kbd> moves focus to the toast viewport for keyboard users</li>
        <li>• Toasts can be closed with <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Escape</kbd> or swiped on touch devices</li>
      </ul>
    </div>
  );
}
