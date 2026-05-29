import * as React from 'react';
import {
  Bell,
  Copy,
  FileText,
  Folder,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from '@aura-ui/icons';
import {
  Accordion,
  Alert,
  AlertDialog,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Calendar,
  Checkbox,
  CircularProgress,
  Collapsible,
  ColorPicker,
  Combobox,
  Command,
  ContextMenu,
  CopyButton,
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  Dialog,
  Drawer,
  DropdownMenu,
  Editable,
  FileUpload,
  Form,
  HoverCard,
  Input,
  Label,
  Menubar,
  Mentions,
  Meter,
  MultiSelect,
  NavigationMenu,
  NumberField,
  OneTimePasswordField,
  Pagination,
  PasswordToggleField,
  Popover,
  Progress,
  RadioGroup,
  Resizable,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  Skeleton,
  Slider,
  Spinner,
  Stepper,
  Switch,
  Tabs,
  TagsInput,
  Textarea,
  TimePicker,
  Toast,
  toast,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip,
  Tree,
  Chart,
  Typography,
  Stat,
  StatGroup,
  Popconfirm,
} from '@aura-ui/styled';
import {
  DataTable,
  type DataTableBulkAction,
  type DataTableColumnDef,
  type DataTableConditionalRule,
  type DataTableFilterGroup,
  type DataTableRowActionItem,
  type DataTableSlots,
  type DataTablePivotConfig,
  type DataTableSavedView,
  type DataTableCellSelection,
} from '@aura-ui/data-table';

export interface UsageExample {
  title: string;
  description?: string;
  preview: () => React.ReactNode;
  code: string;
}

type ProjectRow = {
  id: number;
  project: string;
  owner: string;
  status: 'Healthy' | 'Review' | 'Blocked' | 'Queued';
  budget: string;
  revenue: number;
  cost: number;
  progress: number;
};

const people = [
  { id: 'ada', name: 'Ada Lovelace', role: 'Admin', email: 'ada@aura.dev', initials: 'AL' },
  { id: 'grace', name: 'Grace Hopper', role: 'Engineer', email: 'grace@aura.dev', initials: 'GH' },
  {
    id: 'margaret',
    name: 'Margaret Hamilton',
    role: 'Reviewer',
    email: 'margaret@aura.dev',
    initials: 'MH',
  },
  { id: 'alan', name: 'Alan Turing', role: 'Research', email: 'alan@aura.dev', initials: 'AT' },
  {
    id: 'katherine',
    name: 'Katherine Johnson',
    role: 'Analyst',
    email: 'katherine@aura.dev',
    initials: 'KJ',
  },
  { id: 'radia', name: 'Radia Perlman', role: 'Network', email: 'radia@aura.dev', initials: 'RP' },
];

const projectRows: ProjectRow[] = Array.from({ length: 24 }, (_, index) => {
  const statuses: ProjectRow['status'][] = ['Healthy', 'Review', 'Blocked', 'Queued'];
  const owners = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Alan Turing'];
  return {
    id: index + 1,
    project: `Workspace ${index + 1}`,
    owner: owners[index % owners.length] ?? 'Ada Lovelace',
    status: statuses[index % statuses.length] ?? 'Queued',
    budget: `$${(12 + index * 3).toLocaleString()}k`,
    revenue: 1500 + index * 120,
    cost: 700 + index * 75,
    progress: 35 + ((index * 7) % 60),
  };
});

const largeProjectRows: ProjectRow[] = Array.from({ length: 1200 }, (_, index) => {
  const base = projectRows[index % projectRows.length] ?? projectRows[0]!;
  return {
    ...base,
    id: index + 1,
    project: `Workspace ${index + 1}`,
    revenue: 1500 + index * 33,
    cost: 700 + index * 19,
    progress: 20 + ((index * 11) % 80),
  };
});

const projectColumns: DataTableColumnDef<ProjectRow>[] = [
  { field: 'project', headerName: 'Project', size: 180 },
  { field: 'owner', headerName: 'Owner', size: 180 },
  { field: 'status', headerName: 'Status', size: 120 },
  { field: 'budget', headerName: 'Budget', size: 110 },
  { field: 'revenue', headerName: 'Revenue', type: 'number', size: 120 },
  { field: 'cost', headerName: 'Cost', type: 'number', size: 110 },
  { field: 'progress', headerName: 'Progress', type: 'number', size: 110 },
];

const projectMetricColumns: DataTableColumnDef<ProjectRow>[] = Array.from(
  { length: 18 },
  (_, index) => ({
    id: `metric-${index + 1}`,
    headerName: `M${index + 1}`,
    type: 'number' as const,
    size: 90,
    accessorFn: (row: ProjectRow) => row.progress + index,
  }),
);

const projectAdvancedFilter: DataTableFilterGroup = {
  id: 'root',
  logic: 'and',
  items: [
    { id: 'status', columnId: 'status', operator: 'notEmpty' },
    {
      id: 'progress-or-owner',
      logic: 'or',
      items: [
        { id: 'progress', columnId: 'progress', operator: 'gte', value: 70 },
        { id: 'owner', columnId: 'owner', operator: 'contains', value: 'Ada' },
      ],
    },
  ],
};

function DataTableInlineExample() {
  const [rows, setRows] = React.useState(projectRows.slice(0, 10));
  return (
    <DataTable
      columns={projectColumns}
      data={rows}
      enableGlobalSearch
      inlineCreateRow={{
        fields: [
          { id: 'project', label: 'Project', placeholder: 'Workspace' },
          { id: 'owner', label: 'Owner', placeholder: 'Owner' },
        ],
        onAdd: (values) =>
          setRows((current) => [
            ...current,
            {
              id: current.length + 1,
              project: values.project || `Workspace ${current.length + 1}`,
              owner: values.owner || 'Ada Lovelace',
              status: 'Queued',
              budget: '$0k',
              revenue: 0,
              cost: 0,
              progress: 0,
            },
          ]),
      }}
      hasMore={rows.length < projectRows.length}
      loadingMore={rows.length < projectRows.length}
      onLoadMore={() =>
        setRows((current) => projectRows.slice(0, Math.min(current.length + 6, projectRows.length)))
      }
      loadingVariant="skeleton"
      localeText={{
        searchPlaceholder: 'Buscar proyectos...',
        columns: 'Columnas',
        filters: 'Filtros',
        loadingMore: 'Cargando mas...',
      }}
      height={320}
      className="w-full max-w-3xl"
    />
  );
}

/* ── DataTable new feature preview components ────────────────────────── */

type DocUser = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  revenue: number;
  score: number;
  joined: string;
  active: boolean;
};

const docUsers: DocUser[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: (['Admin', 'Editor', 'Viewer'] as const)[i % 3]!,
  revenue: 1200 + i * 80,
  score: 40 + ((i * 7) % 60),
  joined: `2026-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
  active: i % 3 !== 2,
}));

const docColumns: DataTableColumnDef<DocUser>[] = [
  { field: 'name', headerName: 'Name', size: 160 },
  { field: 'email', headerName: 'Email', size: 220 },
  { field: 'role', headerName: 'Role', size: 110 },
  { field: 'revenue', headerName: 'Revenue', type: 'number', size: 120 },
  { field: 'score', headerName: 'Score', type: 'number', size: 100 },
  { field: 'joined', headerName: 'Joined', type: 'date', size: 120 },
];

type DocCategory = { id: string; name: string; type: string; count: number; children?: DocCategory[] };
const docCategoryTree: DocCategory[] = [
  {
    id: 'eng', name: 'Engineering', type: 'Department', count: 42,
    children: [
      { id: 'fe', name: 'Frontend', type: 'Team', count: 12 },
      { id: 'be', name: 'Backend', type: 'Team', count: 18 },
      { id: 'infra', name: 'Infrastructure', type: 'Team', count: 12 },
    ],
  },
  {
    id: 'design', name: 'Design', type: 'Department', count: 14,
    children: [
      { id: 'ux', name: 'UX', type: 'Team', count: 8 },
      { id: 'brand', name: 'Brand', type: 'Team', count: 6 },
    ],
  },
  {
    id: 'growth', name: 'Growth', type: 'Department', count: 20,
    children: [
      { id: 'seo', name: 'SEO', type: 'Team', count: 7 },
      { id: 'paid', name: 'Paid', type: 'Team', count: 13 },
    ],
  },
];

function DataTableColumnDefExample() {
  return (
    <DataTable<DocUser>
      columns={[
        { field: 'name', headerName: 'Full Name', description: 'User display name', flex: 1, renderCell: ({ value }) => <strong>{String(value)}</strong> },
        { field: 'email', headerName: 'Email', size: 220, filterOperators: ['contains', 'equals'] },
        { field: 'role', headerName: 'Role', size: 110, align: 'center' },
        { field: 'revenue', headerName: 'Revenue', type: 'number', size: 130, renderCell: ({ value }) => `$${Number(value).toLocaleString()}` },
        { field: 'score', headerName: 'Score', type: 'number', size: 100, description: 'Performance score (0–100)' },
        { field: 'joined', headerName: 'Joined', type: 'date', size: 120 },
      ] satisfies DataTableColumnDef<DocUser>[]}
      data={docUsers}
      enableSorting
      enableGlobalSearch
      className="w-full max-w-4xl"
    />
  );
}

function DataTableTreeDataExample() {
  return (
    <DataTable<DocCategory>
      columns={[
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'type', headerName: 'Type', size: 120, align: 'center' },
        { field: 'count', headerName: 'Members', type: 'number', size: 110, description: 'Total headcount' },
      ]}
      data={docCategoryTree}
      treeData
      getSubRows={(row) => row.children}
      getRowId={(row) => row.id}
      className="w-full max-w-2xl"
    />
  );
}

function DataTableSlotsExample() {
  const slots: DataTableSlots<DocUser> = {
    NoRowsOverlay: () => (
      <div className="flex flex-col items-center gap-2 py-10 text-center">
        <p className="text-muted-foreground text-sm font-medium">No users yet. Create the first one.</p>
      </div>
    ),
    NoResultsOverlay: () => (
      <div className="flex flex-col items-center gap-2 py-10 text-center">
        <p className="text-muted-foreground text-sm font-medium">No users match your search or filters.</p>
      </div>
    ),
  };
  return (
    <div className="grid w-full max-w-3xl gap-4">
      <DataTable columns={docColumns} data={[]} enableGlobalSearch slots={slots} className="w-full" />
    </div>
  );
}

function DataTableConditionalFormattingExample() {
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
    <DataTable<DocUser>
      columns={[
        { field: 'name', headerName: 'Name', size: 160 },
        { field: 'role', headerName: 'Role', size: 120 },
        { field: 'score', headerName: 'Score', type: 'number', size: 100 },
        { field: 'revenue', headerName: 'Revenue', type: 'number', size: 120 },
      ]}
      data={docUsers}
      enableConditionalFormatting
      conditionalFormattingRules={rules}
      onConditionalFormattingRulesChange={setRules}
      className="w-full max-w-3xl"
    />
  );
}

function DataTableMobileCardExample() {
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        Resize the browser to below the <code>md</code> breakpoint to see the card view.
      </p>
      <DataTable
        columns={docColumns}
        data={docUsers.slice(0, 6)}
        mobileBreakpoint="md"
        className="w-full max-w-3xl"
      />
    </div>
  );
}

function DataTableLiveDataExample() {
  const [rows, setRows] = React.useState(docUsers.slice(0, 6));
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRows((prev) =>
        prev.map((r, i) => {
          if (i % 3 !== Math.floor(Math.random() * 3)) return r;
          return {
            ...r,
            score: Math.max(0, Math.min(100, r.score + Math.round((Math.random() - 0.5) * 20))),
            revenue: r.revenue + Math.round((Math.random() - 0.5) * 200),
          };
        }),
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <DataTable
      columns={docColumns}
      data={rows}
      enableLiveData
      liveDataKey="id"
      className="w-full max-w-3xl"
    />
  );
}

function DataTableAsyncDetailPanelExample() {
  return (
    <div className="grid w-full max-w-3xl gap-2">
      <p className="text-muted-foreground text-xs">
        Click ▶ to expand a row — panel loads async then caches.
      </p>
      <DataTable
        columns={docColumns}
        data={docUsers.slice(0, 6)}
        getRowId={(row) => String(row.id)}
        loadDetailPanel={async (row) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return (
            <div className="grid gap-1 p-3 text-sm">
              <strong>{row.original.name}</strong>
              <span className="text-muted-foreground">
                {row.original.email} · {row.original.role} · Score: {row.original.score}
              </span>
            </div>
          );
        }}
        detailPanelCacheSize={10}
        className="w-full"
      />
    </div>
  );
}

type PivotRow = {
  id: number; region: string; product: string; category: string;
  quarter: string; rep: string; sales: number; cost: number; units: number; margin: number;
};
const pivotData: PivotRow[] = [
  { id: 1,  region: 'North', product: 'Widget A', category: 'Hardware', quarter: 'Q1', rep: 'Alice',   sales: 12400, cost: 7200,  units: 80,  margin: 42 },
  { id: 2,  region: 'North', product: 'Widget B', category: 'Software', quarter: 'Q1', rep: 'Bob',     sales: 8800,  cost: 2900,  units: 55,  margin: 67 },
  { id: 3,  region: 'North', product: 'Widget C', category: 'Services', quarter: 'Q1', rep: 'Carol',   sales: 6100,  cost: 4200,  units: 31,  margin: 31 },
  { id: 4,  region: 'South', product: 'Widget A', category: 'Hardware', quarter: 'Q1', rep: 'Dave',    sales: 9500,  cost: 5600,  units: 63,  margin: 41 },
  { id: 5,  region: 'South', product: 'Widget B', category: 'Software', quarter: 'Q1', rep: 'Eve',     sales: 11200, cost: 3700,  units: 70,  margin: 67 },
  { id: 6,  region: 'East',  product: 'Widget A', category: 'Hardware', quarter: 'Q1', rep: 'Frank',   sales: 7800,  cost: 4500,  units: 52,  margin: 42 },
  { id: 7,  region: 'East',  product: 'Widget C', category: 'Services', quarter: 'Q1', rep: 'Grace',   sales: 5200,  cost: 3600,  units: 26,  margin: 31 },
  { id: 8,  region: 'West',  product: 'Widget B', category: 'Software', quarter: 'Q1', rep: 'Hank',    sales: 9900,  cost: 3200,  units: 62,  margin: 68 },
  { id: 9,  region: 'West',  product: 'Widget A', category: 'Hardware', quarter: 'Q1', rep: 'Ivy',     sales: 14100, cost: 8200,  units: 94,  margin: 42 },
  { id: 10, region: 'North', product: 'Widget B', category: 'Software', quarter: 'Q2', rep: 'Alice',   sales: 13000, cost: 4300,  units: 82,  margin: 67 },
  { id: 11, region: 'North', product: 'Widget A', category: 'Hardware', quarter: 'Q2', rep: 'Bob',     sales: 15500, cost: 9100,  units: 103, margin: 41 },
  { id: 12, region: 'South', product: 'Widget C', category: 'Services', quarter: 'Q2', rep: 'Carol',   sales: 7300,  cost: 5000,  units: 37,  margin: 32 },
  { id: 13, region: 'South', product: 'Widget A', category: 'Hardware', quarter: 'Q2', rep: 'Dave',    sales: 10800, cost: 6300,  units: 72,  margin: 42 },
  { id: 14, region: 'East',  product: 'Widget B', category: 'Software', quarter: 'Q2', rep: 'Eve',     sales: 6200,  cost: 2100,  units: 39,  margin: 66 },
  { id: 15, region: 'East',  product: 'Widget A', category: 'Hardware', quarter: 'Q2', rep: 'Frank',   sales: 13500, cost: 7900,  units: 90,  margin: 41 },
  { id: 16, region: 'West',  product: 'Widget C', category: 'Services', quarter: 'Q2', rep: 'Grace',   sales: 4900,  cost: 3400,  units: 25,  margin: 31 },
  { id: 17, region: 'West',  product: 'Widget B', category: 'Software', quarter: 'Q2', rep: 'Hank',    sales: 8400,  cost: 2800,  units: 53,  margin: 67 },
  { id: 18, region: 'North', product: 'Widget C', category: 'Services', quarter: 'Q3', rep: 'Ivy',     sales: 5800,  cost: 4000,  units: 29,  margin: 31 },
  { id: 19, region: 'North', product: 'Widget A', category: 'Hardware', quarter: 'Q3', rep: 'Alice',   sales: 17200, cost: 10000, units: 114, margin: 42 },
  { id: 20, region: 'South', product: 'Widget B', category: 'Software', quarter: 'Q3', rep: 'Bob',     sales: 12600, cost: 4100,  units: 79,  margin: 67 },
  { id: 21, region: 'South', product: 'Widget A', category: 'Hardware', quarter: 'Q3', rep: 'Carol',   sales: 9100,  cost: 5300,  units: 61,  margin: 42 },
  { id: 22, region: 'East',  product: 'Widget C', category: 'Services', quarter: 'Q3', rep: 'Dave',    sales: 6700,  cost: 4600,  units: 34,  margin: 31 },
  { id: 23, region: 'East',  product: 'Widget B', category: 'Software', quarter: 'Q3', rep: 'Eve',     sales: 11400, cost: 3800,  units: 72,  margin: 67 },
  { id: 24, region: 'West',  product: 'Widget A', category: 'Hardware', quarter: 'Q3', rep: 'Frank',   sales: 16100, cost: 9400,  units: 107, margin: 42 },
  { id: 25, region: 'West',  product: 'Widget C', category: 'Services', quarter: 'Q3', rep: 'Grace',   sales: 5500,  cost: 3800,  units: 28,  margin: 31 },
  { id: 26, region: 'North', product: 'Widget B', category: 'Software', quarter: 'Q4', rep: 'Hank',    sales: 14800, cost: 4900,  units: 93,  margin: 67 },
  { id: 27, region: 'South', product: 'Widget C', category: 'Services', quarter: 'Q4', rep: 'Ivy',     sales: 8200,  cost: 5700,  units: 41,  margin: 30 },
  { id: 28, region: 'East',  product: 'Widget A', category: 'Hardware', quarter: 'Q4', rep: 'Alice',   sales: 18500, cost: 10800, units: 123, margin: 42 },
  { id: 29, region: 'West',  product: 'Widget B', category: 'Software', quarter: 'Q4', rep: 'Bob',     sales: 9700,  cost: 3200,  units: 61,  margin: 67 },
  { id: 30, region: 'North', product: 'Widget A', category: 'Hardware', quarter: 'Q4', rep: 'Carol',   sales: 20100, cost: 11700, units: 134, margin: 42 },
];

function DataTablePivotExample() {
  const [pivotConfig, setPivotConfig] = React.useState<DataTablePivotConfig | undefined>(undefined);
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        30 rows across 4 regions, 3 products, 3 categories and 4 quarters.{' '}
        Click the <strong>Pivot</strong> button in the toolbar to open the configuration drawer and choose row group, pivot field, value field and aggregation.
      </p>
      <DataTable<PivotRow>
        columns={[
          { field: 'region',   headerName: 'Region',   size: 110 },
          { field: 'product',  headerName: 'Product',  size: 110 },
          { field: 'category', headerName: 'Category', size: 110 },
          { field: 'quarter',  headerName: 'Quarter',  size: 90  },
          { field: 'rep',      headerName: 'Rep',      size: 100 },
          { field: 'sales',    headerName: 'Sales',    type: 'number', size: 100 },
          { field: 'cost',     headerName: 'Cost',     type: 'number', size: 90  },
          { field: 'units',    headerName: 'Units',    type: 'number', size: 80  },
          { field: 'margin',   headerName: 'Margin %', type: 'number', size: 90  },
        ]}
        data={pivotData}
        enablePivot
        pivotConfig={pivotConfig}
        onPivotConfigChange={setPivotConfig}
        enableSorting
        enablePagination
        pageSize={15}
        className="w-full"
      />
    </div>
  );
}

function DataTableStatePersistenceExample() {
  return (
    <div className="grid w-full max-w-3xl gap-2">
      <p className="text-muted-foreground text-xs">
        Sort, filter, resize, and paginate — then refresh the page. State is restored from{' '}
        <code>localStorage</code> automatically.
      </p>
      <DataTable
        columns={docColumns}
        data={docUsers}
        stateKey="docs-users-demo"
        enableSorting
        enableGlobalSearch
        enablePagination
        enableColumnResizing
        pageSize={5}
        className="w-full"
      />
    </div>
  );
}

// ── Consolidated merged examples ──────────────────────────────────────────

function DataTableColumnManagementExample() {
  const [locked, setLocked] = React.useState<string[]>(['name']);
  return (
    <div className="grid w-full gap-3">
      <p className="text-muted-foreground text-xs">
        <strong>Resize:</strong> drag the ▕ handle at column edges. <strong>Double-click</strong> a handle to auto-fit.{' '}
        <strong>Reorder:</strong> drag column headers. <strong>Pin:</strong> open column ⋮ menu → Pin left / right.{' '}
        <strong>Lock:</strong> locked columns (currently: Name) cannot be resized, reordered, or hidden.
      </p>
      <DataTable<DocUser>
        columns={docColumns}
        data={docUsers.slice(0, 8)}
        enableSorting
        enableColumnResizing
        enableColumnAutoSize
        enableColumnReordering
        enableColumnPinning
        enableColumnConfiguration
        lockedColumns={locked}
        onLockedColumnsChange={setLocked}
        className="w-full"
      />
      <p className="text-muted-foreground mt-2 text-xs font-medium">Column groups — nested columns under a shared header:</p>
      <DataTable<DocUser>
        columns={[
          {
            headerName: 'Identity',
            columns: [
              { field: 'name', headerName: 'Name', size: 150 },
              { field: 'role', headerName: 'Role', size: 110 },
            ],
          },
          {
            headerName: 'Performance',
            columns: [
              { field: 'score', headerName: 'Score', type: 'number', size: 100 },
              { field: 'revenue', headerName: 'Revenue', type: 'number', size: 130 },
            ],
          },
          { field: 'joined', headerName: 'Joined', type: 'date', size: 120 },
        ]}
        data={docUsers.slice(0, 6)}
        enableSorting
        enableColumnResizing
        className="w-full"
      />
    </div>
  );
}

function DataTableRowManagementExample() {
  const [rows, setRows] = React.useState<DocUser[]>(docUsers.slice(0, 8));
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        <strong>Reorder rows:</strong> drag the ⠿ grip on the left. <strong>Pin rows:</strong> open the row grip menu → Pin top / bottom.{' '}
        <strong>Copy:</strong> use row ⋮ menu to copy a single row, or column ⋮ menu to copy all column values.
      </p>
      <DataTable<DocUser>
        columns={docColumns}
        data={rows}
        enableRowReordering
        enableRowPinning
        enableRowCopy
        enableColumnCopy
        onRowOrderChange={(newRows) => setRows(newRows as DocUser[])}
        className="w-full"
      />
    </div>
  );
}

function DataTableRowActionsExample() {
  const [loadingIds, setLoadingIds] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<DocUser[]>(docUsers.slice(0, 8));
  const rowActionMenu: DataTableRowActionItem<DocUser>[] = [
    { id: 'edit', label: 'Edit', onClick: () => {} },
    { id: 'sep', separator: true, label: '', onClick: () => {} },
    {
      id: 'delete',
      label: 'Delete',
      variant: 'destructive',
      onClick: (row) => setRows((prev) => prev.filter((r) => r.id !== row.original.id)),
    },
  ];
  const rowActionButtons: DataTableRowActionItem<DocUser>[] = [
    {
      id: 'save',
      label: 'Save',
      onClick: (row) => {
        const id = String(row.original.id);
        setLoadingIds((p) => [...p, id]);
        setTimeout(() => setLoadingIds((p) => p.filter((x) => x !== id)), 1500);
      },
    },
  ];
  const bulkActions: DataTableBulkAction<DocUser>[] = [
    {
      id: 'delete-selected',
      label: 'Delete selected',
      variant: 'destructive',
      onClick: (selectedRows, table) => {
        const ids = new Set(selectedRows.map((r) => r.original.id));
        setRows((prev) => prev.filter((r) => !ids.has(r.id)));
        table.resetRowSelection();
      },
    },
  ];
  const [ctxMsg, setCtxMsg] = React.useState<string | null>(null);
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        <strong>⋮ menu:</strong> per-row dropdown with Edit and Delete. <strong>Save button:</strong> inline button that triggers a 1.5 s loading state on that row.{' '}
        <strong>Bulk:</strong> select rows to show the bulk-action bar.{' '}
        <strong>Right-click</strong> any row or cell for a context menu.
        {ctxMsg && <span className="ml-2 text-primary">{ctxMsg}</span>}
      </p>
      <DataTable<DocUser>
        columns={docColumns}
        data={rows}
        getRowId={(row) => String(row.id)}
        enableRowSelection
        rowActionMenu={rowActionMenu}
        rowActionButtons={rowActionButtons}
        bulkActions={bulkActions}
        loadingRowIds={loadingIds}
        onRowContextMenu={(row) => setCtxMsg(`Row context: ${row.original.name}`)}
        onCellContextMenu={(cell, row) => setCtxMsg(`Cell context: ${cell.column.id} = ${String(cell.getValue())} (${row.original.name})`)}
        className="w-full"
      />
    </div>
  );
}

function DataTableToolbarFeaturesExample() {
  const [density, setDensity] = React.useState<'compact' | 'standard' | 'comfortable'>('standard');
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        Density toggle · Export dropdown (CSV / JSON / XLSX) · Fullscreen · Print · Refresh — all in the toolbar. Status bar is pinned below.
      </p>
      <DataTable<DocUser>
        columns={docColumns}
        data={docUsers}
        enableSorting
        enableRowSelection
        enableDensityToggle
        density={density}
        onDensityChange={setDensity}
        enableExport
        enableFullscreen
        enableStatusBar
        onRefresh={() => {}}
        onPrint={() => {}}
        className="w-full"
      />
    </div>
  );
}

function DataTableRowAppearanceExample() {
  return (
    <DataTable<DocUser>
      columns={docColumns}
      data={docUsers.slice(0, 10)}
      striped
      enableRowNumbers
      enableCellTooltip
      getRowStatus={(row) => {
        if (row.original.role === 'Admin' && row.original.active) return 'success';
        if (!row.original.active) return 'error';
        if (row.original.role === 'Editor') return 'warning';
        return undefined;
      }}
      rowHeight={(_row, i) => (i % 2 === 0 ? 36 : 52)}
      getCellClassName={(cell) => {
        if (cell.column.id === 'score') {
          const v = Number(cell.getValue());
          if (v >= 80) return 'text-green-600 font-semibold';
          if (v < 50) return 'text-red-500';
        }
        return undefined;
      }}
      className="w-full max-w-3xl"
    />
  );
}

function DataTableSortingFilteringExample() {
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        <strong>Multi-sort:</strong> hold Shift and click column headers — numbered badges show sort priority.{' '}
        <strong>Quick filters:</strong> type in the input below each header.{' '}
        <strong>Filter chips:</strong> active filters appear as removable chips.
      </p>
      <DataTable<DocUser>
        columns={docColumns}
        data={docUsers}
        enableSorting
        enableFiltering
        enableFilterChips
        quickFilterColumns={['name', 'role']}
        className="w-full max-w-3xl"
      />
    </div>
  );
}

function DataTablePaginationStatusExample() {
  return (
    <DataTable<DocUser>
      columns={docColumns}
      data={docUsers}
      enableSorting
      enableRowSelection
      enablePagination
      pageSize={5}
      pageSizeOptions={[5, 10, 25]}
      showTotalRows
      enableStatusBar
      className="w-full max-w-3xl"
    />
  );
}

function DataTableInlineEditingAllExample() {
  const [rows, setRows] = React.useState<DocUser[]>(docUsers.slice(0, 8).map((r) => ({ ...r })));
  const [dirtyRows, setDirtyRows] = React.useState<Set<string>>(new Set());
  const editableColumns = [
    {
      field: 'name',
      headerName: 'Name',
      size: 160,
      editable: true,
      valueSetter: (row: DocUser, value: unknown) => {
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, name: String(value) } : r)));
      },
    },
    {
      field: 'score',
      headerName: 'Score',
      type: 'number' as const,
      size: 100,
      editable: true,
      displayValidate: (value: unknown) => {
        const n = Number(value);
        if (isNaN(n) || n < 0 || n > 100) return 'Score must be 0–100';
        return undefined;
      },
      valueSetter: (row: DocUser, value: unknown) => {
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, score: Number(value) } : r)));
      },
    },
    { field: 'role', headerName: 'Role', size: 110 },
    { field: 'revenue', headerName: 'Revenue', type: 'number' as const, size: 130 },
  ];
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        <strong>Double-click</strong> Name or Score to edit inline. <strong>Ctrl+Z / Ctrl+Y</strong> to undo/redo.{' '}
        Score must be 0–100 (red outline + tooltip on invalid). Dirty rows are tracked.{' '}
        {dirtyRows.size > 0 && <span className="text-orange-500">{dirtyRows.size} unsaved row(s).</span>}
      </p>
      <DataTable<DocUser>
        columns={editableColumns}
        data={rows}
        getRowId={(row) => String(row.id)}
        editMode="dblclick"
        enableUndoRedo
        enableValidation
        enablePaste
        dirtyRows={dirtyRows}
        onDirtyRowsChange={setDirtyRows}
        className="w-full max-w-3xl"
      />
    </div>
  );
}

function DataTableClipboardSelectionExample() {
  const [selection, setSelection] = React.useState<DataTableCellSelection | null>(null);
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        <strong>Ctrl+C</strong> copies selected rows as TSV (paste into Excel / Sheets).{' '}
        <strong>Click-drag</strong> or <strong>Shift+click</strong> to select a cell range.
        {selection && (
          <span className="ml-2 font-mono">
            Selected: rows {selection.startRowIndex}–{selection.endRowIndex}, cols {selection.startColIndex}–{selection.endColIndex}
          </span>
        )}
      </p>
      <DataTable<DocUser>
        columns={docColumns}
        data={docUsers.slice(0, 8)}
        enableRowSelection
        enableCopyPaste
        enableCellSelection
        onCellSelectionChange={setSelection}
        className="w-full max-w-3xl"
      />
    </div>
  );
}

type CellRendererRow = { id: number; status: string; revenue: number; score: number; rating: number; joined: Date; name: string };
const _crNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi'];
const _crStatuses = ['success', 'warning', 'error', 'info', 'success', 'warning', 'error', 'info'];
const cellRendererRows: CellRendererRow[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: _crNames[i] ?? `User ${i + 1}`,
  status: _crStatuses[i] ?? 'info',
  revenue: 1200 + i * 340,
  score: 20 + i * 10,
  rating: (i % 5) + 1,
  joined: new Date(2022, i % 12, (i * 3) + 1),
}));

function DataTableCellRenderersExample() {
  return (
    <DataTable<CellRendererRow>
      columns={[
        { field: 'name', headerName: 'Name', size: 110 },
        {
          field: 'status',
          headerName: 'Status',
          type: 'badge',
          size: 100,
          badgeMap: {
            success: { label: 'Active', color: '#dcfce7', textColor: '#166534' },
            warning: { label: 'Paused', color: '#fef9c3', textColor: '#854d0e' },
            error: { label: 'Blocked', color: '#fee2e2', textColor: '#991b1b' },
            info: { label: 'Invited', color: '#dbeafe', textColor: '#1e40af' },
          },
        },
        { field: 'revenue', headerName: 'Revenue', type: 'currency', currencyCode: 'USD', size: 120 },
        { field: 'score', headerName: 'Score', type: 'progress', progressMax: 100, size: 130 },
        { field: 'rating', headerName: 'Rating', type: 'rating', ratingMax: 5, size: 120 },
        {
          field: 'joined',
          headerName: 'Joined',
          type: 'date',
          size: 130,
          dateFormat: { dateStyle: 'long' },
          locale: 'en-US',
        },
      ]}
      data={cellRendererRows}
      className="w-full max-w-3xl"
    />
  );
}

function DataTableAnalyticsFeaturesExample() {
  const [savedViews, setSavedViews] = React.useState<DataTableSavedView[]>([
    {
      id: 'high-scores',
      name: 'High scores',
      createdAt: new Date().toISOString(),
      state: { sorting: [{ id: 'score', desc: true }] },
    },
  ]);
  return (
    <div className="grid w-full gap-2">
      <p className="text-muted-foreground text-xs">
        <strong>Tool panel:</strong> open the ▶ button on the right to access Columns, Filters, and Stats tabs.{' '}
        <strong>Saved views:</strong> toolbar button to save and restore named table states.{' '}
        <strong>Header stats:</strong> sum/avg/count row pinned below column headers.
      </p>
      <DataTable<DocUser>
        columns={docColumns}
        data={docUsers}
        enableSorting
        enableFiltering
        enableRowSelection
        enableToolPanel
        enableHeaderStats
        headerStatsConfig={{ score: 'avg', revenue: 'sum', name: 'count' }}
        enableSavedViews
        savedViews={savedViews}
        onSavedViewsChange={setSavedViews}
        className="w-full"
      />
    </div>
  );
}

const productOptions = [
  'Analytics dashboard',
  'Billing portal',
  'Command center',
  'Customer console',
  'Design system',
  'Documentation',
  'Feature flags',
  'Incident room',
  'Release board',
  'Usage reports',
].map((label) => ({
  value: label.toLowerCase().replaceAll(' ', '-'),
  label,
}));

const largeOptions = Array.from({ length: 1000 }, (_, index) => ({
  value: `workspace-${index + 1}`,
  label: `Workspace ${index + 1}`,
  textValue: `Workspace ${index + 1}`,
  disabled: index % 97 === 0,
}));

const files = [
  { id: 'src', label: 'src', children: ['app.tsx', 'index.ts', 'theme.ts'] },
  { id: 'docs', label: 'docs', children: ['components.mdx', 'migration.mdx'] },
  { id: 'tests', label: 'tests', children: ['visual.spec.ts', 'a11y.spec.ts'] },
];

function ExampleShell({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-border bg-card grid w-full max-w-xl gap-3 rounded-lg border p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-muted-foreground text-xs">Realistic app composition</div>
        </div>
        <Badge variant="secondary">Example</Badge>
      </div>
      {children}
    </div>
  );
}

function ToastVariantsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => toast.success('Release promoted', { description: 'Production traffic is now serving v2.8.0.' })}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.error('Deploy failed', { description: 'Check the error logs for details.' })}>
        Error
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.warning('Usage approaching limit', { description: 'Upgrade before the next billing cycle.' })}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.info('Update available', { description: 'Refresh to get the latest features.' })}>
        Info
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.loading('Syncing…', { duration: 3000 })}>
        Loading
      </Button>
    </div>
  );
}

function MentionsPeopleExample() {
  return (
    <Mentions.Root
      className="w-full max-w-md"
      defaultValue="Please review this with @ada and @grace before release."
    >
      <Mentions.Textarea placeholder="Write an update..." rows={4} />
      <Mentions.Suggestions items={people.map((person) => ({ id: person.id, label: person.name }))}>
        <div className="border-border bg-popover rounded-md border p-1 shadow-md">
          <Mentions.Items>
            {(item, index) => (
              <Mentions.Item key={item.id} suggestion={item} index={index}>
                <div className="hover:bg-accent rounded px-2 py-1 text-sm">@{item.label}</div>
              </Mentions.Item>
            )}
          </Mentions.Items>
        </div>
      </Mentions.Suggestions>
    </Mentions.Root>
  );
}

/* ── Chart example data ─────────────────────────────────────────────── */

const chartMonthlyData = [
  { month: 'Jan', revenue: 4200, cost: 2800, profit: 1400 },
  { month: 'Feb', revenue: 5800, cost: 3100, profit: 2700 },
  { month: 'Mar', revenue: 3900, cost: 2600, profit: 1300 },
  { month: 'Apr', revenue: 7100, cost: 4200, profit: 2900 },
  { month: 'May', revenue: 6400, cost: 3800, profit: 2600 },
  { month: 'Jun', revenue: 8300, cost: 4900, profit: 3400 },
];

const chartMultiLineData = [
  { month: 'Jan', alice: 82, bob: 60, carol: 70 },
  { month: 'Feb', alice: 75, bob: 68, carol: 78 },
  { month: 'Mar', alice: 88, bob: 72, carol: 65 },
  { month: 'Apr', alice: 91, bob: 80, carol: 84 },
  { month: 'May', alice: 79, bob: 75, carol: 90 },
  { month: 'Jun', alice: 95, bob: 88, carol: 83 },
];

const chartPieData = [
  { category: 'Direct',   value: 3200 },
  { category: 'Organic',  value: 2100 },
  { category: 'Referral', value: 1400 },
  { category: 'Social',   value: 980 },
  { category: 'Email',    value: 620 },
];

const chartScatterData = [
  { x: 10, y: 20 }, { x: 25, y: 40 }, { x: 18, y: 15 }, { x: 35, y: 55 },
  { x: 42, y: 30 }, { x: 50, y: 65 }, { x: 28, y: 48 }, { x: 15, y: 35 },
  { x: 60, y: 72 }, { x: 45, y: 58 }, { x: 32, y: 25 }, { x: 55, y: 80 },
];

const chartRadarData = [
  { subject: 'Speed',     alice: 80, bob: 60 },
  { subject: 'Strength',  alice: 60, bob: 90 },
  { subject: 'Endurance', alice: 70, bob: 75 },
  { subject: 'Agility',   alice: 85, bob: 55 },
  { subject: 'Skill',     alice: 90, bob: 70 },
];

const chartHeatData: Array<{ day: string; hour: string; count: number }> = (() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'];
  const rows: Array<{ day: string; hour: string; count: number }> = [];
  days.forEach((day, di) => {
    hours.forEach((hour, hi) => {
      rows.push({ day, hour, count: Math.round(5 + Math.abs(Math.sin(di * 3 + hi) * 45)) });
    });
  });
  return rows;
})();

const chartTreemapData = [
  {
    name: 'Equities',
    value: 4200,
    children: [
      { name: 'Tech', value: 1800 },
      { name: 'Health', value: 1100 },
      { name: 'Finance', value: 1300 },
    ],
  },
  {
    name: 'Fixed Income',
    value: 2800,
    children: [
      { name: 'Govt', value: 1600 },
      { name: 'Corp', value: 1200 },
    ],
  },
  { name: 'Real Estate', value: 1400 },
  { name: 'Commodities', value: 800 },
  { name: 'Cash', value: 400 },
];

const chartFunnelData = [
  { name: 'Visitors',  value: 10000 },
  { name: 'Leads',     value: 6500 },
  { name: 'Prospects', value: 3800 },
  { name: 'Customers', value: 1200 },
];

const chartCandlestickData = [
  { date: 'Mon', open: 100, high: 115, low: 95,  close: 112 },
  { date: 'Tue', open: 112, high: 120, low: 108, close: 106 },
  { date: 'Wed', open: 106, high: 118, low: 100, close: 115 },
  { date: 'Thu', open: 115, high: 122, low: 110, close: 118 },
  { date: 'Fri', open: 118, high: 125, low: 113, close: 121 },
  { date: 'Mon', open: 121, high: 128, low: 115, close: 117 },
  { date: 'Tue', open: 117, high: 122, low: 110, close: 111 },
  { date: 'Wed', open: 111, high: 119, low: 108, close: 116 },
];

const chartSparkLineData = [12, 45, 28, 60, 35, 72, 48, 55, 40, 68];

const chartRangeBarData = [
  { month: 'Jan', low: 10, high: 30 },
  { month: 'Feb', low: 15, high: 45 },
  { month: 'Mar', low: 8,  high: 35 },
  { month: 'Apr', low: 20, high: 55 },
  { month: 'May', low: 18, high: 50 },
  { month: 'Jun', low: 25, high: 65 },
];

const chartRadialBarData = [
  { name: 'Task A', completion: 85 },
  { name: 'Task B', completion: 62 },
  { name: 'Task C', completion: 41 },
  { name: 'Task D', completion: 78 },
];

const chartWaterfallData = [
  { name: 'Q1 Start',  value: 120 },
  { name: 'Sales',     value: 45  },
  { name: 'Returns',   value: -18 },
  { name: 'Marketing', value: -25 },
  { name: 'Savings',   value: 15  },
  { name: 'Q2 End',    value: 0   },
];

const chartSankeyNodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }];

const chartSankeyLinks = [
  { source: 'A', target: 'B', value: 30 },
  { source: 'A', target: 'C', value: 20 },
  { source: 'B', target: 'D', value: 25 },
  { source: 'C', target: 'D', value: 15 },
  { source: 'B', target: 'E', value: 5  },
  { source: 'C', target: 'E', value: 5  },
];

const chartPyramidData = [
  { name: 'Awareness', value: 10000 },
  { name: 'Interest',  value: 6500  },
  { name: 'Decision',  value: 3200  },
  { name: 'Action',    value: 1800  },
];

const chartGanttTasks = [
  { id: '1', name: 'Design',      start: 0,  end: 5  },
  { id: '2', name: 'Development', start: 3,  end: 12 },
  { id: '3', name: 'Testing',     start: 10, end: 15 },
  { id: '4', name: 'Launch',      start: 14, end: 16 },
];

const chartHistogramData = [
  14, 22, 8, 45, 31, 67, 52, 19, 73, 38, 61, 27, 84, 43, 16,
  55, 29, 71, 48, 63, 36, 90, 24, 57, 82, 41, 68, 13, 77, 34,
  60, 49, 23, 86, 39, 54, 18, 72, 46, 65,
];

const chartBoxplotData = [
  { name: 'Q1 Sales', min: 12, q1: 28, median: 42, q3: 58, max: 74 },
  { name: 'Q2 Sales', min: 18, q1: 35, median: 50, q3: 65, max: 80 },
  { name: 'Q3 Sales', min: 25, q1: 40, median: 55, q3: 70, max: 88 },
  { name: 'Q4 Sales', min: 30, q1: 48, median: 62, q3: 78, max: 95 },
];

const chartChordMatrix = [
  [0,  12, 8,  5 ],
  [12, 0,  15, 3 ],
  [8,  15, 0,  10],
  [5,  3,  10, 0 ],
];

const chartChordLabels = ['A', 'B', 'C', 'D'];

const chartSunburstData = {
  name: 'Root',
  children: [
    {
      name: 'Tech',
      children: [
        { name: 'Frontend', value: 800 },
        { name: 'Backend',  value: 1200 },
        { name: 'DevOps',   value: 600 },
      ],
    },
    {
      name: 'Sales',
      children: [
        { name: 'Direct',   value: 1500 },
        { name: 'Partners', value: 900 },
      ],
    },
    {
      name: 'Marketing',
      children: [
        { name: 'Digital', value: 700 },
        { name: 'Events',  value: 400 },
      ],
    },
  ],
};

const chartRadialLineData = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 35 },
  { month: 'Apr', value: 71 },
  { month: 'May', value: 64 },
  { month: 'Jun', value: 83 },
  { month: 'Jul', value: 91 },
  { month: 'Aug', value: 76 },
  { month: 'Sep', value: 55 },
  { month: 'Oct', value: 68 },
  { month: 'Nov', value: 49 },
  { month: 'Dec', value: 60 },
];

const chartRangeAreaData = [
  { month: 'Jan', low: 2,  high: 8  },
  { month: 'Feb', low: 4,  high: 11 },
  { month: 'Mar', low: 8,  high: 16 },
  { month: 'Apr', low: 12, high: 21 },
  { month: 'May', low: 16, high: 26 },
  { month: 'Jun', low: 20, high: 30 },
  { month: 'Jul', low: 22, high: 32 },
  { month: 'Aug', low: 21, high: 31 },
  { month: 'Sep', low: 17, high: 26 },
  { month: 'Oct', low: 12, high: 20 },
  { month: 'Nov', low: 7,  high: 13 },
  { month: 'Dec', low: 3,  high: 9  },
];

const chartAreaFillData = [
  { month: 'Jan', delta: 12  },
  { month: 'Feb', delta: -5  },
  { month: 'Mar', delta: 18  },
  { month: 'Apr', delta: -12 },
  { month: 'May', delta: 25  },
  { month: 'Jun', delta: -8  },
  { month: 'Jul', delta: 30  },
  { month: 'Aug', delta: -3  },
];

/* ── Chart example components ───────────────────────────────────────── */

function ChartBarExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartMonthlyData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Bar dataKey="revenue" name="Revenue" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartMultiSeriesExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartMonthlyData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Bar dataKey="revenue" name="Revenue" />
        <Chart.Bar dataKey="cost" name="Cost" />
        <Chart.Line dataKey="profit" name="Profit" curve="catmullRom" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartAreaExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartMonthlyData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Area dataKey="revenue" name="Revenue" fillOpacity={0.25} stackId="a" />
        <Chart.Area dataKey="cost" name="Cost" fillOpacity={0.2} stackId="a" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartLineExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartMultiLineData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Line dataKey="alice" name="Alice" curve="catmullRom" />
        <Chart.Line dataKey="bob" name="Bob" curve="catmullRom" color="hsl(var(--chart-2))" />
        <Chart.Line dataKey="carol" name="Carol" curve="catmullRom" color="hsl(var(--chart-3))" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartPieExample() {
  return (
    <div className="flex justify-center">
      <Chart.PieRoot data={chartPieData} width={360} height={360}>
        <Chart.Pie dataKey="value" nameKey="category" innerRadius={80} padAngle={0.02} cornerRadius={4} />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.PieRoot>
    </div>
  );
}

function ChartScatterExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartScatterData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="x" />
        <Chart.YAxis />
        <Chart.Scatter xKey="x" yKey="y" name="Products" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartRadarExample() {
  return (
    <div className="flex justify-center">
      <Chart.RadarRoot data={chartRadarData} width={360} height={360}>
        <Chart.PolarGrid />
        <Chart.PolarAngleAxis dataKey="subject" />
        <Chart.Radar dataKey="alice" name="Alice" fillOpacity={0.25} />
        <Chart.Radar dataKey="bob" name="Bob" color="hsl(var(--chart-2))" fillOpacity={0.2} />
        <Chart.Legend />
      </Chart.RadarRoot>
    </div>
  );
}

function ChartHeatmapExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Heatmap
        data={chartHeatData}
        xKey="day"
        yKey="hour"
        valueKey="count"
        width={500}
        height={280}
      />
    </div>
  );
}

function ChartTreemapExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Treemap data={chartTreemapData} width={500} height={350} />
    </div>
  );
}

function ChartFunnelExample() {
  return (
    <div className="flex justify-center">
      <Chart.Funnel data={chartFunnelData} width={400} height={300} />
    </div>
  );
}

function ChartGaugeExample() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      <Chart.Gauge value={72}  min={0} max={100} width={200} height={150} label="CPU Load" />
      <Chart.Gauge value={45}  min={0} max={100} width={200} height={150} label="Memory" />
      <Chart.Gauge value={88}  min={0} max={100} width={200} height={150} label="Disk I/O" />
    </div>
  );
}

function ChartCandlestickExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Candlestick
        data={chartCandlestickData}
        width={600}
        height={300}
        bullColor="hsl(var(--chart-2))"
        bearColor="hsl(var(--chart-5))"
      />
    </div>
  );
}

function ChartSparkLineExample() {
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm font-medium">Line</span>
        <Chart.SparkLine data={chartSparkLineData} type="line" width={120} height={36} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm font-medium">Bar</span>
        <Chart.SparkLine
          data={chartSparkLineData}
          type="bar"
          width={120}
          height={36}
          color="hsl(var(--chart-2))"
        />
      </div>
    </div>
  );
}

function ChartRangeBarExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartRangeBarData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.RangeBar lowKey="low" highKey="high" name="Temp range (°C)" color="hsl(var(--chart-1))" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartReferenceLineExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartMonthlyData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Bar dataKey="revenue" name="Revenue" />
        <Chart.ReferenceLine y={6000} label="Target" stroke="hsl(var(--chart-3))" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartReferenceAreaExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartMonthlyData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Bar dataKey="revenue" name="Revenue" />
        <Chart.ReferenceArea y1={5000} y2={7000} fill="#22c55e" fillOpacity={0.1} />
        <Chart.ReferenceLine y={5000} label="Min" stroke="#22c55e" strokeDasharray="4 2" />
        <Chart.ReferenceLine y={7000} label="Max" stroke="#22c55e" strokeDasharray="4 2" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartRadialBarExample() {
  return (
    <div className="flex justify-center">
      <Chart.RadialBarRoot data={chartRadialBarData} width={360} height={360}>
        <Chart.RadialBar dataKey="completion" nameKey="name" />
      </Chart.RadialBarRoot>
    </div>
  );
}

function ChartWaterfallExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Waterfall data={chartWaterfallData} width={520} height={300} />
    </div>
  );
}

function ChartSankeyExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Sankey nodes={chartSankeyNodes} links={chartSankeyLinks} width={520} height={300} />
    </div>
  );
}

function ChartPyramidExample() {
  return (
    <div className="flex justify-center">
      <Chart.Pyramid data={chartPyramidData} width={400} height={300} />
    </div>
  );
}

function ChartGanttExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Gantt tasks={chartGanttTasks} width={600} height={220} />
    </div>
  );
}

function ChartHistogramExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Histogram data={chartHistogramData} bins={8} width={520} height={300} showGrid />
    </div>
  );
}

function ChartBoxplotExample() {
  return (
    <div className="overflow-x-auto">
      <Chart.Boxplot data={chartBoxplotData} width={520} height={300} />
    </div>
  );
}

function ChartChordExample() {
  return (
    <div className="flex justify-center">
      <Chart.Chord
        data={chartChordMatrix}
        labels={chartChordLabels}
        width={380}
        height={380}
      />
    </div>
  );
}

function ChartSunburstExample() {
  return (
    <div className="flex justify-center">
      <Chart.Sunburst data={chartSunburstData} width={380} height={380} />
    </div>
  );
}

function ChartLinearGaugeExample() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Chart.LinearGauge
        value={25}
        showLabel
        colorStops={[[33, '#ef4444'], [66, '#f59e0b'], [100, '#22c55e']]}
        label="Low (25%)"
      />
      <Chart.LinearGauge
        value={55}
        showLabel
        colorStops={[[33, '#ef4444'], [66, '#f59e0b'], [100, '#22c55e']]}
        label="Mid (55%)"
      />
      <Chart.LinearGauge
        value={85}
        showLabel
        colorStops={[[33, '#ef4444'], [66, '#f59e0b'], [100, '#22c55e']]}
        label="High (85%)"
      />
    </div>
  );
}

function ChartRadialLineExample() {
  return (
    <div className="flex justify-center">
      <Chart.RadialLineRoot data={chartRadialLineData} width={340} height={340}>
        <Chart.RadialLine dataKey="value" nameKey="month" closePath area fillOpacity={0.25} />
      </Chart.RadialLineRoot>
    </div>
  );
}

function ChartRangeAreaExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartRangeAreaData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.RangeArea lowKey="low" highKey="high" name="Temperature (°C)" color="hsl(var(--chart-1))" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartGaugeCompositionExample() {
  return (
    <div className="flex justify-center">
      <Chart.GaugeContainer
        value={65}
        min={0}
        max={100}
        width={240}
        height={200}
        accessibilityLabel="Score: 65 of 100"
      >
        <Chart.GaugeReferenceArc />
        <Chart.GaugeValueArc color="hsl(var(--chart-1))" />
        <Chart.GaugePointer />
      </Chart.GaugeContainer>
    </div>
  );
}

function ChartSemiCirclePieExample() {
  return (
    <div className="flex justify-center">
      <Chart.PieRoot data={chartPieData} width={360} height={220}>
        <Chart.Pie
          dataKey="value"
          nameKey="category"
          startAngle={-90}
          endAngle={90}
        />
        <Chart.Tooltip />
      </Chart.PieRoot>
    </div>
  );
}

function ChartPieArcLabelExample() {
  return (
    <div className="flex justify-center">
      <Chart.PieRoot data={chartPieData} width={360} height={360}>
        <Chart.Pie
          dataKey="value"
          nameKey="category"
          arcLabel="percentage"
          arcLabelMinAngle={10}
        />
        <Chart.Tooltip />
      </Chart.PieRoot>
    </div>
  );
}

function ChartPieCenterLabelExample() {
  return (
    <div className="flex justify-center">
      <Chart.PieRoot data={chartPieData} width={360} height={360}>
        <Chart.Pie
          dataKey="value"
          nameKey="category"
          innerRadius={80}
          padAngle={0.02}
          cornerRadius={4}
        />
        <Chart.PieCenterLabel>
          <div className="text-center">
            <div className="text-2xl font-bold">8,300</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </Chart.PieCenterLabel>
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.PieRoot>
    </div>
  );
}

function ChartBarWithLabelsExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartMonthlyData} height={340}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Bar dataKey="revenue" name="Revenue" showLabel labelPosition="outside" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    </div>
  );
}

function ChartAreaFillByValueExample() {
  return (
    <div className="w-full max-w-2xl">
      <Chart.Root data={chartAreaFillData} height={300}>
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Area dataKey="delta" name="Delta" fillByValue fillOpacity={0.4} />
        <Chart.Tooltip />
      </Chart.Root>
    </div>
  );
}

function ChartFunnelVariantsExample() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      <div>
        <p className="mb-2 text-center text-sm font-medium">Outlined</p>
        <Chart.Funnel data={chartFunnelData} width={280} height={240} variant="outlined" />
      </div>
      <div>
        <p className="mb-2 text-center text-sm font-medium">Bump curve</p>
        <Chart.Funnel data={chartFunnelData} width={280} height={240} curve="bump" />
      </div>
    </div>
  );
}

export const componentUsageGroups = [
  {
    title: 'Atoms',
    slugs: [
      'button',
      'avatar',
      'badge',
      'card',
      'alert',
      'progress',
      'skeleton',
      'spinner',
      'separator',
      'aspect-ratio',
      'circular-progress',
      'meter',
      'copy-button',
    ],
  },
  {
    title: 'Form Controls',
    slugs: [
      'input',
      'textarea',
      'label',
      'switch',
      'checkbox',
      'radio-group',
      'toggle',
      'toggle-group',
      'slider',
      'form',
      'one-time-password-field',
      'password-toggle-field',
      'number-field',
      'calendar',
      'date-picker',
      'date-range-picker',
      'time-picker',
      'date-time-picker',
      'color-picker',
      'file-upload',
    ],
  },
  {
    title: 'Disclosure And Navigation',
    slugs: [
      'accordion',
      'tabs',
      'collapsible',
      'breadcrumb',
      'pagination',
      'stepper',
      'navigation-menu',
      'toolbar',
    ],
  },
  {
    title: 'Overlays And Menus',
    slugs: [
      'dialog',
      'alert-dialog',
      'sheet',
      'drawer',
      'popover',
      'tooltip',
      'hover-card',
      'toast',
      'dropdown-menu',
      'context-menu',
      'menubar',
    ],
  },
  {
    title: 'Compound And Data',
    slugs: [
      'select',
      'multi-select',
      'combobox',
      'command',
      'scroll-area',
      'resizable',
      'carousel',
      'tree',
      'editable',
      'tags-input',
      'mentions',
      'data-table',
    ],
  },
] as const;

function PaginationInteractiveExample() {
  const [page, setPage] = React.useState(3);
  const [pageSize, setPageSize] = React.useState(25);
  const totalRows = 389;
  const pageCount = Math.ceil(totalRows / pageSize);
  return (
    <Pagination
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      totalRows={totalRows}
      onPageChange={setPage}
      onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
    />
  );
}

export const componentUsageExamples: Record<string, UsageExample[]> = {
  button: [
    {
      title: 'Variants and sizes',
      description:
        'Preview the common visual variants, icon affordance and disabled state together.',
      preview: () => (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button size="icon" aria-label="Open settings">
            <Settings />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      ),
      code: `<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="icon" aria-label="Open settings"><Settings /></Button>
<Button disabled>Disabled</Button>`,
    },
    {
      title: 'Color palette',
      description: 'Use the color prop with contained, outlined, and text variants for semantic intent.',
      preview: () => (
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
              <Button key={c} variant="contained" color={c} size="sm">{c}</Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
              <Button key={c} variant="outlined" color={c} size="sm">{c}</Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
              <Button key={c} variant="text" color={c} size="sm">{c}</Button>
            ))}
          </div>
        </div>
      ),
      code: `<Button variant="contained" color="primary">primary</Button>
<Button variant="outlined" color="error">error</Button>
<Button variant="text" color="success">success</Button>`,
    },
  ],
  dialog: [
    {
      title: 'Form dialog',
      description:
        'Use Dialog for edit flows that need focus trapping, labeled content and actions.',
      preview: () => (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Edit customer</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit customer</Dialog.Title>
                <Dialog.Description>Update ownership and notification details.</Dialog.Description>
              </Dialog.Header>
              <div className="grid gap-3 py-3">
                <Label htmlFor="dialog-name">Name</Label>
                <Input id="dialog-name" defaultValue="Ada Lovelace" />
                <Label htmlFor="dialog-email">Email</Label>
                <Input id="dialog-email" defaultValue="ada@aura.dev" />
              </div>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button>Save</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ),
      code: `<Dialog.Root>
  <Dialog.Trigger asChild><Button>Edit customer</Button></Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Edit customer</Dialog.Title>
      <Dialog.Description>Update ownership and notification details.</Dialog.Description>
      <Input defaultValue="Ada Lovelace" />
      <Dialog.Close asChild><Button>Save</Button></Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
    },
  ],
  'dropdown-menu': [
    {
      title: 'Rich action menu',
      description: 'Use labels, separators, checkbox items, radio items and shortcuts in one menu.',
      preview: () => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">
              Workspace
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-56">
            <DropdownMenu.Label>Workspace actions</DropdownMenu.Label>
            <DropdownMenu.Item>
              Open dashboard
              <DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>Invite members</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.CheckboxItem checked>Auto deploy</DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.RadioGroup value="prod">
              <DropdownMenu.RadioItem value="dev">Development</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="prod">Production</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ),
      code: `<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild><Button>Workspace</Button></DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Workspace actions</DropdownMenu.Label>
    <DropdownMenu.Item>Open dashboard</DropdownMenu.Item>
    <DropdownMenu.CheckboxItem checked>Auto deploy</DropdownMenu.CheckboxItem>
    <DropdownMenu.RadioGroup value="prod">
      <DropdownMenu.RadioItem value="prod">Production</DropdownMenu.RadioItem>
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>`,
    },
  ],
  popover: [
    {
      title: 'Inline settings panel',
      description: 'Popover works well for compact settings that should stay near the trigger.',
      preview: () => (
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="outline">
              <Settings className="h-4 w-4" />
              Preferences
            </Button>
          </Popover.Trigger>
          <Popover.Content className="w-72">
            <div className="grid gap-3">
              <div>
                <div className="text-sm font-medium">Notifications</div>
                <div className="text-muted-foreground text-xs">Control product updates.</div>
              </div>
              <label className="flex items-center justify-between gap-3 text-sm">
                Email summaries
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm">
                Security alerts
                <Switch defaultChecked />
              </label>
            </div>
          </Popover.Content>
        </Popover.Root>
      ),
      code: `<Popover.Root>
  <Popover.Trigger asChild><Button>Preferences</Button></Popover.Trigger>
  <Popover.Content>
    <label><Switch defaultChecked /> Email summaries</label>
    <label><Switch defaultChecked /> Security alerts</label>
  </Popover.Content>
</Popover.Root>`,
    },
  ],
  tooltip: [
    {
      title: 'Icon toolbar labels',
      description:
        'Wrap icon-only controls with Tooltip so the command has an accessible visible hint.',
      preview: () => (
        <Tooltip.Provider>
          <div className="flex gap-2">
            {[
              { label: 'Search', icon: Search },
              { label: 'Notifications', icon: Bell },
              { label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip.Root key={item.label}>
                  <Tooltip.Trigger asChild>
                    <Button size="icon" variant="outline" aria-label={item.label}>
                      <Icon />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>{item.label}</Tooltip.Content>
                </Tooltip.Root>
              );
            })}
          </div>
        </Tooltip.Provider>
      ),
      code: `<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button size="icon" aria-label="Search"><Search /></Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Search</Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>`,
    },
    {
      title: 'Semantic variants',
      description: 'Tooltip supports themed color variants for contextual hints.',
      preview: () => (
        <Tooltip.Provider>
          <div className="flex flex-wrap gap-2">
            {(['default', 'dark', 'light', 'primary', 'success', 'warning', 'error', 'info'] as const).map((v) => (
              <Tooltip.Root key={v}>
                <Tooltip.Trigger asChild>
                  <Button size="sm" variant="outline">{v}</Button>
                </Tooltip.Trigger>
                <Tooltip.Content variant={v} arrow>{v} tooltip</Tooltip.Content>
              </Tooltip.Root>
            ))}
          </div>
        </Tooltip.Provider>
      ),
      code: `<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button size="sm" variant="outline">success</Button>
    </Tooltip.Trigger>
    <Tooltip.Content variant="success" arrow>success tooltip</Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>`,
    },
  ],
  select: [
    {
      title: 'Searchable large options',
      description:
        'Use searchable with the virtualized options prop to keep large lists responsive.',
      preview: () => (
        <Select.Root searchable defaultValue="workspace-12">
          <Select.Trigger className="w-72" aria-label="Select workspace">
            <Select.Value placeholder="Select workspace" />
          </Select.Trigger>
          <Select.Content options={largeOptions} optionHeight={36} optionOverscan={8} />
        </Select.Root>
      ),
      code: `<Select.Root searchable defaultValue="workspace-12">
  <Select.Trigger>
    <Select.Value placeholder="Select workspace" />
  </Select.Trigger>
  <Select.Content options={largeOptions} optionHeight={36} optionOverscan={8} />
</Select.Root>`,
    },
    {
      title: 'Creation flow',
      description: 'Pass onCreateOption to let users create a value when search has no match.',
      preview: () => (
        <Select.Root
          searchable
          onCreateOption={() => {}}
          createOptionLabel={(value) => `Create ${value}`}
        >
          <Select.Trigger className="w-72" aria-label="Choose or create product">
            <Select.Value placeholder="Choose or create" />
          </Select.Trigger>
          <Select.Content options={productOptions} />
        </Select.Root>
      ),
      code: `<Select.Root
  searchable
  onCreateOption={handleCreate}
  createOptionLabel={(value) => \`Create \${value}\`}
>
  <Select.Trigger><Select.Value placeholder="Choose or create" /></Select.Trigger>
  <Select.Content options={options} />
</Select.Root>`,
    },
  ],
  'multi-select': [
    {
      title: 'Selected chips and overflow',
      description: 'Selected values render in the trigger and can collapse into an overflow count.',
      preview: () => (
        <MultiSelect.Root
          searchable
          defaultValue={['workspace-2', 'workspace-8', 'workspace-13', 'workspace-21']}
        >
          <MultiSelect.Trigger className="w-80" aria-label="Select workspaces">
            <MultiSelect.Value
              options={largeOptions}
              maxVisible={3}
              placeholder="Select workspaces"
            />
          </MultiSelect.Trigger>
          <MultiSelect.Content options={largeOptions} optionHeight={36} optionOverscan={8} />
        </MultiSelect.Root>
      ),
      code: `<MultiSelect.Root searchable defaultValue={['workspace-2', 'workspace-8']}>
  <MultiSelect.Trigger>
    <MultiSelect.Value options={largeOptions} maxVisible={3} />
  </MultiSelect.Trigger>
  <MultiSelect.Content options={largeOptions} />
</MultiSelect.Root>`,
    },
  ],
  switch: [
    {
      title: 'Settings list',
      description: 'Use controlled or uncontrolled switches inside dense settings panels.',
      preview: () => (
        <ExampleShell title="Release preferences">
          {[
            ['Auto-merge approved pull requests', true],
            ['Notify release managers', true],
            ['Freeze deploys on weekends', false],
          ].map(([label, checked]) => (
            <label key={String(label)} className="flex items-center justify-between gap-4 text-sm">
              <span>{label}</span>
              <Switch defaultChecked={Boolean(checked)} />
            </label>
          ))}
        </ExampleShell>
      ),
      code: `<label className="flex items-center justify-between">
  Auto-merge approved pull requests
  <Switch defaultChecked name="autoMerge" />
</label>`,
    },
    {
      title: 'Semantic colors',
      description: 'Switch accepts a color prop to match the semantic context of the toggle.',
      preview: () => (
        <div className="flex flex-wrap gap-4">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <Switch key={c} defaultChecked color={c} aria-label={c} />
          ))}
        </div>
      ),
      code: `<Switch defaultChecked color="primary" />
<Switch defaultChecked color="success" />
<Switch defaultChecked color="error" />`,
    },
  ],
  checkbox: [
    {
      title: 'Checked, unchecked and indeterminate',
      description: 'Checkbox supports standard and indeterminate states for bulk selection flows.',
      preview: () => (
        <div className="grid gap-3">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked /> Selected row
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox /> Available row
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked="indeterminate" /> Some rows selected
          </label>
          <label className="text-muted-foreground flex items-center gap-2 text-sm">
            <Checkbox disabled /> Disabled option
          </label>
        </div>
      ),
      code: `<Checkbox defaultChecked />
<Checkbox />
<Checkbox defaultChecked="indeterminate" />
<Checkbox disabled />`,
    },
    {
      title: 'Semantic colors',
      description: 'Use the color prop to visually reinforce the meaning of each checkbox option.',
      preview: () => (
        <div className="flex flex-wrap gap-4">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <Checkbox defaultChecked color={c} /> {c}
            </label>
          ))}
        </div>
      ),
      code: `<Checkbox defaultChecked color="primary" />
<Checkbox defaultChecked color="success" />
<Checkbox defaultChecked color="error" />`,
    },
  ],
  accordion: [
    {
      title: 'Multiple open panels',
      description:
        'Use type="multiple" for FAQ and settings pages where several sections can stay open.',
      preview: () => (
        <Accordion.Root
          type="multiple"
          defaultValue={['billing', 'security']}
          className="w-full max-w-md"
        >
          {[
            {
              value: 'billing',
              title: 'Billing',
              content: 'Invoices, payment methods and tax details.',
            },
            {
              value: 'security',
              title: 'Security',
              content: 'Two-factor authentication and audit logs.',
            },
            {
              value: 'members',
              title: 'Members',
              content: 'Seats, roles and invitation settings.',
            },
          ].map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger>{item.title}</Accordion.Trigger>
              <Accordion.Content className="text-muted-foreground text-sm">
                {item.content}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      ),
      code: `<Accordion.Root type="multiple" defaultValue={['billing']}>
  <Accordion.Item value="billing">
    <Accordion.Trigger>Billing</Accordion.Trigger>
    <Accordion.Content>Invoices and payment methods.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`,
    },
  ],
  tabs: [
    {
      title: 'Account settings layout',
      description: 'Tabs can organize forms and large detail panels without leaving the page.',
      preview: () => (
        <Tabs.Root defaultValue="profile" className="w-full max-w-lg">
          <Tabs.List>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="security">Security</Tabs.Trigger>
            <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile" className="grid gap-3 text-sm">
            <Input aria-label="Profile name" defaultValue="Ada Lovelace" />
            <Input aria-label="Profile email" defaultValue="ada@aura.dev" />
          </Tabs.Content>
          <Tabs.Content value="security" className="text-muted-foreground text-sm">
            Two-factor authentication is enabled.
          </Tabs.Content>
          <Tabs.Content value="billing" className="text-muted-foreground text-sm">
            Team plan renews on June 1.
          </Tabs.Content>
        </Tabs.Root>
      ),
      code: `<Tabs.Root defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="security">Security</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile"><Input defaultValue="Ada Lovelace" /></Tabs.Content>
</Tabs.Root>`,
    },
    {
      title: 'Semantic colors',
      description: 'Pass color to Tabs.Root to use a semantic accent for the active indicator.',
      preview: () => (
        <div className="grid gap-4">
          {(['primary', 'success', 'error', 'warning'] as const).map((c) => (
            <Tabs.Root key={c} defaultValue="a" color={c} className="w-full max-w-sm">
              <Tabs.List>
                <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
                <Tabs.Trigger value="b">Beta</Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          ))}
        </div>
      ),
      code: `<Tabs.Root defaultValue="a" color="success">
  <Tabs.List>
    <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
    <Tabs.Trigger value="b">Beta</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>`,
    },
  ],
  slider: [
    {
      title: 'Range and vertical sliders',
      description: 'Slider supports multiple thumbs, step intervals and orientation changes.',
      preview: () => (
        <div className="grid w-full max-w-md grid-cols-[1fr_auto] gap-6">
          <div className="grid gap-4">
            <Label>Budget range</Label>
            <Slider defaultValue={[25, 75]} min={0} max={100} step={5} minStepsBetweenThumbs={2} />
            <Label>Confidence</Label>
            <Slider defaultValue={[60]} max={100} step={10} />
          </div>
          <Slider orientation="vertical" defaultValue={[40]} className="h-36" />
        </div>
      ),
      code: `<Slider defaultValue={[25, 75]} step={5} minStepsBetweenThumbs={2} />
<Slider orientation="vertical" defaultValue={[40]} />`,
    },
    {
      title: 'Semantic colors',
      description: 'Color prop tints the slider track and thumb to match semantic intent.',
      preview: () => (
        <div className="grid w-full max-w-md gap-4">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <Slider key={c} defaultValue={[50]} color={c} aria-label={c} />
          ))}
        </div>
      ),
      code: `<Slider defaultValue={[50]} color="primary" />
<Slider defaultValue={[50]} color="success" />
<Slider defaultValue={[50]} color="error" />`,
    },
  ],
  avatar: [
    {
      title: 'Team stack with fallback',
      description: 'Show loaded images, initials fallbacks and delayed fallback states together.',
      preview: () => (
        <div className="flex items-center gap-3">
          {people.slice(0, 5).map((person, index) => (
            <Avatar.Root key={person.id} className="-ml-1 first:ml-0">
              {index % 2 === 0 ? (
                <Avatar.Image
                  src={`https://i.pravatar.cc/96?img=${index + 12}`}
                  alt={person.name}
                />
              ) : null}
              <Avatar.Fallback delayMs={index === 1 ? 300 : 0}>{person.initials}</Avatar.Fallback>
            </Avatar.Root>
          ))}
        </div>
      ),
      code: `<Avatar.Root>
  <Avatar.Image src="/ada.jpg" alt="Ada Lovelace" />
  <Avatar.Fallback delayMs={300}>AL</Avatar.Fallback>
</Avatar.Root>`,
    },
  ],
  badge: [
    {
      title: 'Status variants',
      description:
        'Badges cover neutral labels, success, warning, destructive and outline statuses.',
      preview: () => (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Healthy</Badge>
          <Badge variant="warning">Review</Badge>
          <Badge variant="destructive">Blocked</Badge>
        </div>
      ),
      code: `<Badge>Default</Badge>
<Badge variant="success">Healthy</Badge>
<Badge variant="warning">Review</Badge>
<Badge variant="destructive">Blocked</Badge>`,
    },
    {
      title: 'Color prop',
      description: 'The color prop applies semantic tints to both filled and outline shapes.',
      preview: () => (
        <div className="grid gap-2">
          <div className="flex flex-wrap gap-2">
            {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
              <Badge key={c} color={c}>{c}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
              <Badge key={c} variant="outline" color={c}>{c}</Badge>
            ))}
          </div>
        </div>
      ),
      code: `<Badge color="primary">primary</Badge>
<Badge variant="outline" color="success">success</Badge>`,
    },
  ],
  card: [
    {
      title: 'Product card',
      description:
        'Compose header, description, content and footer for a complete application card.',
      preview: () => (
        <Card.Root className="w-full max-w-sm">
          <Card.Header>
            <Card.Title>Team plan</Card.Title>
            <Card.Description>Usage this billing cycle across 32 seats.</Card.Description>
          </Card.Header>
          <Card.Content className="grid gap-3">
            <Progress value={72} aria-label="Plan usage" />
            <div className="text-muted-foreground grid grid-cols-3 gap-2 text-center text-xs">
              <span>32 seats</span>
              <span>18 projects</span>
              <span>94% SLA</span>
            </div>
          </Card.Content>
          <Card.Footer className="justify-end gap-2">
            <Button variant="outline" size="sm">
              Details
            </Button>
            <Button size="sm">Upgrade</Button>
          </Card.Footer>
        </Card.Root>
      ),
      code: `<Card.Root>
  <Card.Header>
    <Card.Title>Team plan</Card.Title>
    <Card.Description>Usage this billing cycle.</Card.Description>
  </Card.Header>
  <Card.Content><Progress value={72} /></Card.Content>
  <Card.Footer><Button>Upgrade</Button></Card.Footer>
</Card.Root>`,
    },
  ],
  alert: [
    {
      title: 'Alert variants',
      description: 'Use semantic variants for success, warning, info and destructive states.',
      preview: () => (
        <div className="grid w-full max-w-lg gap-3">
          <Alert.Root variant="success">
            <Alert.Title role="heading" aria-level={4}>
              Deployment complete
            </Alert.Title>
            <Alert.Description>Production updated without errors.</Alert.Description>
          </Alert.Root>
          <Alert.Root variant="warning">
            <Alert.Title role="heading" aria-level={4}>
              Review required
            </Alert.Title>
            <Alert.Description>Two checks need manual approval.</Alert.Description>
          </Alert.Root>
          <Alert.Root variant="destructive">
            <Alert.Title role="heading" aria-level={4}>
              Payment failed
            </Alert.Title>
            <Alert.Description>Update billing to avoid workspace suspension.</Alert.Description>
          </Alert.Root>
        </div>
      ),
      code: `<Alert.Root variant="success">
  <Alert.Title>Deployment complete</Alert.Title>
  <Alert.Description>Production updated without errors.</Alert.Description>
</Alert.Root>`,
    },
    {
      title: 'Filled alerts with color prop',
      description: 'Add filled and color props together for solid-background alert styles.',
      preview: () => (
        <div className="grid w-full max-w-lg gap-3">
          {(['primary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <Alert key={c} filled color={c} title={c} description={`This is a ${c} filled alert.`} />
          ))}
        </div>
      ),
      code: `<Alert filled color="primary" title="Primary" description="This is a primary filled alert." />
<Alert filled color="error" title="Error" description="Something went wrong." />`,
    },
  ],
  input: [
    {
      title: 'Native input states',
      description: 'Input forwards native props and styles disabled plus invalid states.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-3">
          <Input aria-label="Search customers" placeholder="Search customers" />
          <Input aria-label="Contact email" type="email" defaultValue="ada@aura.dev" />
          <Input aria-label="Invalid email" aria-invalid defaultValue="invalid-email" />
          <Input aria-label="Disabled sample" disabled placeholder="Disabled input" />
        </div>
      ),
      code: `<Input placeholder="Search customers" />
<Input type="email" defaultValue="ada@aura.dev" />
<Input aria-invalid defaultValue="invalid-email" />
<Input disabled placeholder="Disabled input" />`,
    },
  ],
  progress: [
    {
      title: 'Determinate and indeterminate',
      description:
        'Use value for known progress, or null for pending work without a measured value.',
      preview: () => (
        <div className="grid w-full max-w-md gap-4">
          <Progress value={32} aria-label="Import progress" />
          <Progress
            value={76}
            aria-label="Sync progress"
            getValueLabel={(value) => `${value}% synced`}
          />
          <Progress value={null} aria-label="Loading progress" />
        </div>
      ),
      code: `<Progress value={32} />
<Progress value={76} getValueLabel={(value) => \`\${value}% synced\`} />
<Progress value={null} />`,
    },
    {
      title: 'Semantic colors',
      description: 'Color prop applies semantic tints to the progress bar fill.',
      preview: () => (
        <div className="grid w-full max-w-md gap-3">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <Progress key={c} value={65} color={c} aria-label={c} />
          ))}
        </div>
      ),
      code: `<Progress value={65} color="primary" />
<Progress value={65} color="success" />
<Progress value={65} color="error" />`,
    },
  ],
  toast: [
    {
      title: 'Toast variants',
      description:
        'Fire success, error, warning, info and loading toasts from anywhere with the imperative API.',
      preview: () => <ToastVariantsExample />,
      code: `import { toast, Button } from '@aura-ui/styled';
// Requires <Toaster /> in your root layout

export default function Demo() {
  return (
    <div className="flex gap-2">
      <Button onClick={() => toast.success('Release promoted', { description: 'v2.8.0 is live.' })}>
        Success
      </Button>
      <Button onClick={() => toast.error('Deploy failed', { description: 'Check the logs.' })}>
        Error
      </Button>
      <Button onClick={() => toast.warning('Usage limit', { description: 'Upgrade soon.' })}>
        Warning
      </Button>
      <Button onClick={() => toast.info('Update available')}>Info</Button>
    </div>
  );
}`,
    },
    {
      title: 'Promise toast',
      description: 'Automatically transitions from loading to success or error when a promise settles.',
      preview: () => (
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: 'Report' }), 1800)),
              { loading: 'Uploading…', success: (d) => `${d.name} uploaded!`, error: 'Upload failed.' },
            )
          }
        >
          Upload (1.8s)
        </Button>
      ),
      code: `import { toast, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Button onClick={() =>
      toast.promise(uploadFile(), {
        loading: 'Uploading…',
        success: (data) => \`\${data.name} uploaded!\`,
        error: 'Upload failed.',
      })
    }>
      Upload
    </Button>
  );
}`,
    },
  ],
  skeleton: [
    {
      title: 'Page loading skeleton',
      description: 'Shape Skeleton with Tailwind utilities to match the eventual content.',
      preview: () => (
        <div className="grid w-full max-w-md gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="grid flex-1 gap-2">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-28 w-full rounded-lg" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        </div>
      ),
      code: `<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-28 w-full rounded-lg" />
<Skeleton className="h-14" />`,
    },
  ],
  spinner: [
    {
      title: 'Sizes and labels',
      description:
        'Use different sizes and labels for button, inline and page-level loading states.',
      preview: () => (
        <div className="flex items-center gap-4">
          <Spinner size="sm" label="Loading small action" />
          <Spinner label="Loading content" />
          <Spinner size="lg" label="Loading page section" />
          <Spinner size="xl" label="Loading full page" />
        </div>
      ),
      code: `<Spinner size="sm" label="Loading small action" />
<Spinner label="Loading content" />
<Spinner size="lg" label="Loading page section" />
<Spinner size="xl" label="Loading full page" />`,
    },
    {
      title: 'Semantic colors',
      description: 'Color prop applies semantic tints to the spinner for contextual loading states.',
      preview: () => (
        <div className="flex flex-wrap items-center gap-4">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <Spinner key={c} color={c} label={`${c} loading`} />
          ))}
        </div>
      ),
      code: `<Spinner color="primary" label="Loading" />
<Spinner color="success" label="Processing" />
<Spinner color="error" label="Failing" />`,
    },
  ],
  separator: [
    {
      title: 'Horizontal and vertical',
      description:
        'Use decorative separators for layout rhythm or semantic separators for regions.',
      preview: () => (
        <div className="grid gap-4 text-sm">
          <div>
            <span>Account</span>
            <Separator className="my-2" />
            <span className="text-muted-foreground">Billing and invoices</span>
          </div>
          <div className="flex h-6 items-center gap-3">
            <span>Docs</span>
            <Separator orientation="vertical" className="h-5" />
            <span>API</span>
            <Separator orientation="vertical" decorative={false} className="h-5" />
            <span>Examples</span>
          </div>
        </div>
      ),
      code: `<Separator />
<Separator orientation="vertical" className="h-5" />
<Separator orientation="vertical" decorative={false} />`,
    },
  ],
  label: [
    {
      title: 'Form labeling',
      description: 'Pair labels with controls through htmlFor or compose with asChild.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="usage-email">Email</Label>
            <Input id="usage-email" type="email" placeholder="you@example.com" />
          </div>
          <Label asChild>
            <button type="button" className="text-left underline-offset-4 hover:underline">
              Rendered as a button with label styling
            </button>
          </Label>
        </div>
      ),
      code: `<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
<Label asChild>
  <button type="button">Styled label button</button>
</Label>`,
    },
  ],
  textarea: [
    {
      title: 'Textarea states',
      description:
        'Textarea keeps native behavior while matching input focus, invalid and disabled styling.',
      preview: () => (
        <div className="grid w-full max-w-md gap-3">
          <Textarea
            aria-label="Release notes"
            rows={3}
            defaultValue="Prepare launch notes for the design systems release."
          />
          <Textarea aria-label="Invalid notes" aria-invalid rows={2} defaultValue="Too short" />
          <Textarea aria-label="Disabled notes" disabled rows={2} placeholder="Disabled notes" />
        </div>
      ),
      code: `<Textarea rows={3} defaultValue="Release notes" />
<Textarea aria-invalid rows={2} defaultValue="Too short" />
<Textarea disabled rows={2} placeholder="Disabled notes" />`,
    },
  ],
  toggle: [
    {
      title: 'Toggle variants and sizes',
      description: 'Use Toggle for formatting controls, filters and icon buttons.',
      preview: () => (
        <div className="flex flex-wrap gap-2">
          <Toggle defaultPressed>Bold</Toggle>
          <Toggle variant="outline">Outline</Toggle>
          <Toggle size="sm">Small</Toggle>
          <Toggle size="lg">Large</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      ),
      code: `<Toggle defaultPressed>Bold</Toggle>
<Toggle variant="outline">Outline</Toggle>
<Toggle size="sm">Small</Toggle>
<Toggle disabled>Disabled</Toggle>`,
    },
    {
      title: 'Semantic colors',
      description: 'Color prop sets the pressed-state background and text for semantic toggles.',
      preview: () => (
        <div className="flex flex-wrap gap-2">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <Toggle key={c} defaultPressed color={c} size="sm">{c}</Toggle>
          ))}
        </div>
      ),
      code: `<Toggle defaultPressed color="primary">primary</Toggle>
<Toggle defaultPressed color="success">success</Toggle>`,
    },
  ],
  'toggle-group': [
    {
      title: 'Single and multiple groups',
      description:
        'Use type="single" for mutually exclusive choices and type="multiple" for toolbars.',
      preview: () => (
        <div className="grid gap-4">
          <ToggleGroup.Root type="single" defaultValue="left" aria-label="Text alignment">
            <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
            <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
            <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
          </ToggleGroup.Root>
          <ToggleGroup.Root type="multiple" defaultValue={['bold', 'code']} aria-label="Formatting">
            <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
            <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
            <ToggleGroup.Item value="code">Code</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      ),
      code: `<ToggleGroup.Root type="single" defaultValue="left">
  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
</ToggleGroup.Root>
<ToggleGroup.Root type="multiple" defaultValue={['bold']}>
  <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
</ToggleGroup.Root>`,
    },
  ],
  'radio-group': [
    {
      title: 'Card radio choices',
      description: 'Use radio items inside larger labels when the option needs supporting copy.',
      preview: () => (
        <RadioGroup.Root
          defaultValue="team"
          aria-label="Choose a plan"
          className="grid w-full max-w-md gap-2"
        >
          {[
            { value: 'starter', title: 'Starter', description: 'For personal projects.' },
            { value: 'team', title: 'Team', description: 'Shared workspaces and reviews.' },
            {
              value: 'enterprise',
              title: 'Enterprise',
              description: 'Advanced controls and support.',
            },
          ].map((item) => (
            <label
              key={item.value}
              className="border-border flex items-start gap-3 rounded-md border p-3 text-sm"
            >
              <RadioGroup.Item value={item.value} className="mt-0.5" />
              <span>
                <span className="block font-medium">{item.title}</span>
                <span className="text-muted-foreground">{item.description}</span>
              </span>
            </label>
          ))}
        </RadioGroup.Root>
      ),
      code: `<RadioGroup.Root defaultValue="team">
  <label>
    <RadioGroup.Item value="team" />
    <span>Team plan</span>
  </label>
</RadioGroup.Root>`,
    },
    {
      title: 'Semantic colors',
      description: 'Color prop on RadioGroup.Item sets the checked-state indicator color.',
      preview: () => (
        <RadioGroup.Root defaultValue="primary" aria-label="Color options" className="flex flex-wrap gap-4">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <RadioGroup.Item value={c} color={c} /> {c}
            </label>
          ))}
        </RadioGroup.Root>
      ),
      code: `<RadioGroup.Root defaultValue="primary">
  <label><RadioGroup.Item value="primary" color="primary" /> primary</label>
  <label><RadioGroup.Item value="success" color="success" /> success</label>
</RadioGroup.Root>`,
    },
  ],
  form: [
    {
      title: 'Validation states',
      description: 'Form coordinates labels, controls and native ValidityState messages.',
      preview: () => (
        <Form.Root
          className="grid w-full max-w-sm gap-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Field name="email" className="grid gap-1.5">
            <Form.Label asChild>
              <Label>Email</Label>
            </Form.Label>
            <Form.Control asChild>
              <Input type="email" required placeholder="you@example.com" />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-destructive text-xs">
              Email is required.
            </Form.Message>
            <Form.Message match="typeMismatch" className="text-destructive text-xs">
              Use a valid email address.
            </Form.Message>
          </Form.Field>
          <Form.Submit asChild>
            <Button>Save profile</Button>
          </Form.Submit>
        </Form.Root>
      ),
      code: `<Form.Root onSubmit={(event) => event.preventDefault()}>
  <Form.Field name="email">
    <Form.Label asChild><Label>Email</Label></Form.Label>
    <Form.Control asChild><Input type="email" required /></Form.Control>
    <Form.Message match="valueMissing">Email is required.</Form.Message>
  </Form.Field>
  <Form.Submit asChild><Button>Save profile</Button></Form.Submit>
</Form.Root>`,
    },
  ],
  'aspect-ratio': [
    {
      title: 'Media cards',
      description:
        'AspectRatio keeps image, video and preview tiles stable across responsive widths.',
      preview: () => (
        <div className="grid w-full max-w-md gap-3">
          <AspectRatio ratio={16 / 9} className="border-border overflow-hidden rounded-lg border">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop"
              alt="Workspace desk"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <AspectRatio
            ratio={4 / 3}
            className="bg-muted grid place-items-center rounded-lg text-sm"
          >
            4:3 preview area
          </AspectRatio>
        </div>
      ),
      code: `<AspectRatio ratio={16 / 9}>
  <img src="/workspace.jpg" alt="Workspace desk" />
</AspectRatio>
<AspectRatio ratio={4 / 3}>4:3 preview area</AspectRatio>`,
    },
  ],
  'circular-progress': [
    {
      title: 'Progress states',
      description: 'Use determinate values for known work and null for indeterminate loading.',
      preview: () => (
        <div className="flex items-center gap-5">
          <CircularProgress value={null} label="Loading report" />
          <CircularProgress value={25} size={44} label="Upload progress" />
          <CircularProgress value={68} size={56} strokeWidth={6} label="Sync progress" />
          <CircularProgress value={100} size={64} label="Completed progress" />
        </div>
      ),
      code: `<CircularProgress value={null} />
<CircularProgress value={25} size={44} />
<CircularProgress value={68} size={56} strokeWidth={6} />`,
    },
    {
      title: 'Semantic colors',
      description: 'Color prop sets the fill color of the circular progress arc.',
      preview: () => (
        <div className="flex flex-wrap items-center gap-4">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <CircularProgress key={c} value={70} size={48} color={c} label={`${c} progress`} />
          ))}
        </div>
      ),
      code: `<CircularProgress value={70} color="primary" />
<CircularProgress value={70} color="success" />
<CircularProgress value={70} color="error" />`,
    },
  ],
  meter: [
    {
      title: 'Threshold examples',
      description: 'Meter communicates known ranges with low, high and optimum thresholds.',
      preview: () => (
        <div className="grid w-full max-w-md gap-4">
          <Meter value={24} low={30} high={80} optimum={60} label="Low usage" />
          <Meter value={66} low={30} high={80} optimum={60} label="Healthy usage" />
          <Meter value={92} low={30} high={80} optimum={60} label="High usage" />
        </div>
      ),
      code: `<Meter value={24} low={30} high={80} optimum={60} />
<Meter value={66} low={30} high={80} optimum={60} />
<Meter value={92} low={30} high={80} optimum={60} />`,
    },
  ],
  'copy-button': [
    {
      title: 'Copy command and tokens',
      description: 'CopyButton can be used beside code, API keys and generated theme values.',
      preview: () => (
        <div className="grid gap-3">
          <div className="border-border bg-muted/40 flex items-center gap-2 rounded-md border p-2">
            <code className="text-sm">pnpm add @aura-ui/styled</code>
            <CopyButton
              value="pnpm add @aura-ui/styled"
              size="icon-sm"
              aria-label="Copy install command"
            />
          </div>
          <CopyButton value="AURA_PUBLIC_TOKEN" variant="outline">
            Copy token
          </CopyButton>
        </div>
      ),
      code: `<CopyButton value="pnpm add @aura-ui/styled" size="icon-sm" />
<CopyButton value="AURA_PUBLIC_TOKEN" variant="outline">Copy token</CopyButton>`,
    },
  ],
  collapsible: [
    {
      title: 'Release notes disclosure',
      description:
        'Use Collapsible for compact optional content with controlled or uncontrolled state.',
      preview: () => (
        <Collapsible.Root defaultOpen className="w-full max-w-md">
          <Collapsible.Trigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Release notes
              <Plus className="h-4 w-4" />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content className="border-border text-muted-foreground mt-2 rounded-md border p-4 text-sm">
            Added searchable selects, multi-select values, and expanded component examples.
          </Collapsible.Content>
        </Collapsible.Root>
      ),
      code: `<Collapsible.Root defaultOpen>
  <Collapsible.Trigger asChild><Button>Release notes</Button></Collapsible.Trigger>
  <Collapsible.Content>Added searchable selects.</Collapsible.Content>
</Collapsible.Root>`,
    },
  ],
  breadcrumb: [
    {
      title: 'Long path with ellipsis',
      description:
        'Breadcrumb supports links, separators, current page and compact overflow markers.',
      preview: () => (
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Ellipsis />
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Select</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      ),
      code: `<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Ellipsis /></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Page>Select</Breadcrumb.Page></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>`,
    },
  ],
  pagination: [
    {
      title: 'Standard pagination bar',
      description: 'Matches the DataTable pagination: First/Prev/Next/Last buttons, page dropdown, rows-per-page selector, and total row count.',
      preview: () => (
        <PaginationInteractiveExample />
      ),
      code: `<Pagination
  page={page}
  pageCount={20}
  pageSize={pageSize}
  totalRows={389}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>`,
    },
  ],
  stepper: [
    {
      title: 'Labeled checkout flow',
      description:
        'Stepper supports active step state, titles, descriptions and vertical orientation.',
      preview: () => (
        <div className="grid gap-6">
          <Stepper.Root activeStep={1} className="w-full max-w-md">
            <Stepper.Step index={0}>
              <Stepper.Title>Plan</Stepper.Title>
            </Stepper.Step>
            <Stepper.Separator />
            <Stepper.Step index={1}>
              <Stepper.Title>Billing</Stepper.Title>
            </Stepper.Step>
            <Stepper.Separator />
            <Stepper.Step index={2}>
              <Stepper.Title>Confirm</Stepper.Title>
            </Stepper.Step>
          </Stepper.Root>
          <Stepper.Root activeStep={2} orientation="vertical" className="max-w-sm">
            <Stepper.Step index={0}>
              <Stepper.Title>Created</Stepper.Title>
              <Stepper.Description>Workspace is ready.</Stepper.Description>
            </Stepper.Step>
            <Stepper.Separator />
            <Stepper.Step index={1}>
              <Stepper.Title>Reviewed</Stepper.Title>
              <Stepper.Description>Checks passed.</Stepper.Description>
            </Stepper.Step>
          </Stepper.Root>
        </div>
      ),
      code: `<Stepper.Root activeStep={1}>
  <Stepper.Step index={0}><Stepper.Title>Plan</Stepper.Title></Stepper.Step>
  <Stepper.Separator />
  <Stepper.Step index={1}><Stepper.Title>Billing</Stepper.Title></Stepper.Step>
</Stepper.Root>`,
    },
    {
      title: 'Semantic colors',
      description: 'Color prop sets the completed and active step indicator color.',
      preview: () => (
        <div className="grid gap-4">
          {(['primary', 'success', 'error', 'warning'] as const).map((c) => (
            <Stepper.Root key={c} activeStep={1} color={c} className="w-full max-w-xs">
              <Stepper.Step index={0}><Stepper.Title>{c}</Stepper.Title></Stepper.Step>
              <Stepper.Separator />
              <Stepper.Step index={1}><Stepper.Title>Active</Stepper.Title></Stepper.Step>
              <Stepper.Separator />
              <Stepper.Step index={2}><Stepper.Title>Next</Stepper.Title></Stepper.Step>
            </Stepper.Root>
          ))}
        </div>
      ),
      code: `<Stepper.Root activeStep={1} color="success">
  <Stepper.Step index={0}><Stepper.Title>Done</Stepper.Title></Stepper.Step>
  <Stepper.Separator />
  <Stepper.Step index={1}><Stepper.Title>Active</Stepper.Title></Stepper.Step>
</Stepper.Root>`,
    },
  ],
  'alert-dialog': [
    {
      title: 'Destructive confirmation',
      description: 'AlertDialog blocks outside interaction and starts focus on the safest action.',
      preview: () => (
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button variant="destructive">Delete workspace</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Delete workspace?</AlertDialog.Title>
                <AlertDialog.Description>
                  This removes projects, tokens and deployment history permanently.
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Delete</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      ),
      code: `<AlertDialog.Root>
  <AlertDialog.Trigger asChild><Button variant="destructive">Delete workspace</Button></AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.Title>Delete workspace?</AlertDialog.Title>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Delete</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`,
    },
  ],
  sheet: [
    {
      title: 'Side panel variants',
      description: 'Sheet supports every side and keeps dialog behavior for focus and dismissal.',
      preview: () => (
        <div className="flex flex-wrap gap-2">
          {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
            <Sheet.Root key={side}>
              <Sheet.Trigger asChild>
                <Button variant="outline" size="sm">
                  {side}
                </Button>
              </Sheet.Trigger>
              <Sheet.Content side={side}>
                <Sheet.Header>
                  <Sheet.Title>{side} sheet</Sheet.Title>
                  <Sheet.Description>Use side to choose the slide direction.</Sheet.Description>
                </Sheet.Header>
              </Sheet.Content>
            </Sheet.Root>
          ))}
        </div>
      ),
      code: `<Sheet.Root>
  <Sheet.Trigger asChild><Button>Open</Button></Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Title>Right sheet</Sheet.Title>
  </Sheet.Content>
</Sheet.Root>`,
    },
  ],
  drawer: [
    {
      title: 'Mobile action drawer',
      description: 'Drawer is a bottom sheet variant for dense mobile workflows.',
      preview: () => (
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button variant="outline">Open drawer</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Invite teammates</Drawer.Title>
              <Drawer.Description>Send invitations and assign roles.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Footer>
              <Button>Send invites</Button>
              <Drawer.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      ),
      code: `<Drawer.Root>
  <Drawer.Trigger asChild><Button>Open drawer</Button></Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Title>Invite teammates</Drawer.Title>
    <Drawer.Footer><Button>Send invites</Button></Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>`,
    },
  ],
  'hover-card': [
    {
      title: 'Profile preview',
      description: 'HoverCard is useful for rich previews tied to links or compact references.',
      preview: () => (
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <button
              type="button"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              @ada
            </button>
          </HoverCard.Trigger>
          <HoverCard.Content className="w-72">
            <div className="flex gap-3">
              <Avatar.Root>
                <Avatar.Fallback>AL</Avatar.Fallback>
              </Avatar.Root>
              <div className="grid gap-1">
                <div className="text-sm font-medium">Ada Lovelace</div>
                <div className="text-muted-foreground text-xs">
                  Admin, release owner and systems reviewer.
                </div>
              </div>
            </div>
          </HoverCard.Content>
        </HoverCard.Root>
      ),
      code: `<HoverCard.Root>
  <HoverCard.Trigger asChild><a>@ada</a></HoverCard.Trigger>
  <HoverCard.Content>
    <Avatar.Root><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root>
    Ada Lovelace
  </HoverCard.Content>
</HoverCard.Root>`,
    },
  ],
  'context-menu': [
    {
      title: 'File context menu',
      description:
        'ContextMenu supports nested actions, checkboxes and radio groups from a right-click surface.',
      preview: () => (
        <ContextMenu.Root>
          <ContextMenu.Trigger className="border-border text-muted-foreground flex h-32 w-72 items-center justify-center rounded-md border-2 border-dashed text-sm">
            Right-click a file row
          </ContextMenu.Trigger>
          <ContextMenu.Content className="w-56">
            <ContextMenu.Item>Open</ContextMenu.Item>
            <ContextMenu.Item>Rename</ContextMenu.Item>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>Move to</ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.Item>Archive</ContextMenu.Item>
                <ContextMenu.Item>Shared</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
            <ContextMenu.Separator />
            <ContextMenu.CheckboxItem checked>Favorite</ContextMenu.CheckboxItem>
          </ContextMenu.Content>
        </ContextMenu.Root>
      ),
      code: `<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click a file row</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Open</ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger>Move to</ContextMenu.SubTrigger>
      <ContextMenu.SubContent><ContextMenu.Item>Archive</ContextMenu.Item></ContextMenu.SubContent>
    </ContextMenu.Sub>
  </ContextMenu.Content>
</ContextMenu.Root>`,
    },
  ],
  menubar: [
    {
      title: 'Application menubar',
      description:
        'Menubar supports multiple menus, submenus, shortcuts, checkbox and radio items.',
      preview: () => (
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New project</Menubar.Item>
              <Menubar.Item>Import</Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item>Export</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>View</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.CheckboxItem checked>Sidebar</Menubar.CheckboxItem>
              <Menubar.RadioGroup value="comfortable">
                <Menubar.RadioItem value="compact">Compact</Menubar.RadioItem>
                <Menubar.RadioItem value="comfortable">Comfortable</Menubar.RadioItem>
              </Menubar.RadioGroup>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      ),
      code: `<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content><Menubar.Item>New project</Menubar.Item></Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>`,
    },
  ],
  'navigation-menu': [
    {
      title: 'Documentation navigation',
      description:
        'NavigationMenu supports triggers, content panels, links, viewport and indicator slots.',
      preview: () => (
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="components">
              <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div className="grid w-80 grid-cols-2 gap-2 p-3">
                  {['Button', 'Select', 'Dialog', 'DataTable'].map((item) => (
                    <NavigationMenu.Link
                      key={item}
                      href="#"
                      className="hover:bg-accent rounded-md p-2 text-sm"
                    >
                      {item}
                    </NavigationMenu.Link>
                  ))}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="guides">
              <NavigationMenu.Link href="#">Guides</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Indicator />
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      ),
      code: `<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item value="components">
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#">Button</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Viewport />
</NavigationMenu.Root>`,
    },
  ],
  combobox: [
    {
      title: 'Large searchable collection',
      description: 'Combobox is useful when users need to search through application data.',
      preview: () => (
        <Combobox.Root>
          <Combobox.Input placeholder="Search workspace" className="w-80" />
          <Combobox.Content>
            <Combobox.Group>
              {largeOptions.slice(0, 20).map((option) => (
                <Combobox.Item key={option.value} value={option.value}>
                  {option.label}
                </Combobox.Item>
              ))}
            </Combobox.Group>
            <Combobox.Empty>No workspace found.</Combobox.Empty>
          </Combobox.Content>
        </Combobox.Root>
      ),
      code: `<Combobox.Root>
  <Combobox.Input placeholder="Search workspace" />
  <Combobox.Content>
    <Combobox.Group>
      {options.map((option) => (
        <Combobox.Item key={option.value} value={option.value}>{option.label}</Combobox.Item>
      ))}
    </Combobox.Group>
    <Combobox.Empty>No workspace found.</Combobox.Empty>
  </Combobox.Content>
</Combobox.Root>`,
    },
  ],
  command: [
    {
      title: 'Command palette with groups',
      description: 'Command combines search input, grouped actions, shortcuts and empty states.',
      preview: () => (
        <Command.Root className="border-border w-full max-w-md rounded-lg border">
          <Command.Input placeholder="Type a command or search..." />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Navigation">
              <Command.Item>
                <Home className="h-4 w-4" /> Dashboard <Command.Shortcut>G D</Command.Shortcut>
              </Command.Item>
              <Command.Item>
                <Users className="h-4 w-4" /> Members <Command.Shortcut>G M</Command.Shortcut>
              </Command.Item>
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Actions">
              <Command.Item>
                <Plus className="h-4 w-4" /> Create project
              </Command.Item>
              <Command.Item>
                <Settings className="h-4 w-4" /> Open settings
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Root>
      ),
      code: `<Command.Root>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Group heading="Navigation">
      <Command.Item>Dashboard <Command.Shortcut>G D</Command.Shortcut></Command.Item>
    </Command.Group>
    <Command.Empty>No results found.</Command.Empty>
  </Command.List>
</Command.Root>`,
    },
  ],
  'one-time-password-field': [
    {
      title: 'Four and six digit codes',
      description: 'Use segmented inputs for OTP, PIN and confirmation code flows.',
      preview: () => (
        <div className="grid gap-4">
          <OneTimePasswordField.Root length={4} defaultValue="4821">
            {[0, 1, 2, 3].map((index) => (
              <OneTimePasswordField.Input
                key={index}
                index={index}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </OneTimePasswordField.Root>
          <OneTimePasswordField.Root length={6}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <OneTimePasswordField.Input
                key={index}
                index={index}
                aria-label={`Verification digit ${index + 1}`}
              />
            ))}
          </OneTimePasswordField.Root>
        </div>
      ),
      code: `<OneTimePasswordField.Root length={6}>
  {[0, 1, 2, 3, 4, 5].map((index) => (
    <OneTimePasswordField.Input key={index} index={index} />
  ))}
</OneTimePasswordField.Root>`,
    },
  ],
  'password-toggle-field': [
    {
      title: 'Password form field',
      description: 'Combine the root, input and toggle parts with labels and helper text.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="usage-password">Password</Label>
          <PasswordToggleField.Root>
            <PasswordToggleField.Input id="usage-password" placeholder="Enter password" />
            <PasswordToggleField.Toggle />
          </PasswordToggleField.Root>
          <p className="text-muted-foreground text-xs">Use at least 12 characters.</p>
        </div>
      ),
      code: `<Label htmlFor="password">Password</Label>
<PasswordToggleField.Root>
  <PasswordToggleField.Input id="password" placeholder="Enter password" />
  <PasswordToggleField.Toggle />
</PasswordToggleField.Root>`,
    },
  ],
  'number-field': [
    {
      title: 'Quantities and currency',
      description: 'NumberField supports min, max, step and Intl formatting options.',
      preview: () => (
        <div className="grid gap-4">
          <NumberField.Root defaultValue={3} min={1} max={10}>
            <NumberField.DecrementTrigger />
            <NumberField.Input aria-label="Seats" />
            <NumberField.IncrementTrigger />
          </NumberField.Root>
          <NumberField.Root
            defaultValue={1200}
            step={100}
            formatOptions={{ style: 'currency', currency: 'USD' }}
          >
            <NumberField.DecrementTrigger />
            <NumberField.Input aria-label="Budget" />
            <NumberField.IncrementTrigger />
          </NumberField.Root>
        </div>
      ),
      code: `<NumberField.Root defaultValue={3} min={1} max={10}>
  <NumberField.DecrementTrigger />
  <NumberField.Input aria-label="Seats" />
  <NumberField.IncrementTrigger />
</NumberField.Root>`,
    },
  ],
  calendar: [
    {
      title: 'Selection modes',
      description: 'Calendar supports single, multiple and range selection plus date bounds.',
      preview: () => (
        <div className="grid gap-4 md:grid-cols-2">
          <Calendar mode="single" defaultSelected={new Date(2026, 4, 23)} />
          <Calendar
            mode="range"
            defaultSelected={{ from: new Date(2026, 4, 20), to: new Date(2026, 4, 26) }}
            minDate={new Date(2026, 4, 1)}
            maxDate={new Date(2026, 5, 30)}
          />
        </div>
      ),
      code: `<Calendar mode="single" defaultSelected={new Date(2026, 4, 23)} />
<Calendar
  mode="range"
  defaultSelected={{ from: new Date(2026, 4, 20), to: new Date(2026, 4, 26) }}
/>`,
    },
  ],
  'date-picker': [
    {
      title: 'MUI-style field',
      description:
        'Use the direct component API for label, value, onChange, validation bounds, view props and helper text.',
      preview: () => (
        <DatePicker
          label="Release date"
          defaultValue={new Date(2026, 4, 23)}
          minDate={new Date(2026, 4, 1)}
          maxDate={new Date(2026, 5, 30)}
          format="MM/dd/yyyy"
          formatDensity="spacious"
          views={['year', 'month', 'day']}
          openTo="day"
          helperText="Only dates inside the release window can be selected."
        />
      ),
      code: `<DatePicker
  label="Release date"
  value={date}
  onChange={setDate}
  minDate={releaseStart}
  maxDate={releaseEnd}
  helperText="Only dates inside the release window can be selected."
/>`,
    },
    {
      title: 'Validation and loading',
      description:
        'Mirror MUI validation props such as disablePast, shouldDisableDate, loading and renderLoading.',
      preview: () => (
        <div className="grid gap-3">
          <DatePicker
            label="Business day"
            disablePast
            shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6}
            helperText="Weekends and past dates are disabled."
          />
          <DatePicker
            label="Async calendar"
            defaultOpen
            loading
            renderLoading={() => 'Loading release calendar...'}
          />
        </div>
      ),
      code: `<DatePicker
  label="Business day"
  disablePast
  shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6}
/>

<DatePicker
  loading
  renderLoading={() => 'Loading release calendar...'}
/>`,
    },
    {
      title: 'Date picker field',
      description: 'DatePicker combines a trigger, value display and calendar popover.',
      preview: () => (
        <DatePicker.Root defaultValue={new Date(2026, 4, 23)}>
          <DatePicker.Trigger className="w-64">
            <DatePicker.Value placeholder="Pick release date" />
          </DatePicker.Trigger>
          <DatePicker.Content />
        </DatePicker.Root>
      ),
      code: `<DatePicker.Root defaultValue={new Date(2026, 4, 23)}>
  <DatePicker.Trigger>
    <DatePicker.Value placeholder="Pick release date" />
  </DatePicker.Trigger>
  <DatePicker.Content />
</DatePicker.Root>`,
    },
  ],
  'date-range-picker': [
    {
      title: 'MUI-style range field',
      description: 'Use tuple values for MUI parity or the Aura range object for compound usage.',
      preview: () => (
        <DateRangePicker
          label="Sprint window"
          defaultValue={[new Date(2026, 4, 20), new Date(2026, 4, 27)]}
          minDate={new Date(2026, 4, 1)}
          maxDate={new Date(2026, 5, 30)}
          calendars={2}
          helperText="Range closes after both start and end dates are selected."
        />
      ),
      code: `<DateRangePicker
  label="Sprint window"
  value={range}
  onChange={setRange}
  minDate={releaseStart}
  maxDate={releaseEnd}
/>`,
    },
    {
      title: 'Preset shortcuts',
      description: 'Use built-in shortcut buttons or provide your own shortcut ranges.',
      preview: () => (
        <DateRangePicker
          label="Report period"
          calendars={1}
          defaultOpen
          shortcuts={[
            {
              label: 'Yesterday',
              getValue: (today) => [
                new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
                new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
              ],
            },
            {
              label: 'Last 14 days',
              getValue: (today) => [
                new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13),
                today,
              ],
            },
            {
              label: 'Quarter to date',
              getValue: (today) => [
                new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
                today,
              ],
            },
          ]}
          helperText="Shortcut selections call onChange and onAccept with source='shortcut'."
        />
      ),
      code: `<DateRangePicker
  label="Report period"
  calendars={1}
  shortcuts={[
    { label: 'Yesterday', getValue: (today) => [yesterday(today), yesterday(today)] },
    { label: 'Last 14 days', getValue: (today) => [addDays(today, -13), today] },
    { label: 'Quarter to date', getValue: (today) => [startOfQuarter(today), today] },
  ]}
/>`,
    },
    {
      title: 'Date range field',
      description: 'Use DateRangePicker for reporting windows, bookings and project timelines.',
      preview: () => (
        <DateRangePicker.Root
          defaultValue={{ from: new Date(2026, 4, 20), to: new Date(2026, 4, 27) }}
        >
          <DateRangePicker.Trigger className="w-72">
            <DateRangePicker.Value placeholder="Pick date range" />
          </DateRangePicker.Trigger>
          <DateRangePicker.Content />
        </DateRangePicker.Root>
      ),
      code: `<DateRangePicker.Root defaultValue={{ from: startDate, to: endDate }}>
  <DateRangePicker.Trigger>
    <DateRangePicker.Value placeholder="Pick date range" />
  </DateRangePicker.Trigger>
  <DateRangePicker.Content />
</DateRangePicker.Root>`,
    },
  ],
  'time-picker': [
    {
      title: 'MUI-style time field',
      description:
        'Use the 12-hour analog clock panel with AM/PM, minutesStep, minTime, maxTime and shouldDisableTime.',
      preview: () => (
        <div className="grid gap-3">
          <TimePicker
            label="Start time"
            defaultValue={new Date(2026, 4, 23, 9, 30)}
            ampm
            minutesStep={15}
            minTime={new Date(2026, 4, 23, 8, 0)}
            maxTime={new Date(2026, 4, 23, 18, 0)}
            helperText="12-hour analog clock with 15-minute steps between 8:00 AM and 6:00 PM."
          />
          <TimePicker
            label="System time"
            defaultValue={new Date(2026, 4, 23, 14, 5, 45)}
            views={['hours', 'minutes', 'seconds']}
            timeSteps={{ hours: 1, minutes: 5, seconds: 15 }}
            format="hh:mm:ss a"
            helperText="Seconds use a separate 1-60 clock selector."
          />
        </div>
      ),
      code: `<TimePicker
  label="Start time"
  value={time}
  onChange={setTime}
  ampm
  minutesStep={15}
  minTime={new Date(2026, 4, 23, 8, 0)}
  maxTime={new Date(2026, 4, 23, 18, 0)}
/>`,
    },
    {
      title: 'Time segments',
      description: 'Use segments for hour, minute and second editing with keyboard support.',
      preview: () => (
        <div className="grid gap-3">
          <TimePicker.Root defaultValue={{ hour: 9, minute: 30 }}>
            <TimePicker.Segment segment="hour" />
            <TimePicker.Separator />
            <TimePicker.Segment segment="minute" />
          </TimePicker.Root>
          <TimePicker.Root defaultValue={{ hour: 14, minute: 5, second: 45 }}>
            <TimePicker.Segment segment="hour" />
            <TimePicker.Separator />
            <TimePicker.Segment segment="minute" />
            <TimePicker.Separator />
            <TimePicker.Segment segment="second" />
          </TimePicker.Root>
        </div>
      ),
      code: `<TimePicker.Root defaultValue={{ hour: 14, minute: 5, second: 45 }}>
  <TimePicker.Segment segment="hour" />
  <TimePicker.Separator />
  <TimePicker.Segment segment="minute" />
  <TimePicker.Separator />
  <TimePicker.Segment segment="second" />
</TimePicker.Root>`,
    },
  ],
  'date-time-picker': [
    {
      title: 'MUI-style date time field',
      description: 'Pick the date first, then choose the time from the staged time picker.',
      preview: () => (
        <DateTimePicker
          label="Deployment window"
          defaultValue={new Date(2026, 4, 23, 14, 30)}
          minDateTime={new Date(2026, 4, 20, 9, 0)}
          maxDateTime={new Date(2026, 5, 30, 18, 0)}
          minutesStep={15}
          format="MM/dd/yyyy HH:mm"
          helperText="Date and time validation share one Date value."
        />
      ),
      code: `<DateTimePicker
  label="Deployment window"
  value={dateTime}
  onChange={setDateTime}
  minDateTime={new Date(2026, 4, 20, 9, 0)}
  maxDateTime={new Date(2026, 5, 30, 18, 0)}
  minutesStep={15}
/>`,
    },
    {
      title: 'AM/PM with seconds',
      description: 'Enable AM/PM and seconds while keeping the date-first, time-second flow.',
      preview: () => (
        <DateTimePicker
          label="Audit timestamp"
          defaultValue={new Date(2026, 4, 23, 21, 15, 30)}
          ampm
          timeSteps={{ hours: 1, minutes: 5, seconds: 15 }}
          format="MM/dd/yyyy hh:mm:ss a"
          helperText="After selecting a date, the time picker shows hours, minutes and seconds."
        />
      ),
      code: `<DateTimePicker
  ampm
  timeSteps={{ hours: 1, minutes: 5, seconds: 15 }}
  format="MM/dd/yyyy hh:mm:ss a"
/>`,
    },
  ],
  'color-picker': [
    {
      title: 'Theme color editor',
      description: 'Compose area, hue, alpha and swatch controls for theme builder surfaces.',
      preview: () => (
        <ColorPicker.Root
          defaultValue={{ h: 236, s: 72, v: 86, a: 0.85 }}
          className="border-border bg-card w-72 rounded-lg border p-3"
        >
          <ColorPicker.Area />
          <div className="mt-3 grid gap-3">
            <ColorPicker.HueSlider />
            <ColorPicker.AlphaSlider />
            <div className="flex items-center gap-2 text-sm">
              <ColorPicker.Swatch />
              Primary accent
            </div>
          </div>
        </ColorPicker.Root>
      ),
      code: `<ColorPicker.Root defaultValue={{ h: 236, s: 72, v: 86, a: 0.85 }}>
  <ColorPicker.Area />
  <ColorPicker.HueSlider />
  <ColorPicker.AlphaSlider />
  <ColorPicker.Swatch />
</ColorPicker.Root>`,
    },
  ],
  'file-upload': [
    {
      title: 'Upload constraints',
      description: 'FileUpload supports multiple files, accept filters, max size and max count.',
      preview: () => (
        <FileUpload.Root
          multiple
          accept="image/*,.pdf"
          maxFiles={3}
          maxSize={1024 * 1024 * 5}
          className="w-full max-w-md"
        >
          <FileUpload.Dropzone>
            <FileText className="text-muted-foreground h-8 w-8" />
            <span className="text-muted-foreground text-sm">Upload PDFs or images up to 5 MB</span>
          </FileUpload.Dropzone>
          <FileUpload.Input />
          <FileUpload.List />
        </FileUpload.Root>
      ),
      code: `<FileUpload.Root multiple accept="image/*,.pdf" maxFiles={3} maxSize={1024 * 1024 * 5}>
  <FileUpload.Dropzone />
  <FileUpload.Input />
  <FileUpload.List />
</FileUpload.Root>`,
    },
  ],
  'scroll-area': [
    {
      title: 'Long activity feed',
      description: 'ScrollArea keeps long content usable with themeable scrollbars.',
      preview: () => (
        <ScrollArea.Root className="border-border h-64 w-full max-w-md rounded-md border">
          <div className="grid gap-2 p-3">
            {projectRows.map((row) => (
              <div
                key={row.id}
                className="bg-muted/40 flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm"
              >
                <span>{row.project}</span>
                <Badge
                  variant={
                    row.status === 'Blocked'
                      ? 'destructive'
                      : row.status === 'Review'
                        ? 'warning'
                        : 'secondary'
                  }
                >
                  {row.status}
                </Badge>
              </div>
            ))}
          </div>
          <ScrollArea.Scrollbar />
        </ScrollArea.Root>
      ),
      code: `<ScrollArea.Root className="h-64">
  {items.map((item) => <div key={item.id}>{item.label}</div>)}
  <ScrollArea.Scrollbar />
</ScrollArea.Root>`,
    },
  ],
  toolbar: [
    {
      title: 'Editor toolbar',
      description: 'Toolbar groups commands, links and separators with roving focus behavior.',
      preview: () => (
        <Toolbar.Root aria-label="Editor toolbar">
          <Toolbar.Button aria-label="Bold">
            <strong>B</strong>
          </Toolbar.Button>
          <Toolbar.Button aria-label="Italic">
            <em>I</em>
          </Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>
            <Copy className="h-4 w-4" /> Copy
          </Toolbar.Button>
          <Toolbar.Link href="#">Docs</Toolbar.Link>
        </Toolbar.Root>
      ),
      code: `<Toolbar.Root>
  <Toolbar.Button aria-label="Bold"><strong>B</strong></Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Copy</Toolbar.Button>
  <Toolbar.Link href="#">Docs</Toolbar.Link>
</Toolbar.Root>`,
    },
  ],
  resizable: [
    {
      title: 'Dashboard panels',
      description: 'Resizable panels support horizontal and vertical groups with keyboard handles.',
      preview: () => (
        <Resizable.Group className="border-border h-56 w-full max-w-lg rounded-md border">
          <Resizable.Panel id="nav" defaultSize={28} className="grid place-items-center text-sm">
            Navigation
          </Resizable.Panel>
          <Resizable.Handle between={['nav', 'main']} withHandle />
          <Resizable.Panel id="main" defaultSize={72} className="grid place-items-center text-sm">
            Main panel
          </Resizable.Panel>
        </Resizable.Group>
      ),
      code: `<Resizable.Group>
  <Resizable.Panel id="nav" defaultSize={28}>Navigation</Resizable.Panel>
  <Resizable.Handle between={['nav', 'main']} withHandle />
  <Resizable.Panel id="main" defaultSize={72}>Main panel</Resizable.Panel>
</Resizable.Group>`,
    },
  ],
  carousel: [
    {
      title: 'Content carousel',
      description: 'Carousel supports looping content cards with previous and next controls.',
      preview: () => (
        <Carousel.Root className="w-full max-w-md">
          <Carousel.Content>
            {['Design tokens', 'Accessible primitives', 'Playground coverage', 'Docs examples'].map(
              (item, index) => (
                <Carousel.Item key={item}>
                  <div className="bg-muted grid h-40 place-items-center rounded-lg p-6 text-center">
                    <div>
                      <div className="text-2xl font-semibold">{index + 1}</div>
                      <div className="text-muted-foreground text-sm">{item}</div>
                    </div>
                  </div>
                </Carousel.Item>
              ),
            )}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>
      ),
      code: `<Carousel.Root>
  <Carousel.Content>
    <Carousel.Item>Design tokens</Carousel.Item>
    <Carousel.Item>Accessible primitives</Carousel.Item>
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>`,
    },
  ],
  tree: [
    {
      title: 'Large file tree',
      description: 'Tree handles nested groups, expanded state and keyboard navigation.',
      preview: () => (
        <Tree.Root defaultExpanded={['src', 'docs']} className="w-full max-w-sm text-sm">
          {files.map((folder) => (
            <Tree.Item key={folder.id} id={folder.id} hasChildren>
              <Tree.Trigger hasChildren>
                <Folder className="h-4 w-4" />
                {folder.label}
              </Tree.Trigger>
              <Tree.Group>
                {folder.children.map((file) => (
                  <Tree.Item key={file} id={`${folder.id}-${file}`}>
                    <Tree.Trigger hasChildren={false}>
                      <FileText className="h-4 w-4" />
                      {file}
                    </Tree.Trigger>
                  </Tree.Item>
                ))}
              </Tree.Group>
            </Tree.Item>
          ))}
        </Tree.Root>
      ),
      code: `<Tree.Root defaultExpanded={['src']}>
  <Tree.Item id="src" hasChildren>
    <Tree.Trigger hasChildren>src</Tree.Trigger>
    <Tree.Group>
      <Tree.Item id="src-app"><Tree.Trigger hasChildren={false}>app.tsx</Tree.Trigger></Tree.Item>
    </Tree.Group>
  </Tree.Item>
</Tree.Root>`,
    },
  ],
  editable: [
    {
      title: 'Inline editing states',
      description: 'Editable swaps preview and input surfaces for titles, labels and metadata.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-3">
          <Editable.Root defaultValue="Q2 growth report">
            <Editable.Preview />
            <Editable.Input aria-label="Report title" />
          </Editable.Root>
          <Editable.Root defaultValue="Click to rename" submitMode="enter">
            <Editable.Preview />
            <Editable.Input aria-label="Workspace name" />
          </Editable.Root>
        </div>
      ),
      code: `<Editable.Root defaultValue="Q2 growth report">
  <Editable.Preview />
  <Editable.Input aria-label="Report title" />
</Editable.Root>`,
    },
  ],
  'tags-input': [
    {
      title: 'Tag collection',
      description:
        'TagsInput supports existing tags, rendered chips, input entry and max-tag workflows.',
      preview: () => (
        <TagsInput.Root
          defaultValue={['react', 'tailwind', 'storybook']}
          maxTags={6}
          className="w-full max-w-md"
        >
          <TagsInput.Items>
            {(tag, index) => <TagsInput.Tag key={tag} index={index} tag={tag} />}
          </TagsInput.Items>
          <TagsInput.Input placeholder="Add tag..." />
        </TagsInput.Root>
      ),
      code: `<TagsInput.Root defaultValue={['react', 'tailwind']} maxTags={6}>
  <TagsInput.Items>
    {(tag, index) => <TagsInput.Tag key={tag} index={index} tag={tag} />}
  </TagsInput.Items>
  <TagsInput.Input placeholder="Add tag..." />
</TagsInput.Root>`,
    },
  ],
  mentions: [
    {
      title: 'People mention textarea',
      description:
        'Mentions connects a textarea with filtered suggestions and custom item rendering.',
      preview: () => <MentionsPeopleExample />,
      code: `<Mentions.Root>
  <Mentions.Textarea placeholder="Try @ada..." />
  <Mentions.Suggestions items={people}>
    <Mentions.Items>
      {(item, index) => (
        <Mentions.Item key={item.id} suggestion={item} index={index}>
          @{item.label}
        </Mentions.Item>
      )}
    </Mentions.Items>
  </Mentions.Suggestions>
</Mentions.Root>`,
    },
  ],
  'data-table': [
    {
      title: 'Search, filters and pagination',
      description:
        'Global search, column filter state, nested AND/OR filters, selection and pagination can run locally or be mirrored to a server adapter.',
      preview: () => (
        <DataTable
          columns={projectColumns}
          data={projectRows}
          enableSorting
          enableFiltering
          enableGlobalSearch
          enableAdvancedFiltering
          defaultAdvancedFilter={projectAdvancedFilter}
          enablePagination
          enableRowSelection
          pageSize={8}
          className="w-full max-w-3xl"
        />
      ),
      code: `<DataTable
  columns={columns}
  data={rows}
  enableSorting
  enableFiltering
  enableGlobalSearch
  enableAdvancedFiltering
  defaultAdvancedFilter={advancedFilter}
  enablePagination
  enableRowSelection
  pageSize={8}
/>`,
    },
    {
      title: 'Virtual rows and columns',
      description:
        'Use row and column virtualization together for unlimited-feeling datasets without rendering every cell.',
      preview: () => (
        <DataTable
          columns={[...projectColumns, ...projectMetricColumns]}
          data={largeProjectRows}
          virtual={{ estimatedRowHeight: 44, overscan: 12 }}
          virtualColumns={{ estimatedColumnWidth: 110, overscan: 5 }}
          height={360}
          enableGlobalSearch
          enableColumnResizing
          className="w-full max-w-4xl"
        />
      ),
      code: `<DataTable
  columns={[...columns, ...metricColumns]}
  data={largeRows}
  virtual={{ estimatedRowHeight: 44, overscan: 12 }}
  virtualColumns={{ estimatedColumnWidth: 110, overscan: 5 }}
  height={360}
  enableGlobalSearch
  enableColumnResizing
/>`,
    },
    {
      title: 'Configuration, pinning and actions',
      description:
        'Column configuration, column selection, row pinning, column pinning, grouping, row actions and detail panels are built in.',
      preview: () => (
        <DataTable
          columns={projectColumns}
          data={projectRows}
          getRowId={(row) => String(row.id)}
          enableColumnConfiguration
          enableColumnSelection
          enableColumnPinning
          enableRowPinning
          enableRowSelection
          enableGrouping
          defaultRowPinning={{ top: ['1'], bottom: ['24'] }}
          rowActions={(row) => (
            <Button size="sm" variant="ghost">
              Open {row.original.id}
            </Button>
          )}
          renderDetailPanel={(row) => (
            <div className="grid gap-1 text-sm">
              <strong>{row.original.project}</strong>
              <span className="text-muted-foreground">
                {row.original.owner} owns this workspace.
              </span>
            </div>
          )}
          className="w-full max-w-3xl"
        />
      ),
      code: `<DataTable
  columns={columns}
  data={rows}
  getRowId={(row) => String(row.id)}
  enableColumnConfiguration
  enableColumnSelection
  enableColumnPinning
  enableRowPinning
  enableRowSelection
  enableGrouping
  defaultRowPinning={{ top: ['1'], bottom: ['24'] }}
  rowActions={(row) => <Button>Open {row.original.id}</Button>}
  renderDetailPanel={(row) => <ProjectDetail row={row} />}
/>`,
    },
    {
      title: 'Totals, spanning and row configuration',
      description:
        'Footer aggregations, row totals, cell colSpan/rowSpan and row-level classes cover analytical grids.',
      preview: () => (
        <DataTable
          columns={projectColumns}
          data={projectRows}
          aggregations={{ revenue: 'sum', cost: 'avg', progress: 'max' }}
          rowTotals={{ columns: ['revenue', 'cost'] }}
          getRowClassName={(row) =>
            row.original.status === 'Blocked' ? 'bg-destructive/10' : undefined
          }
          getCellColSpan={(cell, row) =>
            cell.column.id === 'project' && row.original.status === 'Blocked' ? 2 : undefined
          }
          getCellRowSpan={(cell, row) =>
            cell.column.id === 'owner' && row.original.owner === 'Ada Lovelace' ? 2 : undefined
          }
          className="w-full max-w-3xl"
        />
      ),
      code: `<DataTable
  columns={columns}
  data={rows}
  aggregations={{ revenue: 'sum', cost: 'avg', progress: 'max' }}
  rowTotals={{ columns: ['revenue', 'cost'] }}
  getRowClassName={(row) => row.original.status === 'Blocked' ? 'bg-destructive/10' : undefined}
  getCellColSpan={(cell, row) => cell.column.id === 'project' ? 2 : undefined}
  getCellRowSpan={(cell, row) => cell.column.id === 'owner' ? 2 : undefined}
/>`,
    },
    {
      title: 'Inline add, lazy loading and localization',
      description:
        'Inline create rows, scroll-end lazy loading, skeleton/spinner/text loaders and localized labels are all prop-driven.',
      preview: () => <DataTableInlineExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  inlineCreateRow={{ fields, onAdd }}
  hasMore
  loadingMore
  onLoadMore={loadMoreRows}
  loadingVariant="skeleton"
  localeText={{ searchPlaceholder: 'Buscar...', columns: 'Columnas' }}
/>`,
    },
    {
      title: 'Column Definition API',
      description:
        'DataTableColumnDef extends TanStack ColumnDef with field, headerName, type, align, flex, renderCell, renderHeader, description and filterOperators.',
      preview: () => <DataTableColumnDefExample />,
      code: `import type { DataTableColumnDef } from '@aura-ui/data-table';

const columns: DataTableColumnDef<User>[] = [
  {
    field: 'name',
    headerName: 'Full Name',
    description: 'User display name',
    flex: 1,
    renderCell: ({ value }) => <strong>{String(value)}</strong>,
  },
  { field: 'email', headerName: 'Email', size: 220, filterOperators: ['contains', 'equals'] },
  { field: 'role', headerName: 'Role', size: 110, align: 'center' },
  { field: 'revenue', headerName: 'Revenue', type: 'number', size: 130,
    renderCell: ({ value }) => \`$\${Number(value).toLocaleString()}\` },
  { field: 'score', headerName: 'Score', type: 'number', size: 100, description: 'Performance score (0–100)' },
  { field: 'joined', headerName: 'Joined', type: 'date', size: 120 },
];`,
    },
    {
      title: 'Tree data',
      description:
        'Set treeData and provide getSubRows to render a parent/child hierarchy with automatic depth indentation. Expand All and Collapse All appear in the toolbar.',
      preview: () => <DataTableTreeDataExample />,
      code: `type Category = { id: string; name: string; children?: Category[] };

<DataTable
  columns={[
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'type', headerName: 'Type', size: 120, align: 'center' },
    { field: 'count', headerName: 'Members', type: 'number', size: 110 },
  ]}
  data={categories}
  treeData
  getSubRows={(row) => row.children}
  getRowId={(row) => row.id}
/>`,
    },
    {
      title: 'Column management',
      description:
        'Resize columns by dragging the edge handle (double-click to auto-fit). Drag headers to reorder. Pin any column left or right via the ⋮ menu. Lock a column to prevent resize, reorder, and hide. Toggle visibility with the Columns button. Below: column groups created by nesting columns under a parent definition.',
      preview: () => <DataTableColumnManagementExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  enableColumnResizing
  enableColumnAutoSize
  enableColumnReordering
  enableColumnPinning
  enableColumnConfiguration
  lockedColumns={['name']}
  onLockedColumnsChange={setLocked}
/>

// Column groups — nest columns under a parent:
<DataTable
  columns={[
    { headerName: 'Identity', columns: [{ field: 'name' }, { field: 'role' }] },
    { headerName: 'Performance', columns: [{ field: 'score' }, { field: 'revenue' }] },
    { field: 'joined', headerName: 'Joined', type: 'date' },
  ]}
  data={rows}
  enableColumnResizing
/>`,
    },
    {
      title: 'Row management',
      description:
        'Drag the ⠿ grip to reorder rows — the sorted array is emitted via onRowOrderChange. Pin rows to top or bottom via the grip menu. Use enableRowCopy / enableColumnCopy to add copy options in the row and column context menus.',
      preview: () => <DataTableRowManagementExample />,
      code: `const [rows, setRows] = React.useState(data);

<DataTable
  columns={columns}
  data={rows}
  enableRowReordering
  enableRowPinning
  enableRowCopy
  enableColumnCopy
  onRowOrderChange={(newRows) => setRows(newRows)}
/>`,
    },
    {
      title: 'Row actions',
      description:
        'rowActionMenu renders a ⋮ dropdown per row (supports separators, disabled/hidden guards, destructive variants). rowActionButtons renders inline buttons. bulkActions shows a panel when rows are selected. loadingRowIds dims individual rows during async mutations. onRowContextMenu / onCellContextMenu handle right-click events.',
      preview: () => <DataTableRowActionsExample />,
      code: `import type { DataTableRowActionItem, DataTableBulkAction } from '@aura-ui/data-table';

const menu: DataTableRowActionItem<User>[] = [
  { id: 'edit', label: 'Edit', onClick: (row) => edit(row) },
  { id: 'sep', separator: true, label: '', onClick: () => {} },
  { id: 'del', label: 'Delete', variant: 'destructive', onClick: (row) => remove(row) },
];
const buttons: DataTableRowActionItem<User>[] = [
  { id: 'save', label: 'Save', onClick: (row) => save(row) },
];
const bulk: DataTableBulkAction<User>[] = [
  { id: 'delete-sel', label: 'Delete selected', variant: 'destructive',
    onClick: (rows, table) => { deleteAll(rows); table.resetRowSelection(); } },
];

<DataTable
  columns={columns}
  data={rows}
  enableRowSelection
  rowActionMenu={menu}
  rowActionButtons={buttons}
  bulkActions={bulk}
  loadingRowIds={pendingIds}
  onRowContextMenu={(row, event) => showContextMenu(row, event)}
  onCellContextMenu={(cell, row, event) => showCellMenu(cell, row, event)}
/>`,
    },
    {
      title: 'Toolbar features',
      description:
        'enableDensityToggle adds a Density menu (compact / standard / comfortable). enableExport adds a dropdown with CSV, JSON and XLSX. enableFullscreen expands the table to fill the viewport. onPrint adds a Print button. onRefresh adds a Refresh button. enableStatusBar pins a count bar below the table.',
      preview: () => <DataTableToolbarFeaturesExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  enableRowSelection
  enableDensityToggle
  enableExport
  enableFullscreen
  enableStatusBar
  onRefresh={refetch}
  onPrint={() => window.print()}
  toolbarActions={[
    { id: 'custom', label: 'Custom', onClick: (table) => doSomething(table) },
  ]}
/>`,
    },
    {
      title: 'Sorting and filtering options',
      description:
        'Hold Shift while clicking column headers to build a multi-column sort chain — numbered priority badges appear on each active sort icon. quickFilterColumns renders a search input below specified headers. enableFilterChips shows active filters as removable chips above the table.',
      preview: () => <DataTableSortingFilteringExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  enableSorting
  enableFiltering
  enableFilterChips
  quickFilterColumns={['name', 'role']}
/>
// Shift+click column headers for multi-sort.`,
    },
    {
      title: 'Pagination and status bar',
      description:
        'The pagination bar includes a page-number dropdown, rows-per-page selector, total row count, and icon navigation. enableStatusBar adds a compact bar below showing total and selected row counts.',
      preview: () => <DataTablePaginationStatusExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  enableRowSelection
  enablePagination
  pageSize={10}
  pageSizeOptions={[5, 10, 25, 50]}
  showTotalRows
  enableStatusBar
/>`,
    },
    {
      title: 'Row appearance',
      description:
        'striped alternates row backgrounds. enableRowNumbers adds a fixed row-number column. getRowStatus colors the left border stripe per row. rowHeight sets a uniform or per-row pixel height. enableCellTooltip shows the raw value on hover. getCellClassName applies Tailwind classes to individual cells by value.',
      preview: () => <DataTableRowAppearanceExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  striped
  enableRowNumbers
  enableCellTooltip
  getRowStatus={(row) => row.original.active ? 'success' : 'error'}
  rowHeight={44}
  getCellClassName={(cell) => {
    if (cell.column.id === 'score' && Number(cell.getValue()) >= 80)
      return 'text-green-600 font-semibold';
    return undefined;
  }}
/>`,
    },
    {
      title: 'Inline editing',
      description:
        'Mark columns editable: true and provide valueSetter to write changes back. editMode controls whether a single click or double-click starts editing. enableUndoRedo adds Ctrl+Z / Ctrl+Y. enableValidation + displayValidate on column defs shows a red outline and error tooltip on invalid cells. dirtyRows tracks unsaved row IDs.',
      preview: () => <DataTableInlineEditingAllExample />,
      code: `<DataTable
  columns={[
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      valueSetter: (row, value) => update(row.id, { name: value }),
    },
    {
      field: 'score',
      headerName: 'Score',
      type: 'number',
      editable: true,
      displayValidate: (value) => {
        const n = Number(value);
        return (isNaN(n) || n < 0 || n > 100) ? 'Score must be 0–100' : undefined;
      },
      valueSetter: (row, value) => update(row.id, { score: Number(value) }),
    },
  ]}
  data={rows}
  editMode="dblclick"
  enableUndoRedo
  enableValidation
  enablePaste
  dirtyRows={dirtyRows}
  onDirtyRowsChange={setDirtyRows}
/>`,
    },
    {
      title: 'Clipboard and cell selection',
      description:
        'enableCopyPaste lets users press Ctrl+C to copy selected rows as TSV — paste directly into Excel or Google Sheets. enablePaste enables Ctrl+V to paste TSV back into editable cells. enableCellSelection adds click-drag or Shift+click rectangular range selection.',
      preview: () => <DataTableClipboardSelectionExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  enableRowSelection
  enableCopyPaste
  enablePaste
  enableCellSelection
  onCellSelectionChange={(sel) => console.log(sel)}
/>`,
    },
    {
      title: 'Conditional formatting',
      description:
        'Set enableConditionalFormatting to add a Format button in the toolbar. Users open a drawer to create rules that highlight cells by column value — choose operator, value, background and text color. Rules are serializable and can be stored externally via conditionalFormattingRules + onConditionalFormattingRulesChange.',
      preview: () => <DataTableConditionalFormattingExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  enableConditionalFormatting
  conditionalFormattingRules={rules}
  onConditionalFormattingRulesChange={setRules}
/>`,
    },
    {
      title: 'Built-in cell renderers and formatting',
      description:
        'Set type on a column to get rich built-in cell rendering: badge (with badgeMap for color mapping), currency (Intl.NumberFormat), progress bar, star rating, link, avatar. Add locale / dateFormat / numberFormat / timezone per column for Intl-based formatting of date and number columns.',
      preview: () => <DataTableCellRenderersExample />,
      code: `<DataTable
  columns={[
    { field: 'status', type: 'badge',
      badgeMap: { Active: { color: '#dcfce7', textColor: '#166534' } } },
    { field: 'revenue', type: 'currency', currencyCode: 'USD' },
    { field: 'score', type: 'progress', progressMax: 100 },
    { field: 'rating', type: 'rating', ratingMax: 5 },
    // Intl formatting:
    { field: 'joined', type: 'date', dateFormat: { dateStyle: 'long' }, locale: 'en-US' },
    { field: 'amount', type: 'number',
      numberFormat: { style: 'currency', currency: 'EUR' }, locale: 'de-DE' },
  ]}
  data={rows}
/>`,
    },
    {
      title: 'Analytics features',
      description:
        'enableToolPanel adds a collapsible right-side panel with Columns, Filters, and Stats tabs. enableHeaderStats pins an aggregated stats row below column headers (count / sum / avg / min / max / unique — configurable per column via headerStatsConfig). enableSavedViews adds a drawer to save, load, update and delete named table states.',
      preview: () => <DataTableAnalyticsFeaturesExample />,
      code: `import type { DataTableSavedView } from '@aura-ui/data-table';

const [savedViews, setSavedViews] = React.useState<DataTableSavedView[]>([]);

<DataTable
  columns={columns}
  data={rows}
  enableToolPanel
  enableHeaderStats
  headerStatsConfig={{ score: 'avg', revenue: 'sum', name: 'count' }}
  enableSavedViews
  savedViews={savedViews}
  onSavedViewsChange={setSavedViews}
/>`,
    },
    {
      title: 'Live data',
      description:
        'Set enableLiveData to watch for data prop changes and flash updated cells with a highlight animation. Pair with liveDataKey (default: "id") as the row identity key. Useful for dashboards with WebSocket or polling data sources.',
      preview: () => <DataTableLiveDataExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  enableLiveData
  liveDataKey="id"
  onLiveDataUpdate={(updated) => console.log('Updated rows:', updated)}
/>`,
    },
    {
      title: 'Async detail panel',
      description:
        'loadDetailPanel receives a Row and returns a Promise<ReactNode>. The resolved content is displayed in an expandable panel below the row. Panels are LRU-cached (detailPanelCacheSize, default 20) so re-expanding does not re-fetch.',
      preview: () => <DataTableAsyncDetailPanelExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  getRowId={(row) => String(row.id)}
  loadDetailPanel={async (row) => {
    const details = await fetchUserDetails(row.original.id);
    return <UserDetailPanel data={details} />;
  }}
  detailPanelCacheSize={20}
/>`,
    },
    {
      title: 'Pivot mode',
      description:
        'Set enablePivot to add a Pivot toolbar button. Clicking it opens a configuration drawer where you choose the row group field, pivot field, value field and aggregation function. The table re-renders as a cross-tabulation view. Pass pivotConfig + onPivotConfigChange for controlled state.',
      preview: () => <DataTablePivotExample />,
      code: `import type { DataTablePivotConfig } from '@aura-ui/data-table';

// No initial config — table shows raw data; click Pivot in toolbar to configure
const [pivotConfig, setPivotConfig] = React.useState<DataTablePivotConfig | undefined>(undefined);

<DataTable
  columns={columns}
  data={rows}
  enablePivot
  pivotConfig={pivotConfig}
  onPivotConfigChange={setPivotConfig}
  enableSorting
  enablePagination
  pageSize={15}
/>`,
    },
    {
      title: 'State persistence',
      description:
        'Pass a unique stateKey to automatically save and restore sort, filter, column visibility, column sizing, column order, pagination and density to localStorage. Refresh the page — the table state is fully restored.',
      preview: () => <DataTableStatePersistenceExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  stateKey="my-users-table"
  enableSorting
  enableGlobalSearch
  enablePagination
  enableColumnResizing
/>`,
    },
    {
      title: 'Mobile card view',
      description:
        'Set mobileBreakpoint to "sm", "md", or "lg". Below that breakpoint the table switches to a label/value card list — one card per row, one item per column. Resize the browser window to see the transition.',
      preview: () => <DataTableMobileCardExample />,
      code: `<DataTable
  columns={columns}
  data={rows}
  mobileBreakpoint="md"
/>`,
    },
    {
      title: 'Custom empty states',
      description:
        'NoRowsOverlay renders when the data source is empty. NoResultsOverlay renders when filters/search produce zero matches from a non-empty dataset. Both accept any ReactNode — render illustrations, calls to action, or upload prompts.',
      preview: () => <DataTableSlotsExample />,
      code: `import type { DataTableSlots } from '@aura-ui/data-table';

const slots: DataTableSlots<User> = {
  NoRowsOverlay: () => (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <p className="text-muted-foreground text-sm">No users yet.</p>
      <Button onClick={openCreateDialog}>Add first user</Button>
    </div>
  ),
  NoResultsOverlay: () => (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <p className="text-muted-foreground text-sm">No results match your filters.</p>
    </div>
  ),
};

<DataTable columns={columns} data={[]} enableGlobalSearch slots={slots} />`,
    },
  ],

  chart: [
    {
      title: 'Bar chart',
      description:
        'A vertical bar chart with grid lines, labelled axes and an interactive tooltip. The chart is responsive — omit the width prop to let it fill its container.',
      preview: () => <ChartBarExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 3900 },
  { month: 'Apr', revenue: 7100 },
  { month: 'May', revenue: 6400 },
  { month: 'Jun', revenue: 8300 },
];

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Bar dataKey="revenue" name="Revenue" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Multi-series (Bar + Line)',
      description:
        'Combine Chart.Bar and Chart.Line inside the same Chart.Root to overlay series with different mark types. The stacked bars use the same stackId.',
      preview: () => <ChartMultiSeriesExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Bar dataKey="revenue" name="Revenue" />
  <Chart.Bar dataKey="cost" name="Cost" />
  <Chart.Line dataKey="profit" name="Profit" curve="catmullRom" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Area (stacked)',
      description:
        'Chart.Area with a shared stackId renders a stacked area chart. fillOpacity controls the fill transparency independently per series.',
      preview: () => <ChartAreaExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Area dataKey="revenue" name="Revenue" fillOpacity={0.25} stackId="a" />
  <Chart.Area dataKey="cost" name="Cost" fillOpacity={0.2} stackId="a" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Pie / Donut',
      description:
        'Wrap Chart.Pie in Chart.PieRoot. Set innerRadius > 0 to make a donut chart. padAngle and cornerRadius add spacing and rounded corners between segments.',
      preview: () => <ChartPieExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { category: 'Direct',   value: 3200 },
  { category: 'Organic',  value: 2100 },
  { category: 'Referral', value: 1400 },
  { category: 'Social',   value: 980 },
  { category: 'Email',    value: 620 },
];

<Chart.PieRoot data={data} width={360} height={360}>
  <Chart.Pie
    dataKey="value"
    nameKey="category"
    innerRadius={80}
    padAngle={0.02}
    cornerRadius={4}
  />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.PieRoot>`,
    },
    {
      title: 'Line (multi-series)',
      description:
        'Multiple Chart.Line components inside one Chart.Root. Each series picks the next color from the palette automatically, or accepts an explicit color prop.',
      preview: () => <ChartLineExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Line dataKey="alice" name="Alice" curve="catmullRom" />
  <Chart.Line dataKey="bob"   name="Bob"   curve="catmullRom" color="hsl(var(--chart-2))" />
  <Chart.Line dataKey="carol" name="Carol" curve="catmullRom" color="hsl(var(--chart-3))" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Scatter plot',
      description:
        'Chart.Scatter maps xKey to the horizontal axis and yKey to the vertical axis. Multiple series are supported inside one Chart.Root.',
      preview: () => <ChartScatterExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="x" />
  <Chart.YAxis />
  <Chart.Scatter xKey="x" yKey="y" name="Products" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Radar / Spider',
      description:
        'Chart.RadarRoot with PolarGrid, PolarAngleAxis and one or more Radar series. Each row in data represents one axis spoke.',
      preview: () => <ChartRadarExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { subject: 'Speed',     alice: 80, bob: 60 },
  { subject: 'Strength',  alice: 60, bob: 90 },
  { subject: 'Endurance', alice: 70, bob: 75 },
  { subject: 'Agility',   alice: 85, bob: 55 },
  { subject: 'Skill',     alice: 90, bob: 70 },
];

<Chart.RadarRoot data={data} width={360} height={360}>
  <Chart.PolarGrid />
  <Chart.PolarAngleAxis dataKey="subject" />
  <Chart.Radar dataKey="alice" name="Alice" fillOpacity={0.25} />
  <Chart.Radar dataKey="bob" name="Bob" color="hsl(var(--chart-2))" fillOpacity={0.2} />
  <Chart.Legend />
</Chart.RadarRoot>`,
    },
    {
      title: 'Heatmap',
      description:
        'Chart.Heatmap renders a grid of colored cells. Provide xKey, yKey and valueKey to map your data. Width and height are explicit.',
      preview: () => <ChartHeatmapExample />,
      code: `import { Chart } from '@aura-ui/styled';

// data: Array<{ day: string; hour: string; count: number }>
<Chart.Heatmap
  data={data}
  xKey="day"
  yKey="hour"
  valueKey="count"
  width={500}
  height={280}
/>`,
    },
    {
      title: 'Treemap',
      description:
        'Chart.Treemap uses the squarify algorithm. Top-level items may contain a children array for nested groups. Omit children for a flat treemap.',
      preview: () => <ChartTreemapExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  {
    name: 'Equities',
    value: 4200,
    children: [
      { name: 'Tech',    value: 1800 },
      { name: 'Health',  value: 1100 },
      { name: 'Finance', value: 1300 },
    ],
  },
  { name: 'Fixed Income', value: 2800 },
  { name: 'Real Estate',  value: 1400 },
  { name: 'Commodities',  value: 800 },
];

<Chart.Treemap data={data} width={500} height={350} />`,
    },
    {
      title: 'Funnel',
      description:
        'Chart.Funnel renders a top-down funnel. Each stage needs a name and value. Stages are rendered in the order provided.',
      preview: () => <ChartFunnelExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { name: 'Visitors',  value: 10000 },
  { name: 'Leads',     value: 6500 },
  { name: 'Prospects', value: 3800 },
  { name: 'Customers', value: 1200 },
];

<Chart.Funnel data={data} width={400} height={300} />`,
    },
    {
      title: 'Gauge',
      description:
        'Chart.Gauge renders a half-circle arc gauge. Use the label prop to annotate the center. Combine multiple gauges side by side for a dashboard widget.',
      preview: () => <ChartGaugeExample />,
      code: `import { Chart } from '@aura-ui/styled';

<div className="flex gap-4">
  <Chart.Gauge value={72} min={0} max={100} width={200} height={150} label="CPU Load" />
  <Chart.Gauge value={45} min={0} max={100} width={200} height={150} label="Memory" />
  <Chart.Gauge value={88} min={0} max={100} width={200} height={150} label="Disk I/O" />
</div>`,
    },
    {
      title: 'Candlestick (OHLC)',
      description:
        'Chart.Candlestick expects data with open, high, low and close fields. Use upColor / downColor to customise bullish and bearish candle fills.',
      preview: () => <ChartCandlestickExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { date: 'Mon', open: 100, high: 115, low: 95,  close: 112 },
  { date: 'Tue', open: 112, high: 120, low: 108, close: 106 },
  { date: 'Wed', open: 106, high: 118, low: 100, close: 115 },
  { date: 'Thu', open: 115, high: 122, low: 110, close: 118 },
  { date: 'Fri', open: 118, high: 125, low: 113, close: 121 },
];

<Chart.Candlestick
  data={data}
  width={600}
  height={300}
  bullColor="hsl(var(--chart-2))"
  bearColor="hsl(var(--chart-5))"
/>`,
    },
    {
      title: 'SparkLine',
      description:
        'Chart.SparkLine is a standalone mini-chart designed to fit inside table cells, cards or KPI widgets. Use type="line" (default) or type="bar". Width and height are explicit.',
      preview: () => <ChartSparkLineExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [12, 45, 28, 60, 35, 72, 48, 55, 40, 68];

// Line sparkline
<Chart.SparkLine data={data} type="line" width={120} height={36} />

// Bar sparkline with custom color
<Chart.SparkLine data={data} type="bar" width={120} height={36} color="hsl(var(--chart-2))" />`,
    },
    {
      title: 'RangeBar',
      description:
        'Chart.RangeBar renders floating bars that span from lowKey to highKey. Use it for temperature ranges, confidence intervals or availability windows.',
      preview: () => <ChartRangeBarExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { month: 'Jan', low: 10, high: 30 },
  { month: 'Feb', low: 15, high: 45 },
  { month: 'Mar', low: 8,  high: 35 },
  { month: 'Apr', low: 20, high: 55 },
];

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.RangeBar lowKey="low" highKey="high" name="Temp range (°C)" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'ReferenceLine',
      description:
        'Chart.ReferenceLine draws a horizontal (y) or vertical (x) rule across the plot area. Use it to mark thresholds, averages or target values.',
      preview: () => <ChartReferenceLineExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Bar dataKey="revenue" name="Revenue" />
  <Chart.ReferenceLine y={6000} label="Target" stroke="hsl(var(--chart-3))" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'ReferenceArea',
      description:
        'Chart.ReferenceArea shades a rectangular region of the chart bounded by y1/y2 (or x1/x2). Combine with ReferenceLine to highlight acceptable ranges.',
      preview: () => <ChartReferenceAreaExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Bar dataKey="revenue" name="Revenue" />
  <Chart.ReferenceArea y1={5000} y2={7000} fill="#22c55e" fillOpacity={0.1} />
  <Chart.ReferenceLine y={5000} label="Min" stroke="#22c55e" strokeDasharray="4 2" />
  <Chart.ReferenceLine y={7000} label="Max" stroke="#22c55e" strokeDasharray="4 2" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Radial bar',
      description:
        'Wrap Chart.RadialBar in Chart.RadialBarRoot. Each row in data becomes a concentric arc ring. Provide dataKey for arc length and nameKey for labels.',
      preview: () => <ChartRadialBarExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { name: 'Task A', completion: 85 },
  { name: 'Task B', completion: 62 },
  { name: 'Task C', completion: 41 },
  { name: 'Task D', completion: 78 },
];

<Chart.RadialBarRoot data={data} width={360} height={360}>
  <Chart.RadialBar dataKey="completion" nameKey="name" />
</Chart.RadialBarRoot>`,
    },
    {
      title: 'Waterfall',
      description:
        'Chart.Waterfall renders a bridge / waterfall chart where each bar starts from the running total of the previous bars. Negative values are styled differently.',
      preview: () => <ChartWaterfallExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { name: 'Q1 Start',  value: 120 },
  { name: 'Sales',     value: 45  },
  { name: 'Returns',   value: -18 },
  { name: 'Marketing', value: -25 },
  { name: 'Savings',   value: 15  },
  { name: 'Q2 End',    value: 0   },
];

<Chart.Waterfall data={data} width={520} height={300} />`,
    },
    {
      title: 'Sankey',
      description:
        'Chart.Sankey visualises flow between nodes using proportional-width links. Provide a nodes array (id + optional color) and a links array (source, target, value).',
      preview: () => <ChartSankeyExample />,
      code: `import { Chart } from '@aura-ui/styled';

const nodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }];

const links = [
  { source: 'A', target: 'B', value: 30 },
  { source: 'A', target: 'C', value: 20 },
  { source: 'B', target: 'D', value: 25 },
  { source: 'C', target: 'D', value: 15 },
  { source: 'B', target: 'E', value: 5  },
  { source: 'C', target: 'E', value: 5  },
];

<Chart.Sankey nodes={nodes} links={links} width={520} height={300} />`,
    },
    {
      title: 'Pyramid',
      description:
        'Chart.Pyramid is an inverted funnel — the widest segment is at the bottom. Use it for hierarchical data or population pyramids where the largest value is the base.',
      preview: () => <ChartPyramidExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { name: 'Awareness', value: 10000 },
  { name: 'Interest',  value: 6500  },
  { name: 'Decision',  value: 3200  },
  { name: 'Action',    value: 1800  },
];

<Chart.Pyramid data={data} width={400} height={300} />`,
    },
    {
      title: 'Gantt',
      description:
        'Chart.Gantt renders a horizontal timeline where each task bar spans from start to end on a numeric time axis. Add a group field to visually cluster related tasks.',
      preview: () => <ChartGanttExample />,
      code: `import { Chart } from '@aura-ui/styled';

const tasks = [
  { id: '1', name: 'Design',      start: 0,  end: 5  },
  { id: '2', name: 'Development', start: 3,  end: 12 },
  { id: '3', name: 'Testing',     start: 10, end: 15 },
  { id: '4', name: 'Launch',      start: 14, end: 16 },
];

<Chart.Gantt tasks={tasks} width={600} height={220} />`,
    },
    {
      title: 'Histogram',
      description:
        'Chart.Histogram bins a flat array of numbers into equal-width buckets and renders them as a bar chart. Use bins to control the number of buckets.',
      preview: () => <ChartHistogramExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [14, 22, 8, 45, 31, 67, 52, 19, 73, 38, 61, 27, 84, 43, 16, 55, 29, 71, 48, 63];

<Chart.Histogram data={data} bins={8} width={520} height={300} showGrid />`,
    },
    {
      title: 'Boxplot',
      description:
        'Chart.Boxplot renders standard box-and-whisker plots. Each entry needs min, q1, median, q3 and max. Add an outliers array for individual outlier dots.',
      preview: () => <ChartBoxplotExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { name: 'Q1 Sales', min: 12, q1: 28, median: 42, q3: 58, max: 74 },
  { name: 'Q2 Sales', min: 18, q1: 35, median: 50, q3: 65, max: 80 },
  { name: 'Q3 Sales', min: 25, q1: 40, median: 55, q3: 70, max: 88 },
  { name: 'Q4 Sales', min: 30, q1: 48, median: 62, q3: 78, max: 95 },
];

<Chart.Boxplot data={data} width={520} height={300} />`,
    },
    {
      title: 'Chord diagram',
      description:
        'Chart.Chord visualises relationships between groups using a square matrix. Each cell [i][j] is the flow strength from group i to group j.',
      preview: () => <ChartChordExample />,
      code: `import { Chart } from '@aura-ui/styled';

const matrix = [
  [0,  12, 8,  5 ],
  [12, 0,  15, 3 ],
  [8,  15, 0,  10],
  [5,  3,  10, 0 ],
];

<Chart.Chord data={matrix} labels={['A', 'B', 'C', 'D']} width={400} height={400} />`,
    },
    {
      title: 'Sunburst',
      description:
        'Chart.Sunburst renders a multi-level donut chart. Pass a nested data tree — each node can have a value (leaf) or children (branch). Click a segment to zoom in.',
      preview: () => <ChartSunburstExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = {
  name: 'Root',
  children: [
    {
      name: 'Tech',
      children: [
        { name: 'Frontend', value: 800 },
        { name: 'Backend',  value: 1200 },
      ],
    },
    {
      name: 'Sales',
      children: [
        { name: 'Direct',   value: 1500 },
        { name: 'Partners', value: 900 },
      ],
    },
  ],
};

<Chart.Sunburst data={data} width={400} height={400} />`,
    },
    {
      title: 'Linear gauge',
      description:
        'Chart.LinearGauge is a horizontal progress-bar style gauge. Use colorStops to apply a traffic-light palette — each stop is [percentage, color].',
      preview: () => <ChartLinearGaugeExample />,
      code: `import { Chart } from '@aura-ui/styled';

// Traffic-light color stops: [percentageThreshold, color]
<Chart.LinearGauge
  value={85}
  showLabel
  colorStops={[
    [33, '#ef4444'],
    [66, '#f59e0b'],
    [100, '#22c55e'],
  ]}
  label="High (85%)"
/>`,
    },
    {
      title: 'Radial line',
      description:
        'Chart.RadialLineRoot + Chart.RadialLine plots data on a circular axis — useful for cyclic data like months or weekdays. Use closePath and area for a spider-web fill.',
      preview: () => <ChartRadialLineExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { month: 'Jan', value: 42 }, { month: 'Feb', value: 58 },
  { month: 'Mar', value: 35 }, { month: 'Apr', value: 71 },
  { month: 'May', value: 64 }, { month: 'Jun', value: 83 },
  { month: 'Jul', value: 91 }, { month: 'Aug', value: 76 },
];

<Chart.RadialLineRoot data={data} width={340} height={340}>
  <Chart.RadialLine dataKey="value" nameKey="month" closePath area fillOpacity={0.25} />
</Chart.RadialLineRoot>`,
    },
    {
      title: 'Range area',
      description:
        'Chart.RangeArea fills the band between a low and high series. Use it for confidence intervals, temperature ranges, or min/max envelopes.',
      preview: () => <ChartRangeAreaExample />,
      code: `import { Chart } from '@aura-ui/styled';

const data = [
  { month: 'Jan', low: 2,  high: 8  },
  { month: 'Feb', low: 4,  high: 11 },
  { month: 'Mar', low: 8,  high: 16 },
  { month: 'Apr', low: 12, high: 21 },
];

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.RangeArea lowKey="low" highKey="high" name="Temperature (°C)" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Gauge composition',
      description:
        'Compose a gauge from GaugeContainer + GaugeReferenceArc + GaugeValueArc + GaugePointer for full control over colors, thickness and pointer style.',
      preview: () => <ChartGaugeCompositionExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.GaugeContainer value={65} min={0} max={100} width={240} height={200}>
  <Chart.GaugeReferenceArc />
  <Chart.GaugeValueArc color="hsl(var(--chart-1))" />
  <Chart.GaugePointer />
</Chart.GaugeContainer>`,
    },
    {
      title: 'Semi-circle pie',
      description:
        'Restrict the arc sweep with startAngle and endAngle to produce a semi-circle pie. Any angular range is supported — not just a full 360°.',
      preview: () => <ChartSemiCirclePieExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.PieRoot data={data} width={360} height={220}>
  <Chart.Pie
    dataKey="value"
    nameKey="category"
    startAngle={-90}
    endAngle={90}
  />
  <Chart.Tooltip />
</Chart.PieRoot>`,
    },
    {
      title: 'Pie arc labels',
      description:
        'Set arcLabel="percentage" to render the percentage of total directly on each arc segment. Use arcLabelMinAngle to suppress labels on tiny slices.',
      preview: () => <ChartPieArcLabelExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.PieRoot data={data} width={360} height={360}>
  <Chart.Pie
    dataKey="value"
    nameKey="category"
    arcLabel="percentage"
    arcLabelMinAngle={10}
  />
  <Chart.Tooltip />
</Chart.PieRoot>`,
    },
    {
      title: 'Pie center label',
      description:
        'Combine a donut (innerRadius > 0) with Chart.PieCenterLabel to render arbitrary content — text, icons or KPI values — in the hollow center.',
      preview: () => <ChartPieCenterLabelExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.PieRoot data={data} width={360} height={360}>
  <Chart.Pie dataKey="value" nameKey="category" innerRadius={80} padAngle={0.02} cornerRadius={4} />
  <Chart.PieCenterLabel>
    <div className="text-center">
      <div className="text-2xl font-bold">8,300</div>
      <div className="text-xs text-muted-foreground">Total</div>
    </div>
  </Chart.PieCenterLabel>
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.PieRoot>`,
    },
    {
      title: 'Bar with labels',
      description:
        'Enable showLabel on Chart.Bar to print the value on every bar. Use labelPosition="outside" to place the label above the bar, inside to place it within.',
      preview: () => <ChartBarWithLabelsExample />,
      code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={340}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Bar dataKey="revenue" name="Revenue" showLabel labelPosition="outside" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
    },
    {
      title: 'Area fill by value',
      description:
        'Set fillByValue on Chart.Area to automatically use the chart-1 color above zero and the chart-3 color below zero — useful for P&L or delta charts.',
      preview: () => <ChartAreaFillByValueExample />,
      code: `import { Chart } from '@aura-ui/styled';

// data has negative values
<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Area dataKey="delta" name="Delta" fillByValue fillOpacity={0.4} />
  <Chart.Tooltip />
</Chart.Root>`,
    },
    {
      title: 'Funnel variants',
      description:
        'Chart.Funnel supports a variant prop (filled / outlined) and a curve prop (linear / bump / step). Combine them for different visual styles.',
      preview: () => <ChartFunnelVariantsExample />,
      code: `import { Chart } from '@aura-ui/styled';

// Outlined funnel
<Chart.Funnel data={data} width={300} height={240} variant="outlined" />

// Bump-curve funnel
<Chart.Funnel data={data} width={300} height={240} curve="bump" />`,
    },
  ],

  typography: [
    {
      title: 'Heading and body variants',
      description: 'Typography supports 24 named variants with automatic element mapping.',
      preview: () => (
        <div className="grid gap-2 w-full max-w-lg">
          <Typography variant="h1">h1 Heading</Typography>
          <Typography variant="h2">h2 Heading</Typography>
          <Typography variant="h3">h3 Heading</Typography>
          <Typography variant="h4">h4 Heading</Typography>
          <Typography variant="h5">h5 Heading</Typography>
          <Typography variant="h6">h6 Heading</Typography>
          <Typography variant="subtitle1">subtitle1 — secondary info</Typography>
          <Typography variant="subtitle2">subtitle2 — label-weight text</Typography>
          <Typography variant="body1">body1 — the default paragraph style</Typography>
          <Typography variant="body2">body2 — smaller body copy</Typography>
          <Typography variant="caption">caption — metadata and timestamps</Typography>
          <Typography variant="overline">overline — section category</Typography>
        </div>
      ),
      code: `<Typography variant="h1">h1 Heading</Typography>
<Typography variant="body1">body1 — default paragraph style</Typography>
<Typography variant="caption">caption</Typography>
<Typography variant="overline">overline</Typography>`,
    },
    {
      title: 'Semantic colors',
      description: 'Use the color prop to apply semantic text colors inline.',
      preview: () => (
        <div className="grid gap-2">
          {(['inherit', 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'disabled'] as const).map((c) => (
            <Typography key={c} variant="body1" color={c}>
              color=&quot;{c}&quot; — The quick brown fox jumps over the lazy dog.
            </Typography>
          ))}
        </div>
      ),
      code: `<Typography color="primary">Primary text</Typography>
<Typography color="success">Success text</Typography>
<Typography color="error">Error text</Typography>
<Typography color="disabled">Disabled text</Typography>`,
    },
    {
      title: 'Utility props',
      description: 'gutterBottom, noWrap, truncate, and paragraph control spacing and overflow.',
      preview: () => (
        <div className="grid gap-3 w-full max-w-sm">
          <Typography variant="h4" gutterBottom>gutterBottom adds margin below</Typography>
          <Typography variant="body1" noWrap className="max-w-xs">
            noWrap — This very long line of text will not wrap to the next line even though the container is narrow
          </Typography>
          <Typography variant="body1" truncate className="max-w-xs">
            truncate — This very long line of text will be cut off with an ellipsis when it overflows
          </Typography>
          <Typography variant="body1" paragraph>
            paragraph — Adds a bottom margin like a paragraph element would have.
          </Typography>
        </div>
      ),
      code: `<Typography variant="h4" gutterBottom>Heading with gap</Typography>
<Typography variant="body1" noWrap>Single-line overflow text</Typography>
<Typography variant="body1" truncate>Truncated text with ellipsis</Typography>`,
    },
  ],

  stat: [
    {
      title: 'KPI card group',
      description: 'StatGroup lays out Stat cards in a responsive grid. Each card shows label, value, trend and description.',
      preview: () => (
        <StatGroup columns={3} className="w-full max-w-2xl">
          <Stat
            label="Monthly Revenue"
            value="$42,800"
            trend="+12%"
            trendDirection="up"
            description="vs last month"
          />
          <Stat
            label="Active Users"
            value="3,291"
            trend="-4%"
            trendDirection="down"
            description="vs last week"
          />
          <Stat
            label="Uptime"
            value="99.9%"
            trend="stable"
            trendDirection="neutral"
            description="last 30 days"
          />
        </StatGroup>
      ),
      code: `<StatGroup columns={3}>
  <Stat
    label="Monthly Revenue"
    value="$42,800"
    trend="+12%"
    trendDirection="up"
    description="vs last month"
  />
  <Stat
    label="Active Users"
    value="3,291"
    trend="-4%"
    trendDirection="down"
    description="vs last week"
  />
</StatGroup>`,
    },
    {
      title: 'Semantic color tints',
      description: 'The color prop tints the card border and background and colors the icon.',
      preview: () => (
        <StatGroup columns={3} className="w-full max-w-2xl">
          {([
            { color: 'primary', label: 'Revenue', value: '$42,800', trend: '+12%', trendDirection: 'up' },
            { color: 'success', label: 'Uptime', value: '99.9%', trend: 'stable', trendDirection: 'neutral' },
            { color: 'error', label: 'Errors', value: '14', trend: '+3', trendDirection: 'down' },
            { color: 'warning', label: 'Warnings', value: '28', trend: '+5', trendDirection: 'down' },
            { color: 'info', label: 'Requests', value: '82k', trend: '+8%', trendDirection: 'up' },
            { color: 'secondary', label: 'Sessions', value: '1,204', trend: '+2%', trendDirection: 'up' },
          ] as const).map((s) => (
            <Stat
              key={s.color}
              label={s.label}
              value={s.value}
              trend={s.trend}
              trendDirection={s.trendDirection}
              color={s.color}
            />
          ))}
        </StatGroup>
      ),
      code: `<Stat label="Revenue" value="$42,800" trend="+12%" trendDirection="up" color="primary" />
<Stat label="Errors" value="14" trend="+3" trendDirection="down" color="error" />
<Stat label="Uptime" value="99.9%" trend="stable" trendDirection="neutral" color="success" />`,
    },
  ],

  popconfirm: [
    {
      title: 'Delete confirmation',
      description: 'Popconfirm wraps any trigger and shows an inline confirmation before a destructive action.',
      preview: () => (
        <div className="flex flex-wrap gap-3">
          <Popconfirm
            title="Delete this record?"
            description="This action cannot be undone."
            confirmLabel="Delete"
            confirmVariant="contained"
            confirmColor="error"
            onConfirm={() => {}}
          >
            <Button variant="destructive" size="sm">Delete record</Button>
          </Popconfirm>
          <Popconfirm
            title="Archive project?"
            confirmLabel="Archive"
            onConfirm={() => {}}
          >
            <Button variant="outline" size="sm">Archive</Button>
          </Popconfirm>
        </div>
      ),
      code: `<Popconfirm
  title="Delete this record?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  confirmVariant="contained"
  confirmColor="error"
  onConfirm={handleDelete}
>
  <Button variant="destructive">Delete record</Button>
</Popconfirm>`,
    },
    {
      title: 'Positioning',
      description: 'Use side and align props to control where the confirmation popover appears.',
      preview: () => (
        <div className="flex flex-wrap gap-3">
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <Popconfirm
              key={side}
              title={`Confirm (${side})?`}
              side={side}
              onConfirm={() => {}}
            >
              <Button variant="outline" size="sm">{side}</Button>
            </Popconfirm>
          ))}
        </div>
      ),
      code: `<Popconfirm title="Confirm?" side="right" onConfirm={handleConfirm}>
  <Button>Right side</Button>
</Popconfirm>`,
    },
  ],
};
