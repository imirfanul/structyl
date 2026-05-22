import type { Meta, StoryObj } from '@storybook/react';
import { PopoverStory } from './story-fixtures';

const meta: Meta = { title: 'Overlays/Popover', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <PopoverStory /> };
