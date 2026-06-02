# @structyl/styled

## 1.1.0

### Minor Changes

- 507aac8: All components now accept and forward native HTML attributes to their root element.

  Every styled component (and the primitives they build on) extends the native attributes of its root element and spreads them through — so you can pass `onClick`, `onMouseEnter`, `onFocus`, `onKeyDown`, `className`, `style`, `id`, `tabIndex`, `role`, `aria-*`, `data-*`, etc. to any component and have them land on the rendered DOM node, with `ref` forwarding throughout.
  - Internal event handlers are **composed** with consumer handlers (both fire — no clobbering), and a consumer `className` is **merged** via `cn` rather than dropped.
  - Components whose logical root is a non-DOM config provider (`DatePicker`, `DateRangePicker`, `TimePicker`) expose a `rootProps` prop for forwarding native attributes to their rendered wrapper element.
  - Fixed styled components that previously dropped native attributes or whose prop type didn't include them: `Button` (ButtonSpinner), all `Chart` primitives, `FileUpload.Item`, `Mentions`, `Pagination`, `Popconfirm`, `Skeleton`, `Stat` (TrendBadge), `structyl` Popper, `TagsInput` Tag, `Toast` (Toaster), `Tooltip`, and the date/time pickers.
  - `@structyl/primitives` was audited end-to-end; additionally fixed `Calendar` (`Heading`/`GridHead`/`GridBody`) and `structyl` `ClickAwayListener`. The `@structyl/core` forwarders (`Primitive.*`, `Slot`) already pass every native attribute through, so no core change was required.

### Patch Changes

- Updated dependencies [507aac8]
  - @structyl/primitives@1.1.0

## 1.0.1

### Patch Changes

- Add package metadata and publish with npm provenance.

  Every package now declares `author` (Mohammed Irfanul Alam Tanveer), `repository` (with monorepo `directory`), `homepage` (https://www.structyl.com), and `bugs`. Releases are now published with npm provenance. No runtime/code changes.

- Updated dependencies
- Updated dependencies
  - @structyl/core@1.0.1
  - @structyl/icons@1.0.1
  - @structyl/primitives@1.0.1
  - @structyl/themes@1.1.0
  - @structyl/utils@1.0.1
