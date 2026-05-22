import type { Meta, StoryObj } from '@storybook/react';
import { AvatarStory } from './story-fixtures';

const meta: Meta = { title: 'Atoms/Avatar', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <AvatarStory /> };
