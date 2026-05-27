import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TimePicker } from './index';

const baseDate = new Date(2026, 4, 23, 9, 30);

describe('TimePicker (styled)', () => {
  it('renders a MUI-style time field', () => {
    render(
      <TimePicker
        label="Start time"
        defaultValue={baseDate}
        ampm
      />,
    );

    expect(screen.getByRole('button', { name: 'Start time' })).toBeTruthy();
    expect(screen.getByText('9:30 AM')).toBeTruthy();
  });

  it('calls onChange with validation context when an hour is selected', () => {
    const handleChange = vi.fn();

    render(
      <TimePicker
        label="Start time"
        defaultValue={baseDate}
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

  it('shows all 12 clock-face positions for minutes regardless of minutesStep', () => {
    render(
      <TimePicker
        label="Step test"
        defaultValue={baseDate}
        minutesStep={15}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Step test' }));
    // Navigate to minutes view
    fireEvent.click(screen.getByRole('button', { name: 'Select minutes' }));

    // All 12 five-minute marks must be present on the clock face
    expect(screen.getByRole('button', { name: '00 minutes' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '15 minutes' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '30 minutes' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '45 minutes' })).toBeTruthy();
    // Non-step marks are also present (but disabled)
    expect(screen.getByRole('button', { name: '05 minutes' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '10 minutes' })).toBeTruthy();
    // Non-step buttons are disabled
    expect(screen.getByRole('button', { name: '05 minutes' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '10 minutes' })).toBeDisabled();
    // Step buttons are enabled
    expect(screen.getByRole('button', { name: '15 minutes' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: '30 minutes' })).not.toBeDisabled();
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
    // 60 represents the 12-o'clock position (0 seconds)
    expect(screen.getByRole('button', { name: '60 seconds' })).toBeTruthy();
    // All 12 five-second marks are shown
    expect(screen.getByRole('button', { name: '05 seconds' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '10 seconds' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '55 seconds' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: '45 seconds' }));

    expect(handleChange).toHaveBeenLastCalledWith(
      new Date(2026, 4, 23, 5, 33, 45),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('shows the field label', () => {
    render(<TimePicker label="Alarm time" defaultValue={baseDate} />);

    expect(screen.getByRole('button', { name: 'Alarm time' })).toBeTruthy();
  });

  it('shows helper text', () => {
    render(<TimePicker label="Meeting time" helperText="24-hour format" />);

    expect(screen.getByText('24-hour format')).toBeTruthy();
  });

  it('shows placeholder when no value is set', () => {
    render(<TimePicker label="Pickup time" placeholder="Select time" />);

    expect(screen.getByText('Select time')).toBeTruthy();
  });

  it('trigger is disabled when disabled prop is set', () => {
    render(<TimePicker label="Locked time" disabled defaultValue={baseDate} />);

    expect(screen.getByRole('button', { name: 'Locked time' })).toBeDisabled();
  });

  it('opens the clock popover on trigger click', () => {
    render(<TimePicker label="Shift start" defaultValue={baseDate} minutesStep={15} />);

    fireEvent.click(screen.getByRole('button', { name: 'Shift start' }));

    expect(screen.getByRole('group', { name: 'Hours clock' })).toBeTruthy();
  });

  it('calls onAccept after selecting hour and navigating to minutes', () => {
    const handleAccept = vi.fn();

    render(
      <TimePicker
        label="Accept test"
        defaultValue={baseDate}
        minutesStep={30}
        onAccept={handleAccept}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Accept test' }));
    fireEvent.click(screen.getByRole('button', { name: '10 hours' }));
    fireEvent.click(screen.getByRole('button', { name: '30 minutes' }));

    expect(handleAccept).toHaveBeenCalledWith(
      new Date(2026, 4, 23, 10, 30),
      expect.objectContaining({ source: 'view' }),
    );
  });

  it('renders in 24-hour mode when ampm is false', () => {
    render(
      <TimePicker
        label="UTC time"
        defaultValue={new Date(2026, 4, 23, 14, 0)}
        ampm={false}
        minutesStep={60}
      />,
    );

    expect(screen.getByText('14:00')).toBeTruthy();
  });
});
