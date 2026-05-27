import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect } from 'storybook/test';
import { DataTable } from './index';
import type { DataTableColumnDef } from './index';

const meta: Meta = {
  title: 'DataTable',
  tags: ['ai-generated'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// ── Sample data ──────────────────────────────────────────────────────────────

type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  salary: number;
  startDate: string;
  performance: number;
};

const employees: Employee[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', role: 'Senior Engineer', status: 'active', salary: 120000, startDate: '2021-03-15', performance: 92 },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', department: 'Design', role: 'UX Designer', status: 'active', salary: 95000, startDate: '2020-07-01', performance: 87 },
  { id: '3', name: 'Carol White', email: 'carol@example.com', department: 'Marketing', role: 'Marketing Lead', status: 'inactive', salary: 88000, startDate: '2019-11-20', performance: 74 },
  { id: '4', name: 'David Brown', email: 'david@example.com', department: 'Engineering', role: 'Junior Engineer', status: 'pending', salary: 75000, startDate: '2023-01-10', performance: 68 },
  { id: '5', name: 'Eva Martinez', email: 'eva@example.com', department: 'Sales', role: 'Account Executive', status: 'active', salary: 82000, startDate: '2022-05-22', performance: 95 },
  { id: '6', name: 'Frank Lee', email: 'frank@example.com', department: 'Engineering', role: 'Staff Engineer', status: 'active', salary: 145000, startDate: '2018-09-01', performance: 98 },
  { id: '7', name: 'Grace Kim', email: 'grace@example.com', department: 'HR', role: 'HR Manager', status: 'active', salary: 91000, startDate: '2020-02-14', performance: 83 },
  { id: '8', name: 'Henry Chen', email: 'henry@example.com', department: 'Finance', role: 'Financial Analyst', status: 'active', salary: 98000, startDate: '2021-08-30', performance: 79 },
  { id: '9', name: 'Iris Patel', email: 'iris@example.com', department: 'Design', role: 'Visual Designer', status: 'inactive', salary: 78000, startDate: '2022-11-05', performance: 71 },
  { id: '10', name: 'Jack Wilson', email: 'jack@example.com', department: 'Sales', role: 'Sales Director', status: 'active', salary: 155000, startDate: '2017-04-18', performance: 91 },
  { id: '11', name: 'Kate Turner', email: 'kate@example.com', department: 'Engineering', role: 'QA Engineer', status: 'active', salary: 84000, startDate: '2021-06-07', performance: 85 },
  { id: '12', name: 'Liam Foster', email: 'liam@example.com', department: 'Marketing', role: 'Content Writer', status: 'pending', salary: 62000, startDate: '2023-03-20', performance: 72 },
];

const columns: DataTableColumnDef<Employee>[] = [
  { field: 'name', headerName: 'Name', size: 180 },
  { field: 'email', headerName: 'Email', size: 220 },
  { field: 'department', headerName: 'Department', size: 140 },
  { field: 'role', headerName: 'Role', size: 180 },
  {
    field: 'status',
    headerName: 'Status',
    size: 110,
    type: 'badge',
    badgeMap: {
      active: { label: 'Active', color: '#16a34a', textColor: '#fff' },
      inactive: { label: 'Inactive', color: '#dc2626', textColor: '#fff' },
      pending: { label: 'Pending', color: '#d97706', textColor: '#fff' },
    },
  },
  { field: 'salary', headerName: 'Salary', size: 120, type: 'currency', currencyCode: 'USD' },
  { field: 'startDate', headerName: 'Start Date', size: 130, type: 'date' },
  { field: 'performance', headerName: 'Performance', size: 140, type: 'progress', progressMax: 100 },
];

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('grid')).toBeInTheDocument();
    await expect(canvas.getAllByRole('row').length).toBeGreaterThan(1);
  },
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
    />
  ),
};

export const WithPagination: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enablePagination
      pageSize={5}
      pageSizeOptions={[5, 10]}
      showTotalRows
    />
  ),
};

export const WithGlobalSearch: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enableGlobalSearch
      enablePagination
      pageSize={5}
    />
  ),
};

export const WithRowSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Record<string, boolean>>({});
    const count = Object.keys(selected).length;
    return (
      <div className="flex flex-col gap-3">
        {count > 0 && (
          <p className="text-sm text-muted-foreground">
            {count} row{count > 1 ? 's' : ''} selected
          </p>
        )}
        <DataTable
          columns={columns}
          data={employees}
          enableSorting
          enableRowSelection
          onRowSelectionChange={setSelected}
          enablePagination
          pageSize={6}
        />
      </div>
    );
  },
};

export const WithColumnResizing: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enableColumnResizing
      enableColumnReordering
      enableColumnPinning
      enableColumnConfiguration
    />
  ),
};

export const WithRowActions: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enablePagination
      pageSize={6}
      rowActionMenu={[
        {
          id: 'view',
          label: 'View details',
          onClick: (row) => alert(`Viewing: ${row.original.name}`),
        },
        {
          id: 'edit',
          label: 'Edit',
          onClick: (row) => alert(`Editing: ${row.original.name}`),
        },
        {
          id: 'delete',
          label: 'Delete',
          variant: 'destructive',
          separator: true,
          onClick: (row) => alert(`Deleting: ${row.original.name}`),
        },
      ]}
    />
  ),
};

export const LoadingState: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      loading
      loadingVariant="skeleton"
      skeletonRows={6}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyState={
        <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
          <span className="text-4xl">📭</span>
          <p className="text-sm font-medium">No employees found</p>
          <p className="text-xs">Try adjusting your filters or adding new records.</p>
        </div>
      }
    />
  ),
};

export const WithBulkActions: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enableRowSelection
      enablePagination
      pageSize={6}
      bulkActions={[
        {
          id: 'export',
          label: 'Export selected',
          onClick: (rows) => alert(`Exporting ${rows.length} rows`),
        },
        {
          id: 'deactivate',
          label: 'Deactivate',
          variant: 'destructive',
          onClick: (rows) => alert(`Deactivating ${rows.length} rows`),
        },
      ]}
    />
  ),
};

export const WithDensityToggle: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enableDensityToggle
      defaultDensity="standard"
      enablePagination
      pageSize={6}
    />
  ),
};

export const WithRowNumbers: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enableRowNumbers
      striped
      enablePagination
      pageSize={6}
    />
  ),
};

export const WithStatusIndicators: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enablePagination
      pageSize={6}
      getRowStatus={(row) => {
        if (row.original.status === 'active' && row.original.performance >= 90) return 'success';
        if (row.original.status === 'pending') return 'warning';
        if (row.original.status === 'inactive') return 'error';
        return undefined;
      }}
    />
  ),
};

export const KitchenSink: Story = {
  name: 'Kitchen Sink (all features)',
  render: () => (
    <DataTable
      columns={columns}
      data={employees}
      enableSorting
      enableGlobalSearch
      enablePagination
      pageSize={5}
      pageSizeOptions={[5, 10, 25]}
      enableRowSelection
      enableColumnResizing
      enableColumnReordering
      enableColumnPinning
      enableColumnConfiguration
      enableDensityToggle
      enableRowNumbers
      striped
      showTotalRows
      enableStatusBar
      enableExport={{ csv: true, json: true }}
      rowActionMenu={[
        { id: 'view', label: 'View', onClick: () => {} },
        { id: 'edit', label: 'Edit', onClick: () => {} },
        { id: 'delete', label: 'Delete', variant: 'destructive', separator: true, onClick: () => {} },
      ]}
      bulkActions={[
        { id: 'export', label: 'Export selected', onClick: () => {} },
      ]}
      getRowStatus={(row) => {
        if (row.original.performance >= 90) return 'success';
        if (row.original.status === 'pending') return 'warning';
        if (row.original.status === 'inactive') return 'error';
        return undefined;
      }}
    />
  ),
};
