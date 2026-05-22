import type { Meta, StoryObj } from '@storybook/react';
import { DrawerStory } from './story-fixtures';

const meta: Meta = { title: 'Overlays/Drawer', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <DrawerStory /> };
