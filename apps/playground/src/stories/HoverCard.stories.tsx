import type { Meta, StoryObj } from '@storybook/react';
import { HoverCardStory } from './story-fixtures';

const meta: Meta = { title: 'Overlays/HoverCard', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <HoverCardStory /> };
