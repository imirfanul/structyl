import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Link as AuraLink } from '../material';
import { Typography } from '../typography';
import * as HoverCard from './index';

const meta = {
  title: 'Styled/HoverCard',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <AuraLink
          href="#"
          className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"
          onClick={(e) => e.preventDefault()}
        >
          @aura_ui
        </AuraLink>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div className="flex justify-between space-x-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            AU
          </div>
          <div className="space-y-1">
            <Typography variant="h4" className="text-sm font-semibold">@aura_ui</Typography>
            <Typography variant="muted">
              The open-source React component library — built for accessibility and DX.
            </Typography>
            <div className="flex items-center pt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <Typography as="span" variant="muted" className="text-xs">Joined May 2024</Typography>
            </div>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Typography as="span" variant="muted">Posted by</Typography>
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <AuraLink
            href="#"
            className="text-sm font-semibold hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Jane Smith
          </AuraLink>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold">
                JS
              </div>
              <div>
                <Typography variant="body2" className="font-semibold">Jane Smith</Typography>
                <Typography variant="muted" className="text-xs">Senior Engineer</Typography>
              </div>
            </div>
            <Typography variant="muted">
              Building accessible UI components. Open source enthusiast. TypeScript fanatic.
            </Typography>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <Typography as="span" variant="muted" className="text-xs"><strong className="text-fg">128</strong> posts</Typography>
              <Typography as="span" variant="muted" className="text-xs"><strong className="text-fg">4.2k</strong> followers</Typography>
              <Typography as="span" variant="muted" className="text-xs"><strong className="text-fg">312</strong> following</Typography>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Root>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 p-16">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <HoverCard.Root key={side} openDelay={0}>
          <HoverCard.Trigger asChild>
            <AuraLink
              href="#"
              className="text-sm font-medium underline underline-offset-4 capitalize"
              onClick={(e) => e.preventDefault()}
            >
              Hover ({side})
            </AuraLink>
          </HoverCard.Trigger>
          <HoverCard.Content side={side}>
            <Typography variant="body2">Card appears on the <strong>{side}</strong>.</Typography>
          </HoverCard.Content>
        </HoverCard.Root>
      ))}
    </div>
  ),
};

export const WithOpenCloseDelay: Story = {
  render: () => (
    <div className="flex gap-6">
      <HoverCard.Root openDelay={0} closeDelay={0}>
        <HoverCard.Trigger asChild>
          <AuraLink
            href="#"
            className="text-sm font-medium underline underline-offset-4"
            onClick={(e) => e.preventDefault()}
          >
            No delay
          </AuraLink>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Typography variant="body2">Opens and closes instantly.</Typography>
        </HoverCard.Content>
      </HoverCard.Root>

      <HoverCard.Root openDelay={500} closeDelay={300}>
        <HoverCard.Trigger asChild>
          <AuraLink
            href="#"
            className="text-sm font-medium underline underline-offset-4"
            onClick={(e) => e.preventDefault()}
          >
            With delay (500ms open / 300ms close)
          </AuraLink>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Typography variant="body2">Opens after 500ms, closes after 300ms.</Typography>
        </HoverCard.Content>
      </HoverCard.Root>
    </div>
  ),
};
