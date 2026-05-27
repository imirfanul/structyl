import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Item } from './index';
import { Label } from '../label';

const meta = {
  title: 'Styled/RadioGroup',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Root defaultValue="option-1" className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Item value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <Item value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <Item value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </Root>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Root defaultValue="xs" orientation="horizontal" className="flex flex-row gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-1.5">
          <Item value={size} id={`size-${size}`} />
          <Label htmlFor={`size-${size}`}>{size.toUpperCase()}</Label>
        </div>
      ))}
    </Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Root defaultValue="option-1" className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Item value="option-1" id="d-r1" />
        <Label htmlFor="d-r1">Enabled option</Label>
      </div>
      <div className="flex items-center gap-2">
        <Item value="option-2" id="d-r2" disabled />
        <Label htmlFor="d-r2">Disabled option</Label>
      </div>
      <div className="flex items-center gap-2">
        <Item value="option-3" id="d-r3" />
        <Label htmlFor="d-r3">Another enabled option</Label>
      </div>
    </Root>
  ),
};

export const GroupDisabled: Story = {
  render: () => (
    <Root defaultValue="option-1" disabled className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Item value="option-1" id="gd-r1" />
        <Label htmlFor="gd-r1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <Item value="option-2" id="gd-r2" />
        <Label htmlFor="gd-r2">Option 2</Label>
      </div>
    </Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('standard');
    const plans = [
      { value: 'free', label: 'Free', description: '$0 / month' },
      { value: 'standard', label: 'Standard', description: '$12 / month' },
      { value: 'pro', label: 'Pro', description: '$29 / month' },
    ];
    return (
      <div className="flex flex-col gap-4">
        <Root value={value} onValueChange={setValue} className="flex flex-col gap-3">
          {plans.map((plan) => (
            <label
              key={plan.value}
              htmlFor={`plan-${plan.value}`}
              className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer has-[[data-state=checked]]:border-primary"
            >
              <Item value={plan.value} id={`plan-${plan.value}`} />
              <div>
                <p className="text-sm font-medium">{plan.label}</p>
                <p className="text-xs text-muted-foreground">{plan.description}</p>
              </div>
            </label>
          ))}
        </Root>
        <p className="text-sm text-muted-foreground">
          Selected plan: <span className="font-mono font-medium">{value}</span>
        </p>
      </div>
    );
  },
};
