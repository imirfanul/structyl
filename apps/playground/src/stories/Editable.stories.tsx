import type { Meta, StoryObj } from '@storybook/react';
import { EditableStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/Editable', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <EditableStory /> };
