import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DateRangePicker } from './index';

describe('DateRangePicker (styled)', () => {
  it('renders a usable range calendar in compound content', () => {
    render(
      <DateRangePicker.Root
        defaultOpen
        defaultValue={{ from: new Date(2026, 4, 1), to: new Date(2026, 4, 7) }}
      >
        <DateRangePicker.Trigger aria-label="Sprint range" />
        <DateRangePicker.Content calendars={1} />
      </DateRangePicker.Root>,
    );

    expect(screen.getByRole('grid')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sunday, May 24, 2026' })).toBeTruthy();
  });

  it('supports MUI-style tuple value and onChange props', () => {
    const handleChange = vi.fn();

    render(
      <DateRangePicker
        calendars={1}
        defaultOpen
        defaultValue={[new Date(2026, 4, 10), null]}
        label="Sprint range"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleChange).toHaveBeenCalledWith(
      [new Date(2026, 4, 10), new Date(2026, 4, 24)],
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('supports shortcut action buttons', () => {
    const handleChange = vi.fn();

    render(
      <DateRangePicker
        calendars={1}
        defaultOpen
        label="Report range"
        onChange={handleChange}
        shortcuts={[
          {
            label: 'Last 7 days',
            getValue: () => [new Date(2026, 4, 18), new Date(2026, 4, 24)],
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Last 7 days' }));

    expect(handleChange).toHaveBeenCalledWith(
      [new Date(2026, 4, 18), new Date(2026, 4, 24)],
      expect.objectContaining({ source: 'shortcut', validationError: null }),
    );
  });
});
