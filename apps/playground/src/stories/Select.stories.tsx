import type { Meta, StoryObj } from '@storybook/react';
import { SelectStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/Select', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <SelectStory /> };
