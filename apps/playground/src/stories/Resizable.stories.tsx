import type { Meta, StoryObj } from '@storybook/react';
import { ResizableStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/Resizable', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <ResizableStory /> };
