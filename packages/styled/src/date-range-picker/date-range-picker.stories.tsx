import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DateRangePicker } from './index';

const meta = {
  title: 'Styled/DateRangePicker',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <DateRangePicker
          value={value}
          onValueChange={(range) => setValue(range)}
        />
        <p className="text-sm text-muted-foreground">
          From: {value?.from ? value.from.toLocaleDateString() : 'None'} &mdash; To:{' '}
          {value?.to ? value.to.toLocaleDateString() : 'None'}
        </p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <DateRangePicker
        label="Vacation dates"
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <DateRangePicker
        label="Stay period"
        helperText="Select your check-in and check-out dates."
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const WithErrorState: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <DateRangePicker
        label="Date range"
        helperText="A date range is required."
        error
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const SingleCalendar: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <DateRangePicker
        label="Date range"
        calendars={1}
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const ThreeCalendars: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <DateRangePicker
        label="Date range"
        calendars={3}
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const WithShortcuts: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    const shortcuts = [
      {
        label: 'Today',
        getValue: (today: Date) => ({ from: today, to: today }),
        closeOnSelect: true,
      },
      {
        label: 'Last 7 days',
        getValue: (today: Date) => {
          const from = new Date(today);
          from.setDate(from.getDate() - 6);
          return { from, to: today };
        },
        closeOnSelect: true,
      },
      {
        label: 'Last 30 days',
        getValue: (today: Date) => {
          const from = new Date(today);
          from.setDate(from.getDate() - 29);
          return { from, to: today };
        },
        closeOnSelect: true,
      },
      {
        label: 'This month',
        getValue: (today: Date) => {
          const from = new Date(today.getFullYear(), today.getMonth(), 1);
          const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          return { from, to };
        },
        closeOnSelect: true,
      },
    ];
    return (
      <div className="flex flex-col gap-4">
        <DateRangePicker
          label="Report period"
          shortcuts={shortcuts}
          value={value}
          onValueChange={(range) => setValue(range)}
        />
        <p className="text-sm text-muted-foreground">
          From: {value?.from ? value.from.toLocaleDateString() : 'None'} &mdash; To:{' '}
          {value?.to ? value.to.toLocaleDateString() : 'None'}
        </p>
      </div>
    );
  },
};

export const NoShortcuts: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <DateRangePicker
        label="Date range"
        shortcuts={false}
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const WithPreselectedRange: Story = {
  render: () => {
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), 1);
    const to = new Date(today.getFullYear(), today.getMonth(), 15);
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>({ from, to });
    return (
      <DateRangePicker
        label="Billing period"
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const DisablePast: Story = {
  render: () => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date } | null>(null);
    return (
      <DateRangePicker
        label="Future range only"
        disablePast
        value={value}
        onValueChange={(range) => setValue(range)}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), 1);
    const to = new Date(today.getFullYear(), today.getMonth(), 15);
    return (
      <DateRangePicker
        label="Disabled range picker"
        disabled
        defaultValue={{ from, to }}
      />
    );
  },
};
