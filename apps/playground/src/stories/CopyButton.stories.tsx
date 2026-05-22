import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from '@aura-ui/styled';

const meta: Meta<typeof CopyButton> = { title: 'Feedback/CopyButton', component: CopyButton, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof CopyButton>;
export const Default: Story = {
  args: { value: 'npm install @aura-ui/styled' },
  render: (args) => (
    <div className="flex items-center gap-2">
      <code className="rounded-md bg-muted px-2 py-1 text-sm">npm install @aura-ui/styled</code>
      <CopyButton {...args} />
    </div>
  ),
};
