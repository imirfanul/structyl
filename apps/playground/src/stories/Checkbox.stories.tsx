import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@aura-ui/styled';

const meta: Meta<typeof Checkbox> = { title: 'Atoms/Checkbox', component: Checkbox, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox defaultChecked />
      Accept terms
    </label>
  ),
};
