import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect } from 'storybook/test';
import { Checkbox } from './index';
import { Label } from '../label';
import { Button } from '../button';
import { Typography } from '../typography';

const meta = {
  component: Checkbox,
  tags: ['ai-generated'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="default-cb" />
      <Label htmlFor="default-cb">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked-cb" defaultChecked />
      <Label htmlFor="checked-cb">Checked by default</Label>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="indeterminate-cb" checked="indeterminate" />
      <Label htmlFor="indeterminate-cb">Indeterminate state</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked">Disabled (unchecked)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">Disabled (checked)</Label>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  play: async ({ canvas, userEvent }) => {
    const cb = canvas.getByRole('checkbox');
    await expect(cb).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(cb);
    await expect(cb).toHaveAttribute('aria-checked', 'true');
  },
  render: () => {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled-cb"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled-cb">Controlled checkbox</Label>
        </div>
        <Typography variant="muted">
          State: <span className="font-mono">{String(checked)}</span>
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChecked(true)}
          >
            Check
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChecked(false)}
          >
            Uncheck
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChecked('indeterminate')}
          >
            Indeterminate
          </Button>
        </div>
      </div>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const options = [
      { id: 'email', label: 'Email notifications' },
      { id: 'sms', label: 'SMS notifications' },
      { id: 'push', label: 'Push notifications' },
    ];
    const [selected, setSelected] = React.useState<string[]>(['email']);

    const toggle = (id: string) =>
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );

    return (
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium mb-1">Notification preferences</legend>
        {options.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={selected.includes(id)}
              onCheckedChange={() => toggle(id)}
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </fieldset>
    );
  },
};
