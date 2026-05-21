# Roadmap

This is a living document. Open an issue to propose changes.

---

## ✅ Phase 0 — Foundation (complete)

- [x] Monorepo scaffold
- [x] Tooling (TypeScript, ESLint, Prettier, Vitest, Playwright)
- [x] CI/CD pipelines
- [x] Documentation site skeleton
- [x] Theme system foundation
- [x] Core utilities (Slot, Primitive, createContextScope)

---

## ✅ Phase A — Foundation utilities (complete)

### `@your-lib/core`
- [x] `Primitive`, `Slot`, `createContext`, `Portal`, `VisuallyHidden`, `DirectionProvider`
- [x] `Presence` — animation-aware mount/unmount
- [x] `FocusScope` — focus trap with tab cycling
- [x] `FocusGuards` — counted singleton sentinels
- [x] `DismissableLayer` — Esc + outside pointer/focus with layer stack
- [x] `RovingFocusGroup` + `RovingFocusItem` — arrow-key roving tabIndex
- [x] `Collection` — DOM-ordered children factory
- [x] `Popper` — Floating UI wrapper
- [x] `Arrow` — SVG arrow
- [x] `AccessibleIcon`
- [x] `ScrollLock`

### `@your-lib/hooks` (24)
- [x] useControllableState, useToggle, useBoolean, useCounter, usePrevious
- [x] useComposedRefs, useCallbackRef, useLatest
- [x] useClickOutside, useEventListener, useKeyPress
- [x] useMediaQuery, useLocalStorage, useCopyToClipboard, useDarkMode
- [x] useDebounce, useThrottle, useId, useMount, useUnmount
- [x] useUpdateEffect, useIsomorphicLayoutEffect, useWindowSize, useHotkeys

---

## ✅ Phase B — Atoms (complete)

- [x] AspectRatio (headless + styled)
- [x] Avatar (`Root`, `Image`, `Fallback`)
- [x] Progress (`Root`, `Indicator`)
- [x] Skeleton, Badge, Spinner — styled-only
- [x] Card (compound)
- [x] Alert (compound)

---

## ✅ Phase C — Form basics (complete)

- [x] Input, Textarea — styled-only
- [x] RadioGroup — uses RovingFocusGroup
- [x] ToggleGroup — single + multiple, optional roving focus
- [x] Slider — pointer + keyboard, multi-thumb, horizontal/vertical, RTL
- [x] Form — Radix-style declarative validation

---

## ✅ Phase D — Disclosure & navigation (complete)

- [x] Collapsible, Accordion (single + multiple)
- [x] Tabs (automatic + manual activation)
- [x] Breadcrumb, Pagination, Stepper — styled-only

---

## ✅ Phase E — Overlays (complete)

- [x] Dialog (rebuilt on FocusScope + DismissableLayer + ScrollLock + Presence)
- [x] AlertDialog (subclass of Dialog)
- [x] Sheet, Drawer (styled variants of Dialog)
- [x] Popover, Tooltip (with shared Provider), HoverCard
- [x] Toast (viewport + queue + swipe-to-dismiss + auto-dismiss timer)

---

## ✅ Phase F — Complex compound (complete)

- [x] Shared `Menu` primitive (typeahead, pointer-grace area)
- [x] DropdownMenu, ContextMenu, Menubar (thin wrappers over Menu)
- [x] NavigationMenu (delayed open/close, viewport, indicator)
- [x] Select (listbox + BubbleSelect for form submission)
- [x] Combobox (searchable, keyboard-navigable)
- [x] Command (cmdk-style with filter scoring)

---

## ✅ Phase G — Specialty form (complete)

- [x] OneTimePasswordField (paste support, hidden form input)
- [x] PasswordToggleField, NumberField (Intl formatting, step, wheel)
- [x] Calendar (zero-dep, single/range/multiple, keyboard nav, RTL)
- [x] DatePicker, DateRangePicker (Calendar in Popover)
- [x] TimePicker (segmented spinbutton)
- [x] ColorPicker (HSV area + hue/alpha sliders)
- [x] FileUpload (dropzone, validation)

---

## ✅ Phase H — Feedback & misc (complete)

- [x] CircularProgress, Meter — styled-only
- [x] ScrollArea (custom scrollbars, hover/scroll/always modes)
- [x] Toolbar (RovingFocusGroup-based)
- [x] Resizable (pointer + keyboard, panel sizing)
- [x] Carousel (orientation, loop, autoplay)
- [x] Tree (expand/collapse, keyboard nav, selection)
- [x] Editable (preview/input toggle, blur/enter submit modes)
- [x] TagsInput (delimiters, paste split)
- [x] Mentions (@-trigger, suggestion filtering)
- [x] CopyButton (clipboard + Check feedback)

---

## ✅ Phase I — DataTable (complete)

- [x] Virtual scrolling (TanStack Virtual)
- [x] Column resizing, reordering, pinning, visibility
- [x] Row selection (single/multi/range), expandable rows
- [x] Grouping + aggregation
- [x] Editable cells (`EditableCell`)
- [x] Server-side adapter (`serverSide` prop)
- [x] CSV + JSON export
- [x] Toolbar, per-column filter UI, visibility toggle
- [x] Loading / error / empty states
- [x] Keyboard navigation (grid pattern)

---

## 🔄 Phase J — Tooling & launch (in progress)

- [x] J1 Storybook config (`apps/playground/.storybook/`)
- [🟡] J2 Stories per component (4 hand-written + 58 stubs — flesh out as DoD)
- [x] J3 MDX docs pages (63 components)
- [x] J4 Real CLI registry with transitive dependency resolution
- [x] J5 Theme generator UI at `/themes`
- [x] J6 Migration guides (Radix, MUI, Chakra)
- [x] J7 size-limit config + CI step
- [ ] J8 Visual regression (Chromatic / Playwright screenshots)
- [ ] J9 Full a11y audit (axe in CI + manual NVDA + VoiceOver passes)
- [ ] J10 v1.0 release (publish via Changesets pipeline)

---

## 📦 Component count summary

| Phase | Built | Notes |
|---|---|---|
| A | 10 utilities | foundation |
| B | 8 atoms | |
| C | 6 form basics | |
| D | 6 disclosure & nav | |
| E | 8 overlays (incl. Dialog rebuild) | |
| F | 7 complex compound + shared Menu | |
| G | 9 specialty form | incl. zero-dep Calendar |
| H | 11 feedback & misc | |
| I | DataTable + 16 features | |
| **Total** | **~75 components** | |

---

## What's left

- Iteratively expand the auto-generated story stubs and MDX docs with API tables + live examples.
- Convert the `it.skip` axe-core placeholders in component tests into real default renders.
- Storybook visual regression in CI.
- v1.0 publish.
