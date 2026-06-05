# Contributing to structyl

Thank you for considering contributing! This document explains the workflow.

---

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](../CODE_OF_CONDUCT.md). Be kind, be patient, be thoughtful.

---

## Getting started

### Prerequisites
- Node.js 20+
- pnpm 9+
- Git

### Setup
```bash
git clone https://github.com/your-org/structyl.git
cd structyl
pnpm install
pnpm build
```

### Try it out
```bash
pnpm storybook    # Component playground
pnpm docs         # Docs site
```

---

## How to contribute

### 🐛 Reporting bugs

1. Search existing issues to avoid duplicates.
2. Use the bug report template.
3. Include a minimal reproduction (CodeSandbox / StackBlitz preferred).
4. List your environment (OS, Node, browser).

### ✨ Proposing features

1. Open a **discussion** first, not an issue.
2. Describe the use case, not the implementation.
3. Wait for maintainer feedback before opening a PR.
4. For new components, propose the full API in the discussion.

### 📝 Improving docs

Docs PRs are always welcome. No issue needed for typo fixes.

### 🧩 Adding a component

This is the big one. Read carefully:

#### Step 1: Propose
- Open an issue using the "New component" template.
- Include: name, use case, full API proposal, accessibility notes.
- Reference the WAI-ARIA APG pattern.
- Get sign-off from a maintainer.

#### Step 2: Scaffold
Follow [`COMPONENT_TEMPLATE.md`](./COMPONENT_TEMPLATE.md).

#### Step 3: Implement headless first
Build in `packages/primitives/src/<name>/`.

Must include:
- Compound component API
- `asChild` support
- Controlled + uncontrolled state (if stateful)
- ARIA attributes per APG
- Keyboard navigation
- `data-state` attributes
- Tests (unit + interaction)
- Story

#### Step 4: Build styled wrapper
Add to `packages/styled/src/<name>/`.

Must include:
- Tailwind classes using theme tokens
- Variant API via `tailwind-variants`
- Animations via `data-state` selectors
- Story with all variants

#### Step 5: Write docs
Add an MDX page in `apps/docs/content/components/<name>.mdx`.

Must include:
- Description and use cases
- Anatomy (component tree)
- API tables for every part
- Examples (basic, controlled, asChild, styling, customizing)
- Accessibility notes
- Keyboard interactions table

#### Step 6: Add changeset
```bash
pnpm changeset
```
Select packages, choose semver bump, write a clear summary.

#### Step 7: Open PR
- One component per PR
- Conventional commit title (e.g., `feat(switch): add new component`)
- Link the proposal issue
- Fill in the PR template
- Make sure all checks pass

---

## Definition of done

A PR is mergeable only when:
- [ ] All CI checks pass
- [ ] Code follows the patterns in `AGENTS.md`
- [ ] Unit + interaction + a11y tests included
- [ ] Storybook story added
- [ ] Docs page added/updated
- [ ] Changeset added (if user-visible)
- [ ] At least one maintainer approval
- [ ] No unresolved discussion threads

---

## Commit message conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Use for |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Docs only |
| `refactor` | Code change with no behavior change |
| `perf` | Performance improvement |
| `test` | Adding/fixing tests |
| `chore` | Tooling, deps, config |
| `style` | Formatting (rare — Prettier handles most) |

Scope is the package or component:
- `feat(switch): support indeterminate state`
- `fix(dialog): focus restoration race condition`
- `docs(theming): add custom theme example`

Breaking changes: add `!` and a `BREAKING CHANGE:` footer:
- `feat(dialog)!: rename onOpenChange to onChange`

---

## Style guide

- Prettier is run automatically; don't fight it.
- Prefer named exports over default exports.
- Prefer `function` declarations for top-level functions, arrow functions for callbacks.
- Use early returns to reduce nesting.
- Use `import type` for type-only imports.
- No comments explaining what the code does — explain *why* if not obvious.

---

## Testing

### Unit tests (Vitest)
- Located alongside source: `Component.test.tsx`
- Test all states, all props
- Use `@testing-library/react`

### Interaction tests (Playwright)
- Located in `tests/e2e/<component>.spec.ts`
- Test user flows, keyboard, focus

### Accessibility tests
- Every component runs through `axe-core`
- CI fails on any violation

---

## Release process

Releases are automated via Changesets.

1. PRs accumulate with changeset files.
2. A "Version Packages" PR is opened by the bot.
3. Maintainers merge it, triggering a release.
4. Packages are published to npm with auto-generated changelogs.

---

## Getting help

- 💬 Discord: [link]
- 🐦 Twitter: [@structyl]
- 🐙 GitHub: [Issues](https://github.com/imirfanul/structyl/issues) for bugs & questions, [Discussions](https://github.com/imirfanul/structyl/discussions) for ideas
- 🔒 Conduct/security: [open a private advisory](https://github.com/imirfanul/structyl/security/advisories/new)

We're a friendly community. Don't be shy.
