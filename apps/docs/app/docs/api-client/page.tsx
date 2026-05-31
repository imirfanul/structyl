'use client';

import * as React from 'react';
import { Check, Copy, ChevronRight, ArrowUpRight, AlertCircle } from '@structyl/icons';

/* ── Shared primitives ───────────────────────────────────────────────────── */

function CodeBlock({
  code,
  lang,
  rounded = 'all',
}: {
  code: string;
  lang: string;
  rounded?: 'all' | 'bottom';
}) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };
  return (
    <div className={`relative border border-border bg-[#0d1117] ${rounded === 'bottom' ? 'rounded-b-xl border-t-0' : 'rounded-lg'}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-mono text-[11px] text-white/40">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-white/50 hover:bg-white/10 hover:text-white/90 transition-colors">
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

function PreviewBlock({ title, description, children, code, lang = 'tsx' }: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  lang?: string;
}) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  return (
    <div className="mt-4">
      {title && <h4 className="mb-2 text-sm font-semibold">{title}</h4>}
      {description && <p className="mb-3 text-sm text-muted-foreground">{description}</p>}
      <div className="flex items-center border-b border-border">
        {(['preview', 'code'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`relative px-3 py-2 text-sm font-medium capitalize transition-colors ${tab === t ? 'text-fg' : 'text-muted-foreground hover:text-fg'}`}>
            {t}
            {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>
      {tab === 'preview' ? (
        <div className="min-h-[180px] overflow-hidden rounded-b-xl border border-t-0 border-border bg-gradient-to-br from-accent/20 to-transparent p-8 flex items-center justify-center">
          {children}
        </div>
      ) : (
        <CodeBlock code={code} lang={lang} rounded="bottom" />
      )}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mt-8 scroll-mt-24">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Callout({ variant = 'info', children }: { variant?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: 'border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-400',
    warning: 'border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-400',
    tip: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400',
  };
  const labels = { info: 'NOTE', warning: 'WARNING', tip: 'TIP' };
  return (
    <div className={`my-4 rounded-lg border px-4 py-3 text-sm ${styles[variant]}`}>
      <span className="font-bold mr-2">{labels[variant]}:</span>
      {children}
    </div>
  );
}

function PropsTable({ rows }: { rows: { prop: string; type: string; default?: string; description: string }[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-medium">Prop</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Default</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.prop} className="border-t border-border/60 align-top">
              <td className="px-3 py-2 font-mono font-medium text-primary">{r.prop}</td>
              <td className="px-3 py-2"><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{r.type}</code></td>
              <td className="px-3 py-2 font-mono text-muted-foreground text-[11px]">{r.default ?? '—'}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReturnsTable({ rows }: { rows: { field: string; type: string; description: string }[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-medium">Field</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.field} className="border-t border-border/60 align-top">
              <td className="px-3 py-2 font-mono font-medium text-primary">{r.field}</td>
              <td className="px-3 py-2"><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{r.type}</code></td>
              <td className="px-3 py-2 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Live Demos ──────────────────────────────────────────────────────────── */

type User = { id: number; name: string; role: string; email: string };

const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Chen', role: 'Engineer', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', role: 'Designer', email: 'bob@example.com' },
  { id: 3, name: 'Carol Wu', role: 'Product', email: 'carol@example.com' },
];

function QueryDemo() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [users, setUsers] = React.useState<User[]>([]);
  const [staleFor, setStaleFor] = React.useState(0);
  const staleRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const loadUsers = React.useCallback((force = false) => {
    if (status === 'loading' && !force) return;
    setStatus('loading');
    setStaleFor(0);
    clearInterval(staleRef.current);
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setStatus('success');
      let s = 0;
      staleRef.current = setInterval(() => {
        s += 1;
        setStaleFor(s);
      }, 1000);
    }, 900);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    loadUsers();
    return () => clearInterval(staleRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isStale = staleFor >= 60;
  const cacheInfo = status === 'success'
    ? isStale ? 'stale — will refetch on next mount' : `fresh for ${60 - staleFor}s (staleTime: 60 000ms)`
    : '';

  return (
    <div className="w-full max-w-md space-y-3 font-sans text-sm">
      {/* Status bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
            status === 'loading' ? 'animate-pulse bg-amber-400' :
            status === 'success' ? isStale ? 'bg-amber-400' : 'bg-emerald-400' :
            status === 'error' ? 'bg-red-400' : 'bg-border'
          }`} />
          <span className="font-mono text-[11px] text-muted-foreground truncate">
            {status === 'loading' ? 'useApiQuery › fetching /users…' :
             status === 'success' ? `useApiQuery › status: success` :
             status === 'error' ? 'useApiQuery › status: error' : 'useApiQuery › idle'}
          </span>
        </div>
        <button onClick={() => loadUsers(true)} disabled={status === 'loading'}
          className="ml-2 shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-fg disabled:opacity-40">
          refetch()
        </button>
      </div>

      {/* Cache info */}
      {cacheInfo && (
        <div className="flex items-center gap-2 rounded-md bg-muted/40 px-3 py-1.5">
          <span className="font-mono text-[10px] text-muted-foreground">{cacheInfo}</span>
        </div>
      )}

      {/* Data */}
      <div className="overflow-hidden rounded-lg border border-border">
        {status === 'loading' ? (
          <div className="divide-y divide-border/60">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="h-7 w-7 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-2 w-36 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : status === 'error' ? (
          <div className="flex items-center gap-2 p-4 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" /> Failed to load users
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {users.map(u => (
              <div key={u.id} className="flex items-center gap-3 p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  {u.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium leading-none text-[13px]">{u.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{u.email}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{u.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MutationDemo() {
  type FormUser = { name: string; role: string; email: string };
  const [users, setUsers] = React.useState<User[]>(MOCK_USERS);
  const [form, setForm] = React.useState<FormUser>({ name: '', role: 'Engineer', email: '' });
  const [mutStatus, setMutStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setMutStatus('pending');
    // Optimistic: add immediately
    const optimistic: User = { id: Date.now(), ...form };
    setUsers(prev => [...prev, optimistic]);
    setTimeout(() => {
      setMutStatus('success');
      setForm({ name: '', role: 'Engineer', email: '' });
      setTimeout(() => setMutStatus('idle'), 2000);
    }, 700);
  };

  const remove = (id: number) => {
    setDeleteId(id);
    // Optimistic remove
    setUsers(prev => prev.filter(u => u.id !== id));
    setTimeout(() => setDeleteId(null), 600);
  };

  return (
    <div className="w-full max-w-md space-y-3 font-sans text-sm">
      {/* Mutation form */}
      <form onSubmit={submit} className="rounded-lg border border-border bg-card p-4 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">useApiMutation — POST /users</p>
        <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
          placeholder="Name" className="w-full rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-[12px] outline-none focus:border-ring/40 focus:ring-2 focus:ring-ring/20" />
        <input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
          placeholder="Email" className="w-full rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-[12px] outline-none focus:border-ring/40 focus:ring-2 focus:ring-ring/20" />
        <div className="flex items-center gap-2">
          <select value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))}
            className="flex-1 rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-[12px] outline-none">
            {['Engineer','Designer','Product','QA'].map(r => <option key={r}>{r}</option>)}
          </select>
          <button type="submit" disabled={mutStatus === 'pending'}
            className="rounded-lg bg-primary px-3 py-1.5 text-[12px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60">
            {mutStatus === 'pending' ? 'Adding…' : 'Add user'}
          </button>
        </div>
        {mutStatus === 'success' && (
          <p className="flex items-center gap-1.5 text-[11px] text-emerald-600"><Check className="h-3 w-3" /> User created — cache invalidated → /users refetching</p>
        )}
      </form>

      {/* List */}
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="divide-y divide-border/60">
          {users.map(u => (
            <div key={u.id} className={`flex items-center gap-3 p-2.5 transition-opacity ${deleteId === u.id ? 'opacity-30' : ''}`}>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">{u.name[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium leading-none text-[12px]">{u.name}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{u.role}</p>
              </div>
              <button onClick={() => remove(u.id)} className="rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors">
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfiniteDemo() {
  const PAGE_SIZE = 2;
  const ALL_ITEMS = ['Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries', 'Figs', 'Grapes', 'Honeydew'];

  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const items = ALL_ITEMS.slice(0, page * PAGE_SIZE);
  const hasMore = items.length < ALL_ITEMS.length;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setPage(p => p + 1); setLoading(false); }, 600);
  };

  return (
    <div className="w-full max-w-xs space-y-2 font-sans text-sm">
      <p className="font-mono text-[10px] text-muted-foreground">useInfiniteApiQuery — GET /items?cursor=…</p>
      <div className="overflow-hidden rounded-lg border border-border divide-y divide-border/60">
        {items.map(item => (
          <div key={item} className="px-3 py-2 text-[13px]">{item}</div>
        ))}
        {loading && <div className="px-3 py-2 text-[12px] text-muted-foreground animate-pulse">Loading page {page + 1}…</div>}
      </div>
      <button onClick={loadMore} disabled={!hasMore || loading}
        className="w-full rounded-lg border border-border py-2 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-fg disabled:opacity-40">
        {hasMore ? 'fetchNextPage()' : 'No more pages'}
      </button>
      <p className="text-center font-mono text-[10px] text-muted-foreground">
        {items.length} / {ALL_ITEMS.length} items · page {page}
      </p>
    </div>
  );
}

function OptimisticDemo() {
  const [liked, setLiked] = React.useState<Set<number>>(new Set());
  const [pending, setPending] = React.useState<Set<number>>(new Set());
  const posts = [
    { id: 1, text: 'Shipped the new API client 🎉', likes: 12 },
    { id: 2, text: 'Zero deps + useSyncExternalStore cache', likes: 8 },
    { id: 3, text: 'RTK Query-style docs are live', likes: 5 },
  ];

  const like = (id: number) => {
    // Optimistic update — flip immediately
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
    setPending(prev => new Set([...prev, id]));
    setTimeout(() => setPending(prev => { const n = new Set(prev); n.delete(id); return n; }), 500);
  };

  return (
    <div className="w-full max-w-sm space-y-2 font-sans text-sm">
      <p className="font-mono text-[10px] text-muted-foreground mb-3">optimistic — PATCH /posts/:id/like</p>
      {posts.map(p => (
        <div key={p.id} className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
          <p className="flex-1 text-[12px]">{p.text}</p>
          <button onClick={() => like(p.id)} className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
            liked.has(p.id) ? 'bg-red-500/10 text-red-500' : 'text-muted-foreground hover:bg-accent hover:text-fg'
          } ${pending.has(p.id) ? 'opacity-60' : ''}`}>
            {liked.has(p.id) ? '♥' : '♡'} {p.likes + (liked.has(p.id) ? 1 : 0)}
          </button>
        </div>
      ))}
      <p className="text-[10px] text-muted-foreground text-center">UI updates instantly; server syncs in background</p>
    </div>
  );
}

function CacheDemo() {
  type CacheEntry = { key: string; status: 'loading' | 'success' | 'stale'; age: number };
  const [entries, setEntries] = React.useState<CacheEntry[]>([
    { key: '/users', status: 'success', age: 12 },
    { key: '/products', status: 'stale', age: 65 },
    { key: '/orders', status: 'loading', age: 0 },
  ]);

  const invalidate = (key: string) => {
    setEntries(prev => prev.map(e => e.key === key ? { ...e, status: 'loading', age: 0 } : e));
    setTimeout(() => {
      setEntries(prev => prev.map(e => e.key === key ? { ...e, status: 'success', age: 0 } : e));
    }, 700);
  };

  return (
    <div className="w-full max-w-sm space-y-2 font-sans">
      <p className="font-mono text-[10px] text-muted-foreground">QueryCache visualization</p>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="flex border-b border-border bg-muted/40 px-3 py-1.5">
          {['Key', 'Status', 'Age', ''].map(h => <div key={h} className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</div>)}
        </div>
        {entries.map(e => (
          <div key={e.key} className="flex items-center border-t border-border/60 px-3 py-2">
            <div className="flex-1 font-mono text-[11px]">{e.key}</div>
            <div className="flex-1">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                e.status === 'success' ? 'bg-emerald-500/10 text-emerald-600' :
                e.status === 'stale' ? 'bg-amber-500/10 text-amber-600' :
                'bg-blue-500/10 text-blue-500'
              }`}>
                {e.status === 'loading' ? '⟳ loading' : e.status}
              </span>
            </div>
            <div className="flex-1 font-mono text-[11px] text-muted-foreground">{e.age}s</div>
            <button onClick={() => invalidate(e.key)}
              className="rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-accent hover:text-fg transition-colors">
              invalidate
            </button>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">staleTime: 60 000ms — entries older than 60s are stale</p>
    </div>
  );
}

/* ── TOC ─────────────────────────────────────────────────────────────────── */

const TOC = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-start', title: 'Quick Start' },
  { id: 'queries', title: 'Queries' },
  { id: 'query-options', title: '→ Options' },
  { id: 'query-returns', title: '→ Returns' },
  { id: 'query-patterns', title: '→ Patterns' },
  { id: 'mutations', title: 'Mutations' },
  { id: 'mutation-options', title: '→ Options' },
  { id: 'optimistic', title: '→ Optimistic updates' },
  { id: 'cache', title: 'Cache behavior' },
  { id: 'parallel', title: 'Parallel queries' },
  { id: 'infinite', title: 'Infinite scroll' },
  { id: 'suspense', title: 'Suspense' },
  { id: 'ssr', title: 'SSR / Server' },
  { id: 'persistence', title: 'Persistence' },
  { id: 'api-reference', title: 'API Reference' },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ApiClientPage() {
  const [activeId, setActiveId] = React.useState('overview');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { const vis = entries.find(e => e.isIntersecting); if (vis) setActiveId(vis.target.id); },
      { rootMargin: '-10% 0px -75% 0px' },
    );
    TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex gap-12">
      {/* ── Main ──────────────────────────────────────────────────────── */}
      <article className="min-w-0 flex-1">

        {/* Header */}
        <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <span>Docs</span>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span>Data Fetching</span>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span className="font-medium text-fg">@structyl/api-client</span>
        </nav>

        <div id="overview" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">@structyl/api-client</h1>
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-500">beta</span>
          </div>
          <p className="mt-3 text-base text-muted-foreground">
            Lightweight data-fetching for React 18. Axios-powered with a built-in cache, automatic deduplication,
            retries, polling, optimistic mutations, infinite scroll, and SSR support — all without TanStack Query.
          </p>

          {/* Feature grid */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['useSyncExternalStore cache', 'React 18 concurrent-safe, no context thrash'],
              ['Request deduplication', 'One in-flight request per cache key'],
              ['Smart invalidation', 'Generation counter prevents stale writes'],
              ['Optimistic mutations', 'Rollback on error, stable with Suspense'],
              ['SSR dehydrate/hydrate', 'Prefetch on server, reuse on client'],
              ['Zero extra deps', 'Only axios + react as peer dependencies'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-border p-3">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium">{title}</p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border bg-muted/30 px-4 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">vs other libraries</p>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Feature</th>
                  <th className="px-3 py-2 font-medium">@structyl/api-client</th>
                  <th className="px-3 py-2 font-medium">TanStack Query</th>
                  <th className="px-3 py-2 font-medium">SWR</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Bundle size', '~6 kB', '~35 kB', '~11 kB'],
                  ['Axios built-in', '✓', '✗ (bring your own)', '✗'],
                  ['Auth token injection', '✓ built-in', '✗ manual', '✗ manual'],
                  ['Token refresh', '✓ built-in', '✗ manual', '✗ manual'],
                  ['Optimistic updates', '✓', '✓', '✓'],
                  ['Infinite scroll', '✓', '✓', '✓'],
                  ['Suspense', '✓', '✓', '✓'],
                  ['SSR / dehydrate', '✓', '✓', '✓'],
                  ['DevTools', '✓ (subpath)', '✓', '✗'],
                ].map(([f, a, t, s]) => (
                  <tr key={f} className="border-t border-border/60">
                    <td className="px-3 py-2 font-medium">{f}</td>
                    <td className="px-3 py-2 text-emerald-600 font-medium">{a}</td>
                    <td className="px-3 py-2 text-muted-foreground">{t}</td>
                    <td className="px-3 py-2 text-muted-foreground">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Quick Start ──────────────────────────────────────────────── */}
        <Section id="quick-start" title="Quick Start">
          <SubSection id="install" title="1. Install">
            <CodeBlock lang="bash" code={`pnpm add @structyl/api-client axios`} />
          </SubSection>

          <SubSection id="create-client" title="2. Create a client">
            <p className="mb-3 text-sm text-muted-foreground">
              Call <code className="rounded bg-muted px-1 text-[12px]">createApiClient</code> once — typically in <code className="rounded bg-muted px-1 text-[12px]">lib/api.ts</code>.
              The client handles Axios instance creation, auth headers, and token refresh automatically.
            </p>
            <CodeBlock lang="ts" code={`// lib/api.ts
import { createApiClient, QueryClient } from '@structyl/api-client';

export const apiClient = createApiClient({
  baseURL: 'https://api.example.com',

  // Inject the Bearer token on every request
  getAuthToken: () => localStorage.getItem('token'),

  // Called automatically when a 401 is received
  refreshToken: async () => {
    const res = await fetch('/api/auth/refresh', { method: 'POST' });
    const { token } = await res.json();
    localStorage.setItem('token', token);
    return token;
  },

  // Called if refresh itself fails (e.g. redirect to login)
  onRefreshError: () => { window.location.href = '/login'; },

  timeout: 10_000,
  headers: { 'X-App-Version': '1.0.0' },
});

export const queryClient = new QueryClient({
  gcTime: 5 * 60_000, // garbage-collect unused entries after 5 min
  onError: (err) => console.error(err),
});`} />
          </SubSection>

          <SubSection id="wrap-app" title="3. Wrap your app">
            <CodeBlock lang="tsx" code={`// app/layout.tsx  (or _app.tsx in pages router)
import { ApiProvider } from '@structyl/api-client';
import { apiClient, queryClient } from '@/lib/api';

export default function RootLayout({ children }) {
  return (
    <ApiProvider client={apiClient} queryClient={queryClient}>
      {children}
    </ApiProvider>
  );
}`} />
          </SubSection>

          <SubSection id="first-query" title="4. Fetch data">
            <CodeBlock lang="tsx" code={`import { useApiQuery } from '@structyl/api-client';

interface User { id: number; name: string; email: string }

export function UserList() {
  const { data, isLoading, error, refetch } = useApiQuery<User[]>('/users');

  if (isLoading) return <Spinner />;
  if (error)     return <Error message={error.message} />;

  return (
    <>
      {data?.map(user => <UserCard key={user.id} user={user} />)}
      <button onClick={refetch}>Refresh</button>
    </>
  );
}`} />
            <PreviewBlock title="Live demo" code={`const { data, isLoading, refetch } = useApiQuery('/users');`}>
              <QueryDemo />
            </PreviewBlock>
          </SubSection>
        </Section>

        {/* ── Queries ──────────────────────────────────────────────────── */}
        <Section id="queries" title="Queries">
          <p className="text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 text-[12px]">useApiQuery</code> fetches data,
            caches it with a configurable <code className="rounded bg-muted px-1 text-[12px]">staleTime</code>,
            and subscribes your component to cache updates via <code className="rounded bg-muted px-1 text-[12px]">useSyncExternalStore</code>.
          </p>

          <SubSection id="query-overloads" title="Overloads">
            <CodeBlock lang="tsx" code={`// Overload 1 — URL is both key and fetcher (most common)
const { data } = useApiQuery<User[]>('/users');

// Overload 2 — Separate key + URL (e.g. key includes variables)
const { data } = useApiQuery<User>(['/users', userId], \`/users/\${userId}\`);

// Overload 3 — Separate key + custom fetcher
const { data } = useApiQuery<User>(
  ['/users', userId],
  (axios) => axios.get(\`/users/\${userId}\`).then(r => r.data),
);`} />
          </SubSection>

          <SubSection id="query-options" title="Options">
            <PropsTable rows={[
              { prop: 'enabled', type: 'boolean', default: 'true', description: 'Set to false to disable automatic fetching. Useful for dependent queries.' },
              { prop: 'staleTime', type: 'number', default: '60_000', description: 'Milliseconds before cached data is considered stale and eligible for a background refetch.' },
              { prop: 'gcTime', type: 'number', default: '300_000', description: 'Milliseconds of inactivity before the cache entry is garbage collected.' },
              { prop: 'retry', type: 'number | false', default: '1', description: 'Number of times to retry a failed request. Set to false to disable retries.' },
              { prop: 'refetchOnWindowFocus', type: 'boolean', default: 'true', description: 'Refetch when the browser window regains focus, if the data is stale.' },
              { prop: 'pollInterval', type: 'number', default: '—', description: 'If set, refetches on this interval (in ms). Useful for live dashboards.' },
              { prop: 'select', type: '(data: TData) => TSelected', default: '—', description: 'Transform or filter the response before it is returned to the component.' },
              { prop: 'initialData', type: 'TData', default: '—', description: 'Pre-populate the cache synchronously before the first network request.' },
              { prop: 'placeholderData', type: 'TSelected', default: '—', description: 'Show this data while loading. isPlaceholderData is true when active.' },
              { prop: 'keepPreviousData', type: 'boolean', default: 'false', description: 'Keep previous data visible while a new key is loading (e.g. pagination).' },
              { prop: 'debounce', type: 'number', default: '—', description: 'Debounce the fetch by this many ms. Ideal for search-as-you-type.' },
            ]} />
          </SubSection>

          <SubSection id="query-returns" title="Return values">
            <ReturnsTable rows={[
              { field: 'data', type: 'TSelected | undefined', description: 'The fetched (and optionally transformed) data. undefined while loading or on error.' },
              { field: 'isLoading', type: 'boolean', description: 'True when loading and there is no cached data yet (initial load skeleton state).' },
              { field: 'isFetching', type: 'boolean', description: 'True during any in-flight request, including background refetches.' },
              { field: 'isRefetching', type: 'boolean', description: 'True when re-fetching while stale cached data is still visible.' },
              { field: 'isPlaceholderData', type: 'boolean', description: 'True when placeholderData is being shown instead of real data.' },
              { field: 'isSuccess', type: 'boolean', description: 'True once data has been fetched at least once successfully.' },
              { field: 'isError', type: 'boolean', description: 'True when the last fetch attempt failed.' },
              { field: 'error', type: 'ApiError | null', description: 'The last error object, or null if no error.' },
              { field: 'status', type: "'idle' | 'loading' | 'success' | 'error'", description: 'The raw cache entry status string.' },
              { field: 'refetch', type: '() => void', description: 'Force a fresh request, bypassing staleTime.' },
            ]} />
          </SubSection>

          <SubSection id="query-patterns" title="Common patterns">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">Conditional query (dependent on another)</p>
                <CodeBlock lang="tsx" code={`const { data: user } = useApiQuery('/me');

// Only runs when user is loaded
const { data: posts } = useApiQuery(
  ['/posts', user?.id],
  \`/users/\${user?.id}/posts\`,
  { enabled: !!user?.id },
);`} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Select transform — shape data per component</p>
                <CodeBlock lang="tsx" code={`// Raw type: { users: User[]; total: number }
// Transformed: User[]
const { data: activeUsers } = useApiQuery<ApiResponse, User[]>(
  '/users',
  {
    select: (res) => res.users.filter(u => u.active),
  }
);`} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Search-as-you-type with debounce</p>
                <CodeBlock lang="tsx" code={`function Search({ query }: { query: string }) {
  const { data } = useApiQuery<Result[]>(
    ['/search', query],
    \`/search?q=\${query}\`,
    {
      debounce: 300,         // wait 300ms after last keystroke
      keepPreviousData: true, // keep old results visible while loading
      enabled: query.length > 1,
    }
  );
  // ...
}`} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Polling — live data without WebSockets</p>
                <CodeBlock lang="tsx" code={`const { data: jobStatus } = useApiQuery('/jobs/123/status', {
  pollInterval: 3_000, // poll every 3 seconds
  enabled: jobStatus?.state !== 'done', // stop when complete
});`} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Pagination with keepPreviousData</p>
                <CodeBlock lang="tsx" code={`function UserTable({ page }: { page: number }) {
  const { data, isPlaceholderData } = useApiQuery<User[]>(
    ['/users', page],
    \`/users?page=\${page}&limit=20\`,
    { keepPreviousData: true },
  );

  return (
    <div style={{ opacity: isPlaceholderData ? 0.7 : 1 }}>
      {data?.map(u => <Row key={u.id} user={u} />)}
    </div>
  );
}`} />
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ── Mutations ────────────────────────────────────────────────── */}
        <Section id="mutations" title="Mutations">
          <p className="text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 text-[12px]">useApiMutation</code> wraps POST/PUT/PATCH/DELETE
            requests with status tracking, cache invalidation, and optimistic updates.
            It does not touch the cache until <code className="rounded bg-muted px-1 text-[12px]">mutate()</code> is called.
          </p>

          <SubSection id="basic-mutation" title="Basic usage">
            <CodeBlock lang="tsx" code={`import { useApiMutation } from '@structyl/api-client';

interface CreateUser { name: string; email: string }

function CreateUserForm() {
  const { mutate, mutateAsync, isPending, isError, error, reset } =
    useApiMutation<User, CreateUser>('/users', {
      method: 'POST',

      // Invalidate the /users list cache after success → triggers refetch
      invalidates: [['/users']],

      onSuccess: (user, variables) => {
        toast.success(\`Created \${user.name}\`);
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return (
    <form onSubmit={e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      mutate({ name: data.get('name'), email: data.get('email') });
    }}>
      <input name="name" />
      <input name="email" />
      <button disabled={isPending}>{isPending ? 'Saving…' : 'Create'}</button>
      {isError && <p>{error?.message} <button onClick={reset}>Dismiss</button></p>}
    </form>
  );
}`} />
            <PreviewBlock title="Live demo — mutation + invalidation" code={`const { mutate, isPending } = useApiMutation('/users', {
  method: 'POST',
  invalidates: [['/users']],
  onSuccess: (user) => toast(\`Created \${user.name}\`),
});`}>
              <MutationDemo />
            </PreviewBlock>
          </SubSection>

          <SubSection id="mutation-options" title="Options">
            <PropsTable rows={[
              { prop: 'method', type: "'POST' | 'PUT' | 'PATCH' | 'DELETE'", default: "'POST'", description: 'HTTP method for the request.' },
              { prop: 'invalidates', type: 'unknown[][]', default: '—', description: 'Array of query keys to invalidate on success. Each element is a key array matching useApiQuery.' },
              { prop: 'onSuccess', type: '(data, variables) => void | Promise<void>', default: '—', description: 'Called after the request succeeds and cache invalidation is complete.' },
              { prop: 'onError', type: '(error: ApiError) => void', default: '—', description: 'Called when the request fails. Optimistic updates are rolled back before this fires.' },
              { prop: 'optimistic', type: 'OptimisticConfig', default: '—', description: 'Apply an optimistic update before the request, with automatic rollback on error.' },
              { prop: 'onUploadProgress', type: '(percentage: number) => void', default: '—', description: 'Upload progress callback (0–100). Useful for file uploads.' },
            ]} />
          </SubSection>

          <SubSection id="mutation-returns" title="Return values">
            <ReturnsTable rows={[
              { field: 'mutate', type: '(variables: TVariables) => void', description: 'Fire-and-forget mutation. Errors are swallowed; observe isError instead.' },
              { field: 'mutateAsync', type: '(variables: TVariables) => Promise<TData>', description: 'Returns a promise. Throws ApiError on failure. Use inside async event handlers.' },
              { field: 'data', type: 'TData | undefined', description: 'The last successful response data.' },
              { field: 'isPending', type: 'boolean', description: 'True while the request is in flight.' },
              { field: 'isSuccess', type: 'boolean', description: 'True after the last request succeeded.' },
              { field: 'isError', type: 'boolean', description: 'True after the last request failed.' },
              { field: 'error', type: 'ApiError | null', description: 'The last error.' },
              { field: 'reset', type: '() => void', description: 'Reset state back to idle.' },
            ]} />
          </SubSection>

          <SubSection id="optimistic" title="Optimistic updates">
            <p className="mb-3 text-sm text-muted-foreground">
              Pass an <code className="rounded bg-muted px-1 text-[12px]">optimistic</code> config to
              apply a UI update instantly while the request is in flight.
              If the request fails, the original data is restored automatically.
            </p>
            <CodeBlock lang="tsx" code={`const { mutate } = useApiMutation<Post, { id: number; liked: boolean }>(
  '/posts/like',
  {
    method: 'PATCH',
    optimistic: {
      queryKey: ['/posts'],
      updater: (oldPosts, { id, liked }) =>
        oldPosts?.map(p => p.id === id ? { ...p, liked, likeCount: p.likeCount + (liked ? 1 : -1) } : p) ?? [],
    },
    // On error: old posts are automatically restored
    onError: (err) => toast.error('Failed to like — reverted'),
  }
);

// UI responds immediately
mutate({ id: post.id, liked: !post.liked });`} />
            <PreviewBlock title="Live demo — optimistic like" code={`optimistic: { queryKey: ['/posts'], updater: (old, { id, liked }) => ... }`}>
              <OptimisticDemo />
            </PreviewBlock>
          </SubSection>

          <SubSection id="file-upload" title="File uploads with progress">
            <CodeBlock lang="tsx" code={`function AvatarUpload() {
  const [progress, setProgress] = React.useState(0);

  const { mutate, isPending } = useApiMutation<{ url: string }, FormData>(
    '/upload/avatar',
    {
      method: 'POST',
      onUploadProgress: (pct) => setProgress(pct),
      onSuccess: ({ url }) => updateAvatar(url),
    }
  );

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    mutate(fd);
  };

  return (
    <>
      <input type="file" onChange={onFile} accept="image/*" />
      {isPending && <progress value={progress} max={100} />}
    </>
  );
}`} />
          </SubSection>
        </Section>

        {/* ── Cache ────────────────────────────────────────────────────── */}
        <Section id="cache" title="Cache behavior">
          <p className="text-sm text-muted-foreground mb-4">
            The cache is a simple in-memory key→value store. Each entry has a status
            (<code className="rounded bg-muted px-1 text-[12px]">idle | loading | success | error</code>),
            a <code className="rounded bg-muted px-1 text-[12px]">updatedAt</code> timestamp, and a generation counter
            that prevents stale in-flight writes from landing.
          </p>

          <CacheDemo />

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">Staleness</p>
              <p className="mb-2 text-sm text-muted-foreground">
                Data is <em>fresh</em> for <code className="rounded bg-muted px-1 text-[12px]">staleTime</code> ms after it was last fetched.
                A stale entry is served immediately and refetched in the background on the next component mount or window focus.
                Setting <code className="rounded bg-muted px-1 text-[12px]">staleTime: Infinity</code> effectively disables background refetching.
              </p>
              <CodeBlock lang="ts" code={`// Never stale — fetch once and cache forever (per session)
const { data } = useApiQuery('/config', { staleTime: Infinity });

// Always stale — always refetch on mount
const { data } = useApiQuery('/live-prices', { staleTime: 0 });`} />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">External invalidation</p>
              <p className="mb-2 text-sm text-muted-foreground">
                Mutations call <code className="rounded bg-muted px-1 text-[12px]">queryClient.invalidateQueries</code> which sets
                a sentinel (<code className="rounded bg-muted px-1 text-[12px]">updatedAt = 0</code>) on the entry.
                Active query hooks watching that key detect the sentinel and trigger a fresh fetch,
                <em>without</em> triggering an infinite loop when <code className="rounded bg-muted px-1 text-[12px]">staleTime: 0</code>.
              </p>
              <CodeBlock lang="ts" code={`// Manually invalidate any key from anywhere
import { queryClient } from '@/lib/api';

queryClient.invalidateQueries({ queryKey: ['/users'] });

// Set data directly (skip network, e.g. after a mutation response)
queryClient.setQueryData(['/users', 1], updatedUser);

// Read current data without subscribing
const user = queryClient.getQueryData<User>(['/users', 1]);

// Cancel in-flight request for a key (e.g. before optimistic update)
await queryClient.cancelQueries({ queryKey: ['/users', 1] });`} />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Garbage collection</p>
              <p className="text-sm text-muted-foreground">
                Unused cache entries (no active subscribers) are removed after <code className="rounded bg-muted px-1 text-[12px]">gcTime</code> ms
                (default 5 min). Configure it in <code className="rounded bg-muted px-1 text-[12px]">new QueryClient({"{ gcTime: ... }"})</code>.
              </p>
            </div>
          </div>
        </Section>

        {/* ── Parallel queries ──────────────────────────────────────────── */}
        <Section id="parallel" title="Parallel Queries">
          <p className="mb-4 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 text-[12px]">useApiQueries</code> runs multiple queries
            in parallel and returns a stable-snapshot array — updating only when at least one entry changes.
          </p>
          <CodeBlock lang="tsx" code={`import { useApiQueries } from '@structyl/api-client';

function Dashboard({ userId }: { userId: string }) {
  const results = useApiQueries([
    { url: '/stats/revenue' },
    { url: '/stats/users' },
    { url: \`/users/\${userId}/activity\`, key: ['activity', userId] },
    {
      url: '/products',
      options: {
        select: (products) => products.filter(p => p.featured),
        staleTime: 5 * 60_000,
      },
    },
  ]);

  const [revenue, users, activity, featured] = results;

  if (results.some(r => r.isLoading)) return <Skeleton />;

  return (
    <Grid>
      <StatCard value={revenue.data?.total} label="Revenue" />
      <StatCard value={users.data?.count} label="Users" />
      <ActivityFeed items={activity.data ?? []} />
      <FeaturedProducts items={featured.data ?? []} />
    </Grid>
  );
}`} />
          <Callout variant="tip">
            Each entry has its own <code className="rounded bg-muted px-1 text-[12px]">refetch()</code> — calling
            <code className="rounded bg-muted px-1 text-[12px]">results[1].refetch()</code> only re-fetches
            the users query, leaving the others untouched.
          </Callout>
        </Section>

        {/* ── Infinite scroll ───────────────────────────────────────────── */}
        <Section id="infinite" title="Infinite Scroll">
          <p className="mb-4 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 text-[12px]">useInfiniteApiQuery</code> manages paginated data
            as a list of pages. By default it appends <code className="rounded bg-muted px-1 text-[12px]">?cursor=</code> to
            the URL for each page. Pass a custom <code className="rounded bg-muted px-1 text-[12px]">fetchPage</code> for
            offset/page-number pagination.
          </p>
          <CodeBlock lang="tsx" code={`import { useInfiniteApiQuery } from '@structyl/api-client';

interface PostsPage { posts: Post[]; nextCursor: string | null }

function Feed() {
  const {
    data,          // { pages: PostsPage[], pageParams: unknown[] }
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteApiQuery<PostsPage>('/posts', {
    // URL becomes /posts?cursor=<nextCursor> automatically
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

    // Optional: support bidirectional scrolling
    getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? undefined,

    staleTime: 2 * 60_000,
    retry: 2,
  });

  const posts = data?.pages.flatMap(p => p.posts) ?? [];

  return (
    <>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
      <button onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading…' : hasNextPage ? 'Load more' : 'All caught up'}
      </button>
    </>
  );
}`} />

          <PreviewBlock title="Live demo" code={`const { data, fetchNextPage, hasNextPage } = useInfiniteApiQuery('/items', {
  getNextPageParam: (last) => last.nextCursor ?? undefined,
});`}>
            <InfiniteDemo />
          </PreviewBlock>

          <SubSection id="infinite-custom-fetcher" title="Custom page fetcher (offset pagination)">
            <CodeBlock lang="tsx" code={`const { data, fetchNextPage } = useInfiniteApiQuery<UserPage>('/users', {
  getNextPageParam: (last, all) =>
    last.hasMore ? all.length : undefined, // page index = array length

  fetchPage: async (pageParam, axios) => {
    const page = pageParam as number ?? 0;
    const res = await axios.get('/users', { params: { offset: page * 20, limit: 20 } });
    return res.data;
  },
});`} />
          </SubSection>
        </Section>

        {/* ── Suspense ─────────────────────────────────────────────────── */}
        <Section id="suspense" title="Suspense">
          <p className="mb-4 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 text-[12px]">useSuspenseApiQuery</code> integrates with
            React Suspense. It throws a Promise on the initial load (caught by the nearest{' '}
            <code className="rounded bg-muted px-1 text-[12px]">{'<Suspense>'}</code> boundary) and throws an
            ApiError on failure (caught by an <code className="rounded bg-muted px-1 text-[12px]">ErrorBoundary</code>).
            Background refetches never suspend — they run silently.
          </p>

          <Callout variant="info">
            Unlike <code className="rounded bg-muted px-1 text-[12px]">useApiQuery</code>, the returned{' '}
            <code className="rounded bg-muted px-1 text-[12px]">data</code> is <strong>non-nullable</strong> — it is
            guaranteed to be defined once the component renders. No{' '}
            <code className="rounded bg-muted px-1 text-[12px]">undefined</code> check needed.
          </Callout>

          <CodeBlock lang="tsx" code={`import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSuspenseApiQuery } from '@structyl/api-client';

// Child component — data is guaranteed non-null
function UserProfile({ id }: { id: string }) {
  const { data: user, isFetching, refetch } = useSuspenseApiQuery<User>(
    \`/users/\${id}\`,
    { staleTime: 5 * 60_000 }
  );

  // data.name is safe — no optional chaining needed
  return (
    <div>
      <h1>{user.name}</h1>
      {isFetching && <RefreshIndicator />} {/* background refetch */}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}

// Parent — provides fallback and error UI
function UserPage({ id }: { id: string }) {
  return (
    <ErrorBoundary fallback={<ErrorCard />}>
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}`} />

          <SubSection id="suspense-returns" title="Return values">
            <ReturnsTable rows={[
              { field: 'data', type: 'TData', description: 'Non-nullable. Guaranteed to be defined when the component is mounted.' },
              { field: 'isFetching', type: 'boolean', description: 'True during a background refetch (does not cause suspension).' },
              { field: 'isRefetching', type: 'boolean', description: 'True during a background refetch while stale data is shown.' },
              { field: 'isSuccess', type: 'true', description: 'Always true — Suspense ensures this hook only renders on success.' },
              { field: 'refetch', type: '() => void', description: 'Trigger a background refresh without suspending.' },
            ]} />
          </SubSection>
        </Section>

        {/* ── SSR ──────────────────────────────────────────────────────── */}
        <Section id="ssr" title="SSR / Server Rendering">
          <p className="mb-4 text-sm text-muted-foreground">
            Prefetch queries on the server, dehydrate the cache to JSON, send it to the client,
            and rehydrate before React renders — eliminating the initial loading spinner for server-rendered pages.
          </p>

          <SubSection id="ssr-nextjs" title="Next.js App Router">
            <CodeBlock lang="tsx" code={`// app/users/page.tsx  (Server Component)
import { prefetchApiQuery, dehydrate } from '@structyl/api-client/server';
import { apiClient, queryClient } from '@/lib/api';
import { HydrationBoundary } from '@structyl/api-client';
import { UserList } from './UserList';

export default async function UsersPage() {
  // Prefetch on server — populates queryClient cache
  await prefetchApiQuery(queryClient, apiClient, '/users');

  return (
    // Serialize the cache and send to client
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserList /> {/* renders without a loading state */}
    </HydrationBoundary>
  );
}

// app/users/UserList.tsx  ('use client')
// useApiQuery finds the prefetched data in cache → no loading state
function UserList() {
  const { data } = useApiQuery('/users'); // instant!
  return <>{data?.map(u => <UserCard key={u.id} user={u} />)}</>;
}`} />
          </SubSection>

          <SubSection id="ssr-pages" title="Pages Router (getServerSideProps)">
            <CodeBlock lang="tsx" code={`// pages/users.tsx
import { prefetchApiQuery, dehydrate } from '@structyl/api-client/server';
import { apiClient, queryClient } from '@/lib/api';

export async function getServerSideProps() {
  await prefetchApiQuery(queryClient, apiClient, '/users');
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default function UsersPage({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <UserList />
    </HydrationBoundary>
  );
}`} />
          </SubSection>
        </Section>

        {/* ── Persistence ──────────────────────────────────────────────── */}
        <Section id="persistence" title="Cache Persistence">
          <p className="mb-4 text-sm text-muted-foreground">
            Persist the cache to localStorage (or any storage implementing{' '}
            <code className="rounded bg-muted px-1 text-[12px]">getItem/setItem/removeItem</code>)
            so data survives page refreshes.
          </p>

          <CodeBlock lang="tsx" code={`import { persistCache } from '@structyl/api-client';
import { queryClient } from '@/lib/api';

// Call once before ApiProvider renders, e.g. in app.tsx
await persistCache(queryClient, {
  storage: window.localStorage, // or AsyncStorage, IndexedDB wrapper, etc.
  key: 'my-app-cache',           // storage key (default: 'structyl-cache')
  maxAge: 24 * 60 * 60_000,      // discard entries older than 24 h
});

// That's it — the cache is now hydrated from storage on page load
// and written to storage after every successful fetch.`} />

          <Callout variant="warning">
            Serialization uses <code className="rounded bg-muted px-1 text-[12px]">JSON.stringify</code>.
            Do not persist sensitive data (auth tokens, PII) — store those in secure HttpOnly cookies instead.
          </Callout>
        </Section>

        {/* ── API Reference ─────────────────────────────────────────────── */}
        <Section id="api-reference" title="API Reference">

          <SubSection id="ref-create-client" title="createApiClient(config)">
            <p className="mb-3 text-sm text-muted-foreground">Creates the Axios-based API client. Returns an <code className="rounded bg-muted px-1 text-[12px]">ApiClient</code> instance.</p>
            <PropsTable rows={[
              { prop: 'baseURL', type: 'string', description: 'Base URL prepended to every request.' },
              { prop: 'headers', type: 'Record<string, string>', description: 'Static headers sent on every request.' },
              { prop: 'timeout', type: 'number', default: '10_000', description: 'Request timeout in ms.' },
              { prop: 'getAuthToken', type: '() => string | null | Promise<…>', description: 'Called before each request to inject a Bearer token.' },
              { prop: 'refreshToken', type: '() => Promise<string>', description: 'Called automatically when a 401 response is received. Should return the new token.' },
              { prop: 'onRefreshError', type: '(err: unknown) => void', description: 'Called when the token refresh itself fails (e.g. to redirect to login).' },
            ]} />
          </SubSection>

          <SubSection id="ref-query-client" title="new QueryClient(config)">
            <PropsTable rows={[
              { prop: 'gcTime', type: 'number', default: '300_000', description: 'Garbage collect unused cache entries after this many ms of inactivity.' },
              { prop: 'onError', type: '(error: ApiError, key: string) => void', description: 'Global error listener — called after every failed fetch.' },
              { prop: 'onSuccess', type: '(data: unknown, key: string) => void', description: 'Global success listener — called after every successful fetch.' },
            ]} />
          </SubSection>

          <SubSection id="ref-provider" title="ApiProvider">
            <PropsTable rows={[
              { prop: 'client', type: 'ApiClient', description: 'The ApiClient instance from createApiClient().' },
              { prop: 'queryClient', type: 'QueryClient', description: 'The QueryClient instance. Manages the cache and GC.' },
              { prop: 'children', type: 'React.ReactNode', description: 'Your app.' },
            ]} />
          </SubSection>

          <SubSection id="ref-use-api-client" title="useApiClient()">
            <p className="mb-3 text-sm text-muted-foreground">Returns the raw Axios instance for one-off requests or non-hook usage.</p>
            <CodeBlock lang="tsx" code={`const { instance } = useApiClient();
const res = await instance.get('/download', { responseType: 'blob' });`} />
          </SubSection>

          <SubSection id="ref-query-client-methods" title="QueryClient methods">
            <ReturnsTable rows={[
              { field: 'invalidateQueries({ queryKey })', type: 'Promise<void>', description: 'Mark a cached entry stale and trigger a refetch in all active subscribers.' },
              { field: 'setQueryData(key, updater)', type: 'void', description: 'Write data directly to the cache, bypassing the network.' },
              { field: 'getQueryData<T>(key)', type: 'T | undefined', description: 'Read current data for a key without subscribing.' },
              { field: 'cancelQueries({ queryKey })', type: 'Promise<void>', description: 'Abort the in-flight request for a key (used before optimistic updates).' },
              { field: 'clear()', type: 'void', description: 'Wipe the entire cache (e.g. on logout).' },
            ]} />
          </SubSection>

          <SubSection id="ref-error-type" title="ApiError shape">
            <CodeBlock lang="ts" code={`interface ApiError {
  status: number;  // HTTP status code (0 for network errors)
  message: string; // Human-readable message
  data?: unknown;  // Raw response body from the server, if any
}`} />
          </SubSection>

        </Section>

        {/* Footer */}
        <div className="mt-14 flex justify-end">
          <a href="https://github.com/imirfanul/structyl" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-fg">
            Edit on GitHub <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </article>

      {/* ── TOC ───────────────────────────────────────────────────────── */}
      <aside className="hidden w-[180px] shrink-0 xl:block">
        <div className="sticky top-[76px]">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">On this page</p>
          <nav className="space-y-0.5">
            {TOC.map(({ id, title }) => (
              <a key={id} href={`#${id}`}
                className={`block border-l-2 py-1 pl-3 text-[12px] transition-colors ${
                  activeId === id
                    ? 'border-primary font-medium text-primary'
                    : 'border-transparent text-muted-foreground hover:text-fg'
                } ${title.startsWith('→') ? 'pl-5 text-[11px]' : ''}`}>
                {title}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
