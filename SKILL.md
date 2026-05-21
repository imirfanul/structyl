---
name: aura-ui-development
description: Use this skill when working on the aura-ui React component library codebase. This includes adding new components (primitives or styled wrappers), adding hooks or utilities, modifying the theme system, working on the DataTable, writing tests, or any other development task within this monorepo. Triggers when you see files like CLAUDE.md, AGENTS.md, or the packages/{core,hooks,utils,themes,primitives,styled,data-table} structure.
---

# aura-ui Development Skill

This skill teaches how to work productively on the `aura-ui` component library.

---

## Step 1: Always read these first

Before doing anything, read in order:
1. `CLAUDE.md` (root) — full project rules
2. `AGENTS.md` (root) — universal agent guidance
3. `docs/ARCHITECTURE.md` — why the codebase is shaped this way
4. `docs/COMPONENT_TEMPLATE.md` — for any component work

If you skip these, you will violate conventions.

---

## Step 2: Understand the layered architecture

```
@aura-ui/utils  ──┐
@aura-ui/hooks  ──┤
@aura-ui/core   ──┴─→ @aura-ui/primitives ──→ @aura-ui/styled ──→ apps
@aura-ui/themes ────────────────────────────────↗
```

**Dependency direction is downward only.** A package may depend on anything below it, never above.

---

## Step 3: Component authoring workflow

For any new component, do this in order:

### 3a. Headless first
Create in `packages/primitives/src/<name>/`:
- `<name>.tsx` — main implementation using `Primitive`, `useControllableState`, `composeEventHandlers`
- `<name>.types.ts` — type definitions
- `index.ts` — public exports
- `<name>.test.tsx` — tests including axe-core a11y scan

### 3b. Styled second
Create in `packages/styled/src/<name>/`:
- `index.tsx` — Tailwind-styled wrapper using `tv()` from `tailwind-variants`
- Uses semantic theme tokens only (`bg-primary`, `text-fg`, never raw colors)
- Adds `data-[state=...]` selectors for state-driven styling

### 3c. Export from index
Add the export to:
- `packages/primitives/src/index.ts`
- `packages/styled/src/index.ts`

### 3d. Add a changeset
```bash
pnpm changeset
```

---

## Step 4: Required patterns

### Every component:
- Uses `React.forwardRef` (if it renders a DOM element)
- Sets `displayName`
- Supports `asChild` (via `Primitive.<element>` which uses `Slot` internally)
- Exposes `data-state` attributes for state-driven styling
- Uses named exports, never default

### Stateful components:
- Use `useControllableState` for controlled + uncontrolled state
- Never roll your own controlled-state logic

### Compound components (Dialog, Tabs, etc.):
- Use `createContext` from `@aura-ui/core`
- Export as namespace: `export * as Dialog from './dialog'`
- Pattern: `<Dialog.Root>`, `<Dialog.Trigger>`, `<Dialog.Content>`, etc.

### Event handlers:
- Use `composeEventHandlers(userOnClick, internalOnClick)` to merge user handlers with internal logic
- This respects `event.preventDefault()`

---

## Step 5: ARIA & accessibility patterns

| Component type | Required ARIA |
|---|---|
| Toggle button | `aria-pressed`, `data-state="on\|off"` |
| Switch | `role="switch"`, `aria-checked`, `data-state="checked\|unchecked"` |
| Checkbox | `role="checkbox"`, `aria-checked` (with `'mixed'` for indeterminate) |
| Dialog | `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby` |
| Disclosure (Accordion, Collapsible) | `aria-expanded`, `aria-controls` |
| Menu | `role="menu"`, items have `role="menuitem"`, keyboard nav per APG |

Always check the WAI-ARIA APG spec for the pattern before implementing.

---

## Step 6: Theme tokens

Use these semantic tokens — never raw colors:

| Token | Use for |
|---|---|
| `bg-bg` / `text-fg` | Page background / text |
| `bg-card` / `text-card-foreground` | Card surfaces |
| `bg-popover` / `text-popover-foreground` | Floating elements |
| `bg-primary` / `text-primary-foreground` | Primary actions |
| `bg-secondary` / `text-secondary-foreground` | Secondary actions |
| `bg-muted` / `text-muted-foreground` | Subtle text/surfaces |
| `bg-accent` / `text-accent-foreground` | Highlights, hovers |
| `bg-destructive` / `text-destructive-foreground` | Destructive actions |
| `border-border` | Default borders |
| `border-input` | Form input borders |
| `ring-ring` | Focus rings |

---

## Step 7: Commands reference

| Goal | Command |
|---|---|
| Install | `pnpm install` |
| Build | `pnpm build` |
| Dev (watch) | `pnpm dev` |
| Test | `pnpm test` |
| Typecheck | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Add changeset | `pnpm changeset` |
| Run docs | `pnpm docs` |
| Run playground | `pnpm playground` |

**Always run `pnpm typecheck && pnpm lint && pnpm test` before declaring work done.**

---

## Step 8: Definition of Done

A task is complete only when all of these are true:
- [ ] Code follows patterns in `AGENTS.md` section 4
- [ ] `displayName` set on all components
- [ ] Refs forwarded
- [ ] `asChild` supported (where applicable)
- [ ] Controlled + uncontrolled supported (where stateful)
- [ ] `data-state` attributes exposed
- [ ] Unit tests pass with axe-core a11y scan
- [ ] Storybook story added (if it's a public component)
- [ ] Docs MDX page added (if it's a public component)
- [ ] Changeset added (if user-visible)
- [ ] `pnpm typecheck && pnpm lint && pnpm test` all green

---

## Step 9: Common pitfalls to avoid

- ❌ Don't add a styled component without the headless primitive first
- ❌ Don't use `any` — use `unknown` and narrow, or fix the types
- ❌ Don't hardcode colors — use theme tokens
- ❌ Don't use default exports
- ❌ Don't access `window`/`document` without `typeof window !== 'undefined'` guards
- ❌ Don't use `useEffect` for derived state — compute during render or use `useMemo`
- ❌ Don't introduce a new CSS-in-JS solution — Tailwind only
- ❌ Don't disable a failing test to make CI pass
