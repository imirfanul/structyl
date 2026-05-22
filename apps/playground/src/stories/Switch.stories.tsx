import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@aura-ui/styled';

const meta: Meta<typeof Switch> = { title: 'Atoms/Switch', component: Switch, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Switch>;
export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Switch defaultChecked />
      Notifications
    </label>
  ),
};
