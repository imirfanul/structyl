import type { Meta, StoryObj } from '@storybook/react';
import { Editable } from '@your-lib/styled';

const meta: Meta = { title: 'Feedback/Editable', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Editable story — see playground for full demo</div> };
