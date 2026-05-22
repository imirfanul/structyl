import type { Meta, StoryObj } from '@storybook/react';
import { TooltipStory } from './story-fixtures';

const meta: Meta = { title: 'Overlays/Tooltip', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <TooltipStory /> };
