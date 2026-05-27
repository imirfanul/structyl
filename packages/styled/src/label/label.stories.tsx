import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Label } from './index';

const meta = {
  title: 'Styled/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email address',
    htmlFor: 'email',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="name-input">Full name</Label>
      <input
        id="name-input"
        type="text"
        placeholder="Enter your name"
        className="border-border rounded-md border px-3 py-1.5 text-sm outline-none"
      />
    </div>
  ),
};

export const DisabledPeer: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="disabled-input">Disabled field</Label>
      <input
        id="disabled-input"
        type="text"
        placeholder="Cannot edit this"
        disabled
        className="peer border-border rounded-md border px-3 py-1.5 text-sm outline-none disabled:opacity-50"
      />
      <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
        Label reflects disabled peer state
      </Label>
    </div>
  ),
};

export const RequiredField: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="required-input">
        Password <span className="text-destructive">*</span>
      </Label>
      <input
        id="required-input"
        type="password"
        placeholder="••••••••"
        required
        className="border-border rounded-md border px-3 py-1.5 text-sm outline-none"
      />
    </div>
  ),
};
