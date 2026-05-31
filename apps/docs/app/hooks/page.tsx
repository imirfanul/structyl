'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Check, ChevronRight } from '@structyl/icons';
import { useTheme } from '@structyl/themes';
import { Button } from '@structyl/styled';
import {
  useBoolean,
  useToggle,
  useCounter,
  usePrevious,
  useDebounce,
  useThrottle,
  useLocalStorage,
  useCopyToClipboard,
  useMediaQuery,
  useDarkMode,
  useWindowSize,
  useClickOutside,
  useHotkeys,
  useMount,
  useUnmount,
  useUpdateEffect,
  useId,
} from '@structyl/hooks';

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

interface HookDef {
  name: string;
  category: string;
  description: string;
  signature: string;
  params: Array<{ name: string; type: string; description: string }>;
  returns: string;
  demo: React.FC;
  code: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Demo components (one per hook)
───────────────────────────────────────────────────────────────────────────── */

function UseBooleanDemo() {
  const { value, on, off, toggle } = useBoolean(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold transition-colors ${value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
        {value ? 'ON' : 'OFF'}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={on}>on()</Button>
        <Button size="sm" variant="outline" onClick={off}>off()</Button>
        <Button size="sm" onClick={toggle}>toggle()</Button>
      </div>
    </div>
  );
}

function UseToggleDemo() {
  const [value, toggle] = useToggle(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`h-10 w-20 rounded-full border-2 transition-colors ${value ? 'border-primary bg-primary' : 'border-border bg-muted'} relative cursor-pointer`} onClick={toggle}>
        <div className={`absolute top-1 h-6 w-6 rounded-full bg-bg shadow transition-transform ${value ? 'translate-x-11' : 'translate-x-1'}`} />
      </div>
      <p className="font-mono text-sm text-muted-foreground">value: <span className="text-fg font-medium">{String(value)}</span></p>
    </div>
  );
}

function UseCounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-muted/30 text-4xl font-bold tabular-nums">
        {count}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => decrement()}>−1</Button>
        <Button size="sm" variant="outline" onClick={reset}>reset</Button>
        <Button size="sm" onClick={() => increment()}>+1</Button>
      </div>
      <Button size="sm" variant="ghost" onClick={() => increment(10)} className="text-xs text-muted-foreground">
        +10 at once
      </Button>
    </div>
  );
}

function UsePreviousDemo() {
  const { count, increment, decrement } = useCounter(0);
  const previous = usePrevious(count);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-xl border border-border bg-muted/30 px-6 py-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Previous</p>
          <p className="mt-1 font-mono text-2xl font-bold text-muted-foreground">{previous ?? '—'}</p>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 px-6 py-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Current</p>
          <p className="mt-1 font-mono text-2xl font-bold text-fg">{count}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => decrement()}>−1</Button>
        <Button size="sm" onClick={() => increment()}>+1</Button>
      </div>
    </div>
  );
}

function UseDebounceDemo() {
  const [input, setInput] = React.useState('');
  const debounced = useDebounce(input, 500);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type quickly…"
        className="h-9 w-full rounded-lg border border-border bg-bg px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
      />
      <div className="space-y-1.5 rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">raw:</span>
          <span className="text-fg">{input || <em className="not-italic text-muted-foreground">empty</em>}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">debounced (500ms):</span>
          <span className="text-primary">{debounced || <em className="not-italic text-muted-foreground">empty</em>}</span>
        </div>
      </div>
    </div>
  );
}

function UseThrottleDemo() {
  const [raw, setRaw] = React.useState(50);
  const throttled = useThrottle(raw, 400);
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Drag the slider</label>
        <input
          type="range"
          min={0}
          max={100}
          value={raw}
          onChange={(e) => setRaw(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
      <div className="space-y-1.5 rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">raw:</span>
          <span className="text-fg">{raw}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">throttled (400ms):</span>
          <span className="text-primary">{throttled}</span>
        </div>
      </div>
    </div>
  );
}

function UseLocalStorageDemo() {
  const [name, setName, remove] = useLocalStorage('hooks-demo-name', '');
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something — it persists!"
        className="h-9 w-full rounded-lg border border-border bg-bg px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
      />
      <div className="flex items-center gap-2">
        <span className="flex-1 truncate rounded-md border border-border bg-muted/20 px-2 py-1 font-mono text-xs text-muted-foreground">
          localStorage[&quot;hooks-demo-name&quot;]: {name ? `"${name}"` : <em className="not-italic">empty</em>}
        </span>
        <Button size="sm" variant="outline" onClick={remove} className="shrink-0 text-xs">clear</Button>
      </div>
      <p className="text-[11px] text-muted-foreground">Refresh the page — the value stays.</p>
    </div>
  );
}

function UseCopyToClipboardDemo() {
  const { copy, copied } = useCopyToClipboard();
  const sample = `import { useCopyToClipboard } from '@structyl/hooks';`;
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2 font-mono text-[11px]">
        <span className="truncate text-muted-foreground">{sample}</span>
      </div>
      <Button onClick={() => copy(sample)} className="gap-2">
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </Button>
    </div>
  );
}

function UseMediaQueryDemo() {
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const bps = [
    { label: 'sm (≥640px)', active: isSm },
    { label: 'md (≥768px)', active: isMd },
    { label: 'lg (≥1024px)', active: isLg },
    { label: 'reduced-motion', active: prefersReduced },
  ];

  return (
    <div className="flex flex-col gap-2">
      {bps.map((bp) => (
        <div key={bp.label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
          <span className="font-mono text-xs text-muted-foreground">{bp.label}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${bp.active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            {bp.active ? 'true' : 'false'}
          </span>
        </div>
      ))}
    </div>
  );
}

function UseDarkModeDemo() {
  const isDark = useDarkMode();
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`flex h-20 w-20 items-center justify-center rounded-2xl text-4xl ${isDark ? 'bg-slate-800' : 'bg-amber-100'}`}>
        {isDark ? '🌙' : '☀️'}
      </div>
      <p className="text-sm text-muted-foreground">
        System preference:{' '}
        <span className="font-medium text-fg">{isDark ? 'dark' : 'light'}</span>
      </p>
      <p className="text-[11px] text-muted-foreground">Change your OS color scheme to see this update.</p>
    </div>
  );
}

function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-muted/30 px-8 py-4 text-center">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Width</p>
          <p className="mt-1 font-mono text-3xl font-bold tabular-nums">{width}</p>
          <p className="text-[10px] text-muted-foreground">px</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 px-8 py-4 text-center">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Height</p>
          <p className="mt-1 font-mono text-3xl font-bold tabular-nums">{height}</p>
          <p className="text-[10px] text-muted-foreground">px</p>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">Resize the window to see values update live.</p>
    </div>
  );
}

function UseClickOutsideDemo() {
  const [active, setActive] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);
  const boxRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(boxRef, () => {
    if (active) setClicks((c) => c + 1);
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="sm" onClick={() => setActive((v) => !v)} variant={active ? 'default' : 'outline'}>
        {active ? 'Watching (click outside box)' : 'Start watching'}
      </Button>
      {active && (
        <div
          ref={boxRef}
          className="flex h-28 w-52 items-center justify-center rounded-xl border-2 border-primary bg-primary/5 text-sm font-medium"
        >
          Click outside me!
        </div>
      )}
      {clicks > 0 && (
        <p className="text-sm text-muted-foreground">
          Outside clicks: <span className="font-mono font-bold text-primary">{clicks}</span>
        </p>
      )}
    </div>
  );
}

function UseHotkeysDemo() {
  const [log, setLog] = React.useState<string[]>([]);

  const push = React.useCallback((msg: string) => {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 4));
  }, []);

  useHotkeys('shift+a', () => push('Shift + A'));
  useHotkeys('ctrl+k', () => push('Ctrl + K'));
  useHotkeys('mod+shift+p', () => push('Mod + Shift + P'));

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {['Shift + A', 'Ctrl + K', 'Mod + Shift + P'].map((k) => (
          <kbd key={k} className="rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs">
            {k}
          </kbd>
        ))}
      </div>
      <div className="min-h-[80px] rounded-lg border border-border bg-muted/20 p-3">
        {log.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">Press one of the combos above…</p>
        ) : (
          log.map((entry, i) => (
            <p key={i} className={`font-mono text-[11px] ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
              {entry}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

function UseMountDemo() {
  const [mounted, setMounted] = React.useState(false);
  const [mountTime, setMountTime] = React.useState<string | null>(null);

  function Inner() {
    useMount(() => setMountTime(new Date().toLocaleTimeString()));
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-center text-sm">
        Mounted at <span className="font-mono font-medium text-primary">{mountTime}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button size="sm" variant={mounted ? 'outline' : 'default'} onClick={() => setMounted((v) => !v)}>
        {mounted ? 'Unmount component' : 'Mount component'}
      </Button>
      {mounted && <Inner />}
    </div>
  );
}

function UseUnmountDemo() {
  const [show, setShow] = React.useState(false);
  const [lastUnmount, setLastUnmount] = React.useState<string | null>(null);

  function Child() {
    useUnmount(() => setLastUnmount(new Date().toLocaleTimeString()));
    return (
      <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-center text-sm text-muted-foreground">
        I&apos;m mounted. Unmount me!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button size="sm" onClick={() => setShow((v) => !v)} variant={show ? 'outline' : 'default'}>
        {show ? 'Unmount' : 'Mount'} component
      </Button>
      {show && <Child />}
      {lastUnmount && (
        <p className="text-xs text-muted-foreground">
          Last unmount: <span className="font-mono text-primary">{lastUnmount}</span>
        </p>
      )}
    </div>
  );
}

function UseUpdateEffectDemo() {
  const [input, setInput] = React.useState('');
  const [updateCount, setUpdateCount] = React.useState(0);

  useUpdateEffect(() => {
    setUpdateCount((c) => c + 1);
  }, [input]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type to trigger updates…"
        className="h-9 w-full rounded-lg border border-border bg-bg px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
      />
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm">
        <span className="text-muted-foreground">Updates (mount skipped)</span>
        <span className="font-mono font-bold text-primary">{updateCount}</span>
      </div>
    </div>
  );
}

function UseIdDemo() {
  const id1 = useId('input');
  const id2 = useId('label');
  const id3 = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      {[
        { label: 'useId("input")', value: id1 },
        { label: 'useId("label")', value: id2 },
        { label: 'useId()', value: id3 },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs">
          <span className="text-muted-foreground">{row.label}</span>
          <span className="font-mono text-primary">{row.value}</span>
        </div>
      ))}
      <p className="text-[11px] text-muted-foreground">Stable across re-renders. SSR-safe.</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hook definitions registry
───────────────────────────────────────────────────────────────────────────── */

const HOOKS: HookDef[] = [
  /* ── State ── */
  {
    name: 'useBoolean',
    category: 'State',
    description: 'Boolean state with named semantic setters.',
    signature: '(initial?: boolean) => { value, on, off, toggle, set }',
    params: [{ name: 'initial', type: 'boolean', description: 'Starting value. Defaults to false.' }],
    returns: '{ value: boolean, on: () => void, off: () => void, toggle: () => void, set: Dispatch }',
    demo: UseBooleanDemo,
    code: `import { useBoolean } from '@structyl/hooks';

function Demo() {
  const { value, on, off, toggle } = useBoolean(false);
  return (
    <>
      <p>Value: {String(value)}</p>
      <button onClick={on}>On</button>
      <button onClick={off}>Off</button>
      <button onClick={toggle}>Toggle</button>
    </>
  );
}`,
  },
  {
    name: 'useToggle',
    category: 'State',
    description: 'Boolean state with a single toggle function.',
    signature: '(initial?: boolean) => [boolean, toggle, setValue]',
    params: [{ name: 'initial', type: 'boolean', description: 'Starting value. Defaults to false.' }],
    returns: '[value: boolean, toggle: () => void, setValue: (v: boolean) => void]',
    demo: UseToggleDemo,
    code: `import { useToggle } from '@structyl/hooks';

function Demo() {
  const [value, toggle] = useToggle(false);
  return <button onClick={toggle}>{value ? 'On' : 'Off'}</button>;
}`,
  },
  {
    name: 'useCounter',
    category: 'State',
    description: 'Numeric counter with increment, decrement, and reset.',
    signature: '(initial?: number) => { count, increment, decrement, reset, set }',
    params: [{ name: 'initial', type: 'number', description: 'Starting count. Defaults to 0.' }],
    returns: '{ count: number, increment: (by?: number) => void, decrement: (by?: number) => void, reset: () => void, set: Dispatch }',
    demo: UseCounterDemo,
    code: `import { useCounter } from '@structyl/hooks';

function Demo() {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <>
      <p>{count}</p>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => increment(10)}>+10</button>
      <button onClick={() => decrement()}>-1</button>
      <button onClick={reset}>reset</button>
    </>
  );
}`,
  },
  {
    name: 'usePrevious',
    category: 'State',
    description: 'Returns the value from the previous render cycle.',
    signature: '<T>(value: T) => T | undefined',
    params: [{ name: 'value', type: 'T', description: 'The value to track.' }],
    returns: 'T | undefined — undefined on the first render.',
    demo: UsePreviousDemo,
    code: `import { usePrevious } from '@structyl/hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <p>
      Previous: {previous} → Current: {count}
    </p>
  );
}`,
  },
  /* ── Browser ── */
  {
    name: 'useDebounce',
    category: 'Performance',
    description: 'Delays updating a value until after a quiet period. Ideal for search inputs.',
    signature: '<T>(value: T, delay?: number) => T',
    params: [
      { name: 'value', type: 'T', description: 'The rapidly changing value to debounce.' },
      { name: 'delay', type: 'number', description: 'Milliseconds to wait. Defaults to 300.' },
    ],
    returns: 'T — the debounced value.',
    demo: UseDebounceDemo,
    code: `import { useDebounce } from '@structyl/hooks';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`,
  },
  {
    name: 'useThrottle',
    category: 'Performance',
    description: 'Limits how often a value updates to at most once per interval.',
    signature: '<T>(value: T, delay?: number) => T',
    params: [
      { name: 'value', type: 'T', description: 'The rapidly changing value to throttle.' },
      { name: 'delay', type: 'number', description: 'Minimum ms between updates. Defaults to 300.' },
    ],
    returns: 'T — the throttled value.',
    demo: UseThrottleDemo,
    code: `import { useThrottle } from '@structyl/hooks';

function Scroller() {
  const [scrollY, setScrollY] = useState(0);
  const throttledY = useThrottle(scrollY, 100);

  useEventListener('scroll', () => setScrollY(window.scrollY), window);

  return <p>Throttled scroll: {throttledY}px</p>;
}`,
  },
  {
    name: 'useLocalStorage',
    category: 'Browser',
    description: 'State that persists in localStorage and syncs across tabs.',
    signature: '<T>(key: string, initial: T) => [T, setValue, remove]',
    params: [
      { name: 'key', type: 'string', description: 'The localStorage key.' },
      { name: 'initial', type: 'T', description: 'Fallback value when the key is absent.' },
    ],
    returns: '[value: T, setValue: (v: T | ((prev: T) => T)) => void, remove: () => void]',
    demo: UseLocalStorageDemo,
    code: `import { useLocalStorage } from '@structyl/hooks';

function Settings() {
  const [theme, setTheme, clear] = useLocalStorage('theme', 'light');

  return (
    <>
      <p>Saved theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={clear}>Clear</button>
    </>
  );
}`,
  },
  {
    name: 'useCopyToClipboard',
    category: 'Browser',
    description: 'Copies text to the clipboard with a timed copied state.',
    signature: '() => { copy, copied, reset }',
    params: [],
    returns: '{ copy: (text: string) => Promise<boolean>, copied: boolean, reset: () => void }',
    demo: UseCopyToClipboardDemo,
    code: `import { useCopyToClipboard } from '@structyl/hooks';

function CopyButton({ text }: { text: string }) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <button onClick={() => copy(text)}>
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
}`,
  },
  {
    name: 'useMediaQuery',
    category: 'Browser',
    description: 'Tracks any CSS media query. SSR-safe with a default value.',
    signature: '(query: string, defaultValue?: boolean) => boolean',
    params: [
      { name: 'query', type: 'string', description: 'A valid CSS media query string.' },
      { name: 'defaultValue', type: 'boolean', description: 'Returned during SSR. Defaults to false.' },
    ],
    returns: 'boolean — whether the query currently matches.',
    demo: UseMediaQueryDemo,
    code: `import { useMediaQuery } from '@structyl/hooks';

function Layout() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return isMobile ? <MobileNav /> : <DesktopNav />;
}`,
  },
  {
    name: 'useDarkMode',
    category: 'Browser',
    description: 'Returns true when the user prefers a dark color scheme.',
    signature: '() => boolean',
    params: [],
    returns: 'boolean — true when prefers-color-scheme: dark.',
    demo: UseDarkModeDemo,
    code: `import { useDarkMode } from '@structyl/hooks';

function ThemeIcon() {
  const isDark = useDarkMode();
  return <span>{isDark ? '🌙' : '☀️'}</span>;
}`,
  },
  {
    name: 'useWindowSize',
    category: 'Browser',
    description: 'Tracks the browser viewport dimensions. SSR-safe.',
    signature: '() => { width: number, height: number }',
    params: [],
    returns: '{ width: number, height: number }',
    demo: UseWindowSizeDemo,
    code: `import { useWindowSize } from '@structyl/hooks';

function Responsive() {
  const { width, height } = useWindowSize();

  return (
    <p>{width} × {height}px</p>
  );
}`,
  },
  /* ── DOM ── */
  {
    name: 'useClickOutside',
    category: 'DOM',
    description: 'Fires a handler when a pointer event lands outside the referenced element.',
    signature: '<T extends HTMLElement>(ref, handler, enabled?) => void',
    params: [
      { name: 'ref', type: 'RefObject<T>', description: 'Ref attached to the element to watch.' },
      { name: 'handler', type: '(e: MouseEvent | TouchEvent) => void', description: 'Callback fired on outside click.' },
      { name: 'enabled', type: 'boolean', description: 'Whether to listen. Defaults to true.' },
    ],
    returns: 'void',
    demo: UseClickOutsideDemo,
    code: `import { useClickOutside } from '@structyl/hooks';

function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && <Menu />}
    </div>
  );
}`,
  },
  /* ── Keyboard ── */
  {
    name: 'useHotkeys',
    category: 'Keyboard',
    description: 'Binds keyboard shortcut combinations. Supports Ctrl, Meta, Shift, Alt, and Mod (cross-platform).',
    signature: '(keys: string, handler, options?) => void',
    params: [
      { name: 'keys', type: 'string', description: 'Combo string, e.g. "mod+k" or "ctrl+shift+s".' },
      { name: 'handler', type: '(e: KeyboardEvent) => void', description: 'Called when the combo matches.' },
      { name: 'options.enableOnFormTags', type: 'boolean', description: 'Allow firing inside inputs. Defaults to false.' },
      { name: 'options.preventDefault', type: 'boolean', description: 'Prevent default browser action. Defaults to true.' },
    ],
    returns: 'void',
    demo: UseHotkeysDemo,
    code: `import { useHotkeys } from '@structyl/hooks';

function CommandPalette() {
  const [open, setOpen] = useState(false);

  useHotkeys('mod+k', () => setOpen(true));
  useHotkeys('escape', () => setOpen(false));

  return open ? <Palette /> : null;
}`,
  },
  /* ── Lifecycle ── */
  {
    name: 'useMount',
    category: 'Lifecycle',
    description: 'Runs a callback exactly once when the component mounts.',
    signature: '(callback: () => void) => void',
    params: [{ name: 'callback', type: '() => void', description: 'Function to run on mount.' }],
    returns: 'void',
    demo: UseMountDemo,
    code: `import { useMount } from '@structyl/hooks';

function Analytics() {
  useMount(() => {
    trackPageView(window.location.pathname);
  });

  return null;
}`,
  },
  {
    name: 'useUnmount',
    category: 'Lifecycle',
    description: 'Runs a callback when the component unmounts. Uses a stable ref to avoid stale closures.',
    signature: '(callback: () => void) => void',
    params: [{ name: 'callback', type: '() => void', description: 'Cleanup function to run on unmount.' }],
    returns: 'void',
    demo: UseUnmountDemo,
    code: `import { useUnmount } from '@structyl/hooks';

function Timer() {
  const intervalRef = useRef<number>();

  useMount(() => {
    intervalRef.current = setInterval(tick, 1000);
  });

  useUnmount(() => {
    clearInterval(intervalRef.current);
  });
}`,
  },
  {
    name: 'useUpdateEffect',
    category: 'Lifecycle',
    description: 'Identical to useEffect but skips the initial run on mount — only fires on subsequent renders.',
    signature: '(effect: EffectCallback, deps?: DependencyList) => void',
    params: [
      { name: 'effect', type: 'EffectCallback', description: 'Effect to run on updates.' },
      { name: 'deps', type: 'DependencyList', description: 'Dependency array, same as useEffect.' },
    ],
    returns: 'void',
    demo: UseUpdateEffectDemo,
    code: `import { useUpdateEffect } from '@structyl/hooks';

function SearchResults({ query }: { query: string }) {
  useUpdateEffect(() => {
    // Only runs when query changes, NOT on initial mount
    fetchResults(query);
  }, [query]);
}`,
  },
  /* ── Utility ── */
  {
    name: 'useId',
    category: 'Utility',
    description: 'Generates a stable unique ID. SSR-safe wrapper around React.useId with optional prefix.',
    signature: '(prefix?: string) => string',
    params: [{ name: 'prefix', type: 'string', description: 'Optional string prepended to the ID.' }],
    returns: 'string — a stable, unique ID.',
    demo: UseIdDemo,
    code: `import { useId } from '@structyl/hooks';

function FormField({ label }: { label: string }) {
  const id = useId('field');

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}`,
  },
];

const CATEGORIES = [...new Set(HOOKS.map((h) => h.category))];

/* ─────────────────────────────────────────────────────────────────────────────
   Code block with copy
───────────────────────────────────────────────────────────────────────────── */

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* unavailable */ }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/20 px-3 py-1.5">
        <span className="font-mono text-[11px] text-muted-foreground">tsx</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-fg"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-muted/10 p-4 font-mono text-[12px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hook detail panel
───────────────────────────────────────────────────────────────────────────── */

function HookCard({ hook }: { hook: HookDef }) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  const Demo = hook.demo;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg">
      {/* Header */}
      <div className="border-b border-border/60 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-base font-semibold">{hook.name}</h2>
              <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                {hook.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{hook.description}</p>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto rounded-lg border border-border/50 bg-muted/20 px-3 py-2">
          <code className="font-mono text-[12px] text-fg whitespace-nowrap">{hook.signature}</code>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/60">
        {(['preview', 'code'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${
              tab === t
                ? 'border-b-2 border-primary text-fg'
                : 'text-muted-foreground hover:text-fg'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'preview' ? (
        <div className="flex min-h-[160px] items-center justify-center p-8">
          <Demo />
        </div>
      ) : (
        <div className="p-4">
          <CodeBlock code={hook.code} />
        </div>
      )}

      {/* API table */}
      {hook.params.length > 0 && (
        <div className="border-t border-border/60 px-5 py-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Parameters
          </p>
          <div className="overflow-hidden rounded-lg border border-border text-xs">
            {hook.params.map((p, i) => (
              <div
                key={p.name}
                className={`grid grid-cols-[auto_1fr] gap-x-4 px-3 py-2 ${
                  i !== 0 ? 'border-t border-border/50' : ''
                }`}
              >
                <code className="font-mono text-primary">{p.name}</code>
                <span className="text-muted-foreground">{p.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Returns */}
      <div className="border-t border-border/60 bg-muted/10 px-5 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Returns{' '}
        </span>
        <code className="ml-1 font-mono text-[11px] text-fg">{hook.returns}</code>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */

export default function HooksPage() {
  const { resolvedMode, setMode } = useTheme();
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(
    () =>
      HOOKS.filter(
        (h) =>
          (activeCategory === 'All' || h.category === activeCategory) &&
          h.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [activeCategory, query],
  );

  return (
    <div className="bg-bg text-fg min-h-screen">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-border/60 bg-bg/70 backdrop-blur-glass sticky top-0 z-40 border-b">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="from-primary to-primary/70 text-primary-foreground flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">structyl</span>
          </Link>
          <span className="text-muted-foreground text-sm">/ Hooks</span>
          <nav className="ml-4 hidden gap-5 text-sm md:flex">
            <Link href="/docs" className="text-muted-foreground hover:text-fg transition-colors">
              Documentation
            </Link>
            <Link href="/themes" className="text-muted-foreground hover:text-fg transition-colors">
              Themes
            </Link>
            <Link href="/icons" className="text-muted-foreground hover:text-fg transition-colors">
              Icons
            </Link>
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

      <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-[220px_1fr]">
        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border/60 px-4 py-6 md:block">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Categories
          </p>
          <div className="space-y-0.5">
            {['All', ...CATEGORIES].map((cat) => {
              const count = cat === 'All' ? HOOKS.length : HOOKS.filter((h) => h.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                    isActive
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-fg'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && <ChevronRight className="h-3 w-3 text-primary" />}
                    {cat}
                  </span>
                  <span className={`rounded-full px-1.5 text-[10px] tabular-nums ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-muted/20 p-3 text-[11px] text-muted-foreground">
            <p className="font-semibold text-fg">@structyl/hooks</p>
            <p className="mt-0.5">Zero deps · SSR-safe · Fully typed</p>
            <code className="mt-2 block rounded bg-muted px-2 py-1 font-mono">
              pnpm add @structyl/hooks
            </code>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────────────── */}
        <main className="min-w-0 px-6 py-10 md:px-10">
          {/* Title */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">@structyl/hooks</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Hooks</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {HOOKS.length} reusable, SSR-safe, tree-shakeable React hooks. Zero dependencies.
              Import only what you use.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${HOOKS.length} hooks…`}
              className="h-9 w-full rounded-lg border border-border bg-bg pl-3 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-fg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category chips (mobile) */}
          <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1 md:hidden">
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <p className="text-sm font-medium">No hooks found</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => { setQuery(''); setActiveCategory('All'); }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((hook) => (
                <HookCard key={hook.name} hook={hook} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
