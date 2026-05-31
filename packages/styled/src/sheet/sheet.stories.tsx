import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import { Link as StructylLink } from '../structyl';
import { Typography } from '../typography';
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
            Make changes to your profile here. Click save when you&apos;re done.
          </Sheet.Description>
        </Sheet.Header>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Typography as="label" variant="body2" htmlFor="sheet-name" className="text-right font-medium">
              Name
            </Typography>
            <Input
              id="sheet-name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Typography as="label" variant="body2" htmlFor="sheet-username" className="text-right font-medium">
              Username
            </Typography>
            <Input
              id="sheet-username"
              defaultValue="@peduarte"
              className="col-span-3"
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
              <Typography variant="muted">
                Content inside the {side} sheet. Use this for navigation menus, filters, or
                detail panels.
              </Typography>
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
              <StructylLink
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </StructylLink>
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
            <Typography variant="h4" className="text-sm font-medium">Category</Typography>
            {['All', 'Components', 'Hooks', 'Utilities', 'Icons'].map((cat) => (
              <Typography as="label" key={cat} variant="body2" className="flex items-center gap-2">
                <Checkbox defaultChecked={cat === 'All'} />
                {cat}
              </Typography>
            ))}
          </div>
          <div className="space-y-2">
            <Typography variant="h4" className="text-sm font-medium">Status</Typography>
            {['Stable', 'Beta', 'Alpha'].map((status) => (
              <Typography as="label" key={status} variant="body2" className="flex items-center gap-2">
                <Checkbox />
                {status}
              </Typography>
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
