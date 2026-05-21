import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@your-lib/styled';

const meta: Meta<typeof Calendar> = { title: 'Specialty/Calendar', component: Calendar, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Calendar>;
export const Default: Story = {};
