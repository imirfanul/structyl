import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Input, IncrementTrigger, DecrementTrigger } from './index';

const meta: Meta = {
  title: 'Styled/NumberField',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Root defaultValue={0}>
      <DecrementTrigger />
      <Input />
      <IncrementTrigger />
    </Root>
  ),
};

export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium leading-none">Quantity</label>
      <Root defaultValue={1} min={1} max={99}>
        <DecrementTrigger />
        <Input />
        <IncrementTrigger />
      </Root>
      <p className="text-xs text-muted-foreground">Min: 1 — Max: 99</p>
    </div>
  ),
};

export const WithMinMax: Story = {
  name: 'With min / max bounds',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium leading-none">Age (18–120)</label>
        <Root defaultValue={25} min={18} max={120}>
          <DecrementTrigger />
          <Input />
          <IncrementTrigger />
        </Root>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium leading-none">Rating (1–5)</label>
        <Root defaultValue={3} min={1} max={5}>
          <DecrementTrigger />
          <Input />
          <IncrementTrigger />
        </Root>
      </div>
    </div>
  ),
};

export const CustomStep: Story = {
  name: 'Custom step value',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium leading-none">Price (step: 0.50)</label>
        <Root defaultValue={10} step={0.5} min={0}>
          <DecrementTrigger />
          <Input />
          <IncrementTrigger />
        </Root>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium leading-none">Percentage (step: 5)</label>
        <Root defaultValue={50} step={5} min={0} max={100}>
          <DecrementTrigger />
          <Input />
          <IncrementTrigger />
        </Root>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [value, setValue] = React.useState<number | undefined>(10);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-none">Controlled value</label>
          <Root value={value} onValueChange={setValue} min={0} max={100}>
            <DecrementTrigger />
            <Input />
            <IncrementTrigger />
          </Root>
        </div>
        <p className="text-xs text-muted-foreground">
          Current value: <span className="font-medium">{value ?? 'empty'}</span>
        </p>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  render: () => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium leading-none">Items in cart</label>
      <Root defaultValue={3} readOnly>
        <DecrementTrigger />
        <Input />
        <IncrementTrigger />
      </Root>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Root defaultValue={5} disabled>
      <DecrementTrigger />
      <Input />
      <IncrementTrigger />
    </Root>
  ),
};

export const FormExample: Story = {
  name: 'In a form',
  render: () => (
    <div className="w-[340px] rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 font-semibold">Order details</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Quantity</span>
          <Root defaultValue={1} min={1} max={50}>
            <DecrementTrigger />
            <Input />
            <IncrementTrigger />
          </Root>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Tip (%)</span>
          <Root defaultValue={15} step={5} min={0} max={30}>
            <DecrementTrigger />
            <Input />
            <IncrementTrigger />
          </Root>
        </div>
      </div>
    </div>
  ),
};
