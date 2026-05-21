import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from '@your-lib/styled';

const meta: Meta<typeof CircularProgress> = { title: 'Feedback/CircularProgress', component: CircularProgress, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof CircularProgress>;
export const Default: Story = {};
