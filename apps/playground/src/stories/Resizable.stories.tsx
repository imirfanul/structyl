import type { Meta, StoryObj } from '@storybook/react';
import { Resizable } from '@your-lib/styled';

const meta: Meta = { title: 'Feedback/Resizable', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Resizable story — see playground for full demo</div> };
