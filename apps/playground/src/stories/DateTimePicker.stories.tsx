import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePickerStory } from './story-fixtures';
import { DateTimePicker } from '@aura-ui/styled';

const meta: Meta = { title: 'Specialty/DateTimePicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <DateTimePickerStory /> };

export const Controlled: Story = {
  render: () => {
    const [dt, setDt] = React.useState<Date | null>(new Date(2026, 4, 15, 10, 0));
    return (
      <div className="flex flex-col gap-3">
        <DateTimePicker
          label="Deployment window"
          value={dt}
          onChange={(d) => setDt(d)}
          minutesStep={15}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {dt ? dt.toLocaleString() : 'none'}
        </p>
      </div>
    );
  },
};

export const AMPM: Story = {
  render: () => (
    <DateTimePicker
      label="Event start"
      defaultValue={new Date(2026, 4, 15, 14, 0)}
      ampm
      minutesStep={15}
      helperText="12-hour clock mode."
    />
  ),
};

export const TwentyFourHour: Story = {
  render: () => (
    <DateTimePicker
      label="Server restart"
      defaultValue={new Date(2026, 4, 15, 22, 30)}
      ampm={false}
      minutesStep={30}
      helperText="24-hour clock mode."
    />
  ),
};

export const FifteenMinuteSteps: Story = {
  render: () => (
    <DateTimePicker
      label="Meeting slot"
      defaultValue={new Date(2026, 4, 15, 9, 0)}
      minutesStep={15}
      helperText="Minutes snap to 15-minute increments."
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <DateTimePicker
      label="Locked datetime"
      defaultValue={new Date(2026, 4, 1, 14, 30)}
      disabled
      helperText="This field is disabled."
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <DateTimePicker
      label="Confirmed at"
      defaultValue={new Date(2026, 4, 1, 14, 30)}
      readOnly
      helperText="Value is fixed."
    />
  ),
};

export const WithMinMaxDateTime: Story = {
  render: () => (
    <DateTimePicker
      label="Scheduled run"
      defaultValue={new Date(2026, 4, 15, 10, 0)}
      minDateTime={new Date(2026, 4, 1, 8, 0)}
      maxDateTime={new Date(2026, 4, 31, 20, 0)}
      minutesStep={15}
      helperText="Restricted to May 2026, 8 AM – 8 PM."
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <DateTimePicker
      label="Syncing schedule"
      loading
      helperText="Fetching available slots."
    />
  ),
};

export const CustomFormat: Story = {
  render: () => (
    <DateTimePicker
      label="ISO datetime"
      defaultValue={new Date(2026, 4, 15, 14, 30)}
      format="yyyy-MM-dd HH:mm"
      helperText="Displayed in ISO-like format."
    />
  ),
};

export const WithValidationError: Story = {
  render: () => {
    const [error, setError] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <DateTimePicker
          label="Future only"
          defaultValue={new Date(2025, 0, 1, 0, 0)}
          disablePast
          onError={(err) => setError(err ? `Validation: ${err}` : null)}
          helperText="Must be in the future."
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
};

export const CompoundAPI: Story = {
  render: () => (
    <DateTimePicker.Root defaultValue={new Date(2026, 4, 15, 10, 30)}>
      <DateTimePicker.Trigger className="rounded border px-3 py-2 text-sm">
        <DateTimePicker.Value
          format={{ dateStyle: 'medium', timeStyle: 'short' }}
          placeholder="Pick date & time"
        />
      </DateTimePicker.Trigger>
      <DateTimePicker.Content />
    </DateTimePicker.Root>
  ),
};
