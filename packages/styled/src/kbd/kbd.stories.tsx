import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Kbd, KeyCombo } from './index';

const meta = {
  title: 'Styled/Kbd',
  component: Kbd,
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Enter' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4">
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Tab</Kbd>
      <Kbd size="lg">Space</Kbd>
    </div>
  ),
};

export const ModifierKeys: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-4">
      {['⌘', '⌥', '⇧', '⌃', '⌫', '↵', '⇥'].map(k => (
        <Kbd key={k}>{k}</Kbd>
      ))}
    </div>
  ),
};

export const Combos: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Open command palette</span>
        <KeyCombo keys={['⌘', 'K']} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Save document</span>
        <KeyCombo keys={['⌘', 'S']} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Find and replace</span>
        <KeyCombo keys={['⌘', '⇧', 'H']} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Toggle terminal</span>
        <KeyCombo keys={['⌃', '`']} />
      </div>
    </div>
  ),
};
