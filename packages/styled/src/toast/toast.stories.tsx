import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import * as Toast from './index';

const meta = {
  tags: ['ai-generated'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Shared helper — wraps stories in a Provider + Viewport so toasts render
// ---------------------------------------------------------------------------

type ToastConfig = {
  title: string;
  description?: string;
  actionLabel?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
};

function ToastDemo({ config }: { config: ToastConfig }) {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const showToast = () => {
    // Close any existing toast first, then re-open on next tick
    setOpen(false);
    timerRef.current = setTimeout(() => setOpen(true), 100);
  };

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <Toast.Provider swipeDirection="right">
      <Button
        variant={config.variant === 'destructive' ? 'destructive' : 'outline'}
        onClick={showToast}
      >
        Show Toast
      </Button>

      <Toast.Root open={open} onOpenChange={setOpen} variant={config.variant}>
        <div className="grid gap-1">
          <Toast.Title>{config.title}</Toast.Title>
          {config.description && (
            <Toast.Description>{config.description}</Toast.Description>
          )}
        </div>
        {config.actionLabel && (
          <Toast.Action altText={config.actionLabel} onClick={() => setOpen(false)}>
            {config.actionLabel}
          </Toast.Action>
        )}
        <Toast.Close />
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <ToastDemo
      config={{
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
        actionLabel: 'Undo',
      }}
    />
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastDemo
      config={{
        title: 'Something went wrong',
        description: 'There was a problem with your request. Please try again.',
        variant: 'destructive',
      }}
    />
  ),
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      config={{
        title: 'Changes saved',
        description: 'Your profile has been updated successfully.',
        variant: 'success',
      }}
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      config={{
        title: 'Subscription expiring soon',
        description: 'Your plan expires in 3 days. Renew to avoid interruption.',
        actionLabel: 'Renew',
        variant: 'warning',
      }}
    />
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <ToastDemo
      config={{
        title: 'Your message has been sent.',
      }}
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastDemo
      config={{
        title: 'File deleted',
        description: 'report-q4-2023.pdf has been moved to trash.',
        actionLabel: 'Undo',
      }}
    />
  ),
};

export const AllVariants: Story = {
  render: () => {
    const variants = [
      {
        variant: 'default' as const,
        title: 'Default',
        description: 'This is a default toast notification.',
      },
      {
        variant: 'success' as const,
        title: 'Success',
        description: 'Operation completed successfully.',
      },
      {
        variant: 'warning' as const,
        title: 'Warning',
        description: 'This action may have unintended effects.',
      },
      {
        variant: 'destructive' as const,
        title: 'Error',
        description: 'An unexpected error occurred.',
      },
    ];

    return (
      <Toast.Provider swipeDirection="right">
        <div className="flex flex-wrap gap-3">
          {variants.map(({ variant, title, description }) => (
            <Button
              key={variant}
              variant={variant === 'destructive' ? 'destructive' : 'outline'}
              onClick={() => {}}
              className="capitalize"
            >
              {variant}
            </Button>
          ))}
          <p className="w-full text-sm text-muted-foreground mt-2">
            Note: in Storybook, use individual variant stories to see interactive toasts.
            The static preview below shows all variants rendered at once.
          </p>
        </div>

        {/* Static preview — always visible via forceMount */}
        <div className="mt-6 flex flex-col gap-3 w-full max-w-sm">
          {variants.map(({ variant, title, description }) => (
            <Toast.Root key={variant} forceMount variant={variant}>
              <div className="grid gap-1">
                <Toast.Title>{title}</Toast.Title>
                <Toast.Description>{description}</Toast.Description>
              </div>
              <Toast.Close />
            </Toast.Root>
          ))}
        </div>

        <Toast.Viewport className="static flex flex-col gap-2 max-h-none w-auto relative p-0 mt-0" />
      </Toast.Provider>
    );
  },
};
