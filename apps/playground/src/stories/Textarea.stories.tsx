import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@aura-ui/styled';

const meta: Meta<typeof Textarea> = { title: 'Form/Textarea', component: Textarea, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Textarea>;
export const Default: Story = { args: { 'aria-label': 'Message', placeholder: 'Write a message', className: 'w-72' } };
