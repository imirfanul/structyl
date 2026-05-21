import type { Meta, StoryObj } from '@storybook/react';
import { Tree } from '@your-lib/styled';

const meta: Meta = { title: 'Feedback/Tree', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Tree story — see playground for full demo</div> };
