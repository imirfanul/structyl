import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerStory } from './story-fixtures';
import { DatePicker } from '@aura-ui/styled';

const meta: Meta = { title: 'Specialty/DatePicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <DatePickerStory /> };

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date(2026, 4, 15));
    return (
      <div className="flex flex-col gap-3">
        <DatePicker
          label="Release date"
          value={date}
          onChange={(d) => setDate(d)}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : 'none'}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker
      label="Locked date"
      defaultValue={new Date(2026, 4, 1)}
      disabled
      helperText="This field is read-only."
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <DatePicker
      label="Scheduled date"
      defaultValue={new Date(2026, 4, 1)}
      readOnly
      helperText="Value is fixed and cannot be changed."
    />
  ),
};

export const WithMinMax: Story = {
  render: () => (
    <DatePicker
      label="Availability window"
      defaultValue={new Date(2026, 4, 15)}
      minDate={new Date(2026, 4, 1)}
      maxDate={new Date(2026, 4, 31)}
      helperText="Only May 2026 dates are selectable."
    />
  ),
};

export const DisablePastFuture: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker
        label="No past dates"
        disablePast
        helperText="Cannot select dates before today."
      />
      <DatePicker
        label="No future dates"
        disableFuture
        helperText="Cannot select dates after today."
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <DatePicker
      label="Event date"
      loading
      helperText="Calendar data is loading."
    />
  ),
};

export const CustomFormat: Story = {
  render: () => (
    <DatePicker
      label="Formatted date"
      defaultValue={new Date(2026, 4, 15)}
      format="MM/dd/yyyy"
      helperText="Displayed in MM/DD/YYYY format."
    />
  ),
};

export const WithValidationError: Story = {
  render: () => {
    const [error, setError] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <DatePicker
          label="Conference date"
          defaultValue={new Date(2025, 0, 1)}
          minDate={new Date(2026, 0, 1)}
          onError={(err) => setError(err ? `Validation: ${err}` : null)}
          helperText="Must be in 2026 or later."
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
};

export const CompoundAPI: Story = {
  render: () => (
    <DatePicker.Root defaultValue={new Date(2026, 4, 15)}>
      <DatePicker.Trigger className="rounded border px-3 py-2 text-sm">
        <DatePicker.Value format={{ dateStyle: 'full' }} placeholder="Choose a date" />
      </DatePicker.Trigger>
      <DatePicker.Content />
    </DatePicker.Root>
  ),
};
