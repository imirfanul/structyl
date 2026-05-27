import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Toggle } from './index';

const meta = {
  title: 'Styled/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    children: 'Toggle',
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: 'Pressed',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
};

export const SizesOutline: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" size="sm">Small</Toggle>
      <Toggle variant="outline" size="default">Default</Toggle>
      <Toggle variant="outline" size="lg">Large</Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled defaultPressed>
        Disabled Pressed
      </Toggle>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <div className="flex flex-col gap-3">
        <Toggle
          pressed={pressed}
          onPressedChange={setPressed}
          variant="outline"
        >
          {pressed ? 'Bold' : 'Bold'}
        </Toggle>
        <p className="text-sm text-muted-foreground">
          Pressed: <span className="font-mono">{String(pressed)}</span>
        </p>
      </div>
    );
  },
};

export const TextFormattingBar: Story = {
  render: () => {
    const [bold, setBold] = React.useState(false);
    const [italic, setItalic] = React.useState(false);
    const [underline, setUnderline] = React.useState(false);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 rounded-md border border-border p-1 w-fit">
          <Toggle
            size="sm"
            variant="default"
            pressed={bold}
            onPressedChange={setBold}
            aria-label="Bold"
          >
            <strong>B</strong>
          </Toggle>
          <Toggle
            size="sm"
            variant="default"
            pressed={italic}
            onPressedChange={setItalic}
            aria-label="Italic"
          >
            <em>I</em>
          </Toggle>
          <Toggle
            size="sm"
            variant="default"
            pressed={underline}
            onPressedChange={setUnderline}
            aria-label="Underline"
          >
            <span className="underline">U</span>
          </Toggle>
        </div>
        <p
          className="text-sm"
          style={{
            fontWeight: bold ? 700 : 400,
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
          }}
        >
          Preview text — toggle the buttons above to format this text.
        </p>
      </div>
    );
  },
};
