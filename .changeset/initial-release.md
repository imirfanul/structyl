---
'@your-lib/core': minor
'@your-lib/hooks': minor
'@your-lib/utils': minor
'@your-lib/themes': minor
'@your-lib/primitives': minor
'@your-lib/styled': minor
'@your-lib/data-table': minor
'@your-lib/icons': minor
'@your-lib/cli': minor
---

Initial public release.

**Foundation utilities** (`@your-lib/core`): Primitive, Slot, createContext, Portal,
VisuallyHidden, DirectionProvider, Presence, FocusScope, FocusGuards, DismissableLayer,
RovingFocusGroup, Collection, Popper (Floating UI wrapper), Arrow, AccessibleIcon,
ScrollLock.

**Hooks** (`@your-lib/hooks`): 24 hooks covering controllable state, refs, DOM events,
browser features, and performance utilities.

**Primitives** (`@your-lib/primitives`): ~50 headless behavior components including
Dialog, AlertDialog, Popover, Tooltip, HoverCard, Toast, DropdownMenu, ContextMenu,
Menubar, NavigationMenu, Select, Combobox, Command, Accordion, Tabs, Collapsible,
RadioGroup, ToggleGroup, Slider, Form, Calendar, DatePicker, DateRangePicker,
TimePicker, ColorPicker, FileUpload, NumberField, OneTimePasswordField,
PasswordToggleField, ScrollArea, Toolbar, Resizable, Carousel, Tree, Editable,
TagsInput, Mentions, and more.

**Styled wrappers** (`@your-lib/styled`): Tailwind-styled versions of every primitive,
plus styled-only Card, Badge, Skeleton, Spinner, Alert, Breadcrumb, Pagination,
Stepper, Sheet, Drawer, CircularProgress, Meter, CopyButton.

**Theming** (`@your-lib/themes`): `<ThemeProvider>` with runtime CSS-variable theme
switching across three built-in themes (slate, zinc, rose) and any custom theme.

**DataTable** (`@your-lib/data-table`): Full-featured data grid built on TanStack Table
with virtualization, column resize/pin/reorder/visibility, multi/single/range row
selection, expandable rows, grouping, editable cells, server-side adapter, CSV/JSON
export, toolbar, filter UI, and grid keyboard navigation.

**CLI** (`@your-lib/cli`): `npx your-lib init` + `npx your-lib add <component>` with
transitive dependency resolution from a real registry.
