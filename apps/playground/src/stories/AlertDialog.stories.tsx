import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from '@your-lib/styled';

const meta: Meta = { title: 'Overlays/AlertDialog', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>AlertDialog story — see playground for full demo</div> };
