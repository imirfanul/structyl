# @structyl/core

> Headless React primitives that power the structyl component library.

![npm](https://img.shields.io/npm/v/@structyl/core)
![license](https://img.shields.io/npm/l/@structyl/core)

`@structyl/core` is the low-level foundation underneath every styled component in [structyl](https://www.structyl.com). It provides the unstyled, accessible building blocks — polymorphic elements, the `asChild` slot pattern, scoped contexts, focus management, presence/animation handling, and Floating UI–based positioning. If you are building your own headless components (or extending structyl), this is the package you compose from; most app authors will consume `@structyl/primitives` or `@structyl/styled` instead.

## Installation

```bash
# pnpm
pnpm add @structyl/core

# npm
npm install @structyl/core

# yarn
yarn add @structyl/core
```

`react` and `react-dom` (v18 or v19) are peer dependencies.

## Usage

Build a polymorphic, accessible primitive using `Primitive` (with built-in `asChild`) and a typed context created with `createContext`:

```tsx
'use client';

import * as React from 'react';
import { Primitive, createContext } from '@structyl/core';

interface ToggleContextValue {
  pressed: boolean;
  onToggle: () => void;
}

const [ToggleProvider, useToggleContext] = createContext<ToggleContextValue>('Toggle');

function Toggle({ children }: { children: React.ReactNode }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <ToggleProvider pressed={pressed} onToggle={() => setPressed((p) => !p)}>
      {children}
    </ToggleProvider>
  );
}

const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<typeof Primitive.button>
>((props, ref) => {
  const { pressed, onToggle } = useToggleContext('ToggleButton');
  return (
    <Primitive.button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      data-state={pressed ? 'on' : 'off'}
      onClick={onToggle}
      {...props}
    />
  );
});
ToggleButton.displayName = 'ToggleButton';

// `asChild` renders the behavior on your own element instead of a <button>:
//   <ToggleButton asChild><MyLink href="/" /></ToggleButton>
```

## Features

- **Polymorphic `Primitive`** — render `Primitive.button`, `Primitive.div`, etc., with first-class ref forwarding and an `asChild` prop on every node.
- **`Slot` / `Slottable`** — merge props, class names, styles, and event handlers onto a consumer-supplied child to implement `asChild`.
- **Typed contexts** — `createContext`, `createContextScope`, and `composeContextScopes` give descriptive errors outside a provider and avoid context leakage in nested or shared component families.
- **Focus management** — `FocusScope` traps and loops focus, and `useFocusGuards` inserts sentinel guards so Tab cannot escape an open layer.
- **Layer dismissal** — `DismissableLayer` handles Escape, outside-pointer, and outside-focus interactions for popovers, dialogs, and menus.
- **Presence & animation** — `Presence` / `usePresence` keep an element mounted until its exit CSS animation or transition finishes.
- **Positioning** — the `Popper` namespace wraps `@floating-ui/react` for anchored content with flip, shift, size, and arrow support.
- **Roving focus & collections** — `RovingFocusGroup` and `createCollection` provide arrow-key navigation over DOM-ordered items.
- **Accessibility helpers** — `VisuallyHidden`, `AccessibleIcon`, and `DirectionProvider` / `useDirection` for screen-reader labels and RTL awareness.
- **SSR-safe** — all browser access is guarded; primitives are marked `'use client'` and work in the Next.js App Router.

## API

| Export | Kind | Description |
| --- | --- | --- |
| `Primitive` | Components | Polymorphic elements (`button`, `div`, `span`, …) with `asChild` and ref forwarding. |
| `Slot`, `Slottable` | Component | Render a child with merged props; the engine behind `asChild`. |
| `createContext` | Function | Create a typed context that throws a helpful error outside its provider. |
| `createContextScope` | Function | Create a scoped context factory to prevent leakage across nested/shared families. |
| `composeContextScopes` | Function | Merge multiple scope factories into one. |
| `Portal` | Component | Render children into a container (defaults to `document.body`). |
| `Presence`, `usePresence` | Component / Hook | Defer unmount until exit animations complete. |
| `FocusScope` | Component | Trap, loop, and restore focus within a region. |
| `useFocusGuards` | Hook | Inject focus sentinel guards around the document body. |
| `DismissableLayer` | Component | Handle Escape and outside pointer/focus dismissal. |
| `RovingFocusGroup` | Component | Arrow-key roving tabindex navigation. |
| `createCollection` | Function | Track child items in DOM order. |
| `Popper` | Namespace | `Popper`, `Popper.Anchor`, `Popper.Content`, `Popper.Arrow` (Floating UI). |
| `Arrow` | Component | Standalone SVG arrow primitive. |
| `VisuallyHidden` | Component | Hide content visually while keeping it accessible. |
| `AccessibleIcon` | Component | Decorate an icon with an `aria-hidden` element and a hidden label. |
| `DirectionProvider`, `useDirection` | Component / Hook | Provide and read text direction (`ltr` / `rtl`). |
| `useScrollLock` | Hook | Lock body scroll without layout shift (reference-counted). |

Type definitions are exported alongside each component (e.g. `PrimitivePropsWithRef`, `SlotProps`, `PortalProps`, `PresenceProps`, `Direction`).

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — the React UI library with structure. See the full documentation at [www.structyl.com](https://www.structyl.com).

## License

MIT
