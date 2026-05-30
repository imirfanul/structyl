import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Rating } from './index';
import { Typography } from '../typography';

const meta = {
  title: 'Styled/Rating',
  component: Rating,
  tags: ['autodocs'],
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 3 },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(2);
    return (
      <div className="flex flex-col gap-3 p-4">
        <Rating value={value} onChange={setValue} name="controlled" />
        <Typography variant="muted">Rating: {value} / 5</Typography>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 text-xs text-muted-foreground">{size}</span>
          <Rating size={size} defaultValue={3} />
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      {(['yellow', 'orange', 'red', 'primary'] as const).map(color => (
        <div key={color} className="flex items-center gap-4">
          <span className="w-14 text-xs text-muted-foreground capitalize">{color}</span>
          <Rating color={color} defaultValue={4} />
        </div>
      ))}
    </div>
  ),
};

export const HeartIcon: Story = {
  args: { icon: 'heart', defaultValue: 3, color: 'red' },
};

export const Disabled: Story = {
  args: { defaultValue: 2, disabled: true },
};

export const TenStars: Story = {
  args: { max: 10, defaultValue: 7 },
};
