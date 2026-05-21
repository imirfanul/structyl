import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@your-lib/styled';

const meta: Meta<typeof Skeleton> = { title: 'Atoms/Skeleton', component: Skeleton, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Skeleton>;
export const Default: Story = {};
