# AGENTS.md — Instructions for AI Coding Agents

> This file follows the **[agents.md](https://agents.md)** standard. Any AI coding agent working in this repository should read this file first.

This is a **shared instruction surface** for all AI agents (Claude Code, Cursor, Aider, GitHub Copilot Workspace, Devin, etc.). If you are a human reading this, see `CLAUDE.md` for the same information with Claude-specific framing, and `docs/CONTRIBUTING.md` for the canonical human-facing version.

---

## 1. Project Snapshot

- **Name:** structyl
- **Type:** Open-source React component library (monorepo, pnpm + Turborepo)
- **Languages:** TypeScript (strict), React 19+
- **Styling:** Tailwind CSS v4 with CSS-variable-based theming
- **Min Node:** 20.x  ·  **Min pnpm:** 9.x

```
apps/        # docs site + dev playground
packages/    # publishable libraries
tooling/     # shared configs
docs/        # project-level documentation
```

---

## 2. Commands the Agent Should Know

| Goal | Command |
|---|---|
| Install deps | `pnpm install` |
| Build everything | `pnpm build` |
| Run dev mode (watch) | `pnpm dev` |
| Run docs site | `pnpm docs` |
| Run Storybook | `pnpm storybook` |
| Type-check | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Auto-fix lint | `pnpm lint:fix` |
| Format | `pnpm format` |
| Unit tests | `pnpm test` |
| E2E tests | `pnpm test:e2e` |
| A11y tests | `pnpm test:a11y` |
| Add a changeset | `pnpm changeset` |
| Clean everything | `pnpm clean` |

**Always run `pnpm typecheck && pnpm lint && pnpm test` before declaring work done.**

---

## 3. Hard Rules (the agent must obey these)

### ✋ Never do these things
1. Never add a styled component without first adding its headless primitive.
2. Never use `any` — narrow with `unknown` or fix types properly.
3. Never hardcode colors — use Tailwind theme tokens that map to CSS variables.
4. Never use default exports — only named exports.
5. Never add a runtime dependency without first opening an issue.
6. Never disable a failing test to make CI green.
7. Never commit secrets, `.env` files, or generated files.
8. Never use `dangerouslySetInnerHTML` without sanitization.
9. Never access `window` / `document` without `typeof window !== 'undefined'` guards.
10. Never introduce another CSS-in-JS library — we are Tailwind-only.

### ✅ Always do these things
1. Always forward refs from components that wrap a DOM element.
2. Always set a `displayName` on components.
3. Always support `asChild` on primitives that render an element.
4. Always support controlled + uncontrolled state on stateful primitives.
5. Always add a changeset for user-visible changes.
6. Always update docs for API changes.
7. Always run `pnpm test` after edits to a package.
8. Always use `cn()` from `@structyl/utils` to merge classNames.

---

## 4. Component Authoring Pattern

The canonical shape of a primitive component:

```tsx
// packages/primitives/src/switch/switch.tsx
import * as React from 'react';
import { Primitive } from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import type { SwitchProps } from './switch.types';

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    name,
    value = 'on',
    onClick,
    ...rest
  } = props;

  const [checked = false, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <Primitive.button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-required={required}
      data-state={checked ? 'checked' : 'unchecked'}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      value={value}
      {...rest}
      ref={ref}
      onClick={composeEventHandlers(onClick, () => setChecked((prev) => !prev))}
    />
  );
});
Switch.displayName = 'Switch';

export { Switch };
```

The styled wrapper:

```tsx
// packages/styled/src/switch/switch.tsx
import * as React from 'react';
import { Switch as SwitchPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive
    ref={ref}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
      'border-2 border-transparent transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className,
    )}
    {...props}
  />
));
Switch.displayName = 'Switch';

export { Switch };
```

---

## 5. Definition of Done

A task is complete only when:
- [ ] Code follows the authoring pattern above
- [ ] Unit tests pass
- [ ] Interaction tests pass (Playwright)
- [ ] axe-core a11y scan passes
- [ ] Storybook story added
- [ ] Docs page added/updated
- [ ] Changeset added (if user-visible)
- [ ] `pnpm typecheck && pnpm lint && pnpm test` all green

---

## 6. PR & Commit Conventions

**Commits:** Conventional Commits.
- `feat(switch): add disabled state styling`
- `fix(dialog): focus restoration after close`
- `docs(theming): add custom theme guide`
- `refactor(core): extract slot logic`
- `test(switch): add keyboard interaction tests`
- `chore(deps): bump turbo to 2.1.4`

**PRs:** One component or one fix per PR. Title in conventional commit format. Include changeset.

---

## 7. Where the Agent Should Look First

| If the agent is asked to... | Read this first |
|---|---|
| Add a new component | `docs/COMPONENT_TEMPLATE.md` |
| Add a new hook | `packages/hooks/README.md` |
| Add a new utility | `packages/utils/README.md` |
| Change the theme system | `docs/THEMING.md` |
| Change DataTable | `packages/data-table/ARCHITECTURE.md` |
| Understand a11y requirements | `docs/ACCESSIBILITY.md` |
| Understand build setup | `docs/ARCHITECTURE.md` |

---

## 8. Things the Agent Should NOT Assume

- Do not assume a library is installed — check `package.json` of the specific package, not the root.
- Do not assume Node version — verify with `node -v`.
- Do not assume tests pass — run them.
- Do not assume the user wants a styled OR a headless version — they want **both**, with the headless layer authored first.
- Do not assume animations exist — they need to be added with `tailwindcss-animate` and `data-state` selectors.

---

## 9. Escalation

If the agent encounters:
- An ambiguous API decision → stop and ask the human
- A failing test it can't fix in 2 attempts → stop and ask
- A request that violates the rules in section 3 → refuse politely and explain
- A request to add a major dependency → open an issue, do not install

---

## 10. Resources

- WAI-ARIA APG: https://www.w3.org/WAI/ARIA/apg/patterns/
- Radix UI Primitives source: https://github.com/radix-ui/primitives
- TanStack Table: https://tanstack.com/table
- Floating UI: https://floating-ui.com
- agents.md spec: https://agents.md
