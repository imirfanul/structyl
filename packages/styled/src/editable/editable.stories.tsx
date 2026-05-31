import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Preview, Input } from './index';
import { Typography } from '../typography';

const meta: Meta = {
  title: 'Styled/Editable',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Name:</span>
      <Root defaultValue="Jane Doe">
        <Preview />
        <Input />
      </Root>
    </div>
  ),
};

export const WithPlaceholder: Story = {
  name: 'With placeholder',
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Title:</span>
      <Root>
        <Preview>Click to add a title…</Preview>
        <Input placeholder="Enter title" />
      </Root>
    </div>
  ),
};

export const SubmitOnEnter: Story = {
  name: 'Submit on Enter',
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography variant="muted">Press Enter to confirm, Escape to cancel.</Typography>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Task:</span>
        <Root defaultValue="Write unit tests" submitMode="enter">
          <Preview />
          <Input />
        </Root>
      </div>
    </div>
  ),
};

export const SubmitOnBlur: Story = {
  name: 'Submit on blur',
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography variant="muted">Click away to confirm, Escape to cancel.</Typography>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Description:</span>
        <Root defaultValue="Click me to edit" submitMode="blur">
          <Preview />
          <Input />
        </Root>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('Initial value');
    const [submitted, setSubmitted] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Label:</span>
          <Root
            value={value}
            onValueChange={setValue}
            onSubmit={(v) => setSubmitted(v)}
          >
            <Preview />
            <Input />
          </Root>
        </div>
        <Typography variant="muted">
          Current: <span className="font-medium">{value}</span>
        </Typography>
        {submitted && (
          <Typography variant="muted" className="text-success">
            Last submitted: <span className="font-medium">{submitted}</span>
          </Typography>
        )}
      </div>
    );
  },
};

export const InlineList: Story = {
  name: 'Inline editable list',
  render: () => {
    const [items, setItems] = React.useState([
      'Design system tokens',
      'Accessibility review',
      'Performance audit',
    ]);
    return (
      <ul className="flex w-[360px] flex-col gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 rounded p-1 hover:bg-accent/50">
            <span className="text-muted-foreground">•</span>
            <Root
              value={item}
              onValueChange={(v) =>
                setItems((prev) => prev.map((x, idx) => (idx === i ? v : x)))
              }
            >
              <Preview />
              <Input className="text-sm" />
            </Root>
          </li>
        ))}
      </ul>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2 opacity-50">
      <span className="text-sm text-muted-foreground">Read-only:</span>
      <Root defaultValue="Cannot edit this" disabled>
        <Preview />
        <Input />
      </Root>
    </div>
  ),
};
