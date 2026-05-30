import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect } from 'storybook/test';
import { Switch } from './index';
import { Label } from '../label';
import { Typography } from '../typography';

const meta = {
  component: Switch,
  tags: ['ai-generated'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="default-switch" />
      <Label htmlFor="default-switch">Airplane mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="on-switch" defaultChecked />
      <Label htmlFor="on-switch">Enabled by default</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="sm-switch" size="sm" defaultChecked />
        <Label htmlFor="sm-switch">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="md-switch" size="md" defaultChecked />
        <Label htmlFor="md-switch">Medium (default)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="lg-switch" size="lg" defaultChecked />
        <Label htmlFor="lg-switch">Large</Label>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off">Disabled (off)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on">Disabled (on)</Label>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole('switch');
    await expect(sw).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute('aria-checked', 'true');
  },
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Switch
            id="controlled-switch"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled-switch">
            {checked ? 'Notifications on' : 'Notifications off'}
          </Label>
        </div>
        <Typography variant="body2" className="text-muted-foreground">
          State: <span className="font-mono">{String(checked)}</span>
        </Typography>
      </div>
    );
  },
};

export const SwitchList: Story = {
  render: () => {
    const settings = [
      { id: 'marketing', label: 'Marketing emails', description: 'Receive updates about new features.' },
      { id: 'security', label: 'Security alerts', description: 'Get notified about suspicious activity.', defaultChecked: true },
      { id: 'newsletter', label: 'Weekly newsletter', description: 'A summary of activity each week.' },
    ];
    return (
      <div className="flex flex-col divide-y divide-border rounded-lg border">
        {settings.map(({ id, label, description, defaultChecked }) => (
          <div key={id} className="flex items-center justify-between px-4 py-3 gap-4">
            <div>
              <Typography variant="body2" className="font-medium">{label}</Typography>
              <Typography variant="muted">{description}</Typography>
            </div>
            <Switch id={id} defaultChecked={defaultChecked} />
          </div>
        ))}
      </div>
    );
  },
};
