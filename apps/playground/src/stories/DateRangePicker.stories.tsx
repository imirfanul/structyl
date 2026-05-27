import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePickerStory } from './story-fixtures';
import { DateRangePicker } from '@aura-ui/styled';

const meta: Meta = { title: 'Specialty/DateRangePicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <DateRangePickerStory /> };

export const Controlled: Story = {
  render: () => {
    const [range, setRange] = React.useState<[Date | null, Date | null]>([
      new Date(2026, 4, 1),
      new Date(2026, 4, 15),
    ]);
    return (
      <div className="flex flex-col gap-3">
        <DateRangePicker
          label="Sprint window"
          value={range}
          onChange={(r) => setRange(r)}
          calendars={1}
        />
        <p className="text-sm text-muted-foreground">
          {range[0]?.toLocaleDateString()} – {range[1]?.toLocaleDateString() ?? '…'}
        </p>
      </div>
    );
  },
};

export const TwoCalendars: Story = {
  render: () => (
    <DateRangePicker
      label="Booking window"
      defaultValue={[new Date(2026, 4, 1), new Date(2026, 4, 14)]}
      calendars={2}
      helperText="Side-by-side month view."
    />
  ),
};

export const WithCustomShortcuts: Story = {
  render: () => (
    <DateRangePicker
      label="Report period"
      calendars={1}
      shortcuts={[
        { label: 'This week', getValue: (today) => [today, today] },
        {
          label: 'Last 14 days',
          getValue: (today) => [
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13),
            today,
          ],
        },
        {
          label: 'This quarter',
          getValue: (today) => {
            const quarter = Math.floor(today.getMonth() / 3);
            return [
              new Date(today.getFullYear(), quarter * 3, 1),
              today,
            ];
          },
        },
      ]}
      helperText="Custom shortcut buttons."
    />
  ),
};

export const NoShortcuts: Story = {
  render: () => (
    <DateRangePicker
      label="Audit range"
      defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 31)]}
      calendars={1}
      shortcuts={false}
      helperText="Shortcut panel is hidden."
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <DateRangePicker
      label="Locked range"
      defaultValue={[new Date(2026, 4, 1), new Date(2026, 4, 14)]}
      disabled
      helperText="Selection is not allowed."
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <DateRangePicker
      label="Fixed range"
      defaultValue={[new Date(2026, 4, 1), new Date(2026, 4, 14)]}
      readOnly
      helperText="Value cannot be changed."
    />
  ),
};

export const WithMinMax: Story = {
  render: () => (
    <DateRangePicker
      label="Q2 window"
      minDate={new Date(2026, 3, 1)}
      maxDate={new Date(2026, 5, 30)}
      calendars={1}
      helperText="Restricted to Q2 2026."
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <DateRangePicker
      label="Availability range"
      loading
      helperText="Fetching available dates."
    />
  ),
};

export const WithValidationError: Story = {
  render: () => {
    const [error, setError] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <DateRangePicker
          label="Restricted range"
          defaultValue={[new Date(2026, 5, 1), new Date(2026, 4, 1)]}
          calendars={1}
          onError={(err) => setError(err ? `Error: ${err}` : null)}
          helperText="From must be before To."
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
};
