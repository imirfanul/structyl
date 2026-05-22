import type { Meta, StoryObj } from '@storybook/react';
import { CardStory } from './story-fixtures';

const meta: Meta = { title: 'Atoms/Card', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <CardStory /> };
