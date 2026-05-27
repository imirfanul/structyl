import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Slider } from './index';

const meta = {
  title: 'Styled/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    className: 'w-64',
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStep: Story = {
  args: {
    defaultValue: [25],
    step: 25,
  },
};

export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    thumbCount: 2,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [40],
    disabled: true,
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: [60],
    orientation: 'vertical',
    className: 'h-40',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState([30]);
    return (
      <div className="flex flex-col gap-4 w-64">
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={1}
        />
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-mono font-medium">{value[0]}</span>
        </p>
      </div>
    );
  },
};

export const ControlledRange: Story = {
  render: () => {
    const [range, setRange] = React.useState([20, 70]);
    return (
      <div className="flex flex-col gap-4 w-64">
        <Slider
          value={range}
          onValueChange={setRange}
          min={0}
          max={100}
          step={5}
          thumbCount={2}
        />
        <p className="text-sm text-muted-foreground">
          Range:{' '}
          <span className="font-mono font-medium">
            {range[0]} — {range[1]}
          </span>
        </p>
      </div>
    );
  },
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = React.useState([65]);
    const icons = volume[0] === 0 ? '🔇' : volume[0] < 40 ? '🔈' : volume[0] < 75 ? '🔉' : '🔊';
    return (
      <div className="flex items-center gap-3 w-72">
        <span className="text-lg select-none">{icons}</span>
        <Slider
          value={volume}
          onValueChange={setVolume}
          min={0}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-sm font-mono w-8 text-right text-muted-foreground">
          {volume[0]}
        </span>
      </div>
    );
  },
};
