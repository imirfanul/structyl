import type { Meta, StoryObj } from '@storybook/react';
import { CommandStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/Command', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <CommandStory /> };
