import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@aura-ui/styled';

const meta: Meta<typeof Progress> = { title: 'Atoms/Progress', component: Progress, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Progress>;
export const Default: Story = { args: { value: 66, 'aria-label': 'Upload progress', className: 'w-72' } };
