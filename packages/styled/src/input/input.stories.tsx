import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect } from 'storybook/test';
import { Input } from './index';

const meta = {
  component: Input,
  tags: ['ai-generated'],
  args: {
    placeholder: 'Enter text...',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello, world!',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Search for anything...',
  },
};

export const TypeEmail: Story = {
  args: {
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const TypePassword: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const TypeNumber: Story = {
  args: {
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100,
  },
};

export const TypeFile: Story = {
  args: {
    type: 'file',
    className: 'cursor-pointer',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    defaultValue: 'invalid@',
    placeholder: 'Invalid input',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="flex flex-col gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-mono">{value || '(empty)'}</span>
        </p>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="email-input" className="text-sm font-medium leading-none">
        Email address
      </label>
      <Input id="email-input" type="email" placeholder="you@example.com" />
      <p className="text-xs text-muted-foreground">We&apos;ll never share your email.</p>
    </div>
  ),
};
