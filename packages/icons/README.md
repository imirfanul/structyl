# @structyl/icons

> The structyl icon set — 1000+ accessible, tree-shakeable SVG icons for React.

![npm](https://img.shields.io/npm/v/@structyl/icons)
![license](https://img.shields.io/npm/l/@structyl/icons)

The icon layer for [structyl](https://structyl.dev). It re-exports the full [lucide-react](https://lucide.dev) icon set as individual React components, fully typed for React 18 and 19. Using it through `@structyl/icons` keeps your imports on the structyl scope, so the underlying icon source can evolve without changing your application code.

## Installation

```bash
# pnpm
pnpm add @structyl/icons

# npm
npm install @structyl/icons

# yarn
yarn add @structyl/icons
```

`react` is a peer dependency (`^18.0.0 || ^19.0.0`) and must be installed in your project.

## Usage

Import icons by name. Each icon is a standalone component that accepts the standard SVG props plus `size`, `color`, `strokeWidth`, and `absoluteStrokeWidth`.

```tsx
import { Camera, ChevronRight, Settings } from '@structyl/icons';

export function Toolbar() {
  return (
    <div className="flex items-center gap-2">
      <Camera size={20} />
      <Settings size={20} strokeWidth={1.5} />
      <ChevronRight className="text-muted-foreground" aria-hidden />
    </div>
  );
}
```

Decorative icons should be marked `aria-hidden`. Icons that convey meaning on their own should be given an accessible label:

```tsx
import { Trash2 } from '@structyl/icons';

<button aria-label="Delete item">
  <Trash2 size={16} aria-hidden />
</button>;
```

Because the package is side-effect free, named imports are tree-shaken — only the icons you reference are included in your bundle.

## Features

- Over 1000 SVG icon components, re-exported from lucide-react.
- Tree-shakeable: `"sideEffects": false` means unused icons are dropped by your bundler.
- Fully typed for TypeScript, including the `LucideProps` and `LucideIcon` types.
- Consistent stroke-based design, sizable via `size` and styleable with `className` (Tailwind-friendly).
- React 18 and 19 compatible.
- Ships ESM and CJS builds with type declarations.

## API

`@structyl/icons` re-exports the public surface of lucide-react:

| Export | Description |
| --- | --- |
| Named icon components (e.g. `Camera`, `ChevronRight`, `Settings`) | Individual SVG icon components accepting `size`, `color`, `strokeWidth`, `absoluteStrokeWidth`, and standard SVG props. |
| `Icon` | Generic component for rendering an icon from raw node data. |
| `createLucideIcon` | Factory for building a custom icon component with the lucide API. |
| `icons` | Object map of every icon keyed by name, for dynamic/programmatic lookup. |
| `LucideProps` (type) | Props shared by all icon components. |
| `LucideIcon` (type) | Type of an icon component. |

For the full searchable icon catalog, see [lucide.dev/icons](https://lucide.dev/icons).

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — see the [documentation](https://structyl.dev) for the full component library.

## License

MIT
