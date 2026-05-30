import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Input, HiddenInput } from './index';
import { Typography } from '../typography';

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
      <Typography variant="body2" className="text-muted-foreground">Enter your 4-digit PIN</Typography>
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
      <Typography variant="body2" className="text-muted-foreground">
        Enter the 6-digit code sent to your phone
      </Typography>
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
      <Typography variant="body2" className="text-muted-foreground">Enter your invite code</Typography>
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
      <Typography variant="body2" className="text-muted-foreground">
        Digits are masked for extra security
      </Typography>
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
        <Typography variant="body2" className="text-muted-foreground">
          Fill all 6 digits to trigger the callback
        </Typography>
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
          <Typography variant="body2" className="font-medium text-success">
            Completed: <code className="rounded bg-muted px-1">{completed}</code>
          </Typography>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <Typography variant="body2" className="text-muted-foreground">Disabled OTP field</Typography>
      <Root length={6} disabled defaultValue="123456">
        {Array.from({ length: 6 }, (_, i) => (
          <Input key={i} index={i} />
        ))}
      </Root>
    </div>
  ),
};
