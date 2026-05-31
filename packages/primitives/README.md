# @structyl/primitives

> Headless, accessible React behavior primitives — structure without styling.

![npm](https://img.shields.io/npm/v/@structyl/primitives)
![license](https://img.shields.io/npm/l/@structyl/primitives)

`@structyl/primitives` is the headless behavior layer of [structyl](https://structyl.dev). It provides unstyled, WAI-ARIA compliant React components — dialogs, menus, selects, date pickers, and dozens more — that ship full keyboard navigation, focus management, and accessibility while leaving styling entirely up to you. It is the foundation that `@structyl/styled` builds on, and it's also a complete toolkit on its own for teams that bring their own design system.

## Installation

```bash
# pnpm
pnpm add @structyl/primitives

# npm
npm install @structyl/primitives

# yarn
yarn add @structyl/primitives
```

React 18 or 19 (and the matching `react-dom`) are required as peer dependencies.

## Usage

Multi-part components use a compound, dot-notation API. Every primitive is unstyled — apply your own classes or styles.

```tsx
import { Dialog, Button } from '@structyl/primitives';

export function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Confirm action</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
          <Dialog.Close asChild>
            <Button>Cancel</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Stateful primitives support both controlled and uncontrolled usage:

```tsx
import { Dialog } from '@structyl/primitives';

// Uncontrolled
<Dialog.Root defaultOpen={false}>{/* ... */}</Dialog.Root>

// Controlled
<Dialog.Root open={open} onOpenChange={setOpen}>{/* ... */}</Dialog.Root>
```

## Features

- **Accessible by default** — WAI-ARIA APG patterns, correct roles and attributes, and full keyboard support for every interaction.
- **Headless** — zero styling shipped; render with Tailwind, CSS Modules, or anything else.
- **Compound APIs** — composable dot-notation parts (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, …).
- **`asChild` slots** — merge behavior onto your own element or component instead of an extra wrapper.
- **Controlled & uncontrolled** — every stateful primitive works both ways via `value`/`defaultValue` plus change handlers.
- **Ref forwarding** — all primitives forward refs to their underlying DOM node.
- **TypeScript-first** — strict types and exported prop types for every component.
- **SSR / RSC friendly** — tested in the Next.js App Router.

## API

The package exports both standalone primitives and namespaced compound components. A selection of the main exports:

| Export | Type | Description |
| --- | --- | --- |
| `Button` | component | Accessible button with `asChild` and loading state |
| `Rating` | component | Star/icon rating input |
| `Dialog` | namespace | Modal dialog (`Root`, `Trigger`, `Portal`, `Overlay`, `Content`, `Title`, `Description`, `Close`) |
| `AlertDialog` | namespace | Confirmation dialog with required action affordances |
| `Popover` / `Tooltip` / `HoverCard` | namespace | Floating overlays |
| `DropdownMenu` / `ContextMenu` / `Menubar` / `Menu` | namespace | Menu patterns |
| `NavigationMenu` / `Breadcrumb` / `Pagination` / `Stepper` | namespace | Navigation |
| `Select` / `MultiSelect` / `Combobox` / `Command` | namespace | Listbox & command palette inputs |
| `Tabs` / `Accordion` / `Collapsible` | namespace | Disclosure & sectioned content |
| `RadioGroup` / `ToggleGroup` / `Slider` / `Form` | namespace | Form controls |
| `Calendar` / `DatePicker` / `DateRangePicker` / `TimePicker` / `DateTimePicker` | namespace | Date & time pickers |
| `ColorPicker` / `FileUpload` / `TagsInput` / `Mentions` / `Editable` | namespace | Specialty inputs |
| `NumberField` / `OneTimePasswordField` / `PasswordToggleField` | namespace | Specialty form fields |
| `ScrollArea` / `Resizable` / `Carousel` / `Tree` / `Toolbar` | namespace | Layout & utility |
| `Avatar` / `Progress` / `Toast` / `Card` / `Chart` | namespace | Display & feedback |
| `Switch` / `Toggle` / `Checkbox` / `Label` / `Separator` / `Skeleton` / `Spinner` / `Badge` / `Alert` / `Input` / `Textarea` / `AspectRatio` | component | Standalone primitives |

Every component ships its corresponding prop types (for example `ButtonProps`, `DialogContentProps`, `SelectRootProps`). See the [documentation](https://structyl.dev) for the full API reference.

## Part of structyl

Part of the [structyl](https://github.com/imirfanul/structyl) component library — see the full docs at [structyl.dev](https://structyl.dev).

## License

MIT
