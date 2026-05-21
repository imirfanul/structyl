import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@aura-ui/styled';

const meta: Meta = { title: 'Atoms/Card', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Card story — see playground for full demo</div> };
