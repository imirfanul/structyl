import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TimePicker, TimePickerPanel } from './index';
import { Typography } from '../typography';

const meta = {
  title: 'Styled/TimePicker',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <TimePicker
          value={value}
          onChange={(date) => setValue(date)}
        />
        <Typography variant="muted">
          Selected:{' '}
          {value
            ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'None'}
        </Typography>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <TimePicker
        label="Appointment time"
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
      <TimePicker
        label="Meeting time"
        helperText="Select a time for your meeting."
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
      <TimePicker
        label="Start time"
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
      <TimePicker
        label="Time (24h)"
        ampm={false}
        format={{ timeStyle: 'short', hour12: false }}
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
      <TimePicker
        label="Precise time"
        withSeconds
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
      <TimePicker
        label="Time (15-min steps)"
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
      <TimePicker
        label="Business hours"
        helperText="Select a time between 9:00 AM and 5:00 PM."
        minTime={minTime}
        maxTime={maxTime}
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const preset = new Date();
    preset.setHours(14, 30, 0, 0);
    return (
      <TimePicker
        label="Disabled picker"
        disabled
        value={preset}
      />
    );
  },
};

export const CloseOnSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (
      <TimePicker
        label="Close on select"
        closeOnSelect
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const PanelOnly: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(() => {
      const d = new Date();
      d.setHours(10, 30, 0, 0);
      return d;
    });
    return (
      <div className="flex flex-col gap-4">
        <TimePickerPanel
          value={value}
          onChange={(date) => setValue(date)}
          onAccept={(date) => setValue(date)}
          onCancel={() => setValue(null)}
        />
        <Typography variant="muted">
          Selected:{' '}
          {value
            ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'None'}
        </Typography>
      </div>
    );
  },
};

export const PanelWithoutActions: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(() => {
      const d = new Date();
      d.setHours(8, 0, 0, 0);
      return d;
    });
    return (
      <TimePickerPanel
        value={value}
        onChange={(date) => setValue(date)}
        showActions={false}
      />
    );
  },
};
