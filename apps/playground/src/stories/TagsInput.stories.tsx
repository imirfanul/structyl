import type { Meta, StoryObj } from '@storybook/react';
import { TagsInputStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/TagsInput', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <TagsInputStory /> };
