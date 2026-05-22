import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@aura-ui/styled';

const meta: Meta<typeof Input> = { title: 'Form/Input', component: Input, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Input>;
export const Default: Story = { args: { 'aria-label': 'Email address', placeholder: 'you@example.com' } };
