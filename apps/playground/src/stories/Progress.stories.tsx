import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@your-lib/styled';

const meta: Meta<typeof Progress> = { title: 'Atoms/Progress', component: Progress, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Progress>;
export const Default: Story = {};
