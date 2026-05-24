import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DateTimePicker } from './index';

describe('DateTimePicker (styled)', () => {
  it('renders a calendar and time segments in the popover', () => {
    render(
      <DateTimePicker
        defaultOpen
        defaultValue={new Date(2026, 4, 1, 14, 30)}
        label="Deployment window"
      />,
    );

    expect(screen.getByRole('grid')).toBeTruthy();
    expect(screen.getByRole('spinbutton', { name: 'hour' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sunday, May 24, 2026' })).toBeTruthy();
  });

  it('supports MUI-style value and onChange props', () => {
    const handleChange = vi.fn();

    render(
      <DateTimePicker
        defaultOpen
        defaultValue={new Date(2026, 4, 1, 14, 30)}
        label="Deployment window"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 24, 14, 30),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });
});
