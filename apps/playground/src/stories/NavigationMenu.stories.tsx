import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/NavigationMenu', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <NavigationMenuStory /> };
