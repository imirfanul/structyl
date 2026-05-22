import type { Meta, StoryObj } from '@storybook/react';
import { NumberFieldStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/NumberField', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <NumberFieldStory /> };
