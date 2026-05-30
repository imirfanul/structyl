import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Typography } from '../typography';
import * as Drawer from './index';

const meta = {
  title: 'Styled/Drawer',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Profile</Drawer.Title>
          <Drawer.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </Drawer.Description>
        </Drawer.Header>
        <div className="grid gap-4 px-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Typography as="label" variant="body2" htmlFor="drawer-name" className="text-right font-medium">
              Name
            </Typography>
            <Input
              id="drawer-name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Typography as="label" variant="body2" htmlFor="drawer-username" className="text-right font-medium">
              Username
            </Typography>
            <Input
              id="drawer-username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <Drawer.Footer>
          <Button>Save changes</Button>
          <Drawer.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  ),
};

export const ActionSheet: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="More options">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Actions</Drawer.Title>
        </Drawer.Header>
        <div className="flex flex-col gap-1 px-4 pb-2">
          {[
            { label: 'Edit', icon: '✏️' },
            { label: 'Duplicate', icon: '📋' },
            { label: 'Share', icon: '🔗' },
            { label: 'Archive', icon: '📦' },
          ].map(({ label, icon }) => (
            <Drawer.Close asChild key={label}>
              <Button variant="ghost" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors justify-start">
                <span>{icon}</span>
                {label}
              </Button>
            </Drawer.Close>
          ))}
        </div>
        <div className="mx-4 my-2 h-px bg-border" />
        <div className="px-4 pb-2">
          <Drawer.Close asChild>
            <Button variant="ghost" className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors justify-start">
              <span>🗑️</span>
              Delete
            </Button>
          </Drawer.Close>
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  ),
};

export const WithScrollableContent: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open Scrollable Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content className="max-h-[85vh]">
        <Drawer.Header>
          <Drawer.Title>Changelog</Drawer.Title>
          <Drawer.Description>Recent updates and improvements.</Drawer.Description>
        </Drawer.Header>
        <div className="overflow-y-auto px-4 pb-4 space-y-4">
          {[
            { version: 'v1.3.0', date: 'May 2024', note: 'Added Drawer, Sheet, and Toast components.' },
            { version: 'v1.2.0', date: 'April 2024', note: 'Introduced DataTable with sorting, filtering, and pagination.' },
            { version: 'v1.1.0', date: 'March 2024', note: 'New HoverCard and Popover components with floating-ui support.' },
            { version: 'v1.0.0', date: 'February 2024', note: 'Initial release with core primitives and styled layer.' },
            { version: 'v0.9.0', date: 'January 2024', note: 'Beta release with Dialog, AlertDialog, and Tooltip.' },
            { version: 'v0.8.0', date: 'December 2023', note: 'Added ThemeProvider and CSS variable token system.' },
            { version: 'v0.7.0', date: 'November 2023', note: 'Introduced Button, Input, and form components.' },
          ].map(({ version, date, note }) => (
            <div key={version} className="border-b border-border pb-4 last:border-0">
              <div className="flex items-center justify-between">
                <Typography as="span" className="font-semibold">{version}</Typography>
                <Typography as="span" variant="muted">{date}</Typography>
              </div>
              <Typography variant="muted" className="mt-1">{note}</Typography>
            </div>
          ))}
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="outline">Close</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-start gap-4">
        <Typography variant="muted">
          Drawer is: <strong>{open ? 'open' : 'closed'}</strong>
        </Typography>
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Controlled Drawer</Drawer.Title>
              <Drawer.Description>
                This drawer is controlled via external state.
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Footer>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </div>
    );
  },
};
