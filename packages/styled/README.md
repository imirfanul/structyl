# @structyl/styled

> The Tailwind-styled component layer for structyl — accessible behavior, ready-to-use styling.

![npm](https://img.shields.io/npm/v/@structyl/styled)
![license](https://img.shields.io/npm/l/@structyl/styled)

`@structyl/styled` pairs the headless, WAI-ARIA primitives from [`@structyl/primitives`](https://www.npmjs.com/package/@structyl/primitives) with a polished Tailwind CSS v4 styling layer. Every component is themable through CSS-variable design tokens, variants are type-safe via [tailwind-variants](https://www.tailwind-variants.org/), and the compound (dot-notation) API mirrors Radix. It is the drop-in styled tier of structyl for teams that want accessible components without building the design layer themselves.

## Installation

```bash
# pnpm
pnpm add @structyl/styled

# npm
npm install @structyl/styled

# yarn
yarn add @structyl/styled
```

Peer dependencies: `react`, `react-dom` (18 or 19) and `tailwindcss` (3.4+ or 4).

Add the theme preset to your Tailwind config so the design tokens and component styles resolve:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import structylPreset from '@structyl/styled/tailwind-preset';

export default {
  presets: [structylPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@structyl/styled/dist/**/*.{js,mjs}',
  ],
} satisfies Config;
```

## Usage

Simple components are named exports; multi-part components use the compound dot-notation API.

```tsx
import { Button, Dialog } from '@structyl/styled';

export function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="default" size="lg">
          Open dialog
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete project</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone.
            </Dialog.Description>
          </Dialog.Header>

          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button variant="destructive" loading loadingText="Deleting…">
              Delete
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

The imperative toast API is also exported directly:

```tsx
import { Toaster, toast } from '@structyl/styled';

function App() {
  return (
    <>
      <Toaster />
      <button onClick={() => toast({ title: 'Saved', description: 'Your changes are live.' })}>
        Save
      </button>
    </>
  );
}
```

## Features

- **Accessible by default** — built on `@structyl/primitives`, conforming to WAI-ARIA APG patterns with full keyboard support.
- **Tailwind CSS v4 styling** — a shipped `tailwind-preset` wires up design tokens, dark mode, and animation utilities.
- **Runtime theming** — colors and surfaces are driven by CSS variables, so themes can change at runtime via `@structyl/themes`.
- **Type-safe variants** — `variant`, `size`, and `color` props are powered by `tailwind-variants` with exported `*Variants` helpers (e.g. `buttonVariants`).
- **Compound component API** — multi-part components use dot-notation namespaces (`Dialog.Root`, `Select.Trigger`, `Tabs.List`, …).
- **`asChild` composition** — interactive components forward behavior to a child element via the Slot pattern.
- **Imperative toasts** — `toast()`, `useToast()`, and `<Toaster />` for fire-and-forget notifications.
- **RSC compatible** — client components are marked `'use client'` and tested in the Next.js App Router.

## API

The package re-exports a large catalog of components. Highlights:

| Export | Kind | Description |
| --- | --- | --- |
| `Button`, `ButtonGroup` | Named | Action button with `variant`, `size`, `color`, `loading`, and icon props. |
| `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `Slider` | Named | Form atoms. |
| `Dialog`, `AlertDialog`, `Sheet`, `Drawer` | Compound | Modal overlays. |
| `Popover`, `Tooltip`, `HoverCard` | Compound | Floating surfaces. |
| `DropdownMenu`, `ContextMenu`, `Menubar`, `NavigationMenu` | Compound | Menus and navigation. |
| `Select`, `MultiSelect`, `Combobox`, `Command` | Compound | Selection and command palettes. |
| `Tabs`, `Accordion`, `Collapsible`, `Stepper`, `Breadcrumb` | Compound | Disclosure and navigation. |
| `Toast`, `Toaster`, `toast`, `useToast` | Mixed | Declarative and imperative notifications. |
| `Calendar`, `DatePicker`, `DateRangePicker`, `TimePicker`, `DateTimePicker` | Mixed | Date and time pickers. |
| `Table`, `Chart`, `Timeline`, `Stat`, `Rating`, `Typography` | Mixed | Data display and content. |
| `buttonVariants`, `alertVariants` | Function | `tailwind-variants` helpers for composing class names. |

Component prop types are re-exported alongside each component (for example `ButtonProps`, `DialogContentProps`, `SelectRootProps`). See the [full reference](https://www.structyl.com) for every export and prop.

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — the React UI library with structure. Full documentation lives at [www.structyl.com](https://www.structyl.com).

## License

MIT
