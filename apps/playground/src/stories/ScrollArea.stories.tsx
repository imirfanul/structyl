import type { Meta, StoryObj } from '@storybook/react';
import { ScrollAreaStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/ScrollArea', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <ScrollAreaStory /> };
