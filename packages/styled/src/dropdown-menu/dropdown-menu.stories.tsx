import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import * as DropdownMenu from './index';

const meta: Meta = {
  title: 'Components/DropdownMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>My Account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <span>👤</span> Profile
          <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <span>⚙️</span> Settings
          <DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <span>🔑</span> API Keys
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item disabled>
          <span>💳</span> Billing
          <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <span>🚪</span> Log out
          <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [showStatus, setShowStatus] = React.useState(true);
    const [showActivity, setShowActivity] = React.useState(false);
    const [showSidebar, setShowSidebar] = React.useState(true);

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">View Options</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Appearance</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem
            checked={showStatus}
            onCheckedChange={setShowStatus}
          >
            Show Status Bar
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            checked={showActivity}
            onCheckedChange={setShowActivity}
          >
            Show Activity Bar
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            checked={showSidebar}
            onCheckedChange={setShowSidebar}
          >
            Show Sidebar
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  },
};

export const WithRadioItems: Story = {
  render: () => {
    const [theme, setTheme] = React.useState('system');

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">Theme: {theme}</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Color Theme</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenu.RadioItem value="light">☀️ Light</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">🌙 Dark</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="system">💻 System</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  },
};

export const WithSubMenu: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">File</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <span>📄</span> New File
          <DropdownMenu.Shortcut>⌘N</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <span>📂</span> Open
          <DropdownMenu.Shortcut>⌘O</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <span>📤</span> Share
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>✉️ Email Link</DropdownMenu.Item>
            <DropdownMenu.Item>🔗 Copy Link</DropdownMenu.Item>
            <DropdownMenu.Item>💬 Send via Slack</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <span>💾</span> Save
          <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const Destructive: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <span>✏️</span> Edit
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <span>📋</span> Duplicate
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="text-destructive focus:text-destructive">
          <span>🗑️</span> Delete
          <DropdownMenu.Shortcut>⌫</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};
