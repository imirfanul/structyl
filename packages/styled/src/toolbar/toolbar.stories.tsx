import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Root, Button, Separator, Link } from './index';

const meta: Meta = {
  title: 'Styled/Toolbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => (
    <Root aria-label="Text formatting">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
      <Separator />
      <Button>Align Left</Button>
      <Button>Align Center</Button>
      <Button>Align Right</Button>
      <Separator />
      <Link href="#">Docs</Link>
    </Root>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Root
      aria-label="Drawing tools"
      orientation="vertical"
      className="w-auto flex-col"
    >
      <Button>Pen</Button>
      <Button>Eraser</Button>
      <Button>Fill</Button>
      <Separator />
      <Button>Undo</Button>
      <Button>Redo</Button>
    </Root>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Root aria-label="Editor toolbar">
      <Button>Cut</Button>
      <Button>Copy</Button>
      <Button disabled>Paste</Button>
      <Separator />
      <Button>Select All</Button>
    </Root>
  ),
};

export const EditorToolbar: Story = {
  name: 'Editor Toolbar (realistic)',
  render: () => (
    <Root aria-label="Rich text editor">
      <Button title="Bold (Ctrl+B)">B</Button>
      <Button title="Italic (Ctrl+I)">
        <em>I</em>
      </Button>
      <Button title="Strikethrough">
        <s>S</s>
      </Button>
      <Separator />
      <Button title="Ordered list">OL</Button>
      <Button title="Unordered list">UL</Button>
      <Separator />
      <Button title="Insert link">Link</Button>
      <Button title="Insert image">Img</Button>
      <Separator />
      <Button title="Code block">{'<>'}</Button>
    </Root>
  ),
};
