import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect } from 'storybook/test';
import { Root, List, Trigger, Content } from './index';

const meta: Meta = {
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('tab', { name: /password/i }));
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(/change password/i);
  },
  render: () => (
    <div className="w-[480px]">
      <Root defaultValue="account">
        <List>
          <Trigger value="account">Account</Trigger>
          <Trigger value="password">Password</Trigger>
          <Trigger value="notifications">Notifications</Trigger>
        </List>
        <Content value="account">
          <div className="rounded-lg border border-border p-4 space-y-2">
            <p className="text-sm font-medium">Account Settings</p>
            <p className="text-sm text-muted-foreground">
              Manage your account details, email address, and connected services.
            </p>
          </div>
        </Content>
        <Content value="password">
          <div className="rounded-lg border border-border p-4 space-y-2">
            <p className="text-sm font-medium">Change Password</p>
            <p className="text-sm text-muted-foreground">
              Update your password. We recommend using a strong, unique passphrase.
            </p>
          </div>
        </Content>
        <Content value="notifications">
          <div className="rounded-lg border border-border p-4 space-y-2">
            <p className="text-sm font-medium">Notification Preferences</p>
            <p className="text-sm text-muted-foreground">
              Choose how and when you receive email, push, and in-app notifications.
            </p>
          </div>
        </Content>
      </Root>
    </div>
  ),
};

export const CodeExample: Story = {
  name: 'Code / Preview tabs',
  render: () => (
    <div className="w-[560px]">
      <Root defaultValue="preview">
        <List>
          <Trigger value="preview">Preview</Trigger>
          <Trigger value="code">Code</Trigger>
          <Trigger value="props">Props</Trigger>
        </List>
        <Content value="preview">
          <div className="flex items-center justify-center rounded-lg border border-border bg-muted/30 p-8 min-h-[120px]">
            <span className="text-muted-foreground text-sm">Component renders here</span>
          </div>
        </Content>
        <Content value="code">
          <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs overflow-auto">
            {`import { Button } from '@aura-ui/styled';\n\nexport function Example() {\n  return <Button>Click me</Button>;\n}`}
          </pre>
        </Content>
        <Content value="props">
          <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
            <div className="grid grid-cols-3 gap-2 font-medium text-xs text-muted-foreground uppercase tracking-wide border-b border-border pb-2">
              <span>Prop</span>
              <span>Type</span>
              <span>Default</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <span>variant</span>
              <span className="font-mono text-muted-foreground">string</span>
              <span className="font-mono">"default"</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <span>size</span>
              <span className="font-mono text-muted-foreground">string</span>
              <span className="font-mono">"md"</span>
            </div>
          </div>
        </Content>
      </Root>
    </div>
  ),
};

export const WithDisabledTab: Story = {
  name: 'With a disabled tab',
  render: () => (
    <div className="w-[400px]">
      <Root defaultValue="active">
        <List>
          <Trigger value="active">Active</Trigger>
          <Trigger value="beta" disabled>
            Beta (disabled)
          </Trigger>
          <Trigger value="archive">Archive</Trigger>
        </List>
        <Content value="active">
          <p className="text-sm text-muted-foreground p-1">
            Active tab content is always accessible.
          </p>
        </Content>
        <Content value="beta">
          <p className="text-sm text-muted-foreground p-1">
            This tab is disabled and cannot be reached.
          </p>
        </Content>
        <Content value="archive">
          <p className="text-sm text-muted-foreground p-1">
            Archived items are viewable in read-only mode.
          </p>
        </Content>
      </Root>
    </div>
  ),
};
