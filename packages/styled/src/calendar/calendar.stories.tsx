import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Calendar } from './index';
import { Typography } from '../typography';

const meta = {
  title: 'Styled/Calendar',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(value) => setSelected(value as Date | undefined)}
        />
        <Typography variant="muted">
          Selected: {selected ? selected.toLocaleDateString() : 'None'}
        </Typography>
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const today = new Date();
    const [selected, setSelected] = React.useState<Date | undefined>(today);
    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(value) => setSelected(value as Date | undefined)}
        />
        <Typography variant="muted">
          Selected: {selected ? selected.toLocaleDateString() : 'None'}
        </Typography>
      </div>
    );
  },
};

export const HideOutsideDays: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(value) => setSelected(value as Date | undefined)}
        showOutsideDays={false}
      />
    );
  },
};

export const RangeSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<{ from?: Date; to?: Date } | undefined>(undefined);
    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={(value) => setSelected(value as { from?: Date; to?: Date } | undefined)}
        />
        <Typography variant="muted">
          From: {selected?.from ? selected.from.toLocaleDateString() : 'None'} &mdash; To:{' '}
          {selected?.to ? selected.to.toLocaleDateString() : 'None'}
        </Typography>
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date[] | undefined>(undefined);
    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="multiple"
          selected={selected}
          onSelect={(value) => setSelected(value as Date[] | undefined)}
        />
        <Typography variant="muted">
          Selected:{' '}
          {selected && selected.length > 0
            ? selected.map((d) => d.toLocaleDateString()).join(', ')
            : 'None'}
        </Typography>
      </div>
    );
  },
};

export const WithMinMaxDates: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const [selected, setSelected] = React.useState<Date | undefined>(undefined);
    return (
      <div className="flex flex-col gap-4">
        <Typography variant="muted" className="text-xs">
          Only dates within ±7 days from today are selectable.
        </Typography>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(value) => setSelected(value as Date | undefined)}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Typography variant="muted">
          Selected: {selected ? selected.toLocaleDateString() : 'None'}
        </Typography>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Calendar
      mode="single"
      selected={new Date()}
      disabled
    />
  ),
};
