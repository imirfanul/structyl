import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@aura-ui/styled';

const meta: Meta<typeof Label> = { title: 'Atoms/Label', component: Label, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Label>;
export const Default: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="label-story-email">Email address</Label>
      <input id="label-story-email" className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" />
    </div>
  ),
};
