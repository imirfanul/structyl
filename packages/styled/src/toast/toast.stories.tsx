import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Toaster } from './toaster';
import { toast } from './use-toast';
import type { ToastHorizontal, ToastVertical } from './use-toast';

const meta: Meta = {
  title: 'Styled/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <>
        <Story />
        {/* Single Toaster instance — in a real app this lives in the root layout */}
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Basic variants ────────────────────────────────────────────────────────────

export const Success: Story = {
  name: 'Success',
  render: () => (
    <Button variant="outline" onClick={() => toast.success('Changes saved successfully!')}>
      Show success
    </Button>
  ),
};

export const Error: Story = {
  name: 'Error',
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        toast.error('Failed to save changes', {
          description: 'An unexpected error occurred. Please try again.',
        })
      }
    >
      Show error
    </Button>
  ),
};

export const Warning: Story = {
  name: 'Warning',
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.warning('Subscription expiring soon', {
          description: 'Your plan expires in 3 days. Renew to avoid interruption.',
        })
      }
    >
      Show warning
    </Button>
  ),
};

export const Info: Story = {
  name: 'Info',
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.info('New version available', {
          description: 'Refresh the page to get the latest features.',
        })
      }
    >
      Show info
    </Button>
  ),
};

// ── Retry ─────────────────────────────────────────────────────────────────────

export const WithRetry: Story = {
  name: 'Error with Retry',
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        toast.error('Failed to upload file', {
          description: 'Connection timed out.',
          retry: () => toast.success('File uploaded!'),
        })
      }
    >
      Show error with retry
    </Button>
  ),
};

// ── Custom action ─────────────────────────────────────────────────────────────

export const WithAction: Story = {
  name: 'With custom action',
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.show({
          title: 'File deleted',
          description: 'report-q4-2024.pdf has been moved to trash.',
          action: { label: 'Undo', onClick: () => toast.success('Deletion undone!') },
        })
      }
    >
      Show with Undo
    </Button>
  ),
};

// ── Promise ───────────────────────────────────────────────────────────────────

export const Promise: Story = {
  name: 'Promise (loading → success / error)',
  render: () => {
    function simulateFetch(fail: boolean) {
      return new globalThis.Promise<{ name: string }>((resolve, reject) => {
        setTimeout(() => (fail ? reject(new Error('Network error')) : resolve({ name: 'Report' })), 1800);
      });
    }

    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(simulateFetch(false), {
              loading: 'Uploading file…',
              success: (data) => `${data.name} uploaded successfully!`,
              error: 'Upload failed. Try again.',
            })
          }
        >
          Succeed after 1.8s
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(simulateFetch(true), {
              loading: 'Uploading file…',
              success: 'Uploaded!',
              error: (err) => `Upload failed: ${(err as Error).message}`,
            })
          }
        >
          Fail after 1.8s
        </Button>
      </div>
    );
  },
};

// ── Positions ─────────────────────────────────────────────────────────────────

const horizontals: ToastHorizontal[] = ['left', 'center', 'right'];
const verticals: ToastVertical[]     = ['top', 'bottom'];

export const Positions: Story = {
  name: 'All positions',
  render: () => (
    <div className="grid grid-cols-3 gap-2">
      {verticals.flatMap((v) =>
        horizontals.map((h) => (
          <Button
            key={`${v}-${h}`}
            variant="outline"
            size="sm"
            onClick={() => toast.success(`${v} ${h}`, { horizontal: h, vertical: v })}
          >
            {v} · {h}
          </Button>
        )),
      )}
    </div>
  ),
};

// ── Long duration / persistent ────────────────────────────────────────────────

export const Persistent: Story = {
  name: 'Persistent (no auto-dismiss)',
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.info('System maintenance', {
            description: 'We are performing scheduled maintenance. Some features may be unavailable.',
            duration: Infinity,
          })
        }
      >
        Show persistent
      </Button>
      <Button variant="ghost" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </div>
  ),
};

// ── All variants at once ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Fire all variants',
  render: () => (
    <Button
      onClick={() => {
        toast.success('Changes saved!');
        toast.error('Upload failed', { description: 'File size exceeds limit.', retry: () => toast.info('Retrying…') });
        toast.warning('Low disk space', { description: 'Only 2 GB remaining.' });
        toast.info('3 new notifications');
        toast.loading('Syncing data…', { duration: 3000 });
      }}
    >
      Fire all variants
    </Button>
  ),
};
