---
'@aura-ui/data-table': minor
'@aura-ui/core': patch
'@aura-ui/primitives': patch
'@aura-ui/styled': patch
---

**DataTable: complete professional grid feature set — 20+ new capabilities across 6 phases.**

### Column Definition API
New `DataTableColumnDef` type replaces the raw `ColumnDef` with a flat, ergonomic shape:
- `field` / `fieldId` — accessor key and stable DB identifier
- `headerName` — string header alias
- `type` — `'string' | 'number' | 'date' | 'dateTime' | 'boolean'` with alignment defaults
- `align` — explicit `'left' | 'center' | 'right'` for header and cells
- `flex` — column stretches to fill remaining width proportionally
- `valueGetter` / `valueSetter` — accessor + write-back hook for inline editing
- `renderCell` / `renderHeader` — custom renderer aliases for `cell` / `header`
- `description` — tooltip shown on column header hover
- `filterOperators` — per-column filter operator override

### Phase 1 — Tree data, copy/paste, density, toolbar
- **`treeData`** — depth-indented tree with Expand All / Collapse All
- **`enableCopyPaste`** — Ctrl+C copies selected rows as TSV (Excel/Sheets compatible)
- **`density` / `enableDensityToggle`** — compact, standard, comfortable row padding
- **`toolbarActions`** — typed `DataTableToolbarAction[]` with tooltip support
- **`onRefresh`** — Refresh button in toolbar
- **`DataTableToolbarButton`** — composable toolbar button for custom toolbar slots
- **`exportToCSV` / `exportToJSON`** — utility exports with `onlySelected` option

### Phase 2 — Pagination overhaul, bulk actions, row actions, row/column copy, custom slots
- **Pagination** — page-number picker, rows-per-page selector, total count, icon-only navigation
- **`bulkActions`** — floating action panel when rows are selected; fully user-defined
- **`rowActionMenu`** — per-row ⋮ dropdown with items, separators, disabled/hidden guards
- **`rowActionButtons`** — inline action buttons with conditional visibility
- **`enableRowCopy`** — Copy row option in the row pinning context menu
- **`enableColumnCopy`** — Copy column option in column menu (newline-separated values)
- **`slots`** — `NoRowsOverlay`, `NoResultsOverlay` and all built-in sub-components are replaceable

### Phase 3 — Conditional formatting, row numbers, striped rows, multi-sort indicators, cell tooltips, state persistence
- **`getCellClassName`** — per-cell Tailwind class based on `Cell` + `Row` values
- **`enableRowNumbers`** — fixed non-sortable, non-hideable row-number column
- **`striped`** — alternating row background using `bg-muted/30`
- **Multi-sort priority badges** — Shift+click multiple columns; ①②③ appear on sort icons
- **`enableCellTooltip`** — native `title` tooltip on truncated cells
- **`stateKey`** — auto-saves and restores sort, filters, column visibility/sizing/order, pagination, density to `localStorage`

### Phase 4 — Status bar, fullscreen, context menus, column auto-size
- **`enableStatusBar`** — row count + selected count bar below the table
- **`enableFullscreen`** — toolbar button to expand grid to fill viewport (`fixed inset-0`)
- **`onFullscreenChange`** — callback fired on fullscreen toggle
- **`onCellContextMenu`** / **`onRowContextMenu`** — right-click handlers for spreadsheet-style menus
- **`enableColumnAutoSize`** — double-click resize handle to fit column to widest cell

### Phase 5 — Per-row loading, print
- **`loadingRowIds`** — dims and disables individual rows during async mutations
- **`onPrint`** — Print button in toolbar that calls `window.print()` after your callback

### Phase 6 — Quick filters, locked columns, mobile card view
- **`quickFilterColumns`** — per-column search input rendered below each header
- **`lockedColumns`** — prevent specified columns from being hidden, reordered, or resized
- **`mobileBreakpoint`** — renders a label/value card list below `sm` / `md` / `lg` breakpoint

### Round 1 — Extended cell renderers, column groups, row status, clipboard paste, Excel export, undo/redo

- **Built-in cell types extended**: `badge` (with `badgeMap`), `currency` (`currencyCode`, `currencyLocale`), `progress` (`progressMax`), `sparkline` (`sparklineData`, `sparklineType`), `rating` (`ratingMax`), `link` (`linkHref`, `linkTarget`), `avatar` (`avatarSrc`)
- **`columnGroups`** — multi-level column headers via `{ id, headerName, columnIds }` groupings
- **`getRowStatus`** — colored left-border stripe per row: `'success' | 'warning' | 'error' | 'info'`
- **`rowHeight`** — uniform number or `(row, index) => number` for per-row custom heights
- **`enableFilterChips`** — active column filters rendered as removable chips above the table
- **`enablePaste`** — Ctrl+V pastes TSV from clipboard into editable cells by column position
- **`exportToXLSX`** — new utility export function producing a real `.xlsx` file via SheetJS
- **`editMode`** — `'click'` (default) or `'dblclick'` for EditableCell activation
- **`enableUndoRedo`** — Ctrl+Z / Ctrl+Y undo/redo stack for inline cell edits
- **`onCellEditCommit`** — callback fired with `{ field, row, oldValue, newValue }` on each commit
- **`dirtyRows` / `onDirtyRowsChange`** — tracks which row IDs have unsaved edits

### Round 2 — Cell range selection, tool panel, live data, async detail panel, print styles

- **`enableCellSelection`** — click-drag or Shift+click to select a rectangular cell range; `onCellSelectionChange` callback receives `DataTableCellSelection`
- **`enableToolPanel`** — collapsible right-side panel with Columns, Filters, Stats tabs; `defaultToolPanelTab` controls the default open tab
- **`enableLiveData`** — cells that change value animate with a flash highlight; pair with `liveDataKey` (row identity) and `onLiveDataUpdate`
- **`loadDetailPanel`** — `(row) => Promise<ReactNode>` — async per-row detail panels with LRU cache (`detailPanelCacheSize`)
- **`enablePrintStyles`** — injects `@media print` CSS that hides toolbar/pagination and expands the grid to full page width
- New exported types: `DataTableCellSelection`, `ColumnStats`

### Round 3 — Pivot mode, saved views, full ARIA grid, header stats, validation, column formatting

- **`enablePivot` / `pivotConfig`** — client-side pivot aggregation with a config drawer; `DataTablePivotConfig` type (`rowGroupField`, `pivotField`, `valueField`, `aggregation`)
- **`enableSavedViews` / `savedViews`** — right-side drawer to save, load, update and delete named table states; `DataTableSavedView` type
- **Full ARIA grid** — `role="grid"` with `aria-rowcount`, `aria-colcount`, `aria-rowindex`, `aria-colindex`, `aria-selected`; `ariaLabel` / `ariaLabelledBy` props
- **`enableHeaderStats` / `headerStatsConfig`** — additional `<tr>` in `<thead>` showing count/sum/avg/min/max/unique per column
- **`enableValidation`** — column-level `displayValidate: (value, row) => string | undefined` shows red cell outline + error tooltip; `onValidationChange` streams all current errors
- **Column value formatting** — `locale` (table-level), `dateFormat`, `numberFormat`, `timezone` on column defs for `Intl`-based formatting of date and number columns
- New exported types: `DataTablePivotConfig`, `DataTableSavedView`, `DataTableValidationError`

### Docs + playground
All 40+ features have live interactive preview blocks in the docs site and corresponding Storybook stories (36 stories total).
