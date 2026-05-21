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
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type ExpandedState,
  type GroupingState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table,
  type Updater,
  type VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronDown, ChevronRight, ChevronUp, ChevronsUpDown } from '@your-lib/icons';
import { cn } from '@your-lib/utils';

export type DataTableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue>;

export interface ServerDataState {
  pagination?: PaginationState;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
  rowSelection?: RowSelectionState;
}

export interface ServerData<TData> {
  rows: TData[];
  total: number;
}

export interface DataTableProps<TData, TValue = unknown> {
  columns: DataTableColumn<TData, TValue>[];
  data: TData[];
  /** Render rows virtually. Specify estimated row height. */
  virtual?: boolean | { estimatedRowHeight?: number; overscan?: number };
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableRowSelection?: boolean | 'single';
  enablePagination?: boolean;
  enableExpanding?: boolean;
  enableGrouping?: boolean;
  enableColumnResizing?: boolean;
  enableColumnReordering?: boolean;
  enableColumnPinning?: boolean;
  pageSize?: number;
  loading?: boolean;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
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
}

export function DataTable<TData, TValue = unknown>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    virtual,
    enableSorting = true,
    enableFiltering = false,
    enableRowSelection = false,
    enablePagination = false,
    enableExpanding = false,
    enableGrouping = false,
    enableColumnResizing = false,
    enableColumnReordering = false,
    enableColumnPinning = false,
    pageSize = 10,
    loading,
    error,
    emptyState,
    className,
    serverSide,
    getRowId,
    getSubRows,
    onRowSelectionChange,
    onSortingChange,
    tableRef,
  } = props;

  const [sorting, setSorting] = React.useState<SortingState>(serverSide?.state.sorting ?? []);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    serverSide?.state.filters ?? [],
  );
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

  const handleSorting: OnChangeFn<SortingState> = (updater) => {
    const next = typeof updater === 'function' ? (updater as (prev: SortingState) => SortingState)(sorting) : updater;
    setSorting(next);
    onSortingChange?.(next);
    serverSide?.onStateChange({ ...serverSide.state, sorting: next });
  };
  const handleSelection: OnChangeFn<RowSelectionState> = (updater) => {
    const next =
      typeof updater === 'function'
        ? (updater as (prev: RowSelectionState) => RowSelectionState)(rowSelection)
        : updater;
    setRowSelection(next);
    onRowSelectionChange?.(next);
  };
  const handlePagination: OnChangeFn<PaginationState> = (updater) => {
    const next =
      typeof updater === 'function'
        ? (updater as (prev: PaginationState) => PaginationState)(pagination)
        : updater;
    setPagination(next);
    serverSide?.onStateChange({ ...serverSide.state, pagination: next });
  };
  const handleFilters: OnChangeFn<ColumnFiltersState> = (updater) => {
    const next =
      typeof updater === 'function'
        ? (updater as (prev: ColumnFiltersState) => ColumnFiltersState)(columnFilters)
        : updater;
    setColumnFilters(next);
    serverSide?.onStateChange({ ...serverSide.state, filters: next });
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
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
    enableFilters: enableFiltering,
    enableExpanding,
    enableGrouping,
    enableColumnResizing,
    enableColumnPinning,
    columnResizeMode: 'onChange',
    manualPagination: !!serverSide,
    manualSorting: !!serverSide,
    manualFiltering: !!serverSide,
    rowCount: serverSide?.rowCount,
    getRowId,
    getSubRows,
    onSortingChange: handleSorting,
    onColumnFiltersChange: handleFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: handleSelection,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onColumnSizingChange: setColumnSizing,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onPaginationChange: handlePagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting && !serverSide ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering && !serverSide ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination && !serverSide ? getPaginationRowModel() : undefined,
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    getFacetedRowModel: enableFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering ? getFacetedUniqueValues() : undefined,
  });

  React.useEffect(() => {
    if (tableRef) tableRef.current = table;
  }, [table, tableRef]);

  const rows = table.getRowModel().rows;
  const isVirtual = !!virtual;
  const virtualOpts = typeof virtual === 'object' && virtual !== null ? virtual : {};
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => virtualOpts.estimatedRowHeight ?? 40,
    getScrollElement: () => tableContainerRef.current,
    overscan: virtualOpts.overscan ?? 10,
    enabled: isVirtual,
  });

  const virtualRows = isVirtual ? rowVirtualizer.getVirtualItems() : [];
  const paddingTop = isVirtual && virtualRows.length > 0 ? (virtualRows[0]?.start ?? 0) : 0;
  const paddingBottom =
    isVirtual && virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualRows[virtualRows.length - 1]?.end ?? 0)
      : 0;

  return (
    <div className={cn('w-full', className)}>
      <div
        ref={tableContainerRef}
        className={cn('rounded-md border border-border', isVirtual && 'relative overflow-auto max-h-[600px]')}
      >
        <table className="w-full caption-bottom text-sm" role="grid">
          <thead className="sticky top-0 z-10 bg-bg [&_tr]:border-b [&_tr]:border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="hover:bg-muted/50">
                {headerGroup.headers.map((header) => {
                  const canSort = enableSorting && header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const isPinned = header.column.getIsPinned();
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={
                        sortDir === 'asc' ? 'ascending' : sortDir === 'desc' ? 'descending' : canSort ? 'none' : undefined
                      }
                      data-pinned={isPinned || undefined}
                      style={{
                        width: header.getSize(),
                        position: isPinned ? 'sticky' : undefined,
                        left: isPinned === 'left' ? header.column.getStart('left') : undefined,
                        right: isPinned === 'right' ? header.column.getAfter('right') : undefined,
                        background: isPinned ? 'inherit' : undefined,
                        zIndex: isPinned ? 1 : undefined,
                      }}
                      className={cn(
                        'relative h-10 px-3 text-left align-middle font-medium text-muted-foreground',
                        canSort && 'cursor-pointer select-none',
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort &&
                            (sortDir === 'asc' ? (
                              <ChevronUp className="size-4" />
                            ) : sortDir === 'desc' ? (
                              <ChevronDown className="size-4" />
                            ) : (
                              <ChevronsUpDown className="size-4 opacity-50" />
                            ))}
                        </div>
                      )}
                      {enableColumnResizing && header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            'absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-border opacity-0 hover:opacity-100',
                            header.column.getIsResizing() && 'bg-primary opacity-100',
                          )}
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {error ? (
              <tr>
                <td colSpan={table.getAllLeafColumns().length} className="h-24 text-center text-destructive">
                  {error}
                </td>
              </tr>
            ) : loading ? (
              <tr>
                <td colSpan={table.getAllLeafColumns().length} className="h-24 text-center text-muted-foreground">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={table.getAllLeafColumns().length} className="h-24 text-center">
                  {emptyState ?? <span className="text-muted-foreground">No results.</span>}
                </td>
              </tr>
            ) : isVirtual ? (
              <>
                {paddingTop > 0 && (
                  <tr>
                    <td style={{ height: paddingTop }} colSpan={table.getAllLeafColumns().length} />
                  </tr>
                )}
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  if (!row) return null;
                  return renderRow(row, table, enableExpanding);
                })}
                {paddingBottom > 0 && (
                  <tr>
                    <td style={{ height: paddingBottom }} colSpan={table.getAllLeafColumns().length} />
                  </tr>
                )}
              </>
            ) : (
              rows.map((row) => renderRow(row, table, enableExpanding))
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && <DataTablePagination table={table} />}
    </div>
  );
}

function renderRow<TData>(row: Row<TData>, table: Table<TData>, enableExpanding: boolean) {
  return (
    <tr
      key={row.id}
      data-state={row.getIsSelected() ? 'selected' : undefined}
      className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    >
      {row.getVisibleCells().map((cell, idx) => {
        const isPinned = cell.column.getIsPinned();
        return (
          <td
            key={cell.id}
            data-pinned={isPinned || undefined}
            style={{
              width: cell.column.getSize(),
              position: isPinned ? 'sticky' : undefined,
              left: isPinned === 'left' ? cell.column.getStart('left') : undefined,
              right: isPinned === 'right' ? cell.column.getAfter('right') : undefined,
              background: isPinned ? 'var(--your-lib-bg, white)' : undefined,
              zIndex: isPinned ? 1 : undefined,
            }}
            className="p-3 align-middle"
          >
            {enableExpanding && idx === 0 && row.getCanExpand() && (
              <button
                type="button"
                onClick={row.getToggleExpandedHandler()}
                className="mr-1 inline-flex h-4 w-4 items-center justify-center align-middle"
                aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
              >
                {row.getIsExpanded() ? (
                  <ChevronDown className="size-3.5" />
                ) : (
                  <ChevronRight className="size-3.5" />
                )}
              </button>
            )}
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}

/* ─── Pagination ──────────────────────────────────────────────────── */

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const state = table.getState().pagination;
  return (
    <div className="flex items-center justify-between gap-2 py-4">
      <div className="text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Page {state.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          type="button"
          className="rounded-md border border-input bg-bg px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-md border border-input bg-bg px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* ─── Toolbar ────────────────────────────────────────────────────────── */

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumnId?: string;
  filterPlaceholder?: string;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filterColumnId,
  filterPlaceholder = 'Search…',
  children,
}: DataTableToolbarProps<TData>) {
  const column = filterColumnId ? table.getColumn(filterColumnId) : null;
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      {column && (
        <input
          type="text"
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={filterPlaceholder}
          className="flex h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      )}
      {children}
    </div>
  );
}

/* ─── Per-column filter UI ──────────────────────────────────────────── */

import type { Column } from '@tanstack/react-table';

export interface DataTableColumnFilterProps<TData, TValue = unknown> {
  column: Column<TData, TValue>;
  title?: string;
}

export function DataTableColumnFilter<TData, TValue = unknown>({
  column,
  title,
}: DataTableColumnFilterProps<TData, TValue>) {
  const facets = column.getFacetedUniqueValues();
  const options = Array.from(facets.keys()).slice(0, 200);
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium">{title ?? column.id}</span>
      <input
        type="text"
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(e) => column.setFilterValue(e.target.value)}
        list={`${column.id}-options`}
        className="h-8 rounded-md border border-input bg-transparent px-2 text-sm shadow-sm"
      />
      <datalist id={`${column.id}-options`}>
        {options.map((opt) => (
          <option key={String(opt)} value={String(opt)} />
        ))}
      </datalist>
    </div>
  );
}

/* ─── Column visibility toggle ─────────────────────────────────────── */

export interface DataTableColumnVisibilityProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnVisibility<TData>({ table }: DataTableColumnVisibilityProps<TData>) {
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none rounded-md border border-input bg-bg px-3 py-1.5 text-sm hover:bg-accent">
        Columns
      </summary>
      <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-md">
        {table.getAllLeafColumns().map((col) => (
          <label key={col.id} className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-accent">
            <input
              type="checkbox"
              checked={col.getIsVisible()}
              onChange={col.getToggleVisibilityHandler()}
            />
            {col.id}
          </label>
        ))}
      </div>
    </details>
  );
}

/* ─── Export helpers ─────────────────────────────────────────────────── */

export function exportToCSV<TData>(
  table: Table<TData>,
  filename = 'export.csv',
  options?: { onlySelected?: boolean; includeHidden?: boolean },
) {
  const cols = options?.includeHidden ? table.getAllLeafColumns() : table.getVisibleLeafColumns();
  const headers = cols.map((c) => c.id);
  const rows = options?.onlySelected
    ? table.getFilteredSelectedRowModel().rows
    : table.getFilteredRowModel().rows;
  const escape = (val: unknown) => {
    const s = val == null ? '' : String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(cols.map((c) => escape(row.getValue(c.id))).join(','));
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
  const data = rows.map((r) => r.original);
  download(JSON.stringify(data, null, 2), filename, 'application/json');
}

function download(content: string, filename: string, mime: string) {
  if (typeof document === 'undefined') return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/* ─── Editable Cell helper ───────────────────────────────────────────── */

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
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setEditing(true);
        }}
        className="cursor-text rounded px-1 hover:bg-accent"
      >
        {String(value ?? '')}
      </span>
    );
  }
  return (
    <input
      autoFocus
      type={type}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={() => {
        const next = type === 'number' ? Number(local) : local;
        onCommit(next);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const next = type === 'number' ? Number(local) : local;
          onCommit(next);
          setEditing(false);
        } else if (e.key === 'Escape') {
          setLocal(String(value ?? ''));
          setEditing(false);
        }
      }}
      className="h-7 w-full rounded border border-input bg-transparent px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
    />
  );
}
