import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from '@your-lib/styled';

const meta: Meta = { title: 'Disclosure/Collapsible', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Collapsible story — see playground for full demo</div> };
