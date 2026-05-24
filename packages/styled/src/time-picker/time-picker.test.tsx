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
    fireEvent.click(screen.getByRole('option', { name: '10' }));

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 23, 10, 30),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });
});
