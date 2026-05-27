import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Spinner } from './index';

const meta = {
  title: 'Styled/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    label: 'Loading',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-muted-foreground text-xs">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-muted-foreground text-xs">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-muted-foreground text-xs">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-muted-foreground text-xs">xl</span>
      </div>
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    size: 'md',
    label: 'Saving changes…',
  },
};

export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-75"
      >
        <Spinner size="sm" label="Saving" />
        Saving…
      </button>
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium opacity-75"
      >
        <Spinner size="sm" label="Loading" />
        Loading…
      </button>
    </div>
  ),
};
