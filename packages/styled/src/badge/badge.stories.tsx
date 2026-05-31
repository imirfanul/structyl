import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Link as StructylLink } from '../structyl';
import { Typography } from '../typography';
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
        <StructylLink href="#">Linked Badge</StructylLink>
      </Badge>
      <Badge asChild variant="outline">
        <Button type="button" variant="ghost" size="sm">Clickable Badge</Button>
      </Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Typography as="span" variant="body2" className="font-medium">Status:</Typography>
      <Badge variant="success">Active</Badge>
      <Typography as="span" variant="body2" className="font-medium">Priority:</Typography>
      <Badge variant="destructive">High</Badge>
      <Typography as="span" variant="body2" className="font-medium">Type:</Typography>
      <Badge variant="secondary">Draft</Badge>
    </div>
  ),
};
