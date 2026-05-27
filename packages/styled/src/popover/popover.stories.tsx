import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import * as Popover from './index';

const meta = {
  title: 'Styled/Popover',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Dimensions</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
          <div className="grid grid-cols-3 items-center gap-4 pt-2">
            <label className="text-sm">Width</label>
            <input
              className="col-span-2 h-8 rounded-md border border-border bg-transparent px-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              defaultValue="100%"
            />
            <label className="text-sm">Max. width</label>
            <input
              className="col-span-2 h-8 rounded-md border border-border bg-transparent px-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              defaultValue="300px"
            />
            <label className="text-sm">Height</label>
            <input
              className="col-span-2 h-8 rounded-md border border-border bg-transparent px-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              defaultValue="25px"
            />
            <label className="text-sm">Max. height</label>
            <input
              className="col-span-2 h-8 rounded-md border border-border bg-transparent px-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              defaultValue="none"
            />
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4 p-16">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover.Root key={side}>
          <Popover.Trigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </Popover.Trigger>
          <Popover.Content side={side}>
            <p className="text-sm">Popover on the <strong>{side}</strong>.</p>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
};

export const WithClose: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Settings</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Notification settings</h4>
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Email notifications</label>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Push notifications</label>
            <input type="checkbox" className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">SMS alerts</label>
            <input type="checkbox" className="h-4 w-4" />
          </div>
          <Popover.Close asChild>
            <Button size="sm" className="w-full">
              Save preferences
            </Button>
          </Popover.Close>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const AlignVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Popover.Root key={align}>
          <Popover.Trigger asChild>
            <Button variant="outline" className="capitalize">
              Align {align}
            </Button>
          </Popover.Trigger>
          <Popover.Content align={align}>
            <p className="text-sm">Aligned to <strong>{align}</strong>.</p>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
};
