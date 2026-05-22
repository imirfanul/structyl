import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroupStory } from './story-fixtures';

const meta: Meta = { title: 'Form/ToggleGroup', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <ToggleGroupStory /> };
