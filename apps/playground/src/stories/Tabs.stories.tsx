import type { Meta, StoryObj } from '@storybook/react';
import { TabsStory } from './story-fixtures';

const meta: Meta = { title: 'Disclosure/Tabs', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <TabsStory /> };
