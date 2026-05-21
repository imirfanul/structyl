import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from '@your-lib/styled';

const meta: Meta = { title: 'Overlays/HoverCard', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>HoverCard story — see playground for full demo</div> };
