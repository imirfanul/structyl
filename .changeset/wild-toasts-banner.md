---
'@structyl/styled': minor
---

Toast and new presentational components.

- **Toast**: the toast store now uses React's `useSyncExternalStore` (concurrent-safe, no fired-before-mount gap, stable SSR snapshot). Added a unified `position` prop (`'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`) on `toast(...)` options and `<Toaster position>`, plus the exported `splitPosition` helper and `ToastPosition` type. The existing `horizontal`/`vertical` props continue to work.
- **New components**: `Banner` (full-width announcement bar), `CodeBlock` (filename header, line numbers, built-in copy button), `DescriptionList` (`dl`/`dt`/`dd` compound), and `Marquee` (CSS-only scrolling strip). A `marquee`/`marquee-vertical` keyframe + animation were added to the Tailwind preset.
