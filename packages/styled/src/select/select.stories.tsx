import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { within, expect, waitFor } from 'storybook/test';
import * as Select from './index';

const meta: Meta = {
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('combobox'));
    const body = within(canvasElement.ownerDocument.body);
    const listbox = await body.findByRole('listbox');
    await waitFor(() => expect(listbox).toBeVisible(), { timeout: 3000 });
  },
  render: () => (
    <div className="w-64">
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Select a fruit..." />
        </Select.Trigger>
        <Select.Content showCreateItem={false}>
          <Select.Item value="apple">🍎 Apple</Select.Item>
          <Select.Item value="banana">🍌 Banana</Select.Item>
          <Select.Item value="blueberry">🫐 Blueberry</Select.Item>
          <Select.Item value="grapes">🍇 Grapes</Select.Item>
          <Select.Item value="pineapple">🍍 Pineapple</Select.Item>
          <Select.Item value="strawberry">🍓 Strawberry</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const WithGroupsAndLabels: Story = {
  render: () => (
    <div className="w-64">
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Select a timezone..." />
        </Select.Trigger>
        <Select.Content showCreateItem={false}>
          <Select.Group>
            <Select.Label>North America</Select.Label>
            <Select.Item value="est">Eastern Standard Time (EST)</Select.Item>
            <Select.Item value="cst">Central Standard Time (CST)</Select.Item>
            <Select.Item value="mst">Mountain Standard Time (MST)</Select.Item>
            <Select.Item value="pst">Pacific Standard Time (PST)</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Europe</Select.Label>
            <Select.Item value="gmt">Greenwich Mean Time (GMT)</Select.Item>
            <Select.Item value="cet">Central European Time (CET)</Select.Item>
            <Select.Item value="eet">Eastern European Time (EET)</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Asia Pacific</Select.Label>
            <Select.Item value="jst">Japan Standard Time (JST)</Select.Item>
            <Select.Item value="aest">Australian Eastern Time (AEST)</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <div className="flex w-64 flex-col gap-3">
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger>
            <Select.Value placeholder="Select a framework..." />
          </Select.Trigger>
          <Select.Content showCreateItem={false}>
            <Select.Item value="react">⚛️ React</Select.Item>
            <Select.Item value="vue">💚 Vue</Select.Item>
            <Select.Item value="svelte">🧡 Svelte</Select.Item>
            <Select.Item value="angular">🔺 Angular</Select.Item>
            <Select.Item value="solid">🟦 Solid</Select.Item>
          </Select.Content>
        </Select.Root>
        {value && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{value}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Select.Root disabled>
        <Select.Trigger>
          <Select.Value placeholder="Select an option..." />
        </Select.Trigger>
        <Select.Content showCreateItem={false}>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <div className="w-64">
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Select a plan..." />
        </Select.Trigger>
        <Select.Content showCreateItem={false}>
          <Select.Item value="free">🆓 Free</Select.Item>
          <Select.Item value="pro">⭐ Pro</Select.Item>
          <Select.Item value="enterprise" disabled>
            🏢 Enterprise (Contact Sales)
          </Select.Item>
          <Select.Item value="startup">🚀 Startup</Select.Item>
          <Select.Item value="student" disabled>
            🎓 Student (Waitlist)
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const WithVirtualizedOptions: Story = {
  render: () => {
    const options = Array.from({ length: 100 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    }));

    return (
      <div className="w-64">
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select from 100 options..." />
          </Select.Trigger>
          <Select.Content options={options} showCreateItem={false} />
        </Select.Root>
      </div>
    );
  },
};
