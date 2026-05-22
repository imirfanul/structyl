import type { Meta, StoryObj } from '@storybook/react';
import { TimePickerStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/TimePicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <TimePickerStory /> };
