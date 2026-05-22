import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/ContextMenu', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <ContextMenuStory /> };
