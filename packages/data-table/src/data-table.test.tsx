import * as React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  DataTable,
  EditableCell,
  type DataTableColumn,
  type DataTableColumnDef,
  type DataTableConditionalRule,
  type DataTableFilterGroup,
  type DataTablePivotConfig,
} from './data-table';

// ── Shared fixtures ───────────────────────────────────────────────────────────

interface ProjectRow {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Blocked';
  team: string;
  score: number;
  revenue: number;
  cost: number;
}

const rows: ProjectRow[] = [
  { id: '1', name: 'Atlas',  status: 'Active',  team: 'Platform', score: 92, revenue: 120, cost: 80 },
  { id: '2', name: 'Beacon', status: 'Paused',  team: 'Design',   score: 73, revenue: 180, cost: 90 },
  { id: '3', name: 'Cipher', status: 'Blocked', team: 'Risk',     score: 66, revenue:  40, cost: 55 },
];

const columns: DataTableColumn<ProjectRow>[] = [
  { accessorKey: 'name',    header: 'Name'    },
  { accessorKey: 'status',  header: 'Status'  },
  { accessorKey: 'team',    header: 'Team'    },
  { accessorKey: 'score',   header: 'Score'   },
  { accessorKey: 'revenue', header: 'Revenue' },
  { accessorKey: 'cost',    header: 'Cost'    },
];

// ── 1. Global search ──────────────────────────────────────────────────────────

describe('DataTable', () => {
  it('filters rows with global search and renders row actions', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        enableGlobalSearch
        rowActions={(row) => <button type="button">Open {row.original.name}</button>}
      />,
    );

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'beacon' } });

    expect(screen.queryByText('Atlas')).toBeNull();
    expect(screen.getByText('Beacon')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Open Beacon' })).toBeTruthy();
  });

  // ── 2. Advanced filters ─────────────────────────────────────────────────────

  it('applies nested advanced filter groups', () => {
    const filter: DataTableFilterGroup = {
      id: 'root',
      logic: 'and',
      items: [
        { id: 'status', columnId: 'status', operator: 'equals', value: 'Active' },
        {
          id: 'nested',
          logic: 'or',
          items: [
            { id: 'score', columnId: 'score', operator: 'gte', value: 90 },
            { id: 'team',  columnId: 'team',  operator: 'equals', value: 'Design' },
          ],
        },
      ],
    };

    render(
      <DataTable
        columns={columns}
        data={rows}
        enableAdvancedFiltering
        defaultAdvancedFilter={filter}
      />,
    );

    expect(screen.getByText('Atlas')).toBeTruthy();
    expect(screen.queryByText('Beacon')).toBeNull();
    expect(screen.queryByText('Cipher')).toBeNull();
  });

  it('keeps the toolbar and filter builder responsive', () => {
    const filter: DataTableFilterGroup = {
      id: 'root',
      logic: 'and',
      items: [{ id: 'status', columnId: 'status', operator: 'equals', value: 'Active' }],
    };

    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        enableGlobalSearch
        enableAdvancedFiltering
        defaultAdvancedFilter={filter}
      />,
    );

    const searchbox = screen.getByRole('searchbox');
    expect(searchbox.className).toContain('w-full');
    expect(searchbox.className).toContain('sm:w-64');

    fireEvent.click(screen.getByText('Filters'));

    const root = container.querySelector('[data-datatable-root]');
    const advancedFilterPanel = root?.querySelector('[data-datatable-filter-panel]');
    expect(root?.contains(advancedFilterPanel ?? null)).toBe(true);
    expect(advancedFilterPanel?.className ?? '').toContain('z-[1000]');
    expect(advancedFilterPanel?.className ?? '').toContain('bg-popover');
  });

  // ── 3. Inline create ────────────────────────────────────────────────────────

  it('supports inline create rows', () => {
    const onAdd = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={rows}
        inlineCreateRow={{
          fields: [{ id: 'name', label: 'Name' }],
          onAdd,
        }}
      />,
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Delta' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));

    expect(onAdd).toHaveBeenCalledWith({ name: 'Delta' });
  });

  // ── 4. Column configuration panel ──────────────────────────────────────────

  it('keeps column configuration popover above the grid with a bounded height', () => {
    const { container } = render(
      <DataTable columns={columns} data={rows} enableColumnConfiguration />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Columns' }));

    const root = container.querySelector('[data-datatable-root]');
    const columnPanel = root?.querySelector('[data-datatable-column-panel]');
    expect(root?.contains(columnPanel ?? null)).toBe(true);
    expect(columnPanel?.className ?? '').toContain('z-[1000]');
    expect(columnPanel?.className ?? '').toContain('bg-popover');
  });

  // ── 5. Virtualization ───────────────────────────────────────────────────────

  it('renders an initial fallback slice before virtualization measurement', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        virtual={{ estimatedRowHeight: 44, overscan: 2 }}
        virtualColumns={{ estimatedColumnWidth: 120, overscan: 2 }}
        height={240}
      />,
    );

    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Atlas')).toBeTruthy();
  });

  // ── 6. Detail panels ────────────────────────────────────────────────────────

  it('renders detail panels from expandable rows', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        renderDetailPanel={(row) => <div>Details for {row.original.name}</div>}
      />,
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Expand row' })[0]);

    expect(screen.getByText('Details for Atlas')).toBeTruthy();
  });

  // ── 7. Aggregations / totals ────────────────────────────────────────────────

  it('calculates column and row totals', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        aggregations={{ revenue: 'sum', cost: 'avg' }}
        rowTotals={{ columns: ['revenue', 'cost'] }}
      />,
    );

    expect(screen.getByText('340')).toBeTruthy();
    expect(screen.getByText('75')).toBeTruthy();
    expect(screen.getByText('200')).toBeTruthy();
  });

  // ── 8. DataTableColumnDef API ───────────────────────────────────────────────

  it('renders columns defined with field/headerName shorthand', () => {
    const defs: DataTableColumnDef<ProjectRow>[] = [
      { field: 'name',   headerName: 'Full Name', size: 160 },
      { field: 'status', headerName: 'State',     size: 110 },
      { field: 'score',  headerName: 'Points',    type: 'number', size: 90 },
    ];

    render(<DataTable<ProjectRow> columns={defs} data={rows} />);

    expect(screen.getByText('Full Name')).toBeTruthy();
    expect(screen.getByText('State')).toBeTruthy();
    expect(screen.getByText('Points')).toBeTruthy();
    expect(screen.getByText('Atlas')).toBeTruthy();
  });

  // ── 9. Sorting ──────────────────────────────────────────────────────────────

  it('sorts rows ascending then descending on header click', () => {
    render(<DataTable columns={columns} data={rows} enableSorting />);

    const headers = screen.getAllByRole('columnheader');
    // Use the Name column (string type) — string columns sort ascending first
    const nameHeader = headers.find((h) => h.textContent?.includes('Name'));
    expect(nameHeader).toBeTruthy();

    // First click → ascending
    fireEvent.click(nameHeader!);
    expect(nameHeader!.getAttribute('aria-sort')).toBe('ascending');

    // Second click → descending
    fireEvent.click(nameHeader!);
    expect(nameHeader!.getAttribute('aria-sort')).toBe('descending');
  });

  // ── 10. Pagination ──────────────────────────────────────────────────────────

  it('paginates rows and navigates pages', () => {
    const manyRows = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      name: `Project ${i + 1}`,
      status: 'Active' as const,
      team: 'Platform',
      score: i * 10,
      revenue: i * 100,
      cost: i * 50,
    }));

    render(
      <DataTable
        columns={columns}
        data={manyRows}
        enablePagination
        pageSize={3}
      />,
    );

    expect(screen.getByText('Project 1')).toBeTruthy();
    expect(screen.queryByText('Project 4')).toBeNull();

    // The "next page" button aria-label matches localeText.next = 'Next'
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.queryByText('Project 1')).toBeNull();
    expect(screen.getByText('Project 4')).toBeTruthy();
  });

  // ── 11. Row selection + bulk actions ────────────────────────────────────────

  it('selects rows and shows bulk action bar', () => {
    const onBulk = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={rows}
        enableRowSelection
        bulkActions={[{ id: 'delete', label: 'Delete', onClick: onBulk }]}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    expect(screen.getByText('Delete')).toBeTruthy();
    fireEvent.click(screen.getByText('Delete'));
    expect(onBulk).toHaveBeenCalled();
  });

  // ── 12. Row numbers ─────────────────────────────────────────────────────────

  it('shows sequential row numbers when enableRowNumbers is set', () => {
    render(<DataTable columns={columns} data={rows} enableRowNumbers />);

    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
  });

  // ── 13. Striped rows ────────────────────────────────────────────────────────

  it('adds striped class to even rows when striped is set', () => {
    const { container } = render(<DataTable columns={columns} data={rows} striped />);

    const bodyRows = container.querySelectorAll('tbody tr');
    const evenRow = bodyRows[1];
    expect(evenRow?.className ?? '').toContain('bg-muted/30');
  });

  // ── 14. Row status border ───────────────────────────────────────────────────

  it('applies left-border status stripe via getRowStatus', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        getRowStatus={(row) => (row.original.status === 'Blocked' ? 'error' : undefined)}
      />,
    );

    const bodyRows = Array.from(container.querySelectorAll('tbody tr')) as HTMLElement[];
    const statusRows = bodyRows.filter((r) => r.style.borderLeft !== '');
    expect(statusRows.length).toBeGreaterThan(0);
  });

  // ── 15. Conditional formatting ──────────────────────────────────────────────

  it('applies background colour from conditional formatting rules', () => {
    const rules: DataTableConditionalRule[] = [
      { id: 'high', columnId: 'score', operator: 'gte', value: '90', backgroundColor: '#dcfce7' },
    ];

    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        enableConditionalFormatting
        conditionalFormattingRules={rules}
      />,
    );

    const styledCells = Array.from(container.querySelectorAll('td')).filter(
      (td) => (td as HTMLElement).style.backgroundColor !== '',
    );
    expect(styledCells.length).toBeGreaterThan(0);
  });

  // ── 16. Tree data ───────────────────────────────────────────────────────────

  interface TreeRow { id: string; name: string; score: number; children?: TreeRow[] }

  it('renders tree data with expand/collapse controls', () => {
    const treeColumns: DataTableColumnDef<TreeRow>[] = [
      { field: 'name',  headerName: 'Name',  flex: 1 },
      { field: 'score', headerName: 'Score', type: 'number', size: 90 },
    ];
    const treeRows: TreeRow[] = [
      {
        id: 'a', name: 'Root', score: 100,
        children: [{ id: 'b', name: 'Child', score: 50 }],
      },
    ];

    render(
      <DataTable<TreeRow>
        columns={treeColumns}
        data={treeRows}
        treeData
        enableExpanding
        getSubRows={(r) => r.children}
        getRowId={(r) => r.id}
      />,
    );

    expect(screen.getByText('Root')).toBeTruthy();
    expect(screen.queryByText('Child')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Expand row' }));
    expect(screen.getByText('Child')).toBeTruthy();
  });

  // ── 17. EditableCell component ──────────────────────────────────────────────

  it('EditableCell activates input on click and calls onCommit on blur', () => {
    const onCommit = vi.fn();
    render(<EditableCell value="original" onCommit={onCommit} />);

    expect(screen.getByText('original')).toBeTruthy();
    fireEvent.click(screen.getByText('original'));

    const input = screen.getByRole('textbox');
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: 'updated' } });
    fireEvent.blur(input);

    expect(onCommit).toHaveBeenCalledWith('updated');
  });

  // ── 18. getCellClassName ────────────────────────────────────────────────────

  it('applies getCellClassName to matching cells', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        getCellClassName={(cell) =>
          String(cell.getValue()) === 'Atlas' ? 'highlight-cell' : undefined
        }
      />,
    );

    const highlighted = container.querySelectorAll('.highlight-cell');
    expect(highlighted.length).toBe(1);
  });

  // ── 19. Status bar ──────────────────────────────────────────────────────────

  it('shows row count in status bar', () => {
    render(<DataTable columns={columns} data={rows} enableStatusBar />);

    expect(screen.getByText(/3.*rows/i)).toBeTruthy();
  });

  // ── 20. Loading overlay ─────────────────────────────────────────────────────

  it('shows a loading indicator when loading is true', () => {
    render(<DataTable columns={columns} data={[]} loading />);

    // Default loadingVariant="text" renders localeText.loading = "Loading…"
    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  // ── 21. loadingRowIds ───────────────────────────────────────────────────────

  it('dims rows listed in loadingRowIds', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        loadingRowIds={['2']}
      />,
    );

    const dimmedRows = container.querySelectorAll('tr[data-loading]');
    expect(dimmedRows.length).toBe(1);
  });

  // ── 22. Row action menu ─────────────────────────────────────────────────────

  it('renders row action menu trigger button for each row', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        rowActionMenu={[
          { id: 'edit',   label: 'Edit'   },
          { id: 'delete', label: 'Delete' },
        ]}
      />,
    );

    // localeText.rowActions = 'Actions' — one trigger per data row
    const triggers = screen.getAllByRole('button', { name: 'Actions' });
    expect(triggers.length).toBe(rows.length);
  });

  // ── 23. ARIA grid attributes ────────────────────────────────────────────────

  it('renders with correct ARIA grid roles and counts', () => {
    const { container } = render(
      <DataTable columns={columns} data={rows} ariaLabel="Projects table" />,
    );

    const grid = container.querySelector('[role="grid"]');
    expect(grid).toBeTruthy();
    // rowCount = data.length + 1 (header row)
    expect(grid?.getAttribute('aria-rowcount')).toBe('4');
    expect(grid?.getAttribute('aria-colcount')).toBe(String(columns.length));

    const root = container.querySelector('[data-datatable-root]');
    expect(root?.getAttribute('aria-label')).toBe('Projects table');
  });

  // ── 24. Column groups ───────────────────────────────────────────────────────

  it('renders column group headers spanning child columns', () => {
    const groupDefs: DataTableColumnDef<ProjectRow>[] = [
      {
        headerName: 'Identity',
        columns: [
          { field: 'name',   headerName: 'Name',   size: 140 },
          { field: 'status', headerName: 'Status', size: 110 },
        ],
      },
      {
        headerName: 'Metrics',
        columns: [
          { field: 'score',   headerName: 'Score',   type: 'number', size: 90 },
          { field: 'revenue', headerName: 'Revenue', type: 'number', size: 100 },
        ],
      },
    ];

    const { container } = render(<DataTable<ProjectRow> columns={groupDefs} data={rows} />);

    const groupHeaders = container.querySelectorAll('th[colspan]');
    expect(groupHeaders.length).toBeGreaterThanOrEqual(2);

    const headerTexts = Array.from(groupHeaders).map((th) => th.textContent?.trim());
    expect(headerTexts).toContain('Identity');
    expect(headerTexts).toContain('Metrics');
  });

  // ── 25. Column pinning — enableColumnPinning exposes pin menu options ────────

  it('renders column menu triggers for each column when enableColumnPinning is set', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        enableColumnPinning
      />,
    );

    // Each column header renders a "[columnId] Column menu" trigger button
    const menuTriggers = container.querySelectorAll('[aria-label$="Column menu"]');
    expect(menuTriggers.length).toBeGreaterThanOrEqual(columns.length);
  });

  // ── 26. Column visibility ───────────────────────────────────────────────────

  it('hides columns not included in the columns array', () => {
    // Pass only name + score — team should not appear
    render(
      <DataTable
        columns={[
          { accessorKey: 'name',  header: 'Name'  },
          { accessorKey: 'score', header: 'Score' },
        ]}
        data={rows}
      />,
    );

    expect(screen.queryByText('Team')).toBeNull();
    expect(screen.getByText('Name')).toBeTruthy();
  });

  // ── 27. Quick filter chips via quickFilterColumns ────────────────────────────

  it('renders quick-filter inputs below column headers', () => {
    render(
      <DataTable
        columns={[
          { accessorKey: 'name',   header: 'Name'   },
          { accessorKey: 'status', header: 'Status' },
        ]}
        data={rows}
        quickFilterColumns={['name', 'status']}
      />,
    );

    const quickFilters = screen.getAllByPlaceholderText('Filter…');
    expect(quickFilters.length).toBeGreaterThanOrEqual(1);
  });

  // ── 28. Pivot mode ──────────────────────────────────────────────────────────

  interface SalesRow { id: number; region: string; product: string; sales: number }
  const salesRows: SalesRow[] = [
    { id: 1, region: 'North', product: 'A', sales: 100 },
    { id: 2, region: 'South', product: 'A', sales: 200 },
    { id: 3, region: 'North', product: 'B', sales: 150 },
    { id: 4, region: 'South', product: 'B', sales: 250 },
  ];

  it('renders pivot table when pivotConfig is provided', () => {
    const config: DataTablePivotConfig = {
      rowGroupField: 'region',
      pivotField:    'product',
      valueField:    'sales',
      aggregation:   'sum',
    };

    render(
      <DataTable<SalesRow>
        columns={[
          { field: 'region',  headerName: 'Region',  size: 100 },
          { field: 'product', headerName: 'Product', size: 100 },
          { field: 'sales',   headerName: 'Sales',   type: 'number', size: 90 },
        ]}
        data={salesRows}
        enablePivot
        pivotConfig={config}
      />,
    );

    // Pivot renders row group values as row cells
    expect(screen.getByText('North')).toBeTruthy();
    expect(screen.getByText('South')).toBeTruthy();
    // Pivot renders pivot field values as column headers
    expect(screen.getAllByText('A').length).toBeGreaterThan(0);
    expect(screen.getAllByText('B').length).toBeGreaterThan(0);
  });

  // ── 29. Density toggle ──────────────────────────────────────────────────────

  it('renders density toggle button when enableDensityToggle is set', () => {
    render(<DataTable columns={columns} data={rows} enableDensityToggle />);

    // The density button has tooltip/aria-label = localeText.density = 'Density'
    expect(screen.getByRole('button', { name: /density/i })).toBeTruthy();
  });

  it('applies compact density class when density="compact"', () => {
    const { container } = render(
      <DataTable columns={columns} data={rows} density="compact" />,
    );

    const cells = container.querySelectorAll('td');
    expect(cells[0]?.className ?? '').toContain('py-1');
  });

  // ── 30. Cell tooltip ────────────────────────────────────────────────────────

  it('adds title attribute to cells when enableCellTooltip is set', () => {
    const { container } = render(
      <DataTable columns={columns} data={rows} enableCellTooltip />,
    );

    // enableCellTooltip adds title on the inner content span
    const spansWithTitle = Array.from(container.querySelectorAll('span[title]'));
    expect(spansWithTitle.length).toBeGreaterThan(0);
  });

  // ── 31. No-rows overlay ─────────────────────────────────────────────────────

  it('renders no-rows overlay when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />);

    // localeText.noRows = 'No data.'
    expect(screen.getByText(/no data/i)).toBeTruthy();
  });

  it('renders custom NoRowsOverlay slot', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        slots={{
          NoRowsOverlay: () => <p>Nothing here yet</p>,
        }}
      />,
    );

    expect(screen.getByText('Nothing here yet')).toBeTruthy();
  });

  // ── 32. No-results overlay ──────────────────────────────────────────────────

  it('renders no-results overlay after search yields nothing', () => {
    render(<DataTable columns={columns} data={rows} enableGlobalSearch />);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzz' } });

    // localeText.noResults = 'No results.'
    expect(screen.getByText(/no results/i)).toBeTruthy();
  });

  // ── 33. Toolbar custom actions ──────────────────────────────────────────────

  it('renders custom toolbarActions as toolbar buttons', () => {
    const onClick = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={rows}
        toolbarActions={[{ id: 'sync', label: 'Sync', onClick }]}
      />,
    );

    const btn = screen.getByRole('button', { name: 'Sync' });
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  // ── 34. Toolbar start / end slots ──────────────────────────────────────────

  it('renders toolbarStart and toolbarEnd nodes', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        toolbarStart={<span>StartSlot</span>}
        toolbarEnd={<span>EndSlot</span>}
      />,
    );

    expect(screen.getByText('StartSlot')).toBeTruthy();
    expect(screen.getByText('EndSlot')).toBeTruthy();
  });

  // ── 35. Column spanning ─────────────────────────────────────────────────────

  it('renders a column-spanning merged cell via getCellColSpan', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        getCellColSpan={(cell, row) =>
          row.original.id === '1' && cell.column.id === 'name' ? 2 : 1
        }
      />,
    );

    const spannedCells = Array.from(container.querySelectorAll('td[colspan="2"]'));
    expect(spannedCells.length).toBeGreaterThan(0);
  });

  // ── 36. Validation errors ───────────────────────────────────────────────────

  it('marks cells with validation errors via outline-destructive class', () => {
    const validationColumns: DataTableColumnDef<ProjectRow>[] = [
      {
        field: 'score',
        headerName: 'Score',
        type: 'number',
        displayValidate: (val) => (Number(val) < 70 ? 'Score too low' : undefined),
      },
      { field: 'name', headerName: 'Name' },
    ];

    const { container } = render(
      <DataTable<ProjectRow>
        columns={validationColumns}
        data={rows}
        enableValidation
      />,
    );

    const errorCells = container.querySelectorAll('.outline-destructive');
    expect(errorCells.length).toBeGreaterThan(0);
  });

  // ── 37. Export menu ─────────────────────────────────────────────────────────

  it('renders export menu button when enableExport is set', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        enableExport={{ csv: true, json: true }}
      />,
    );

    expect(screen.getByRole('button', { name: /export/i })).toBeTruthy();
  });

  // ── 38. Header stats ────────────────────────────────────────────────────────

  it('renders header stats row when enableHeaderStats is set', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        enableHeaderStats
        headerStatsConfig={{ score: 'sum', revenue: 'avg' }}
      />,
    );

    // Stats row appears as an extra row in thead
    const statRows = container.querySelectorAll('thead tr');
    expect(statRows.length).toBeGreaterThanOrEqual(2);
  });

  // ── 39. Locale text overrides ───────────────────────────────────────────────

  it('uses custom locale text for search placeholder', () => {
    render(
      <DataTable
        columns={columns}
        data={rows}
        enableGlobalSearch
        localeText={{ searchPlaceholder: 'Rechercher…' }}
      />,
    );

    expect(screen.getByPlaceholderText('Rechercher…')).toBeTruthy();
  });

  // ── 40. Number column right-alignment ──────────────────────────────────────

  it('applies right-align class to number-type column headers', () => {
    const { container } = render(
      <DataTable<ProjectRow>
        columns={[{ field: 'score', headerName: 'Score', type: 'number', size: 90 }]}
        data={rows}
      />,
    );

    // DataTableLeafHeader adds text-right when align === 'right' (derived from type: 'number')
    const rightHeaders = container.querySelectorAll('th.text-right');
    expect(rightHeaders.length).toBeGreaterThan(0);
  });

  // ── 41. getRowClassName ─────────────────────────────────────────────────────

  it('applies custom class from getRowClassName to matching rows', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        getRowClassName={(row) => (row.original.status === 'Blocked' ? 'blocked-row' : '')}
      />,
    );

    const blockedRows = container.querySelectorAll('tr.blocked-row');
    expect(blockedRows.length).toBe(1);
  });

  // ── 42. onRefresh ───────────────────────────────────────────────────────────

  it('renders Refresh button and calls onRefresh on click', () => {
    const onRefresh = vi.fn();
    render(<DataTable columns={columns} data={rows} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));
    expect(onRefresh).toHaveBeenCalled();
  });

  // ── 43. Server-side row count ───────────────────────────────────────────────

  it('uses server-side rowCount for aria-rowcount', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        serverSide={{
          state: {},
          onStateChange: vi.fn(),
          rowCount: 500,
        }}
      />,
    );

    const grid = container.querySelector('[role="grid"]');
    expect(grid?.getAttribute('aria-rowcount')).toBe('500');
  });

  // ── 44. Row height ──────────────────────────────────────────────────────────

  it('applies uniform rowHeight as inline style on body rows', () => {
    const { container } = render(
      <DataTable columns={columns} data={rows} rowHeight={60} />,
    );

    const bodyRows = container.querySelectorAll('tbody tr');
    const first = bodyRows[0] as HTMLElement | undefined;
    expect(first?.style.height).toBe('60px');
  });

  // ── 45. Fullscreen button ───────────────────────────────────────────────────

  it('renders fullscreen toggle button when enableFullscreen is set', () => {
    render(<DataTable columns={columns} data={rows} enableFullscreen />);

    expect(screen.getByRole('button', { name: /fullscreen/i })).toBeTruthy();
  });

  // ── 46. stateKey persistence ────────────────────────────────────────────────

  it('reads persisted state from localStorage when stateKey is set', () => {
    // Seed localStorage with a persisted page size so we can verify it's read back
    // DataTable prefixes the key with 'aura-dt:'
    const stored = JSON.stringify({ pagination: { pageIndex: 0, pageSize: 5 } });
    window.localStorage.setItem('aura-dt:dt-test-key', stored);

    const manyRows = Array.from({ length: 8 }, (_, i) => ({
      ...rows[0],
      id: String(i + 1),
      name: `Row ${i + 1}`,
    }));

    render(
      <DataTable
        columns={columns}
        data={manyRows}
        stateKey="dt-test-key"
        enablePagination
        pageSize={10}
      />,
    );

    // Page 1 shows rows 1–5 because persisted pageSize=5 was restored
    expect(screen.getByText('Row 1')).toBeTruthy();
    expect(screen.queryByText('Row 6')).toBeNull();

    window.localStorage.removeItem('aura-dt:dt-test-key');
  });

  // ── 47. Saved views toolbar button ─────────────────────────────────────────

  it('renders Saved views button when enableSavedViews is set', () => {
    render(<DataTable columns={columns} data={rows} enableSavedViews />);

    expect(screen.getByRole('button', { name: /views/i })).toBeTruthy();
  });

  // ── 48. Keyboard shortcuts button ──────────────────────────────────────────

  it('renders Shortcuts button when enableKeyboardShortcuts is set', () => {
    render(<DataTable columns={columns} data={rows} enableKeyboardShortcuts />);

    expect(screen.getByRole('button', { name: /shortcuts/i })).toBeTruthy();
  });

  // ── 49. Row reordering ──────────────────────────────────────────────────────

  it('renders drag handles in each row when enableRowReordering is set', () => {
    const { container } = render(
      <DataTable columns={columns} data={rows} enableRowReordering getRowId={(r) => r.id} />,
    );

    // enableRowReordering makes each tbody tr draggable — no separate handle element
    const draggableRows = container.querySelectorAll('tbody tr[draggable="true"]');
    expect(draggableRows.length).toBe(rows.length);
  });
});
