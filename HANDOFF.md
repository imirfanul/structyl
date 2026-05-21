# HANDOFF.md — Continuation Brief for AI Coding Agents

> **Read this entire file before doing anything.** This is the master plan to take `aura-ui` from scaffold (10% complete) to v1.0 launch.

---

## 0. How to use this document

You are an AI coding agent (Claude Code, Cursor, etc.) tasked with continuing the implementation of the `aura-ui` React component library. This document is your north star.

**Mandatory reading order before your first action:**
1. This file (`HANDOFF.md`) — the plan
2. `CLAUDE.md` — project rules (non-negotiable)
3. `AGENTS.md` — universal agent guidance
4. `SKILL.md` — workflow skill
5. `docs/ARCHITECTURE.md` — why the codebase is shaped this way
6. `docs/COMPONENT_TEMPLATE.md` — exact pattern for any new component

**Then, before each work session:**
- Re-read the "Hard Rules" section of `CLAUDE.md` and `AGENTS.md`
- Check this file's "Current Status" section
- Pick the next pending task from "Implementation Sequence"

---

## 1. Project identity (one paragraph)

`aura-ui` is an open-source React component library competing in the same space as Radix UI + shadcn/ui + MUI. It has three layers: **headless behavior primitives** (like Radix), **Tailwind-styled wrappers** (like shadcn/ui), and a **runtime theme system** with CSS variables. The headline differentiator is a **first-class DataTable** that Radix deliberately omits. Target: 75 components total. Monorepo: pnpm + Turborepo. TypeScript strict. React 18+/19. Tailwind v4. WCAG 2.2 AA accessibility is non-negotiable.

---

## 2. Current status

### ✅ Done (foundation, ~10% of total work)

**Configuration & tooling (100% complete):**
- Monorepo wiring (pnpm workspaces, Turborepo)
- TypeScript strict, ESLint v9 flat config, Prettier
- Vitest + Testing Library setup
- Changesets
- GitHub Actions CI
- VS Code workspace config

**Documentation (100% complete):**
- `CLAUDE.md`, `AGENTS.md`, `SKILL.md`, `README.md`, `HANDOFF.md` (this file)
- `docs/ARCHITECTURE.md`, `docs/CONTRIBUTING.md`, `docs/COMPONENT_TEMPLATE.md`
- `docs/ACCESSIBILITY.md`, `docs/THEMING.md`, `docs/ROADMAP.md`
- `LICENSE`, `CODE_OF_CONDUCT.md`

**Packages with working source:**

| Package | Status | Notes |
|---|---|---|
| `@aura-ui/utils` | ✅ Complete | `cn`, compose, type guards, array/object/string/number/DOM utilities |
| `@aura-ui/hooks` | ✅ 24 hooks done | Core ones (useControllableState, useComposedRefs, useDebounce, etc.) |
| `@aura-ui/core` | 🟡 Partial | Slot, Primitive, createContext, Portal, VisuallyHidden, DirectionProvider done. **Missing: Presence, FocusScope, FocusGuards, DismissableLayer, RovingFocusGroup, Collection, Popper, Arrow, AccessibleIcon, ScrollLock** |
| `@aura-ui/themes` | ✅ Complete | ThemeProvider, useTheme, ThemeScript, 3 themes (slate/zinc/rose) |
| `@aura-ui/primitives` | 🟡 6 of 75 done | Switch, Toggle, Checkbox, Label, Separator, Dialog (Dialog uses a stub focus trap — needs FocusScope rebuild) |
| `@aura-ui/styled` | 🟡 7 of 75 done | Button + matching wrappers for the 6 primitives above. Tailwind preset done. |
| `@aura-ui/data-table` | 🟡 Basic | TanStack Table integration with sort/filter/pagination. **Missing: virtualization, column resize/pin/reorder, server-side, CSV export, advanced features** |
| `@aura-ui/icons` | ✅ Complete | lucide-react re-export |
| `@aura-ui/cli` | 🟡 Stub | `init` and `add` commands exist but `add` writes placeholder, not real component source. No registry |

**Apps:**
- `apps/docs` — Next.js 15 landing page only. No actual docs pages yet.
- `apps/playground` — Working Vite demo of the 6 implemented components

### ❌ Not done (~90% of total work)

- **69 components** still to build (Tier 1–4)
- **10 foundation utilities** in `@aura-ui/core`
- **~75 styled wrappers** (one per primitive)
- **Full DataTable feature set**
- **All docs MDX pages** for components
- **Storybook setup** (referenced in scripts but not configured)
- **Real CLI registry** with component templates
- **E2E test suite** (Playwright config exists, no tests written)
- **Bundle size tracking** (`size-limit` not set up)
- **Visual regression tests**

---

## 3. Hard rules (memorize these)

These come from `CLAUDE.md` and `AGENTS.md`. Violating them = revert.

### Never do these:
1. Add a styled component without first adding its headless primitive
2. Use `any` — use `unknown` and narrow, or fix types properly
3. Hardcode colors — use Tailwind theme tokens (`bg-primary`, never `bg-blue-500`)
4. Use default exports — only named exports
5. Add a runtime dependency without a justification comment in the PR
6. Disable a failing test to make CI green
7. Use `dangerouslySetInnerHTML` without sanitization
8. Access `window` / `document` without `typeof window !== 'undefined'` guards
9. Introduce another CSS-in-JS library — we are **Tailwind only**
10. Skip the accessibility test

### Always do these:
1. Forward refs from components that wrap a DOM element
2. Set `displayName` on every component (`Switch.displayName = 'Switch'`)
3. Support `asChild` on primitives that render an element
4. Support controlled + uncontrolled state on stateful primitives (use `useControllableState`)
5. Expose `data-state` attributes for CSS state styling
6. Add a changeset for user-visible changes (`pnpm changeset`)
7. Update docs for API changes
8. Run `pnpm typecheck && pnpm lint && pnpm test` before declaring work done
9. Use `cn()` from `@aura-ui/utils` to merge classNames
10. Use `composeEventHandlers` from `@aura-ui/utils` to merge user handlers with internal logic

---

## 4. The canonical component pattern

Memorize this. Every component follows it.

### Headless primitive

```tsx
// packages/primitives/src/<name>/<name>.tsx
'use client';

import * as React from 'react';
import { Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import type { <Name>Props } from './<name>.types';

const <Name> = React.forwardRef<HTML<X>Element, <Name>Props>((props, forwardedRef) => {
  const {
    /* controlled state */ value: valueProp,
    defaultValue,
    onValueChange,
    /* common */ disabled,
    onClick,
    ...rest
  } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <Primitive.button
      type="button"
      role="<aria-role>"
      aria-<state-attr>={value}
      data-state={/* derived state string */}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      {...rest}
      ref={forwardedRef}
      onClick={composeEventHandlers(onClick, () => {
        if (disabled) return;
        setValue(/* next value */);
      })}
    />
  );
});
<Name>.displayName = '<Name>';

export { <Name> };
```

### Compound components (Dialog, Tabs, etc.)

Use `createContext` from `@aura-ui/core`. Export parts:

```tsx
// Inside dialog/index.tsx
const [DialogProvider, useDialogContext] = createContext<DialogContextValue>('Dialog');

export const Root = (...) => <DialogProvider {...}>{children}</DialogProvider>;
export const Trigger = React.forwardRef(...);
export const Content = React.forwardRef(...);
// ... etc
```

Then in primitives/index.ts:
```ts
export * as Dialog from './dialog';
```

User imports as:
```tsx
import { Dialog } from '@aura-ui/primitives';
<Dialog.Root><Dialog.Trigger /></Dialog.Root>
```

### Styled wrapper

```tsx
// packages/styled/src/<name>/index.tsx
'use client';

import * as React from 'react';
import { <Name> as <Name>Primitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

const <name>Variants = tv({
  base: 'inline-flex items-center justify-center ...',
  variants: {
    size: { sm: '...', md: '...', lg: '...' },
    variant: { default: '...', outline: '...' },
  },
  defaultVariants: { size: 'md', variant: 'default' },
});

export interface <Name>Props
  extends React.ComponentPropsWithoutRef<typeof <Name>Primitive>,
    VariantProps<typeof <name>Variants> {}

const <Name> = React.forwardRef<HTML<X>Element, <Name>Props>(
  ({ className, size, variant, ...props }, ref) => (
    <<Name>Primitive
      ref={ref}
      className={cn(<name>Variants({ size, variant }), className)}
      {...props}
    />
  ),
);
<Name>.displayName = '<Name>';

export { <Name> };
```

---

## 5. ARIA pattern reference

Every component must follow its WAI-ARIA APG pattern. Look up at https://www.w3.org/WAI/ARIA/apg/patterns/.

Common patterns and required ARIA:

| Component | Role | Key ARIA | Keyboard |
|---|---|---|---|
| Toggle button | `button` | `aria-pressed`, `data-state="on\|off"` | Space, Enter |
| Switch | `switch` | `aria-checked`, `data-state="checked\|unchecked"` | Space, Enter |
| Checkbox | `checkbox` | `aria-checked` (with `'mixed'`), `data-state="checked\|unchecked\|indeterminate"` | Space (NOT Enter) |
| Radio group | `radiogroup`, items `radio` | `aria-checked`, `aria-required` | Arrow keys cycle |
| Dialog | `dialog` | `aria-modal`, `aria-labelledby`, `aria-describedby` | Esc closes, Tab cycles, focus trapped |
| Alert dialog | `alertdialog` | Same as dialog | Same |
| Popover | `dialog` (non-modal) | `aria-labelledby` | Esc closes, focus moves but isn't trapped |
| Tooltip | `tooltip` | `aria-describedby` on trigger | Esc dismisses |
| Accordion | items have `aria-expanded`, `aria-controls` | n/a | Arrow Up/Down between headers, Home/End |
| Tabs | tablist/tab/tabpanel | `aria-selected`, `aria-controls`, `aria-labelledby` | Arrow keys cycle, optional auto-activate |
| Disclosure (Collapsible) | trigger has `aria-expanded`, `aria-controls` | n/a | Space, Enter |
| Menu | `menu`/`menuitem` | `aria-haspopup`, `aria-expanded` on trigger | Arrow keys, type-ahead |
| Combobox | `combobox` + listbox | `aria-expanded`, `aria-controls`, `aria-activedescendant` | Arrow keys, Enter selects |
| Slider | `slider` | `aria-valuemin`, `aria-valuemax`, `aria-valuenow` | Arrow keys, Home/End, Page Up/Down |
| Progressbar | `progressbar` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | n/a |

---

## 6. Implementation sequence (THE PLAN)

Build in this order. Each phase builds on the previous. **Do not skip phases.**

### Phase A — Finish foundation utilities (BLOCKS everything else)

These are in `@aura-ui/core`. Many later components REQUIRE these.

| Order | Component | Why it matters | Est. complexity |
|---|---|---|---|
| A1 | `Presence` | Animation-aware mount/unmount; needed by every dismissable overlay | Medium |
| A2 | `FocusScope` | Proper focus trap with tab cycling; replaces Dialog's current stub | High |
| A3 | `FocusGuards` | Prevents Tab-out of focus scope | Low |
| A4 | `DismissableLayer` | Outside click + Esc handling; needed by Popover/Tooltip/Menu/Dialog | High |
| A5 | `RovingFocusGroup` | Arrow-key nav pattern; needed by RadioGroup/Tabs/Menu/ToggleGroup | High |
| A6 | `Collection` | Tracks ordered children for RovingFocusGroup | Medium |
| A7 | `Popper` | Wraps `@floating-ui/react`; needed by Popover/Tooltip/Menu/HoverCard | High |
| A8 | `Arrow` | SVG arrow for Popper | Low |
| A9 | `AccessibleIcon` | Icon wrapper with proper ARIA | Low |
| A10 | `ScrollLock` | Body scroll locking for modal overlays | Low |

After Phase A, rebuild **Dialog** using `FocusScope` + `DismissableLayer` + `ScrollLock` + `Presence` (replace the existing stub).

### Phase B — Simple atoms (warm-up, ~1 day each)

These have no dependencies on other components. Build to internalize the pattern.

| Order | Component | Notes |
|---|---|---|
| B1 | `AspectRatio` | Pure layout, no state |
| B2 | `Avatar` | Image with fallback states (`Avatar.Root`, `Avatar.Image`, `Avatar.Fallback`) |
| B3 | `Progress` | Has value state, no interaction |
| B4 | `Skeleton` | Styled only |
| B5 | `Badge` | Styled only, variants |
| B6 | `Card` | Styled only, compound (`Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`, `Card.Content`, `Card.Footer`) |
| B7 | `Spinner` | Styled only, CSS animation |
| B8 | `Alert` | Styled only, compound |

### Phase C — Form basics

| Order | Component | Notes |
|---|---|---|
| C1 | `Input` | Styled only, wraps native input |
| C2 | `Textarea` | Styled only, wraps native textarea |
| C3 | `RadioGroup` | Compound, uses `RovingFocusGroup` from Phase A |
| C4 | `ToggleGroup` | Compound, uses `RovingFocusGroup` |
| C5 | `Slider` | Complex, uses pointer events + keyboard |
| C6 | `Form` | Form validation wrapper (consider integrating with react-hook-form) |

### Phase D — Disclosure & navigation

| Order | Component | Notes |
|---|---|---|
| D1 | `Collapsible` | Single section, uses Presence |
| D2 | `Accordion` | Multiple sections, uses Collapsible internally + RovingFocusGroup |
| D3 | `Tabs` | Uses RovingFocusGroup |
| D4 | `Breadcrumb` | Styled only mostly |
| D5 | `Pagination` | Styled only mostly |
| D6 | `Stepper` | Styled only mostly |

### Phase E — Overlays (heavy use of Phase A utilities)

| Order | Component | Notes |
|---|---|---|
| E1 | `Dialog` (REBUILD) | Replace stub with FocusScope + DismissableLayer + ScrollLock + Presence |
| E2 | `AlertDialog` | Subclass of Dialog, requires action confirmation |
| E3 | `Sheet` | Dialog with side-slide animation |
| E4 | `Drawer` | Bottom-sheet variant (mobile-friendly) |
| E5 | `Popover` | Non-modal, uses Popper + DismissableLayer |
| E6 | `Tooltip` | Hover/focus driven, uses Popper |
| E7 | `HoverCard` | Like Popover but hover-triggered |
| E8 | `Toast` | Notification system with queue management |

### Phase F — Complex compound components

| Order | Component | Notes |
|---|---|---|
| F1 | `DropdownMenu` | Uses Popper + RovingFocusGroup + DismissableLayer |
| F2 | `ContextMenu` | Right-click variant of DropdownMenu |
| F3 | `Menubar` | Top-level menu bar with nested DropdownMenus |
| F4 | `NavigationMenu` | Site nav with submenus |
| F5 | `Select` | Custom dropdown with keyboard support, type-ahead |
| F6 | `Combobox` | Searchable select with filtering |
| F7 | `Command` | Command palette (cmdk-style) |

### Phase G — Specialty form components

| Order | Component | Notes |
|---|---|---|
| G1 | `OneTimePasswordField` | OTP/PIN input |
| G2 | `PasswordToggleField` | Password input with show/hide |
| G3 | `NumberField` | Numeric input with stepper |
| G4 | `Calendar` | Standalone calendar (used by DatePicker) |
| G5 | `DatePicker` | Calendar in a Popover |
| G6 | `TimePicker` | Time selection |
| G7 | `DateRangePicker` | Range variant |
| G8 | `ColorPicker` | Color selection |
| G9 | `FileUpload` | Drag-and-drop file input |

### Phase H — Feedback & misc

| Order | Component | Notes |
|---|---|---|
| H1 | `CircularProgress` | Circular spinner/progress |
| H2 | `Meter` | Quantitative measurement display |
| H3 | `ScrollArea` | Custom scrollbar |
| H4 | `Toolbar` | Action button container, uses RovingFocusGroup |
| H5 | `Resizable` | Resizable panels (consider react-resizable-panels) |
| H6 | `Carousel` | Image/content slider (consider embla-carousel-react) |
| H7 | `Tree` | Tree view (file explorer style) |
| H8 | `Editable` | Inline editable text |
| H9 | `TagsInput` | Tag input with chips |
| H10 | `Mentions` | @mention autocomplete (uses Combobox internally) |
| H11 | `CopyButton` | Copy-to-clipboard with feedback |

### Phase I — DataTable (the star differentiator)

The basic DataTable exists. Enhance it incrementally:

| Order | Feature |
|---|---|
| I1 | Virtual scrolling (TanStack Virtual) |
| I2 | Column resizing |
| I3 | Column reordering |
| I4 | Column pinning (left/right) |
| I5 | Column visibility toggle |
| I6 | Row selection (single, multi, range) |
| I7 | Expandable rows |
| I8 | Grouping + aggregation |
| I9 | Editable cells |
| I10 | Server-side data adapter |
| I11 | CSV export |
| I12 | JSON export |
| I13 | Toolbar component (search + filter UI) |
| I14 | Filter UI components (per-column) |
| I15 | Empty/loading/error states |
| I16 | Keyboard navigation (grid pattern per APG) |

### Phase J — Tooling & launch

| Order | Task |
|---|---|
| J1 | Storybook setup at `apps/playground/.storybook/` |
| J2 | Write stories for every component |
| J3 | MDX docs pages at `apps/docs/content/components/<name>.mdx` (one per component) |
| J4 | Real CLI registry: `npx aura-ui add <name>` actually fetches & inlines source |
| J5 | Theme generator UI in docs |
| J6 | Migration guides (from Radix, MUI, Chakra) |
| J7 | Bundle size tracking with `size-limit` |
| J8 | Visual regression with Chromatic or Playwright screenshots |
| J9 | Full a11y audit (axe + manual screen reader) |
| J10 | v1.0 release |

---

## 7. Per-component task checklist

For EVERY component you build, complete all of these. Treat as Definition of Done.

- [ ] Headless primitive in `packages/primitives/src/<name>/`
  - [ ] `<name>.tsx` implementation
  - [ ] `<name>.types.ts` (or inline types if simple)
  - [ ] `index.ts` exports
  - [ ] `<name>.test.tsx` with all states + axe-core scan
- [ ] Styled wrapper in `packages/styled/src/<name>/`
  - [ ] `index.tsx` with `tv()` variants
  - [ ] Uses semantic theme tokens only
  - [ ] Animations via `data-[state=...]` selectors (use tailwindcss-animate)
- [ ] Exported from package index files
  - [ ] `packages/primitives/src/index.ts`
  - [ ] `packages/styled/src/index.ts`
- [ ] Storybook story (when Storybook is set up)
- [ ] Docs MDX page (when docs site is set up)
- [ ] Added to playground demo (`apps/playground/src/App.tsx`)
- [ ] Changeset added (`pnpm changeset`)
- [ ] `pnpm typecheck && pnpm lint && pnpm test` all green
- [ ] WAI-ARIA APG compliance verified
- [ ] Keyboard navigation works
- [ ] Tested in light + dark mode
- [ ] Tested with controlled + uncontrolled state (if stateful)
- [ ] `displayName` set
- [ ] Refs forwarded
- [ ] `asChild` supported (where applicable)
- [ ] Updated `docs/ROADMAP.md` to check off the component

---

## 8. Per-session workflow (do this every time)

1. **`git pull`** — get latest
2. **Check `HANDOFF.md` section 6** — pick the next pending component from the current phase
3. **Read the WAI-ARIA APG** for that component's pattern
4. **Look at Radix UI's source** for reference (https://github.com/radix-ui/primitives)
5. **Look at the closest existing component** in this codebase for our specific patterns
6. **Scaffold** following `docs/COMPONENT_TEMPLATE.md`
7. **Build headless first, styled second** — never reverse
8. **Write tests as you go**, not at the end
9. **Test in playground** — add a section, watch it work
10. **`pnpm typecheck && pnpm lint && pnpm test`** — all green before committing
11. **`pnpm changeset`** — add a changeset
12. **`git commit`** with conventional commit message: `feat(<name>): add component`
13. **Update `docs/ROADMAP.md`** — check off the item
14. **Update this file's Section 2 (Current Status)** if you finished a phase

---

## 9. How to handle ambiguity

When you encounter an unclear requirement:

1. **Check Radix UI's implementation** first — it's our primary reference for APIs
2. **Check the WAI-ARIA APG** for behavioral spec
3. **Check shadcn/ui** for styling reference
4. **If still ambiguous:** make the conservative choice (more accessible, more controlled, smaller bundle) and add a `// TODO(api-decision):` comment
5. **Never invent novel APIs.** This library is meant to feel familiar to Radix/shadcn users.

---

## 10. How to handle bugs / regressions

1. **Reproduce in the playground first** — add a section that demonstrates the bug
2. **Write a failing test** — capture the bug in code before fixing
3. **Fix the bug**
4. **Verify the test passes**
5. **Check related components** — same bug might exist elsewhere
6. **Add a changeset** marking it a `patch`

**Never** comment out a failing test or use `it.skip` to make CI pass.

---

## 11. Dependency policy

**Do NOT add new runtime dependencies without thought.** Current allowed runtime deps per package:

| Package | Allowed runtime deps |
|---|---|
| `@aura-ui/utils` | `clsx`, `tailwind-merge` |
| `@aura-ui/hooks` | (none — just React peer) |
| `@aura-ui/core` | `@floating-ui/react` |
| `@aura-ui/themes` | (none — just React peer) |
| `@aura-ui/primitives` | `@aura-ui/*` internal only |
| `@aura-ui/styled` | `@aura-ui/*` internal, `tailwind-variants` |
| `@aura-ui/data-table` | `@tanstack/react-table`, `@tanstack/react-virtual`, `@aura-ui/*` |
| `@aura-ui/icons` | `lucide-react` |
| `@aura-ui/cli` | `commander`, `prompts`, `kleur`, `ora`, `execa` |

**If you need a new dep:** add a `// dep: <package> — <one-line reason>` comment in the PR description. If you're an AI agent, ask the human before installing.

**Components that may need new deps in the future:**
- `Resizable` → `react-resizable-panels` (or custom)
- `Carousel` → `embla-carousel-react` (or custom)
- `Calendar` → custom (do NOT use react-day-picker — too heavy)
- `Form` → optional `react-hook-form` integration
- `Command` → custom (do NOT use `cmdk` — we want full control)

---

## 12. Performance budgets

Each package has a target gzip size. CI should fail if exceeded (set up `size-limit` in Phase J).

| Package | Target |
|---|---|
| `@aura-ui/utils` | < 2 KB |
| `@aura-ui/hooks` | < 5 KB |
| `@aura-ui/core` | < 8 KB |
| `@aura-ui/themes` | < 3 KB |
| `@aura-ui/primitives` | < 20 KB (full) |
| `@aura-ui/styled` | < 25 KB (full) |
| `@aura-ui/data-table` | < 30 KB |
| `@aura-ui/icons` | tree-shakeable per-icon |

Use tree-shakeable exports. No barrel side effects. `sideEffects: false` in every package.json.

---

## 13. Accessibility requirements

Every PR must pass:

1. **axe-core scan** — zero violations
2. **Keyboard test** — every interaction reachable via keyboard
3. **Screen reader smoke test** — at least NVDA OR VoiceOver
4. **Contrast** — WCAG AA (4.5:1 for text, 3:1 for UI)
5. **Focus visible** — `:focus-visible` only, with `ring-ring` color
6. **Touch targets** — minimum 44×44 CSS pixels for interactive elements
7. **`prefers-reduced-motion`** — all animations respect it

Use the helpers in `docs/ACCESSIBILITY.md`.

---

## 14. Testing strategy

- **Unit tests**: every primitive, every styled wrapper, every hook (Vitest + Testing Library + jest-axe)
- **Interaction tests**: complex flows (Dialog open/close, Menu navigation, Form submission) — Playwright in `tests/e2e/`
- **Visual regression**: Phase J adds Chromatic or Playwright screenshot tests
- **Accessibility tests**: every component runs through axe-core in the unit test

**Coverage targets** (set in `vitest.config.ts`):
- 80% lines, 80% functions, 75% branches, 80% statements

---

## 15. Communication conventions

### Commits (Conventional Commits)
- `feat(<scope>):` new feature
- `fix(<scope>):` bug fix
- `docs(<scope>):` docs only
- `refactor(<scope>):` no behavior change
- `test(<scope>):` adding/fixing tests
- `chore(<scope>):` tooling/deps/config
- `perf(<scope>):` performance improvement

Scope = the package or component (e.g., `feat(switch):`, `fix(dialog):`, `chore(deps):`).

Breaking changes: add `!` and a `BREAKING CHANGE:` footer.

### PRs
- One component or one fix per PR
- Title in conventional commit format
- Include changeset
- Fill in PR template (when added)
- Reference issue number

---

## 16. When to stop and ask the human

AI agents: stop and ask the human if:

1. **A request violates a Hard Rule** (Section 3) — refuse politely
2. **You'd need to add a new major runtime dependency** not in Section 11
3. **The API design is ambiguous** even after checking Radix/APG/shadcn
4. **A test fails for non-obvious reasons** and 2 fix attempts haven't worked
5. **You'd need to change `CLAUDE.md`, `AGENTS.md`, or this file**
6. **You're about to delete or significantly rewrite an existing component**
7. **A request would break backwards compatibility** without a major version bump

When asking, state:
- What you're trying to do
- What you've tried
- The 2–3 viable options as you see them
- Your recommendation

---

## 17. Reference links

- WAI-ARIA APG patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- Radix UI source: https://github.com/radix-ui/primitives
- shadcn/ui source: https://github.com/shadcn-ui/ui
- TanStack Table: https://tanstack.com/table
- TanStack Virtual: https://tanstack.com/virtual
- Floating UI: https://floating-ui.com
- Tailwind Variants: https://www.tailwind-variants.org
- tailwindcss-animate: https://github.com/jamiebuilds/tailwindcss-animate
- agents.md standard: https://agents.md

---

## 18. Quick reference: file locations

Need to find something? Here's where it lives:

| Looking for | Location |
|---|---|
| Project rules | `CLAUDE.md`, `AGENTS.md` |
| This plan | `HANDOFF.md` |
| Workflow skill | `SKILL.md` |
| Component template | `docs/COMPONENT_TEMPLATE.md` |
| Architecture rationale | `docs/ARCHITECTURE.md` |
| Theme system docs | `docs/THEMING.md` |
| A11y requirements | `docs/ACCESSIBILITY.md` |
| Roadmap (checklist) | `docs/ROADMAP.md` |
| Existing primitives | `packages/primitives/src/` |
| Existing styled | `packages/styled/src/` |
| Existing hooks | `packages/hooks/src/` |
| Existing utils | `packages/utils/src/` |
| Core utilities | `packages/core/src/` |
| Theme system | `packages/themes/src/` |
| DataTable | `packages/data-table/src/` |
| CLI | `packages/cli/src/` |
| Docs site | `apps/docs/` |
| Playground | `apps/playground/` |
| CI workflow | `.github/workflows/ci.yml` |
| Changesets | `.changeset/` |

---

## 19. Time/effort estimates

If you (an AI agent or human) work through this systematically:

| Phase | Components | Est. time (AI + human review) | Est. time (human alone) |
|---|---|---|---|
| Phase A — Foundation utilities | 10 | 1 week | 4 weeks |
| Phase B — Atoms | 8 | 3 days | 2 weeks |
| Phase C — Form basics | 6 | 1 week | 3 weeks |
| Phase D — Disclosure | 6 | 1 week | 3 weeks |
| Phase E — Overlays | 8 | 2 weeks | 6 weeks |
| Phase F — Complex compound | 7 | 2 weeks | 8 weeks |
| Phase G — Specialty forms | 9 | 2 weeks | 8 weeks |
| Phase H — Feedback & misc | 11 | 2 weeks | 6 weeks |
| Phase I — DataTable enhancements | 16 features | 2 weeks | 6 weeks |
| Phase J — Tooling & launch | 10 tasks | 1 week | 3 weeks |
| **Total** | **~75 components + tooling** | **~3 months** | **~12 months** |

These are rough — actual time depends on quality bar and how many components reuse patterns.

---

## 20. Final words for the AI agent reading this

You are not building a quick prototype. You are building a library that real teams will depend on for years.

**Quality bar:**
- Every component must be production-ready, not "demo quality"
- Every component must pass axe-core with zero violations
- Every component must work in Next.js App Router (RSC compatible — `'use client'` where needed)
- Every component must support controlled + uncontrolled state if it has state
- Every component must be keyboard-navigable
- Every component must be themeable via the CSS variables in `@aura-ui/themes`

**When in doubt:**
- Choose accessibility over convenience
- Choose smaller bundle over more features
- Choose composability over configuration
- Choose explicit over magic
- Choose matching Radix's API over inventing your own

**Your first action right now:**
1. Confirm you've read this file end-to-end
2. Confirm you've read `CLAUDE.md`, `AGENTS.md`, `SKILL.md`, `docs/COMPONENT_TEMPLATE.md`
3. Run `pnpm install && pnpm build && pnpm playground` to verify the foundation works
4. If anything is broken, fix it before continuing
5. Then start Phase A, task A1 (`Presence` in `@aura-ui/core`)

Good luck. Build something the React community will be proud to use.
