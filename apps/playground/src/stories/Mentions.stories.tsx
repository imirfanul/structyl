import type { Meta, StoryObj } from '@storybook/react';
import { MentionsStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/Mentions', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <MentionsStory /> };
