import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Trigger, Content } from './index';
import { Button } from '../button';
import { Typography } from '../typography';

const meta: Meta = {
  title: 'Styled/Collapsible',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[360px] rounded-lg border border-border p-4 space-y-2">
      <Root>
        <Trigger className="w-full">
          <span className="text-sm font-medium">Show advanced options</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Trigger>
        <Content>
          <div className="space-y-2 pt-2">
            <Typography variant="body2" className="text-muted-foreground">Timeout: 30s</Typography>
            <Typography variant="body2" className="text-muted-foreground">Retries: 3</Typography>
            <Typography variant="body2" className="text-muted-foreground">Cache: enabled</Typography>
          </div>
        </Content>
      </Root>
    </div>
  ),
};

export const DefaultOpen: Story = {
  name: 'Default open',
  render: () => (
    <div className="w-[360px] rounded-lg border border-border p-4 space-y-2">
      <Root defaultOpen>
        <Trigger className="w-full">
          <span className="text-sm font-medium">Repository details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Trigger>
        <Content>
          <div className="space-y-2 pt-2">
            <Typography variant="body2">Stars: 2.4k</Typography>
            <Typography variant="body2">Forks: 312</Typography>
            <Typography variant="body2">Open issues: 18</Typography>
            <Typography variant="body2">License: MIT</Typography>
          </div>
        </Content>
      </Root>
    </div>
  ),
};

export const Controlled: Story = {
  name: 'Controlled open state',
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="w-[360px] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Open: {open ? 'true' : 'false'}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs underline text-muted-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            Toggle externally
          </Button>
        </div>
        <div className="rounded-lg border border-border p-4">
          <Root open={open} onOpenChange={setOpen}>
            <Trigger className="w-full">
              <span className="text-sm font-medium">Controlled section</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Trigger>
            <Content>
              <Typography variant="body2" className="pt-2 text-muted-foreground">
                This panel&apos;s open state is driven by external React state, demonstrating controlled
                usage of the Collapsible primitive.
              </Typography>
            </Content>
          </Root>
        </div>
      </div>
    );
  },
};

export const NestedList: Story = {
  name: 'Collapsible nested list',
  render: () => (
    <div className="w-[360px] rounded-lg border border-border divide-y divide-border">
      {['Components', 'Hooks', 'Utilities'].map((section) => (
        <div key={section} className="px-4 py-2">
          <Root>
            <Trigger className="w-full py-2">
              <span className="text-sm font-medium">{section}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Trigger>
            <Content>
              <ul className="pb-2 space-y-1">
                {['Item A', 'Item B', 'Item C'].map((item) => (
                  <li key={item} className="text-sm text-muted-foreground pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Content>
          </Root>
        </div>
      ))}
    </div>
  ),
};
