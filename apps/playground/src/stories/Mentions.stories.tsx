import type { Meta, StoryObj } from '@storybook/react';
import { Mentions } from '@your-lib/styled';

const meta: Meta = { title: 'Feedback/Mentions', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Mentions story — see playground for full demo</div> };
