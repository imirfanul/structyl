import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Input, Toggle } from './index';

const meta: Meta = {
  title: 'Styled/PasswordToggleField',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <Root>
        <Input placeholder="Enter your password" />
        <Toggle />
      </Root>
    </div>
  ),
};

export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <div className="flex w-[320px] flex-col gap-1.5">
      <label htmlFor="password" className="text-sm font-medium leading-none">
        Password
      </label>
      <Root>
        <Input id="password" placeholder="••••••••" />
        <Toggle />
      </Root>
      <p className="text-xs text-muted-foreground">
        Must be at least 8 characters.
      </p>
    </div>
  ),
};

export const DefaultVisible: Story = {
  name: 'Default visible (shown)',
  render: () => (
    <div className="w-[320px]">
      <Root defaultVisible>
        <Input placeholder="Enter your password" defaultValue="MySecret123!" />
        <Toggle />
      </Root>
    </div>
  ),
};

export const Controlled: Story = {
  name: 'Controlled visibility',
  render: () => {
    const [visible, setVisible] = React.useState(false);
    return (
      <div className="flex w-[320px] flex-col gap-3">
        <Root visible={visible} onVisibleChange={setVisible}>
          <Input placeholder="Controlled password" />
          <Toggle />
        </Root>
        <p className="text-xs text-muted-foreground">
          Password is currently:{' '}
          <span className="font-medium">{visible ? 'visible' : 'hidden'}</span>
        </p>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="self-start text-xs underline"
        >
          Toggle from outside
        </button>
      </div>
    );
  },
};

export const InLoginForm: Story = {
  name: 'In a login form',
  render: () => (
    <div className="w-[360px] rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Sign in</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-password" className="text-sm font-medium leading-none">
            Password
          </label>
          <Root>
            <Input id="login-password" placeholder="••••••••" />
            <Toggle />
          </Root>
        </div>
        <button
          type="button"
          className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Sign in
        </button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[320px]">
      <Root>
        <Input placeholder="Disabled password field" disabled defaultValue="secret" />
        <Toggle />
      </Root>
    </div>
  ),
};
