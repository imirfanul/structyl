import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleStory } from './story-fixtures';

const meta: Meta = { title: 'Disclosure/Collapsible', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <CollapsibleStory /> };
