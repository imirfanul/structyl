import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
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
        <Button variant="destructive">
          Delete
        </Button>
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
        <Button>
          Publish
        </Button>
      </Popconfirm>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-4 p-10">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Popconfirm key={side} title="Confirm?" side={side} onConfirm={() => {}}>
          <Button variant="outline" className="capitalize">
            {side}
          </Button>
        </Popconfirm>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex justify-center p-10">
      <Popconfirm title="Delete?" onConfirm={() => {}} disabled>
        <Button variant="destructive" disabled>
          Delete (disabled)
        </Button>
      </Popconfirm>
    </div>
  ),
};
