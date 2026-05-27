import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import * as Sheet from './index';

const meta = {
  title: 'Styled/Sheet',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Edit Profile</Sheet.Title>
          <Sheet.Description>
            Make changes to your profile here. Click save when you're done.
          </Sheet.Description>
        </Sheet.Header>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="sheet-name" className="text-right text-sm font-medium">
              Name
            </label>
            <input
              id="sheet-name"
              defaultValue="Pedro Duarte"
              className="col-span-3 flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="sheet-username" className="text-right text-sm font-medium">
              Username
            </label>
            <input
              id="sheet-username"
              defaultValue="@peduarte"
              className="col-span-3 flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            />
          </div>
        </div>
        <Sheet.Footer>
          <Sheet.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Sheet.Close>
          <Button>Save changes</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  ),
};

export const SideVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Sheet.Root key={side}>
          <Sheet.Trigger asChild>
            <Button variant="outline" className="capitalize">
              Open {side}
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side={side}>
            <Sheet.Header>
              <Sheet.Title className="capitalize">{side} Sheet</Sheet.Title>
              <Sheet.Description>
                This sheet slides in from the {side}.
              </Sheet.Description>
            </Sheet.Header>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Content inside the {side} sheet. Use this for navigation menus, filters, or
                detail panels.
              </p>
            </div>
            <Sheet.Footer>
              <Sheet.Close asChild>
                <Button variant="outline">Close</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet.Root>
      ))}
    </div>
  ),
};

export const NavigationMenu: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <Sheet.Header>
          <Sheet.Title>Navigation</Sheet.Title>
        </Sheet.Header>
        <nav className="mt-6 flex flex-col gap-1">
          {['Home', 'Components', 'Documentation', 'Examples', 'Blog', 'GitHub'].map((item) => (
            <Sheet.Close asChild key={item}>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </a>
            </Sheet.Close>
          ))}
        </nav>
      </Sheet.Content>
    </Sheet.Root>
  ),
};

export const FilterPanel: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button variant="outline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-2 h-4 w-4">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
        </Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Filter Results</Sheet.Title>
          <Sheet.Description>Narrow down results using the filters below.</Sheet.Description>
        </Sheet.Header>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Category</h4>
            {['All', 'Components', 'Hooks', 'Utilities', 'Icons'].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked={cat === 'All'} className="h-4 w-4" />
                {cat}
              </label>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Status</h4>
            {['Stable', 'Beta', 'Alpha'].map((status) => (
              <label key={status} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" />
                {status}
              </label>
            ))}
          </div>
        </div>
        <Sheet.Footer className="mt-8">
          <Sheet.Close asChild>
            <Button variant="outline">Reset</Button>
          </Sheet.Close>
          <Sheet.Close asChild>
            <Button>Apply Filters</Button>
          </Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  ),
};
