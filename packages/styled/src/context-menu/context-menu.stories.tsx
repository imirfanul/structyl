import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as ContextMenu from './index';

const meta: Meta = {
  title: 'Components/ContextMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="flex h-36 w-72 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
          Right-click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>
          <span>🔄</span> Refresh
        </ContextMenu.Item>
        <ContextMenu.Item>
          <span>📋</span> Copy
        </ContextMenu.Item>
        <ContextMenu.Item>
          <span>✂️</span> Cut
        </ContextMenu.Item>
        <ContextMenu.Item>
          <span>📌</span> Paste
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item disabled>
          <span>🔒</span> Properties
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="flex h-36 w-72 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
          Right-click for file options
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>
          <span>📂</span> Open
        </ContextMenu.Item>
        <ContextMenu.Item>
          <span>👁️</span> Open With
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>
            <span>📤</span> Share
          </ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>✉️ Email</ContextMenu.Item>
            <ContextMenu.Item>💬 Messages</ContextMenu.Item>
            <ContextMenu.Item>☁️ AirDrop</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item>
          <span>ℹ️</span> Get Info
        </ContextMenu.Item>
        <ContextMenu.Item className="text-destructive focus:text-destructive">
          <span>🗑️</span> Move to Trash
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
};

export const WithCheckboxAndRadio: Story = {
  render: () => {
    const [showGrid, setShowGrid] = React.useState(false);
    const [showRulers, setShowRulers] = React.useState(true);
    const [view, setView] = React.useState('icons');

    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div className="flex h-36 w-72 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
            Right-click for view options
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Label>View</ContextMenu.Label>
          <ContextMenu.RadioGroup value={view} onValueChange={setView}>
            <ContextMenu.RadioItem value="icons">Icons</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="list">List</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="columns">Columns</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="gallery">Gallery</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
          <ContextMenu.Separator />
          <ContextMenu.Label>Options</ContextMenu.Label>
          <ContextMenu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
            Show Grid
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
            Show Rulers
          </ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },
};
