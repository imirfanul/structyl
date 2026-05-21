import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type DataTableColumn } from '@your-lib/data-table';

type User = { id: number; name: string; email: string; role: string };
const data: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Admin' },
  { id: 4, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Viewer' },
  { id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Admin' },
];
const columns: DataTableColumn<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Data/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;
export const Default: Story = { args: { columns, data, enableSorting: true } };
export const Paginated: Story = { args: { columns, data, enableSorting: true, enablePagination: true, pageSize: 3 } };
export const Selectable: Story = { args: { columns, data, enableSorting: true, enableRowSelection: true } };
export const Virtualized: Story = {
  args: {
    columns,
    data: Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3]!,
    })),
    virtual: true,
  },
};
