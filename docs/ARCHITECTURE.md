# Architecture

This document explains **why** the codebase is shaped the way it is. Read this before making structural changes.

---

## Core principles

### 1. Separation of behavior and presentation

The biggest architectural decision in this library is the strict separation between:

- **Behavior** (`@aura-ui/primitives`) — focus management, ARIA, keyboard, state
- **Presentation** (`@aura-ui/styled`) — visual styling, animations, theming

This separation enables:
- Users who want full styling control can use primitives directly
- Users who want batteries-included get styled components
- Both layers share the same accessibility guarantees
- Designers can theme without touching behavior

### 2. Compound components over monolithic APIs

Every multi-part component is decomposed:

```tsx
// ❌ Don't do this
<Dialog title="Hello" content="..." onClose={...} />

// ✅ Do this
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Content>
      <Dialog.Title>Hello</Dialog.Title>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

Why: Composition > configuration. Users get total control over structure, slots, and styling per-part.

### 3. The `asChild` pattern

Every primitive that renders an element supports `asChild`. This uses the `Slot` component to merge props onto a child element instead of rendering its own.

```tsx
// Renders a default button
<Tooltip.Trigger>Hover me</Tooltip.Trigger>

// Renders the user's link, but applies trigger behavior to it
<Tooltip.Trigger asChild>
  <a href="/about">About</a>
</Tooltip.Trigger>
```

Why: Avoids wrapper divs, lets users bring their own elements, plays nicely with frameworks like Next.js `<Link>`.

### 4. Controlled + uncontrolled, always

Every stateful primitive supports both modes:

```tsx
// Uncontrolled (component manages state)
<Switch defaultChecked={true} onCheckedChange={log} />

// Controlled (you manage state)
<Switch checked={value} onCheckedChange={setValue} />
```

This is wired via the `useControllableState` hook. Never roll your own.

### 5. Data attributes for styling state

Components expose state via `data-*` attributes:

```tsx
<button data-state="open" data-disabled="">
```

This lets users target states in CSS:

```css
[data-state='open'] { ... }
[data-disabled] { opacity: 0.5; }
```

…and in Tailwind:

```tsx
className="data-[state=open]:bg-primary"
```

Why: No JavaScript-driven styles, no className spaghetti, CSS-only animations.

---

## Layered package architecture

```
┌─────────────────────────────────────────┐
│  Apps (docs, playground)                │
├─────────────────────────────────────────┤
│  @aura-ui/styled                       │
│  @aura-ui/data-table                   │
├─────────────────────────────────────────┤
│  @aura-ui/primitives                   │
├─────────────────────────────────────────┤
│  @aura-ui/core                         │
│  @aura-ui/hooks                        │
│  @aura-ui/utils                        │
│  @aura-ui/themes                       │
└─────────────────────────────────────────┘
```

**Dependency direction is downward only.** A package can depend on anything below it, but never above.

---

## Package responsibilities

### `@aura-ui/core`
Internal primitives that power other packages. Not meant for end-user import (though it's published).

- `Primitive` — Polymorphic base
- `Slot` — `asChild` implementation
- `createContextScope` — Scoped React contexts
- `Portal`, `Presence`, `FocusScope`, `DismissableLayer`, `RovingFocusGroup`

### `@aura-ui/hooks`
50+ reusable React hooks. Each hook in its own folder with tests.

### `@aura-ui/utils`
Pure utility functions. Tree-shakeable. No React imports.

### `@aura-ui/themes`
The theme system. Exports `ThemeProvider`, `useTheme`, the CSS variable contracts, and built-in themes.

### `@aura-ui/primitives`
The headless behavior layer. Every component from the catalog has a headless implementation here.

### `@aura-ui/styled`
Tailwind-styled wrappers over primitives. Uses `tailwind-variants` for variant API.

### `@aura-ui/data-table`
The DataTable component. Built on `@tanstack/table-core` for the engine + custom UI + virtualization + accessibility on top.

### `@aura-ui/icons`
Icon set. Either custom SVGs or a thin re-export of `lucide-react`.

### `@aura-ui/cli`
Optional shadcn-style CLI: `npx aura-ui add button` copies source into the user's project.

---

## Build system

Each package is bundled with **tsup** to produce:
- `dist/index.mjs` (ESM)
- `dist/index.cjs` (CJS)
- `dist/index.d.ts` (types)

Turborepo orchestrates builds across packages with caching.

---

## Theme system in detail

```
┌──────────────────────────────────────┐
│  ThemeProvider                       │
│  ├─ Sets data-theme attribute        │
│  ├─ Manages mode (light/dark/system) │
│  └─ Persists to localStorage         │
└──────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────┐
│  CSS Variables                       │
│  --color-bg, --color-primary, etc.   │
└──────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────┐
│  Tailwind config maps vars to        │
│  utility classes                     │
└──────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────┐
│  Components use semantic classes:    │
│  bg-primary, text-fg, border-border  │
└──────────────────────────────────────┘
```

See [THEMING.md](./THEMING.md) for details.

---

## Why not...?

**Why not styled-components / Emotion?**
Runtime cost, RSC incompatibility, slower bundle.

**Why not vanilla-extract?**
We chose Tailwind for adoption — most React devs already know it.

**Why not just use Radix directly?**
We provide a styled layer + theme system + DataTable on top.

**Why not extend Radix?**
We want full control over the primitive layer so we can ship things Radix won't (DataTable, Combobox, etc.) as first-class citizens.

**Why TanStack Table for DataTable engine?**
Reinventing it would take 6+ months and produce a worse result. TanStack is battle-tested and headless by design.

**Why not Next.js for everything?**
Apps use Next.js; packages stay framework-agnostic (work in Vite, CRA, Remix, etc.).

---

## Bundle size discipline

Every package has a budget tracked in `.size-limit.json`. CI fails if any package exceeds its budget through `size-limit`.

---

## RSC compatibility

- All client components are marked `'use client'`
- Primitives are designed to work in Next.js App Router
- Server-only code is in `*.server.ts` files
- We test in a Next.js 15 app in CI
