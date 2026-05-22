import type { Meta, StoryObj } from '@storybook/react';
import { Meter } from '@aura-ui/styled';

const meta: Meta<typeof Meter> = { title: 'Feedback/Meter', component: Meter, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Meter>;
export const Default: Story = { args: { value: 72, max: 100, low: 30, high: 80, optimum: 60, label: 'Storage used' } };
