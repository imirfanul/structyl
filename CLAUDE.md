# CLAUDE.md — Your-Lib Project Instructions

> This file is the **primary context document** for Claude Code (and any other AI coding agent) working on this codebase. Read it fully before doing anything.

---

## 🎯 Project Identity

**Name:** your-lib (placeholder — rename before publishing)
**Type:** Open-source React component library
**Mission:** Provide a complete, accessible, themable component library with headless behavior + Tailwind-styled layer + a first-class DataTable that Radix UI deliberately omits.

**Three pillars:**
1. **Accessible behavior primitives** (WAI-ARIA compliant, like Radix)
2. **Tailwind-styled component layer** (like shadcn/ui, but as a real package)
3. **Runtime theming system** (CSS variables + ThemeProvider)
4. **First-class DataTable** (the differentiator)

---

## 🏛️ Architecture Rules (NON-NEGOTIABLE)

### Headless-first, styled-second
Every component MUST exist in two layers:
- `@your-lib/primitives` — unstyled, accessible behavior only
- `@your-lib/styled` — Tailwind-styled wrapper around the primitive

NEVER mix styling into the primitives package. NEVER skip the headless layer.

### Compound component API
All multi-part components use the dot-notation pattern:
```tsx
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### `asChild` everywhere
Every interactive primitive supports the `asChild` prop via the `Slot` pattern. This lets users render any element/component while keeping behavior.

### Controlled + uncontrolled state
Every stateful primitive supports both modes via `useControllableState`:
- Uncontrolled: `defaultValue` + `onChange`
- Controlled: `value` + `onChange`

### Accessibility is law
- WAI-ARIA APG patterns are the source of truth
- Every component passes axe-core in CI
- Manual screen reader testing before release (NVDA, VoiceOver)
- Keyboard navigation must work for every interaction

---

## 📁 Repository Layout

```
your-lib/
├── apps/
│   ├── docs/             # Next.js docs site
│   └── playground/       # Storybook + dev playground
├── packages/
│   ├── core/             # Internal utilities (Slot, Primitive, createContext)
│   ├── hooks/            # Reusable React hooks
│   ├── utils/            # Pure utility functions (cn, type guards, etc.)
│   ├── themes/           # ThemeProvider + token system
│   ├── primitives/       # Headless behavior layer
│   ├── styled/           # Tailwind-styled component layer
│   ├── data-table/       # The DataTable component
│   ├── icons/            # Icon set / lucide re-export
│   └── cli/              # shadcn-style installer CLI
├── tooling/
│   ├── eslint-config/
│   ├── tsconfig/
│   └── tailwind-config/
└── docs/                 # Project-level markdown docs
```

---

## 🛠️ Tech Stack (LOCKED IN)

| Concern | Tool | Why |
|---|---|---|
| Package manager | **pnpm** + workspaces | Fast, strict, monorepo-friendly |
| Monorepo orchestrator | **Turborepo** | Best-in-class task pipeline |
| Language | **TypeScript 5+ strict** | Type safety is non-negotiable |
| Bundler | **tsup** (per package) | Zero-config, ESM+CJS+types |
| Styling | **Tailwind CSS v4** | CSS-first config, fast |
| Variants | **tailwind-variants** | Type-safe variant API |
| Class merging | **tailwind-merge + clsx** | Handle override conflicts |
| Animations | **tailwindcss-animate** | Pre-built animation utilities |
| Positioning | **@floating-ui/react** | Battle-tested floating UI |
| Virtualization | **@tanstack/react-virtual** | For DataTable + ScrollArea |
| Table engine | **@tanstack/table-core** (headless) | Don't reinvent the wheel |
| Testing | **Vitest** + Testing Library | Fast, modern |
| E2E | **Playwright** | Cross-browser |
| A11y | **axe-core** | In every CI run |
| Docs site | **Next.js 15** + **Fumadocs** | App Router native |
| Releases | **Changesets** | Standard for monorepos |
| Linting | **ESLint v9** flat config | Modern |
| Formatting | **Prettier** + tailwind plugin | Auto-sorts classes |

**Do NOT introduce new dependencies without justification.** Discuss in an issue first.

---

## 📜 Coding Conventions

### File naming
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-controllable-state.ts`)
- Utils: `kebab-case.ts` (e.g., `compose-event-handlers.ts`)
- Types: `*.types.ts`
- Tests: `*.test.ts(x)`
- Stories: `*.stories.tsx`

### Imports
Use absolute imports via path aliases (`@your-lib/core`), never relative `../../../`.
Always use `import type` for type-only imports.

### Component anatomy (template)
Every component package follows this structure:
```
packages/primitives/src/dialog/
├── dialog.tsx           # Main implementation
├── dialog.types.ts      # Type definitions
├── dialog.test.tsx      # Unit + interaction tests
├── dialog.stories.tsx   # Storybook story
├── dialog.docs.mdx      # Docs page
└── index.ts             # Public exports
```

### Public API rules
- Every public export goes through the package's `index.ts`
- Default exports are forbidden — use named exports only
- Re-export types alongside components

### Forwarding refs
All primitives forward refs:
```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <Primitive.button ref={ref} {...props} />;
});
Button.displayName = 'Button';
```

### `displayName` is required
Every component must set `displayName` — DevTools and the `Slot` pattern depend on it.

---

## ✅ Definition of Done (per component)

A component is NOT shipped until ALL of these are true:

- [ ] Headless primitive built in `@your-lib/primitives`
- [ ] Styled wrapper built in `@your-lib/styled`
- [ ] Supports controlled + uncontrolled state (if stateful)
- [ ] Supports `asChild` (if it renders an element)
- [ ] All ARIA attributes correct per WAI-ARIA APG
- [ ] Full keyboard navigation
- [ ] Passes axe-core with zero violations
- [ ] Unit tests cover all states
- [ ] Interaction tests cover user flows
- [ ] Storybook story with all variants
- [ ] Docs page with API table + live examples
- [ ] Changeset entry written
- [ ] Bundle size within budget (see `BUDGETS.md`)
- [ ] Tested in Next.js App Router (RSC compatible)
- [ ] Screen reader tested (NVDA + VoiceOver minimum)

---

## 🚀 How to Work in This Repo

### Setup
```bash
pnpm install
pnpm build       # Build all packages once
pnpm dev         # Watch mode for all packages
pnpm docs        # Run docs site
pnpm storybook   # Run Storybook
```

### Adding a new component
1. Read `docs/CONTRIBUTING.md` first
2. Open an issue describing the API
3. Get API sign-off before implementation
4. Scaffold using the template (see `docs/COMPONENT_TEMPLATE.md`)
5. Implement headless primitive first
6. Add styled wrapper
7. Write tests, stories, docs
8. Add changeset: `pnpm changeset`
9. Open PR

### Adding a new hook
1. Place in `packages/hooks/src/use-*/`
2. Single responsibility — one hook does one thing
3. SSR-safe (no direct `window` access without guards)
4. Tests required
5. Docs entry required

### Adding a utility
1. Place in `packages/utils/src/`
2. Pure functions only (no side effects)
3. Tree-shakeable (named exports)
4. JSDoc required

---

## 🚫 What NOT to Do

- ❌ Do NOT add a styled component without first adding the headless primitive
- ❌ Do NOT use default exports
- ❌ Do NOT hardcode colors — use theme tokens via Tailwind variables
- ❌ Do NOT use `any` — use `unknown` and narrow, or fix the types properly
- ❌ Do NOT skip accessibility tests
- ❌ Do NOT add a dependency without team discussion
- ❌ Do NOT use `dangerouslySetInnerHTML` without sanitization
- ❌ Do NOT access `window`/`document` without `typeof window !== 'undefined'` guards
- ❌ Do NOT inline styles — use Tailwind classes
- ❌ Do NOT use `useEffect` for derived state — use `useMemo` or compute during render
- ❌ Do NOT introduce a new CSS-in-JS solution — we are Tailwind-only

---

## 🔐 Security & Quality Gates

Every PR must pass:
1. TypeScript: `pnpm typecheck` (zero errors)
2. Lint: `pnpm lint` (zero errors)
3. Unit tests: `pnpm test` (zero failures, coverage thresholds met)
4. A11y: `pnpm test:a11y` (zero axe violations)
5. Bundle size check (within budget)
6. Build: `pnpm build` (succeeds)
7. At least one code review approval

---

## 🤖 AI Agent Instructions

When asked to add or modify a component:

1. **First, check if a similar primitive already exists** — search the codebase
2. **Read the WAI-ARIA APG** spec for that pattern
3. **Look at Radix's implementation** as reference (linked in each component's `RESEARCH.md`)
4. **Scaffold using the template** in `docs/COMPONENT_TEMPLATE.md`
5. **Build headless first, styled second** — never the other way around
6. **Run tests after EVERY change** — don't accumulate breakage
7. **Update the changeset** before considering work done
8. **Update the docs page** — undocumented = unshipped

When refactoring:
- Maintain backwards compatibility OR add a changeset entry marking it a breaking change
- Update all consumers within the monorepo
- Update docs

When debugging:
- Reproduce in the playground first
- Add a failing test, then fix
- Never disable a test to make CI pass

---

## 📞 Communication

- Use semantic commit messages (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`)
- Reference issue numbers in commits
- Keep PRs focused — one component or fix per PR
- Always include a changeset for user-visible changes

---

## 📚 Required Reading

Before contributing, read in order:
1. `docs/ARCHITECTURE.md` — Why the codebase is shaped this way
2. `docs/CONTRIBUTING.md` — How to contribute
3. `docs/COMPONENT_TEMPLATE.md` — How to scaffold a new component
4. `docs/ACCESSIBILITY.md` — Accessibility requirements
5. `docs/THEMING.md` — How the theme system works
6. `AGENTS.md` — AI agent-specific guidance (this is for *you*)
