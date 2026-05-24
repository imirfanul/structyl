# Repository Status (summary)

Date: 2026-05-22

## High-level

- Core utilities: present in `packages/core/src` (Presence, FocusScope, FocusGuards, DismissableLayer, Popper, Arrow, ScrollLock, etc.).
- Primitives: many implemented in `packages/primitives/src/` (see directory listing).
- Styled wrappers: many implemented in `packages/styled/src/`.
- New: `Card` primitive + styled wrapper were scaffolded and exported.

## Headless primitives missing (present in styled but not in primitives)

- skeleton
- badge
- spinner
- alert (non-dialog Alert primitive)
- input
- textarea
- breadcrumb
- pagination
- stepper
- sheet
- drawer
- meter
- copy-button

## Primitives present but styled wrapper mismatch

- menu (primitive exists; styled provides `dropdown-menu` instead)

## DataTable backlog (major feature area)

- virtualization
- column resizing
- column reordering
- column pinning
- column visibility toggle
- row selection (single/multi/range)
- expandable rows
- grouping + aggregation
- editable cells
- server-side adapter
- CSV/JSON export
- toolbar UI (search + filters)
- per-column filter UIs
- empty/loading/error states
- keyboard grid navigation

## Docs / playground / stories

- Storybook stories and MDX docs missing for many components.
- Playground demos need adding for new components.
- Storybook story and MDX docs added for `Card` in `packages/styled/src/card/`.

## CLI / registry

- `npx aura-ui add <name>` scaffolding is placeholder; full CLI templating not implemented.

## Testing / CI / quality

- E2E and visual regression suites need coverage (Playwright, Chromatic or similar).
- Bundle size checks and budget enforcement not configured end-to-end.

## Accessibility

- axe-core audits and manual screen-reader validation pending for many components.

## Per-component Definition-of-Done (reminder)

Each component must have:

- Headless primitive + types + unit tests
- Styled wrapper with `tv()` variants using theme tokens
- Exports from package indices
- Storybook story and MDX docs page
- Playground demo
- Changeset if user-visible
- Pass `pnpm typecheck && pnpm lint && pnpm test`
- WAI-ARIA compliance and keyboard nav

## Next recommended actions (pick one)

1. Re-run `pnpm typecheck && pnpm lint && pnpm test` to capture current failures (I attempted this but the terminal opened in alternate buffer; I can retry or you can paste output).
2. Implement a missing headless primitive (recommended: `skeleton` or `badge`).
3. Add Storybook story + MDX docs for `Card` (done).
4. Investigate and fix failing tests introduced after the Card scaffold.

---

If you want, I will: re-run the checks and debug failing tests now, or start implementing `skeleton` primitive. Which do you prefer?
