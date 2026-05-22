import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/DropdownMenu', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <DropdownMenuStory /> };
