import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DateRangePicker } from './index';

const May1 = new Date(2026, 4, 1);
const May10 = new Date(2026, 4, 10);

describe('DateRangePicker (styled)', () => {
  it('renders a usable range calendar in compound content', () => {
    render(
      <DateRangePicker.Root
        defaultOpen
        defaultValue={{ from: May1, to: May10 }}
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
        defaultValue={[May1, null]}
        label="Sprint range"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleChange).toHaveBeenCalledWith(
      [May1, new Date(2026, 4, 24)],
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

  it('shows the field label', () => {
    render(<DateRangePicker label="Vacation window" />);

    expect(screen.getByRole('button', { name: 'Vacation window' })).toBeTruthy();
  });

  it('shows helper text', () => {
    render(<DateRangePicker label="Project range" helperText="Select start and end" />);

    expect(screen.getByText('Select start and end')).toBeTruthy();
  });

  it('shows placeholder when no value is set', () => {
    render(<DateRangePicker label="Date range" placeholder="Pick dates" />);

    expect(screen.getByText('Pick dates')).toBeTruthy();
  });

  it('trigger is disabled when disabled prop is set', () => {
    render(<DateRangePicker label="Locked range" disabled defaultValue={[May1, May10]} />);

    expect(screen.getByRole('button', { name: 'Locked range' })).toBeDisabled();
  });

  it('renders default shortcuts when shortcuts prop is not set', () => {
    render(
      <DateRangePicker
        defaultOpen
        calendars={1}
        label="Quick range"
      />,
    );

    expect(screen.getByRole('button', { name: 'Today' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Last 7 days' })).toBeTruthy();
  });

  it('hides shortcuts when shortcuts={false}', () => {
    render(
      <DateRangePicker
        defaultOpen
        calendars={1}
        label="No shortcuts"
        shortcuts={false}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Today' })).toBeNull();
  });

  it('shows selected range in the trigger', () => {
    render(
      <DateRangePicker
        label="Current sprint"
        defaultValue={[May1, May10]}
      />,
    );

    // Trigger text contains both dates separated by em dash
    expect(screen.getByRole('button', { name: 'Current sprint' }).textContent).toMatch(/May/i);
  });

  it('calls onAccept when a full range is selected', () => {
    const handleAccept = vi.fn();

    render(
      <DateRangePicker
        calendars={1}
        defaultOpen
        defaultValue={[May1, null]}
        label="Accept test"
        onAccept={handleAccept}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunday, May 24, 2026' }));

    expect(handleAccept).toHaveBeenCalledWith(
      [May1, new Date(2026, 4, 24)],
      expect.objectContaining({ source: 'view' }),
    );
  });

  it('shows loading content via renderLoading', () => {
    render(
      <DateRangePicker.Root defaultOpen loading renderLoading={() => <span>Loading range…</span>}>
        <DateRangePicker.Trigger aria-label="Loading range" />
        <DateRangePicker.Content calendars={1}>
          <DateRangePicker.Loading />
        </DateRangePicker.Content>
      </DateRangePicker.Root>,
    );

    expect(screen.getByText('Loading range…')).toBeTruthy();
  });
});
