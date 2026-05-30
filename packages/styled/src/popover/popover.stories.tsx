import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Typography } from '../typography';
import { Checkbox } from '../checkbox';
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
          <Typography variant="h4" className="text-sm font-semibold">Dimensions</Typography>
          <Typography variant="muted">
            Set the dimensions for the layer.
          </Typography>
          <div className="grid grid-cols-3 items-center gap-4 pt-2">
            <Typography as="label" variant="body2">Width</Typography>
            <Input
              className="col-span-2"
              size="sm"
              defaultValue="100%"
            />
            <Typography as="label" variant="body2">Max. width</Typography>
            <Input
              className="col-span-2"
              size="sm"
              defaultValue="300px"
            />
            <Typography as="label" variant="body2">Height</Typography>
            <Input
              className="col-span-2"
              size="sm"
              defaultValue="25px"
            />
            <Typography as="label" variant="body2">Max. height</Typography>
            <Input
              className="col-span-2"
              size="sm"
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
            <Typography variant="body2">Popover on the <strong>{side}</strong>.</Typography>
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
          <Typography variant="h4" className="text-sm font-semibold">Notification settings</Typography>
          <div className="flex items-center justify-between">
            <Typography as="label" variant="muted">Email notifications</Typography>
            <Checkbox defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Typography as="label" variant="muted">Push notifications</Typography>
            <Checkbox />
          </div>
          <div className="flex items-center justify-between">
            <Typography as="label" variant="muted">SMS alerts</Typography>
            <Checkbox />
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
            <Typography variant="body2">Aligned to <strong>{align}</strong>.</Typography>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
};
