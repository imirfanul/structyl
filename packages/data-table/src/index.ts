/**
 * @aura-ui/data-table
 *
 * Full-featured DataTable with sorting, filtering, pagination, virtualization,
 * column resize/pin/reorder/visibility, row selection, expanding, grouping,
 * editable cells, server-side adapter, and CSV/JSON export.
 * Built on @tanstack/react-table.
 */

export {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
  DataTableColumnFilter,
  DataTableColumnVisibility,
  EditableCell,
  exportToCSV,
  exportToJSON,
} from './data-table';
export type {
  DataTableProps,
  DataTableColumn,
  DataTableToolbarProps,
  DataTableColumnFilterProps,
  DataTableColumnVisibilityProps,
  EditableCellProps,
  ServerData,
  ServerDataState,
} from './data-table';
export { createColumnHelper } from '@tanstack/react-table';
export type {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  GroupingState,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
