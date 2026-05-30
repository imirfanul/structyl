import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DatePicker } from './index';
import { Typography } from '../typography';

const meta = {
  title: 'Styled/DatePicker',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <DatePicker
          value={value}
          onChange={(date) => setValue(date)}
        />
        <Typography variant="muted">
          Selected: {value ? value.toLocaleDateString() : 'None'}
        </Typography>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DatePicker
        label="Date of birth"
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DatePicker
        label="Appointment date"
        helperText="Select a date for your appointment."
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithErrorState: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DatePicker
        label="Expiry date"
        helperText="This field is required."
        error
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(new Date());
    return (
      <DatePicker
        label="Start date"
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithMinMaxDates: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DatePicker
        label="Booking date"
        helperText="Available from one week ago up to 30 days from today."
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const DisablePast: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DatePicker
        label="Future date"
        helperText="Only future dates can be selected."
        disablePast
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker
      label="Disabled picker"
      disabled
      defaultValue={new Date()}
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <DatePicker
      label="Read-only picker"
      readOnly
      value={new Date()}
    />
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <DatePicker
      label="Uncontrolled"
      defaultValue={new Date()}
    />
  ),
};

export const CustomTriggerClassName: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DatePicker
        label="Wide trigger"
        triggerClassName="w-[320px]"
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};
