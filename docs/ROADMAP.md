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

## 🔄 Phase 1 — Core utilities & hooks (in progress)

### Core (`@your-lib/core`)
- [ ] `Primitive` — Polymorphic component base
- [ ] `Slot` — `asChild` implementation
- [ ] `createContextScope` — Scoped React contexts
- [ ] `Portal`
- [ ] `Presence`
- [ ] `FocusScope`
- [ ] `FocusGuards`
- [ ] `DismissableLayer`
- [ ] `RovingFocusGroup`
- [ ] `Collection`
- [ ] `DirectionProvider`
- [ ] `VisuallyHidden`
- [ ] `Arrow`
- [ ] `AccessibleIcon`
- [ ] `Popper` (wraps Floating UI)

### Hooks (`@your-lib/hooks`)
- [ ] State: `useControllableState`, `useToggle`, `useBoolean`, `useCounter`, `useStep`, `usePrevious`
- [ ] DOM: `useClickOutside`, `useEventListener`, `useHover`, `useFocus`, `useKeyPress`, `useLongPress`, `useIntersectionObserver`, `useResizeObserver`
- [ ] Browser: `useMediaQuery`, `useBreakpoint`, `useIsMobile`, `useDarkMode`, `useLocalStorage`, `useSessionStorage`, `useCopyToClipboard`, `useNetworkState`
- [ ] Performance: `useDebounce`, `useThrottle`, `useDebouncedCallback`, `useThrottledCallback`
- [ ] Refs: `useComposedRefs`, `useCallbackRef`, `useLatest`
- [ ] Async: `useFetch`, `useAsync`, `useInterval`, `useTimeout`, `useCountdown`
- [ ] Utility: `useId`, `useMount`, `useUnmount`, `useUpdateEffect`, `useIsomorphicLayoutEffect`, `useWindowSize`, `useScrollPosition`, `useScrollLock`, `useMeasure`, `useHotkeys`

### Utils (`@your-lib/utils`)
- [ ] Class utilities: `cn`, `mergeProps`, `composeEventHandlers`
- [ ] DOM utilities: `getOwnerDocument`, `getActiveElement`, `getFocusableElements`
- [ ] Type guards: `isFunction`, `isObject`, `isString`, `isNumber`, `isArray`, `isNullish`, `isEmpty`
- [ ] Array utilities: `chunk`, `groupBy`, `sortBy`, `uniqueBy`, `partition`, `range`
- [ ] Object utilities: `pick`, `omit`, `merge`, `deepEqual`, `get`, `set`
- [ ] String utilities: `capitalize`, `camelCase`, `kebabCase`, `snakeCase`, `truncate`, `slugify`
- [ ] Number utilities: `clamp`, `roundTo`, `formatNumber`, `formatCurrency`, `formatPercent`
- [ ] Date utilities: `formatDate`, `formatRelative`, `parseDate`, `isToday`, `addDays`, `diffDays`
- [ ] A11y utilities: `announce`, `trapFocus`, `restoreFocus`

---

## 📐 Phase 2 — Tier 1 components (foundation)

Simple, foundational components:
- [ ] Label
- [ ] Separator
- [ ] AspectRatio
- [ ] VisuallyHidden
- [ ] Avatar
- [ ] Progress
- [ ] CircularProgress
- [ ] Spinner
- [ ] Toggle
- [ ] Switch
- [ ] Badge (styled only)
- [ ] Card (styled only)
- [ ] Skeleton (styled only)

---

## 🎛️ Phase 3 — Tier 2 components (form basics)

- [ ] Input (styled only — wraps native)
- [ ] Textarea
- [ ] Button (styled only)
- [ ] Checkbox
- [ ] RadioGroup
- [ ] Slider
- [ ] Collapsible
- [ ] Accordion
- [ ] Tabs
- [ ] ToggleGroup

---

## 🪟 Phase 4 — Tier 3 components (overlays)

- [ ] Popover
- [ ] Tooltip
- [ ] HoverCard
- [ ] Dialog
- [ ] AlertDialog
- [ ] Sheet
- [ ] Drawer
- [ ] Toast

---

## 🧭 Phase 5 — Tier 4 components (complex)

- [ ] DropdownMenu
- [ ] ContextMenu
- [ ] Menubar
- [ ] NavigationMenu
- [ ] Select
- [ ] Combobox
- [ ] Command (cmdk-style)
- [ ] OneTimePasswordField
- [ ] PasswordToggleField
- [ ] NumberField
- [ ] Form

---

## 📅 Phase 6 — Date/time components

- [ ] Calendar
- [ ] DatePicker
- [ ] TimePicker
- [ ] DateRangePicker

---

## 🎨 Phase 7 — Specialty components

- [ ] ColorPicker
- [ ] FileUpload
- [ ] ScrollArea
- [ ] Resizable
- [ ] Carousel
- [ ] Tree
- [ ] Editable
- [ ] TagsInput
- [ ] Mentions
- [ ] CopyButton
- [ ] Toolbar
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Stepper
- [ ] Alert
- [ ] Meter

---

## 📊 Phase 8 — DataTable (the star)

- [ ] Headless engine (built on TanStack Table)
- [ ] Basic table rendering
- [ ] Column definitions with type-safe accessors
- [ ] Sorting (single + multi-column)
- [ ] Filtering (per-column + global)
- [ ] Pagination (offset + cursor)
- [ ] Row selection (single, multi, range)
- [ ] Column resizing
- [ ] Column reordering
- [ ] Column pinning
- [ ] Column visibility toggle
- [ ] Virtual scrolling (via TanStack Virtual)
- [ ] Expandable rows
- [ ] Grouping + aggregation
- [ ] Editable cells
- [ ] Keyboard navigation (grid pattern)
- [ ] Server-side data adapter
- [ ] CSV export
- [ ] JSON export
- [ ] Toolbar component
- [ ] Filter UI components
- [ ] Pagination UI
- [ ] Empty state
- [ ] Loading state
- [ ] Error state

---

## 🛠️ Phase 9 — Tooling & launch

- [ ] CLI installer (`npx your-lib add <component>`)
- [ ] Theme generator UI in docs
- [ ] Migration guides (from Radix, MUI, Chakra)
- [ ] Comparison tables
- [ ] Bundle size badges
- [ ] Performance benchmarks
- [ ] Full accessibility audit
- [ ] v1.0 launch

---

## Beyond v1.0

Ideas under consideration (not committed):

- [ ] Visual editor / Figma plugin
- [ ] Form library (built on @tanstack/react-form)
- [ ] Chart components
- [ ] Rich text editor (Tiptap wrapper)
- [ ] Animation primitives
- [ ] Vue / Solid ports
- [ ] React Native parity

---

## Versioning

- v0.x — Pre-1.0, breaking changes allowed
- v1.0 — Stable API, semver enforced
- LTS — Each major version supported for 18 months
