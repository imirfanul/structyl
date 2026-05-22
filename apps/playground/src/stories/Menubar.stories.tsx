import type { Meta, StoryObj } from '@storybook/react';
import { MenubarStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/Menubar', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <MenubarStory /> };
