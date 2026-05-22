import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@aura-ui/styled';

const meta: Meta<typeof Skeleton> = { title: 'Atoms/Skeleton', component: Skeleton, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Skeleton>;
export const Default: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <Skeleton className="h-20 w-full rounded-md" />
    </div>
  ),
};
