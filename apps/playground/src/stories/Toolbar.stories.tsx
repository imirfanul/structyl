import type { Meta, StoryObj } from '@storybook/react';
import { ToolbarStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/Toolbar', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <ToolbarStory /> };
