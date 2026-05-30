import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Typography } from './index';

const meta = {
  title: 'Styled/Typography',
  component: Typography,
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'The quick brown fox jumps over the lazy dog.' },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-2 p-6">
      {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map(v => (
        <Typography key={v} variant={v}>{v.toUpperCase()} — Page heading</Typography>
      ))}
    </div>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <div className="space-y-3 p-6">
      <Typography variant="lead">Lead text — introduces the content of a section.</Typography>
      <Typography variant="body1">Body 1 — the primary paragraph style used for most content.</Typography>
      <Typography variant="body2">Body 2 — slightly smaller, used for secondary information.</Typography>
      <Typography variant="caption">Caption — small label beneath images or table cells.</Typography>
      <Typography variant="overline">OVERLINE — CATEGORY LABEL ABOVE A HEADING</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2 p-6">
      {(['inherit', 'primary', 'secondary', 'muted', 'error', 'warning', 'info', 'success'] as const).map(color => (
        <Typography key={color} color={color} variant="body1">
          Color: {color}
        </Typography>
      ))}
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div className="max-w-xs p-6">
      <Typography truncate>
        This text is very long and will be truncated with an ellipsis when it overflows the container.
      </Typography>
    </div>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div className="space-y-2 p-6">
      <Typography variant="h3" as="p">h3 style, rendered as &lt;p&gt;</Typography>
      <Typography variant="body1" as="span">body1 style, rendered as &lt;span&gt;</Typography>
    </div>
  ),
};
