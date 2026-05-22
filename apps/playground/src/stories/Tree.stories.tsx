import type { Meta, StoryObj } from '@storybook/react';
import { TreeStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/Tree', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <TreeStory /> };
