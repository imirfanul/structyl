import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@your-lib/styled';

const meta: Meta = { title: 'Atoms/Avatar', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Avatar story — see playground for full demo</div> };
