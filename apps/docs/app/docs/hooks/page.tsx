'use client';

import * as React from 'react';
import { Copy, Check, Search, X } from '@structyl/icons';
import { Box, Button, Input, Typography } from '@structyl/styled';
import { CodeBlock } from '../../../components/code-block';
import {
  useBoolean, useToggle, useCounter, usePrevious,
  useDebounce, useThrottle, useLocalStorage, useCopyToClipboard,
  useMediaQuery, useDarkMode, useWindowSize, useClickOutside,
  useHotkeys, useMount, useUnmount, useUpdateEffect, useId,
  useControllableState, useComposedRefs, useCallbackRef, useLatest,
  useEventListener, useKeyPress, useIsomorphicLayoutEffect,
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
   Demo components
───────────────────────────────────────────────────────────────────────────── */

function UseBooleanDemo() {
  const { value, on, off, toggle } = useBoolean(false);
  return (
    <Box className="flex flex-col items-center gap-5">
      <Box className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xs font-bold tracking-widest transition-all duration-200 ${value ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-muted text-muted-foreground'}`}>
        {value ? 'ON' : 'OFF'}
      </Box>
      <Box className="flex gap-2">
        <DemoBtn variant="ghost" onClick={on}>on()</DemoBtn>
        <DemoBtn variant="ghost" onClick={off}>off()</DemoBtn>
        <DemoBtn onClick={toggle}>toggle()</DemoBtn>
      </Box>
    </Box>
  );
}

function UseToggleDemo() {
  const [value, toggle] = useToggle(false);
  return (
    <Box className="flex flex-col items-center gap-4">
      <Button
        variant="ghost"
        onClick={toggle}
        className={`relative h-8 w-14 rounded-full border-2 transition-all duration-200 ${value ? 'border-primary bg-primary' : 'border-border bg-muted'}`}
        role="switch"
        aria-checked={value}
      >
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-bg shadow transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-0'}`} />
      </Button>
      <Code>value: {String(value)}</Code>
    </Box>
  );
}

function UseCounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <Box className="flex flex-col items-center gap-5">
      <Box className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/30 font-mono text-3xl font-bold tabular-nums">
        {count}
      </Box>
      <Box className="flex gap-2">
        <DemoBtn variant="ghost" onClick={() => decrement()}>−1</DemoBtn>
        <DemoBtn variant="ghost" onClick={reset}>reset</DemoBtn>
        <DemoBtn onClick={() => increment()}>+1</DemoBtn>
      </Box>
      <Button variant="ghost" onClick={() => increment(10)} className="text-[11px] text-muted-foreground transition-colors hover:text-fg">
        increment(10)
      </Button>
    </Box>
  );
}

function UsePreviousDemo() {
  const { count, increment, decrement } = useCounter(0);
  const prev = usePrevious(count);
  return (
    <Box className="flex flex-col items-center gap-5">
      <Box className="grid grid-cols-2 gap-3 text-center">
        <Box className="rounded-xl border border-border bg-muted/20 px-5 py-3">
          <Typography as="p" variant="body2" className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">Previous</Typography>
          <Typography as="p" variant="body2" className="font-mono text-2xl font-bold text-muted-foreground">{prev ?? '—'}</Typography>
        </Box>
        <Box className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-3">
          <Typography as="p" variant="body2" className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">Current</Typography>
          <Typography as="p" variant="body2" className="font-mono text-2xl font-bold">{count}</Typography>
        </Box>
      </Box>
      <Box className="flex gap-2">
        <DemoBtn variant="ghost" onClick={() => decrement()}>−1</DemoBtn>
        <DemoBtn onClick={() => increment()}>+1</DemoBtn>
      </Box>
    </Box>
  );
}

function UseDebounceDemo() {
  const [input, setInput] = React.useState('');
  const debounced = useDebounce(input, 500);
  return (
    <Box className="w-full max-w-xs space-y-3">
      <DemoInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type quickly…" />
      <Box className="space-y-1.5 rounded-xl border border-border bg-muted/10 p-3 font-mono text-xs">
        <Row label="raw" value={input || '""'} />
        <Row label="debounced (500ms)" value={debounced || '""'} accent />
      </Box>
    </Box>
  );
}

function UseThrottleDemo() {
  const [raw, setRaw] = React.useState(50);
  const throttled = useThrottle(raw, 400);
  return (
    <Box className="w-full max-w-xs space-y-4">
      <input type="range" min={0} max={100} value={raw} onChange={(e) => setRaw(Number(e.target.value))} className="w-full accent-primary" />
      <Box className="space-y-1.5 rounded-xl border border-border bg-muted/10 p-3 font-mono text-xs">
        <Row label="raw" value={String(raw)} />
        <Row label="throttled (400ms)" value={String(throttled)} accent />
      </Box>
    </Box>
  );
}

function UseLocalStorageDemo() {
  const [name, setName, remove] = useLocalStorage('structyl-hooks-demo', '');
  return (
    <Box className="w-full max-w-xs space-y-3">
      <DemoInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Type — it persists on refresh" />
      <Box className="flex items-center gap-2">
        <Code className="flex-1 truncate">&quot;structyl-hooks-demo&quot;: {name ? `"${name}"` : 'null'}</Code>
        <Button variant="ghost" onClick={remove} className="shrink-0 rounded-lg border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-fg">clear</Button>
      </Box>
    </Box>
  );
}

function UseCopyToClipboardDemo() {
  const { copy, copied } = useCopyToClipboard();
  const text = `import { useCopyToClipboard } from '@structyl/hooks';`;
  return (
    <Box className="w-full max-w-sm space-y-3">
      <Code className="truncate text-[10px]">{text}</Code>
      <Button onClick={() => copy(text)} className="w-full gap-2">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
      </Button>
    </Box>
  );
}

function UseMediaQueryDemo() {
  const sm  = useMediaQuery('(min-width: 640px)');
  const md  = useMediaQuery('(min-width: 768px)');
  const lg  = useMediaQuery('(min-width: 1024px)');
  const rm  = useMediaQuery('(prefers-reduced-motion: reduce)');
  return (
    <Box className="w-full max-w-xs space-y-1.5">
      {([['sm ≥640px', sm], ['md ≥768px', md], ['lg ≥1024px', lg], ['reduced-motion', rm]] as [string, boolean][]).map(([label, match]) => (
        <Box key={label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <Code>{label}</Code>
          <Badge active={match}>{match ? 'true' : 'false'}</Badge>
        </Box>
      ))}
    </Box>
  );
}

function UseDarkModeDemo() {
  const dark = useDarkMode();
  return (
    <Box className="flex flex-col items-center gap-3">
      <Box className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-colors ${dark ? 'bg-slate-800' : 'bg-amber-50 border border-amber-200'}`}>
        {dark ? '🌙' : '☀️'}
      </Box>
      <Code>isDark: {String(dark)}</Code>
      <Typography as="p" variant="body2" className="text-center text-[11px] text-muted-foreground">Change your OS color scheme to update</Typography>
    </Box>
  );
}

function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();
  return (
    <Box className="flex flex-col items-center gap-4">
      <Box className="grid grid-cols-2 gap-3">
        {[['Width', width], ['Height', height]].map(([label, val]) => (
          <Box key={String(label)} className="rounded-xl border border-border bg-muted/20 px-6 py-4 text-center">
            <Typography as="p" variant="body2" className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</Typography>
            <Typography as="p" variant="body2" className="font-mono text-2xl font-bold tabular-nums">{val}</Typography>
            <Typography as="p" variant="body2" className="text-[10px] text-muted-foreground">px</Typography>
          </Box>
        ))}
      </Box>
      <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">Resize the window to see it update</Typography>
    </Box>
  );
}

function UseClickOutsideDemo() {
  const [active, setActive] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => { if (active) setClicks((c) => c + 1); });
  return (
    <Box className="flex flex-col items-center gap-4">
      <Button size="sm" variant={active ? 'default' : 'outline'} onClick={() => setActive((v) => !v)}>
        {active ? 'Watching…' : 'Start watching'}
      </Button>
      {active && (
        <Box ref={ref} className="flex h-24 w-48 items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 text-sm text-muted-foreground">
          Click outside me
        </Box>
      )}
      {clicks > 0 && <Code>outside clicks: <span className="text-primary">{clicks}</span></Code>}
    </Box>
  );
}

function UseHotkeysDemo() {
  const [log, setLog] = React.useState<string[]>([]);
  const push = React.useCallback((msg: string) => {
    setLog((p) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...p].slice(0, 5));
  }, []);
  useHotkeys('shift+a', () => push('Shift + A'));
  useHotkeys('ctrl+k', () => push('Ctrl + K'));
  useHotkeys('mod+shift+p', () => push('Mod + Shift + P'));
  return (
    <Box className="w-full max-w-xs space-y-3">
      <Box className="flex flex-wrap gap-1.5">
        {['Shift + A', 'Ctrl + K', 'Mod + Shift + P'].map((k) => (
          <kbd key={k} className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px]">{k}</kbd>
        ))}
      </Box>
      <Box className="min-h-[72px] rounded-xl border border-border bg-muted/10 p-3">
        {log.length === 0
          ? <Typography as="p" variant="body2" className="text-[11px] italic text-muted-foreground">Press a combo above…</Typography>
          : log.map((e, i) => (
              <Typography as="p" variant="body2" key={i} className={`font-mono text-[11px] ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>{e}</Typography>
            ))
        }
      </Box>
    </Box>
  );
}

function UseMountDemo() {
  const [mounted, setMounted] = React.useState(false);
  const [time, setTime] = React.useState<string | null>(null);
  function Inner() {
    useMount(() => setTime(new Date().toLocaleTimeString()));
    return <Code>mounted at {time}</Code>;
  }
  return (
    <Box className="flex flex-col items-center gap-3">
      <Button size="sm" variant={mounted ? 'outline' : 'default'} onClick={() => setMounted((v) => !v)}>
        {mounted ? 'Unmount' : 'Mount'} component
      </Button>
      {mounted && <Inner />}
    </Box>
  );
}

function UseUnmountDemo() {
  const [show, setShow] = React.useState(false);
  const [last, setLast] = React.useState<string | null>(null);
  function Child() {
    useUnmount(() => setLast(new Date().toLocaleTimeString()));
    return <Box className="rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">Mounted — press Unmount</Box>;
  }
  return (
    <Box className="flex flex-col items-center gap-3">
      <Button size="sm" onClick={() => setShow((v) => !v)} variant={show ? 'outline' : 'default'}>
        {show ? 'Unmount' : 'Mount'} component
      </Button>
      {show && <Child />}
      {last && <Code>last unmount: <span className="text-primary">{last}</span></Code>}
    </Box>
  );
}

function UseUpdateEffectDemo() {
  const [input, setInput] = React.useState('');
  const [count, setCount] = React.useState(0);
  useUpdateEffect(() => { setCount((c) => c + 1); }, [input]);
  return (
    <Box className="w-full max-w-xs space-y-3">
      <DemoInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type to trigger updates…" />
      <Box className="flex items-center justify-between rounded-xl border border-border bg-muted/10 px-4 py-2.5">
        <span className="text-[12px] text-muted-foreground">Updates fired (mount skipped)</span>
        <span className="font-mono font-bold text-primary">{count}</span>
      </Box>
    </Box>
  );
}

function UseIdDemo() {
  const a = useId('input');
  const b = useId('label');
  const c = useId();
  return (
    <Box className="w-full max-w-xs space-y-2">
      {[['useId("input")', a], ['useId("label")', b], ['useId()', c]].map(([label, val]) => (
        <Box key={String(label)} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
          <Code>{label}</Code>
          <span className="font-mono text-[11px] text-primary">{val}</span>
        </Box>
      ))}
      <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">Stable across re-renders · SSR-safe</Typography>
    </Box>
  );
}

function UseControllableStateDemo() {
  const [controlled, setControlled] = React.useState(false);
  const [external, setExternal] = React.useState('Hello');
  const [val, setVal] = useControllableState<string>({
    prop: controlled ? external : undefined,
    defaultProp: 'uncontrolled',
    onChange: setExternal,
  });
  return (
    <Box className="flex w-full max-w-xs flex-col gap-4">
      <Box className="flex items-center gap-2 text-[11px]">
        <span className={`rounded-full px-2 py-0.5 font-semibold ${!controlled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Uncontrolled</span>
        <span className="text-muted-foreground">vs</span>
        <span className={`rounded-full px-2 py-0.5 font-semibold ${controlled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Controlled</span>
        <Button variant="ghost" onClick={() => setControlled(c => !c)} className="ml-auto text-[10px] text-primary hover:underline underline-offset-2">Switch</Button>
      </Box>
      <DemoInput value={val ?? ''} onChange={e => setVal(e.target.value)} placeholder="Type something…" />
      <Code>value = &quot;{val}&quot;</Code>
    </Box>
  );
}

function UseComposedRefsDemo() {
  const ref1 = React.useRef<HTMLDivElement>(null);
  const ref2 = React.useRef<HTMLDivElement>(null);
  const composed = useComposedRefs(ref1, ref2);
  const [clicks, setClicks] = React.useState(0);
  return (
    <Box className="flex w-full max-w-xs flex-col items-center gap-4">
      <Box
        ref={composed}
        onClick={() => setClicks(c => c + 1)}
        className="w-full cursor-pointer rounded-xl border-2 border-dashed border-border bg-muted/20 px-4 py-5 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50"
      >
        Click me — two refs composed here
      </Box>
      <Box className="w-full space-y-1">
        <Code>ref1 attached: {String(ref1.current !== null)}</Code>
        <Code>ref2 attached: {String(ref2.current !== null)}</Code>
        <Code>Same node: {String(ref1.current === ref2.current)} · clicks: {clicks}</Code>
      </Box>
    </Box>
  );
}

function UseCallbackRefDemo() {
  const [count, setCount] = React.useState(0);
  const [log, setLog] = React.useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stableLog = useCallbackRef((): any => {
    setLog(prev => [`count was ${count}`, ...prev].slice(0, 3));
  });
  return (
    <Box className="flex w-full max-w-xs flex-col gap-3">
      <Box className="flex items-center gap-2">
        <DemoBtn onClick={() => setCount(c => c + 1)}>Increment ({count})</DemoBtn>
        <DemoBtn onClick={() => stableLog()} variant="ghost">Log count</DemoBtn>
      </Box>
      {log.length === 0
        ? <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">Increment then log — always sees the latest count</Typography>
        : <Box className="space-y-1">{log.map((l, i) => <Code key={i}>{l}</Code>)}</Box>}
    </Box>
  );
}

function UseLatestDemo() {
  const [count, setCount] = React.useState(0);
  const [msg, setMsg] = React.useState('Press "Read ref" to see the latest value');
  const latestCount = useLatest(count);
  return (
    <Box className="flex flex-col items-center gap-4">
      <Box className="flex items-center gap-3">
        <DemoBtn onClick={() => setCount(c => c - 1)}>−</DemoBtn>
        <span className="w-10 text-center font-mono text-xl font-semibold">{count}</span>
        <DemoBtn onClick={() => setCount(c => c + 1)}>+</DemoBtn>
      </Box>
      <DemoBtn onClick={() => setMsg(`latestCount.current = ${latestCount.current}`)} variant="ghost">
        Read ref
      </DemoBtn>
      <Code>{msg}</Code>
    </Box>
  );
}

function UseEventListenerDemo() {
  const [keys, setKeys] = React.useState<string[]>([]);
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
      setKeys(prev => [e.key.toUpperCase(), ...prev].slice(0, 6));
    }
  });
  return (
    <Box className="flex flex-col items-center gap-4">
      <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">Press any letter key on your keyboard</Typography>
      <Box className="flex min-h-[36px] flex-wrap justify-center gap-1.5">
        {keys.length === 0
          ? <Code>waiting…</Code>
          : keys.map((k, i) => (
            <kbd key={i} className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-sm font-semibold">{k}</kbd>
          ))}
      </Box>
    </Box>
  );
}

function UseKeyPressDemo() {
  const [count, setCount] = React.useState(0);
  const [flash, setFlash] = React.useState<'up' | 'down' | null>(null);
  const trigger = (dir: 'up' | 'down') => {
    setCount(c => dir === 'up' ? c + 1 : c - 1);
    setFlash(dir);
    setTimeout(() => setFlash(null), 180);
  };
  useKeyPress('ArrowUp', () => trigger('up'));
  useKeyPress('ArrowDown', () => trigger('down'));
  return (
    <Box className="flex flex-col items-center gap-4">
      <Box className={`flex h-20 w-20 items-center justify-center rounded-2xl border-2 font-mono text-3xl font-bold transition-all duration-150 ${
        flash === 'up' ? 'scale-110 border-emerald-400 bg-emerald-400/10 text-emerald-500'
        : flash === 'down' ? 'scale-110 border-red-400 bg-red-400/10 text-red-500'
        : 'border-border text-fg'
      }`}>
        {count}
      </Box>
      <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">Press ↑ or ↓ arrow keys</Typography>
    </Box>
  );
}

function UseIsomorphicLayoutEffectDemo() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setSize({ w: Math.round(width), h: Math.round(height) });
  }, []);
  return (
    <Box className="flex flex-col items-center gap-4">
      <Box ref={ref} className="rounded-xl border border-border bg-muted/30 px-8 py-5 text-sm text-muted-foreground">
        Measured element
      </Box>
      <Code>{size.w} × {size.h}px — read before first paint</Code>
      <Typography as="p" variant="body2" className="text-[11px] text-muted-foreground">useLayoutEffect on client · useEffect on server</Typography>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Small shared demo primitives
───────────────────────────────────────────────────────────────────────────── */

function DemoBtn({ children, onClick, variant = 'default' }: { children: React.ReactNode; onClick?: () => void; variant?: 'default' | 'ghost' }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
        variant === 'ghost'
          ? 'border border-border text-muted-foreground hover:bg-muted hover:text-fg'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      }`}
    >
      {children}
    </Button>
  );
}

// Omit native `size` (number) — the styled Input's `size` is a variant union.
function DemoInput(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>) {
  return (
    <Input
      {...props}
      className="h-9 w-full rounded-xl border border-border/70 bg-muted/20 px-3 text-sm outline-none placeholder:text-muted-foreground/50 focus-visible:border-ring/50 focus-visible:ring-2 focus-visible:ring-ring/20 transition-shadow"
    />
  );
}

function Code({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <code className={`rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1 font-mono text-[11px] text-muted-foreground ${className}`}>{children}</code>;
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <Box className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? 'text-primary' : 'text-fg'}>{value}</span>
    </Box>
  );
}

function Badge({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hook registry
───────────────────────────────────────────────────────────────────────────── */

const HOOKS: HookDef[] = [
  {
    name: 'useBoolean', category: 'State',
    description: 'Boolean state with named semantic setters: on, off, toggle.',
    signature: '(initial?: boolean) => { value, on, off, toggle, set }',
    params: [{ name: 'initial', type: 'boolean', description: 'Starting value. Defaults to false.' }],
    returns: '{ value: boolean, on, off, toggle, set }',
    demo: UseBooleanDemo,
    code: `import { useBoolean } from '@structyl/hooks';\n\nfunction Demo() {\n  const { value, on, off, toggle } = useBoolean(false);\n  return (\n    <>\n      <p>Value: {String(value)}</p>\n      <button onClick={on}>On</button>\n      <button onClick={off}>Off</button>\n      <button onClick={toggle}>Toggle</button>\n    </>\n  );\n}`,
  },
  {
    name: 'useToggle', category: 'State',
    description: 'Boolean state with a single toggle function and optional value setter.',
    signature: '(initial?: boolean) => [boolean, toggle, setValue]',
    params: [{ name: 'initial', type: 'boolean', description: 'Starting value. Defaults to false.' }],
    returns: '[value: boolean, toggle: () => void, setValue: Dispatch<boolean>]',
    demo: UseToggleDemo,
    code: `import { useToggle } from '@structyl/hooks';\n\nfunction Demo() {\n  const [on, toggle] = useToggle(false);\n  return <button onClick={toggle}>{on ? 'On' : 'Off'}</button>;\n}`,
  },
  {
    name: 'useCounter', category: 'State',
    description: 'Numeric counter with increment, decrement, reset, and custom step support.',
    signature: '(initial?: number) => { count, increment, decrement, reset, set }',
    params: [{ name: 'initial', type: 'number', description: 'Starting count. Defaults to 0.' }],
    returns: '{ count: number, increment(by?), decrement(by?), reset, set }',
    demo: UseCounterDemo,
    code: `import { useCounter } from '@structyl/hooks';\n\nfunction Demo() {\n  const { count, increment, decrement, reset } = useCounter(0);\n  return (\n    <>\n      <span>{count}</span>\n      <button onClick={() => increment()}>+1</button>\n      <button onClick={() => increment(10)}>+10</button>\n      <button onClick={() => decrement()}>-1</button>\n      <button onClick={reset}>reset</button>\n    </>\n  );\n}`,
  },
  {
    name: 'usePrevious', category: 'State',
    description: 'Captures the value from the previous render. Useful for comparing changes.',
    signature: '<T>(value: T) => T | undefined',
    params: [{ name: 'value', type: 'T', description: 'The value to track across renders.' }],
    returns: 'T | undefined — undefined on the first render.',
    demo: UsePreviousDemo,
    code: `import { usePrevious } from '@structyl/hooks';\n\nfunction Demo() {\n  const [count, setCount] = useState(0);\n  const previous = usePrevious(count);\n  return <p>Previous: {previous} → Current: {count}</p>;\n}`,
  },
  {
    name: 'useDebounce', category: 'Performance',
    description: 'Delays updating a value until after a quiet period. Ideal for search inputs and API calls.',
    signature: '<T>(value: T, delay?: number) => T',
    params: [
      { name: 'value', type: 'T', description: 'The rapidly changing value.' },
      { name: 'delay', type: 'number', description: 'Quiet period in ms. Defaults to 300.' },
    ],
    returns: 'T — the debounced value.',
    demo: UseDebounceDemo,
    code: `import { useDebounce } from '@structyl/hooks';\n\nfunction Search() {\n  const [query, setQuery] = useState('');\n  const debounced = useDebounce(query, 500);\n\n  useEffect(() => {\n    if (debounced) fetchResults(debounced);\n  }, [debounced]);\n\n  return <input value={query} onChange={e => setQuery(e.target.value)} />;\n}`,
  },
  {
    name: 'useThrottle', category: 'Performance',
    description: 'Limits how often a value updates to at most once per interval.',
    signature: '<T>(value: T, delay?: number) => T',
    params: [
      { name: 'value', type: 'T', description: 'The rapidly changing value.' },
      { name: 'delay', type: 'number', description: 'Minimum ms between updates. Defaults to 300.' },
    ],
    returns: 'T — the throttled value.',
    demo: UseThrottleDemo,
    code: `import { useThrottle } from '@structyl/hooks';\n\nfunction Scroller() {\n  const [y, setY] = useState(0);\n  const throttledY = useThrottle(y, 100);\n  // ...\n  return <p>Scroll: {throttledY}px</p>;\n}`,
  },
  {
    name: 'useLocalStorage', category: 'Browser',
    description: 'State that persists in localStorage and syncs across browser tabs automatically.',
    signature: '<T>(key: string, initial: T) => [T, setValue, remove]',
    params: [
      { name: 'key', type: 'string', description: 'The localStorage key.' },
      { name: 'initial', type: 'T', description: 'Fallback when key is absent.' },
    ],
    returns: '[value: T, setValue, remove: () => void]',
    demo: UseLocalStorageDemo,
    code: `import { useLocalStorage } from '@structyl/hooks';\n\nfunction Settings() {\n  const [theme, setTheme, clear] = useLocalStorage('theme', 'light');\n  return (\n    <>\n      <p>Theme: {theme}</p>\n      <button onClick={() => setTheme('dark')}>Dark</button>\n      <button onClick={clear}>Clear</button>\n    </>\n  );\n}`,
  },
  {
    name: 'useCopyToClipboard', category: 'Browser',
    description: 'Copies text to the clipboard. Returns a timed copied state that auto-resets after 2s.',
    signature: '() => { copy, copied, reset }',
    params: [],
    returns: '{ copy: (text) => Promise<boolean>, copied: boolean, reset: () => void }',
    demo: UseCopyToClipboardDemo,
    code: `import { useCopyToClipboard } from '@structyl/hooks';\n\nfunction CopyBtn({ text }) {\n  const { copy, copied } = useCopyToClipboard();\n  return (\n    <button onClick={() => copy(text)}>\n      {copied ? '✓ Copied!' : 'Copy'}\n    </button>\n  );\n}`,
  },
  {
    name: 'useMediaQuery', category: 'Browser',
    description: 'Tracks any CSS media query and returns a boolean. SSR-safe with a configurable default.',
    signature: '(query: string, defaultValue?: boolean) => boolean',
    params: [
      { name: 'query', type: 'string', description: 'A valid CSS media query.' },
      { name: 'defaultValue', type: 'boolean', description: 'Value returned during SSR. Defaults to false.' },
    ],
    returns: 'boolean',
    demo: UseMediaQueryDemo,
    code: `import { useMediaQuery } from '@structyl/hooks';\n\nfunction Layout() {\n  const isMobile = useMediaQuery('(max-width: 767px)');\n  return isMobile ? <MobileNav /> : <DesktopNav />;\n}`,
  },
  {
    name: 'useDarkMode', category: 'Browser',
    description: 'Returns true when the system prefers a dark color scheme.',
    signature: '() => boolean',
    params: [],
    returns: 'boolean',
    demo: UseDarkModeDemo,
    code: `import { useDarkMode } from '@structyl/hooks';\n\nfunction Icon() {\n  const dark = useDarkMode();\n  return <span>{dark ? '🌙' : '☀️'}</span>;\n}`,
  },
  {
    name: 'useWindowSize', category: 'Browser',
    description: 'Tracks the live viewport dimensions. SSR-safe (defaults to 0 × 0).',
    signature: '() => { width: number, height: number }',
    params: [],
    returns: '{ width: number, height: number }',
    demo: UseWindowSizeDemo,
    code: `import { useWindowSize } from '@structyl/hooks';\n\nfunction Viewport() {\n  const { width, height } = useWindowSize();\n  return <p>{width} × {height}px</p>;\n}`,
  },
  {
    name: 'useClickOutside', category: 'DOM',
    description: 'Fires a callback when a pointer event lands outside the referenced element. Listens to mousedown and touchstart.',
    signature: '<T extends HTMLElement>(ref, handler, enabled?) => void',
    params: [
      { name: 'ref', type: 'RefObject<T>', description: 'Ref attached to the element to watch.' },
      { name: 'handler', type: '(e: MouseEvent | TouchEvent) => void', description: 'Called on outside click.' },
      { name: 'enabled', type: 'boolean', description: 'Whether to listen. Defaults to true.' },
    ],
    returns: 'void',
    demo: UseClickOutsideDemo,
    code: `import { useClickOutside } from '@structyl/hooks';\n\nfunction Dropdown() {\n  const [open, setOpen] = useState(false);\n  const ref = useRef<HTMLDivElement>(null);\n  useClickOutside(ref, () => setOpen(false));\n\n  return (\n    <div ref={ref}>\n      <button onClick={() => setOpen(true)}>Open</button>\n      {open && <Menu />}\n    </div>\n  );\n}`,
  },
  {
    name: 'useHotkeys', category: 'Keyboard',
    description: 'Binds keyboard shortcut combinations. Supports mod (Ctrl on Windows, Cmd on Mac), shift, alt.',
    signature: '(keys: string, handler, options?) => void',
    params: [
      { name: 'keys', type: 'string', description: 'Combo string, e.g. "mod+k" or "ctrl+shift+s".' },
      { name: 'handler', type: '(e: KeyboardEvent) => void', description: 'Called when the combo fires.' },
      { name: 'options.enableOnFormTags', type: 'boolean', description: 'Allow firing in inputs. Default false.' },
      { name: 'options.preventDefault', type: 'boolean', description: 'Prevent default action. Default true.' },
    ],
    returns: 'void',
    demo: UseHotkeysDemo,
    code: `import { useHotkeys } from '@structyl/hooks';\n\nfunction CommandPalette() {\n  const [open, setOpen] = useState(false);\n  useHotkeys('mod+k', () => setOpen(true));\n  useHotkeys('escape', () => setOpen(false));\n  return open ? <Palette /> : null;\n}`,
  },
  {
    name: 'useMount', category: 'Lifecycle',
    description: 'Runs a callback exactly once when the component mounts.',
    signature: '(callback: () => void) => void',
    params: [{ name: 'callback', type: '() => void', description: 'Function to run on mount.' }],
    returns: 'void',
    demo: UseMountDemo,
    code: `import { useMount } from '@structyl/hooks';\n\nfunction Page() {\n  useMount(() => {\n    trackPageView(window.location.pathname);\n  });\n  return <div>...</div>;\n}`,
  },
  {
    name: 'useUnmount', category: 'Lifecycle',
    description: 'Runs a callback on unmount. Uses a stable ref internally — safe to pass fresh closures.',
    signature: '(callback: () => void) => void',
    params: [{ name: 'callback', type: '() => void', description: 'Cleanup function.' }],
    returns: 'void',
    demo: UseUnmountDemo,
    code: `import { useMount, useUnmount } from '@structyl/hooks';\n\nfunction Timer() {\n  const id = useRef<number>();\n  useMount(() => { id.current = setInterval(tick, 1000); });\n  useUnmount(() => { clearInterval(id.current); });\n}`,
  },
  {
    name: 'useUpdateEffect', category: 'Lifecycle',
    description: 'Like useEffect but skips the initial mount — only runs on subsequent dependency changes.',
    signature: '(effect: EffectCallback, deps?: DependencyList) => void',
    params: [
      { name: 'effect', type: 'EffectCallback', description: 'Effect to run on updates.' },
      { name: 'deps', type: 'DependencyList', description: 'Dependency array, same as useEffect.' },
    ],
    returns: 'void',
    demo: UseUpdateEffectDemo,
    code: `import { useUpdateEffect } from '@structyl/hooks';\n\nfunction Results({ query }: { query: string }) {\n  useUpdateEffect(() => {\n    // Only runs when query changes — NOT on initial mount\n    fetchResults(query);\n  }, [query]);\n}`,
  },
  {
    name: 'useId', category: 'Utility',
    description: 'Generates a stable unique ID. Thin SSR-safe wrapper around React.useId with optional prefix.',
    signature: '(prefix?: string) => string',
    params: [{ name: 'prefix', type: 'string', description: 'Optional string prepended to the ID.' }],
    returns: 'string — a stable unique ID.',
    demo: UseIdDemo,
    code: `import { useId } from '@structyl/hooks';\n\nfunction Field({ label }: { label: string }) {\n  const id = useId('field');\n  return (\n    <>\n      <label htmlFor={id}>{label}</label>\n      <input id={id} />\n    </>\n  );\n}`,
  },
  {
    name: 'useControllableState', category: 'State',
    description: 'Bridges controlled and uncontrolled state. Lets a component accept an optional value prop without duplicating internal state logic.',
    signature: '<T>({ prop, defaultProp, onChange }) => [T | undefined, setter]',
    params: [
      { name: 'prop', type: 'T | undefined', description: 'External controlled value. Undefined means uncontrolled.' },
      { name: 'defaultProp', type: 'T | undefined', description: 'Initial value for uncontrolled mode.' },
      { name: 'onChange', type: '(value: T) => void', description: 'Called whenever the value changes.' },
    ],
    returns: '[value: T | undefined, setValue]',
    demo: UseControllableStateDemo,
    code: `import { useControllableState } from '@structyl/hooks';\n\nfunction Tabs({ value, defaultValue, onValueChange }) {\n  const [activeTab, setActiveTab] = useControllableState({\n    prop: value,\n    defaultProp: defaultValue,\n    onChange: onValueChange,\n  });\n  return <div>{/* renders tabs */}</div>;\n}`,
  },
  {
    name: 'useComposedRefs', category: 'Utility',
    description: 'Merges multiple refs into a single callback ref. Essential when forwarding an external ref while keeping an internal one.',
    signature: '<T>(...refs: Ref<T>[]) => RefCallback<T>',
    params: [{ name: '...refs', type: 'Ref<T>[]', description: 'Any mix of callback refs and object refs to merge.' }],
    returns: 'RefCallback<T> — assign to the ref prop of any element.',
    demo: UseComposedRefsDemo,
    code: `import { useComposedRefs } from '@structyl/hooks';\n\nconst Input = React.forwardRef<HTMLInputElement>((props, forwardedRef) => {\n  const internalRef = useRef<HTMLInputElement>(null);\n  const composed = useComposedRefs(internalRef, forwardedRef);\n\n  useEffect(() => {\n    internalRef.current?.focus();\n  }, []);\n\n  return <input ref={composed} {...props} />;\n});`,
  },
  {
    name: 'useCallbackRef', category: 'Utility',
    description: 'Returns a stable function identity that always calls the latest version of the callback. Eliminates stale-closure bugs without adding the callback to effect deps.',
    signature: '<T extends Fn>(callback: T | undefined) => T',
    params: [{ name: 'callback', type: 'T | undefined', description: 'The fresh callback to stabilize.' }],
    returns: 'T — a stable reference that never changes identity.',
    demo: UseCallbackRefDemo,
    code: `import { useCallbackRef } from '@structyl/hooks';\n\nfunction Component({ onChange }) {\n  // stableOnChange is always the same reference\n  // but always calls the latest onChange\n  const stableOnChange = useCallbackRef(onChange);\n\n  useEffect(() => {\n    document.addEventListener('click', stableOnChange);\n    return () => document.removeEventListener('click', stableOnChange);\n  }, [stableOnChange]); // deps array never causes re-runs\n}`,
  },
  {
    name: 'useLatest', category: 'Utility',
    description: 'A ref whose .current always holds the latest value. Use inside intervals, timeouts, or event handlers to avoid reading stale closures.',
    signature: '<T>(value: T) => { readonly current: T }',
    params: [{ name: 'value', type: 'T', description: 'The value to keep perpetually current.' }],
    returns: '{ readonly current: T } — a ref that is always up to date.',
    demo: UseLatestDemo,
    code: `import { useLatest } from '@structyl/hooks';\n\nfunction Timer({ onTick }) {\n  const latestOnTick = useLatest(onTick);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      latestOnTick.current(); // always the freshest\n    }, 1000);\n    return () => clearInterval(id);\n  }, []); // empty deps — no stale closure\n}`,
  },
  {
    name: 'useEventListener', category: 'DOM',
    description: 'Declarative addEventListener with automatic cleanup. Attaches to window by default, or any element via the optional third argument.',
    signature: '(event, handler, element?) => void',
    params: [
      { name: 'event', type: 'string', description: 'DOM event name (e.g. "keydown", "scroll", "resize").' },
      { name: 'handler', type: '(e: Event) => void', description: 'Event handler. Stabilized internally.' },
      { name: 'element', type: 'Window | Document | HTMLElement | null', description: 'Target. Defaults to window.' },
    ],
    returns: 'void',
    demo: UseEventListenerDemo,
    code: `import { useEventListener } from '@structyl/hooks';\n\nfunction Tracker() {\n  // window-level\n  useEventListener('resize', () => measure());\n\n  // element-level\n  const ref = useRef<HTMLDivElement>(null);\n  useEventListener('scroll', onScroll, ref.current);\n}`,
  },
  {
    name: 'useKeyPress', category: 'Keyboard',
    description: 'Fires a handler whenever a specific key is pressed. Thin wrapper around useEventListener — auto-cleans up on unmount.',
    signature: '(key: string, handler: (e: KeyboardEvent) => void) => void',
    params: [
      { name: 'key', type: 'string', description: 'Key value to watch (e.g. "Enter", "ArrowUp", "Escape").' },
      { name: 'handler', type: '(e: KeyboardEvent) => void', description: 'Called when the key is pressed.' },
    ],
    returns: 'void',
    demo: UseKeyPressDemo,
    code: `import { useKeyPress } from '@structyl/hooks';\n\nfunction Modal({ onClose }) {\n  useKeyPress('Escape', onClose);\n  useKeyPress('Enter', handleSubmit);\n  return <dialog>...</dialog>;\n}`,
  },
  {
    name: 'useIsomorphicLayoutEffect', category: 'Lifecycle',
    description: 'SSR-safe useLayoutEffect. Uses useLayoutEffect in the browser (runs synchronously before paint) and falls back to useEffect on the server — no hydration warnings.',
    signature: '(effect: EffectCallback, deps?: DependencyList) => void',
    params: [
      { name: 'effect', type: 'EffectCallback', description: 'Effect to run. Synchronous before paint on the client.' },
      { name: 'deps', type: 'DependencyList', description: 'Dependency array, same as useEffect.' },
    ],
    returns: 'void',
    demo: UseIsomorphicLayoutEffectDemo,
    code: `import { useIsomorphicLayoutEffect } from '@structyl/hooks';\n\nfunction Measured({ children }) {\n  const ref = useRef<HTMLDivElement>(null);\n  const [rect, setRect] = useState<DOMRect>();\n\n  // No SSR warning; synchronous on client\n  useIsomorphicLayoutEffect(() => {\n    setRect(ref.current?.getBoundingClientRect());\n  }, []);\n\n  return <div ref={ref}>{children}</div>;\n}`,
  },
];

const CATS = ['All', ...new Set(HOOKS.map((h) => h.category))];

/* ─────────────────────────────────────────────────────────────────────────────
   Hook card
───────────────────────────────────────────────────────────────────────────── */

function HookCard({ hook }: { hook: HookDef }) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  const Demo = hook.demo;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-bg transition-shadow hover:shadow-sm">
      {/* Header */}
      <Box className="px-5 pt-5 pb-4">
        <Box className="flex items-start justify-between gap-4">
          <Box className="min-w-0 flex-1">
            <Box className="flex flex-wrap items-center gap-2">
              <Typography as="h2" variant="h2" className="font-mono text-[15px] font-semibold tracking-tight">{hook.name}</Typography>
              <span className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {hook.category}
              </span>
            </Box>
            <Typography as="p" variant="body2" className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{hook.description}</Typography>
          </Box>
        </Box>
        {/* Signature */}
        <Box className="mt-3 overflow-x-auto rounded-lg border border-border/50 bg-muted/20 px-3.5 py-2">
          <code className="whitespace-nowrap font-mono text-[12px] text-fg">{hook.signature}</code>
        </Box>
      </Box>

      {/* Tab bar */}
      <Box className="flex border-y border-border/50 bg-muted/10">
        {(['preview', 'code'] as const).map((t) => (
          <Button
            variant="ghost"
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-5 py-2.5 text-[12px] font-medium capitalize transition-colors ${
              tab === t ? 'text-fg' : 'text-muted-foreground hover:text-fg'
            }`}
          >
            {tab === t && <span className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-primary" />}
            {t}
          </Button>
        ))}
      </Box>

      {/* Tab body */}
      {tab === 'preview' ? (
        <Box className="flex min-h-[180px] items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] bg-[size:16px_16px] p-8">
          <Box className="rounded-2xl border border-border bg-bg px-8 py-6 shadow-sm">
            <Demo />
          </Box>
        </Box>
      ) : (
        <Box className="p-4">
          <CodeBlock code={hook.code} />
        </Box>
      )}

      {/* Params */}
      {hook.params.length > 0 && (
        <Box className="border-t border-border/50 px-5 py-4">
          <Typography as="p" variant="body2" className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">
            Parameters
          </Typography>
          <Box className="overflow-hidden rounded-xl border border-border/60 divide-y divide-border/40">
            {hook.params.map((p) => (
              <Box key={p.name} className="grid grid-cols-[auto_1fr] gap-x-4 px-4 py-2.5">
                <code className="font-mono text-[12px] font-medium text-primary">{p.name}</code>
                <span className="text-[12px] text-muted-foreground">{p.description}</span>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Returns */}
      <Box className="border-t border-border/50 bg-muted/10 px-5 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">Returns </span>
        <code className="ml-1 font-mono text-[11px] text-fg">{hook.returns}</code>
      </Box>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */

export default function HooksPage() {
  const [cat, setCat] = React.useState('All');
  const [query, setQuery] = React.useState('');

  // Pre-fill search from URL param (e.g. ?q=useDebounce from global search)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new window.URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
  }, []);

  const filtered = React.useMemo(
    () => HOOKS.filter((h) =>
      (cat === 'All' || h.category === cat) &&
      h.name.toLowerCase().includes(query.toLowerCase()),
    ),
    [cat, query],
  );

  return (
    <Box className="mx-auto max-w-3xl">

      {/* Page header */}
      <Box className="mb-8 border-b border-border/40 pb-6">
        <Typography as="p" variant="body2" className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">@structyl/hooks</Typography>
        <Typography as="h1" variant="h1" className="text-[28px] font-semibold tracking-tight">Hooks</Typography>
        <Typography as="p" variant="body2" className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {HOOKS.length} reusable, SSR-safe, tree-shakeable React hooks. Zero dependencies. Import only what you use.
        </Typography>
        <Box className="mt-4 flex items-center gap-2">
          <code className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 font-mono text-[12px] text-muted-foreground">
            pnpm add @structyl/hooks
          </code>
        </Box>
      </Box>

      {/* ── Sticky filters ──────────────────────────────────────────────── */}
      <Box className="sticky top-[52px] z-20 -mx-6 mb-6 border-b border-border/50 bg-bg/95 px-6 pb-3 pt-3 backdrop-blur-md md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
        {/* Search */}
        <Box className="relative mb-2.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${HOOKS.length} hooks…`}
            className="h-9 w-full max-w-xs rounded-xl border border-border/70 bg-muted/20 pl-9 pr-8 text-sm outline-none placeholder:text-muted-foreground/50 focus-visible:border-ring/50 focus-visible:ring-2 focus-visible:ring-ring/20 transition-shadow"
          />
          {query && (
            <Button variant="ghost" onClick={() => setQuery('')} className="absolute left-[calc(16.5rem-1.75rem)] top-1/2 -translate-y-1/2 text-muted-foreground hover:text-fg">
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </Box>

        {/* Category chips */}
        <Box className="flex flex-wrap gap-1.5">
          {CATS.map((c) => {
            const count = c === 'All' ? HOOKS.length : HOOKS.filter((h) => h.category === c).length;
            return (
              <Button
                variant="ghost"
                key={c}
                onClick={() => setCat(c)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
                  cat === c
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border/60 text-muted-foreground hover:border-border hover:text-fg'
                }`}
              >
                {c}
                <span className={`rounded-full px-1 text-[9px] font-semibold ${cat === c ? 'bg-white/20' : 'bg-muted text-muted-foreground'}`}>
                  {count}
                </span>
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Hook cards */}
      {filtered.length === 0 ? (
        <Box className="flex flex-col items-center py-20 text-center">
          <Typography as="p" variant="body2" className="text-sm font-medium">No hooks found</Typography>
          <Button variant="ghost" size="sm" className="mt-3" onClick={() => { setQuery(''); setCat('All'); }}>
            Clear filters
          </Button>
        </Box>
      ) : (
        <Box className="space-y-5">
          {filtered.map((h) => <HookCard key={h.name} hook={h} />)}
        </Box>
      )}
    </Box>
  );
}
