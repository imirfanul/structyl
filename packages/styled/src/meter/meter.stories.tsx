import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Meter } from './index';
import { Typography } from '../typography';

const meta = {
  title: 'Styled/Meter',
  component: Meter,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    low: { control: { type: 'number' } },
    high: { control: { type: 'number' } },
    optimum: { control: { type: 'number' } },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
    label: 'Storage used',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const StatusColors: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs">
          <Typography as="span">Normal (in range)</Typography>
          <Typography as="span" className="text-success font-medium">60%</Typography>
        </div>
        <Meter value={60} min={0} max={100} low={20} high={80} label="Normal" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs">
          <Typography as="span">Sub-optimal (below low)</Typography>
          <Typography as="span" className="text-warning font-medium">10%</Typography>
        </div>
        <Meter value={10} min={0} max={100} low={20} high={80} label="Sub-optimal low" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs">
          <Typography as="span">Sub-optimal (above high)</Typography>
          <Typography as="span" className="text-warning font-medium">90%</Typography>
        </div>
        <Meter value={90} min={0} max={100} low={20} high={80} label="Sub-optimal high" />
      </div>
    </div>
  ),
};

export const DiskUsage: Story = {
  render: () => (
    <div className="border-border w-80 rounded-lg border p-4">
      <div className="mb-3 flex justify-between text-sm">
        <Typography as="span" className="font-medium">Disk Usage</Typography>
        <Typography as="span" className="text-muted-foreground">75 GB / 100 GB</Typography>
      </div>
      <Meter
        value={75}
        min={0}
        max={100}
        low={50}
        high={85}
        label="Disk usage"
      />
      <Typography variant="muted" className="mt-2">25 GB remaining</Typography>
    </div>
  ),
};

export const BatteryLevel: Story = {
  render: () => (
    <div className="border-border w-80 rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <Typography as="span" className="font-medium">Battery</Typography>
        <Typography as="span" className="text-muted-foreground">15%</Typography>
      </div>
      <Meter
        value={15}
        min={0}
        max={100}
        low={20}
        high={80}
        optimum={90}
        label="Battery level"
      />
      <Typography variant="body2" className="text-warning mt-2 font-medium">Low battery — please charge</Typography>
    </div>
  ),
};

export const RangeValues: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      {[10, 30, 50, 70, 90].map((v) => (
        <div key={v} className="flex items-center gap-3">
          <Typography as="span" className="w-8 text-right text-xs tabular-nums">{v}%</Typography>
          <Meter
            value={v}
            min={0}
            max={100}
            low={25}
            high={75}
            label={`${v}%`}
            className="flex-1"
          />
        </div>
      ))}
    </div>
  ),
};
