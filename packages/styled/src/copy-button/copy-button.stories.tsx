import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CopyButton } from './index';
import type { CopyButtonProps } from './index';
import { Typography } from '../typography';

const meta: Meta<CopyButtonProps> = {
  title: 'Styled/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    resetAfter: { control: { type: 'number', min: 500, max: 10000, step: 500 } },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CopyButtonProps>;

export const Default: Story = {
  args: {
    value: 'Hello, world!',
  },
};

export const WithCustomResetDelay: Story = {
  name: 'Custom Reset Delay (500ms)',
  args: {
    value: 'Copied text',
    resetAfter: 500,
  },
};

export const LongDelay: Story = {
  name: 'Long Reset Delay (5s)',
  args: {
    value: 'This stays green for 5 seconds',
    resetAfter: 5000,
  },
};

export const Disabled: Story = {
  args: {
    value: 'You cannot copy this',
    disabled: true,
  },
};

export const InlineWithCode: Story = {
  name: 'Inline with Code Block',
  render: () => (
    <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
      <code className="flex-1 font-mono text-sm">npm install @aura-ui/styled</code>
      <CopyButton value="npm install @aura-ui/styled" />
    </div>
  ),
};

export const MultipleButtons: Story = {
  name: 'Multiple Copy Buttons',
  render: () => {
    const snippets = [
      { label: 'Install package', code: 'pnpm add @aura-ui/styled' },
      { label: 'Import component', code: "import { Button } from '@aura-ui/styled'" },
      { label: 'Add provider', code: "<ThemeProvider>...</ThemeProvider>" },
    ];
    return (
      <div className="flex w-96 flex-col gap-2">
        {snippets.map((snippet) => (
          <div
            key={snippet.label}
            className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2"
          >
            <div className="flex-1 min-w-0">
              <Typography variant="muted" className="text-xs">{snippet.label}</Typography>
              <code className="truncate font-mono text-sm">{snippet.code}</code>
            </div>
            <CopyButton value={snippet.code} resetAfter={2000} />
          </div>
        ))}
      </div>
    );
  },
};

export const WithCallback: Story = {
  name: 'With onCopied Callback',
  render: () => (
    <CopyButton
      value="Text with callback"
      onCopied={(v) => window.alert(`Copied: "${v}"`)}
    />
  ),
};
