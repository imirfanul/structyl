import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DataTable,
  DataTableToolbarButton,
  EditableCell,
  exportToCSV,
  exportToJSON,
  exportToXLSX,
  type DataTableBulkAction,
  type DataTableColumnDef,
  type DataTableConditionalRule,
  type DataTableFilterGroup,
  type DataTableProps,
  type DataTableRowActionItem,
  type DataTableSlots,
  type DataTablePivotConfig,
  type DataTableSavedView,
  type DataTableCellSelection,
} from '@aura-ui/data-table';

type UserRole = 'Admin' | 'Editor' | 'Viewer' | 'Owner';
type UserStatus = 'Active' | 'Paused' | 'Blocked' | 'Invited';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  team: string;
  status: UserStatus;
  revenue: number;
  cost: number;
  score: number;
  joined: string;
}

const roles: UserRole[] = ['Admin', 'Editor', 'Viewer', 'Owner'];
const statuses: UserStatus[] = ['Active', 'Paused', 'Blocked', 'Invited'];
const teams = ['Platform', 'Design', 'Growth', 'Risk', 'Support'];

const makeUser = (index: number): User => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: roles[index % roles.length] ?? 'Viewer',
  team: teams[index % teams.length] ?? 'Platform',
  status: statuses[index % statuses.length] ?? 'Active',
  revenue: 1200 + index * 37,
  cost: 720 + index * 19,
  score: 40 + ((index * 7) % 60),
  joined: `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`,
});

const data = Array.from({ length: 16 }, (_, index) => makeUser(index));
const largeData = Array.from({ length: 5000 }, (_, index) => makeUser(index));

const columns: DataTableColumnDef<User>[] = [
  { field: 'name', headerName: 'Name', size: 180 },
  { field: 'email', headerName: 'Email', size: 240 },
  { field: 'role', headerName: 'Role', size: 120 },
  { field: 'team', headerName: 'Team', size: 140 },
  { field: 'status', headerName: 'Status', size: 120 },
  { field: 'revenue', headerName: 'Revenue', type: 'number', size: 130 },
  { field: 'cost', headerName: 'Cost', type: 'number', size: 120 },
  { field: 'score', headerName: 'Score', type: 'number', size: 100 },
  { field: 'joined', headerName: 'Joined', type: 'date', size: 130 },
];

const metricColumns: DataTableColumnDef<User>[] = Array.from({ length: 24 }, (_, index) => ({
  id: `metric-${index + 1}`,
  headerName: `M${index + 1}`,
  type: 'number' as const,
  size: 100,
  accessorFn: (row: User) => row.score + index,
}));

const advancedFilter: DataTableFilterGroup = {
  id: 'root',
  logic: 'and',
  items: [
    { id: 'status', columnId: 'status', operator: 'equals', value: 'Active' },
    {
      id: 'score-or-team',
      logic: 'or',
      items: [
        { id: 'score', columnId: 'score', operator: 'gte', value: 70 },
        { id: 'team', columnId: 'team', operator: 'equals', value: 'Design' },
      ],
    },
  ],
};

const meta: Meta<typeof DataTable<User>> = {
  title: 'Data/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    columns,
    data,
    enableSorting: true,
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {};

export const SearchFiltersAndPagination: Story = {
  args: {
    enableGlobalSearch: true,
    enableFiltering: true,
    enableAdvancedFiltering: true,
    defaultAdvancedFilter: advancedFilter,
    enablePagination: true,
    pageSize: 6,
  },
};

export const VirtualizedRowsAndColumns: Story = {
  args: {
    columns: [...columns, ...metricColumns],
    data: largeData,
    virtual: { estimatedRowHeight: 44, overscan: 12 },
    virtualColumns: { estimatedColumnWidth: 120, overscan: 6 },
    height: 420,
    enableGlobalSearch: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
  },
};

export const ConfigurationSelectionAndPinning: Story = {
  args: {
    getRowId: (row) => String(row.id),
    enableGlobalSearch: true,
    enableRowSelection: true,
    enableColumnSelection: true,
    enableColumnConfiguration: true,
    enableColumnPinning: true,
    enableRowPinning: true,
    enableGrouping: true,
    defaultRowPinning: { top: ['1'], bottom: ['16'] },
    rowActions: (row) => <button type="button">Open {row.original.name}</button>,
  },
};

export const AggregationAndTotals: Story = {
  args: {
    aggregations: { revenue: 'sum', cost: 'avg', score: 'max' },
    rowTotals: {
      columns: ['revenue', 'cost'],
      format: (value) => `$${value.toLocaleString()}`,
    },
    showColumnTotals: true,
  },
};

function InlineCreateStory() {
  const [rows, setRows] = React.useState(data);
  return (
    <DataTable
      columns={columns}
      data={rows}
      enableGlobalSearch
      inlineCreateRow={{
        fields: [
          { id: 'name', label: 'Name', placeholder: 'New user' },
          { id: 'email', label: 'Email', placeholder: 'user@example.com' },
          { id: 'role', label: 'Role', placeholder: 'Viewer' },
        ],
        onAdd: (values) =>
          setRows((current) => [
            ...current,
            {
              id: current.length + 1,
              name: values.name || `User ${current.length + 1}`,
              email: values.email || 'new@example.com',
              role: (values.role as UserRole) || 'Viewer',
              team: 'Support',
              status: 'Invited',
              revenue: 0,
              cost: 0,
              score: 50,
              joined: '2026-05-24',
            },
          ]),
      }}
      rowActions={(row) => <button type="button">Invite {row.original.name}</button>}
    />
  );
}

export const InlineCreateAndActions: Story = {
  render: () => <InlineCreateStory />,
};

export const DetailRowsAndSpanning: Story = {
  args: {
    getRowId: (row) => String(row.id),
    renderDetailPanel: (row) => (
      <div className="grid gap-1 text-sm">
        <strong>{row.original.name}</strong>
        <span className="text-muted-foreground">
          {row.original.team} team, {row.original.status.toLowerCase()} status
        </span>
      </div>
    ),
    getRowClassName: (row) => (row.original.status === 'Blocked' ? 'bg-destructive/10' : undefined),
    getCellColSpan: (cell, row) =>
      cell.column.id === 'name' && row.original.status === 'Blocked' ? 2 : undefined,
    getCellRowSpan: (cell, row) =>
      cell.column.id === 'team' && row.original.team === 'Platform' ? 2 : undefined,
  },
};

export const LoadersAndLocalization: Story = {
  args: {
    loading: true,
    loadingVariant: 'skeleton',
    skeletonRows: 6,
    localeText: {
      searchPlaceholder: 'Buscar usuarios...',
      loading: 'Cargando...',
      noResults: 'Sin resultados.',
      columns: 'Columnas',
      filters: 'Filtros',
      rowActions: 'Acciones',
      total: 'Total',
      selectedRows: (selected, total) => `${selected} de ${total} seleccionados`,
      page: (page, pageCount) => `Pagina ${page} de ${pageCount}`,
    },
  },
};

function LazyLoadingStory() {
  const [count, setCount] = React.useState(40);
  const rows = React.useMemo(() => largeData.slice(0, count), [count]);
  return (
    <DataTable
      columns={columns}
      data={rows}
      virtual={{ estimatedRowHeight: 44 }}
      height={360}
      hasMore={count < 220}
      loadingMore={count < 80}
      onLoadMore={() => setCount((current) => Math.min(current + 40, 220))}
    />
  );
}

export const LazyLoading: Story = {
  render: () => <LazyLoadingStory />,
};

/* ─── New features ──────────────────────────────────────────────────── */

export const ColumnDefinitionAPI: Story = {
  args: {
    columns: [
      {
        field: 'name',
        headerName: 'Full Name',
        description: 'User display name',
        flex: 1,
        type: 'string',
        renderCell: ({ value }) => <strong>{String(value)}</strong>,
      },
      {
        field: 'email',
        headerName: 'Email',
        size: 220,
        type: 'string',
        filterOperators: ['contains', 'equals', 'startsWith'],
      },
      {
        field: 'role',
        headerName: 'Role',
        size: 120,
        align: 'center',
      },
      {
        field: 'revenue',
        headerName: 'Revenue',
        type: 'number',
        size: 130,
        renderCell: ({ value }) => `$${Number(value).toLocaleString()}`,
      },
      {
        field: 'score',
        headerName: 'Score',
        type: 'number',
        size: 100,
        description: 'Performance score (0–100)',
      },
      {
        field: 'joined',
        headerName: 'Joined',
        type: 'date',
        size: 130,
        renderCell: ({ value }) =>
          new Date(String(value)).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
      },
    ] satisfies DataTableColumnDef<User>[],
    enableSorting: true,
    enableGlobalSearch: true,
  },
};

/* Tree data */
interface Category {
  id: string;
  name: string;
  type: string;
  count: number;
  children?: Category[];
}

const categoryTree: Category[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    type: 'Department',
    count: 42,
    children: [
      { id: 'frontend', name: 'Frontend', type: 'Team', count: 12 },
      { id: 'backend', name: 'Backend', type: 'Team', count: 18 },
      { id: 'infra', name: 'Infrastructure', type: 'Team', count: 12 },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    type: 'Department',
    count: 14,
    children: [
      { id: 'ux', name: 'UX', type: 'Team', count: 8 },
      { id: 'brand', name: 'Brand', type: 'Team', count: 6 },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    type: 'Department',
    count: 20,
    children: [
      { id: 'seo', name: 'SEO', type: 'Team', count: 7 },
      { id: 'paid', name: 'Paid', type: 'Team', count: 13 },
    ],
  },
];

function TreeDataStory() {
  return (
    <DataTable<Category>
      columns={[
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'type', headerName: 'Type', size: 120, align: 'center' },
        {
          field: 'count',
          headerName: 'Members',
          type: 'number',
          size: 110,
          description: 'Total headcount',
        },
      ]}
      data={categoryTree}
      treeData
      getSubRows={(row) => row.children}
      getRowId={(row) => row.id}
    />
  );
}

export const TreeData: Story = {
  render: () => <TreeDataStory />,
};

/* Copy / Paste */
function CopyPasteStory() {
  const [lastCopied, setLastCopied] = React.useState<string>('');
  return (
    <div className="grid gap-4">
      <DataTable
        columns={columns}
        data={data}
        enableRowSelection
        enableCopyPaste
        onCopy={(rows, text) => setLastCopied(`Copied ${rows.length} row(s)`)}
      />
      {lastCopied && (
        <p className="text-muted-foreground text-sm">{lastCopied} — paste into Excel or Sheets</p>
      )}
    </div>
  );
}

export const CopyPaste: Story = {
  render: () => <CopyPasteStory />,
};

/* Density */
function DensityStory() {
  const [density, setDensity] = React.useState<'compact' | 'standard' | 'comfortable'>('standard');
  return (
    <DataTable
      columns={columns}
      data={data}
      density={density}
      onDensityChange={setDensity}
      enableDensityToggle
      enableGlobalSearch
    />
  );
}

export const DensityToggle: Story = {
  render: () => <DensityStory />,
};

/* Toolbar actions */
function ToolbarActionsStory() {
  const tableRef = React.useRef(null);
  return (
    <DataTable
      columns={columns}
      data={data}
      tableRef={tableRef}
      enableRowSelection
      enableColumnConfiguration
      enableDensityToggle
      toolbarActions={[
        {
          id: 'csv',
          label: 'Export CSV',
          tooltip: 'Download all visible rows as CSV',
          onClick: (table) => exportToCSV(table, 'users.csv'),
        },
        {
          id: 'json',
          label: 'Export JSON',
          tooltip: 'Download all rows as JSON',
          onClick: (table) => exportToJSON(table, 'users.json'),
        },
        {
          id: 'selected-csv',
          label: 'Selection → CSV',
          tooltip: 'Download selected rows only',
          onClick: (table) => exportToCSV(table, 'selected.csv', { onlySelected: true }),
        },
      ]}
      onRefresh={() => window.location.reload()}
      toolbarEnd={
        <DataTableToolbarButton tooltip="Open help" onClick={() => alert('Help!')}>
          Help
        </DataTableToolbarButton>
      }
    />
  );
}

export const ToolbarActions: Story = {
  render: () => <ToolbarActionsStory />,
};

/* Inline editing */
function InlineEditingStory() {
  const [rows, setRows] = React.useState(data);

  const editableColumns: DataTableColumnDef<User>[] = [
    {
      field: 'name',
      headerName: 'Name',
      size: 180,
      renderCell: ({ row, value }) => (
        <EditableCell
          value={value}
          onCommit={(next) =>
            setRows((current) =>
              current.map((r) =>
                r.id === row.original.id ? { ...r, name: String(next) } : r,
              ),
            )
          }
        />
      ),
    },
    { field: 'email', headerName: 'Email', size: 220 },
    { field: 'role', headerName: 'Role', size: 120 },
    {
      field: 'score',
      headerName: 'Score',
      type: 'number',
      size: 100,
      renderCell: ({ row, value }) => (
        <EditableCell
          type="number"
          value={value}
          onCommit={(next) =>
            setRows((current) =>
              current.map((r) =>
                r.id === row.original.id ? { ...r, score: Number(next) } : r,
              ),
            )
          }
        />
      ),
    },
    { field: 'status', headerName: 'Status', size: 120 },
  ];

  return <DataTable columns={editableColumns} data={rows} enableSorting />;
}

export const InlineEditing: Story = {
  render: () => <InlineEditingStory />,
};

/* ─── Phase 2 features ───────────────────────────────────────────────── */

/* Pagination overhaul */
export const PaginationOverhaul: Story = {
  args: {
    enablePagination: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25],
    showTotalRows: true,
    enableGlobalSearch: true,
  },
};

/* Bulk actions */
function BulkActionsStory() {
  const [rows, setRows] = React.useState(data);
  const bulkActions: DataTableBulkAction<User>[] = [
    {
      id: 'delete',
      label: 'Delete selected',
      tooltip: 'Permanently remove selected rows',
      variant: 'destructive',
      onClick: (selectedRows, table) => {
        const ids = new Set(selectedRows.map((r) => r.original.id));
        setRows((current) => current.filter((r) => !ids.has(r.id)));
        table.resetRowSelection();
      },
    },
    {
      id: 'export',
      label: 'Export selected',
      onClick: (selectedRows) =>
        alert(`Exporting ${selectedRows.length} row(s)`),
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={rows}
      getRowId={(row) => String(row.id)}
      enableRowSelection
      bulkActions={bulkActions}
    />
  );
}

export const BulkActions: Story = {
  render: () => <BulkActionsStory />,
};

/* Row action — 3-dot menu */
function RowActionMenuStory() {
  const [log, setLog] = React.useState('');
  const items: DataTableRowActionItem<User>[] = [
    {
      id: 'view',
      label: 'View details',
      onClick: (row) => setLog(`Viewed: ${row.original.name}`),
    },
    {
      id: 'edit',
      label: 'Edit',
      onClick: (row) => setLog(`Editing: ${row.original.name}`),
    },
    { id: 'sep', separator: true, label: '', onClick: () => {} },
    {
      id: 'delete',
      label: 'Delete',
      variant: 'destructive',
      disabled: (row) => row.original.status === 'Blocked',
      onClick: (row) => setLog(`Deleted: ${row.original.name}`),
    },
  ];
  return (
    <div className="grid gap-4">
      <DataTable columns={columns} data={data} rowActionMenu={items} />
      {log && <p className="text-muted-foreground text-sm">{log}</p>}
    </div>
  );
}

export const RowActionMenu: Story = {
  render: () => <RowActionMenuStory />,
};

/* Row action — inline buttons */
function RowActionButtonsStory() {
  const [log, setLog] = React.useState('');
  const items: DataTableRowActionItem<User>[] = [
    {
      id: 'open',
      label: 'Open',
      onClick: (row) => setLog(`Opened: ${row.original.name}`),
    },
    {
      id: 'archive',
      label: 'Archive',
      hidden: (row) => row.original.status === 'Blocked',
      onClick: (row) => setLog(`Archived: ${row.original.name}`),
    },
  ];
  return (
    <div className="grid gap-4">
      <DataTable columns={columns} data={data} rowActionButtons={items} />
      {log && <p className="text-muted-foreground text-sm">{log}</p>}
    </div>
  );
}

export const RowActionButtons: Story = {
  render: () => <RowActionButtonsStory />,
};

/* Row + column copy */
export const RowAndColumnCopy: Story = {
  args: {
    enableRowPinning: true,
    enableRowCopy: true,
    enableColumnCopy: true,
  },
};

/* Custom slots */
function SlotsStory() {
  const slots: DataTableSlots<User> = {
    NoRowsOverlay: () => (
      <div className="flex flex-col items-center gap-2 py-12 text-center">
        <p className="text-muted-foreground text-sm font-medium">No users yet.</p>
      </div>
    ),
    NoResultsOverlay: () => (
      <div className="flex flex-col items-center gap-2 py-12 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          No users match your search or filters.
        </p>
      </div>
    ),
  };
  return (
    <DataTable
      columns={columns}
      data={[]}
      enableGlobalSearch
      enableFiltering
      slots={slots}
    />
  );
}

export const CustomSlots: Story = {
  render: () => <SlotsStory />,
};

/* ─── Phase 3–6 features ─────────────────────────────────────────────── */

/* Conditional cell formatting */
export const CellClassNames: Story = {
  args: {
    getCellClassName: (cell) => {
      if (cell.column.id === 'score') {
        const v = Number(cell.getValue());
        if (v >= 80) return 'text-green-600 font-semibold';
        if (v < 50) return 'text-red-500 font-semibold';
      }
      if (cell.column.id === 'revenue') {
        const v = Number(cell.getValue());
        if (v > 1800) return 'text-primary font-medium';
      }
      return undefined;
    },
    enableSorting: true,
  },
};

/* Striped rows + row numbers */
export const StripedAndRowNumbers: Story = {
  args: {
    striped: true,
    enableRowNumbers: true,
    enableSorting: true,
  },
};

/* Multi-sort with priority indicators */
export const MultiSort: Story = {
  args: {
    enableSorting: true,
  },
};

/* Cell tooltips */
export const CellTooltips: Story = {
  args: {
    columns: [
      { field: 'name', headerName: 'Name', size: 80 },
      { field: 'email', headerName: 'Email', size: 90 },
      { field: 'role', headerName: 'Role', size: 70 },
      { field: 'team', headerName: 'Team', size: 70 },
      { field: 'score', headerName: 'Score', type: 'number', size: 70 },
    ] satisfies DataTableColumnDef<User>[],
    enableCellTooltip: true,
  },
};

/* State persistence */
export const StatePersistence: Story = {
  args: {
    stateKey: 'storybook-users-table',
    enableSorting: true,
    enableGlobalSearch: true,
    enablePagination: true,
    pageSize: 5,
    enableColumnResizing: true,
  },
};

/* Status bar */
export const StatusBar: Story = {
  args: {
    getRowId: (row) => String(row.id),
    enableRowSelection: true,
    enableStatusBar: true,
    enableSorting: true,
  },
};

/* Fullscreen + print */
export const FullscreenAndPrint: Story = {
  args: {
    enableFullscreen: true,
    onPrint: () => undefined,
    enableGlobalSearch: true,
    enableSorting: true,
  },
};

/* Per-row loading */
function PerRowLoadingStory() {
  const [loadingIds, setLoadingIds] = React.useState<string[]>([]);
  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setLoadingIds(['2', '5', '8']);
            setTimeout(() => setLoadingIds([]), 2000);
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Simulate row refresh (2 s)
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => String(row.id)}
        loadingRowIds={loadingIds}
      />
    </div>
  );
}

export const PerRowLoading: Story = {
  render: () => <PerRowLoadingStory />,
};

/* Quick filter columns */
export const QuickFilterColumns: Story = {
  args: {
    quickFilterColumns: ['name', 'role', 'team'],
    enableSorting: true,
  },
};

/* Cell / row context menus */
function ContextMenusStory() {
  const [log, setLog] = React.useState('');
  return (
    <div className="grid gap-4">
      <DataTable
        columns={columns}
        data={data}
        onRowContextMenu={(row, event) => {
          event.preventDefault();
          setLog(`Row right-click: ${row.original.name}`);
        }}
        onCellContextMenu={(cell, _row, event) => {
          event.preventDefault();
          setLog(`Cell right-click [${cell.column.id}]: ${String(cell.getValue())}`);
        }}
      />
      {log && <p className="text-muted-foreground text-sm">{log}</p>}
    </div>
  );
}

export const ContextMenus: Story = {
  render: () => <ContextMenusStory />,
};

/* Column auto-size */
export const ColumnAutoSize: Story = {
  args: {
    columns: [
      { field: 'name', headerName: 'Name', size: 60 },
      { field: 'email', headerName: 'Email', size: 60 },
      { field: 'role', headerName: 'Role', size: 60 },
      { field: 'team', headerName: 'Team', size: 60 },
      { field: 'score', headerName: 'Score', type: 'number', size: 60 },
    ] satisfies DataTableColumnDef<User>[],
    enableColumnResizing: true,
    enableColumnAutoSize: true,
  },
};

/* Locked columns */
export const LockedColumns: Story = {
  args: {
    enableColumnConfiguration: true,
    enableColumnResizing: true,
    lockedColumns: ['name', 'email'],
  },
};

/* Mobile card view */
export const MobileCardView: Story = {
  args: {
    mobileBreakpoint: 'md',
  },
};

/* Export menu */
export const ExportMenu: Story = {
  args: {
    enableRowSelection: true,
    enableExport: true,
  },
};

/* Conditional formatting */
function ConditionalFormattingStory() {
  const [rules, setRules] = React.useState<DataTableConditionalRule[]>([
    {
      id: 'high-score',
      columnId: 'score',
      operator: 'gte',
      value: '80',
      backgroundColor: '#dcfce7',
      textColor: '#166534',
    },
    {
      id: 'low-score',
      columnId: 'score',
      operator: 'lt',
      value: '50',
      backgroundColor: '#fee2e2',
      textColor: '#991b1b',
    },
  ]);
  return (
    <DataTable
      columns={[
        { field: 'name', headerName: 'Name' },
        { field: 'role', headerName: 'Role' },
        { field: 'score', headerName: 'Score', type: 'number' },
        { field: 'revenue', headerName: 'Revenue', type: 'number' },
      ] satisfies DataTableColumnDef<User>[]}
      data={data}
      enableConditionalFormatting
      conditionalFormattingRules={rules}
      onConditionalFormattingRulesChange={setRules}
    />
  );
}

export const ConditionalFormatting: Story = {
  render: () => <ConditionalFormattingStory />,
};

/* ─── Round 1 features ───────────────────────────────────────────────── */

/* Built-in cell type renderers */
export const BuiltinCellTypes: Story = {
  args: {
    columns: [
      { field: 'name', headerName: 'Name', size: 160 },
      {
        field: 'role',
        headerName: 'Role',
        size: 110,
        type: 'badge',
        badgeMap: { Admin: { color: 'success' }, Editor: { color: 'warning' }, Viewer: { color: 'secondary' }, Owner: {} },
      },
      {
        field: 'revenue',
        headerName: 'Revenue',
        size: 140,
        type: 'currency',
        currencyCode: 'USD',
      },
      {
        field: 'score',
        headerName: 'Score',
        size: 130,
        type: 'progress',
        progressMax: 100,
      },
    ] satisfies DataTableColumnDef<User>[],
    enableSorting: true,
  },
};

/* Column groups — uses column description to mark grouped columns */
export const ColumnGroups: Story = {
  render: () => (
    <DataTable<User>
      columns={[
        {
          headerName: 'Identity',
          columns: [
            { field: 'name', headerName: 'Name', size: 160 },
            { field: 'role', headerName: 'Role', size: 120 },
          ],
        },
        {
          headerName: 'Financials',
          columns: [
            { field: 'revenue', headerName: 'Revenue', type: 'number', size: 130 },
            { field: 'cost', headerName: 'Cost', type: 'number', size: 110 },
          ],
        },
        {
          headerName: 'Performance',
          columns: [
            { field: 'score', headerName: 'Score', type: 'number', size: 100 },
            { field: 'joined', headerName: 'Joined', type: 'date', size: 130 },
          ],
        },
      ] satisfies DataTableColumnDef<User>[]}
      data={data}
      enableSorting
      enableColumnResizing
    />
  ),
};

/* Column resizing */
export const ColumnResizing: Story = {
  args: {
    enableColumnResizing: true,
    enableColumnAutoSize: true,
    enableSorting: true,
  },
};

/* Column reordering */
function ColumnReorderingStory() {
  return (
    <DataTable<User>
      columns={columns}
      data={data}
      enableColumnReordering
      enableColumnConfiguration
      enableSorting
      onColumnOrderChange={(ids) => console.log('Column order:', ids)}
    />
  );
}
export const ColumnReordering: Story = {
  render: () => <ColumnReorderingStory />,
};

/* Row reordering */
function RowReorderingStory() {
  const [rows, setRows] = React.useState(data);
  return (
    <DataTable<User>
      columns={columns}
      data={rows}
      enableRowReordering
      onRowOrderChange={(newRows) => setRows(newRows as User[])}
    />
  );
}
export const RowReordering: Story = {
  render: () => <RowReorderingStory />,
};

/* Row status */
export const RowStatus: Story = {
  render: () => {
    return (
      <DataTable<User>
        columns={columns}
        data={data}
        enableSorting
        getRowStatus={(row) => {
          if (row.original.status === 'Active') return 'success';
          if (row.original.status === 'Blocked') return 'error';
          if (row.original.status === 'Paused') return 'warning';
          if (row.original.status === 'Invited') return 'info';
          return undefined;
        }}
      />
    );
  },
};

/* Custom row height */
export const CustomRowHeight: Story = {
  args: {
    rowHeight: 48,
    enableSorting: true,
  },
};

/* Filter chips */
export const FilterChips: Story = {
  args: {
    enableFiltering: true,
    enableFilterChips: true,
    enableSorting: true,
  },
};

/* Excel export */
function ExcelExportStory() {
  return (
    <DataTable
      columns={columns}
      data={data}
      enableRowSelection
      enableExport
      toolbarActions={[
        {
          id: 'xlsx',
          label: 'Export XLSX',
          tooltip: 'Download as Excel spreadsheet',
          onClick: (table) => exportToXLSX(table, { filename: 'users.xlsx' }),
        },
      ]}
    />
  );
}

export const ExcelExport: Story = {
  render: () => <ExcelExportStory />,
};

/* Inline editing v2 */
function InlineEditingV2Story() {
  const [rows, setRows] = React.useState(data);

  const editableColumns: DataTableColumnDef<User>[] = [
    {
      field: 'name',
      headerName: 'Name',
      size: 180,
      renderCell: ({ row, value }) => (
        <EditableCell
          value={value}
          onCommit={(next) =>
            setRows((current) =>
              current.map((r) => (r.id === row.original.id ? { ...r, name: String(next) } : r)),
            )
          }
        />
      ),
    },
    { field: 'email', headerName: 'Email', size: 220 },
    { field: 'role', headerName: 'Role', size: 120 },
    {
      field: 'score',
      headerName: 'Score',
      type: 'number',
      size: 100,
      renderCell: ({ row, value }) => (
        <EditableCell
          type="number"
          value={value}
          onCommit={(next) =>
            setRows((current) =>
              current.map((r) =>
                r.id === row.original.id ? { ...r, score: Number(next) } : r,
              ),
            )
          }
        />
      ),
    },
    { field: 'status', headerName: 'Status', size: 120 },
  ];

  return (
    <div className="grid gap-2">
      <p className="text-muted-foreground text-xs">Double-click any cell to edit. Ctrl+Z to undo.</p>
      <DataTable
        columns={editableColumns}
        data={rows}
        editMode="dblclick"
        enableUndoRedo
        enableSorting
      />
    </div>
  );
}

export const InlineEditingV2: Story = {
  render: () => <InlineEditingV2Story />,
};

/* ─── Round 2 features ───────────────────────────────────────────────── */

/* Cell range selection */
function CellRangeSelectionStory() {
  const [selection, setSelection] = React.useState<DataTableCellSelection | null>(null);
  return (
    <div className="grid gap-4">
      <DataTable
        columns={columns}
        data={data}
        enableCellSelection
        onCellSelectionChange={setSelection}
      />
      {selection && (
        <p className="text-muted-foreground text-sm">
          Selected: rows {selection.startRowIndex + 1}–{selection.endRowIndex + 1}, cols{' '}
          {selection.startColIndex + 1}–{selection.endColIndex + 1}
        </p>
      )}
    </div>
  );
}

export const CellRangeSelection: Story = {
  render: () => <CellRangeSelectionStory />,
};

/* Tool panel */
export const ToolPanel: Story = {
  args: {
    enableFiltering: true,
    enableColumnResizing: true,
    enableToolPanel: true,
    defaultToolPanelTab: 'columns',
    enableSorting: true,
  },
};

/* Live data */
function LiveDataStory() {
  const [rows, setRows] = React.useState(data.slice(0, 8));
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRows((prev) =>
        prev.map((r, i) => {
          if (i % 3 !== Math.floor(Math.random() * 3)) return r;
          return {
            ...r,
            score: Math.max(0, Math.min(100, r.score + Math.round((Math.random() - 0.5) * 20))),
            revenue: r.revenue + Math.round((Math.random() - 0.5) * 300),
          };
        }),
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <DataTable
      columns={columns}
      data={rows}
      enableLiveData
      liveDataKey="id"
    />
  );
}

export const LiveData: Story = {
  render: () => <LiveDataStory />,
};

/* Async detail panel */
function AsyncDetailPanelStory() {
  return (
    <div className="grid gap-2">
      <p className="text-muted-foreground text-xs">
        Click ▶ to expand a row — panel loads async then caches.
      </p>
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => String(row.id)}
        loadDetailPanel={async (row) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return (
            <div className="grid gap-1 p-3 text-sm">
              <strong>{row.original.name}</strong>
              <span className="text-muted-foreground">
                {row.original.team} team · {row.original.status} · Score: {row.original.score}
              </span>
            </div>
          );
        }}
        detailPanelCacheSize={20}
      />
    </div>
  );
}

export const AsyncDetailPanel: Story = {
  render: () => <AsyncDetailPanelStory />,
};

/* Print-optimized styles */
export const PrintStyles: Story = {
  args: {
    enablePrintStyles: true,
    enableFullscreen: true,
    enableSorting: true,
    enableGlobalSearch: true,
  },
};

/* ─── Round 3 features ───────────────────────────────────────────────── */

/* Pivot mode */
interface PivotRow {
  id: number;
  region: string;
  product: string;
  quarter: string;
  sales: number;
  units: number;
}

const pivotRows: PivotRow[] = [
  { id: 1, region: 'North', product: 'Widget A', quarter: 'Q1', sales: 1200, units: 40 },
  { id: 2, region: 'North', product: 'Widget B', quarter: 'Q1', sales: 800, units: 28 },
  { id: 3, region: 'South', product: 'Widget A', quarter: 'Q1', sales: 950, units: 32 },
  { id: 4, region: 'South', product: 'Widget B', quarter: 'Q1', sales: 1100, units: 36 },
  { id: 5, region: 'East', product: 'Widget A', quarter: 'Q2', sales: 1350, units: 45 },
  { id: 6, region: 'East', product: 'Widget B', quarter: 'Q2', sales: 620, units: 21 },
  { id: 7, region: 'West', product: 'Widget A', quarter: 'Q2', sales: 780, units: 26 },
  { id: 8, region: 'West', product: 'Widget B', quarter: 'Q2', sales: 990, units: 33 },
  { id: 9, region: 'North', product: 'Widget A', quarter: 'Q2', sales: 1410, units: 47 },
  { id: 10, region: 'South', product: 'Widget B', quarter: 'Q2', sales: 870, units: 29 },
];

function PivotModeStory() {
  const [pivotConfig, setPivotConfig] = React.useState<DataTablePivotConfig>({
    rowGroupField: 'region',
    pivotField: 'product',
    valueField: 'sales',
    aggregation: 'sum',
  });
  return (
    <DataTable<PivotRow>
      columns={[
        { field: 'region', headerName: 'Region', size: 120 },
        { field: 'product', headerName: 'Product', size: 120 },
        { field: 'quarter', headerName: 'Quarter', size: 100 },
        { field: 'sales', headerName: 'Sales', type: 'number', size: 100 },
        { field: 'units', headerName: 'Units', type: 'number', size: 80 },
      ]}
      data={pivotRows}
      enablePivot
      pivotConfig={pivotConfig}
      onPivotConfigChange={setPivotConfig}
      enableSorting
    />
  );
}

export const PivotMode: Story = {
  render: () => <PivotModeStory />,
};

/* Saved views */
function SavedViewsStory() {
  const [savedViews, setSavedViews] = React.useState<DataTableSavedView[]>([
    {
      id: 'active-users',
      name: 'Active users',
      createdAt: new Date().toISOString(),
      state: { columnFilters: [{ id: 'status', value: 'Active' }] },
    },
    {
      id: 'high-scorers',
      name: 'High scorers',
      createdAt: new Date().toISOString(),
      state: { sorting: [{ id: 'score', desc: true }] },
    },
  ]);
  return (
    <DataTable
      columns={columns}
      data={data}
      enableSorting
      enableGlobalSearch
      enableFiltering
      enableSavedViews
      savedViews={savedViews}
      onSavedViewsChange={setSavedViews}
    />
  );
}

export const SavedViews: Story = {
  render: () => <SavedViewsStory />,
};

/* Header stats row */
export const HeaderStats: Story = {
  args: {
    enableHeaderStats: true,
    headerStatsConfig: { revenue: 'sum', cost: 'avg', score: 'max', id: 'count' },
    enableSorting: true,
  },
};

/* Schema validation */
interface ValidationUser {
  id: number;
  name: string;
  email: string;
  score: number;
  revenue: number;
}

const validationUsers: ValidationUser[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', score: 92, revenue: 1400 },
  { id: 2, name: '', email: 'bob@example.com', score: 150, revenue: 800 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', score: 67, revenue: -500 },
  { id: 4, name: 'Diana', email: 'diana@example.com', score: 45, revenue: 2200 },
  { id: 5, name: 'Eve', email: 'eve@example.com', score: -5, revenue: 950 },
];

function SchemaValidationStory() {
  return (
    <DataTable<ValidationUser>
      columns={[
        {
          field: 'name',
          headerName: 'Name',
          size: 160,
          displayValidate: (value) =>
            !String(value ?? '').trim() ? 'Name is required' : undefined,
        },
        { field: 'email', headerName: 'Email', size: 220 },
        {
          field: 'score',
          headerName: 'Score',
          type: 'number',
          size: 100,
          displayValidate: (value) => {
            const v = Number(value);
            if (v < 0 || v > 100) return 'Score must be 0–100';
            return undefined;
          },
        },
        {
          field: 'revenue',
          headerName: 'Revenue',
          type: 'number',
          size: 130,
          displayValidate: (value) =>
            Number(value) < 0 ? 'Revenue must be positive' : undefined,
        },
      ]}
      data={validationUsers}
      enableValidation
    />
  );
}

export const SchemaValidation: Story = {
  render: () => <SchemaValidationStory />,
};

/* Column value formatting */
export const ColumnValueFormatting: Story = {
  args: {
    columns: [
      { field: 'name', headerName: 'Name', size: 160 },
      {
        field: 'revenue',
        headerName: 'Revenue',
        type: 'number',
        size: 160,
        numberFormat: { style: 'currency', currency: 'EUR' },
      },
      {
        field: 'cost',
        headerName: 'Cost',
        type: 'number',
        size: 140,
        numberFormat: { style: 'currency', currency: 'EUR' },
      },
      {
        field: 'score',
        headerName: 'Score',
        type: 'number',
        size: 110,
        numberFormat: { minimumFractionDigits: 1, maximumFractionDigits: 1 },
      },
      {
        field: 'joined',
        headerName: 'Joined',
        type: 'date',
        size: 180,
        dateFormat: { dateStyle: 'long' },
      },
    ] satisfies DataTableColumnDef<User>[],
    locale: 'de-DE',
    enableSorting: true,
  },
};
