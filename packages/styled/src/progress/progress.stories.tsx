import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect, useState } from 'react';
import { Typography } from '../typography';
import { Progress } from './index';

const meta = {
  title: 'Styled/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1 } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Values: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Typography as="span" variant="body2" className="text-xs font-medium">0%</Typography>
        <Progress value={0} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography as="span" variant="body2" className="text-xs font-medium">25%</Typography>
        <Progress value={25} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography as="span" variant="body2" className="text-xs font-medium">50%</Typography>
        <Progress value={50} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography as="span" variant="body2" className="text-xs font-medium">75%</Typography>
        <Progress value={75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography as="span" variant="body2" className="text-xs font-medium">100%</Typography>
        <Progress value={100} />
      </div>
    </div>
  ),
};

export const CustomIndicator: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Progress value={40} indicatorClassName="bg-destructive" />
      <Progress value={60} indicatorClassName="bg-warning" />
      <Progress value={80} indicatorClassName="bg-success" />
    </div>
  ),
};

function AnimatedProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 5));
    }, 300);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex w-80 flex-col gap-2">
      <div className="flex justify-between text-xs">
        <Typography as="span" variant="body2">Uploading…</Typography>
        <Typography as="span" variant="body2">{value}%</Typography>
      </div>
      <Progress value={value} />
    </div>
  );
}

export const Animated: Story = {
  render: () => <AnimatedProgress />,
};
