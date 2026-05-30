import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import * as AlertDialog from './index';

const meta = {
  title: 'Styled/AlertDialog',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  name: 'Preview (open)',
  render: () => (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Trigger asChild>
        <Button variant="outline">Open Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Continue</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  ),
};

export const Default: Story = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline">Open Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Continue</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete Account</AlertDialog.Title>
            <AlertDialog.Description>
              This will permanently delete your account and all associated data. This action is
              irreversible. Are you sure you want to proceed?
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>No, keep my account</AlertDialog.Cancel>
            <AlertDialog.Action className="bg-destructive text-destructive-foreground hover:brightness-110">
              Yes, delete my account
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  ),
};

export const WithCallback: Story = {
  render: () => {
    const [status, setStatus] = React.useState<string>('No action taken yet.');
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm text-muted-foreground">{status}</p>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button variant="outline">Confirm Action</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Confirm Action</AlertDialog.Title>
                <AlertDialog.Description>
                  Do you want to proceed with this action?
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel onClick={() => setStatus('Action cancelled.')}>
                  Cancel
                </AlertDialog.Cancel>
                <AlertDialog.Action onClick={() => setStatus('Action confirmed!')}>
                  Confirm
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    );
  },
};

export const LogoutConfirmation: Story = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="ghost">Log out</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Log out of your account?</AlertDialog.Title>
            <AlertDialog.Description>
              You will need to sign in again to access your account.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Stay logged in</AlertDialog.Cancel>
            <AlertDialog.Action>Log out</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  ),
};
