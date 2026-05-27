import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DateTimePicker } from './index';

const May1_14h30 = new Date(2026, 4, 1, 14, 30);

describe('DateTimePicker (styled)', () => {
  it('shows the time picker after a date is selected', () => {
    render(
      <DateTimePicker
        defaultOpen
        defaultValue={May1_14h30}
        label="Deployment window"
      />,
    );

    expect(screen.getByRole('grid')).toBeTruthy();
    expect(screen.queryByRole('group', { name: 'Hours clock' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(screen.getByRole('group', { name: 'Hours clock' })).toBeTruthy();
    expect(screen.getByText('SELECT TIME')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Change date' })).toBeTruthy();
  });

  it('supports MUI-style value and onChange props', () => {
    const handleChange = vi.fn();

    render(
      <DateTimePicker
        defaultOpen
        defaultValue={May1_14h30}
        label="Deployment window"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 24, 14, 30),
      expect.objectContaining({ source: 'view', validationError: null }),
    );

    // 3 hours = 3 PM in 12h mode (default ampm=true); maps to hour 15 in 24h
    fireEvent.click(screen.getByRole('button', { name: '3 hours' }));

    expect(handleChange).toHaveBeenLastCalledWith(
      new Date(2026, 4, 24, 15, 30),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('shows the field label', () => {
    render(<DateTimePicker label="Schedule at" />);

    expect(screen.getByRole('button', { name: 'Schedule at' })).toBeTruthy();
  });

  it('shows helper text', () => {
    render(<DateTimePicker label="Event time" helperText="Select date then time" />);

    expect(screen.getByText('Select date then time')).toBeTruthy();
  });

  it('shows placeholder when no value is set', () => {
    render(<DateTimePicker label="Meeting start" placeholder="Pick date & time" />);

    expect(screen.getByText('Pick date & time')).toBeTruthy();
  });

  it('shows formatted datetime in trigger', () => {
    render(<DateTimePicker label="Job run" defaultValue={May1_14h30} />);

    const trigger = screen.getByRole('button', { name: 'Job run' });
    expect(trigger.textContent).toMatch(/May 1, 2026/i);
  });

  it('trigger is disabled when disabled prop is set', () => {
    render(<DateTimePicker label="Locked time" disabled defaultValue={May1_14h30} />);

    expect(screen.getByRole('button', { name: 'Locked time' })).toBeDisabled();
  });

  it('Change date button navigates back to date view', () => {
    render(
      <DateTimePicker
        defaultOpen
        defaultValue={May1_14h30}
        label="Deployment window"
      />,
    );

    // Navigate to time panel
    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));
    expect(screen.getByRole('group', { name: 'Hours clock' })).toBeTruthy();

    // Go back to date panel
    fireEvent.click(screen.getByRole('button', { name: 'Change date' }));
    expect(screen.getByRole('grid')).toBeTruthy();
  });

  it('calls onAccept after a full date-time is committed', () => {
    const handleAccept = vi.fn();

    render(
      <DateTimePicker
        defaultOpen
        defaultValue={May1_14h30}
        label="Accept test"
        minutesStep={30}
        onAccept={handleAccept}
      />,
    );

    // Select date
    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));
    // 3 hours = 3 PM in 12h mode (default ampm=true); maps to hour 15 in 24h
    fireEvent.click(screen.getByRole('button', { name: '3 hours' }));
    // Select minute to close
    fireEvent.click(screen.getByRole('button', { name: '30 minutes' }));

    expect(handleAccept).toHaveBeenCalledWith(
      expect.any(Date),
      expect.objectContaining({ source: 'view' }),
    );
  });

  it('supports ampm mode', () => {
    render(
      <DateTimePicker
        label="AM/PM test"
        defaultValue={new Date(2026, 4, 1, 9, 0)}
        ampm
      />,
    );

    expect(screen.getByText(/9:00 AM/i)).toBeTruthy();
  });

  it('shows loading content via renderLoading', () => {
    render(
      <DateTimePicker.Root defaultOpen loading renderLoading={() => <span>Loading…</span>}>
        <DateTimePicker.Trigger aria-label="Loading picker" />
        <DateTimePicker.Content>
          <DateTimePicker.Loading />
        </DateTimePicker.Content>
      </DateTimePicker.Root>,
    );

    expect(screen.getByText('Loading…')).toBeTruthy();
  });
});
