import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Root as ScrollArea, Scrollbar } from './index';

const meta: Meta = {
  title: 'Styled/ScrollArea',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const tags = [
  'React', 'TypeScript', 'Tailwind', 'Accessibility', 'ARIA',
  'Components', 'Design System', 'Open Source', 'UI Library', 'Hooks',
  'Animation', 'Theming', 'CSS Variables', 'Compound Pattern', 'Radix',
  'Storybook', 'Vitest', 'Playwright', 'ESLint', 'Prettier',
];

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-semibold leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <div className="my-2 h-px bg-border" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-md border border-border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-32 w-28 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <Scrollbar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded-md border border-border">
      <div className="w-[600px] p-4">
        <h4 className="mb-3 text-sm font-semibold">Wide + tall content</h4>
        {Array.from({ length: 30 }, (_, row) => (
          <div key={row} className="mb-1 flex gap-4">
            {Array.from({ length: 6 }, (_, col) => (
              <span key={col} className="shrink-0 text-xs text-muted-foreground">
                R{row + 1}/C{col + 1}
              </span>
            ))}
          </div>
        ))}
      </div>
      <Scrollbar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const ShortContent: Story = {
  name: 'Short Content (no scroll)',
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-2 text-sm font-semibold">Short list</h4>
        {['Apple', 'Banana', 'Cherry'].map((item) => (
          <div key={item} className="py-1 text-sm">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
