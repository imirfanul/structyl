import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@aura-ui/styled';

const meta: Meta<typeof Separator> = { title: 'Atoms/Separator', component: Separator, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Separator>;
export const Default: Story = {
  render: () => (
    <div className="w-72 text-sm">
      <p>aura-ui</p>
      <Separator className="my-3" />
      <div className="flex h-5 items-center gap-3">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  ),
};
