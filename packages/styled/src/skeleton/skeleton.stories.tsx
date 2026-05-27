import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Skeleton } from './index';

const meta = {
  title: 'Styled/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'h-4 w-48 rounded',
  },
};

export const TextLines: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-4 w-3/4 rounded" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-3 w-24 rounded" />
      </div>
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="border-border w-72 rounded-lg border p-4">
      <Skeleton className="mb-4 h-36 w-full rounded-md" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-5/6 rounded" />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-3.5 w-28 rounded" />
      </div>
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="border-b px-4 py-3">
        <Skeleton className="h-4 w-1/4 rounded" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0">
          <Skeleton className="h-4 w-1/5 rounded" />
          <Skeleton className="h-4 w-2/5 rounded" />
          <Skeleton className="h-4 w-1/5 rounded" />
          <Skeleton className="ml-auto h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  ),
};
