import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Spinner } from './index';
import { Button } from '../button';
import { Typography } from '../typography';

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
        <Typography as="span" variant="muted">sm</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <Typography as="span" variant="muted">md</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <Typography as="span" variant="muted">lg</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <Typography as="span" variant="muted">xl</Typography>
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
      <Button
        type="button"
        disabled
      >
        <Spinner size="sm" label="Saving" />
        Saving…
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled
      >
        <Spinner size="sm" label="Loading" />
        Loading…
      </Button>
    </div>
  ),
};
