import type { Meta, StoryObj } from '@storybook/react';
import { AlertStory } from './story-fixtures';

const meta: Meta = { title: 'Atoms/Alert', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <AlertStory /> };
