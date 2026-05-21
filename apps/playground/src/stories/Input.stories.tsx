import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@your-lib/styled';

const meta: Meta<typeof Input> = { title: 'Form/Input', component: Input, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Input>;
export const Default: Story = {};
