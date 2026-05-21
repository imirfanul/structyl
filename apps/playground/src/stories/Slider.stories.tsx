import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@aura-ui/styled';

const meta: Meta<typeof Slider> = { title: 'Form/Slider', component: Slider, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Slider>;
export const Default: Story = {};
