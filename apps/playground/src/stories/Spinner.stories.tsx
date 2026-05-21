import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@your-lib/styled';

const meta: Meta<typeof Spinner> = { title: 'Atoms/Spinner', component: Spinner, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Spinner>;
export const Default: Story = {};
