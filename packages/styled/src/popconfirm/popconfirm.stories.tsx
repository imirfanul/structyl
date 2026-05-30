import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Popconfirm } from './index';

const meta = {
  title: 'Styled/Popconfirm',
  component: Popconfirm,
  tags: ['autodocs'],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-10">
      <Popconfirm
        title="Delete this item?"
        description="This action cannot be undone."
        onConfirm={() => alert('Deleted!')}
      >
        <button className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground">
          Delete
        </button>
      </Popconfirm>
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="flex justify-center p-10">
      <Popconfirm
        title="Publish post?"
        description="This will make your post visible to everyone."
        confirmLabel="Yes, publish"
        cancelLabel="Keep draft"
        onConfirm={() => alert('Published!')}
      >
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Publish
        </button>
      </Popconfirm>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-4 p-10">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Popconfirm key={side} title="Confirm?" side={side} onConfirm={() => {}}>
          <button className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground capitalize">
            {side}
          </button>
        </Popconfirm>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex justify-center p-10">
      <Popconfirm title="Delete?" onConfirm={() => {}} disabled>
        <button disabled className="rounded-lg bg-destructive/50 px-4 py-2 text-sm font-medium text-destructive-foreground opacity-50 cursor-not-allowed">
          Delete (disabled)
        </button>
      </Popconfirm>
    </div>
  ),
};
