import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Textarea } from './index';

const meta = {
  title: 'Styled/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Write something...',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is some pre-filled text that spans\nacross multiple lines.',
  },
};

export const CustomRows: Story = {
  args: {
    rows: 8,
    placeholder: 'A taller textarea...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'This content cannot be edited.',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    defaultValue: 'Too short.',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const maxLength = 200;
    return (
      <div className="flex flex-col gap-1.5">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          placeholder="Write up to 200 characters..."
        />
        <p className="text-xs text-muted-foreground text-right">
          {value.length} / {maxLength}
        </p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="bio" className="text-sm font-medium leading-none">
        Bio
      </label>
      <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
      <p className="text-xs text-muted-foreground">Max 500 characters.</p>
    </div>
  ),
};
