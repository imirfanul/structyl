import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@your-lib/styled';

const meta: Meta<typeof Label> = { title: 'Atoms/Label', component: Label, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Label>;
export const Default: Story = {};
