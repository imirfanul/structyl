import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Item } from './index';
import { Typography } from '../typography';

const meta = {
  title: 'Styled/ToggleGroup',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Root type="single" defaultValue="center" aria-label="Text alignment">
      <Item value="left" aria-label="Left">Left</Item>
      <Item value="center" aria-label="Center">Center</Item>
      <Item value="right" aria-label="Right">Right</Item>
    </Root>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Root type="multiple" defaultValue={['bold']} aria-label="Text formatting">
      <Item value="bold" aria-label="Bold"><strong>B</strong></Item>
      <Item value="italic" aria-label="Italic"><em>I</em></Item>
      <Item value="underline" aria-label="Underline"><span className="underline">U</span></Item>
      <Item value="strike" aria-label="Strikethrough"><span className="line-through">S</span></Item>
    </Root>
  ),
};

export const Outline: Story = {
  render: () => (
    <Root type="single" defaultValue="md" variant="outline" aria-label="Size">
      <Item value="sm">SM</Item>
      <Item value="md">MD</Item>
      <Item value="lg">LG</Item>
      <Item value="xl">XL</Item>
    </Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Root type="single" defaultValue="a" size="sm" variant="outline" aria-label="Small group">
        <Item value="a">Alpha</Item>
        <Item value="b">Beta</Item>
        <Item value="c">Gamma</Item>
      </Root>
      <Root type="single" defaultValue="a" size="default" variant="outline" aria-label="Default group">
        <Item value="a">Alpha</Item>
        <Item value="b">Beta</Item>
        <Item value="c">Gamma</Item>
      </Root>
      <Root type="single" defaultValue="a" size="lg" variant="outline" aria-label="Large group">
        <Item value="a">Alpha</Item>
        <Item value="b">Beta</Item>
        <Item value="c">Gamma</Item>
      </Root>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Root type="single" defaultValue="center" disabled aria-label="Disabled group">
      <Item value="left">Left</Item>
      <Item value="center">Center</Item>
      <Item value="right">Right</Item>
    </Root>
  ),
};

export const ControlledSingle: Story = {
  render: () => {
    const [value, setValue] = React.useState('grid');
    return (
      <div className="flex flex-col gap-3">
        <Root
          type="single"
          value={value}
          onValueChange={(v) => { if (v) setValue(v); }}
          aria-label="View mode"
          variant="outline"
        >
          <Item value="list">List</Item>
          <Item value="grid">Grid</Item>
          <Item value="kanban">Kanban</Item>
        </Root>
        <Typography variant="muted">
          View: <span className="font-mono font-medium">{value}</span>
        </Typography>
      </div>
    );
  },
};

export const ControlledMultiple: Story = {
  render: () => {
    const [values, setValues] = React.useState<string[]>(['bold']);
    return (
      <div className="flex flex-col gap-3">
        <Root
          type="multiple"
          value={values}
          onValueChange={setValues}
          aria-label="Text formatting"
        >
          <Item value="bold"><strong>B</strong></Item>
          <Item value="italic"><em>I</em></Item>
          <Item value="underline"><span className="underline">U</span></Item>
        </Root>
        <Typography variant="muted">
          Active:{' '}
          <span className="font-mono">
            {values.length > 0 ? values.join(', ') : 'none'}
          </span>
        </Typography>
      </div>
    );
  },
};
