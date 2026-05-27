import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Badge } from './index';

const meta = {
  component: Badge,
  tags: ['ai-generated'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge asChild variant="default">
        <a href="#">Linked Badge</a>
      </Badge>
      <Badge asChild variant="outline">
        <button type="button">Clickable Badge</button>
      </Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Status:</span>
      <Badge variant="success">Active</Badge>
      <span className="text-sm font-medium">Priority:</span>
      <Badge variant="destructive">High</Badge>
      <span className="text-sm font-medium">Type:</span>
      <Badge variant="secondary">Draft</Badge>
    </div>
  ),
};
