import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelectStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/MultiSelect', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <MultiSelectStory /> };
