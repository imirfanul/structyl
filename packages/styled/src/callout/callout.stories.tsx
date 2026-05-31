import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Info as InfoIcon, CheckCircle2, AlertTriangle, XCircle } from '@structyl/icons';
import { Callout } from './index';

const meta = {
  title: 'Styled/Callout',
  component: Callout,
  tags: ['autodocs'],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'This is a default callout message.' },
};

export const Info: Story = {
  args: {
    variant: 'info',
    icon: <InfoIcon className="h-4 w-4" />,
    title: 'Did you know?',
    children: 'You can customise the theme using the Theme Builder.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    icon: <CheckCircle2 className="h-4 w-4" />,
    title: 'Deployment complete',
    children: 'Your application has been successfully deployed to production.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: <AlertTriangle className="h-4 w-4" />,
    title: 'Storage warning',
    children: 'You are using 90% of your storage quota. Consider upgrading.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    icon: <XCircle className="h-4 w-4" />,
    title: 'Action failed',
    children: 'The upload failed due to a network error. Please try again.',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    title: 'Note',
    children: 'Some additional context that is neither urgent nor positive.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      {(['default', 'info', 'success', 'warning', 'error', 'neutral'] as const).map(v => (
        <Callout key={v} variant={v} title={v.charAt(0).toUpperCase() + v.slice(1)}>
          This is a {v} callout message.
        </Callout>
      ))}
    </div>
  ),
};
