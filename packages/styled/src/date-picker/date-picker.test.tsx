import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './index';

describe('DatePicker (styled)', () => {
  it('renders a usable calendar in compound content', () => {
    render(
      <DatePicker.Root defaultOpen defaultValue={new Date(2026, 4, 1)}>
        <DatePicker.Trigger aria-label="Release date" />
        <DatePicker.Content />
      </DatePicker.Root>,
    );

    expect(screen.getByRole('grid')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sunday, May 24, 2026' })).toBeTruthy();
  });

  it('supports MUI-style value and onChange props', () => {
    const handleChange = vi.fn();

    render(
      <DatePicker
        defaultOpen
        defaultValue={new Date(2026, 4, 1)}
        label="Release date"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 24),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });
});
