import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@your-lib/styled';

const meta: Meta = { title: 'Atoms/Alert', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Alert story — see playground for full demo</div> };
