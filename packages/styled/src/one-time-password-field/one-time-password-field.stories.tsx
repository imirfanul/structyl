import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Input, HiddenInput } from './index';

const meta: Meta = {
  title: 'Styled/OneTimePasswordField',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Root length={6}>
      {Array.from({ length: 6 }, (_, i) => (
        <Input key={i} index={i} />
      ))}
      <HiddenInput name="otp" />
    </Root>
  ),
};

export const FourDigit: Story = {
  name: '4-digit PIN',
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">Enter your 4-digit PIN</p>
      <Root length={4}>
        {Array.from({ length: 4 }, (_, i) => (
          <Input key={i} index={i} />
        ))}
        <HiddenInput name="pin" />
      </Root>
    </div>
  ),
};

export const SixDigit: Story = {
  name: '6-digit OTP',
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        Enter the 6-digit code sent to your phone
      </p>
      <Root length={6}>
        {Array.from({ length: 6 }, (_, i) => (
          <Input key={i} index={i} />
        ))}
        <HiddenInput name="otp" />
      </Root>
    </div>
  ),
};

export const Alphanumeric: Story = {
  name: 'Alphanumeric (6 chars)',
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">Enter your invite code</p>
      <Root length={6} type="alphanumeric">
        {Array.from({ length: 6 }, (_, i) => (
          <Input key={i} index={i} />
        ))}
        <HiddenInput name="invite-code" />
      </Root>
    </div>
  ),
};

export const Masked: Story = {
  name: 'Masked input',
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        Digits are masked for extra security
      </p>
      <Root length={6} mask>
        {Array.from({ length: 6 }, (_, i) => (
          <Input key={i} index={i} />
        ))}
        <HiddenInput name="otp" />
      </Root>
    </div>
  ),
};

export const WithCallback: Story = {
  name: 'With onComplete callback',
  render: () => {
    const [completed, setCompleted] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Fill all 6 digits to trigger the callback
        </p>
        <Root
          length={6}
          onComplete={(value) => setCompleted(value)}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Input key={i} index={i} />
          ))}
          <HiddenInput name="otp" />
        </Root>
        {completed && (
          <p className="text-sm font-medium text-success">
            Completed: <code className="rounded bg-muted px-1">{completed}</code>
          </p>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">Disabled OTP field</p>
      <Root length={6} disabled defaultValue="123456">
        {Array.from({ length: 6 }, (_, i) => (
          <Input key={i} index={i} />
        ))}
      </Root>
    </div>
  ),
};
