import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePickerStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/DateTimePicker', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <DateTimePickerStory /> };
