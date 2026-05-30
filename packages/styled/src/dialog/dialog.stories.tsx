import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { within, expect, waitFor } from 'storybook/test';
import { Button } from '../button';
import * as Dialog from './index';

const meta = {
  tags: ['ai-generated'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  name: 'Preview (open)',
  render: () => (
    <Dialog.Root defaultOpen>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here. Click save when you&apos;re done.
            </Dialog.Description>
          </Dialog.Header>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name-preview" className="text-right text-sm font-medium">
                Name
              </label>
              <input
                id="name-preview"
                defaultValue="Pedro Duarte"
                className="col-span-3 flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username-preview" className="text-right text-sm font-medium">
                Username
              </label>
              <input
                id="username-preview"
                defaultValue="@peduarte"
                className="col-span-3 flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              />
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button>Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const Default: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open dialog/i }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible(), { timeout: 3000 });
  },
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here. Click save when you&apos;re done.
            </Dialog.Description>
          </Dialog.Header>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3 flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3 flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              />
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button>Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const Simple: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open Simple Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button variant="destructive">Delete Account</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const WithScrollableContent: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Scrollable Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="max-h-[80vh] overflow-y-auto">
          <Dialog.Header>
            <Dialog.Title>Terms of Service</Dialog.Title>
            <Dialog.Description>
              Please read our terms of service carefully before continuing.
            </Dialog.Description>
          </Dialog.Header>
          <div className="py-4 text-sm text-muted-foreground space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Decline</Button>
            </Dialog.Close>
            <Button>Accept</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm text-muted-foreground">
          Dialog is: <strong>{open ? 'open' : 'closed'}</strong>
        </p>
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Controlled Dialog</Dialog.Title>
                <Dialog.Description>
                  This dialog is controlled via external state.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    );
  },
};
