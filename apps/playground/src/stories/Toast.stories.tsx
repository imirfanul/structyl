import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@aura-ui/styled';

const meta: Meta = { title: 'Overlays/Toast', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Toast story — see playground for full demo</div> };
