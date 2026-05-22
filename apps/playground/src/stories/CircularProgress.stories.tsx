import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from '@aura-ui/styled';

const meta: Meta<typeof CircularProgress> = { title: 'Feedback/CircularProgress', component: CircularProgress, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof CircularProgress>;
export const Default: Story = { args: { value: 66, label: 'Upload progress' } };
