# aura-ui

<!-- markdownlint-disable MD033 -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="apps/docs/public/logo.svg">
  <img alt="aura-ui" src="apps/docs/public/logo-light.svg" height="60">
</picture>
<!-- markdownlint-enable MD033 -->

> A world-class React component library — accessible headless primitives, Tailwind-styled components, runtime theming, and a first-class DataTable.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ✨ What is this?

**aura-ui** is a complete React component system built on three layers:

1. **Headless primitives** — Accessible, unstyled behavior (like Radix UI)
2. **Styled components** — Tailwind-styled wrappers with variant API
3. **Theme system** — Runtime-switchable themes via CSS variables

Plus a **first-class DataTable** with sorting, filtering, virtualization, server-side data, and more — something Radix deliberately omits.

---

## 🎯 Why another component library?

| Library | What it gives you | What's missing |
|---|---|---|
| Radix Primitives | Headless behavior, accessibility | No styling, no DataTable |
| shadcn/ui | Tailwind styling | Copy-paste only, no DataTable, limited theming |
| MUI / Chakra | Full system | Heavy bundle, opinionated styling |
| **aura-ui** | **Headless + Tailwind + theming + DataTable** | — |

---

## 📦 Packages

| Package | Description |
|---|---|
| `@aura-ui/primitives` | Headless accessible primitives |
| `@aura-ui/styled` | Tailwind-styled components |
| `@aura-ui/themes` | Theme provider + token system |
| `@aura-ui/hooks` | Reusable React hooks |
| `@aura-ui/utils` | Utility functions (cn, type guards, etc.) |
| `@aura-ui/data-table` | The DataTable component |
| `@aura-ui/icons` | Icon set |
| `@aura-ui/cli` | Optional shadcn-style installer |

---

## 🚀 Quick start

```bash
pnpm add @aura-ui/styled @aura-ui/themes
```

```tsx
import { ThemeProvider } from '@aura-ui/themes';
import { Button, Dialog } from '@aura-ui/styled';

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

---

## 🏗️ Repository structure

```
aura-ui/
├── apps/
│   ├── docs/              # Documentation site (Next.js)
│   └── playground/        # Storybook + dev playground
├── packages/
│   ├── core/              # Internal utilities (Slot, Primitive, ctx)
│   ├── hooks/             # 50+ reusable React hooks
│   ├── utils/             # Pure utility functions
│   ├── themes/            # Theme system + ThemeProvider
│   ├── primitives/        # Headless behavior layer
│   ├── styled/            # Tailwind-styled component layer
│   ├── data-table/        # The DataTable
│   ├── icons/             # Icon set
│   └── cli/               # CLI installer
├── tooling/
│   ├── eslint-config/
│   ├── tsconfig/
│   └── tailwind-config/
└── docs/                  # Project-level docs
```

---

## 🛠️ Development

### Prerequisites
- Node.js 20+
- pnpm 9+

### Setup
```bash
pnpm install        # Install dependencies
pnpm build          # Build all packages
pnpm dev            # Watch mode
pnpm storybook      # Run Storybook
pnpm docs           # Run docs site
```

### Useful commands
```bash
pnpm test           # Run all unit tests
pnpm test:e2e       # Run Playwright tests
pnpm test:a11y      # Run accessibility tests
pnpm typecheck      # Type check everything
pnpm lint           # Lint everything
pnpm changeset      # Add a changeset for your PR
```

---

## 🤝 Contributing

We welcome contributions! Please read:
- [CONTRIBUTING.md](./docs/CONTRIBUTING.md) — How to contribute
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — Community guidelines
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Why the codebase is shaped this way

If you are an AI agent: read [AGENTS.md](./AGENTS.md) and [CLAUDE.md](./CLAUDE.md) first.

---

## 📜 License

MIT © aura-ui contributors

---

## 🙏 Acknowledgments

This project stands on the shoulders of giants:
- [Radix UI](https://www.radix-ui.com/) — for the headless pattern
- [shadcn/ui](https://ui.shadcn.com/) — for the Tailwind aesthetic
- [TanStack](https://tanstack.com/) — for the table engine
- [Floating UI](https://floating-ui.com/) — for positioning
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) — for accessibility patterns
