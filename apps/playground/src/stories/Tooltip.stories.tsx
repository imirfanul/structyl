import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@aura-ui/styled';

const meta: Meta = { title: 'Overlays/Tooltip', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Tooltip story — see playground for full demo</div> };
