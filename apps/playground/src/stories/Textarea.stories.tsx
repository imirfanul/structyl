import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@your-lib/styled';

const meta: Meta<typeof Textarea> = { title: 'Form/Textarea', component: Textarea, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Textarea>;
export const Default: Story = {};
