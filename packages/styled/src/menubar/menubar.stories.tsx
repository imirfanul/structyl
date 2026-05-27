import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as Menubar from './index';

const meta: Meta = {
  title: 'Components/Menubar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>
            📄 New Tab
            <Menubar.Shortcut>⌘T</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            🪟 New Window
            <Menubar.Shortcut>⌘N</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item disabled>New Incognito Window</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Sub>
            <Menubar.SubTrigger>📤 Share</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>✉️ Email</Menubar.Item>
              <Menubar.Item>💬 Messages</Menubar.Item>
              <Menubar.Item>📝 Notes</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator />
          <Menubar.Item>
            🖨️ Print
            <Menubar.Shortcut>⌘P</Menubar.Shortcut>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>
            ↩️ Undo
            <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            ↪️ Redo
            <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>
            ✂️ Cut
            <Menubar.Shortcut>⌘X</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            📋 Copy
            <Menubar.Shortcut>⌘C</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            📌 Paste
            <Menubar.Shortcut>⌘V</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>
            🔍 Find
            <Menubar.Shortcut>⌘F</Menubar.Shortcut>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.CheckboxItem checked>Always Show Bookmarks Bar</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Always Show Full URLs</Menubar.CheckboxItem>
          <Menubar.Separator />
          <Menubar.Item inset>
            🔄 Reload
            <Menubar.Shortcut>⌘R</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item inset disabled>
            Force Reload
            <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item inset>Hide Sidebar</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>Profiles</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.RadioGroup value="work">
            <Menubar.RadioItem value="personal">Personal</Menubar.RadioItem>
            <Menubar.RadioItem value="work">Work</Menubar.RadioItem>
            <Menubar.RadioItem value="guest">Guest</Menubar.RadioItem>
          </Menubar.RadioGroup>
          <Menubar.Separator />
          <Menubar.Item inset>✏️ Edit Profiles</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item inset>➕ Add Profile</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};

export const SimpleMenubar: Story = {
  render: () => (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>Format</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Label>Text Style</Menubar.Label>
          <Menubar.Separator />
          <Menubar.Item>
            <strong>Bold</strong>
            <Menubar.Shortcut>⌘B</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            <em>Italic</em>
            <Menubar.Shortcut>⌘I</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            <u>Underline</u>
            <Menubar.Shortcut>⌘U</Menubar.Shortcut>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>Insert</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>🖼️ Image</Menubar.Item>
          <Menubar.Item>🔗 Link</Menubar.Item>
          <Menubar.Item>📊 Table</Menubar.Item>
          <Menubar.Item>📐 Divider</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>Help</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>📖 Documentation</Menubar.Item>
          <Menubar.Item>💬 Community</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>🐛 Report a Bug</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};
