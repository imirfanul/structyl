import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Input as BaseInput } from '../input';
import { Typography } from '../typography';
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
      <Typography as="label" variant="input-label" htmlFor="password">
        Password
      </Typography>
      <Root>
        <Input id="password" placeholder="••••••••" />
        <Toggle />
      </Root>
      <Typography variant="muted" className="text-xs">
        Must be at least 8 characters.
      </Typography>
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
        <Typography variant="muted" className="text-xs">
          Password is currently:{' '}
          <span className="font-medium">{visible ? 'visible' : 'hidden'}</span>
        </Typography>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setVisible((v) => !v)}
          className="self-start text-xs underline px-0 h-auto"
        >
          Toggle from outside
        </Button>
      </div>
    );
  },
};

export const InLoginForm: Story = {
  name: 'In a login form',
  render: () => (
    <div className="w-[360px] rounded-lg border border-border bg-card p-6 shadow-sm">
      <Typography variant="h2" className="mb-6 text-xl font-semibold">Sign in</Typography>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Typography as="label" variant="input-label" htmlFor="login-email">
            Email
          </Typography>
          <BaseInput
            id="login-email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Typography as="label" variant="input-label" htmlFor="login-password">
            Password
          </Typography>
          <Root>
            <Input id="login-password" placeholder="••••••••" />
            <Toggle />
          </Root>
        </div>
        <Button type="button" className="mt-2 w-full">
          Sign in
        </Button>
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
