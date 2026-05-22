import type { Meta, StoryObj } from '@storybook/react';
import { ColorPickerStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/ColorPicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <ColorPickerStory /> };
