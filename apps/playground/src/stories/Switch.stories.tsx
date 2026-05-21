import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@your-lib/styled';

const meta: Meta<typeof Switch> = { title: 'Atoms/Switch', component: Switch, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Switch>;
export const Default: Story = {};
