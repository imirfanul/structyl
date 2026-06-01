# @structyl/data-table

> The first-class React DataTable that structyl ships and Radix-style libraries leave out.

![npm](https://img.shields.io/npm/v/@structyl/data-table)
![license](https://img.shields.io/npm/l/@structyl/data-table)

A full-featured, type-safe React DataTable built on [`@tanstack/react-table`](https://tanstack.com/table) and rendered with structyl's accessible primitives and Tailwind CSS v4 styled layer. It pairs a rich, GUI-grid-style column API with row/column virtualization for large datasets and a server-side adapter for sorting, filtering, and pagination handled by your backend. It is the data-grid building block of the [structyl](https://github.com/imirfanul/structyl) component library.

## Installation

```bash
# pnpm
pnpm add @structyl/data-table

# npm
npm install @structyl/data-table

# yarn
yarn add @structyl/data-table
```

`react` and `react-dom` (v18 or v19) are required peer dependencies.

## Usage

```tsx
import { DataTable, type DataTableColumnDef } from '@structyl/data-table';

type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
};

const columns: DataTableColumnDef<Invoice>[] = [
  { field: 'customer', headerName: 'Customer' },
  { field: 'amount', headerName: 'Amount', type: 'currency', currencyCode: 'USD', align: 'right' },
  {
    field: 'status',
    headerName: 'Status',
    type: 'badge',
    badgeMap: {
      paid: { label: 'Paid', color: '#16a34a' },
      pending: { label: 'Pending', color: '#d97706' },
      overdue: { label: 'Overdue', color: '#dc2626' },
    },
  },
];

const data: Invoice[] = [
  { id: '1', customer: 'Acme Corp', amount: 1299.0, status: 'paid' },
  { id: '2', customer: 'Globex', amount: 540.5, status: 'pending' },
  { id: '3', customer: 'Initech', amount: 89.99, status: 'overdue' },
];

export function InvoicesTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      enableSorting
      enableFiltering
      enableGlobalSearch
      enablePagination
      enableRowSelection
      pageSize={10}
    />
  );
}
```

### Server-side data

When you provide a `serverSide` adapter, the table delegates sorting, filtering, and pagination to your backend and renders the rows you return:

```tsx
<DataTable
  columns={columns}
  data={rows}
  serverSide={{
    state: serverState,
    onStateChange: setServerState,
    rowCount: totalRowCount,
  }}
  enableSorting
  enablePagination
/>
```

## Features

- **Sorting & multi-sort** with header indicators, plus client- or server-side modes.
- **Filtering** — per-column filters, a global search box, and an advanced filter builder with grouped logic and operators.
- **Virtualization** — row (`virtual`) and column (`virtualColumns`) virtualization via `@tanstack/react-virtual` for large grids.
- **Server-side adapter** — offload sort/filter/pagination to your API through the `serverSide` prop.
- **Rich column types** — currency, badge, link, avatar, sparkline, progress, rating, date/datetime, and custom `renderCell`/`renderHeader`.
- **Column management** — resize, reorder, pin, hide, auto-size, and a full column configuration panel.
- **Row capabilities** — selection (single/multi), expanding/detail panels, grouping, tree data, reordering, pinning, and row numbers.
- **Inline editing** — editable cells with value getters/setters and validation.
- **Aggregations & totals** — column totals, row totals, and pivot configuration.
- **Bulk & row actions** — bulk-action bar, row action menus and inline buttons, and a configurable toolbar.
- **Export** — `exportToCSV`, `exportToJSON`, and `exportToXLSX` helpers.
- **Density, copy/paste, and slots** — density toggle, TSV copy/paste, locale text, and overridable sub-components via `slots`.
- **Type-safe** — fully generic over your row type with first-class TypeScript types.

## API

### Components

| Export | Description |
| --- | --- |
| `DataTable` | The main table component (generic over `TData`). |
| `DataTableToolbar` / `DataTableToolbarButton` | Toolbar surface and action button. |
| `DataTableAdvancedFilter` | Grouped advanced filter builder. |
| `DataTableColumnFilter` | Per-column filter control. |
| `DataTableColumnVisibility` | Column show/hide menu. |
| `DataTableColumnConfiguration` | Full column configuration panel. |
| `DataTablePagination` | Pagination controls. |
| `EditableCell` | Inline-editable cell renderer. |

### Utilities

| Export | Description |
| --- | --- |
| `exportToCSV` | Export rows to a CSV file. |
| `exportToJSON` | Export rows to a JSON file. |
| `exportToXLSX` | Export rows to an XLSX workbook. |
| `createColumnHelper` | Re-exported from `@tanstack/react-table` for typed column definitions. |

### Types

Key exported types include `DataTableProps`, `DataTableColumnDef`, `DataTableColumn`, `DataTableColumnType`, `DataTableDensity`, `ServerData`, `ServerDataState`, `DataTableFilterGroup`, `DataTableBulkAction`, and `DataTableRowActionItem`. Core TanStack table types (`ColumnDef`, `SortingState`, `RowSelectionState`, `Table`, and more) are re-exported for convenience.

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — see the full documentation at [www.structyl.com](https://www.structyl.com).

## License

MIT
