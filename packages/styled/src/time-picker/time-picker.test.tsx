import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TimePicker } from './index';

describe('TimePicker (styled)', () => {
  it('renders a MUI-style time field', () => {
    render(
      <TimePicker
        label="Start time"
        defaultValue={new Date(2026, 4, 23, 9, 30)}
        ampm
      />,
    );

    expect(screen.getByRole('button', { name: 'Start time' })).toBeTruthy();
    expect(screen.getByText('9:30 AM')).toBeTruthy();
  });

  it('calls onChange with validation context when a time option is selected', () => {
    const handleChange = vi.fn();

    render(
      <TimePicker
        label="Start time"
        defaultValue={new Date(2026, 4, 23, 9, 30)}
        onChange={handleChange}
        minutesStep={15}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Start time' }));
    fireEvent.click(screen.getByRole('button', { name: '10 hours' }));

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 23, 10, 30),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('supports seconds as a clock selector', () => {
    const handleChange = vi.fn();

    render(
      <TimePicker
        label="System time"
        defaultValue={new Date(2026, 4, 23, 5, 33, 0)}
        onChange={handleChange}
        views={['hours', 'minutes', 'seconds']}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'System time' }));
    fireEvent.click(screen.getByRole('button', { name: 'Select seconds' }));

    expect(screen.getByRole('group', { name: 'Seconds clock' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '60 seconds' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: '45 seconds' }));

    expect(handleChange).toHaveBeenLastCalledWith(
      new Date(2026, 4, 23, 5, 33, 45),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });
});
