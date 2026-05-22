import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePickerStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/DateRangePicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <DateRangePickerStory /> };
