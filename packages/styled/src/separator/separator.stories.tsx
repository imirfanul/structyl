import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Separator } from './index';

const meta = {
  title: 'Styled/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Horizontal: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <p className="text-sm">Section one</p>
      <Separator orientation="horizontal" />
      <p className="text-sm">Section two</p>
      <Separator orientation="horizontal" />
      <p className="text-sm">Section three</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-3">
      <span className="text-sm">Home</span>
      <Separator orientation="vertical" />
      <span className="text-sm">About</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Contact</span>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="border-border w-72 rounded-lg border p-4">
      <div className="mb-3">
        <p className="text-sm font-semibold">Title</p>
        <p className="text-muted-foreground text-xs">Subtitle goes here</p>
      </div>
      <Separator />
      <div className="mt-3">
        <p className="text-sm">Body content below the separator.</p>
      </div>
    </div>
  ),
};
