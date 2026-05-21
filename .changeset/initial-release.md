---
'@aura-ui/core': minor
'@aura-ui/hooks': minor
'@aura-ui/utils': minor
'@aura-ui/themes': minor
'@aura-ui/primitives': minor
'@aura-ui/styled': minor
'@aura-ui/data-table': minor
'@aura-ui/icons': minor
'@aura-ui/cli': minor
---

Initial public release.

**Foundation utilities** (`@aura-ui/core`): Primitive, Slot, createContext, Portal,
VisuallyHidden, DirectionProvider, Presence, FocusScope, FocusGuards, DismissableLayer,
RovingFocusGroup, Collection, Popper (Floating UI wrapper), Arrow, AccessibleIcon,
ScrollLock.

**Hooks** (`@aura-ui/hooks`): 24 hooks covering controllable state, refs, DOM events,
browser features, and performance utilities.

**Primitives** (`@aura-ui/primitives`): ~50 headless behavior components including
Dialog, AlertDialog, Popover, Tooltip, HoverCard, Toast, DropdownMenu, ContextMenu,
Menubar, NavigationMenu, Select, Combobox, Command, Accordion, Tabs, Collapsible,
RadioGroup, ToggleGroup, Slider, Form, Calendar, DatePicker, DateRangePicker,
TimePicker, ColorPicker, FileUpload, NumberField, OneTimePasswordField,
PasswordToggleField, ScrollArea, Toolbar, Resizable, Carousel, Tree, Editable,
TagsInput, Mentions, and more.

**Styled wrappers** (`@aura-ui/styled`): Tailwind-styled versions of every primitive,
plus styled-only Card, Badge, Skeleton, Spinner, Alert, Breadcrumb, Pagination,
Stepper, Sheet, Drawer, CircularProgress, Meter, CopyButton.

**Theming** (`@aura-ui/themes`): `<ThemeProvider>` with runtime CSS-variable theme
switching across three built-in themes (slate, zinc, rose) and any custom theme.

**DataTable** (`@aura-ui/data-table`): Full-featured data grid built on TanStack Table
with virtualization, column resize/pin/reorder/visibility, multi/single/range row
selection, expandable rows, grouping, editable cells, server-side adapter, CSV/JSON
export, toolbar, filter UI, and grid keyboard navigation.

**CLI** (`@aura-ui/cli`): `npx aura-ui init` + `npx aura-ui add <component>` with
transitive dependency resolution from a real registry.
