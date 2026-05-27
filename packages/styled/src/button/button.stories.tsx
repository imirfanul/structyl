import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect } from 'storybook/test';
import { Button } from './index';

const meta = {
  component: Button,
  tags: ['ai-generated'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Button', variant: 'default', size: 'default' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /button/i });
    await expect(btn).not.toHaveAttribute('aria-disabled', 'true');
  },
};

/** One CssCheck for the whole project: h-9 (Tailwind) = 36px; display: inline-flex. Fails if CSS did not load. */
export const CssCheck: Story = {
  args: { children: 'Submit', variant: 'default', size: 'default' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /submit/i });
    await expect(getComputedStyle(btn).height).toBe('36px');
    await expect(getComputedStyle(btn).display).toBe('inline-flex');
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon-sm" aria-label="Small icon button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Button>
      <Button size="icon" aria-label="Default icon button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Button>
      <Button size="icon-lg" aria-label="Large icon button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default" disabled>Default</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="link" disabled>Link</Button>
    </div>
  ),
};
