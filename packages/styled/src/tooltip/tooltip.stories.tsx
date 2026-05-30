import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Typography } from '../typography';
import * as Tooltip from './index';

const meta = {
  title: 'Styled/Tooltip',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Typography variant="body2">Add to library</Typography>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const Placements: Story = {
  render: () => (
    <Tooltip.Provider>
      <div className="flex flex-wrap items-center justify-center gap-6 p-16">
        {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger asChild>
              <Button variant="outline" className="capitalize">
                {side}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content side={side}>
              <Typography variant="body2">Tooltip on the {side}</Typography>
            </Tooltip.Content>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip.Provider delayDuration={800}>
      <div className="flex gap-4">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button variant="secondary">Delayed (800ms)</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography variant="body2">Appears after 800ms delay</Typography>
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <Button variant="secondary">Instant</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography variant="body2">Appears instantly</Typography>
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <Tooltip.Provider>
      <div className="flex gap-2">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button size="icon" variant="ghost" aria-label="Bold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
              </svg>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Bold</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button size="icon" variant="ghost" aria-label="Italic">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="19" y1="4" x2="10" y2="4" />
                <line x1="14" y1="20" x2="5" y2="20" />
                <line x1="15" y1="4" x2="9" y2="20" />
              </svg>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Italic</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button size="icon" variant="ghost" aria-label="Underline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
                <line x1="4" y1="21" x2="20" y2="21" />
              </svg>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Underline</Tooltip.Content>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};

export const DisabledElement: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {/* Wrapped in a span so the tooltip works on a disabled button */}
          <span tabIndex={0} className="inline-block">
            <Button disabled>Disabled button</Button>
          </span>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Typography variant="body2">This action is currently unavailable</Typography>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};
