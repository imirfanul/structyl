import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@aura-ui/styled';

const meta: Meta<typeof AspectRatio> = { title: 'Atoms/AspectRatio', component: AspectRatio, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof AspectRatio>;
export const Default: Story = {
  render: () => (
    <div className="w-72">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border border-border bg-muted">
        <div className="flex h-full w-full items-center justify-center text-sm font-medium">16:9 preview</div>
      </AspectRatio>
    </div>
  ),
};
