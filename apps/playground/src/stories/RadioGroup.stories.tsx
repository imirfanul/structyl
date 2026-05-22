import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroupStory } from './story-fixtures';

const meta: Meta = { title: 'Form/RadioGroup', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <RadioGroupStory /> };
