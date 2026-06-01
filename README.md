<!-- markdownlint-disable MD033 MD041 -->
<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="apps/docs/public/logo.svg">
  <img alt="structyl" src="apps/docs/public/logo-light.svg" height="72">
</picture>

**The React UI library with structure.**

Accessible headless primitives, a Tailwind CSS v4 styled layer, runtime theming, and a first-class DataTable — in one cohesive, TypeScript-first system.

[![npm version](https://img.shields.io/npm/v/@structyl/styled.svg?label=%40structyl%2Fstyled&color=cb3837)](https://www.npmjs.com/package/@structyl/styled)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./docs/CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Documentation](https://www.structyl.com) · [Components](https://www.structyl.com/docs) · [GitHub](https://github.com/imirfanul/structyl)

</div>
<!-- markdownlint-enable MD033 MD041 -->

---

## What is structyl?

**structyl** is a complete React component system, not just a set of widgets. The name is *struct* (structure, structured primitives) + *-yl* — the chemistry suffix marking an elemental building block, as in *methyl* or *ethyl*. The idea is the same: small, well-defined building blocks you compose into larger, reliable systems.

It is built in three deliberate layers, plus a differentiator:

1. **Headless primitives** — accessible, unstyled behavior following the WAI-ARIA APG (in the spirit of Radix UI).
2. **Styled components** — a Tailwind CSS v4 layer built on those primitives, with type-safe variants and a token-driven theme preset.
3. **Runtime theming** — switchable themes via CSS variables, with light/dark modes and an SSR-safe anti-flash script.

On top of that sits a **first-class DataTable** with sorting, filtering, virtualization, grouping, inline editing, and server-side data — something headless-only libraries deliberately omit.

---

## Why structyl?

| Library | What it gives you | What's missing |
|---|---|---|
| **Radix Primitives** | Headless behavior, accessibility | No styling, no theming, no DataTable |
| **shadcn/ui** | Tailwind styling, great defaults | Copy-paste only (not a versioned package), no DataTable |
| **MUI / Chakra** | Full system out of the box | Heavy bundle, opinionated styling, harder to escape |
| **structyl** | **Headless + Tailwind + runtime theming + DataTable**, shipped as real, versioned, tree-shakeable packages | — |

structyl gives you the headless control of Radix, the styled ergonomics of shadcn/ui, and the completeness of a full design system — without locking you into any single layer. Use the primitives bare, drop in the styled components, or mix both.

---

## Highlights

- **Accessible by default** — WAI-ARIA APG patterns, full keyboard navigation, and tested behavior across every interactive primitive.
- **Compound component APIs** — ergonomic dot-notation (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`) for clear, composable markup.
- **`asChild` everywhere** — render any element or component while keeping the primitive's behavior, via the Slot pattern.
- **Controlled & uncontrolled** — every stateful primitive supports both modes out of the box.
- **Tailwind CSS v4** — a token-driven preset and type-safe variants, with class-merge conflict resolution.
- **Runtime theming** — light/dark modes, accent presets, and an SSR-safe anti-flash script with zero layout shift.
- **First-class DataTable** — sorting, filtering, virtualization, grouping, inline editing, and server-side data on a TanStack Table core.
- **TypeScript-first** — strict types, named exports only, and full type inference across the API surface.
- **Tree-shakeable** — pay only for what you import; ESM + CJS + types from every package.
- **RSC-friendly** — designed and tested for the Next.js App Router.

---

## Packages

Everything ships under the [`@structyl`](https://www.npmjs.com/org/structyl) npm scope. Browse full docs at [www.structyl.com/docs](https://www.structyl.com/docs).

| Package | Description |
|---|---|
| [`@structyl/primitives`](https://www.structyl.com/docs) | Headless, WAI-ARIA accessible React primitives with compound APIs, `asChild` slots, and controlled/uncontrolled state — behavior without styling. |
| [`@structyl/styled`](https://www.structyl.com/docs) | Tailwind CSS v4 styled React components built on accessible WAI-ARIA primitives, with a token-driven theme preset and type-safe variants. |
| [`@structyl/themes`](https://www.structyl.com/docs) | Runtime theming for React: a `ThemeProvider` and CSS-variable token system with light/dark modes, SSR-safe anti-flash script, and accent presets. |
| [`@structyl/data-table`](https://www.structyl.com/docs) | Headless-powered React DataTable built on TanStack Table with sorting, filtering, virtualization, grouping, inline editing, and server-side data. |
| [`@structyl/hooks`](https://www.structyl.com/docs) | SSR-safe, tree-shakeable React hooks for state, refs, DOM, browser APIs, and performance, including `useControllableState` for headless UI. |
| [`@structyl/utils`](https://www.structyl.com/docs) | Tree-shakeable TypeScript utilities for structyl: `cn` (Tailwind merge), prop/event composition, type guards, array/object/string/number/DOM helpers. |
| [`@structyl/core`](https://www.structyl.com/docs) | Headless React primitives powering structyl: Slot/`asChild`, polymorphic `Primitive`, scoped contexts, focus management, presence, Floating UI poppers. |
| [`@structyl/icons`](https://www.structyl.com/docs) | The structyl icon set: 1000+ tree-shakeable SVG icon components re-exported from lucide-react, typed for React 18 and 19. |
| [`@structyl/api-client`](https://www.structyl.com/docs) | React data-fetching for any framework: Axios client with a built-in query cache, hooks for queries, mutations, infinite & suspense, plus SSR. |
| [`@structyl/cli`](https://www.structyl.com/docs) | Command-line tool for scaffolding structyl projects and copying styled components into your codebase with automatic dependency resolution. |
| [`@structyl/video-player`](https://www.structyl.com/docs) | React video player with HLS adaptive streaming (hls.js), SRT/VTT subtitles, playlists, chapters, video filters, and full keyboard control. |

---

## Quick start

Install the styled components and the theme provider:

```bash
pnpm add @structyl/styled @structyl/themes
# or: npm install @structyl/styled @structyl/themes
# or: yarn add @structyl/styled @structyl/themes
```

Wrap your app in the `ThemeProvider` and start composing:

```tsx
import { ThemeProvider } from '@structyl/themes';
import { Button, Dialog } from '@structyl/styled';

function App() {
  return (
    <ThemeProvider defaultTheme="slate" defaultMode="system">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Hello world</Dialog.Title>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ThemeProvider>
  );
}
```

Prefer to own the behavior and bring your own styling? Install [`@structyl/primitives`](https://www.structyl.com/docs) instead and style the headless layer yourself. Full setup, theming, and per-component guides live at [www.structyl.com/docs](https://www.structyl.com/docs).

---

## Repository structure

```
structyl/
├── apps/
│   └── docs/              # Documentation site (Next.js 15)
├── packages/
│   ├── core/              # Slot, Primitive, contexts, focus, presence, poppers
│   ├── primitives/        # Headless behavior layer
│   ├── styled/            # Tailwind CSS v4 styled component layer
│   ├── themes/            # Theme system + ThemeProvider
│   ├── data-table/        # The DataTable
│   ├── hooks/             # SSR-safe React hooks
│   ├── utils/             # Pure utility functions
│   ├── icons/             # Icon set (lucide re-export)
│   ├── api-client/        # Data-fetching client + hooks
│   ├── cli/               # shadcn-style installer CLI
│   └── video-player/      # HLS video player
├── tooling/
│   ├── eslint-config/
│   ├── tsconfig/
│   └── tailwind-config/
└── docs/                  # Project-level docs
```

The monorepo is managed with **pnpm** workspaces and **Turborepo**. Each package is bundled with **tsup** (ESM + CJS + types).

---

## Development

### Prerequisites

- Node.js `>=20`
- pnpm `>=9`

### Setup

```bash
pnpm install        # Install dependencies
pnpm build          # Build all packages
pnpm dev            # Watch mode across packages
pnpm storybook      # Run Storybook
pnpm docs           # Run the docs site
```

### Useful commands

```bash
pnpm test           # Run all unit tests (Vitest)
pnpm test:e2e       # Run Playwright end-to-end tests
pnpm test:a11y      # Run accessibility tests (axe-core)
pnpm typecheck      # Type-check the whole monorepo
pnpm lint           # Lint everything (ESLint v9)
pnpm format         # Format with Prettier
pnpm size           # Check bundle-size budgets
pnpm changeset      # Add a changeset for your PR
```

---

## Contributing

Contributions are welcome — issues, discussions, and PRs alike. Before opening a PR, please read:

- [CONTRIBUTING.md](./docs/CONTRIBUTING.md) — how to contribute, branch, and submit changes
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) — why the codebase is shaped this way
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — community guidelines

User-visible changes should include a changeset (`pnpm changeset`). If you are an AI coding agent, start with [AGENTS.md](./AGENTS.md) and [CLAUDE.md](./CLAUDE.md).

---

## License

[MIT](./LICENSE) © structyl contributors

---

## Acknowledgments

structyl stands on the shoulders of excellent open-source work:

- [Radix UI](https://www.radix-ui.com/) — for the headless primitive pattern
- [shadcn/ui](https://ui.shadcn.com/) — for the Tailwind component aesthetic
- [TanStack](https://tanstack.com/) — for the table and virtualization engines
- [Floating UI](https://floating-ui.com/) — for positioning
- [Tailwind CSS](https://tailwindcss.com/) — for the styling foundation
- [Lucide](https://lucide.dev/) — for the icon set
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) — for the accessibility patterns
