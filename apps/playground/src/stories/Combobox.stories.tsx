import type { Meta, StoryObj } from '@storybook/react';
import { ComboboxStory } from './story-fixtures';

const meta: Meta = { title: 'Compound/Combobox', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <ComboboxStory /> };
