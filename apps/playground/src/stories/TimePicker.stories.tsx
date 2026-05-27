import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePickerStory } from './story-fixtures';
import { TimePicker } from '@aura-ui/styled';

const meta: Meta = { title: 'Specialty/TimePicker', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <TimePickerStory /> };

export const Controlled: Story = {
  render: () => {
    const [time, setTime] = React.useState<Date | null>(new Date(2026, 4, 1, 9, 0));
    return (
      <div className="flex flex-col gap-3">
        <TimePicker
          label="Meeting time"
          value={time}
          onChange={(d) => setTime(d)}
          minutesStep={15}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {time ? time.toLocaleTimeString() : 'none'}
        </p>
      </div>
    );
  },
};

export const AMPM: Story = {
  render: () => (
    <TimePicker
      label="Appointment time"
      defaultValue={new Date(2026, 4, 1, 14, 30)}
      ampm
      minutesStep={15}
      helperText="12-hour clock with AM/PM."
    />
  ),
};

export const TwentyFourHour: Story = {
  render: () => (
    <TimePicker
      label="System time"
      defaultValue={new Date(2026, 4, 1, 14, 30)}
      ampm={false}
      minutesStep={15}
      helperText="24-hour clock."
    />
  ),
};

export const WithSeconds: Story = {
  render: () => (
    <TimePicker
      label="Precise time"
      defaultValue={new Date(2026, 4, 1, 10, 20, 45)}
      views={['hours', 'minutes', 'seconds']}
      helperText="Shows hours, minutes, and seconds."
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <TimePicker
      label="Locked time"
      defaultValue={new Date(2026, 4, 1, 9, 0)}
      disabled
      helperText="This field is disabled."
    />
  ),
};

export const WithMinMaxTime: Story = {
  render: () => (
    <TimePicker
      label="Business hours"
      defaultValue={new Date(2026, 4, 1, 9, 0)}
      minTime={new Date(2026, 4, 1, 9, 0)}
      maxTime={new Date(2026, 4, 1, 17, 0)}
      minutesStep={30}
      helperText="Only 9 AM – 5 PM is selectable."
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <TimePicker
      label="Syncing time"
      loading
      helperText="Fetching available slots."
    />
  ),
};

export const HourOnlyView: Story = {
  render: () => (
    <TimePicker
      label="Hour block"
      defaultValue={new Date(2026, 4, 1, 10, 0)}
      views={['hours']}
      minutesStep={60}
      helperText="Only hour selection."
    />
  ),
};
