# @structyl/utils

> Small, tree-shakeable TypeScript utilities that power the structyl ecosystem.

![npm](https://img.shields.io/npm/v/@structyl/utils)
![license](https://img.shields.io/npm/l/@structyl/utils)

A focused collection of pure utility functions used across structyl's primitives, styled
components, and DataTable. No React imports, no side effects, fully tree-shakeable — import
only what you need. Useful on its own in any TypeScript or JavaScript project, browser or server.

## Installation

```bash
# pnpm
pnpm add @structyl/utils

# npm
npm install @structyl/utils

# yarn
yarn add @structyl/utils
```

> `cn` and `mergeProps` build on [`clsx`](https://github.com/lukeed/clsx) and
> [`tailwind-merge`](https://github.com/dcastil/tailwind-merge), which ship as dependencies.

## Usage

```ts
import {
  cn,
  composeEventHandlers,
  isString,
  groupBy,
  pick,
  slugify,
  formatCurrency,
  getFocusableElements,
} from '@structyl/utils';

// Merge Tailwind classes — conflicting utilities are resolved.
cn('px-2 py-1', isActive && 'px-4'); // → 'py-1 px-4'

// Compose event handlers; the second is skipped if the first prevents default.
const onClick = composeEventHandlers(props.onClick, () => setOpen(true));

// Type guards narrow `unknown` safely.
if (isString(value)) {
  value.toUpperCase();
}

// Array helpers.
groupBy(users, (u) => u.role); // → { admin: [...], member: [...] }

// Object helpers.
pick(config, ['id', 'name']);

// String helpers.
slugify('Hello, World!'); // → 'hello-world'

// Number formatting via Intl.
formatCurrency(1999.9, 'USD'); // → '$1,999.90'

// DOM helpers (browser only).
getFocusableElements(containerEl); // → HTMLElement[]
```

## Features

- **Tree-shakeable** — named exports with `"sideEffects": false`; unused helpers are dropped by your bundler.
- **No React dependency** — pure functions usable anywhere, including Node and edge runtimes.
- **Tailwind-aware class merging** — `cn` combines `clsx` + `tailwind-merge` to resolve conflicting utilities.
- **Type-safe guards** — `is*` helpers act as TypeScript type predicates to narrow `unknown`.
- **SSR-safe DOM helpers** — `isBrowser`-guarded utilities that won't crash on the server.
- **Ships ESM + CJS + types** — first-class TypeScript declarations out of the box.

## API

### Class names

| Export | Description |
| --- | --- |
| `cn(...inputs)` | Merge class names with `clsx`, then resolve Tailwind conflicts via `tailwind-merge`. |

### Composition

| Export | Description |
| --- | --- |
| `composeEventHandlers(original, ours, opts?)` | Chain two event handlers; skips `ours` when `original` calls `preventDefault` (configurable). |
| `mergeProps(base, override)` | Merge two prop objects, composing event handlers, `className`, and `style`. |

### Type guards

| Export | Description |
| --- | --- |
| `isFunction`, `isObject`, `isString`, `isNumber`, `isArray`, `isBoolean`, `isNullish` | Type-predicate guards that narrow `unknown`. |
| `isEmpty(value)` | `true` for nullish values, empty strings/arrays/objects. |
| `isBrowser()` | `true` when `window` is defined. |

### Array

| Export | Description |
| --- | --- |
| `chunk(array, size)` | Split an array into chunks of size `N`. |
| `groupBy(array, keyFn)` | Group items into a record keyed by `keyFn`. |
| `sortBy(array, keyFn)` | Non-mutating sort by a derived key. |
| `uniqueBy(array, keyFn)` | Dedupe items by a derived key. |
| `partition(array, predicate)` | Split into `[matching, notMatching]`. |
| `range(start, end?, step?)` | Generate a numeric range. |

### Object

| Export | Description |
| --- | --- |
| `pick(obj, keys)` | Keep only the given keys. |
| `omit(obj, keys)` | Remove the given keys. |
| `get(obj, path, default?)` | Read a nested value by dot-path. |
| `deepEqual(a, b)` | Recursive structural equality check. |

### String

| Export | Description |
| --- | --- |
| `capitalize`, `camelCase`, `kebabCase`, `snakeCase` | Case transforms. |
| `truncate(str, max, suffix?)` | Truncate with a trailing suffix (default `…`). |
| `slugify(str)` | URL-safe slug (lowercase, accent-stripped). |

### Number

| Export | Description |
| --- | --- |
| `clamp(value, min, max)` | Constrain a number to a range. |
| `roundTo(value, decimals?)` | Round to `N` decimal places. |
| `lerp(start, end, t)` | Linear interpolation. |
| `formatNumber`, `formatCurrency`, `formatPercent` | `Intl`-based formatting helpers. |

### DOM

| Export | Description |
| --- | --- |
| `getOwnerDocument(node)`, `getOwnerWindow(node)` | Resolve the owning `Document`/`Window`, SSR-safe. |
| `getActiveElement(doc?)` | The document's active element. |
| `getFocusableElements(container)` | All visible, focusable descendants. |
| `FOCUSABLE_SELECTOR` | Selector string for focusable elements. |
| `contains(parent, child)` | Whether `parent` contains `child`. |

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — see the full
documentation at [structyl.dev](https://structyl.dev).

## License

MIT
