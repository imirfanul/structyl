import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from './index';

const meta = {
  title: 'Styled/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1 } },
    size: { control: { type: 'number', min: 16, max: 128, step: 4 } },
    strokeWidth: { control: { type: 'number', min: 1, max: 16, step: 1 } },
    label: { control: 'text' },
  },
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    size: 40,
    strokeWidth: 4,
    label: 'Progress',
  },
};

export const Indeterminate: Story = {
  args: {
    value: undefined,
    size: 40,
    strokeWidth: 4,
    label: 'Loading',
  },
};

export const Values: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} className="relative flex flex-col items-center gap-2">
          <CircularProgress value={v} size={48} strokeWidth={4} label={`${v}%`} />
          <span className="text-muted-foreground text-xs">{v}%</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={60} size={24} strokeWidth={3} label="24px" />
        <span className="text-muted-foreground text-xs">24</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={60} size={40} strokeWidth={4} label="40px" />
        <span className="text-muted-foreground text-xs">40</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={60} size={64} strokeWidth={5} label="64px" />
        <span className="text-muted-foreground text-xs">64</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={60} size={96} strokeWidth={6} label="96px" />
        <span className="text-muted-foreground text-xs">96</span>
      </div>
    </div>
  ),
};

function AnimatedCircular() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 2));
    }, 100);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative flex items-center justify-center">
      <CircularProgress value={value} size={64} strokeWidth={5} label={`${value}%`} />
      <span className="absolute text-xs font-semibold">{value}</span>
    </div>
  );
}

export const Animated: Story = {
  render: () => <AnimatedCircular />,
};
