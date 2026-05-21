import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from '@your-lib/styled';

const meta: Meta = { title: 'Overlays/Sheet', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Sheet story — see playground for full demo</div> };
