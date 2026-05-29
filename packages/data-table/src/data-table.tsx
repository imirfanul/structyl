'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Cell,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type ExpandedState,
  type FilterFn,
  type GroupingState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table,
  type VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  AlignJustify,
  BarChart2,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Columns3,
  Download,
  FileSpreadsheet,
  Filter,
  GitBranch,
  HelpCircle,
  Maximize2,
  Minimize2,
  Printer,
  RefreshCw,
  Trash2,
  X,
} from '@aura-ui/icons';
import * as XLSX from 'xlsx';
import { Button, Checkbox, ColorPicker, Combobox, Drawer, DropdownMenu, Input, Popover, Select, Tooltip } from '@aura-ui/styled';
import { type HsvaColor, hsvaToHex } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

export type DataTableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue>;
export type DataTableFilterOperator =
  | 'contains'
  | 'equals'
  | 'startsWith'
  | 'endsWith'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'empty'
  | 'notEmpty';
export type DataTableFilterLogic = 'and' | 'or';
export type DataTableAggregation =
  | 'sum'
  | 'avg'
  | 'min'
  | 'max'
  | 'count'
  | ((values: unknown[], rows: Row<unknown>[]) => React.ReactNode);
export type DataTableLoadingVariant = 'text' | 'skeleton' | 'spinner';

export interface DataTableFilterRule {
  id: string;
  columnId: string;
  operator: DataTableFilterOperator;
  value?: unknown;
}

export type DataTableFilterItem = DataTableFilterRule | DataTableFilterGroup;

export interface DataTableFilterGroup {
  id: string;
  logic: DataTableFilterLogic;
  items: DataTableFilterItem[];
}

export interface ServerDataState {
  pagination?: PaginationState;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
  globalFilter?: string;
  advancedFilter?: DataTableFilterGroup;
  rowSelection?: RowSelectionState;
}

export interface ServerData<TData> {
  rows: TData[];
  total: number;
}

export interface DataTableLocaleText {
  searchPlaceholder: string;
  filters: string;
  filterColumnLabel: string;
  filterOperatorLabel: string;
  filterValueLabel: string;
  filterLogicLabel: string;
  addFilter: string;
  addFilterGroup: string;
  clearFilters: string;
  removeFilter: string;
  removeFilterGroup: string;
  columns: string;
  columnMenu: string;
  sortAsc: string;
  sortDesc: string;
  clearSort: string;
  hideColumn: string;
  pinLeft: string;
  pinRight: string;
  unpin: string;
  groupBy: string;
  ungroup: string;
  selectColumn: string;
  selectedRows: (selected: number, total: number) => string;
  page: (page: number, pageCount: number) => string;
  previous: string;
  next: string;
  noResults: string;
  loading: string;
  loadingMore: string;
  error: string;
  addRow: string;
  cancel: string;
  save: string;
  rowActions: string;
  rowTotal: string;
  pinRowTop: string;
  pinRowBottom: string;
  total: string;
  expandRow: string;
  collapseRow: string;
  expandAll: string;
  collapseAll: string;
  copyRows: string;
  copyRow: string;
  copyColumn: string;
  density: string;
  densityCompact: string;
  densityStandard: string;
  densityComfortable: string;
  refresh: string;
  exportCsv: string;
  exportJson: string;
  noRows: string;
  rowsPerPage: string;
  totalRows: (count: number) => string;
  goToPage: string;
  firstPage: string;
  lastPage: string;
  bulkActionsTitle: (count: number) => string;
  clearSelection: string;
  // Phase 3
  rowNumberHeader: string;
  statusBarRows: (count: number) => string;
  statusBarSelected: (count: number) => string;
  printTitle: string;
  enterFullscreen: string;
  exitFullscreen: string;
  autoSizeColumn: string;
  quickFilterPlaceholder: string;
  lockColumn: string;
  unlockColumn: string;
  // Export
  export?: string;
  exportCSV?: string;
  exportJSON?: string;
  exportSelectedCSV?: string;
  // Conditional formatting
  conditionalFormatting?: string;
}

export interface DataTableInlineCreate {
  fields: Array<{
    id: string;
    label?: React.ReactNode;
    type?: 'text' | 'number';
    placeholder?: string;
  }>;
  onAdd: (values: Record<string, string>) => void;
  label?: React.ReactNode;
}

export interface DataTableRowTotals<TData> {
  id?: string;
  header?: React.ReactNode;
  columns?: string[];
  format?: (value: number, row: Row<TData>) => React.ReactNode;
}

export interface DataTableRowPinningState {
  top?: string[];
  bottom?: string[];
}

export type DataTableColumnType =
  | 'string'
  | 'number'
  | 'date'
  | 'dateTime'
  | 'boolean'
  | 'badge'
  | 'progress'
  | 'link'
  | 'avatar'
  | 'currency'
  | 'sparkline'
  | 'rating';
export type DataTableDensity = 'compact' | 'standard' | 'comfortable';

export interface DataTableCellParams<TData, TValue = unknown> {
  row: Row<TData>;
  value: TValue;
  field: string;
}

export interface DataTableHeaderParams<TData, TValue = unknown> {
  column: Column<TData, TValue>;
}

export interface DataTableToolbarAction<TData = unknown> {
  id: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  tooltip?: string;
  onClick?: (table: Table<TData>) => void;
  render?: (table: Table<TData>) => React.ReactNode;
  disabled?: boolean;
}

/* ─── Slot prop interfaces ─────────────────────────────────────────── */

export interface DataTableColumnMenuSlotProps<TData> {
  column: Column<TData, unknown>;
  table: Table<TData>;
}

export interface DataTableSearchSlotProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

export interface DataTableFilterSlotProps<TData> {
  table: Table<TData>;
  filter?: DataTableFilterGroup;
  onFilterChange: (filter: DataTableFilterGroup | undefined) => void;
  localeText: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
}

export interface DataTableLoadingSkeletonSlotProps {
  rows: number;
  columns: number;
}

export interface DataTableLoadingOverlaySlotProps {
  text: string;
  variant: DataTableLoadingVariant;
}

/** Slot overrides — provide a component to replace any built-in sub-component. */
export interface DataTableSlots<TData> {
  /** Replace the entire toolbar section. Receives the live TanStack table instance. */
  Toolbar?: React.ComponentType<{ table: Table<TData>; localeText: DataTableLocaleText }>;
  /** Replace the pagination section. */
  Pagination?: React.ComponentType<{
    table: Table<TData>;
    localeText: DataTableLocaleText;
    pageSizeOptions: number[];
  }>;
  /** Replace the column context menu dropdown. */
  ColumnMenu?: React.ComponentType<DataTableColumnMenuSlotProps<TData>>;
  /** Replace the advanced filter button/panel. */
  Filter?: React.ComponentType<DataTableFilterSlotProps<TData>>;
  /** Replace the global search input. */
  Search?: React.ComponentType<DataTableSearchSlotProps>;
  /** Replace the skeleton loading rows. */
  LoadingSkeleton?: React.ComponentType<DataTableLoadingSkeletonSlotProps>;
  /** Replace the loading overlay (spinner / text). */
  LoadingOverlay?: React.ComponentType<DataTableLoadingOverlaySlotProps>;
  /** Shown when the data source has no rows (before any filter). */
  NoRowsOverlay?: React.ComponentType;
  /** Shown when search / filter produce zero results from a non-empty dataset. */
  NoResultsOverlay?: React.ComponentType;
}

/* ─── Bulk actions ─────────────────────────────────────────────────── */

export interface DataTableBulkAction<TData = unknown> {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick: (selectedRows: Row<TData>[], table: Table<TData>) => void;
  disabled?: boolean | ((selectedRows: Row<TData>[]) => boolean);
  variant?: 'default' | 'destructive';
}

/* ─── Structured row action items ──────────────────────────────────── */

export interface DataTableRowActionItem<TData = unknown> {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick: (row: Row<TData>) => void;
  disabled?: boolean | ((row: Row<TData>) => boolean);
  /** Hide this item for specific rows. */
  hidden?: boolean | ((row: Row<TData>) => boolean);
  variant?: 'default' | 'destructive';
  /** Insert a visual separator above this item. */
  separator?: boolean;
}

/**
 * Aura-extended column definition. All properties are optional so you can use
 * just `field` + `headerName` without satisfying TanStack's union requirements.
 * `normalizeColumnDefs` converts this to a proper TanStack `ColumnDef` before
 * passing it to `useReactTable`.
 */
export type DataTableColumnDef<TData, TValue = unknown> = {
  // ── Aura extensions ─────────────────────────────────────────────────
  /** Field key on the data object — maps to `accessorKey`. */
  field?: string;
  /** Stable DB identifier distinct from the display field. */
  fieldId?: string;
  /** Human-readable header label — maps to `header` when a string. */
  headerName?: string;
  /** Data type — drives alignment, filter operators, and format. */
  type?: DataTableColumnType;
  /** Horizontal alignment for header and cells. */
  align?: 'left' | 'center' | 'right';
  /** Flex grow factor; column fills remaining width proportionally. */
  flex?: number;
  /** Read value from a row — maps to `accessorFn`. */
  valueGetter?: (row: TData) => TValue;
  /** Write an edited value back (used by inline editing). */
  valueSetter?: (row: TData, value: TValue, rowIndex: number) => void;
  /** Validation function for inline editing — return an error message string or undefined. */
  validate?: (value: unknown, row: TData) => string | undefined;
  /** Validation function applied to display-mode cells — return an error message or undefined. */
  displayValidate?: (value: unknown, row: TData) => string | undefined;
  /** Mark column as inline-editable. */
  editable?: boolean;
  // ── Feature 6: Column value formatting ──────────────────────────────
  /** Locale for Intl formatting of this column, e.g. 'en-US', 'de-DE'. Overrides the table-level locale. */
  locale?: string;
  /** DateTimeFormat options for date / dateTime columns. */
  dateFormat?: Intl.DateTimeFormatOptions;
  /** NumberFormat options for number / currency columns. */
  numberFormat?: Intl.NumberFormatOptions;
  /** IANA timezone for dateTime columns, e.g. 'America/New_York'. */
  timezone?: string;
  // ── Extended column type fields ──────────────────────────────────────
  /** Badge map: value → { label?, color?, textColor? }. Used when type='badge'. */
  badgeMap?: Record<string, { label?: string; color?: string; textColor?: string }>;
  /** ISO currency code, e.g. 'USD'. Used when type='currency'. */
  currencyCode?: string;
  /** Locale for Intl.NumberFormat, e.g. 'en-US'. Used when type='currency'. */
  currencyLocale?: string;
  /** Href for link cells. String = static, function = computed from value+row. */
  linkHref?: string | ((value: unknown, row: TData) => string);
  /** Target attribute for link cells. */
  linkTarget?: '_blank' | '_self';
  /** Function returning image URL from value+row. Used when type='avatar'. */
  avatarSrc?: (value: unknown, row: TData) => string;
  /** Function returning number array for sparkline chart. Used when type='sparkline'. */
  sparklineData?: (row: TData) => number[];
  /** Sparkline chart variant. */
  sparklineType?: 'line' | 'bar' | 'area';
  /** Max value for progress bar. Default 100. Used when type='progress'. */
  progressMax?: number;
  /** Max star count for rating. Default 5. Used when type='rating'. */
  ratingMax?: number;
  /** Custom cell renderer — maps to `cell`. */
  renderCell?: (params: DataTableCellParams<TData, TValue>) => React.ReactNode;
  /** Custom header renderer — maps to `header`. */
  renderHeader?: (params: DataTableHeaderParams<TData, TValue>) => React.ReactNode;
  /** Tooltip shown on the column header. */
  description?: string;
  /** Override the default filter operators for this column. */
  filterOperators?: DataTableFilterOperator[];
  // ── TanStack ColumnDef pass-through (all optional) ──────────────────
  id?: string;
  accessorKey?: string;
  accessorFn?: (originalRow: TData, index: number) => TValue;
  header?: ColumnDef<TData, TValue>['header'];
  cell?: ColumnDef<TData, TValue>['cell'];
  footer?: ColumnDef<TData, TValue>['footer'];
  columns?: DataTableColumnDef<TData, TValue>[];
  size?: number;
  minSize?: number;
  maxSize?: number;
  enableSorting?: boolean;
  enableHiding?: boolean;
  enableResizing?: boolean;
  enableColumnFilter?: boolean;
  enableGlobalFilter?: boolean;
  enableGrouping?: boolean;
  enablePinning?: boolean;
  enableMultiSort?: boolean;
  sortDescFirst?: boolean;
  invertSorting?: boolean;
  meta?: object;
  getGroupingValue?: (row: TData) => unknown;
};

export interface DataTableConditionalRule {
  id: string;
  columnId: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'gt' | 'gte' | 'lt' | 'lte' | 'empty' | 'notEmpty';
  value?: string;
  backgroundColor?: string;
  textColor?: string;
}

// ── Round 2 types ────────────────────────────────────────────────────

/** Cell selection range for `enableCellSelection`. */
export type DataTableCellSelection = {
  startRowIndex: number;
  startColIndex: number;
  endRowIndex: number;
  endColIndex: number;
};

// ── Round 3 types ────────────────────────────────────────────────────

/** Pivot table configuration. */
export type DataTablePivotConfig = {
  /** Column whose unique values become row headers. */
  rowGroupField: string;
  /** Column whose unique values become column headers. */
  pivotField: string;
  /** Column whose values are aggregated in each cell. */
  valueField: string;
  /** Aggregation function applied to each pivot cell. */
  aggregation: 'count' | 'sum' | 'avg' | 'min' | 'max';
};

/** A saved snapshot of the table's display state. */
export type DataTableSavedView = {
  id: string;
  name: string;
  /** ISO date string. */
  createdAt: string;
  state: {
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    globalFilter?: string;
    columnVisibility?: VisibilityState;
    columnOrder?: ColumnOrderState;
    columnSizing?: ColumnSizingState;
    columnPinning?: ColumnPinningState;
    density?: DataTableDensity;
    grouping?: GroupingState;
    conditionalFormattingRules?: DataTableConditionalRule[];
  };
};

/** A cell-level validation error produced by `displayValidate`. */
export type DataTableValidationError = {
  rowId: string;
  field: string;
  value: unknown;
  message: string;
};

/** Column statistics computed in the Tool Panel Stats tab. */
export type ColumnStats = {
  count: number;
  nullCount: number;
  uniqueCount: number;
  min?: number;
  max?: number;
  mean?: number;
  median?: number;
  sum?: number;
  minLength?: number;
  maxLength?: number;
  avgLength?: number;
  topValues: Array<{ value: string; count: number; pct: number }>;
};

export interface DataTableProps<TData, TValue = unknown> {
  columns: DataTableColumnDef<TData, TValue>[];
  data: TData[];
  /** Render rows virtually. Specify estimated row height. */
  virtual?: boolean | { estimatedRowHeight?: number; overscan?: number };
  /** Render leaf columns virtually for wide grids. */
  virtualColumns?: boolean | { estimatedColumnWidth?: number; overscan?: number };
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableAdvancedFiltering?: boolean;
  enableGlobalSearch?: boolean;
  enableRowSelection?: boolean | 'single';
  enableColumnSelection?: boolean;
  enablePagination?: boolean;
  enableExpanding?: boolean;
  enableGrouping?: boolean;
  enableColumnResizing?: boolean;
  enableColumnReordering?: boolean;
  enableRowReordering?: boolean;
  enableColumnPinning?: boolean;
  enableRowPinning?: boolean;
  enableColumnConfiguration?: boolean;
  pageSize?: number;
  loading?: boolean;
  loadingMore?: boolean;
  loadingVariant?: DataTableLoadingVariant;
  skeletonRows?: number;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
  tableClassName?: string;
  toolbar?: React.ReactNode | ((table: Table<TData>) => React.ReactNode);
  toolbarStart?: React.ReactNode;
  toolbarEnd?: React.ReactNode;
  globalFilter?: string;
  defaultGlobalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  globalFilterPlaceholder?: string;
  advancedFilter?: DataTableFilterGroup;
  defaultAdvancedFilter?: DataTableFilterGroup;
  onAdvancedFilterChange?: (filter: DataTableFilterGroup | undefined) => void;
  getAdvancedFilterValue?: (row: TData, columnId: string) => unknown;
  rowActions?: (row: Row<TData>) => React.ReactNode;
  inlineCreateRow?: DataTableInlineCreate;
  aggregations?: Record<string, DataTableAggregation>;
  showColumnTotals?: boolean;
  rowTotals?: boolean | DataTableRowTotals<TData>;
  rowPinning?: DataTableRowPinningState;
  defaultRowPinning?: DataTableRowPinningState;
  onRowPinningChange?: (state: DataTableRowPinningState) => void;
  columnSelection?: string[];
  defaultColumnSelection?: string[];
  onColumnSelectionChange?: (columnIds: string[]) => void;
  renderDetailPanel?: (row: Row<TData>) => React.ReactNode;
  getCellColSpan?: (cell: Cell<TData, unknown>, row: Row<TData>) => number | undefined;
  getCellRowSpan?: (cell: Cell<TData, unknown>, row: Row<TData>) => number | undefined;
  getRowClassName?: (row: Row<TData>) => string | undefined;
  getRowStyle?: (row: Row<TData>) => React.CSSProperties | undefined;
  getRowHeight?: (row: Row<TData>) => number | undefined;
  height?: number | string;
  maxHeight?: number | string;
  fullHeight?: boolean;
  autoHeight?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadMoreThreshold?: number;
  onRowOrderChange?: (rows: TData[], rowIds: string[]) => void;
  onColumnOrderChange?: (columnIds: string[]) => void;
  localeText?: Partial<DataTableLocaleText>;
  /** Server-side data adapter. When provided, internal sort/filter/pagination is disabled. */
  serverSide?: {
    state: ServerDataState;
    onStateChange: (state: ServerDataState) => void;
    rowCount: number;
  };
  getRowId?: (row: TData, index: number) => string;
  getSubRows?: (row: TData) => TData[] | undefined;
  onRowSelectionChange?: (state: RowSelectionState) => void;
  onSortingChange?: (state: SortingState) => void;
  /** Imperative ref exposing the underlying TanStack Table instance. */
  tableRef?: React.MutableRefObject<Table<TData> | null>;
  /** Override any built-in sub-component with your own. */
  slots?: DataTableSlots<TData>;
  /** Page size options shown in the rows-per-page selector. */
  pageSizeOptions?: number[];
  /** Show the total row count in the pagination bar. */
  showTotalRows?: boolean;
  /** Overlay shown when the data source has no rows (before any filter/search). */
  noRowsOverlay?: React.ReactNode;
  /** Overlay shown when filters/search produce no results from a non-empty dataset. */
  noResultsOverlay?: React.ReactNode;
  /** Actions shown in the bulk-action bar when one or more rows are selected. */
  bulkActions?: DataTableBulkAction<TData>[];
  /** Structured row action items rendered as a 3-dot dropdown menu in the action column. */
  rowActionMenu?: DataTableRowActionItem<TData>[];
  /** Structured row action items rendered as inline buttons in the action column. */
  rowActionButtons?: DataTableRowActionItem<TData>[];
  /** Ctrl+C on a row also copies that single row (in addition to multi-row copy). */
  enableRowCopy?: boolean;
  /** Add a "Copy column" item to the column context menu. */
  enableColumnCopy?: boolean;
  /** Row/cell density. */
  density?: DataTableDensity;
  defaultDensity?: DataTableDensity;
  enableDensityToggle?: boolean;
  onDensityChange?: (density: DataTableDensity) => void;
  /** Enable tree data — adds visual indentation based on row depth (use with `getSubRows`). */
  treeData?: boolean;
  /** Enable Ctrl+C to copy selected rows as TSV. */
  enableCopyPaste?: boolean;
  onCopy?: (rows: Row<TData>[], text: string) => void;
  /** Custom toolbar action buttons rendered in the right toolbar section. */
  toolbarActions?: DataTableToolbarAction<TData>[];
  /** Callback for a Refresh toolbar action. */
  onRefresh?: () => void;
  // ── Phase 3 additions ─────────────────────────────────────────────────
  /** Return extra CSS class(es) for a specific cell based on its value and row. */
  getCellClassName?: (cell: Cell<TData, unknown>, row: Row<TData>) => string | undefined;
  /** Show a fixed row-number column as the first column (1, 2, 3…). */
  enableRowNumbers?: boolean;
  /** Alternate row background color for readability. */
  striped?: boolean;
  /** Show the full cell value as a tooltip when the cell content is truncated. */
  enableCellTooltip?: boolean;
  /**
   * Persist column order/visibility/sizing, sort, filters, and pagination to
   * localStorage under this key. Restored on mount.
   */
  stateKey?: string;
  /** Show a status bar below the table with row and selection counts. */
  enableStatusBar?: boolean;
  /** Expand the grid to fill the viewport when true (controlled fullscreen). */
  fullscreen?: boolean;
  /** Callback when the user toggles fullscreen from the toolbar button. */
  onFullscreenChange?: (fullscreen: boolean) => void;
  /** Show a fullscreen toggle button in the toolbar. */
  enableFullscreen?: boolean;
  /** Row IDs that show a loading spinner (async row action in progress). */
  loadingRowIds?: string[];
  /** Callback for a Print toolbar button / helper — called before window.print(). */
  onPrint?: () => void;
  /** Column IDs whose header should show a quick-filter input below the label. */
  quickFilterColumns?: string[];
  /** Show a right-click context menu on cells/rows. */
  onCellContextMenu?: (cell: Cell<TData, unknown>, row: Row<TData>, event: React.MouseEvent) => void;
  onRowContextMenu?: (row: Row<TData>, event: React.MouseEvent) => void;
  /** Double-click a column resize handle to auto-size to content. */
  enableColumnAutoSize?: boolean;
  /** Column IDs that cannot be hidden, reordered, or resized. */
  lockedColumns?: string[];
  /** Fired when the user locks or unlocks a column via the column menu. */
  onLockedColumnsChange?: (columnIds: string[]) => void;
  /** Render rows as label/value cards below this Tailwind breakpoint. */
  mobileBreakpoint?: 'sm' | 'md' | 'lg';
  /** Built-in Export dropdown (CSV, JSON, and XLSX). Set to true or provide custom options. */
  enableExport?: boolean | { csv?: boolean; json?: boolean; selectedCsv?: boolean; xlsx?: boolean };
  /** Enable the built-in conditional formatting drawer in the toolbar. */
  enableConditionalFormatting?: boolean;
  /** Controlled conditional formatting rules. */
  conditionalFormattingRules?: DataTableConditionalRule[];
  /** Fired when rules change. */
  onConditionalFormattingRulesChange?: (rules: DataTableConditionalRule[]) => void;

  // ── Feature 3: Row status indicators ────────────────────────────────
  /** Return a status for a row to show a colored left border. */
  getRowStatus?: (row: Row<TData>) => 'success' | 'warning' | 'error' | 'info' | undefined;

  // ── Feature 4: Custom row height ─────────────────────────────────────
  /** Fixed row height (px) or a function returning height per row. */
  rowHeight?: number | ((row: Row<TData>, index: number) => number);

  // ── Feature 5: Active filter chips ──────────────────────────────────
  /** Show active column-filter chips above the table. */
  enableFilterChips?: boolean;

  // ── Feature 6: Clipboard paste ───────────────────────────────────────
  /** Enable Ctrl+V paste of TSV data into editable cells. */
  enablePaste?: boolean;

  // ── Feature 7: RTL support ───────────────────────────────────────────
  /** Text direction for the grid. */
  dir?: 'ltr' | 'rtl';

  // ── Feature 8: Keyboard shortcuts modal ──────────────────────────────
  /** Show a keyboard shortcuts modal when ? is pressed. */
  enableKeyboardShortcuts?: boolean;

  // ── Feature 9: Excel export (xlsx option inside enableExport) ────────
  // enableExport now also accepts { xlsx?: boolean } in addition to csv/json/selectedCsv

  // ── Feature 10: Inline editing undo/redo + validation + dirty tracking
  /** Interaction mode to start inline editing. */
  editMode?: 'click' | 'dblclick';
  /** Callback fired after a cell edit is committed via valueSetter. */
  onCellEditCommit?: (params: { field: string; row: TData; oldValue: unknown; newValue: unknown }) => void;
  /** Enable Ctrl+Z / Ctrl+Y undo-redo for inline edits. */
  enableUndoRedo?: boolean;
  /** Controlled set of row IDs with unsaved changes. */
  dirtyRows?: Set<string>;
  /** Fired when dirty row set changes. */
  onDirtyRowsChange?: (dirtyRows: Set<string>) => void;

  // ── Round 2: Feature 1 — Cell Range Selection + Bulk Edit ────────────
  /** Enable cell-range selection. Disables row-selection click behavior on td. */
  enableCellSelection?: boolean;
  /** Fired when cell selection changes. */
  onCellSelectionChange?: (selection: DataTableCellSelection | null) => void;

  // ── Round 2: Feature 2 — Tool Panel / Sidebar ────────────────────────
  /** Show the collapsible right-side tool panel. */
  enableToolPanel?: boolean;
  /** Which tab to open by default in the tool panel. */
  defaultToolPanelTab?: 'columns' | 'filters' | 'stats';

  // ── Round 2: Feature 3 — Real-time Live Data with Cell Flash ─────────
  /** Enable real-time cell flash when data changes. */
  enableLiveData?: boolean;
  /** Field used as row identity for live-data diffing. Default: 'id'. */
  liveDataKey?: keyof TData;
  /** Fired when live-data diff detects updated rows. */
  onLiveDataUpdate?: (updatedRows: TData[]) => void;

  // ── Round 2: Feature 5A — Async Detail Panel ─────────────────────────
  /** Async loader for detail panel content. Cached after first load. */
  loadDetailPanel?: (row: Row<TData>) => Promise<React.ReactNode>;
  /** Maximum number of cached detail panels (LRU). Default: 20. */
  detailPanelCacheSize?: number;

  // ── Round 2: Feature 5B — Print-optimized CSS ────────────────────────
  /** Inject @media print styles that hide toolbar/pagination. */
  enablePrintStyles?: boolean;

  // ── Round 3: Feature 1 — Pivot Mode ──────────────────────────────────
  /** Enable pivot mode. When true, a Pivot toolbar button appears. */
  enablePivot?: boolean;
  /** Controlled pivot configuration. When set alongside enablePivot, renders pivot view. */
  pivotConfig?: DataTablePivotConfig;
  /** Fired when pivot config changes from the toolbar panel. */
  onPivotConfigChange?: (config: DataTablePivotConfig) => void;

  // ── Round 3: Feature 2 — Saved Views ─────────────────────────────────
  /** Enable saved views toolbar button. */
  enableSavedViews?: boolean;
  /** Controlled saved views list. */
  savedViews?: DataTableSavedView[];
  /** Fired when saved views list changes. */
  onSavedViewsChange?: (views: DataTableSavedView[]) => void;

  // ── Round 3: Feature 3 — Full ARIA Grid ──────────────────────────────
  /** Accessible label for the grid root element. */
  ariaLabel?: string;
  /** ID of an element that labels the grid. */
  ariaLabelledBy?: string;

  // ── Round 3: Feature 4 — Header Stats Row ────────────────────────────
  /** Show an aggregated stats row pinned below column headers. */
  enableHeaderStats?: boolean;
  /** Per-column stat type override. key = columnId, value = stat type. Defaults: sum for number, count for others. */
  headerStatsConfig?: Partial<Record<string, 'count' | 'sum' | 'avg' | 'min' | 'max' | 'nullCount' | 'unique'>>;

  // ── Round 3: Feature 5 — Data Schema Validation ───────────────────────
  /** Enable display-mode cell validation using displayValidate on column defs. */
  enableValidation?: boolean;
  /** Fired when validation errors change. */
  onValidationChange?: (errors: DataTableValidationError[]) => void;

  // ── Round 3: Feature 6 — Column Value Formatting ──────────────────────
  /** Default locale for all columns (overridden per-column). e.g. 'en-US', 'de-DE'. */
  locale?: string;
}

const defaultLocaleText: DataTableLocaleText = {
  searchPlaceholder: 'Search…',
  filters: 'Filters',
  filterColumnLabel: 'Column',
  filterOperatorLabel: 'Operator',
  filterValueLabel: 'Value',
  filterLogicLabel: 'Logic',
  addFilter: 'Add filter',
  addFilterGroup: 'Add group',
  clearFilters: 'Clear filters',
  removeFilter: 'Remove filter',
  removeFilterGroup: 'Remove group',
  columns: 'Columns',
  columnMenu: 'Column menu',
  sortAsc: 'Sort ascending',
  sortDesc: 'Sort descending',
  clearSort: 'Clear sort',
  hideColumn: 'Hide column',
  pinLeft: 'Pin left',
  pinRight: 'Pin right',
  unpin: 'Unpin',
  groupBy: 'Group by',
  ungroup: 'Ungroup',
  selectColumn: 'Select column',
  selectedRows: (selected, total) => `${selected} of ${total} row(s) selected.`,
  page: (page, pageCount) => `Page ${page} of ${pageCount}`,
  previous: 'Previous',
  next: 'Next',
  noResults: 'No results.',
  loading: 'Loading…',
  loadingMore: 'Loading more…',
  error: 'Something went wrong.',
  addRow: 'Add row',
  cancel: 'Cancel',
  save: 'Save',
  rowActions: 'Actions',
  rowTotal: 'Row total',
  pinRowTop: 'Pin top',
  pinRowBottom: 'Pin bottom',
  total: 'Total',
  expandRow: 'Expand row',
  collapseRow: 'Collapse row',
  expandAll: 'Expand all',
  collapseAll: 'Collapse all',
  copyRows: 'Copy rows',
  copyRow: 'Copy row',
  copyColumn: 'Copy column',
  density: 'Density',
  densityCompact: 'Compact',
  densityStandard: 'Standard',
  densityComfortable: 'Comfortable',
  refresh: 'Refresh',
  exportCsv: 'Export CSV',
  exportJson: 'Export JSON',
  noRows: 'No data.',
  rowsPerPage: 'Rows per page',
  totalRows: (count) => `${count.toLocaleString()} rows`,
  goToPage: 'Go to page',
  firstPage: 'First page',
  lastPage: 'Last page',
  bulkActionsTitle: (count) => `${count} selected`,
  clearSelection: 'Clear selection',
  rowNumberHeader: '#',
  statusBarRows: (count) => `${count.toLocaleString()} rows`,
  statusBarSelected: (count) => `${count} selected`,
  printTitle: 'Print',
  enterFullscreen: 'Enter fullscreen',
  exitFullscreen: 'Exit fullscreen',
  autoSizeColumn: 'Auto-size column',
  quickFilterPlaceholder: 'Filter…',
  lockColumn: 'Lock column',
  unlockColumn: 'Unlock column',
  export: 'Export',
  exportCSV: 'Export as CSV',
  exportJSON: 'Export as JSON',
  exportSelectedCSV: 'Export selected rows',
  conditionalFormatting: 'Conditional formatting',
};

// ── Module-level style injection flags ──────────────────────────────────
let liveDataStyleInjected = false;
let printStyleInjected = false;

function injectLiveDataStyles() {
  if (liveDataStyleInjected || typeof document === 'undefined') return;
  liveDataStyleInjected = true;
  const styleEl = document.createElement('style');
  styleEl.textContent = `
@keyframes cell-flash {
  0% { background-color: hsl(var(--primary) / 0.3); }
  100% { background-color: transparent; }
}
@keyframes row-slide-in {
  0% { opacity: 0; transform: translateX(-12px); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes row-fade-out {
  0% { opacity: 1; background-color: hsl(var(--destructive) / 0.12); }
  100% { opacity: 0; background-color: hsl(var(--destructive) / 0.12); }
}
[data-flash="true"] { animation: cell-flash 1.2s ease-out; }
[data-new-row="true"] { animation: row-slide-in 0.4s ease-out; }
[data-removed-row="true"] { animation: row-fade-out 0.6s ease-out forwards; }
`;
  document.head.appendChild(styleEl);
}

function injectPrintStyles() {
  if (printStyleInjected || typeof document === 'undefined') return;
  printStyleInjected = true;
  const styleEl = document.createElement('style');
  styleEl.textContent = `
@media print {
  [data-datatable-root] .data-table-toolbar { display: none !important; }
  [data-datatable-root] .data-table-pagination { display: none !important; }
  [data-datatable-root] { overflow: visible !important; height: auto !important; max-height: none !important; }
  [data-datatable-root] table { page-break-inside: auto; width: 100% !important; }
  [data-datatable-root] tr { page-break-inside: avoid; page-break-after: auto; }
  [data-datatable-root] thead { display: table-header-group; }
  [data-datatable-root] tfoot { display: table-footer-group; }
}
`;
  document.head.appendChild(styleEl);
}

// Snapshots current theme CSS variables and injects them for @media print so
// the printed output matches the active theme (dark or light) exactly.
function applyPrintTheme(): () => void {
  if (typeof document === 'undefined') return () => {};
  const rootStyle = getComputedStyle(document.documentElement);
  const tokens = [
    '--background', '--foreground', '--muted', '--muted-foreground',
    '--border', '--primary', '--primary-foreground', '--secondary',
    '--secondary-foreground', '--accent', '--accent-foreground',
    '--card', '--card-foreground', '--destructive', '--destructive-foreground',
    '--ring', '--radius', '--sidebar', '--sidebar-foreground',
  ];
  const vars = tokens
    .map((t) => { const v = rootStyle.getPropertyValue(t).trim(); return v ? `${t}: ${v};` : ''; })
    .filter(Boolean)
    .join(' ');

  const el = document.createElement('style');
  el.setAttribute('data-aura-print-theme', '');
  el.textContent = `
@media print {
  :root { ${vars} color-scheme: light dark; }
  *, *::before, *::after { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
  [data-datatable-root] .data-table-toolbar { display: none !important; }
  [data-datatable-root] .data-table-pagination { display: none !important; }
  [data-datatable-root] { overflow: visible !important; height: auto !important; max-height: none !important; }
  [data-datatable-root] table { page-break-inside: auto; width: 100% !important; }
  [data-datatable-root] tr { page-break-inside: avoid; page-break-after: auto; }
  [data-datatable-root] thead { display: table-header-group; }
  [data-datatable-root] tfoot { display: table-footer-group; }
}
`;
  document.head.appendChild(el);
  return () => el.remove();
}

// ── useDataFlash ─────────────────────────────────────────────────────────
function useDataFlash<TData>(
  data: TData[],
  liveDataKey: keyof TData | undefined,
  enabled: boolean,
): { flashedCells: Map<string, Set<string>>; newRowIds: Set<string>; removedRowIds: Set<string> } {
  const idKey = liveDataKey ?? ('id' as keyof TData);
  const prevDataRef = React.useRef<Map<string, Record<string, unknown>>>(new Map());
  const [flashedCells, setFlashedCells] = React.useState<Map<string, Set<string>>>(new Map());
  const [newRowIds, setNewRowIds] = React.useState<Set<string>>(new Set());
  const [removedRowIds, setRemovedRowIds] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!enabled) return;
    const prevMap = prevDataRef.current;
    const currentMap = new Map<string, Record<string, unknown>>();
    const changedCells = new Map<string, Set<string>>();
    const addedIds = new Set<string>();

    for (const row of data) {
      const rowId = String(row[idKey] ?? '');
      const rowRecord = row as unknown as Record<string, unknown>;
      currentMap.set(rowId, rowRecord);
      if (!prevMap.has(rowId)) {
        addedIds.add(rowId);
      } else {
        const prevRow = prevMap.get(rowId)!;
        for (const key of Object.keys(rowRecord)) {
          if (rowRecord[key] !== prevRow[key]) {
            if (!changedCells.has(rowId)) changedCells.set(rowId, new Set());
            changedCells.get(rowId)!.add(key);
          }
        }
      }
    }

    const removedIds = new Set<string>();
    for (const id of prevMap.keys()) {
      if (!currentMap.has(id)) removedIds.add(id);
    }

    prevDataRef.current = currentMap;

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (changedCells.size > 0) {
      setFlashedCells(changedCells);
      timer = setTimeout(() => setFlashedCells(new Map()), 1200);
    } else if (addedIds.size > 0) {
      setNewRowIds(addedIds);
      timer = setTimeout(() => setNewRowIds(new Set()), 400);
    } else if (removedIds.size > 0) {
      setRemovedRowIds(removedIds);
      timer = setTimeout(() => setRemovedRowIds(new Set()), 600);
    }
    return () => { if (timer !== undefined) clearTimeout(timer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, enabled]);

  return { flashedCells, newRowIds, removedRowIds };
}

export function DataTable<TData, TValue = unknown>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    virtual,
    virtualColumns,
    enableSorting = true,
    enableFiltering = false,
    enableAdvancedFiltering = false,
    enableGlobalSearch = false,
    enableRowSelection = false,
    enableColumnSelection = false,
    enablePagination = false,
    enableExpanding = false,
    enableGrouping = false,
    enableColumnResizing = false,
    enableColumnReordering = false,
    enableRowReordering = false,
    enableColumnPinning = false,
    enableRowPinning = false,
    enableColumnConfiguration = false,
    pageSize = 10,
    loading,
    loadingMore,
    loadingVariant = 'text',
    skeletonRows = 5,
    error,
    emptyState,
    className,
    tableClassName,
    toolbar,
    toolbarStart,
    toolbarEnd,
    globalFilter: globalFilterProp,
    defaultGlobalFilter,
    onGlobalFilterChange,
    globalFilterPlaceholder,
    advancedFilter: advancedFilterProp,
    defaultAdvancedFilter,
    onAdvancedFilterChange,
    getAdvancedFilterValue,
    rowActions,
    inlineCreateRow,
    aggregations,
    showColumnTotals = !!aggregations,
    rowTotals,
    rowPinning: rowPinningProp,
    defaultRowPinning,
    onRowPinningChange,
    columnSelection: columnSelectionProp,
    defaultColumnSelection,
    onColumnSelectionChange,
    renderDetailPanel,
    getCellColSpan,
    getCellRowSpan,
    getRowClassName,
    getRowStyle,
    getRowHeight,
    height,
    maxHeight,
    fullHeight,
    autoHeight,
    onLoadMore,
    hasMore,
    loadMoreThreshold = 96,
    onRowOrderChange,
    onColumnOrderChange,
    localeText,
    serverSide,
    getRowId,
    getSubRows,
    onRowSelectionChange,
    onSortingChange,
    tableRef,
    density: densityProp,
    defaultDensity = 'standard',
    enableDensityToggle = false,
    onDensityChange,
    treeData = false,
    enableCopyPaste = false,
    onCopy,
    toolbarActions,
    onRefresh,
    slots,
    pageSizeOptions = [10, 25, 50, 100],
    showTotalRows = true,
    noRowsOverlay,
    noResultsOverlay,
    bulkActions,
    rowActionMenu,
    rowActionButtons,
    enableRowCopy = false,
    enableColumnCopy = false,
    getCellClassName,
    enableRowNumbers = false,
    striped = false,
    enableCellTooltip = false,
    stateKey,
    enableStatusBar = false,
    fullscreen: fullscreenProp,
    onFullscreenChange,
    enableFullscreen = false,
    loadingRowIds,
    onPrint,
    quickFilterColumns,
    onCellContextMenu,
    onRowContextMenu,
    enableColumnAutoSize = false,
    lockedColumns: lockedColumnsProp,
    onLockedColumnsChange,
    mobileBreakpoint,
    enableExport = false,
    enableConditionalFormatting = false,
    conditionalFormattingRules: conditionalFormattingRulesProp,
    onConditionalFormattingRulesChange,
    // Feature 3
    getRowStatus,
    // Feature 4
    rowHeight,
    // Feature 5
    enableFilterChips = false,
    // Feature 6
    enablePaste = false,
    // Feature 7
    dir,
    // Feature 8
    enableKeyboardShortcuts = false,
    // Feature 10
    editMode,
    onCellEditCommit,
    enableUndoRedo = false,
    dirtyRows: dirtyRowsProp,
    onDirtyRowsChange,
    // Round 2: Feature 1
    enableCellSelection = false,
    onCellSelectionChange,
    // Round 2: Feature 2
    enableToolPanel = false,
    defaultToolPanelTab = 'columns',
    // Round 2: Feature 3
    enableLiveData = false,
    liveDataKey,
    onLiveDataUpdate,
    // Round 2: Feature 5A
    loadDetailPanel,
    detailPanelCacheSize = 20,
    // Round 2: Feature 5B
    enablePrintStyles = false,
    // Round 3: Feature 1
    enablePivot = false,
    pivotConfig: pivotConfigProp,
    onPivotConfigChange,
    // Round 3: Feature 2
    enableSavedViews = false,
    savedViews: savedViewsProp,
    onSavedViewsChange,
    // Round 3: Feature 3
    ariaLabel,
    ariaLabelledBy,
    // Round 3: Feature 4
    enableHeaderStats = false,
    headerStatsConfig,
    // Round 3: Feature 5
    enableValidation = false,
    onValidationChange,
    // Round 3: Feature 6
    locale: propLocale,
  } = props;

  const [internalLockedColumns, setInternalLockedColumns] = React.useState<string[]>(
    lockedColumnsProp ?? [],
  );
  const lockedColumns = lockedColumnsProp ?? internalLockedColumns;
  const handleLockedColumnsChange = React.useCallback(
    (cols: string[]) => {
      setInternalLockedColumns(cols);
      onLockedColumnsChange?.(cols);
    },
    [onLockedColumnsChange],
  );

  const [internalConditionalRules, setInternalConditionalRules] = React.useState<DataTableConditionalRule[]>(
    conditionalFormattingRulesProp ?? [],
  );
  const conditionalFormattingRules = conditionalFormattingRulesProp ?? internalConditionalRules;
  const handleConditionalRulesChange = React.useCallback(
    (rules: DataTableConditionalRule[]) => {
      setInternalConditionalRules(rules);
      onConditionalFormattingRulesChange?.(rules);
    },
    [onConditionalFormattingRulesChange],
  );

  const [cfDrawerOpen, setCfDrawerOpen] = React.useState(false);
  const [cfInitialColumnId, setCfInitialColumnId] = React.useState<string | undefined>();
  const handleOpenCfDrawer = React.useCallback((columnId?: string) => {
    setCfInitialColumnId(columnId);
    setCfDrawerOpen(true);
  }, []);

  const text = React.useMemo<DataTableLocaleText>(
    () => ({ ...defaultLocaleText, ...localeText }),
    [localeText],
  );

  const [sorting, setSorting] = React.useState<SortingState>(serverSide?.state.sorting ?? []);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    serverSide?.state.filters ?? [],
  );
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState(
    serverSide?.state.globalFilter ?? defaultGlobalFilter ?? '',
  );
  const [internalAdvancedFilter, setInternalAdvancedFilter] = React.useState<
    DataTableFilterGroup | undefined
  >(serverSide?.state.advancedFilter ?? defaultAdvancedFilter);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    serverSide?.state.rowSelection ?? {},
  );
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({});
  const [pagination, setPagination] = React.useState<PaginationState>(
    serverSide?.state.pagination ?? { pageIndex: 0, pageSize },
  );
  const [internalRowPinning, setInternalRowPinning] = React.useState<DataTableRowPinningState>(
    serverSide?.state.rowSelection ? {} : (defaultRowPinning ?? {}),
  );
  const [internalColumnSelection, setInternalColumnSelection] = React.useState<string[]>(
    defaultColumnSelection ?? [],
  );
  const [draggedRowId, setDraggedRowId] = React.useState<string | null>(null);
  const [draggedColumnId, setDraggedColumnId] = React.useState<string | null>(null);
  const [internalDensity, setInternalDensity] = React.useState<DataTableDensity>(
    densityProp ?? defaultDensity,
  );
  const [internalFullscreen, setInternalFullscreen] = React.useState(false);

  // Feature 6: paste version counter to trigger re-render
  const [pasteVersion, setPasteVersion] = React.useState(0);

  // Round 3: Feature 1 — Pivot mode
  const [internalPivotConfig, setInternalPivotConfig] = React.useState<DataTablePivotConfig | undefined>();
  const pivotConfig = pivotConfigProp ?? internalPivotConfig;
  const [pivotDrawerOpen, setPivotDrawerOpen] = React.useState(false);
  const handlePivotConfigChange = React.useCallback(
    (config: DataTablePivotConfig) => {
      setInternalPivotConfig(config);
      onPivotConfigChange?.(config);
    },
    [onPivotConfigChange],
  );

  // Round 3: Feature 2 — Saved views
  const [internalViews, setInternalViews] = React.useState<DataTableSavedView[]>(savedViewsProp ?? []);
  const savedViews = savedViewsProp ?? internalViews;
  const [savedViewsDrawerOpen, setSavedViewsDrawerOpen] = React.useState(false);
  const handleViewsChange = React.useCallback(
    (views: DataTableSavedView[]) => {
      setInternalViews(views);
      onSavedViewsChange?.(views);
    },
    [onSavedViewsChange],
  );

  // Feature 8: keyboard shortcuts modal
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);

  // Round 2: Feature 1 — Cell selection
  const [cellSelection, setCellSelection] = React.useState<DataTableCellSelection | null>(null);
  const [isSelectingCells, setIsSelectingCells] = React.useState(false);

  const handleCellSelectionChange = React.useCallback(
    (next: DataTableCellSelection | null) => {
      setCellSelection(next);
      onCellSelectionChange?.(next);
    },
    [onCellSelectionChange],
  );

  // Track mouse-up on document to end cell selection drag
  React.useEffect(() => {
    if (!enableCellSelection) return;
    const handleMouseUp = () => setIsSelectingCells(false);
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [enableCellSelection]);

  // Bulk-edit bar state
  const [bulkEditValue, setBulkEditValue] = React.useState('');

  // Round 2: Feature 2 — Tool Panel
  const [toolPanelTab, setToolPanelTab] = React.useState<'columns' | 'filters' | 'stats'>(
    defaultToolPanelTab,
  );
  const [toolPanelOpen, setToolPanelOpen] = React.useState(false);
  const [statsColumnId, setStatsColumnId] = React.useState<string | undefined>();

  const handleViewStats = React.useCallback((columnId: string) => {
    setStatsColumnId(columnId);
    setToolPanelTab('stats');
    setToolPanelOpen(true);
  }, []);

  // Round 2: Feature 5A — Async detail panel cache
  const detailPanelCacheRef = React.useRef<Map<string, React.ReactNode>>(new Map());
  const detailPanelLoadingRef = React.useRef<Set<string>>(new Set());
  const [detailPanelVersion, setDetailPanelVersion] = React.useState(0);

  // Feature 10: undo/redo history and dirty rows
  type EditHistoryEntry = { rowId: string; field: string; oldValue: unknown; newValue: unknown };
  const [editHistory, setEditHistory] = React.useState<EditHistoryEntry[]>([]);
  const [redoStack, setRedoStack] = React.useState<EditHistoryEntry[]>([]);
  const [internalDirtyRows, setInternalDirtyRows] = React.useState<Set<string>>(new Set());
  const dirtyRows = dirtyRowsProp ?? internalDirtyRows;
  const handleDirtyRowsChange = React.useCallback(
    (next: Set<string>) => {
      setInternalDirtyRows(next);
      onDirtyRowsChange?.(next);
    },
    [onDirtyRowsChange],
  );

  const hasMounted = React.useRef(false);
  React.useEffect(() => {
    hasMounted.current = true;
  }, []);

  // Round 2: Feature 3 — Live data flash
  const { flashedCells, newRowIds, removedRowIds } = useDataFlash(data, liveDataKey, enableLiveData);

  // Fire onLiveDataUpdate when flash cells detected
  React.useEffect(() => {
    if (!enableLiveData || flashedCells.size === 0) return;
    const updatedIds = new Set(flashedCells.keys());
    const updatedRows = data.filter((row) => {
      const id = String(row[liveDataKey ?? ('id' as keyof TData)] ?? '');
      return updatedIds.has(id);
    });
    if (updatedRows.length > 0) onLiveDataUpdate?.(updatedRows);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashedCells]);

  // Round 2: Feature 3 — Inject live data animation styles
  React.useEffect(() => {
    if (enableLiveData) injectLiveDataStyles();
  }, [enableLiveData]);

  // Round 2: Feature 5B — Inject print styles
  React.useEffect(() => {
    if (enablePrintStyles) injectPrintStyles();
  }, [enablePrintStyles]);

  // ── stateKey: restore persisted state from localStorage on mount ──────
  React.useEffect(() => {
    if (!stateKey) return;
    try {
      const raw = localStorage.getItem(`aura-dt:${stateKey}`);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        sorting?: SortingState;
        columnFilters?: ColumnFiltersState;
        columnVisibility?: VisibilityState;
        columnOrder?: ColumnOrderState;
        columnSizing?: ColumnSizingState;
        pagination?: PaginationState;
        density?: DataTableDensity;
      };
      if (saved.sorting) setSorting(saved.sorting);
      if (saved.columnFilters) setColumnFilters(saved.columnFilters);
      if (saved.columnVisibility) setColumnVisibility(saved.columnVisibility);
      if (saved.columnOrder) setColumnOrder(saved.columnOrder);
      if (saved.columnSizing) setColumnSizing(saved.columnSizing);
      if (saved.pagination) setPagination(saved.pagination);
      if (saved.density) setInternalDensity(saved.density);
    } catch {
      // ignore malformed stored state
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey]);

  const globalFilter = globalFilterProp ?? internalGlobalFilter;
  const advancedFilter = advancedFilterProp ?? internalAdvancedFilter;
  const rowPinning = rowPinningProp ?? internalRowPinning;
  const selectedColumnIds = columnSelectionProp ?? internalColumnSelection;
  const density = densityProp ?? internalDensity;
  const isFullscreen = fullscreenProp ?? internalFullscreen;

  const handleDensityChange = (next: DataTableDensity) => {
    setInternalDensity(next);
    onDensityChange?.(next);
  };

  const handleFullscreenToggle = React.useCallback(() => {
    const el = rootElRef.current;
    const supportsApi = typeof document !== 'undefined' && !!document.fullscreenEnabled && !!el?.requestFullscreen;
    if (supportsApi && el) {
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(() => {
          setInternalFullscreen(true);
          onFullscreenChange?.(true);
        });
      } else {
        document.exitFullscreen().catch(() => {
          setInternalFullscreen(false);
          onFullscreenChange?.(false);
        });
      }
    } else {
      // CSS fallback for browsers without Fullscreen API
      const next = !isFullscreen;
      setInternalFullscreen(next);
      onFullscreenChange?.(next);
    }
  }, [isFullscreen, onFullscreenChange]);

  // Sync internalFullscreen with native fullscreen API events
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const onChange = () => {
      const isFull = !!document.fullscreenElement;
      setInternalFullscreen(isFull);
      onFullscreenChange?.(isFull);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [onFullscreenChange]);

  // Persist state changes to localStorage whenever state changes
  const persistState = React.useCallback(() => {
    if (!stateKey) return;
    try {
      localStorage.setItem(
        `aura-dt:${stateKey}`,
        JSON.stringify({
          sorting,
          columnFilters,
          columnVisibility,
          columnOrder,
          columnSizing,
          pagination,
          density,
        }),
      );
    } catch {
      // ignore storage errors (quota, private mode)
    }
  }, [stateKey, sorting, columnFilters, columnVisibility, columnOrder, columnSizing, pagination, density]);

  React.useEffect(() => {
    if (hasMounted.current) persistState();
  }, [persistState]);

  const globalFilterFn = React.useMemo<FilterFn<TData>>(
    () => (row, columnId, filterValue) => {
      const query = normalizeSearch(filterValue);
      if (!query) return true;
      return normalizeSearch(row.getValue(columnId)).includes(query);
    },
    [],
  );

  const advancedFilteredData = React.useMemo(() => {
    if (!advancedFilter || serverSide) return data;
    return data.filter((row) =>
      evaluateFilterGroup(advancedFilter, row, getAdvancedFilterValue ?? getValueByPath),
    );
  }, [advancedFilter, data, getAdvancedFilterValue, serverSide]);

  const normalizedColumns = React.useMemo(
    () => normalizeColumnDefs(columns as DataTableColumnDef<TData, TValue>[], propLocale),
    [columns, propLocale],
  );

  const tableColumns = React.useMemo<DataTableColumn<TData, unknown>[]>(() => {
    const next: DataTableColumn<TData, unknown>[] = [];
    if (enableRowNumbers) {
      next.push(createRowNumberColumn<TData>(text));
    }
    if (enableRowSelection) {
      next.push(createSelectionColumn<TData>(enableRowSelection === true));
    }
    next.push(...(normalizedColumns as DataTableColumn<TData, unknown>[]));
    if (rowTotals) {
      next.push(createRowTotalColumn(rowTotals, text));
    }
    if (rowActionButtons?.length) {
      next.push(createRowActionButtonsColumn(rowActionButtons as DataTableRowActionItem[], text));
    }
    if (rowActionMenu?.length) {
      next.push(createRowActionMenuColumn(rowActionMenu as DataTableRowActionItem[], text));
    }
    if (rowActions) {
      next.push(createActionColumn(rowActions, text));
    }
    return next;
  }, [normalizedColumns, enableRowSelection, enableRowNumbers, rowActions, rowActionMenu, rowActionButtons, rowTotals, text]);

  const handleSorting: OnChangeFn<SortingState> = (updater) => {
    if (!hasMounted.current) return;
    const next = typeof updater === 'function' ? updater(sorting) : updater;
    setSorting(next);
    onSortingChange?.(next);
    serverSide?.onStateChange({ ...serverSide.state, sorting: next });
  };
  const handleSelection: OnChangeFn<RowSelectionState> = (updater) => {
    if (!hasMounted.current) return;
    const next = typeof updater === 'function' ? updater(rowSelection) : updater;
    setRowSelection(next);
    onRowSelectionChange?.(next);
    serverSide?.onStateChange({ ...serverSide.state, rowSelection: next });
  };
  const handlePagination: OnChangeFn<PaginationState> = (updater) => {
    if (!hasMounted.current) return;
    const next = typeof updater === 'function' ? updater(pagination) : updater;
    setPagination(next);
    serverSide?.onStateChange({ ...serverSide.state, pagination: next });
  };
  const handleFilters: OnChangeFn<ColumnFiltersState> = (updater) => {
    if (!hasMounted.current) return;
    const next = typeof updater === 'function' ? updater(columnFilters) : updater;
    setColumnFilters(next);
    serverSide?.onStateChange({ ...serverSide.state, filters: next });
  };
  const handleGlobalFilter = (next: string) => {
    if (!hasMounted.current) return;
    setInternalGlobalFilter(next);
    onGlobalFilterChange?.(next);
    serverSide?.onStateChange({ ...serverSide.state, globalFilter: next });
  };
  const handleAdvancedFilter = (next: DataTableFilterGroup | undefined) => {
    if (!hasMounted.current) return;
    setInternalAdvancedFilter(next);
    onAdvancedFilterChange?.(next);
    serverSide?.onStateChange({ ...serverSide.state, advancedFilter: next });
  };
  const handleRowPinning = (next: DataTableRowPinningState) => {
    setInternalRowPinning(next);
    onRowPinningChange?.(next);
  };
  const handleColumnSelection = (next: string[]) => {
    setInternalColumnSelection(next);
    onColumnSelectionChange?.(next);
  };
  const handleColumnOrder: OnChangeFn<ColumnOrderState> = (updater) => {
    const next = typeof updater === 'function' ? updater(columnOrder) : updater;
    setColumnOrder(next);
    onColumnOrderChange?.(next);
  };

  const tableRef2 = React.useRef<Table<TData> | null>(null);

  const handleCopyPaste = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      // Ctrl+C copy
      if (enableCopyPaste && isCtrlOrMeta && event.key === 'c') {
        const t = tableRef2.current;
        if (!t) return;
        const selected = t.getFilteredSelectedRowModel().rows;
        const rowsToCopy = selected.length > 0 ? selected : t.getRowModel().rows.slice(0, 1);
        const cols = t.getVisibleLeafColumns().filter((c) => !c.id.startsWith('__'));
        const tsv = rowsToCopy
          .map((row) => cols.map((col) => String(row.getValue(col.id) ?? '')).join('\t'))
          .join('\n');
        navigator.clipboard?.writeText(tsv).catch(() => undefined);
        onCopy?.(rowsToCopy, tsv);
        return;
      }

      // Ctrl+V paste
      if (enablePaste && isCtrlOrMeta && event.key === 'v') {
        event.preventDefault();
        const t = tableRef2.current;
        if (!t) return;
        const selectedRows = t.getSelectedRowModel().rows;
        if (selectedRows.length === 0) {
          console.warn('[DataTable] enablePaste: no rows selected — paste skipped');
          return;
        }
        navigator.clipboard?.readText().then((clipText) => {
          const tsvRows = clipText.split('\n').map((line) => line.split('\t'));
          const visibleCols = t.getVisibleLeafColumns().filter(
            (c) => !c.id.startsWith('__') && (c.columnDef.meta as Record<string, unknown> | undefined)?._aura && ((c.columnDef.meta as Record<string, unknown>)._aura as Record<string, unknown>)?.valueSetter,
          );
          tsvRows.forEach((tsvCols, rowIdx) => {
            const row = selectedRows[rowIdx];
            if (!row) return;
            tsvCols.forEach((cellValue, colIdx) => {
              const col = visibleCols[colIdx];
              if (!col) return;
              const auraMeta = (col.columnDef.meta as Record<string, unknown>)?._aura as Record<string, unknown> | undefined;
              const vs = auraMeta?.valueSetter as ((row: unknown, value: unknown, idx: number) => void) | undefined;
              if (vs) vs(row.original, cellValue, row.index);
            });
          });
          setPasteVersion((v) => v + 1);
        }).catch(() => undefined);
        return;
      }

      // Ctrl+Z undo
      if (enableUndoRedo && isCtrlOrMeta && event.key === 'z') {
        event.preventDefault();
        setEditHistory((prev) => {
          if (prev.length === 0) return prev;
          const last = prev[prev.length - 1];
          if (!last) return prev;
          const t = tableRef2.current;
          if (t) {
            const row = t.getRowModel().rows.find((r) => r.id === last.rowId);
            if (row) {
              const col = t.getColumn(last.field);
              if (col) {
                const auraMeta = (col.columnDef.meta as Record<string, unknown>)?._aura as Record<string, unknown> | undefined;
                const vs = auraMeta?.valueSetter as ((row: unknown, value: unknown, idx: number) => void) | undefined;
                if (vs) vs(row.original, last.oldValue, row.index);
              }
            }
          }
          setRedoStack((redo) => [...redo, last]);
          // Update dirty rows
          const remaining = prev.slice(0, -1);
          const stillDirty = new Set(remaining.map((e) => e.rowId));
          if (!stillDirty.has(last.rowId)) {
            const next = new Set(dirtyRows);
            next.delete(last.rowId);
            handleDirtyRowsChange(next);
          }
          return remaining;
        });
        return;
      }

      // Ctrl+Y redo
      if (enableUndoRedo && isCtrlOrMeta && event.key === 'y') {
        event.preventDefault();
        setRedoStack((prev) => {
          if (prev.length === 0) return prev;
          const last = prev[prev.length - 1];
          if (!last) return prev;
          const t = tableRef2.current;
          if (t) {
            const row = t.getRowModel().rows.find((r) => r.id === last.rowId);
            if (row) {
              const col = t.getColumn(last.field);
              if (col) {
                const auraMeta = (col.columnDef.meta as Record<string, unknown>)?._aura as Record<string, unknown> | undefined;
                const vs = auraMeta?.valueSetter as ((row: unknown, value: unknown, idx: number) => void) | undefined;
                if (vs) vs(row.original, last.newValue, row.index);
              }
            }
          }
          setEditHistory((history) => [...history, last]);
          const next = new Set(dirtyRows);
          next.add(last.rowId);
          handleDirtyRowsChange(next);
          return prev.slice(0, -1);
        });
        return;
      }
    },
    [enableCopyPaste, onCopy, enablePaste, enableUndoRedo, dirtyRows, handleDirtyRowsChange],
  );

  const table = useReactTable({
    data: advancedFilteredData,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
      expanded,
      grouping,
      columnSizing,
      columnOrder,
      columnPinning,
      pagination,
    },
    enableRowSelection: enableRowSelection !== false,
    enableMultiRowSelection: enableRowSelection === true,
    enableSorting,
    enableFilters: enableFiltering || enableAdvancedFiltering || enableGlobalSearch,
    enableGlobalFilter: enableGlobalSearch,
    enableExpanding: enableExpanding || !!renderDetailPanel || treeData,
    enableGrouping,
    enableColumnResizing,
    enableColumnPinning,
    columnResizeMode: 'onChange',
    manualPagination: !!serverSide,
    manualSorting: !!serverSide,
    manualFiltering: !!serverSide,
    rowCount: serverSide?.rowCount,
    globalFilterFn,
    getRowId,
    getSubRows,
    onSortingChange: handleSorting,
    onColumnFiltersChange: handleFilters,
    onGlobalFilterChange: handleGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: handleSelection,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onColumnSizingChange: setColumnSizing,
    onColumnOrderChange: handleColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onPaginationChange: handlePagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting && !serverSide ? getSortedRowModel() : undefined,
    getFilteredRowModel:
      (enableFiltering || enableGlobalSearch) && !serverSide ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination && !serverSide ? getPaginationRowModel() : undefined,
    getExpandedRowModel:
      enableExpanding || renderDetailPanel || treeData ? getExpandedRowModel() : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    getFacetedRowModel: enableFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering ? getFacetedUniqueValues() : undefined,
  });

  React.useEffect(() => {
    tableRef2.current = table;
    if (tableRef) tableRef.current = table;
  }, [table, tableRef]);

  // Round 3: Feature 5 — Validation errors map
  const validationErrors = React.useMemo<Map<string, Map<string, string>>>(() => {
    const map = new Map<string, Map<string, string>>();
    if (!enableValidation) return map;
    const rows = table.getFilteredRowModel().rows;
    for (const row of rows) {
      for (const cell of row.getVisibleCells()) {
        const auraMeta = getAuraMeta(cell.column);
        const dv = (auraMeta as AuraColumnMeta & { displayValidate?: (v: unknown, r: unknown) => string | undefined }).displayValidate;
        if (!dv) continue;
        const cellValue = cell.getValue();
        const msg = dv(cellValue, row.original);
        if (msg) {
          if (!map.has(row.id)) map.set(row.id, new Map());
          map.get(row.id)!.set(cell.column.id, msg);
        }
      }
    }
    return map;
  }, [enableValidation, table.getFilteredRowModel().rows]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fire onValidationChange whenever errors change
  React.useEffect(() => {
    if (!enableValidation) return;
    const errors: DataTableValidationError[] = [];
    for (const [rowId, fieldMap] of validationErrors.entries()) {
      for (const [field, message] of fieldMap.entries()) {
        const row = table.getRow(rowId);
        errors.push({ rowId, field, value: row ? row.getValue(field) : undefined, message });
      }
    }
    onValidationChange?.(errors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationErrors]);

  // Feature 8: keyboard shortcuts modal — listen for '?' on document
  React.useEffect(() => {
    if (!enableKeyboardShortcuts) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const tag = (event.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        event.preventDefault();
        setShortcutsOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts]);

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [overlayBoundary, setOverlayBoundary] = React.useState<HTMLDivElement | null>(null);
  const rootElRef = React.useRef<HTMLDivElement | null>(null);
  const handleRootRef = React.useCallback((node: HTMLDivElement | null) => {
    rootElRef.current = node;
    setOverlayBoundary(node);
  }, []);
  const allRows = table.getRowModel().rows;
  const pinnedRows = splitPinnedRows(allRows, rowPinning);
  const scrollRows = pinnedRows.center;
  const isVirtual = !!virtual;
  const rowVirtualOpts = typeof virtual === 'object' && virtual !== null ? virtual : {};
  const rowVirtualizer = useVirtualizer({
    count: scrollRows.length,
    estimateSize: (index) => {
      const row = scrollRows[index];
      return (row ? getRowHeight?.(row) : undefined) ?? rowVirtualOpts.estimatedRowHeight ?? 44;
    },
    getScrollElement: () => tableContainerRef.current,
    overscan: rowVirtualOpts.overscan ?? 10,
    enabled: isVirtual,
  });
  const virtualRows = isVirtual ? rowVirtualizer.getVirtualItems() : [];
  const fallbackVirtualRows =
    isVirtual && virtualRows.length === 0
      ? scrollRows.slice(0, Math.min(scrollRows.length, Math.max(1, rowVirtualOpts.overscan ?? 10)))
      : [];
  const paddingTop = isVirtual && virtualRows.length > 0 ? (virtualRows[0]?.start ?? 0) : 0;
  const paddingBottom =
    isVirtual && virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualRows[virtualRows.length - 1]?.end ?? 0)
      : 0;

  const leafColumns = table.getVisibleLeafColumns();
  const isColumnVirtual = !!virtualColumns;
  const columnVirtualOpts =
    typeof virtualColumns === 'object' && virtualColumns !== null ? virtualColumns : {};
  const columnVirtualizer = useVirtualizer({
    count: leafColumns.length,
    estimateSize: (index) =>
      leafColumns[index]?.getSize() ?? columnVirtualOpts.estimatedColumnWidth ?? 160,
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: columnVirtualOpts.overscan ?? 4,
    enabled: isColumnVirtual,
  });
  const virtualColumnItems = isColumnVirtual ? columnVirtualizer.getVirtualItems() : [];
  const fallbackColumnCount = Math.min(
    leafColumns.length,
    Math.max(1, (columnVirtualOpts.overscan ?? 4) * 2 + 4),
  );
  const renderedColumns = isColumnVirtual
    ? virtualColumnItems.length > 0
      ? virtualColumnItems.map((item) => leafColumns[item.index]).filter(isDefined)
      : leafColumns.slice(0, fallbackColumnCount)
    : leafColumns;
  const renderedColumnIds = new Set(renderedColumns.map((column) => column.id));
  const columnPaddingLeft =
    isColumnVirtual && virtualColumnItems.length > 0 ? (virtualColumnItems[0]?.start ?? 0) : 0;
  const columnPaddingRight =
    isColumnVirtual && virtualColumnItems.length > 0
      ? columnVirtualizer.getTotalSize() -
        (virtualColumnItems[virtualColumnItems.length - 1]?.end ?? 0)
      : 0;
  const colSpan = Math.max(
    renderedColumns.length + (columnPaddingLeft ? 1 : 0) + (columnPaddingRight ? 1 : 0),
    1,
  );
  const showToolbar =
    enableGlobalSearch ||
    enableAdvancedFiltering ||
    enableColumnConfiguration ||
    toolbar ||
    toolbarStart ||
    toolbarEnd ||
    (toolbarActions && toolbarActions.length > 0) ||
    enableDensityToggle ||
    treeData ||
    onRefresh ||
    enableKeyboardShortcuts ||
    enableExport ||
    enableConditionalFormatting ||
    enableFullscreen ||
    onPrint ||
    enablePivot ||
    enableSavedViews;

  const densityCellClass =
    density === 'compact' ? 'py-1 px-2' : density === 'comfortable' ? 'py-4 px-4' : 'p-3';

  const containerStyle: React.CSSProperties = {
    height: fullHeight ? '100%' : height,
    maxHeight: autoHeight ? undefined : (maxHeight ?? (isVirtual ? 600 : undefined)),
  };

  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!onLoadMore || !hasMore || loadingMore) return;
      const element = event.currentTarget;
      const remaining = element.scrollHeight - element.scrollTop - element.clientHeight;
      if (remaining <= loadMoreThreshold) onLoadMore();
    },
    [hasMore, loadMoreThreshold, loadingMore, onLoadMore],
  );

  const pinRow = (rowId: string, position: 'top' | 'bottom' | false) => {
    const top = new Set(rowPinning.top ?? []);
    const bottom = new Set(rowPinning.bottom ?? []);
    top.delete(rowId);
    bottom.delete(rowId);
    if (position === 'top') top.add(rowId);
    if (position === 'bottom') bottom.add(rowId);
    handleRowPinning({ top: Array.from(top), bottom: Array.from(bottom) });
  };

  const rowStatusBorderColor: Record<string, string> = {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  };

  // Normalized cell selection (start ≤ end)
  const normalizedCellSelection = React.useMemo<DataTableCellSelection | null>(() => {
    if (!cellSelection) return null;
    return {
      startRowIndex: Math.min(cellSelection.startRowIndex, cellSelection.endRowIndex),
      startColIndex: Math.min(cellSelection.startColIndex, cellSelection.endColIndex),
      endRowIndex: Math.max(cellSelection.startRowIndex, cellSelection.endRowIndex),
      endColIndex: Math.max(cellSelection.startColIndex, cellSelection.endColIndex),
    };
  }, [cellSelection]);

  const isCellSelected = React.useCallback(
    (rowIndex: number, colIndex: number): boolean => {
      if (!normalizedCellSelection) return false;
      return (
        rowIndex >= normalizedCellSelection.startRowIndex &&
        rowIndex <= normalizedCellSelection.endRowIndex &&
        colIndex >= normalizedCellSelection.startColIndex &&
        colIndex <= normalizedCellSelection.endColIndex
      );
    },
    [normalizedCellSelection],
  );

  const renderDataRow = (row: Row<TData>, rowIndex: number) => {
    const rowIsPinnedTop = rowPinning.top?.includes(row.id) ?? false;
    const rowIsPinnedBottom = rowPinning.bottom?.includes(row.id) ?? false;
    const isRowLoading = loadingRowIds?.includes(row.id) ?? false;
    const rowStatus = getRowStatus?.(row);
    const isDirty = dirtyRows.has(row.id);
    const isNewRow = enableLiveData && newRowIds.has(row.id);
    const isRemovedRow = enableLiveData && removedRowIds.has(row.id);
    const computedRowHeight = rowHeight != null
      ? typeof rowHeight === 'function' ? rowHeight(row, rowIndex) : rowHeight
      : undefined;
    const rowStyle: React.CSSProperties = {
      ...(getRowStyle?.(row)),
      borderLeft: rowStatus
        ? `3px solid ${rowStatusBorderColor[rowStatus] ?? 'transparent'}`
        : isDirty
          ? '3px solid #f59e0b'
          : undefined,
      height: computedRowHeight,
    };

    // Async detail panel loader
    const resolveDetailContent = (): React.ReactNode => {
      if (loadDetailPanel) {
        const cache = detailPanelCacheRef.current;
        if (cache.has(row.id)) return cache.get(row.id);
        if (!detailPanelLoadingRef.current.has(row.id)) {
          detailPanelLoadingRef.current.add(row.id);
          loadDetailPanel(row).then((content) => {
            // LRU eviction
            if (cache.size >= detailPanelCacheSize) {
              const firstKey = cache.keys().next().value;
              if (firstKey !== undefined) cache.delete(firstKey);
            }
            cache.set(row.id, content);
            detailPanelLoadingRef.current.delete(row.id);
            setDetailPanelVersion((v) => v + 1);
          }).catch(() => {
            detailPanelLoadingRef.current.delete(row.id);
          });
        }
        return (
          <span className="text-muted-foreground inline-flex items-center gap-2 text-sm">
            <span className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            Loading…
          </span>
        );
      }
      return renderDetailPanel?.(row);
    };

    const rowValidationErrors = enableValidation ? (validationErrors.get(row.id) ?? new Map<string, string>()) : new Map<string, string>();

    return (
      <React.Fragment key={row.id}>
        <tr
          role="row"
          aria-rowindex={rowIndex + 2}
          aria-selected={enableRowSelection !== false ? row.getIsSelected() : undefined}
          data-state={row.getIsSelected() ? 'selected' : undefined}
          data-pinned={rowIsPinnedTop ? 'top' : rowIsPinnedBottom ? 'bottom' : undefined}
          data-loading={isRowLoading || undefined}
          data-new-row={isNewRow || undefined}
          data-removed-row={isRemovedRow || undefined}
          draggable={enableRowReordering}
          onContextMenu={onRowContextMenu ? (event) => { event.preventDefault(); onRowContextMenu(row, event); } : undefined}
          onDragStart={(event) => {
            if (!enableRowReordering) return;
            setDraggedRowId(row.id);
            event.dataTransfer.effectAllowed = 'move';
          }}
          onDragOver={(event) => {
            if (enableRowReordering) event.preventDefault();
          }}
          onDrop={(event) => {
            if (!enableRowReordering || !draggedRowId) return;
            event.preventDefault();
            const nextRows = reorderRows(scrollRows, draggedRowId, row.id);
            onRowOrderChange?.(
              nextRows.map((item) => item.original),
              nextRows.map((item) => item.id),
            );
            setDraggedRowId(null);
          }}
          style={rowStyle}
          className={cn(
            'border-border hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
            striped && rowIndex % 2 !== 0 && 'bg-muted/30',
            rowIsPinnedTop && 'bg-bg shadow-sm',
            rowIsPinnedBottom && 'bg-bg shadow-sm',
            enableRowReordering && 'cursor-grab active:cursor-grabbing',
            isRowLoading && 'opacity-60 pointer-events-none',
            getRowClassName?.(row),
          )}
        >
          {columnPaddingLeft > 0 ? <td style={{ width: columnPaddingLeft }} /> : null}
          {renderRowCells({
            row,
            rowIndex,
            renderedColumnIds,
            enableExpanding,
            renderDetailPanel,
            getCellColSpan,
            getCellRowSpan,
            enableRowPinning,
            pinRow,
            text,
            overlayBoundary,
            treeData,
            densityCellClass,
            enableRowCopy,
            getCellClassName: getCellClassName as unknown as ((cell: Cell<TData, unknown>, row: Row<TData>) => string | undefined) | undefined,
            enableCellTooltip,
            onCellContextMenu: onCellContextMenu as unknown as ((cell: Cell<TData, unknown>, row: Row<TData>, event: React.MouseEvent) => void) | undefined,
            conditionalFormattingRules,
            enableCellSelection,
            isCellSelected,
            isSelectingCells,
            onCellMouseDown: enableCellSelection ? (ri, ci) => {
              handleCellSelectionChange({ startRowIndex: ri, startColIndex: ci, endRowIndex: ri, endColIndex: ci });
              setIsSelectingCells(true);
            } : undefined,
            onCellMouseEnter: enableCellSelection ? (ri, ci) => {
              if (!isSelectingCells) return;
              setCellSelection((prev) => prev ? { ...prev, endRowIndex: ri, endColIndex: ci } : prev);
            } : undefined,
            flashedCells: enableLiveData ? flashedCells.get(row.id) : undefined,
            onViewStats: enableToolPanel ? handleViewStats : undefined,
            rowValidationErrors,
          })}
          {columnPaddingRight > 0 ? <td style={{ width: columnPaddingRight }} /> : null}
        </tr>
        {(renderDetailPanel || loadDetailPanel) && row.getIsExpanded() ? (
          <tr className="border-border bg-muted/20 border-b">
            <td colSpan={colSpan} className="p-4">
              {/* detailPanelVersion triggers re-render when async content loads */}
              {detailPanelVersion >= 0 ? resolveDetailContent() : null}
            </td>
          </tr>
        ) : null}
      </React.Fragment>
    );
  };

  // Unique id for the tbody element (for aria-controls on search)
  const tbodyId = React.useId();
  const tbodyIdAttr = tbodyId ? `datatable-tbody-${tbodyId.replace(/:/g, '')}` : undefined;

  // Round 3: Feature 1 — if pivot is active, render pivot view instead
  if (enablePivot && pivotConfig) {
    return (
      <DataTablePivotView
        data={data as unknown[]}
        pivotConfig={pivotConfig}
        columns={columns as DataTableColumnDef<unknown, unknown>[]}
        className={className}
        onClearPivot={() => {
          setInternalPivotConfig(undefined);
          onPivotConfigChange?.({ rowGroupField: '', pivotField: '', valueField: '', aggregation: 'sum' });
        }}
      />
    );
  }

  return (
    <div
      ref={handleRootRef}
      data-datatable-root=""
      data-fullscreen={isFullscreen || undefined}
      dir={dir}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={(enableCopyPaste || enablePaste || enableUndoRedo) ? -1 : undefined}
      onKeyDown={(enableCopyPaste || enablePaste || enableUndoRedo) ? handleCopyPaste : undefined}
      className={cn(
        'relative isolate flex w-full min-w-0 flex-col rounded-lg border border-border',
        isFullscreen ? 'overflow-auto' : 'overflow-hidden',
        fullHeight && 'h-full',
        isFullscreen && 'fixed inset-0 z-50 bg-bg h-screen w-screen rounded-none border-none',
        '[&:fullscreen]:bg-bg [&:fullscreen]:overflow-auto [&:fullscreen]:p-4 [&:fullscreen]:border-none',
        mobileBreakpoint === 'sm' && 'sm:[display:revert]',
        mobileBreakpoint === 'md' && 'md:[display:revert]',
        className,
      )}
    >
      {showToolbar ? (
        slots?.Toolbar ? (
          <slots.Toolbar table={table} localeText={text} />
        ) : (
        <div className="data-table-toolbar relative flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
          <div className="flex flex-wrap items-center gap-2">
            {enableGlobalSearch ? (
              slots?.Search ? (
                <slots.Search
                  value={globalFilter}
                  onValueChange={handleGlobalFilter}
                  placeholder={globalFilterPlaceholder ?? text.searchPlaceholder}
                />
              ) : (
                <DataTableGlobalSearch
                  value={globalFilter}
                  onValueChange={handleGlobalFilter}
                  placeholder={globalFilterPlaceholder ?? text.searchPlaceholder}
                />
              )
            ) : null}
            {enableAdvancedFiltering ? (
              slots?.Filter ? (
                <slots.Filter
                  table={table}
                  filter={advancedFilter}
                  onFilterChange={handleAdvancedFilter}
                  localeText={text}
                  overlayBoundary={overlayBoundary}
                />
              ) : (
                <DataTableAdvancedFilter
                  table={table}
                  filter={advancedFilter}
                  onFilterChange={handleAdvancedFilter}
                  localeText={text}
                  overlayBoundary={overlayBoundary}
                />
              )
            ) : null}
            {toolbarStart}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {typeof toolbar === 'function' ? toolbar(table) : toolbar}
            {treeData ? (
              <>
                <DataTableToolbarButton
                  tooltip={text.expandAll}
                  onClick={() => table.toggleAllRowsExpanded(true)}
                  aria-label={text.expandAll}
                >
                  <ChevronsDown className="mr-1.5 size-4" />{text.expandAll}
                </DataTableToolbarButton>
                <DataTableToolbarButton
                  tooltip={text.collapseAll}
                  onClick={() => table.toggleAllRowsExpanded(false)}
                  aria-label={text.collapseAll}
                >
                  <ChevronsUpDown className="mr-1.5 size-4" />{text.collapseAll}
                </DataTableToolbarButton>
              </>
            ) : null}
            {toolbarActions?.map((action) =>
              action.render ? (
                <React.Fragment key={action.id}>
                  {action.render(table as Table<TData>)}
                </React.Fragment>
              ) : (
                <DataTableToolbarButton
                  key={action.id}
                  tooltip={action.tooltip}
                  disabled={action.disabled}
                  onClick={() => action.onClick?.(table as Table<TData>)}
                  aria-label={typeof action.label === 'string' ? action.label : action.id}
                >
                  {action.icon ?? action.label}
                </DataTableToolbarButton>
              ),
            )}
            {enableDensityToggle ? (
              <DataTableDensityMenu
                density={density}
                onDensityChange={handleDensityChange}
                localeText={text}
                overlayBoundary={overlayBoundary}
              />
            ) : null}
            {enableExport ? (
              <DataTableExportMenu
                table={table as unknown as Table<unknown>}
                localeText={text}
                overlayBoundary={overlayBoundary}
                options={typeof enableExport === 'object' ? enableExport : { csv: true, json: true, selectedCsv: true, xlsx: true }}
              />
            ) : null}
            {enableConditionalFormatting ? (
              <DataTableToolbarButton
                tooltip={text.conditionalFormatting ?? 'Conditional formatting'}
                onClick={() => handleOpenCfDrawer()}
                aria-label={text.conditionalFormatting ?? 'Conditional formatting'}
              >
                <Filter className="mr-1.5 size-4" />Format
              </DataTableToolbarButton>
            ) : null}
            {enablePivot ? (
              <>
                <DataTableToolbarButton
                  tooltip="Pivot mode"
                  onClick={() => setPivotDrawerOpen(true)}
                  aria-label="Pivot mode"
                >
                  <GitBranch className="mr-1.5 size-4" />Pivot
                </DataTableToolbarButton>
                {pivotConfig ? (
                  <span className="bg-primary/10 text-primary border-primary/30 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium">
                    Pivot active
                    <button
                      type="button"
                      aria-label="Clear pivot"
                      className="hover:text-destructive ml-0.5 leading-none"
                      onClick={() => {
                        setInternalPivotConfig(undefined);
                        onPivotConfigChange?.({ rowGroupField: '', pivotField: '', valueField: '', aggregation: 'sum' });
                      }}
                    >×</button>
                  </span>
                ) : null}
              </>
            ) : null}
            {enableSavedViews ? (
              <DataTableToolbarButton
                tooltip="Saved views"
                onClick={() => setSavedViewsDrawerOpen(true)}
                aria-label="Saved views"
              >
                <Bookmark className="mr-1.5 size-4" />Views
              </DataTableToolbarButton>
            ) : null}
            {onRefresh ? (
              <DataTableToolbarButton
                tooltip={text.refresh}
                onClick={onRefresh}
                aria-label={text.refresh}
              >
                <RefreshCw className="mr-1.5 size-4" />{text.refresh}
              </DataTableToolbarButton>
            ) : null}
            {onPrint ? (
              <DataTableToolbarButton
                tooltip={text.printTitle}
                onClick={() => {
                  onPrint?.();
                  const cleanup = applyPrintTheme();
                  window.print();
                  window.addEventListener('afterprint', cleanup, { once: true });
                }}
                aria-label={text.printTitle}
              >
                <Printer className="mr-1.5 size-4" />{text.printTitle}
              </DataTableToolbarButton>
            ) : null}
            {enableFullscreen ? (
              <DataTableToolbarButton
                tooltip={isFullscreen ? text.exitFullscreen : text.enterFullscreen}
                onClick={handleFullscreenToggle}
                aria-label={isFullscreen ? text.exitFullscreen : text.enterFullscreen}
              >
                {isFullscreen
                  ? <><Minimize2 className="mr-1.5 size-4" />{text.exitFullscreen}</>
                  : <><Maximize2 className="mr-1.5 size-4" />{text.enterFullscreen}</>}
              </DataTableToolbarButton>
            ) : null}
            {enableColumnConfiguration ? (
              <DataTableColumnConfiguration
                table={table}
                selectedColumnIds={selectedColumnIds}
                onSelectedColumnIdsChange={handleColumnSelection}
                localeText={text}
                enableColumnSelection={enableColumnSelection}
                enableGrouping={enableGrouping}
                enableColumnPinning={enableColumnPinning}
                overlayBoundary={overlayBoundary}
              />
            ) : null}
            {enableKeyboardShortcuts ? (
              <DataTableToolbarButton
                tooltip="Keyboard shortcuts"
                onClick={() => setShortcutsOpen(true)}
                aria-label="Keyboard shortcuts"
              >
                <HelpCircle className="mr-1.5 size-4" />Shortcuts
              </DataTableToolbarButton>
            ) : null}
            {toolbarEnd}
          </div>
        </div>
        )
      ) : null}

      {bulkActions && bulkActions.length > 0 && table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DataTableBulkActionsBar
          table={table as unknown as Table<unknown>}
          actions={bulkActions as DataTableBulkAction[]}
          localeText={text}
        />
      ) : null}

      {/* Round 2: Feature 1 — Cell Selection Bulk Edit Bar */}
      {enableCellSelection && normalizedCellSelection && (() => {
        const rowSpan = normalizedCellSelection.endRowIndex - normalizedCellSelection.startRowIndex + 1;
        const colSpan2 = normalizedCellSelection.endColIndex - normalizedCellSelection.startColIndex + 1;
        const totalCells = rowSpan * colSpan2;
        if (totalCells <= 1) return null;
        return (
          <div className="bg-primary/10 border-primary/30 flex flex-wrap items-center gap-3 rounded-md border px-3 py-2 text-sm">
            <span className="text-primary font-medium">
              {totalCells} cells selected across {rowSpan} rows
            </span>
            <div className="flex items-center gap-2">
              <Input
                value={bulkEditValue}
                onChange={(e) => setBulkEditValue(e.target.value)}
                placeholder="Set all to…"
                className="h-7 w-36 text-xs"
              />
              <Button
                type="button"
                variant="default"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  const visibleLeafCols = table.getVisibleLeafColumns();
                  const rowModel = table.getRowModel().rows;
                  for (let ri = normalizedCellSelection.startRowIndex; ri <= normalizedCellSelection.endRowIndex; ri++) {
                    const row = rowModel[ri];
                    if (!row) continue;
                    for (let ci = normalizedCellSelection.startColIndex; ci <= normalizedCellSelection.endColIndex; ci++) {
                      const col = visibleLeafCols[ci];
                      if (!col) continue;
                      const auraMeta = getAuraMeta(col);
                      if (auraMeta.valueSetter) {
                        auraMeta.valueSetter(row.original, bulkEditValue, ri);
                      }
                    }
                  }
                  setBulkEditValue('');
                }}
              >
                Apply
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => handleCellSelectionChange(null)}
              >
                Clear
              </Button>
            </div>
          </div>
        );
      })()}

      {/* Feature 5: Active filter chips */}
      {enableFilterChips && table.getState().columnFilters.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 pb-2 pt-1.5">
          {table.getState().columnFilters.map((filter) => {
            const col = table.getColumn(filter.id);
            const label = col
              ? typeof col.columnDef.header === 'string'
                ? col.columnDef.header
                : filter.id
              : filter.id;
            return (
              <span
                key={filter.id}
                className="border-border bg-muted inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
              >
                <span className="font-medium">{label}:</span>
                <span>{String(filter.value ?? '')}</span>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground ml-0.5 leading-none"
                  aria-label={`Remove ${label} filter`}
                  onClick={() => col?.setFilterValue(undefined)}
                >
                  ×
                </button>
              </span>
            );
          })}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => table.resetColumnFilters()}
          >
            Clear filters
          </Button>
        </div>
      ) : null}

      {mobileBreakpoint ? (
        <DataTableCardView
          table={table as unknown as Table<unknown>}
          breakpoint={mobileBreakpoint}
          allRows={allRows as Row<unknown>[]}
        />
      ) : null}

      {/* Round 2: Feature 2 — Tool Panel wrapper */}
      <div className={cn('flex min-h-0 min-w-0', enableToolPanel && 'flex-1 gap-0', fullHeight && 'flex-1')}>
      <div
        ref={tableContainerRef}
        onScroll={handleScroll}
        style={containerStyle}
        className={cn(
          'min-w-0',
          !autoHeight && 'overflow-auto',
          fullHeight && 'min-h-0 flex-1',
          enableToolPanel && 'flex-1',
          mobileBreakpoint === 'sm' && 'hidden sm:block',
          mobileBreakpoint === 'md' && 'hidden md:block',
          mobileBreakpoint === 'lg' && 'hidden lg:block',
          tableClassName,
        )}
      >
        {/* Feature 3 ARIA: aria-rowcount, aria-colcount */}
        <table
          className="w-full caption-bottom text-sm"
          role="grid"
          aria-rowcount={serverSide ? serverSide.rowCount : table.getFilteredRowModel().rows.length + 1}
          aria-colcount={table.getVisibleLeafColumns().length}
        >
          <thead className="bg-bg [&_tr]:border-border sticky top-0 z-20 [&_tr]:border-b">
            {isColumnVirtual ? (
              <tr role="row" aria-rowindex={1} className="hover:bg-muted/50">
                {columnPaddingLeft > 0 ? <th style={{ width: columnPaddingLeft }} /> : null}
                {renderedColumns.map((column, colIdx) => (
                  <DataTableLeafHeader
                    key={column.id}
                    column={column}
                    colIndex={colIdx}
                    table={table}
                    enableSorting={enableSorting}
                    enableColumnResizing={enableColumnResizing}
                    enableColumnReordering={enableColumnReordering}
                    enableColumnPinning={enableColumnPinning}
                    enableGrouping={enableGrouping}
                    enableColumnSelection={enableColumnSelection}
                    selectedColumnIds={selectedColumnIds}
                    onSelectedColumnIdsChange={handleColumnSelection}
                    draggedColumnId={draggedColumnId}
                    onDraggedColumnIdChange={setDraggedColumnId}
                    onColumnOrderChange={handleColumnOrder}
                    localeText={text}
                    overlayBoundary={overlayBoundary}
                    CustomColumnMenu={slots?.ColumnMenu}
                    enableColumnCopy={enableColumnCopy}
                    enableColumnAutoSize={enableColumnAutoSize}
                    lockedColumns={lockedColumns}
                    onLockedColumnsChange={handleLockedColumnsChange}
                    quickFilterColumns={quickFilterColumns}
                    onOpenConditionalFormatting={enableConditionalFormatting ? handleOpenCfDrawer : undefined}
                    onViewStats={enableToolPanel ? handleViewStats : undefined}
                  />
                ))}
                {columnPaddingRight > 0 ? <th style={{ width: columnPaddingRight }} /> : null}
              </tr>
            ) : (
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} role="row" aria-rowindex={1} className="hover:bg-muted/50">
                  {headerGroup.headers.map((header, colIdx) => (
                    <DataTableHeader
                      key={header.id}
                      header={header}
                      colIndex={colIdx}
                      table={table}
                      enableSorting={enableSorting}
                      enableColumnResizing={enableColumnResizing}
                      enableColumnReordering={enableColumnReordering}
                      enableColumnPinning={enableColumnPinning}
                      enableGrouping={enableGrouping}
                      enableColumnSelection={enableColumnSelection}
                      selectedColumnIds={selectedColumnIds}
                      onSelectedColumnIdsChange={handleColumnSelection}
                      draggedColumnId={draggedColumnId}
                      onDraggedColumnIdChange={setDraggedColumnId}
                      onColumnOrderChange={handleColumnOrder}
                      localeText={text}
                      overlayBoundary={overlayBoundary}
                      CustomColumnMenu={slots?.ColumnMenu}
                      enableColumnCopy={enableColumnCopy}
                      enableColumnAutoSize={enableColumnAutoSize}
                      lockedColumns={lockedColumns}
                      onLockedColumnsChange={handleLockedColumnsChange}
                      quickFilterColumns={quickFilterColumns}
                      onOpenConditionalFormatting={enableConditionalFormatting ? handleOpenCfDrawer : undefined}
                      onViewStats={enableToolPanel ? handleViewStats : undefined}
                    />
                  ))}
                </tr>
              ))
            )}
            {/* Feature 4: Header stats row */}
            {enableHeaderStats ? (
              <DataTableHeaderStatsRow
                table={table as unknown as Table<unknown>}
                renderedColumnIds={renderedColumnIds}
                columnPaddingLeft={columnPaddingLeft}
                columnPaddingRight={columnPaddingRight}
                headerStatsConfig={headerStatsConfig}
              />
            ) : null}
          </thead>
          <tbody id={tbodyIdAttr} className="[&_tr:last-child]:border-0">
            {error ? (
              <tr>
                <td colSpan={colSpan} className="text-destructive h-24 text-center">
                  {error}
                </td>
              </tr>
            ) : loading ? (
              renderLoadingRows({
                colSpan,
                columns: renderedColumns.length,
                variant: loadingVariant,
                rows: skeletonRows,
                text,
                LoadingSkeleton: slots?.LoadingSkeleton,
                LoadingOverlay: slots?.LoadingOverlay,
              })
            ) : allRows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="h-24 text-center">
                  {data.length === 0
                    ? slots?.NoRowsOverlay
                      ? <slots.NoRowsOverlay />
                      : (noRowsOverlay ?? emptyState ?? (
                          <span className="text-muted-foreground">{text.noRows}</span>
                        ))
                    : slots?.NoResultsOverlay
                      ? <slots.NoResultsOverlay />
                      : (noResultsOverlay ?? emptyState ?? (
                          <span className="text-muted-foreground">{text.noResults}</span>
                        ))}
                </td>
              </tr>
            ) : (
              <>
                {inlineCreateRow ? (
                  <DataTableInlineCreateRow
                    createRow={inlineCreateRow}
                    colSpan={colSpan}
                    localeText={text}
                  />
                ) : null}
                {pinnedRows.top.map((row, i) => renderDataRow(row, i))}
                {isVirtual ? (
                  virtualRows.length > 0 ? (
                    <>
                      {paddingTop > 0 ? (
                        <tr>
                          <td style={{ height: paddingTop }} colSpan={colSpan} />
                        </tr>
                      ) : null}
                      {virtualRows.map((virtualRow) => {
                        const row = scrollRows[virtualRow.index];
                        return row ? renderDataRow(row, virtualRow.index) : null;
                      })}
                      {paddingBottom > 0 ? (
                        <tr>
                          <td style={{ height: paddingBottom }} colSpan={colSpan} />
                        </tr>
                      ) : null}
                    </>
                  ) : (
                    fallbackVirtualRows.map((row, i) => renderDataRow(row, i))
                  )
                ) : (
                  scrollRows.map((row, i) => renderDataRow(row, i))
                )}
                {pinnedRows.bottom.map((row, i) => renderDataRow(row, scrollRows.length + i))}
                {loadingMore ? (
                  <tr>
                    <td colSpan={colSpan} className="text-muted-foreground h-12 text-center">
                      {text.loadingMore}
                    </td>
                  </tr>
                ) : null}
              </>
            )}
          </tbody>
          {showColumnTotals && aggregations ? (
            <DataTableFooter
              table={table}
              aggregations={aggregations}
              renderedColumnIds={renderedColumnIds}
              columnPaddingLeft={columnPaddingLeft}
              columnPaddingRight={columnPaddingRight}
              localeText={text}
            />
          ) : null}
        </table>
      </div>

      {/* Round 2: Feature 2 — Tool Panel */}
      {enableToolPanel ? (
        <DataTableToolPanel
          table={table as unknown as Table<unknown>}
          open={toolPanelOpen}
          tab={toolPanelTab}
          onTabChange={setToolPanelTab}
          onOpenChange={setToolPanelOpen}
          statsColumnId={statsColumnId}
          onStatsColumnChange={setStatsColumnId}
        />
      ) : null}
      </div>{/* end tool panel wrapper */}

      {enablePagination ? (
        <div className="data-table-pagination border-t border-border">
          {slots?.Pagination ? (
            <slots.Pagination table={table} localeText={text} pageSizeOptions={pageSizeOptions} />
          ) : (
            <DataTablePagination
              table={table}
              localeText={text}
              pageSizeOptions={pageSizeOptions}
              showTotalRows={showTotalRows}
              overlayBoundary={overlayBoundary}
            />
          )}
        </div>
      ) : null}

      {enableStatusBar ? (
        <DataTableStatusBar
          table={table as unknown as Table<unknown>}
          localeText={text}
          validationErrorCount={enableValidation ? (() => { let count = 0; for (const m of validationErrors.values()) count += m.size; return count; })() : 0}
        />
      ) : null}

      {enableConditionalFormatting ? (
        <DataTableConditionalFormattingDrawer
          table={table as unknown as Table<unknown>}
          open={cfDrawerOpen}
          onOpenChange={setCfDrawerOpen}
          initialColumnId={cfInitialColumnId}
          rules={conditionalFormattingRules}
          onRulesChange={handleConditionalRulesChange}
        />
      ) : null}

      {/* Feature 8: Keyboard shortcuts modal */}
      {enableKeyboardShortcuts ? (
        <DataTableKeyboardShortcutsModal
          open={shortcutsOpen}
          onOpenChange={setShortcutsOpen}
          enablePaste={enablePaste}
        />
      ) : null}

      {/* Round 3: Feature 1 — Pivot config drawer */}
      {enablePivot ? (
        <DataTablePivotConfigPanel
          open={pivotDrawerOpen}
          onOpenChange={setPivotDrawerOpen}
          columns={columns as DataTableColumnDef<unknown, unknown>[]}
          currentConfig={pivotConfig}
          onApply={handlePivotConfigChange}
          onClear={() => {
            setInternalPivotConfig(undefined);
            onPivotConfigChange?.({ rowGroupField: '', pivotField: '', valueField: '', aggregation: 'sum' });
          }}
        />
      ) : null}

      {/* Round 3: Feature 2 — Saved views drawer */}
      {enableSavedViews ? (
        <DataTableSavedViewsDrawer
          open={savedViewsDrawerOpen}
          onOpenChange={setSavedViewsDrawerOpen}
          views={savedViews}
          onViewsChange={handleViewsChange}
          table={table as unknown as Table<unknown>}
          density={density}
          setDensity={handleDensityChange}
          conditionalFormattingRules={conditionalFormattingRules}
          handleConditionalRulesChange={handleConditionalRulesChange as (rules: DataTableConditionalRule[]) => void}
        />
      ) : null}
    </div>
  );
}

interface DataTableHeaderProps<TData> {
  header: ReturnType<Table<TData>['getHeaderGroups']>[number]['headers'][number];
  table: Table<TData>;
  enableSorting: boolean;
  enableColumnResizing: boolean;
  enableColumnReordering: boolean;
  enableColumnPinning: boolean;
  enableGrouping: boolean;
  enableColumnSelection: boolean;
  selectedColumnIds: string[];
  onSelectedColumnIdsChange: (columnIds: string[]) => void;
  draggedColumnId: string | null;
  onDraggedColumnIdChange: (columnId: string | null) => void;
  onColumnOrderChange: OnChangeFn<ColumnOrderState>;
  localeText: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
  CustomColumnMenu?: React.ComponentType<DataTableColumnMenuSlotProps<TData>>;
  enableColumnCopy?: boolean;
  enableColumnAutoSize?: boolean;
  lockedColumns?: string[];
  onLockedColumnsChange?: (cols: string[]) => void;
  quickFilterColumns?: string[];
  onOpenConditionalFormatting?: (columnId: string) => void;
  onViewStats?: (columnId: string) => void;
  colIndex?: number;
}

function DataTableHeader<TData>({ header, colIndex, ...props }: DataTableHeaderProps<TData>) {
  if (header.isPlaceholder) {
    return <th colSpan={header.colSpan} aria-colindex={colIndex !== undefined ? colIndex + 1 : undefined} />;
  }
  // Group headers span multiple leaf columns — render as a simple centered label with no interactive controls
  if (header.colSpan > 1) {
    return (
      <th
        colSpan={header.colSpan}
        aria-colindex={colIndex !== undefined ? colIndex + 1 : undefined}
        className="border-b border-border bg-muted/30 px-3 py-1.5 text-center text-xs font-semibold tracking-wide text-muted-foreground"
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
      </th>
    );
  }
  return (
    <DataTableLeafHeader
      column={header.column}
      colSpan={header.colSpan}
      colIndex={colIndex}
      headerContent={flexRender(header.column.columnDef.header, header.getContext())}
      resizeHandler={header.getResizeHandler()}
      {...props}
    />
  );
}

function getColumnHeaderText<TData>(column: Column<TData, unknown>) {
  return typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id;
}

interface DataTableLeafHeaderProps<TData> extends Omit<DataTableHeaderProps<TData>, 'header'> {
  column: Column<TData, unknown>;
  colSpan?: number;
  headerContent?: React.ReactNode;
  resizeHandler?: (event: unknown) => void;
  colIndex?: number;
}

function DataTableLeafHeader<TData>({
  column,
  table,
  colSpan,
  headerContent,
  resizeHandler,
  colIndex,
  enableSorting,
  enableColumnResizing,
  enableColumnReordering,
  enableColumnPinning,
  enableGrouping,
  enableColumnSelection,
  selectedColumnIds,
  onSelectedColumnIdsChange,
  draggedColumnId,
  onDraggedColumnIdChange,
  onColumnOrderChange,
  localeText,
  overlayBoundary,
  CustomColumnMenu,
  enableColumnCopy,
  enableColumnAutoSize,
  lockedColumns,
  onLockedColumnsChange,
  quickFilterColumns,
  onOpenConditionalFormatting,
  onViewStats,
}: DataTableLeafHeaderProps<TData>) {
  const [quickFilter, setQuickFilter] = React.useState('');
  const isLocked = lockedColumns?.includes(column.id) ?? false;
  const showQuickFilter = quickFilterColumns?.includes(column.id) ?? false;
  const canSort = enableSorting && column.getCanSort();
  const sortDir = column.getIsSorted();
  const isPinned = column.getIsPinned();
  const selected = selectedColumnIds.includes(column.id);
  const auraMeta = getAuraMeta(column);
  const align = auraMeta.align ?? 'left';
  const flex = auraMeta.flex;
  const description = auraMeta.description;

  return (
    <th
      scope="col"
      role="columnheader"
      colSpan={colSpan}
      aria-colindex={colIndex !== undefined ? colIndex + 1 : undefined}
      aria-selected={selected || undefined}
      aria-sort={
        sortDir === 'asc'
          ? 'ascending'
          : sortDir === 'desc'
            ? 'descending'
            : canSort
              ? 'none'
              : undefined
      }
      data-pinned={isPinned || undefined}
      data-state={selected ? 'selected' : undefined}
      draggable={enableColumnReordering}
      onDragStart={(event) => {
        if (!enableColumnReordering) return;
        onDraggedColumnIdChange(column.id);
        event.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={(event) => {
        if (enableColumnReordering) event.preventDefault();
      }}
      onDrop={(event) => {
        if (!enableColumnReordering || !draggedColumnId) return;
        event.preventDefault();
        const ids = table.getAllLeafColumns().map((item) => item.id);
        const next = reorderIds(ids, draggedColumnId, column.id);
        onColumnOrderChange(next);
        onDraggedColumnIdChange(null);
      }}
      style={{
        width: flex ? undefined : column.getSize(),
        minWidth: flex ? column.getSize() : undefined,
        flex: flex ? String(flex) : undefined,
        position: isPinned ? 'sticky' : undefined,
        left: isPinned === 'left' ? column.getStart('left') : undefined,
        right: isPinned === 'right' ? column.getAfter('right') : undefined,
        background: isPinned ? 'inherit' : undefined,
        zIndex: isPinned ? 1 : undefined,
      }}
      className={cn(
        'text-muted-foreground group relative h-10 whitespace-nowrap px-3 align-middle font-medium',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        canSort && 'cursor-pointer select-none',
        enableColumnReordering && 'cursor-grab active:cursor-grabbing',
        selected && 'bg-muted text-foreground',
      )}
      onClick={canSort ? column.getToggleSortingHandler() : undefined}
    >
      {/* Text + sort icon — column menu is NOT in this flex container so it
          never shifts the text position. Right-aligned cells and headers now
          share the same right edge regardless of whether the menu is visible. */}
      <div
        className={cn(
          'flex min-w-0 items-center gap-1.5',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end',
        )}
      >
        {canSort && align === 'right' ? (
          <span className="inline-flex shrink-0 items-center gap-0.5">
            {sortDir === 'asc' ? (
              <ChevronUp className="size-4" />
            ) : sortDir === 'desc' ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronsUpDown className="size-4 opacity-50" />
            )}
            {sortDir && (() => {
              const sortedCols = table.getState().sorting;
              const idx = sortedCols.findIndex((s) => s.id === column.id);
              return sortedCols.length > 1 && idx >= 0 ? (
                <span className="text-primary text-[10px] font-bold leading-none">{idx + 1}</span>
              ) : null;
            })()}
          </span>
        ) : null}
        <span className="min-w-0 truncate" title={description}>
          {headerContent ?? getColumnHeaderText(column)}
        </span>
        {description ? (
          <span
            className="text-muted-foreground/60 inline-flex shrink-0 cursor-help"
            title={description}
            aria-label={description}
          >
            ℹ
          </span>
        ) : null}
        {canSort && align !== 'right' ? (
          <span className="inline-flex shrink-0 items-center gap-0.5">
            {sortDir === 'asc' ? (
              <ChevronUp className="size-4" />
            ) : sortDir === 'desc' ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronsUpDown className="size-4 opacity-50" />
            )}
            {sortDir && (() => {
              const sortedCols = table.getState().sorting;
              const idx = sortedCols.findIndex((s) => s.id === column.id);
              return sortedCols.length > 1 && idx >= 0 ? (
                <span className="text-primary text-[10px] font-bold leading-none">{idx + 1}</span>
              ) : null;
            })()}
          </span>
        ) : null}
      </div>
      {/* Column menu absolutely positioned — never affects text alignment */}
      <div
        className="absolute right-0 top-0 z-[5] flex h-full items-center px-1 opacity-0 focus-within:opacity-100 group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {CustomColumnMenu ? (
          <CustomColumnMenu column={column} table={table} />
        ) : (
          <DataTableColumnMenu
            column={column}
            table={table}
            localeText={localeText}
            enableColumnPinning={enableColumnPinning}
            enableGrouping={enableGrouping}
            enableColumnSelection={enableColumnSelection}
            selectedColumnIds={selectedColumnIds}
            onSelectedColumnIdsChange={onSelectedColumnIdsChange}
            overlayBoundary={overlayBoundary}
            enableColumnCopy={enableColumnCopy}
            lockedColumns={lockedColumns}
            onLockedColumnsChange={onLockedColumnsChange}
            onOpenConditionalFormatting={onOpenConditionalFormatting}
            onViewStats={onViewStats}
          />
        )}
      </div>
      {enableColumnResizing && column.getCanResize() && resizeHandler && !isLocked ? (
        <div
          onMouseDown={(event) => resizeHandler(event)}
          onTouchStart={(event) => resizeHandler(event)}
          onDoubleClick={enableColumnAutoSize ? () => {
            // Auto-size: measure the max content width from all visible cells
            const tableEl = document.querySelector('[data-datatable-root] table');
            if (!tableEl) return;
            const colIndex = table.getAllLeafColumns().findIndex((c) => c.id === column.id);
            const cells = tableEl.querySelectorAll<HTMLElement>(`tr td:nth-child(${colIndex + 1}), tr th:nth-child(${colIndex + 1})`);
            let maxWidth = 60;
            cells.forEach((el) => {
              maxWidth = Math.max(maxWidth, el.scrollWidth);
            });
            table.setColumnSizing((prev) => ({ ...prev, [column.id]: maxWidth }));
          } : undefined}
          className={cn(
            'absolute right-0 top-0 z-10 flex h-full w-3 cursor-col-resize touch-none select-none items-center justify-center',
            'opacity-0 group-hover:opacity-100',
            column.getIsResizing() && 'opacity-100',
          )}
          title={enableColumnAutoSize ? localeText.autoSizeColumn : undefined}
        >
          <div className={cn(
            'bg-border h-full w-px',
            column.getIsResizing() && 'bg-primary w-0.5',
          )} />
        </div>
      ) : null}
      {showQuickFilter ? (
        <div
          className="px-1 pb-1 pt-0.5"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <Input
            value={quickFilter}
            onChange={(event) => {
              setQuickFilter(event.target.value);
              column.setFilterValue(event.target.value || undefined);
            }}
            placeholder={localeText.quickFilterPlaceholder}
            className="h-6 text-xs"
            aria-label={`Filter ${getColumnHeaderText(column)}`}
          />
        </div>
      ) : null}
    </th>
  );
}

interface DataTableColumnMenuProps<TData> {
  column: Column<TData, unknown>;
  table: Table<TData>;
  localeText: DataTableLocaleText;
  enableColumnPinning: boolean;
  enableGrouping: boolean;
  enableColumnSelection: boolean;
  selectedColumnIds: string[];
  onSelectedColumnIdsChange: (columnIds: string[]) => void;
  overlayBoundary?: HTMLDivElement | null;
  enableColumnCopy?: boolean;
  lockedColumns?: string[];
  onLockedColumnsChange?: (cols: string[]) => void;
  onOpenConditionalFormatting?: (columnId: string) => void;
  onViewStats?: (columnId: string) => void;
}

function DataTableColumnMenu<TData>({
  column,
  table,
  localeText,
  enableColumnPinning,
  enableGrouping,
  enableColumnSelection,
  selectedColumnIds,
  onSelectedColumnIdsChange,
  overlayBoundary,
  enableColumnCopy,
  lockedColumns,
  onLockedColumnsChange,
  onOpenConditionalFormatting,
  onViewStats,
}: DataTableColumnMenuProps<TData>) {
  const handleCopyColumn = () => {
    const rows = table.getFilteredRowModel().rows;
    const header = typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id;
    const values = [header, ...rows.map((row) => String(row.getValue(column.id) ?? ''))].join('\n');
    navigator.clipboard?.writeText(values).catch(() => undefined);
  };
  const isLocked = lockedColumns?.includes(column.id) ?? false;
  const handleToggleLock = () => {
    if (!onLockedColumnsChange) return;
    const current = lockedColumns ?? [];
    onLockedColumnsChange(
      isLocked ? current.filter((id) => id !== column.id) : [...current, column.id],
    );
  };
  return (
    <span className="inline-flex">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`${column.id} ${localeText.columnMenu}`}
            className="h-7 w-7"
          >
            ⋮
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          align="end"
          container={overlayBoundary}
          collisionBoundary={overlayBoundary}
          collisionPadding={8}
          strategy="absolute"
          sticky="always"
          className="bg-popover relative z-[1000] max-h-[min(45dvh,18rem,var(--aura-ui-popper-available-height))] min-w-44 overflow-y-auto"
        >
          <MenuButton onClick={() => column.toggleSorting(false)}>{localeText.sortAsc}</MenuButton>
          <MenuButton onClick={() => column.toggleSorting(true)}>{localeText.sortDesc}</MenuButton>
          <MenuButton
            onClick={() =>
              table.setSorting((state) => state.filter((item) => item.id !== column.id))
            }
          >
            {localeText.clearSort}
          </MenuButton>
          {column.getCanHide() ? (
            <MenuButton onClick={() => column.toggleVisibility(false)}>
              {localeText.hideColumn}
            </MenuButton>
          ) : null}
          {enableColumnPinning ? (
            <>
              <MenuButton onClick={() => column.pin('left')}>{localeText.pinLeft}</MenuButton>
              <MenuButton onClick={() => column.pin('right')}>{localeText.pinRight}</MenuButton>
              <MenuButton onClick={() => column.pin(false)}>{localeText.unpin}</MenuButton>
            </>
          ) : null}
          {enableGrouping && column.getCanGroup() ? (
            <MenuButton onClick={() => column.toggleGrouping()}>
              {column.getIsGrouped() ? localeText.ungroup : localeText.groupBy}
            </MenuButton>
          ) : null}
          {enableColumnSelection ? (
            <MenuButton
              onClick={() => onSelectedColumnIdsChange(toggleId(selectedColumnIds, column.id))}
            >
              {localeText.selectColumn}
            </MenuButton>
          ) : null}
          {enableColumnCopy ? (
            <MenuButton onClick={handleCopyColumn}>{localeText.copyColumn}</MenuButton>
          ) : null}
          {onLockedColumnsChange ? (
            <MenuButton onClick={handleToggleLock}>
              {isLocked ? localeText.unlockColumn : localeText.lockColumn}
            </MenuButton>
          ) : null}
          {onOpenConditionalFormatting ? (
            <MenuButton onClick={() => onOpenConditionalFormatting(column.id)}>
              {localeText.conditionalFormatting ?? 'Conditional formatting'}
            </MenuButton>
          ) : null}
          {onViewStats ? (
            <MenuButton onClick={() => onViewStats(column.id)}>
              View statistics
            </MenuButton>
          ) : null}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </span>
  );
}

function MenuButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <DropdownMenu.Item className="cursor-pointer" onSelect={onClick}>
      {children}
    </DropdownMenu.Item>
  );
}

function renderRowCells<TData>({
  row,
  rowIndex,
  renderedColumnIds,
  enableExpanding,
  renderDetailPanel,
  getCellColSpan,
  getCellRowSpan,
  enableRowPinning,
  pinRow,
  text,
  overlayBoundary,
  treeData,
  densityCellClass,
  enableRowCopy,
  getCellClassName,
  enableCellTooltip,
  onCellContextMenu,
  conditionalFormattingRules,
  enableCellSelection,
  isCellSelected,
  isSelectingCells,
  onCellMouseDown,
  onCellMouseEnter,
  flashedCells,
  onViewStats,
  rowValidationErrors,
}: {
  row: Row<TData>;
  rowIndex: number;
  renderedColumnIds: Set<string>;
  enableExpanding: boolean;
  renderDetailPanel?: (row: Row<TData>) => React.ReactNode;
  getCellColSpan?: (cell: Cell<TData, unknown>, row: Row<TData>) => number | undefined;
  getCellRowSpan?: (cell: Cell<TData, unknown>, row: Row<TData>) => number | undefined;
  enableRowPinning: boolean;
  pinRow: (rowId: string, position: 'top' | 'bottom' | false) => void;
  text: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
  treeData: boolean;
  densityCellClass: string;
  enableRowCopy: boolean;
  getCellClassName?: (cell: Cell<TData, unknown>, row: Row<TData>) => string | undefined;
  enableCellTooltip?: boolean;
  onCellContextMenu?: (cell: Cell<TData, unknown>, row: Row<TData>, event: React.MouseEvent) => void;
  conditionalFormattingRules?: DataTableConditionalRule[];
  enableCellSelection?: boolean;
  isCellSelected?: (rowIndex: number, colIndex: number) => boolean;
  isSelectingCells?: boolean;
  onCellMouseDown?: (rowIndex: number, colIndex: number) => void;
  onCellMouseEnter?: (rowIndex: number, colIndex: number) => void;
  flashedCells?: Set<string>;
  onViewStats?: (columnId: string) => void;
  rowValidationErrors?: Map<string, string>;
}) {
  const copyRow = (row: Row<TData>) => {
    const cells = row.getVisibleCells().filter((c) => !c.column.id.startsWith('__'));
    const tsv = cells.map((c) => String(c.getValue() ?? '')).join('\t');
    navigator.clipboard?.writeText(tsv).catch(() => undefined);
  };
  const cells = row.getVisibleCells().filter((cell) => renderedColumnIds.has(cell.column.id));
  let skip = 0;
  return cells.map((cell, index) => {
    if (skip > 0) {
      skip -= 1;
      return null;
    }
    const isPinned = cell.column.getIsPinned();
    const requestedColSpan = Math.max(getCellColSpan?.(cell, row) ?? 1, 1);
    const colSpan = Math.min(requestedColSpan, cells.length - index);
    const rowSpan = Math.max(getCellRowSpan?.(cell, row) ?? 1, 1);
    skip = colSpan - 1;
    const canExpand = (enableExpanding && row.getCanExpand()) || !!renderDetailPanel;
    const auraMeta = getAuraMeta(cell.column);
    const align = auraMeta.align ?? 'left';
    const flex = auraMeta.flex;
    const treeIndent = treeData && index === 0 ? row.depth * 16 : 0;
    const cellIsSelected = isCellSelected ? isCellSelected(rowIndex, index) : false;
    const cellIsFlashed = flashedCells ? flashedCells.has(cell.column.id) : false;
    const validationError = rowValidationErrors?.get(cell.column.id);
    const conditionalRule = conditionalFormattingRules?.find((r) => {
      if (r.columnId !== cell.column.id) return false;
      const v = cell.getValue();
      const sv = String(v ?? '');
      const rv = r.value ?? '';
      switch (r.operator) {
        case 'equals': return sv === rv;
        case 'notEquals': return sv !== rv;
        case 'contains': return sv.toLowerCase().includes(rv.toLowerCase());
        case 'gt': return Number(v) > Number(rv);
        case 'gte': return Number(v) >= Number(rv);
        case 'lt': return Number(v) < Number(rv);
        case 'lte': return Number(v) <= Number(rv);
        case 'empty': return sv === '';
        case 'notEmpty': return sv !== '';
        default: return false;
      }
    });

    const tdEl = (
      <td
        key={cell.id}
        role="gridcell"
        aria-colindex={index + 1}
        colSpan={colSpan}
        rowSpan={rowSpan}
        data-pinned={isPinned || undefined}
        data-flash={cellIsFlashed || undefined}
        style={{
          width: flex ? undefined : cell.column.getSize(),
          minWidth: flex ? cell.column.getSize() : undefined,
          flex: flex ? String(flex) : undefined,
          position: isPinned ? 'sticky' : 'relative',
          left: isPinned === 'left' ? cell.column.getStart('left') : undefined,
          right: isPinned === 'right' ? cell.column.getAfter('right') : undefined,
          background: isPinned ? 'hsl(var(--color-bg))' : (conditionalRule?.backgroundColor ?? undefined),
          color: conditionalRule?.textColor ?? undefined,
          zIndex: isPinned ? 1 : undefined,
          paddingLeft: treeIndent > 0 ? treeIndent : undefined,
        }}
        onContextMenu={onCellContextMenu ? (event) => { event.preventDefault(); onCellContextMenu(cell, row, event); } : undefined}
        onMouseDown={enableCellSelection ? (event) => {
          event.preventDefault();
          onCellMouseDown?.(rowIndex, index);
        } : undefined}
        onMouseEnter={enableCellSelection ? () => {
          onCellMouseEnter?.(rowIndex, index);
        } : undefined}
        className={cn(
          densityCellClass,
          'relative align-middle',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          getCellClassName?.(cell, row),
          cellIsSelected && 'bg-primary/10 outline outline-1 outline-primary',
          enableCellSelection && 'select-none cursor-cell',
          validationError && 'outline outline-1 outline-destructive',
        )}
      >
        {validationError ? (
          <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-destructive" aria-hidden="true" />
        ) : null}
        <div
          className={cn(
            'flex min-w-0 items-center gap-1',
            align === 'center' && 'justify-center',
            align === 'right' && 'justify-end',
          )}
        >
          {index === 0 && canExpand ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => row.toggleExpanded()}
              className="mr-1 h-5 w-5 shrink-0"
              aria-label={row.getIsExpanded() ? text.collapseRow : text.expandRow}
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="size-3.5" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
            </Button>
          ) : null}
          {enableRowPinning && index === 0 ? (
            <span
              className="mr-1 inline-flex"
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={text.rowActions}
                    className="h-5 w-5"
                  >
                    ⋮
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  align="start"
                  container={overlayBoundary}
                  collisionBoundary={overlayBoundary}
                  collisionPadding={8}
                  strategy="absolute"
                  sticky="always"
                  className="bg-popover relative z-[1000] max-h-[min(45dvh,18rem,var(--aura-ui-popper-available-height))] min-w-28 overflow-y-auto"
                >
                  <MenuButton onClick={() => pinRow(row.id, 'top')}>{text.pinRowTop}</MenuButton>
                  <MenuButton onClick={() => pinRow(row.id, 'bottom')}>
                    {text.pinRowBottom}
                  </MenuButton>
                  <MenuButton onClick={() => pinRow(row.id, false)}>{text.unpin}</MenuButton>
                  {enableRowCopy ? (
                    <MenuButton onClick={() => copyRow(row)}>{text.copyRow}</MenuButton>
                  ) : null}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </span>
          ) : null}
          <span
            className="min-w-0 truncate"
            title={enableCellTooltip ? String(cell.getValue() ?? '') : undefined}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </span>
        </div>
      </td>
    );

    if (validationError) {
      return (
        <Tooltip.Provider key={cell.id}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>{tdEl}</Tooltip.Trigger>
            <Tooltip.Content>{validationError}</Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    }
    return tdEl;
  });
}

function renderLoadingRows({
  colSpan,
  columns,
  variant,
  rows,
  text,
  LoadingSkeleton,
  LoadingOverlay,
}: {
  colSpan: number;
  columns: number;
  variant: DataTableLoadingVariant;
  rows: number;
  text: DataTableLocaleText;
  LoadingSkeleton?: React.ComponentType<DataTableLoadingSkeletonSlotProps>;
  LoadingOverlay?: React.ComponentType<DataTableLoadingOverlaySlotProps>;
}) {
  if (LoadingOverlay && variant !== 'skeleton') {
    return (
      <tr>
        <td colSpan={colSpan} className="h-24 text-center">
          <LoadingOverlay text={text.loading} variant={variant} />
        </td>
      </tr>
    );
  }
  if (LoadingSkeleton && variant === 'skeleton') {
    return (
      <tr>
        <td colSpan={colSpan}>
          <LoadingSkeleton rows={rows} columns={columns} />
        </td>
      </tr>
    );
  }
  if (variant === 'spinner') {
    return (
      <tr>
        <td colSpan={colSpan} className="text-muted-foreground h-24 text-center">
          <span className="inline-flex items-center gap-2">
            <span className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            {text.loading}
          </span>
        </td>
      </tr>
    );
  }
  if (variant === 'skeleton') {
    return Array.from({ length: rows }, (_, rowIndex) => (
      <tr key={rowIndex} className="border-border border-b">
        {Array.from({ length: Math.max(columns, 1) }, (_, columnIndex) => (
          <td key={columnIndex} className="p-3">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
          </td>
        ))}
      </tr>
    ));
  }
  return (
    <tr>
      <td colSpan={colSpan} className="text-muted-foreground h-24 text-center">
        {text.loading}
      </td>
    </tr>
  );
}

interface DataTableFooterProps<TData> {
  table: Table<TData>;
  aggregations: Record<string, DataTableAggregation>;
  renderedColumnIds: Set<string>;
  columnPaddingLeft: number;
  columnPaddingRight: number;
  localeText: DataTableLocaleText;
}

function DataTableFooter<TData>({
  table,
  aggregations,
  renderedColumnIds,
  columnPaddingLeft,
  columnPaddingRight,
  localeText,
}: DataTableFooterProps<TData>) {
  const rows = table.getFilteredRowModel().rows;
  return (
    <tfoot className="border-border bg-bg sticky bottom-0 z-10 border-t">
      <tr>
        {columnPaddingLeft > 0 ? <td style={{ width: columnPaddingLeft }} /> : null}
        {table
          .getVisibleLeafColumns()
          .filter((column) => renderedColumnIds.has(column.id))
          .map((column, index) => {
            const aggregation = aggregations[column.id];
            return (
              <td key={column.id} className="p-3 font-medium">
                {aggregation
                  ? aggregateColumn(
                      aggregation,
                      rows.map((row) => row.getValue(column.id)),
                      rows,
                    )
                  : index === 0
                    ? localeText.total
                    : null}
              </td>
            );
          })}
        {columnPaddingRight > 0 ? <td style={{ width: columnPaddingRight }} /> : null}
      </tr>
    </tfoot>
  );
}

/* ─── Pagination ──────────────────────────────────────────────────── */

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  localeText?: DataTableLocaleText;
  pageSizeOptions?: number[];
  showTotalRows?: boolean;
  overlayBoundary?: HTMLDivElement | null;
}

export function DataTablePagination<TData>({
  table,
  localeText = defaultLocaleText,
  pageSizeOptions = [10, 25, 50, 100],
  showTotalRows = true,
  overlayBoundary,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;

  const pageOptions = Array.from({ length: Math.max(pageCount, 1) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side: total + rows per page */}
      <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
        {showTotalRows ? (
          <span className="tabular-nums">{localeText.totalRows(totalRows)}</span>
        ) : null}
        <label className="flex items-center gap-2">
          <span className="whitespace-nowrap">{localeText.rowsPerPage}</span>
          <Select.Root
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <Select.Trigger className="h-8 w-20">
              <Select.Value />
            </Select.Trigger>
            <Select.Content
              options={pageSizeOptions.map((s) => ({ value: String(s), label: String(s) }))}
              container={overlayBoundary}
            />
          </Select.Root>
        </label>
      </div>

      {/* Right side: page navigation */}
      <div className="flex flex-wrap items-center gap-1">
        <span className="text-muted-foreground mr-1 text-sm tabular-nums">
          {localeText.page(pageIndex + 1, Math.max(pageCount, 1))}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="h-8 w-8"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label={localeText.firstPage}
          title={localeText.firstPage}
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="h-8 w-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label={localeText.previous}
          title={localeText.previous}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Select.Root
          value={String(pageIndex + 1)}
          onValueChange={(v) => table.setPageIndex(Number(v) - 1)}
        >
          <Select.Trigger className="h-8 w-16" aria-label={localeText.goToPage}>
            <Select.Value />
          </Select.Trigger>
          <Select.Content
            options={pageOptions.map((p) => ({ value: String(p), label: String(p) }))}
            container={overlayBoundary}
          />
        </Select.Root>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="h-8 w-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label={localeText.next}
          title={localeText.next}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="h-8 w-8"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          aria-label={localeText.lastPage}
          title={localeText.lastPage}
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

/* ─── Toolbar ────────────────────────────────────────────────────────── */

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumnId?: string;
  filterPlaceholder?: string;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filterColumnId,
  filterPlaceholder = 'Search…',
  globalFilter,
  onGlobalFilterChange,
  children,
}: DataTableToolbarProps<TData>) {
  const column = filterColumnId ? table.getColumn(filterColumnId) : null;
  return (
    <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
      {onGlobalFilterChange ? (
        <DataTableGlobalSearch
          value={globalFilter ?? ''}
          onValueChange={onGlobalFilterChange}
          placeholder={filterPlaceholder}
        />
      ) : column ? (
        <Input
          type="text"
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(event) => column.setFilterValue(event.target.value)}
          placeholder={filterPlaceholder}
          className="min-w-0 sm:w-64"
        />
      ) : null}
      {children}
    </div>
  );
}

function DataTableGlobalSearch({
  value,
  onValueChange,
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <Input
      type="search"
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      placeholder={placeholder}
      className="min-w-0 sm:w-64"
    />
  );
}

interface DataTableSelectOption {
  value: string;
  label: React.ReactNode;
}

function DataTableSelect({
  value,
  onValueChange,
  options,
  ariaLabel,
  className,
  searchable,
  overlayBoundary,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: DataTableSelectOption[];
  ariaLabel: string;
  className?: string;
  searchable?: boolean;
  overlayBoundary?: HTMLDivElement | null;
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select.Root value={value} onValueChange={onValueChange} searchable={searchable}>
      <Select.Trigger aria-label={ariaLabel} className={cn('min-w-0', className)}>
        <Select.Value placeholder={selectedOption?.label ?? value}>
          {selectedOption?.label ?? value}
        </Select.Value>
      </Select.Trigger>
      <Select.Content
        container={overlayBoundary}
        collisionBoundary={overlayBoundary}
        collisionPadding={8}
        strategy="absolute"
        sticky="always"
        showCreateItem={false}
        className="bg-popover relative z-[1100] max-h-[min(45dvh,18rem,var(--aura-ui-popper-available-height))] min-w-44"
      >
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

/* ─── Advanced filters ──────────────────────────────────────────────── */

export interface DataTableAdvancedFilterProps<TData> {
  table: Table<TData>;
  filter?: DataTableFilterGroup;
  onFilterChange: (filter: DataTableFilterGroup | undefined) => void;
  localeText?: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
}

export function DataTableAdvancedFilter<TData>({
  table,
  filter,
  onFilterChange,
  localeText = defaultLocaleText,
  overlayBoundary,
}: DataTableAdvancedFilterProps<TData>) {
  const columns = table.getAllLeafColumns().filter((column) => column.getCanFilter());
  const group = filter ?? createFilterGroup('root');

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Filter className="mr-1.5 size-4" />{localeText.filters}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        sideOffset={6}
        container={overlayBoundary}
        collisionBoundary={overlayBoundary}
        collisionPadding={12}
        strategy="absolute"
        sticky="always"
        role="region"
        aria-label={localeText.filters}
        data-datatable-filter-panel=""
        className="bg-popover relative z-[1000] flex max-h-[min(55dvh,24rem,var(--aura-ui-popper-available-height))] w-[min(44rem,var(--aura-ui-popper-available-width),calc(100vw-2rem))] min-w-0 flex-col gap-2 overflow-hidden rounded-md p-3"
      >
        <div className="min-h-0 flex-1 overflow-y-auto">
          <DataTableFilterGroupEditor
            group={group}
            columns={columns}
            localeText={localeText}
            overlayBoundary={overlayBoundary}
            onGroupChange={(next) => onFilterChange(next.items.length ? next : undefined)}
          />
        </div>
        <div className="border-border flex justify-end border-t pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onFilterChange(undefined)}
          >
            {localeText.clearFilters}
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

interface DataTableFilterGroupEditorProps<TData> {
  group: DataTableFilterGroup;
  columns: Column<TData, unknown>[];
  localeText: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
  depth?: number;
  onGroupChange: (group: DataTableFilterGroup) => void;
  onRemove?: () => void;
}

function DataTableFilterGroupEditor<TData>({
  group,
  columns,
  localeText,
  overlayBoundary,
  depth = 0,
  onGroupChange,
  onRemove,
}: DataTableFilterGroupEditorProps<TData>) {
  const addRule = () => {
    const firstColumn = columns[0];
    if (!firstColumn) return;
    onGroupChange({
      ...group,
      items: [...group.items, createFilterRule(firstColumn.id)],
    });
  };
  const addGroup = () => {
    onGroupChange({
      ...group,
      items: [...group.items, createFilterGroup()],
    });
  };
  const updateItem = (item: DataTableFilterItem) => {
    onGroupChange({
      ...group,
      items: group.items.map((current) => (current.id === item.id ? item : current)),
    });
  };
  const removeItem = (itemId: string) => {
    onGroupChange({
      ...group,
      items: group.items.filter((item) => item.id !== itemId),
    });
  };

  return (
    <div
      className={cn('border-border grid gap-2 rounded-md border p-2', depth > 0 && 'bg-muted/30')}
    >
      <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-end">
        <div className="text-muted-foreground grid gap-1 text-xs font-medium sm:min-w-40">
          <span>{localeText.filterLogicLabel}</span>
          <DataTableSelect
            value={group.logic}
            onValueChange={(value) =>
              onGroupChange({ ...group, logic: value as DataTableFilterLogic })
            }
            options={[
              { value: 'and', label: 'AND' },
              { value: 'or', label: 'OR' },
            ]}
            ariaLabel={localeText.filterLogicLabel}
            className="sm:w-40"
            overlayBoundary={overlayBoundary}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={addRule}
          disabled={columns.length === 0}
        >
          {localeText.addFilter}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={addGroup}
        >
          {localeText.addFilterGroup}
        </Button>
        {onRemove ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={onRemove}
          >
            {localeText.removeFilterGroup}
          </Button>
        ) : null}
      </div>
      {group.items.map((item) =>
        isFilterRule(item) ? (
          <DataTableFilterRuleEditor
            key={item.id}
            rule={item}
            columns={columns}
            localeText={localeText}
            overlayBoundary={overlayBoundary}
            onRuleChange={updateItem}
            onRemove={() => removeItem(item.id)}
          />
        ) : (
          <DataTableFilterGroupEditor
            key={item.id}
            group={item}
            columns={columns}
            localeText={localeText}
            overlayBoundary={overlayBoundary}
            depth={depth + 1}
            onGroupChange={updateItem}
            onRemove={() => removeItem(item.id)}
          />
        ),
      )}
    </div>
  );
}

interface DataTableFilterRuleEditorProps<TData> {
  rule: DataTableFilterRule;
  columns: Column<TData, unknown>[];
  localeText: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
  onRuleChange: (rule: DataTableFilterRule) => void;
  onRemove: () => void;
}

function DataTableFilterRuleEditor<TData>({
  rule,
  columns,
  localeText,
  overlayBoundary,
  onRuleChange,
  onRemove,
}: DataTableFilterRuleEditorProps<TData>) {
  return (
    <div className="grid min-w-0 gap-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-muted-foreground grid gap-1 text-xs font-medium">
          <span>{localeText.filterColumnLabel}</span>
          <DataTableSelect
            value={rule.columnId}
            onValueChange={(value) => onRuleChange({ ...rule, columnId: value })}
            options={columns.map((column) => ({ value: column.id, label: column.id }))}
            ariaLabel={localeText.filterColumnLabel}
            searchable={columns.length > 8}
            overlayBoundary={overlayBoundary}
          />
        </div>
        <div className="text-muted-foreground grid gap-1 text-xs font-medium">
          <span>{localeText.filterOperatorLabel}</span>
          <DataTableSelect
            value={rule.operator}
            onValueChange={(value) =>
              onRuleChange({ ...rule, operator: value as DataTableFilterOperator })
            }
            options={filterOperators.map((operator) => ({ value: operator, label: operator }))}
            ariaLabel={localeText.filterOperatorLabel}
            overlayBoundary={overlayBoundary}
          />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto] items-end gap-2">
        <label className="text-muted-foreground grid min-w-0 gap-1 text-xs font-medium">
          {localeText.filterValueLabel}
          <Input
            value={String(rule.value ?? '')}
            onChange={(event) => onRuleChange({ ...rule, value: event.target.value })}
            className="min-w-0"
          />
        </label>
        <Button type="button" variant="outline" size="sm" onClick={onRemove}>
          {localeText.removeFilter}
        </Button>
      </div>
    </div>
  );
}

/* ─── Per-column filter UI ──────────────────────────────────────────── */

export interface DataTableColumnFilterProps<TData, TValue = unknown> {
  column: Column<TData, TValue>;
  title?: string;
}

export function DataTableColumnFilter<TData, TValue = unknown>({
  column,
  title,
}: DataTableColumnFilterProps<TData, TValue>) {
  const facets = column.getFacetedUniqueValues();
  const filterValue = String(column.getFilterValue() ?? '');
  const options = Array.from(facets.keys())
    .map((option) => String(option))
    .filter((option) => normalizeSearch(option).includes(normalizeSearch(filterValue)))
    .slice(0, 200);
  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <span className="text-xs font-medium">{title ?? column.id}</span>
      <Combobox.Root
        inputValue={filterValue}
        onInputValueChange={(value) => column.setFilterValue(value)}
        value={filterValue}
        onValueChange={(value) => column.setFilterValue(value)}
      >
        <Combobox.Input aria-label={title ?? column.id} />
        <Combobox.Content className="bg-popover relative z-[1100] max-h-[min(45dvh,18rem)] w-[var(--aura-ui-popper-anchor-width)]">
          {options.length ? (
            options.map((option) => (
              <Combobox.Item key={option} value={option}>
                {option}
              </Combobox.Item>
            ))
          ) : (
            <Combobox.Empty>No options</Combobox.Empty>
          )}
        </Combobox.Content>
      </Combobox.Root>
    </div>
  );
}

/* ─── Column configuration ─────────────────────────────────────────── */

export interface DataTableColumnVisibilityProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnVisibility<TData>({ table }: DataTableColumnVisibilityProps<TData>) {
  return <DataTableColumnConfiguration table={table} />;
}

export interface DataTableColumnConfigurationProps<TData> {
  table: Table<TData>;
  selectedColumnIds?: string[];
  onSelectedColumnIdsChange?: (columnIds: string[]) => void;
  localeText?: DataTableLocaleText;
  enableColumnSelection?: boolean;
  enableGrouping?: boolean;
  enableColumnPinning?: boolean;
  overlayBoundary?: HTMLDivElement | null;
}

export function DataTableColumnConfiguration<TData>({
  table,
  selectedColumnIds = [],
  onSelectedColumnIdsChange,
  localeText = defaultLocaleText,
  enableColumnSelection,
  enableGrouping,
  enableColumnPinning,
  overlayBoundary,
}: DataTableColumnConfigurationProps<TData>) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Columns3 className="mr-1.5 size-4" />{localeText.columns}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        sideOffset={6}
        container={overlayBoundary}
        collisionBoundary={overlayBoundary}
        collisionPadding={8}
        strategy="absolute"
        sticky="always"
        data-datatable-column-panel=""
        className="bg-popover relative z-[1000] grid max-h-[min(45dvh,18rem,var(--aura-ui-popper-available-height))] w-[min(18rem,var(--aura-ui-popper-available-width),calc(100vw-2rem))] gap-1 overflow-auto rounded-md p-1"
      >
        {table.getAllLeafColumns().map((column) => (
          <div key={column.id} className="hover:bg-accent grid gap-1 rounded-sm px-2 py-1 text-sm">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={column.getIsVisible()}
                disabled={!column.getCanHide()}
                onCheckedChange={(checked) => column.toggleVisibility(checked === true)}
                aria-label={`Toggle ${column.id}`}
              />
              <span className="min-w-0 flex-1 truncate">{column.id}</span>
            </label>
            <div className="flex flex-wrap gap-1 pl-5">
              {enableColumnSelection ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() =>
                    onSelectedColumnIdsChange?.(toggleId(selectedColumnIds, column.id))
                  }
                >
                  {localeText.selectColumn}
                </Button>
              ) : null}
              {enableColumnPinning ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => column.pin('left')}
                  >
                    {localeText.pinLeft}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => column.pin(false)}
                  >
                    {localeText.unpin}
                  </Button>
                </>
              ) : null}
              {enableGrouping && column.getCanGroup() ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => column.toggleGrouping()}
                >
                  {column.getIsGrouped() ? localeText.ungroup : localeText.groupBy}
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}

/* ─── Inline create ────────────────────────────────────────────────── */

function DataTableInlineCreateRow({
  createRow,
  colSpan,
  localeText,
}: {
  createRow: DataTableInlineCreate;
  colSpan: number;
  localeText: DataTableLocaleText;
}) {
  const initialValues = React.useMemo(
    () =>
      Object.fromEntries(createRow.fields.map((field) => [field.id, ''])) as Record<string, string>,
    [createRow.fields],
  );
  const [values, setValues] = React.useState<Record<string, string>>(initialValues);
  React.useEffect(() => setValues(initialValues), [initialValues]);
  return (
    <tr className="border-border bg-muted/20 border-b">
      <td colSpan={colSpan} className="p-3">
        <form
          className="flex flex-wrap items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            createRow.onAdd(values);
            setValues(initialValues);
          }}
        >
          {createRow.fields.map((field) => (
            <label key={field.id} className="text-muted-foreground grid gap-1 text-xs font-medium">
              {field.label ?? field.id}
              <Input
                type={field.type ?? 'text'}
                value={values[field.id] ?? ''}
                placeholder={field.placeholder}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [field.id]: event.target.value }))
                }
              />
            </label>
          ))}
          <Button type="submit" variant="outline" size="sm">
            {createRow.label ?? localeText.addRow}
          </Button>
        </form>
      </td>
    </tr>
  );
}

/* ─── Export helpers ───────────────────────────────────────────────── */

export function exportToCSV<TData>(
  table: Table<TData>,
  filename = 'export.csv',
  options?: { onlySelected?: boolean; includeHidden?: boolean },
) {
  const cols = options?.includeHidden ? table.getAllLeafColumns() : table.getVisibleLeafColumns();
  const headers = cols.map((column) => column.id);
  const rows = options?.onlySelected
    ? table.getFilteredSelectedRowModel().rows
    : table.getFilteredRowModel().rows;
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(cols.map((column) => escapeCsv(row.getValue(column.id))).join(','));
  }
  download(lines.join('\n'), filename, 'text/csv;charset=utf-8;');
}

export function exportToJSON<TData>(
  table: Table<TData>,
  filename = 'export.json',
  options?: { onlySelected?: boolean },
) {
  const rows = options?.onlySelected
    ? table.getFilteredSelectedRowModel().rows
    : table.getFilteredRowModel().rows;
  const data = rows.map((row) => row.original);
  download(JSON.stringify(data, null, 2), filename, 'application/json');
}

function download(content: string, filename: string, mime: string) {
  if (typeof document === 'undefined') return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/* ─── Editable Cell helper ─────────────────────────────────────────── */

export interface EditableCellProps {
  value: unknown;
  onCommit: (next: unknown) => void;
  type?: 'text' | 'number';
}

export function EditableCell({ value, onCommit, type = 'text' }: EditableCellProps) {
  const [editing, setEditing] = React.useState(false);
  const [local, setLocal] = React.useState(String(value ?? ''));
  React.useEffect(() => {
    if (!editing) setLocal(String(value ?? ''));
  }, [value, editing]);
  if (!editing) {
    return (
      <span
        tabIndex={0}
        onClick={() => setEditing(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setEditing(true);
        }}
        className="hover:bg-accent cursor-text rounded px-1"
      >
        {String(value ?? '')}
      </span>
    );
  }
  return (
    <Input
      autoFocus
      type={type}
      value={local}
      onChange={(event) => setLocal(event.target.value)}
      onBlur={() => {
        const next = type === 'number' ? Number(local) : local;
        onCommit(next);
        setEditing(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          const next = type === 'number' ? Number(local) : local;
          onCommit(next);
          setEditing(false);
        } else if (event.key === 'Escape') {
          setLocal(String(value ?? ''));
          setEditing(false);
        }
      }}
      className="w-full"
    />
  );
}

/* ── Mobile card view ──────────────────────────────────────────────── */
function DataTableCardView({
  table,
  breakpoint,
  allRows,
}: {
  table: Table<unknown>;
  breakpoint: 'sm' | 'md' | 'lg';
  allRows: Row<unknown>[];
}) {
  const leafColumns = table.getAllLeafColumns().filter(
    (c) => c.getIsVisible() && !c.id.startsWith('__'),
  );
  const hiddenClass =
    breakpoint === 'sm' ? 'sm:hidden' : breakpoint === 'md' ? 'md:hidden' : 'lg:hidden';
  return (
    <div className={cn('grid gap-3', hiddenClass)}>
      {allRows.map((row) => (
        <div
          key={row.id}
          className="border-border bg-card rounded-lg border p-4"
          data-state={row.getIsSelected() ? 'selected' : undefined}
        >
          {leafColumns.map((col) => {
            const cell = row.getAllCells().find((c) => c.column.id === col.id);
            if (!cell) return null;
            const label = typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id;
            return (
              <div key={col.id} className="mb-2 flex items-start justify-between gap-2 text-sm last:mb-0">
                <span className="text-muted-foreground shrink-0 font-medium">{label}</span>
                <span className="text-right">{flexRender(col.columnDef.cell, cell.getContext())}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ── Row number column ─────────────────────────────────────────────── */
function createRowNumberColumn<TData>(text: DataTableLocaleText): DataTableColumn<TData, unknown> {
  return {
    id: '__rownum',
    size: 48,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: () => (
      <span className="text-muted-foreground text-xs font-medium">{text.rowNumberHeader}</span>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums text-xs">{row.index + 1}</span>
    ),
  };
}

/* ── Status bar ────────────────────────────────────────────────────── */
function DataTableStatusBar({
  table,
  localeText,
  validationErrorCount = 0,
}: {
  table: Table<unknown>;
  localeText: DataTableLocaleText;
  validationErrorCount?: number;
}) {
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  return (
    <div className="border-border text-muted-foreground flex items-center gap-4 border-t px-3 py-1.5 text-xs">
      <span>{localeText.statusBarRows(totalRows)}</span>
      {selectedRows > 0 ? <span>{localeText.statusBarSelected(selectedRows)}</span> : null}
      {validationErrorCount > 0 ? (
        <span className="text-destructive">{validationErrorCount} validation error{validationErrorCount !== 1 ? 's' : ''}</span>
      ) : null}
    </div>
  );
}

function createSelectionColumn<TData>(multi: boolean): DataTableColumn<TData, unknown> {
  return {
    id: '__select',
    size: 42,
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) =>
      multi ? (
        <Checkbox
          aria-label="Select all rows"
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? 'indeterminate'
                : false
          }
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
        />
      ) : null,
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
      />
    ),
  };
}

function createActionColumn<TData>(
  rowActions: (row: Row<TData>) => React.ReactNode,
  text: DataTableLocaleText,
): DataTableColumn<TData, unknown> {
  return {
    id: '__actions',
    header: text.rowActions,
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => rowActions(row),
  };
}

function createRowTotalColumn<TData>(
  rowTotals: boolean | DataTableRowTotals<TData>,
  text: DataTableLocaleText,
): DataTableColumn<TData, unknown> {
  const options = typeof rowTotals === 'object' ? rowTotals : {};
  const id = options.id ?? '__row_total';
  return {
    id,
    header: () => options.header ?? text.rowTotal,
    enableSorting: false,
    cell: ({ row, table }) => {
      const columns = options.columns ?? table.getVisibleLeafColumns().map((column) => column.id);
      const total = columns.reduce((sum, columnId) => sum + toNumber(row.getValue(columnId)), 0);
      return options.format?.(total, row) ?? total;
    },
  };
}

/* ─── Bulk actions bar ─────────────────────────────────────────────── */

interface DataTableBulkActionsBarProps<TData = unknown> {
  table: Table<TData>;
  actions: DataTableBulkAction<TData>[];
  localeText: DataTableLocaleText;
}

function DataTableBulkActionsBar<TData>({
  table,
  actions,
  localeText,
}: DataTableBulkActionsBarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const count = selectedRows.length;
  if (count === 0) return null;
  return (
    <div className="bg-primary/10 border-primary/30 flex flex-wrap items-center justify-between gap-2 rounded-md border px-3 py-2">
      <div className="flex items-center gap-3">
        <span className="text-primary text-sm font-medium">
          {localeText.bulkActionsTitle(count)}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground h-7 px-2 text-xs"
          onClick={() => table.resetRowSelection()}
        >
          {localeText.clearSelection}
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action) => {
          const isDisabled =
            typeof action.disabled === 'function'
              ? action.disabled(selectedRows as Row<TData>[])
              : (action.disabled ?? false);
          return (
            <Button
              key={action.id}
              type="button"
              variant={action.variant === 'destructive' ? 'destructive' : 'outline'}
              size="sm"
              disabled={isDisabled}
              title={action.tooltip}
              aria-label={typeof action.label === 'string' ? action.label : action.id}
              onClick={() => action.onClick(selectedRows as Row<TData>[], table)}
              className="h-8"
            >
              {action.icon ? (
                <span className="inline-flex items-center gap-1.5">
                  {action.icon}
                  {action.label}
                </span>
              ) : (
                action.label
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Structured row action columns ────────────────────────────────── */

function createRowActionMenuColumn<TData>(
  items: DataTableRowActionItem[],
  text: DataTableLocaleText,
): DataTableColumn<TData, unknown> {
  return {
    id: '__action_menu',
    header: text.rowActions,
    size: 52,
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const visibleItems = items.filter((item) => {
        const hidden =
          typeof item.hidden === 'function' ? item.hidden(row as Row<unknown>) : (item.hidden ?? false);
        return !hidden;
      });
      if (!visibleItems.length) return null;
      return (
        <span
          className="inline-flex"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={text.rowActions}
                className="h-7 w-7"
              >
                ⋮
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              align="end"
              strategy="absolute"
              sticky="always"
              className="bg-popover relative z-[1000] min-w-36 overflow-hidden"
            >
              {visibleItems.map((item) => {
                const isDisabled =
                  typeof item.disabled === 'function'
                    ? item.disabled(row as Row<unknown>)
                    : (item.disabled ?? false);
                return (
                  <React.Fragment key={item.id}>
                    {item.separator ? <DropdownMenu.Separator /> : null}
                    <DropdownMenu.Item
                      disabled={isDisabled}
                      className={cn(
                        'flex cursor-pointer items-center gap-2',
                        item.variant === 'destructive' && 'text-destructive',
                        isDisabled && 'cursor-not-allowed opacity-50',
                      )}
                      onSelect={() => item.onClick(row as Row<unknown>)}
                    >
                      {item.icon ? <span className="size-4 shrink-0">{item.icon}</span> : null}
                      {item.label}
                    </DropdownMenu.Item>
                  </React.Fragment>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </span>
      );
    },
  };
}

function createRowActionButtonsColumn<TData>(
  items: DataTableRowActionItem[],
  text: DataTableLocaleText,
): DataTableColumn<TData, unknown> {
  return {
    id: '__action_buttons',
    header: text.rowActions,
    size: Math.max(items.length * 80, 100),
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const visibleItems = items.filter((item) => {
        const hidden =
          typeof item.hidden === 'function' ? item.hidden(row as Row<unknown>) : (item.hidden ?? false);
        return !hidden;
      });
      return (
        <div className="flex flex-wrap items-center gap-1">
          {visibleItems.map((item) => {
            const isDisabled =
              typeof item.disabled === 'function'
                ? item.disabled(row as Row<unknown>)
                : (item.disabled ?? false);
            return (
              <Button
                key={item.id}
                type="button"
                variant={item.variant === 'destructive' ? 'destructive' : 'outline'}
                size="sm"
                disabled={isDisabled}
                title={item.tooltip}
                aria-label={typeof item.label === 'string' ? item.label : item.id}
                onClick={() => item.onClick(row as Row<unknown>)}
                className="h-7"
              >
                {item.icon ? (
                  <span className="inline-flex items-center gap-1">
                    {item.icon}
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Button>
            );
          })}
        </div>
      );
    },
  };
}

/* ─── Built-in cell renderers ──────────────────────────────────────── */

interface BuiltinCellRendererOptions<TData, TValue> {
  type: DataTableColumnType;
  badgeMap?: Record<string, { label?: string; color?: string; textColor?: string }>;
  currencyCode?: string;
  currencyLocale?: string;
  linkHref?: string | ((value: unknown, row: TData) => string);
  linkTarget?: '_blank' | '_self';
  avatarSrc?: (value: unknown, row: TData) => string;
  sparklineData?: (row: TData) => number[];
  sparklineType?: 'line' | 'bar' | 'area';
  progressMax?: number;
  ratingMax?: number;
  field: string;
  // Feature 6: formatting
  locale?: string;
  dateFormat?: Intl.DateTimeFormatOptions;
  numberFormat?: Intl.NumberFormatOptions;
  timezone?: string;
}

function SparklineSVG({
  data,
  type = 'line',
}: {
  data: number[];
  type?: 'line' | 'bar' | 'area';
}) {
  const width = 60;
  const height = 20;
  if (!data.length) return <svg width={width} height={height} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const normalize = (v: number) => height - ((v - min) / range) * (height - 2) - 1;

  if (type === 'bar') {
    const barW = Math.max(1, (width / data.length) - 1);
    return (
      <svg width={width} height={height} aria-hidden="true">
        {data.map((v, i) => {
          const barH = Math.max(1, ((v - min) / range) * (height - 2));
          return (
            <rect
              key={i}
              x={i * (width / data.length)}
              y={height - barH}
              width={barW}
              height={barH}
              fill="hsl(var(--primary))"
            />
          );
        })}
      </svg>
    );
  }

  const points = data.map((v, i) => `${(i / Math.max(data.length - 1, 1)) * width},${normalize(v)}`).join(' ');

  if (type === 'area') {
    const firstX = 0;
    const lastX = width;
    const areaPath = `M${firstX},${height} L${points.split(' ').map(p => p).join(' L')} L${lastX},${height} Z`;
    return (
      <svg width={width} height={height} aria-hidden="true">
        <path d={areaPath} fill="hsl(var(--primary))" fillOpacity="0.3" stroke="none" />
        <polyline
          points={points}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // line (default)
  return (
    <svg width={width} height={height} aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* eslint-disable react/display-name */
function buildBuiltinCellRenderer<TData, TValue>({
  type,
  badgeMap,
  currencyCode,
  currencyLocale,
  linkHref,
  linkTarget,
  avatarSrc,
  sparklineData,
  sparklineType,
  progressMax = 100,
  ratingMax = 5,
  locale: colLocale,
  dateFormat,
  numberFormat,
  timezone,
}: BuiltinCellRendererOptions<TData, TValue>): ((ctx: { row: Row<TData>; getValue: () => TValue }) => React.ReactNode) | undefined {
  const resolvedLocale = colLocale ?? 'en-US';
  switch (type) {
    case 'badge':
      return ({ getValue }) => {
        const value = getValue();
        const str = String(value ?? '');
        const spec = badgeMap?.[str];
        const label = spec?.label ?? str;
        const bg = spec?.color ?? '#6b7280';
        const fg = spec?.textColor ?? '#ffffff';
        return (
          <span
            style={{ background: bg, color: fg }}
            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
          >
            {label}
          </span>
        );
      };

    case 'progress':
      return ({ getValue }) => {
        const value = Number(getValue() ?? 0);
        const percent = Math.min(100, Math.max(0, (value / progressMax) * 100));
        return (
          <div className="relative h-4 w-full min-w-12 overflow-hidden rounded bg-muted">
            <div
              className="h-full rounded bg-primary transition-all"
              style={{ width: `${percent}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium leading-none">
              {value}%
            </span>
          </div>
        );
      };

    case 'link':
      return ({ getValue, row }) => {
        const value = getValue();
        const str = String(value ?? '');
        const href = typeof linkHref === 'function'
          ? linkHref(value, row.original)
          : (linkHref ?? str);
        return (
          <a
            href={href}
            target={linkTarget ?? '_blank'}
            rel="noopener noreferrer"
            className="text-primary underline-offset-2 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {str}
          </a>
        );
      };

    case 'avatar':
      return ({ getValue, row }) => {
        const value = getValue();
        const str = String(value ?? '');
        const src = avatarSrc ? avatarSrc(value, row.original) : '';
        return (
          <div className="flex items-center gap-2">
            {src ? (
              <img
                src={src}
                alt={str}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {str.charAt(0).toUpperCase()}
              </span>
            )}
            <span>{str}</span>
          </div>
        );
      };

    case 'date':
      return ({ getValue }) => {
        const raw = getValue();
        if (raw == null || raw === '') return null;
        try {
          const d = new Date(raw as string);
          if (isNaN(d.getTime())) return <span>{String(raw)}</span>;
          return <span>{new Intl.DateTimeFormat(resolvedLocale, dateFormat ?? { year: 'numeric', month: 'short', day: 'numeric' }).format(d)}</span>;
        } catch {
          return <span>{String(raw)}</span>;
        }
      };

    case 'dateTime':
      return ({ getValue }) => {
        const raw = getValue();
        if (raw == null || raw === '') return null;
        try {
          const d = new Date(raw as string);
          if (isNaN(d.getTime())) return <span>{String(raw)}</span>;
          const opts: Intl.DateTimeFormatOptions = dateFormat ?? {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
            ...(timezone ? { timeZone: timezone } : {}),
          };
          return <span>{new Intl.DateTimeFormat(resolvedLocale, opts).format(d)}</span>;
        } catch {
          return <span>{String(raw)}</span>;
        }
      };

    case 'number':
      return ({ getValue }) => {
        const raw = getValue();
        if (raw == null || raw === '') return null;
        const num = Number(raw);
        if (!Number.isFinite(num)) return <span>{String(raw)}</span>;
        return <span className="tabular-nums">{new Intl.NumberFormat(resolvedLocale, numberFormat).format(num)}</span>;
      };

    case 'currency':
      return ({ getValue }) => {
        const value = Number(getValue() ?? 0);
        const formatted = new Intl.NumberFormat(colLocale ?? currencyLocale ?? 'en-US', {
          style: 'currency',
          currency: currencyCode ?? 'USD',
          ...(numberFormat ?? {}),
        }).format(value);
        return <span className="tabular-nums">{formatted}</span>;
      };

    case 'sparkline':
      return ({ row }) => {
        const data = sparklineData ? sparklineData(row.original) : [];
        return <SparklineSVG data={data} type={sparklineType} />;
      };

    case 'rating':
      return ({ getValue }) => {
        const value = Number(getValue() ?? 0);
        const stars = Array.from({ length: ratingMax }, (_, i) => i + 1);
        return (
          <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of ${ratingMax} stars`}>
            {stars.map((star) => (
              <span
                key={star}
                className={star <= value ? 'text-yellow-400' : 'text-muted-foreground/30'}
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </span>
        );
      };

    case 'boolean':
      return ({ getValue }) => {
        const value = getValue();
        const isTrue = value === true || value === 'true' || value === 1 || value === '1';
        return isTrue ? (
          <span className="text-green-500 font-bold" aria-label="Yes">✓</span>
        ) : (
          <span className="text-muted-foreground" aria-label="No">✗</span>
        );
      };

    default:
      return undefined;
  }
}
/* eslint-enable react/display-name */

/* ─── Keyboard shortcuts modal ─────────────────────────────────────── */

function DataTableKeyboardShortcutsModal({
  open,
  onOpenChange,
  enablePaste: showPaste,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enablePaste?: boolean;
}) {
  const shortcuts: { key: string; action: string; show?: boolean }[] = [
    { key: 'Ctrl+F', action: 'Focus search' },
    { key: 'Ctrl+C', action: 'Copy selected rows' },
    { key: 'Ctrl+V', action: 'Paste (if enablePaste)', show: showPaste },
    { key: 'Shift+Click', action: 'Multi-sort column' },
    { key: 'Space', action: 'Toggle row selection' },
    { key: 'Enter', action: 'Expand / collapse row' },
    { key: '?', action: 'Show this help' },
    { key: 'Escape', action: 'Close panels' },
    { key: 'F11', action: 'Toggle fullscreen' },
    { key: 'Ctrl+Z', action: 'Undo last edit' },
    { key: 'Ctrl+Y', action: 'Redo last edit' },
  ];

  const visible = shortcuts.filter((s) => s.show !== false);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Content
        style={
          {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            height: 'auto',
            maxHeight: '90vh',
            width: '480px',
            maxWidth: '95vw',
            marginTop: 0,
            borderRadius: '0.5rem',
            '--tw-enter-translate-y': '0',
            '--tw-exit-translate-y': '0',
          } as React.CSSProperties
        }
        className="flex flex-col overflow-hidden [&>div:first-child]:hidden"
      >
        <Drawer.Header className="border-border flex-shrink-0 border-b px-4 py-3 text-left">
          <Drawer.Title>Keyboard Shortcuts</Drawer.Title>
          <Drawer.Description>
            All keyboard shortcuts available in the data table.
          </Drawer.Description>
        </Drawer.Header>
        <div className="overflow-y-auto p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b">
                <th className="pb-2 text-left font-medium">Shortcut</th>
                <th className="pb-2 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((s) => (
                <tr key={s.key} className="border-border border-b last:border-0">
                  <td className="py-2 pr-4">
                    <kbd className="bg-muted border-border rounded border px-1.5 py-0.5 font-mono text-xs">
                      {s.key}
                    </kbd>
                  </td>
                  <td className="text-muted-foreground py-2">{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-border border-t p-3">
          <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}

/* ─── Tool Panel (Feature 2) ───────────────────────────────────────── */

function computeColumnStats(rows: Row<unknown>[], columnId: string): ColumnStats {
  const values = rows.map((row) => row.getValue(columnId));
  const count = values.length;
  const nullCount = values.filter((v) => v == null || v === '').length;
  const uniqueValues = new Set(values.map((v) => String(v ?? '')));
  const uniqueCount = uniqueValues.size;

  const numericValues = values
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n));
  const isNumeric = numericValues.length > 0 && numericValues.length === values.filter((v) => v != null && v !== '').length;

  let min: number | undefined;
  let max: number | undefined;
  let mean: number | undefined;
  let median: number | undefined;
  let sum: number | undefined;

  if (isNumeric && numericValues.length > 0) {
    min = Math.min(...numericValues);
    max = Math.max(...numericValues);
    sum = numericValues.reduce((a, b) => a + b, 0);
    mean = sum / numericValues.length;
    const sorted = [...numericValues].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    median = sorted.length % 2 === 0
      ? ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2
      : (sorted[mid] ?? 0);
  }

  const stringValues = values.map((v) => String(v ?? ''));
  const minLength = Math.min(...stringValues.map((s) => s.length));
  const maxLength = Math.max(...stringValues.map((s) => s.length));
  const avgLength = stringValues.length > 0
    ? stringValues.reduce((a, s) => a + s.length, 0) / stringValues.length
    : 0;

  // Top 5 values by frequency
  const freq = new Map<string, number>();
  for (const sv of stringValues) {
    freq.set(sv, (freq.get(sv) ?? 0) + 1);
  }
  const topValues = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([value, cnt]) => ({
      value,
      count: cnt,
      pct: count > 0 ? (cnt / count) * 100 : 0,
    }));

  return {
    count,
    nullCount,
    uniqueCount,
    min: isNumeric ? min : undefined,
    max: isNumeric ? max : undefined,
    mean: isNumeric ? mean : undefined,
    median: isNumeric ? median : undefined,
    sum: isNumeric ? sum : undefined,
    minLength: !isNumeric ? minLength : undefined,
    maxLength: !isNumeric ? maxLength : undefined,
    avgLength: !isNumeric ? avgLength : undefined,
    topValues,
  };
}

function ColumnStatsPanel({
  table,
  columnId,
}: {
  table: Table<unknown>;
  columnId: string | undefined;
}) {
  const col = columnId ? table.getColumn(columnId) : undefined;
  const rows = table.getFilteredRowModel().rows;

  const stats = React.useMemo<ColumnStats | null>(() => {
    if (!col) return null;
    return computeColumnStats(rows, col.id);
  }, [col, rows]);

  if (!col || !stats) {
    return (
      <p className="text-muted-foreground py-6 text-center text-xs">
        Select a column to view statistics.
      </p>
    );
  }

  const colHeader = typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id;
  const isNumeric = stats.min !== undefined;

  // Histogram data
  const histData: { label: string; count: number }[] = (() => {
    if (isNumeric) {
      const numVals = rows
        .map((r) => Number(r.getValue(col.id)))
        .filter((n) => Number.isFinite(n));
      if (numVals.length === 0) return [];
      const minV = stats.min ?? 0;
      const maxV = stats.max ?? 0;
      const bucketCount = 8;
      const bucketSize = (maxV - minV) / bucketCount || 1;
      const buckets = Array.from({ length: bucketCount }, (_, i) => ({
        label: (minV + i * bucketSize).toFixed(1),
        count: 0,
      }));
      for (const v of numVals) {
        const idx = Math.min(Math.floor((v - minV) / bucketSize), bucketCount - 1);
        if (buckets[idx]) buckets[idx]!.count++;
      }
      return buckets;
    } else {
      return stats.topValues.slice(0, 8).map((tv) => ({ label: tv.value || '(empty)', count: tv.count }));
    }
  })();

  const maxHistCount = Math.max(...histData.map((b) => b.count), 1);
  const svgW = 200;
  const svgH = 60;
  const barW = Math.floor((svgW - (histData.length - 1) * 2) / Math.max(histData.length, 1));

  return (
    <div className="grid gap-3 p-1">
      <p className="text-xs font-semibold">{colHeader}</p>
      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-1 text-xs">
        {[
          { label: 'Count', value: stats.count },
          { label: 'Nulls', value: stats.nullCount },
          { label: 'Unique', value: stats.uniqueCount },
          ...(isNumeric ? [
            { label: 'Min', value: stats.min?.toFixed(2) },
            { label: 'Max', value: stats.max?.toFixed(2) },
            { label: 'Mean', value: stats.mean?.toFixed(2) },
            { label: 'Median', value: stats.median?.toFixed(2) },
            { label: 'Sum', value: stats.sum?.toFixed(2) },
          ] : [
            { label: 'Min len', value: stats.minLength },
            { label: 'Max len', value: stats.maxLength },
            { label: 'Avg len', value: stats.avgLength?.toFixed(1) },
          ]),
        ].map((metric) => (
          <div key={metric.label} className="bg-muted/40 rounded px-2 py-1">
            <div className="text-muted-foreground text-[10px]">{metric.label}</div>
            <div className="font-medium tabular-nums">{String(metric.value ?? '—')}</div>
          </div>
        ))}
      </div>

      {/* Mini histogram */}
      {histData.length > 0 ? (
        <div className="grid gap-1">
          <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-wide">
            Distribution
          </p>
          <svg width={svgW} height={svgH} aria-label="Distribution histogram">
            {histData.map((bucket, i) => {
              const barH = Math.max(2, (bucket.count / maxHistCount) * (svgH - 4));
              return (
                <rect
                  key={i}
                  x={i * (barW + 2)}
                  y={svgH - barH}
                  width={barW}
                  height={barH}
                  fill="hsl(var(--primary))"
                  fillOpacity={0.7}
                  rx={1}
                >
                  <title>{bucket.label}: {bucket.count}</title>
                </rect>
              );
            })}
          </svg>
        </div>
      ) : null}

      {/* Top values */}
      {stats.topValues.length > 0 ? (
        <div className="grid gap-1">
          <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-wide">
            Top values
          </p>
          {stats.topValues.map((tv) => (
            <div key={tv.value} className="grid gap-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="max-w-[130px] truncate">{tv.value || '(empty)'}</span>
                <span className="text-muted-foreground tabular-nums">{tv.count}</span>
              </div>
              <div className="bg-muted h-1.5 w-full rounded-full">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: `${tv.pct.toFixed(1)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

interface DataTableToolPanelProps {
  table: Table<unknown>;
  open: boolean;
  tab: 'columns' | 'filters' | 'stats';
  onTabChange: (tab: 'columns' | 'filters' | 'stats') => void;
  onOpenChange: (open: boolean) => void;
  statsColumnId?: string;
  onStatsColumnChange?: (columnId: string) => void;
}

function DataTableToolPanel({
  table,
  open,
  tab,
  onTabChange,
  onOpenChange,
  statsColumnId,
  onStatsColumnChange,
}: DataTableToolPanelProps) {
  const tabTitles: Record<'columns' | 'filters' | 'stats', string> = {
    columns: 'Columns',
    filters: 'Filters',
    stats: 'Statistics',
  };

  const handleTabClick = (t: 'columns' | 'filters' | 'stats') => {
    if (open && tab === t) {
      onOpenChange(false);
    } else {
      onTabChange(t);
      onOpenChange(true);
    }
  };

  const allColumns = table.getAllLeafColumns().filter((c) => !c.id.startsWith('__'));
  const filterableColumns = allColumns.filter((c) => c.getCanFilter());

  return (
    <div className="flex">
      {/* Expanded panel */}
      <div
        className={cn(
          'border-border bg-bg overflow-hidden border-l transition-all duration-200',
          open ? 'w-64' : 'w-0',
        )}
        aria-hidden={!open}
      >
        {open ? (
          <div className="flex h-full w-64 flex-col overflow-hidden">
            {/* Header */}
            <div className="border-border flex items-center justify-between border-b px-3 py-2">
              <span className="text-sm font-semibold">{tabTitles[tab]}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onOpenChange(false)}
                aria-label="Close panel"
                className="h-6 w-6"
              >
                <X className="size-3.5" />
              </Button>
            </div>
            {/* Content */}
            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {tab === 'columns' ? (
                <div className="grid gap-0.5">
                  <div className="mb-1 flex gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-6 flex-1 px-1 text-xs"
                      onClick={() => table.getAllLeafColumns().forEach((c) => c.toggleVisibility(true))}
                    >
                      Show all
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-6 flex-1 px-1 text-xs"
                      onClick={() => table.getAllLeafColumns().filter((c) => c.getCanHide()).forEach((c) => c.toggleVisibility(false))}
                    >
                      Hide all
                    </Button>
                  </div>
                  {allColumns.map((col) => {
                    const auraMeta = getAuraMeta(col);
                    const label = typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id;
                    return (
                      <label
                        key={col.id}
                        className="hover:bg-accent flex items-center gap-2 rounded px-2 py-1 text-xs"
                      >
                        <Checkbox
                          checked={col.getIsVisible()}
                          disabled={!col.getCanHide()}
                          onCheckedChange={(checked) => col.toggleVisibility(checked === true)}
                          aria-label={`Toggle ${label}`}
                        />
                        <span className="min-w-0 flex-1 truncate">{label}</span>
                        {auraMeta.type ? (
                          <span className="text-muted-foreground bg-muted rounded px-1 py-0.5 font-mono text-[9px]">
                            {auraMeta.type}
                          </span>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
              ) : tab === 'filters' ? (
                <div className="grid gap-2">
                  {filterableColumns.length === 0 ? (
                    <p className="text-muted-foreground py-4 text-center text-xs">No filterable columns.</p>
                  ) : (
                    <>
                      {filterableColumns.map((col) => {
                        const label = typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id;
                        return (
                          <label key={col.id} className="grid gap-0.5 text-xs">
                            <span className="text-muted-foreground font-medium">{label}</span>
                            <Input
                              value={String(col.getFilterValue() ?? '')}
                              onChange={(e) => col.setFilterValue(e.target.value || undefined)}
                              placeholder="Filter…"
                              className="h-7 text-xs"
                            />
                          </label>
                        );
                      })}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-1 h-7 text-xs"
                        onClick={() => filterableColumns.forEach((c) => c.setFilterValue(undefined))}
                      >
                        Clear all
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid gap-2">
                  {statsColumnId ? null : (
                    <div className="grid gap-0.5">
                      <p className="text-muted-foreground mb-1 text-xs">Select column:</p>
                      {allColumns.map((col) => {
                        const label = typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id;
                        return (
                          <button
                            key={col.id}
                            type="button"
                            onClick={() => onStatsColumnChange?.(col.id)}
                            className={cn(
                              'hover:bg-accent rounded px-2 py-1 text-left text-xs',
                              statsColumnId === col.id && 'bg-accent',
                            )}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <ColumnStatsPanel table={table} columnId={statsColumnId} />
                  {statsColumnId ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => onStatsColumnChange?.(undefined as unknown as string)}
                    >
                      ← Back to column list
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Icon strip */}
      <div className="border-border bg-muted/20 flex flex-col border-l">
        {([['columns', <Columns3 key="c" className="size-4" />], ['filters', <Filter key="f" className="size-4" />], ['stats', <BarChart2 key="s" className="size-4" />]] as const).map(([t, icon]) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTabClick(t)}
            title={tabTitles[t]}
            aria-label={tabTitles[t]}
            className={cn(
              'flex h-10 w-8 items-center justify-center transition-colors',
              open && tab === t
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Excel (XLSX) export ──────────────────────────────────────────── */

export function exportToXLSX<TData>(
  table: Table<TData>,
  options?: { filename?: string; onlySelected?: boolean; sheetName?: string },
): void {
  if (typeof document === 'undefined') return;
  const cols = table.getVisibleLeafColumns().filter(
    (c) => !['__select', '__rownum', '__row_actions', '__row_total', '__action_menu', '__action_buttons', '__actions'].includes(c.id),
  );
  const rows = options?.onlySelected
    ? table.getFilteredSelectedRowModel().rows
    : table.getFilteredRowModel().rows;

  const headerRow = cols.map((c) =>
    typeof c.columnDef.header === 'string' ? c.columnDef.header : c.id,
  );
  const dataRows = rows.map((row) => cols.map((c) => row.getValue(c.id) ?? ''));

  const wsData = [headerRow, ...dataRows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Set column widths based on header length
  ws['!cols'] = headerRow.map((h) => ({ wch: Math.max(String(h).length + 4, 10) }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, options?.sheetName ?? 'Sheet1');
  XLSX.writeFile(wb, options?.filename ?? 'export.xlsx');
}

/* ─── Column normalization ─────────────────────────────────────────── */

interface AuraColumnMeta {
  type?: DataTableColumnType;
  align?: 'left' | 'center' | 'right';
  flex?: number;
  fieldId?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueSetter?: (row: any, value: any, rowIndex: number) => void;
  filterOperators?: DataTableFilterOperator[];
  // Extended column type metadata
  badgeMap?: Record<string, { label?: string; color?: string; textColor?: string }>;
  currencyCode?: string;
  currencyLocale?: string;
  linkHref?: string | ((value: unknown, row: unknown) => string);
  linkTarget?: '_blank' | '_self';
  avatarSrc?: (value: unknown, row: unknown) => string;
  sparklineData?: (row: unknown) => number[];
  sparklineType?: 'line' | 'bar' | 'area';
  progressMax?: number;
  ratingMax?: number;
  editable?: boolean;
  validate?: (value: unknown, row: unknown) => string | undefined;
  displayValidate?: (value: unknown, row: unknown) => string | undefined;
  // Feature 6: Formatting
  locale?: string;
  dateFormat?: Intl.DateTimeFormatOptions;
  numberFormat?: Intl.NumberFormatOptions;
  timezone?: string;
  propLocale?: string;
}

function getAuraMeta<TData = unknown, TValue = unknown>(
  column: Column<TData, TValue>,
): AuraColumnMeta {
  const meta = column.columnDef.meta as Record<string, unknown> | undefined;
  return (meta?._aura as AuraColumnMeta) ?? {};
}

function getDefaultColumnAlign(type?: DataTableColumnType): 'left' | 'center' | 'right' | undefined {
  if (type === 'number' || type === 'currency') return 'right';
  if (type === 'date' || type === 'dateTime') return 'right';
  if (type === 'boolean' || type === 'rating') return 'center';
  return undefined;
}

function normalizeColumnDefs<TData, TValue>(
  defs: DataTableColumnDef<TData, TValue>[],
  tablePropLocale?: string,
): DataTableColumn<TData, TValue>[] {
  return defs.map((def) => {
    const {
      field,
      fieldId,
      headerName,
      type,
      align,
      flex,
      valueGetter,
      valueSetter,
      renderCell,
      renderHeader,
      description,
      filterOperators: colFilterOps,
      // Extended column type fields
      badgeMap,
      currencyCode,
      currencyLocale,
      linkHref,
      linkTarget,
      avatarSrc,
      sparklineData,
      sparklineType,
      progressMax,
      ratingMax,
      editable,
      validate,
      displayValidate,
      // Feature 6: formatting
      locale: colLocale,
      dateFormat,
      numberFormat,
      timezone,
      ...rest
    } = def;

    // Use a loose record so we can set properties that are union-discriminated
    const col: Record<string, unknown> = { ...(rest as Record<string, unknown>) };
    const restRecord = rest as Record<string, unknown>;

    // ── Column groups: if def.columns is present, normalize recursively ──
    if (def.columns && def.columns.length > 0) {
      col.columns = normalizeColumnDefs(def.columns, tablePropLocale);
      if (headerName && !restRecord.header && !renderHeader) col.header = headerName;
      if (renderHeader && !restRecord.header) {
        col.header = (ctx: { column: Column<TData, TValue> }) => renderHeader({ column: ctx.column });
      }
      // Remove accessor fields for group columns
      delete col.accessorKey;
      delete col.accessorFn;
      col.meta = { ...(restRecord.meta as object | undefined) };
      return col as unknown as DataTableColumn<TData, TValue>;
    }

    if (fieldId && !restRecord.id) col.id = fieldId;
    if (field && !restRecord.accessorKey && !restRecord.accessorFn) col.accessorKey = field;
    if (valueGetter && !restRecord.accessorFn && !(field ?? restRecord.accessorKey)) {
      col.accessorFn = (row: TData) => valueGetter(row);
    }
    if (headerName && !restRecord.header && !renderHeader) col.header = headerName;
    if (renderHeader && !restRecord.header) {
      col.header = (ctx: { column: Column<TData, TValue> }) => renderHeader({ column: ctx.column });
    }
    if (renderCell && !restRecord.cell) {
      col.cell = (ctx: { row: Row<TData>; getValue: () => TValue }) =>
        renderCell({
          row: ctx.row,
          value: ctx.getValue(),
          field: String(field ?? restRecord.accessorKey ?? restRecord.id ?? ''),
        });
    }

    // ── Inject built-in cell renderer based on type ──────────────────
    if (!renderCell && !restRecord.cell && type) {
      col.cell = buildBuiltinCellRenderer<TData, TValue>({
        type,
        badgeMap,
        currencyCode,
        currencyLocale,
        linkHref,
        linkTarget,
        avatarSrc,
        sparklineData,
        sparklineType,
        progressMax,
        ratingMax,
        field: String(field ?? restRecord.accessorKey ?? restRecord.id ?? ''),
        locale: colLocale ?? tablePropLocale,
        dateFormat,
        numberFormat,
        timezone,
      });
    }

    col.meta = {
      ...(restRecord.meta as object | undefined),
      _aura: {
        type,
        align: align ?? getDefaultColumnAlign(type),
        flex,
        fieldId,
        description,
        valueSetter,
        filterOperators: colFilterOps,
        badgeMap,
        currencyCode,
        currencyLocale,
        // Cast TData-specific function types to unknown to satisfy AuraColumnMeta
        linkHref: linkHref as AuraColumnMeta['linkHref'],
        linkTarget,
        avatarSrc: avatarSrc as AuraColumnMeta['avatarSrc'],
        sparklineData: sparklineData as AuraColumnMeta['sparklineData'],
        sparklineType,
        progressMax,
        ratingMax,
        editable,
        validate: validate as AuraColumnMeta['validate'],
        displayValidate: displayValidate as AuraColumnMeta['displayValidate'],
        locale: colLocale,
        dateFormat,
        numberFormat,
        timezone,
        propLocale: tablePropLocale,
      } satisfies AuraColumnMeta,
    };

    return col as unknown as DataTableColumn<TData, TValue>;
  });
}

/* ─── Toolbar button ───────────────────────────────────────────────── */

export interface DataTableToolbarButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  tooltip?: string;
}

export function DataTableToolbarButton({
  tooltip,
  children,
  className,
  ...props
}: DataTableToolbarButtonProps) {
  const btn = (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={tooltip ?? (typeof children === 'string' ? children : undefined)}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
  if (!tooltip) return btn;
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{btn}</Tooltip.Trigger>
        <Tooltip.Content>{tooltip}</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/* ─── Density menu ─────────────────────────────────────────────────── */

interface DataTableDensityMenuProps {
  density: DataTableDensity;
  onDensityChange: (density: DataTableDensity) => void;
  localeText: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
}

function DataTableDensityMenu({
  density,
  onDensityChange,
  localeText,
  overlayBoundary,
}: DataTableDensityMenuProps) {
  const options: { value: DataTableDensity; label: string }[] = [
    { value: 'compact', label: localeText.densityCompact },
    { value: 'standard', label: localeText.densityStandard },
    { value: 'comfortable', label: localeText.densityComfortable },
  ];
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button type="button" variant="outline" size="sm" title={localeText.density}>
          <AlignJustify className="mr-1.5 size-4" />{localeText.density}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        container={overlayBoundary}
        collisionBoundary={overlayBoundary}
        collisionPadding={8}
        strategy="absolute"
        sticky="always"
        className="bg-popover relative z-[1000] min-w-36 overflow-hidden"
      >
        {options.map((option) => (
          <DropdownMenu.Item
            key={option.value}
            className={cn('cursor-pointer', density === option.value && 'font-semibold')}
            onSelect={() => onDensityChange(option.value)}
          >
            {option.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

/* ─── Export menu ─────────────────────────────────────────────────── */

interface DataTableExportMenuProps {
  table: Table<unknown>;
  localeText: DataTableLocaleText;
  overlayBoundary?: HTMLDivElement | null;
  options: { csv?: boolean; json?: boolean; selectedCsv?: boolean; xlsx?: boolean };
}

function DataTableExportMenu({ table, localeText, overlayBoundary, options }: DataTableExportMenuProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <DropdownMenu.Root>
          <Tooltip.Trigger asChild>
            <DropdownMenu.Trigger asChild>
              <Button type="button" variant="outline" size="sm">
                <Download className="mr-1.5 size-4" />
                {localeText.export ?? 'Export'}
                <ChevronDown className="ml-1 size-3" />
              </Button>
            </DropdownMenu.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Content>{localeText.export ?? 'Export data'}</Tooltip.Content>
          <DropdownMenu.Content
            align="end"
            container={overlayBoundary}
            collisionBoundary={overlayBoundary}
            collisionPadding={8}
            strategy="absolute"
            sticky="always"
            className="bg-popover relative z-[1000] min-w-40"
          >
            {options.csv !== false ? (
              <DropdownMenu.Item className="cursor-pointer" onSelect={() => exportToCSV(table, 'export.csv')}>
                {localeText.exportCSV ?? 'Export as CSV'}
              </DropdownMenu.Item>
            ) : null}
            {options.json !== false ? (
              <DropdownMenu.Item className="cursor-pointer" onSelect={() => exportToJSON(table, 'export.json')}>
                {localeText.exportJSON ?? 'Export as JSON'}
              </DropdownMenu.Item>
            ) : null}
            {options.selectedCsv !== false ? (
              <DropdownMenu.Item className="cursor-pointer" onSelect={() => exportToCSV(table, 'selected.csv', { onlySelected: true })}>
                {localeText.exportSelectedCSV ?? 'Export selected rows'}
              </DropdownMenu.Item>
            ) : null}
            {options.xlsx ? (
              <DropdownMenu.Item
                className="cursor-pointer flex items-center gap-2"
                onSelect={() => exportToXLSX(table)}
              >
                <FileSpreadsheet className="size-4" />
                Export as Excel
              </DropdownMenu.Item>
            ) : null}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/* ─── Conditional formatting ───────────────────────────────────────── */

function hexToHsva(hex: string): HsvaColor {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let hue = 0;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  return { h: hue, s: max === 0 ? 0 : d / max, v: max, a: 1 };
}

const CF_OPERATORS: { value: DataTableConditionalRule['operator']; label: string }[] = [
  { value: 'equals', label: 'Equals' },
  { value: 'notEquals', label: 'Not equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'gt', label: 'Greater than' },
  { value: 'gte', label: 'Greater than or equal' },
  { value: 'lt', label: 'Less than' },
  { value: 'lte', label: 'Less than or equal' },
  { value: 'empty', label: 'Is empty' },
  { value: 'notEmpty', label: 'Is not empty' },
];

/* ── Color section sub-component (bg or text) ── */
interface ColorSectionProps {
  label: string;
  color?: string;
  onChange: (color: string | undefined) => void;
}

function ColorSection({ label, color, onChange }: ColorSectionProps) {
  const enabled = !!color;
  const [localHex, setLocalHex] = React.useState(color ?? '#3b82f6');

  React.useEffect(() => {
    if (color && color !== localHex) setLocalHex(color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const hsva = React.useMemo(() => {
    try { return hexToHsva(localHex); } catch { return { h: 217, s: 0.91, v: 0.96, a: 1 }; }
  }, [localHex]);

  const handleHsvaChange = (v: HsvaColor) => {
    const hex = hsvaToHex(v);
    setLocalHex(hex);
    onChange(hex);
  };

  const handleHexInput = (raw: string) => {
    const clean = raw.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    setLocalHex('#' + clean);
    if (clean.length === 6) onChange('#' + clean);
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{label}</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className={cn(
              'rounded px-2 py-0.5 text-xs transition-colors',
              !enabled ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground hover:bg-muted',
            )}
          >
            None
          </button>
          <button
            type="button"
            onClick={() => { if (!enabled) onChange(localHex || '#3b82f6'); }}
            className={cn(
              'rounded px-2 py-0.5 text-xs transition-colors',
              enabled ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-muted',
            )}
          >
            Apply
          </button>
        </div>
      </div>
      {enabled ? (
        <div className="grid gap-2">
          <ColorPicker.Root value={hsva} onValueChange={handleHsvaChange} className="w-full gap-2 p-0">
            <ColorPicker.Area className="h-28 w-full" />
            <ColorPicker.HueSlider className="h-3 w-full rounded-full" />
          </ColorPicker.Root>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-mono text-xs">#</span>
            <Input
              value={localHex.replace('#', '')}
              onChange={(e) => handleHexInput(e.target.value)}
              className="h-7 flex-1 font-mono text-xs"
              maxLength={6}
              placeholder="ffffff"
              spellCheck={false}
            />
            <div
              className="border-border h-7 w-7 flex-shrink-0 rounded border"
              style={{ background: color }}
              aria-label="Color preview"
            />
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground py-1 text-xs">No color — click Apply to set.</p>
      )}
    </div>
  );
}

/* ── Conditional formatting drawer ── */
interface DataTableConditionalFormattingDrawerProps {
  table: Table<unknown>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialColumnId?: string;
  rules: DataTableConditionalRule[];
  onRulesChange: (rules: DataTableConditionalRule[]) => void;
}

function DataTableConditionalFormattingDrawer({
  table,
  open,
  onOpenChange,
  initialColumnId,
  rules,
  onRulesChange,
}: DataTableConditionalFormattingDrawerProps) {
  const columns = table.getAllLeafColumns().filter(
    (col) => !['__select', '__rownum', '__row_actions'].includes(col.id),
  );

  const defaultColumnId = initialColumnId ?? columns[0]?.id ?? '';

  // Local draft — changes are only committed on Save
  const [draft, setDraft] = React.useState<DataTableConditionalRule[]>(rules);

  // Re-initialize draft whenever the drawer opens so stale edits are discarded
  React.useEffect(() => {
    if (open) setDraft(rules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const addRule = () => {
    setDraft((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        columnId: defaultColumnId,
        operator: 'equals',
        value: '',
        backgroundColor: '#fef9c3',
        textColor: undefined,
      },
    ]);
  };

  const updateRule = (id: string, patch: Partial<DataTableConditionalRule>) => {
    setDraft((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRule = (id: string) => {
    setDraft((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    onRulesChange(draft);
    onOpenChange(false);
  };

  const needsValue = (op: DataTableConditionalRule['operator']) =>
    !['empty', 'notEmpty'].includes(op);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Content
        style={
          {
            // Override bottom-drawer positioning to right-side full-height panel
            top: 0,
            right: 0,
            bottom: 0,
            left: 'auto',
            height: '100%',
            width: '400px',
            maxWidth: '95vw',
            marginTop: 0,
            borderRadius: 0,
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            // Reset vertical slide animation variable so it only slides from right
            '--tw-enter-translate-y': '0',
            '--tw-exit-translate-y': '0',
          } as React.CSSProperties
        }
        className="flex flex-col overflow-hidden data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right [&>div:first-child]:hidden"
      >
        <Drawer.Header className="border-border flex-shrink-0 border-b px-4 py-3 text-left">
          <Drawer.Title>Conditional Formatting</Drawer.Title>
          <Drawer.Description>
            Highlight cells based on column values. Rules are applied top-to-bottom; the first match wins.
          </Drawer.Description>
        </Drawer.Header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid gap-3 p-4">
            {draft.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No rules yet. Click &ldquo;+ Add rule&rdquo; to get started.
              </p>
            ) : null}
            {draft.map((rule, idx) => (
              <div
                key={rule.id}
                className="border-border bg-muted/20 grid gap-3 rounded-lg border p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs font-medium">Rule {idx + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(rule.id)}
                    className="text-destructive h-6 px-2 text-xs"
                  >
                    Remove
                  </Button>
                </div>

                {/* Column */}
                <div className="grid gap-1">
                  <label className="text-xs font-medium">Column</label>
                  <Select.Root
                    value={rule.columnId}
                    onValueChange={(v) => updateRule(rule.id, { columnId: v })}
                  >
                    <Select.Trigger className="h-8 w-full">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content
                      options={columns.map((col) => ({
                        value: col.id,
                        label: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
                      }))}
                    />
                  </Select.Root>
                </div>

                {/* Condition */}
                <div className="grid gap-1">
                  <label className="text-xs font-medium">Condition</label>
                  <Select.Root
                    value={rule.operator}
                    onValueChange={(v) =>
                      updateRule(rule.id, { operator: v as DataTableConditionalRule['operator'] })
                    }
                  >
                    <Select.Trigger className="h-8 w-full">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content options={CF_OPERATORS.map((o) => ({ value: o.value, label: o.label }))} />
                  </Select.Root>
                </div>

                {/* Value */}
                {needsValue(rule.operator) ? (
                  <div className="grid gap-1">
                    <label className="text-xs font-medium">Value</label>
                    <Input
                      value={rule.value ?? ''}
                      onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                      placeholder="Enter value…"
                      className="h-8"
                    />
                  </div>
                ) : null}

                {/* Background color */}
                <div className="border-border rounded-md border p-2">
                  <ColorSection
                    label="Background color"
                    color={rule.backgroundColor}
                    onChange={(c) => updateRule(rule.id, { backgroundColor: c })}
                  />
                </div>

                {/* Text color */}
                <div className="border-border rounded-md border p-2">
                  <ColorSection
                    label="Text color"
                    color={rule.textColor}
                    onChange={(c) => updateRule(rule.id, { textColor: c })}
                  />
                </div>

                {/* Live preview */}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">Preview:</span>
                  <span
                    className="rounded px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: rule.backgroundColor ?? 'transparent',
                      color: rule.textColor ?? 'inherit',
                      border: '1px solid var(--border)',
                    }}
                  >
                    Cell value
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border flex-shrink-0 border-t p-4">
          <Button type="button" variant="outline" size="sm" onClick={addRule} className="mb-3 w-full">
            + Add rule
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleSave}
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}

const filterOperators: DataTableFilterOperator[] = [
  'contains',
  'equals',
  'startsWith',
  'endsWith',
  'gt',
  'gte',
  'lt',
  'lte',
  'empty',
  'notEmpty',
];

function createFilterRule(columnId: string): DataTableFilterRule {
  return {
    id: `filter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    columnId,
    operator: 'contains',
    value: '',
  };
}

function createFilterGroup(
  id = `group-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
): DataTableFilterGroup {
  return {
    id,
    logic: 'and',
    items: [],
  };
}

function isFilterRule(item: DataTableFilterItem): item is DataTableFilterRule {
  return 'columnId' in item;
}

function evaluateFilterGroup<TData>(
  group: DataTableFilterGroup,
  row: TData,
  getValue: (row: TData, columnId: string) => unknown,
): boolean {
  const results = group.items.map((item) =>
    isFilterRule(item)
      ? evaluateFilterRule(item, getValue(row, item.columnId))
      : evaluateFilterGroup(item, row, getValue),
  );
  return group.logic === 'or' ? results.some(Boolean) : results.every(Boolean);
}

function evaluateFilterRule(rule: DataTableFilterRule, value: unknown): boolean {
  const actual = String(value ?? '').toLowerCase();
  const expected = String(rule.value ?? '').toLowerCase();
  const actualNumber = Number(value);
  const expectedNumber = Number(rule.value);
  if (rule.operator === 'contains') return actual.includes(expected);
  if (rule.operator === 'equals') return actual === expected;
  if (rule.operator === 'startsWith') return actual.startsWith(expected);
  if (rule.operator === 'endsWith') return actual.endsWith(expected);
  if (rule.operator === 'empty') return value == null || actual === '';
  if (rule.operator === 'notEmpty') return value != null && actual !== '';
  if (!Number.isFinite(actualNumber) || !Number.isFinite(expectedNumber)) return false;
  if (rule.operator === 'gt') return actualNumber > expectedNumber;
  if (rule.operator === 'gte') return actualNumber >= expectedNumber;
  if (rule.operator === 'lt') return actualNumber < expectedNumber;
  return actualNumber <= expectedNumber;
}

function getValueByPath<TData>(row: TData, columnId: string): unknown {
  let current: unknown = row;
  for (const part of columnId.split('.')) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function normalizeSearch(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

function splitPinnedRows<TData>(rows: Row<TData>[], rowPinning: DataTableRowPinningState) {
  const topIds = new Set(rowPinning.top ?? []);
  const bottomIds = new Set(rowPinning.bottom ?? []);
  const top: Row<TData>[] = [];
  const center: Row<TData>[] = [];
  const bottom: Row<TData>[] = [];
  for (const row of rows) {
    if (topIds.has(row.id)) top.push(row);
    else if (bottomIds.has(row.id)) bottom.push(row);
    else center.push(row);
  }
  return { top, center, bottom };
}

function reorderRows<TData>(rows: Row<TData>[], fromId: string, toId: string) {
  const ids = reorderIds(
    rows.map((row) => row.id),
    fromId,
    toId,
  );
  const byId = new Map(rows.map((row) => [row.id, row]));
  return ids.map((id) => byId.get(id)).filter(isDefined);
}

function reorderIds(ids: string[], fromId: string, toId: string) {
  if (fromId === toId) return ids;
  const fromIndex = ids.indexOf(fromId);
  const toIndex = ids.indexOf(toId);
  if (fromIndex < 0 || toIndex < 0) return ids;
  const next = [...ids];
  const [item] = next.splice(fromIndex, 1);
  if (!item) return ids;
  next.splice(toIndex, 0, item);
  return next;
}

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

function aggregateColumn<TData>(
  aggregation: DataTableAggregation,
  values: unknown[],
  rows: Row<TData>[],
) {
  if (typeof aggregation === 'function') {
    return aggregation(values, rows as Row<unknown>[]);
  }
  if (aggregation === 'count') return values.length;
  const numbers = values.map(toNumber).filter((value) => Number.isFinite(value));
  if (!numbers.length) return 0;
  if (aggregation === 'sum') return numbers.reduce((sum, value) => sum + value, 0);
  if (aggregation === 'avg') return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
  if (aggregation === 'min') return Math.min(...numbers);
  return Math.max(...numbers);
}

function toNumber(value: unknown) {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function escapeCsv(value: unknown) {
  const stringValue = value == null ? '' : String(value);
  return /[",\n]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
}

function isDefined<TValue>(value: TValue | undefined): value is TValue {
  return value !== undefined;
}

/* ─── Round 3: Feature 1 — Pivot View ──────────────────────────────── */

function computePivotAgg(
  values: unknown[],
  aggregation: DataTablePivotConfig['aggregation'],
): number {
  if (aggregation === 'count') return values.length;
  const nums = values.map(Number).filter(Number.isFinite);
  if (!nums.length) return 0;
  if (aggregation === 'sum') return nums.reduce((a, b) => a + b, 0);
  if (aggregation === 'avg') return nums.reduce((a, b) => a + b, 0) / nums.length;
  if (aggregation === 'min') return Math.min(...nums);
  return Math.max(...nums);
}

function DataTablePivotView<TData>({
  data,
  pivotConfig,
  columns,
  className,
  onClearPivot,
}: {
  data: TData[];
  pivotConfig: DataTablePivotConfig;
  columns: DataTableColumnDef<TData, unknown>[];
  className?: string;
  onClearPivot?: () => void;
}) {
  const { rowGroupField, pivotField, valueField, aggregation } = pivotConfig;

  const { pivotValues, rowGroupValues, cellMap } = React.useMemo(() => {
    const pivotSet = new Set<string>();
    const rowGroupSet = new Set<string>();
    const cellMap = new Map<string, Map<string, unknown[]>>();

    for (const row of data) {
      const rec = row as Record<string, unknown>;
      const rv = String(rec[rowGroupField] ?? '');
      const pv = String(rec[pivotField] ?? '');
      const val = rec[valueField];
      rowGroupSet.add(rv);
      pivotSet.add(pv);
      if (!cellMap.has(rv)) cellMap.set(rv, new Map());
      const inner = cellMap.get(rv)!;
      if (!inner.has(pv)) inner.set(pv, []);
      inner.get(pv)!.push(val);
    }

    const pivotValues = Array.from(pivotSet).sort();
    const rowGroupValues = Array.from(rowGroupSet).sort();
    return { pivotValues, rowGroupValues, cellMap };
  }, [data, rowGroupField, pivotField, valueField]);

  const getColLabel = (fieldId: string) => {
    const col = columns.find((c) => c.field === fieldId || c.fieldId === fieldId || c.id === fieldId);
    return col?.headerName ?? fieldId;
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center gap-2">
        <span className="bg-primary/10 text-primary border-primary/30 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium">
          <GitBranch className="size-3" />
          Pivot mode active: {getColLabel(rowGroupField)} × {getColLabel(pivotField)} ({aggregation})
        </span>
        {onClearPivot ? (
          <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={onClearPivot}>
            Clear pivot
          </Button>
        ) : null}
      </div>
      <div className="border-border overflow-auto rounded-md border">
        <table className="w-full caption-bottom text-sm" role="grid">
          <thead className="bg-bg sticky top-0 z-20">
            <tr role="row">
              <th className="text-muted-foreground border-border border-b px-3 py-2 text-left font-medium">
                {getColLabel(rowGroupField)}
              </th>
              {pivotValues.map((pv) => (
                <th key={pv} className="text-muted-foreground border-border border-b px-3 py-2 text-right font-medium whitespace-nowrap">
                  {pv}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowGroupValues.map((rgv) => (
              <tr key={rgv} className="border-border hover:bg-muted/50 border-b">
                <td className="px-3 py-2 font-medium">{rgv}</td>
                {pivotValues.map((pv) => {
                  const vals = cellMap.get(rgv)?.get(pv) ?? [];
                  const agg = computePivotAgg(vals, aggregation);
                  return (
                    <td key={pv} className="px-3 py-2 text-right tabular-nums">
                      {agg}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Round 3: Feature 1 — Pivot Config Panel (Drawer) ─────────────── */

function DataTablePivotConfigPanel({
  open,
  onOpenChange,
  columns,
  currentConfig,
  onApply,
  onClear,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: DataTableColumnDef<unknown, unknown>[];
  currentConfig?: DataTablePivotConfig;
  onApply: (config: DataTablePivotConfig) => void;
  onClear: () => void;
}) {
  const colOptions = columns
    .filter((c) => c.field ?? c.fieldId ?? c.id)
    .map((c) => ({ value: String(c.field ?? c.fieldId ?? c.id ?? ''), label: c.headerName ?? String(c.field ?? c.id ?? '') }));

  const firstColId = colOptions[0]?.value ?? '';

  const [rowGroupField, setRowGroupField] = React.useState(currentConfig?.rowGroupField ?? firstColId);
  const [pivotField, setPivotField] = React.useState(currentConfig?.pivotField ?? firstColId);
  const [valueField, setValueField] = React.useState(currentConfig?.valueField ?? firstColId);
  const [aggregation, setAggregation] = React.useState<DataTablePivotConfig['aggregation']>(currentConfig?.aggregation ?? 'sum');

  React.useEffect(() => {
    if (open && currentConfig) {
      setRowGroupField(currentConfig.rowGroupField);
      setPivotField(currentConfig.pivotField);
      setValueField(currentConfig.valueField);
      setAggregation(currentConfig.aggregation);
    }
  }, [open, currentConfig]);

  const aggOptions: { value: DataTablePivotConfig['aggregation']; label: string }[] = [
    { value: 'count', label: 'Count' },
    { value: 'sum', label: 'Sum' },
    { value: 'avg', label: 'Average' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
  ];

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Content
        style={{
          top: 0, right: 0, bottom: 0, left: 'auto',
          height: '100%', width: '380px', maxWidth: '95vw',
          marginTop: 0, borderRadius: 0,
          borderTop: 'none', borderRight: 'none', borderBottom: 'none',
          '--tw-enter-translate-y': '0',
          '--tw-exit-translate-y': '0',
        } as React.CSSProperties}
        className="flex flex-col overflow-hidden data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right [&>div:first-child]:hidden"
      >
        <Drawer.Header className="border-border flex-shrink-0 border-b px-4 py-3 text-left">
          <Drawer.Title>Pivot Mode</Drawer.Title>
          <Drawer.Description>Configure pivot table settings.</Drawer.Description>
        </Drawer.Header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <label className="text-xs font-medium">Group rows by</label>
              <Select.Root value={rowGroupField} onValueChange={setRowGroupField}>
                <Select.Trigger className="h-8 w-full"><Select.Value /></Select.Trigger>
                <Select.Content options={colOptions} />
              </Select.Root>
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-medium">Pivot columns by</label>
              <Select.Root value={pivotField} onValueChange={setPivotField}>
                <Select.Trigger className="h-8 w-full"><Select.Value /></Select.Trigger>
                <Select.Content options={colOptions} />
              </Select.Root>
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-medium">Value field</label>
              <Select.Root value={valueField} onValueChange={setValueField}>
                <Select.Trigger className="h-8 w-full"><Select.Value /></Select.Trigger>
                <Select.Content options={colOptions} />
              </Select.Root>
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-medium">Aggregation</label>
              <Select.Root value={aggregation} onValueChange={(v) => setAggregation(v as DataTablePivotConfig['aggregation'])}>
                <Select.Trigger className="h-8 w-full"><Select.Value /></Select.Trigger>
                <Select.Content options={aggOptions} />
              </Select.Root>
            </div>
          </div>
        </div>
        <div className="border-border flex-shrink-0 border-t p-4 grid gap-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => {
              onApply({ rowGroupField, pivotField, valueField, aggregation });
              onOpenChange(false);
            }}
          >
            Apply
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              onClear();
              onOpenChange(false);
            }}
          >
            Clear pivot
          </Button>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}

/* ─── Round 3: Feature 2 — Saved Views Drawer ──────────────────────── */

function DataTableSavedViewsDrawer({
  open,
  onOpenChange,
  views,
  onViewsChange,
  table,
  density,
  setDensity,
  conditionalFormattingRules,
  handleConditionalRulesChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  views: DataTableSavedView[];
  onViewsChange: (views: DataTableSavedView[]) => void;
  table: Table<unknown>;
  density: DataTableDensity;
  setDensity: (d: DataTableDensity) => void;
  conditionalFormattingRules: DataTableConditionalRule[];
  handleConditionalRulesChange: (rules: DataTableConditionalRule[]) => void;
}) {
  const [newViewName, setNewViewName] = React.useState('');

  const captureCurrentState = (): DataTableSavedView['state'] => ({
    sorting: table.getState().sorting,
    columnFilters: table.getState().columnFilters,
    globalFilter: table.getState().globalFilter as string | undefined,
    columnVisibility: table.getState().columnVisibility,
    columnOrder: table.getState().columnOrder,
    columnSizing: table.getState().columnSizing,
    columnPinning: table.getState().columnPinning,
    density,
    grouping: table.getState().grouping,
    conditionalFormattingRules,
  });

  const loadView = (view: DataTableSavedView) => {
    table.setSorting(view.state.sorting ?? []);
    table.setColumnFilters(view.state.columnFilters ?? []);
    table.setGlobalFilter(view.state.globalFilter ?? '');
    table.setColumnVisibility(view.state.columnVisibility ?? {});
    table.setColumnOrder(view.state.columnOrder ?? []);
    table.setColumnSizing(view.state.columnSizing ?? {});
    table.setColumnPinning(view.state.columnPinning ?? {});
    if (view.state.density) setDensity(view.state.density);
    if (view.state.grouping) table.setGrouping(view.state.grouping);
    if (view.state.conditionalFormattingRules) handleConditionalRulesChange(view.state.conditionalFormattingRules);
  };

  const saveNewView = () => {
    const name = newViewName.trim();
    if (!name) return;
    const newView: DataTableSavedView = {
      id: `view-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      createdAt: new Date().toISOString(),
      state: captureCurrentState(),
    };
    onViewsChange([...views, newView]);
    setNewViewName('');
  };

  const updateView = (id: string) => {
    onViewsChange(views.map((v) => v.id === id ? { ...v, state: captureCurrentState() } : v));
  };

  const deleteView = (id: string) => {
    onViewsChange(views.filter((v) => v.id !== id));
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Content
        style={{
          top: 0, right: 0, bottom: 0, left: 'auto',
          height: '100%', width: '380px', maxWidth: '95vw',
          marginTop: 0, borderRadius: 0,
          borderTop: 'none', borderRight: 'none', borderBottom: 'none',
          '--tw-enter-translate-y': '0',
          '--tw-exit-translate-y': '0',
        } as React.CSSProperties}
        className="flex flex-col overflow-hidden data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right [&>div:first-child]:hidden"
      >
        <Drawer.Header className="border-border flex-shrink-0 border-b px-4 py-3 text-left">
          <Drawer.Title>Saved Views</Drawer.Title>
          <Drawer.Description>Save and restore table display states.</Drawer.Description>
        </Drawer.Header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {/* Save new view */}
          <div className="border-border mb-4 rounded-lg border p-3">
            <p className="mb-2 text-xs font-semibold">Save current view</p>
            <div className="flex gap-2">
              <Input
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
                placeholder="View name…"
                className="flex-1 h-8 text-xs"
                onKeyDown={(e) => { if (e.key === 'Enter') saveNewView(); }}
              />
              <Button type="button" variant="default" size="sm" className="h-8 px-3 text-xs" onClick={saveNewView}>
                Save
              </Button>
            </div>
          </div>
          {/* View list */}
          {views.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">No saved views yet.</p>
          ) : (
            <div className="grid gap-2">
              {views.map((view) => (
                <div key={view.id} className="border-border bg-muted/20 rounded-lg border p-3">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{view.name}</p>
                      <p className="text-muted-foreground text-[10px]">
                        {new Date(view.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive h-6 w-6 shrink-0"
                      aria-label={`Delete view ${view.name}`}
                      onClick={() => deleteView(view.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs"
                      onClick={() => loadView(view)}
                    >
                      Load
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs"
                      onClick={() => updateView(view.id)}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-border flex-shrink-0 border-t p-4">
          <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}

/* ─── Round 3: Feature 4 — Header Stats Row ─────────────────────────── */

function computeHeaderStat(
  rows: Row<unknown>[],
  columnId: string,
  statType: 'count' | 'sum' | 'avg' | 'min' | 'max' | 'nullCount' | 'unique',
): string {
  const values = rows.map((r) => r.getValue(columnId));
  switch (statType) {
    case 'count': return String(values.length);
    case 'nullCount': return String(values.filter((v) => v == null || v === '').length);
    case 'unique': return String(new Set(values.map((v) => String(v ?? ''))).size);
    default: {
      const nums = values.map(Number).filter(Number.isFinite);
      if (!nums.length) return '—';
      if (statType === 'sum') return new Intl.NumberFormat().format(nums.reduce((a, b) => a + b, 0));
      if (statType === 'avg') return new Intl.NumberFormat().format(nums.reduce((a, b) => a + b, 0) / nums.length);
      if (statType === 'min') return new Intl.NumberFormat().format(Math.min(...nums));
      return new Intl.NumberFormat().format(Math.max(...nums));
    }
  }
}

function getDefaultStatType(columnId: string, table: Table<unknown>): 'sum' | 'count' {
  const col = table.getColumn(columnId);
  if (!col) return 'count';
  const auraMeta = getAuraMeta(col);
  if (auraMeta.type === 'number' || auraMeta.type === 'currency') return 'sum';
  return 'count';
}

function DataTableHeaderStatsRow({
  table,
  renderedColumnIds,
  columnPaddingLeft,
  columnPaddingRight,
  headerStatsConfig,
}: {
  table: Table<unknown>;
  renderedColumnIds: Set<string>;
  columnPaddingLeft: number;
  columnPaddingRight: number;
  headerStatsConfig?: Partial<Record<string, 'count' | 'sum' | 'avg' | 'min' | 'max' | 'nullCount' | 'unique'>>;
}) {
  const rows = table.getFilteredRowModel().rows;
  const visibleLeafCols = table.getVisibleLeafColumns().filter((c) => renderedColumnIds.has(c.id));

  const statsMap = React.useMemo(() => {
    const map = new Map<string, { label: string; value: string }>();
    for (const col of visibleLeafCols) {
      const statType = headerStatsConfig?.[col.id] ?? getDefaultStatType(col.id, table);
      const value = computeHeaderStat(rows, col.id, statType);
      map.set(col.id, { label: statType, value });
    }
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, visibleLeafCols, headerStatsConfig]);

  return (
    <tr className="bg-muted/40 border-border border-b text-xs text-muted-foreground">
      {columnPaddingLeft > 0 ? <td style={{ width: columnPaddingLeft }} /> : null}
      {visibleLeafCols.map((col) => {
        const stat = statsMap.get(col.id);
        const auraMeta = getAuraMeta(col);
        const align = auraMeta.align ?? 'left';
        return (
          <td
            key={col.id}
            className={cn(
              'px-3 py-1',
              align === 'center' && 'text-center',
              align === 'right' && 'text-right',
            )}
          >
            {stat ? (
              <div className="flex flex-col">
                <span className="text-[9px] font-medium uppercase tracking-wide opacity-60">{stat.label}</span>
                <span className="tabular-nums">{stat.value}</span>
              </div>
            ) : null}
          </td>
        );
      })}
      {columnPaddingRight > 0 ? <td style={{ width: columnPaddingRight }} /> : null}
    </tr>
  );
}
