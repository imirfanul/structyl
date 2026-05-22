import type { Meta, StoryObj } from '@storybook/react';
import { SheetStory } from './story-fixtures';

const meta: Meta = { title: 'Overlays/Sheet', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <SheetStory /> };
