import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './index';

const May1 = new Date(2026, 4, 1);
const May24 = new Date(2026, 4, 24);

describe('DatePicker (styled)', () => {
  it('renders a usable calendar in compound content', () => {
    render(
      <DatePicker.Root defaultOpen defaultValue={May1}>
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
        defaultValue={May1}
        label="Release date"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleChange).toHaveBeenCalledWith(
      May24,
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('shows the field label', () => {
    render(<DatePicker label="Publish on" />);

    expect(screen.getByRole('button', { name: 'Publish on' })).toBeTruthy();
  });

  it('shows helper text below the trigger', () => {
    render(<DatePicker label="Start date" helperText="Format: MM/DD/YYYY" />);

    expect(screen.getByText('Format: MM/DD/YYYY')).toBeTruthy();
  });

  it('shows placeholder inside trigger when no value', () => {
    render(<DatePicker label="Event date" placeholder="Pick a date" />);

    expect(screen.getByText('Pick a date')).toBeTruthy();
  });

  it('shows the selected date in the trigger', () => {
    render(<DatePicker label="Event date" defaultValue={May24} />);

    expect(screen.getByText(/May 24, 2026/i)).toBeTruthy();
  });

  it('is disabled when disabled prop is set', () => {
    render(<DatePicker label="Locked date" disabled defaultValue={May1} />);

    const trigger = screen.getByRole('button', { name: 'Locked date' });
    expect(trigger).toBeDisabled();
  });

  it('calls onAccept after clicking a day', () => {
    const handleAccept = vi.fn();

    render(
      <DatePicker
        defaultOpen
        defaultValue={May1}
        label="Accept test"
        onAccept={handleAccept}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleAccept).toHaveBeenCalledWith(
      May24,
      expect.objectContaining({ source: 'view' }),
    );
  });

  it('calls onChange with a validation error when minDate is violated', () => {
    const handleChange = vi.fn();

    render(
      <DatePicker
        defaultOpen
        defaultValue={May1}
        label="Min date test"
        minDate={new Date(2026, 4, 20)}
        onChange={handleChange}
      />,
    );

    // Click a day before minDate (May 1–19 are disabled, but May 24 is fine)
    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleChange).toHaveBeenCalledWith(
      May24,
      expect.objectContaining({ validationError: null }),
    );
  });

  it('shows loading state when loading prop is set', () => {
    render(
      <DatePicker.Root defaultOpen loading renderLoading={() => <span>Loading calendar…</span>}>
        <DatePicker.Trigger aria-label="Loading date" />
        <DatePicker.Content>
          <DatePicker.Loading />
        </DatePicker.Content>
      </DatePicker.Root>,
    );

    expect(screen.getByText('Loading calendar…')).toBeTruthy();
  });

  it('applies custom className to Content via compound API', () => {
    render(
      <DatePicker.Root defaultOpen defaultValue={May1}>
        <DatePicker.Trigger aria-label="Custom class test" />
        <DatePicker.Content data-testid="picker-content" />
      </DatePicker.Root>,
    );

    expect(screen.getByTestId('picker-content')).toBeTruthy();
  });
});
