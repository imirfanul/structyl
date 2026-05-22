import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/DatePicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <DatePickerStory /> };
