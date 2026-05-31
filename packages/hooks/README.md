# @structyl/hooks

> A collection of SSR-safe, tree-shakeable React hooks for state, refs, the DOM, browser APIs, and performance.

![npm](https://img.shields.io/npm/v/@structyl/hooks)
![license](https://img.shields.io/npm/l/@structyl/hooks)

`@structyl/hooks` is the shared hook layer of [structyl](https://structyl.dev), the React UI library with structure. It packages the small, single-responsibility hooks that the primitives and styled components rely on, such as `useControllableState` for controlled/uncontrolled state and `useComposedRefs` for merging refs. Every hook is SSR-safe (no unguarded `window`/`document` access) and tree-shakeable, so it is equally useful on its own in any React 18 or 19 application.

## Installation

```bash
# pnpm
pnpm add @structyl/hooks

# npm
npm install @structyl/hooks

# yarn
yarn add @structyl/hooks
```

React 18 or 19 (and `react-dom`) are peer dependencies.

## Usage

```tsx
import {
  useControllableState,
  useDebounce,
  useLocalStorage,
} from '@structyl/hooks';

function SearchField({ value, defaultValue = '', onChange }: {
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
}) {
  // Works in both controlled and uncontrolled modes.
  const [query, setQuery] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange,
  });

  // Only react to the value after the user stops typing.
  const debouncedQuery = useDebounce(query ?? '', 300);

  // Persist the last search across reloads (SSR-safe).
  const [recent, setRecent] = useLocalStorage<string[]>('recent-searches', []);

  return (
    <input
      type="search"
      value={query ?? ''}
      onChange={(event) => setQuery(event.target.value)}
      onBlur={() => debouncedQuery && setRecent([debouncedQuery, ...recent])}
      placeholder="Search…"
    />
  );
}
```

## Features

- **Controllable state** — `useControllableState` is the cornerstone hook for building components that work in both controlled and uncontrolled modes.
- **SSR-safe by default** — browser-bound hooks guard `window`/`document` access and degrade gracefully on the server.
- **Tree-shakeable** — named exports and `sideEffects: false` mean you only ship the hooks you import.
- **Ref composition** — `useComposedRefs` / `composeRefs` merge multiple refs onto a single node, the foundation of `asChild` patterns.
- **TypeScript-first** — fully typed signatures with generics and tuple returns; no `any`.
- **ESM + CJS** — ships both module formats plus type declarations.

## API

### State

| Hook | Description |
| --- | --- |
| `useControllableState` | Manage state that may be controlled by a parent or held internally. |
| `useToggle` | Boolean state with a toggle and explicit setter `[value, toggle, set]`. |
| `useBoolean` | Boolean state with `{ value, on, off, toggle, set }` helpers. |
| `useCounter` | Numeric state with `increment`, `decrement`, `reset`, and `set`. |
| `usePrevious` | Returns the value from the previous render. |

### Refs

| Hook | Description |
| --- | --- |
| `useComposedRefs` / `composeRefs` | Merge multiple refs (callback or object) onto one node. |
| `useCallbackRef` | Stabilize a callback as a ref to avoid re-renders. |
| `useLatest` | Keep a ref pointing at the latest value without re-rendering. |

### DOM

| Hook | Description |
| --- | --- |
| `useClickOutside` | Run a handler when a click/touch lands outside a ref. |
| `useEventListener` | Typed `addEventListener` for `window`, `document`, or an element. |
| `useKeyPress` | Run a handler when a specific key is pressed. |

### Browser

| Hook | Description |
| --- | --- |
| `useMediaQuery` | Subscribe to a CSS media query, with an SSR default. |
| `useLocalStorage` | JSON-backed `localStorage` state `[value, set, remove]`, synced across tabs. |
| `useCopyToClipboard` | Copy text and track `copied` state via the Clipboard API. |
| `useDarkMode` | Boolean for the `prefers-color-scheme: dark` query. |

### Performance

| Hook | Description |
| --- | --- |
| `useDebounce` | Debounce a value by a delay (default `300ms`). |
| `useThrottle` | Throttle a value by a delay (default `300ms`). |

### Utility

| Hook | Description |
| --- | --- |
| `useId` | SSR-safe stable ID wrapping `React.useId` with an optional prefix. |
| `useMount` | Run a callback once on mount. |
| `useUnmount` | Run a callback on unmount. |
| `useUpdateEffect` | Like `useEffect`, but skips the first run. |
| `useIsomorphicLayoutEffect` | `useLayoutEffect` on the client, `useEffect` on the server. |
| `useWindowSize` | Track `{ width, height }` of the window. |
| `useHotkeys` | Bind keyboard shortcuts (e.g. `mod+k`) with modifier support. |

## Part of structyl

Part of [structyl](https://github.com/imirfanul/structyl) — see the full documentation at [structyl.dev](https://structyl.dev).

## License

MIT
