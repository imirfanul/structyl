import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DateTimePicker } from './index';

const meta = {
  title: 'Styled/DateTimePicker',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <DateTimePicker
          value={value}
          onChange={(date) => setValue(date)}
        />
        <p className="text-sm text-muted-foreground">
          Selected:{' '}
          {value
            ? value.toLocaleString([], {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : 'None'}
        </p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DateTimePicker
        label="Appointment"
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
      <DateTimePicker
        label="Schedule for"
        helperText="Select the date and time for your event."
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
      <DateTimePicker
        label="Event time"
        helperText="This field is required."
        error
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const TwentyFourHour: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DateTimePicker
        label="Date and time (24h)"
        ampm={false}
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithSeconds: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DateTimePicker
        label="Precise date and time"
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithMinutesStep: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DateTimePicker
        label="Scheduled time (15-min steps)"
        minutesStep={15}
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithMinMaxTime: Story = {
  render: () => {
    const minTime = new Date();
    minTime.setHours(9, 0, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(17, 0, 0, 0);
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <DateTimePicker
        label="Business hours only"
        helperText="Time must be between 9:00 AM and 5:00 PM."
        minTime={minTime}
        maxTime={maxTime}
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithPreselectedValue: Story = {
  render: () => {
    const preset = new Date();
    preset.setHours(10, 30, 0, 0);
    const [value, setValue] = React.useState<Date | null>(preset);
    return (
      <DateTimePicker
        label="Next meeting"
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
      <DateTimePicker
        label="Future appointment"
        disablePast
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const preset = new Date();
    preset.setHours(14, 0, 0, 0);
    return (
      <DateTimePicker
        label="Disabled picker"
        disabled
        value={preset}
      />
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    const preset = new Date();
    preset.setHours(9, 30, 0, 0);
    return (
      <DateTimePicker
        label="Read-only"
        readOnly
        value={preset}
      />
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    const preset = new Date();
    preset.setHours(12, 0, 0, 0);
    return (
      <DateTimePicker
        label="Uncontrolled"
        defaultValue={preset}
      />
    );
  },
};
