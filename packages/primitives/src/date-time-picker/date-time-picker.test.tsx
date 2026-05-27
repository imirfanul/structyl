import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import * as Calendar from '../calendar';
import * as DateTimePicker from './';
import { renderDateTimePickerAxeFixture } from '../../test/axe-fixtures';

const May1_14h30 = new Date(2026, 4, 1, 14, 30);
const May1 = new Date(2026, 4, 1);

function renderBasicPicker(
  props?: Partial<DateTimePicker.DateTimePickerRootProps>,
) {
  return (
    <DateTimePicker.Root defaultOpen defaultValue={May1_14h30} {...props}>
      <DateTimePicker.Trigger>Open</DateTimePicker.Trigger>
      <DateTimePicker.Content aria-label="Choose date and time">
        <DateTimePicker.DatePanel data-testid="date-panel">
          <DateTimePicker.Calendar defaultMonth={May1}>
            <Calendar.Header>
              <Calendar.PreviousButton>Prev</Calendar.PreviousButton>
              <Calendar.Heading />
              <Calendar.NextButton>Next</Calendar.NextButton>
            </Calendar.Header>
            <Calendar.Grid aria-label="May 2026">
              <Calendar.GridHead />
              <Calendar.GridBody>
                {(date, p) => (
                  <Calendar.Day
                    date={date}
                    isOutsideMonth={p.isOutsideMonth}
                    aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  />
                )}
              </Calendar.GridBody>
            </Calendar.Grid>
          </DateTimePicker.Calendar>
        </DateTimePicker.DatePanel>
        <DateTimePicker.TimePanel data-testid="time-panel">
          {({ value }) => (
            <span data-testid="time-display">
              {value ? `${value.getHours()}:${value.getMinutes()}` : 'No time'}
            </span>
          )}
        </DateTimePicker.TimePanel>
      </DateTimePicker.Content>
    </DateTimePicker.Root>
  );
}

describe('DateTimePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DateTimePicker).length).toBeGreaterThan(0);
  });

  it('switches from DatePanel to TimePanel after selecting a date', () => {
    render(renderBasicPicker());

    expect(screen.getByTestId('date-panel')).toBeTruthy();
    expect(screen.queryByTestId('time-panel')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(screen.queryByTestId('date-panel')).toBeNull();
    expect(screen.getByTestId('time-panel')).toBeTruthy();
    expect(screen.getByText('14:30')).toBeTruthy();
  });

  it('calls onChange when a date is selected (date part)', () => {
    const handleChange = vi.fn();
    render(renderBasicPicker({ onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 24, 14, 30),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('preserves existing time when a new date is selected', () => {
    const handleChange = vi.fn();
    render(renderBasicPicker({ onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    const called = handleChange.mock.calls[0][0] as Date;
    expect(called.getHours()).toBe(14);
    expect(called.getMinutes()).toBe(30);
  });

  it('does not call onChange when readOnly', () => {
    const handleChange = vi.fn();
    render(renderBasicPicker({ readOnly: true, onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(renderBasicPicker({ disabled: true, onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('calls onError when value is before minDateTime', async () => {
    const handleError = vi.fn();
    render(
      renderBasicPicker({
        value: new Date(2026, 3, 30, 14, 30),
        minDateTime: May1,
        onError: handleError,
      }),
    );

    await act(async () => { await Promise.resolve(); });
    expect(handleError).toHaveBeenCalledWith('minDateTime', expect.any(Date));
  });

  it('DatePanel renders only when view is a date view', () => {
    render(renderBasicPicker({ defaultValue: May1_14h30 }));

    // Initially shows date panel (view='day')
    expect(screen.getByTestId('date-panel')).toBeTruthy();
  });

  it('TimePanel renders only when view is a time view', () => {
    render(renderBasicPicker());

    // After selecting a date the view switches to 'hours'
    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(screen.getByTestId('time-panel')).toBeTruthy();
  });

  it('DateButton switches view back to day', () => {
    render(
      <DateTimePicker.Root defaultOpen defaultValue={May1_14h30}>
        <DateTimePicker.Content aria-label="Choose date and time">
          <DateTimePicker.DatePanel data-testid="date-panel">
            <DateTimePicker.Calendar defaultMonth={May1}>
              <Calendar.Grid aria-label="May 2026">
                <Calendar.GridBody>
                  {(date, p) => (
                    <Calendar.Day
                      date={date}
                      isOutsideMonth={p.isOutsideMonth}
                      aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    />
                  )}
                </Calendar.GridBody>
              </Calendar.Grid>
            </DateTimePicker.Calendar>
          </DateTimePicker.DatePanel>
          <DateTimePicker.TimePanel data-testid="time-panel">
            <DateTimePicker.DateButton data-testid="back-to-date">Back</DateTimePicker.DateButton>
          </DateTimePicker.TimePanel>
        </DateTimePicker.Content>
      </DateTimePicker.Root>,
    );

    // Switch to time panel
    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));
    expect(screen.getByTestId('time-panel')).toBeTruthy();

    // Switch back to date panel
    fireEvent.click(screen.getByTestId('back-to-date'));
    expect(screen.getByTestId('date-panel')).toBeTruthy();
  });

  it('Segment increments hour with ArrowUp', () => {
    const handleChange = vi.fn();
    render(
      <DateTimePicker.Root defaultOpen defaultValue={May1_14h30} onChange={handleChange}>
        <DateTimePicker.Content aria-label="Choose date and time">
          <DateTimePicker.TimePanel data-testid="time-panel">
            <DateTimePicker.Segment segment="hour" data-testid="hour-seg" />
            <DateTimePicker.Segment segment="minute" data-testid="minute-seg" />
          </DateTimePicker.TimePanel>
        </DateTimePicker.Content>
      </DateTimePicker.Root>,
    );

    fireEvent.keyDown(screen.getByTestId('hour-seg'), { key: 'ArrowUp' });

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 1, 15, 30),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('Segment decrements minute with ArrowDown', () => {
    const handleChange = vi.fn();
    render(
      <DateTimePicker.Root defaultOpen defaultValue={May1_14h30} onChange={handleChange}>
        <DateTimePicker.Content aria-label="Choose date and time">
          <DateTimePicker.TimePanel data-testid="time-panel">
            <DateTimePicker.Segment segment="hour" />
            <DateTimePicker.Segment segment="minute" data-testid="minute-seg" />
          </DateTimePicker.TimePanel>
        </DateTimePicker.Content>
      </DateTimePicker.Root>,
    );

    fireEvent.keyDown(screen.getByTestId('minute-seg'), { key: 'ArrowDown' });

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 4, 1, 14, 29),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('Value shows placeholder when no value is set', () => {
    render(
      <DateTimePicker.Root>
        <DateTimePicker.Value placeholder="Pick date & time" />
        <DateTimePicker.Content aria-label="Choose date and time" />
      </DateTimePicker.Root>,
    );

    expect(screen.getByText('Pick date & time')).toBeTruthy();
  });

  it('Value formats the date-time with Intl options', () => {
    render(
      <DateTimePicker.Root value={May1_14h30}>
        <DateTimePicker.Value format={{ dateStyle: 'medium', timeStyle: 'short' }} />
        <DateTimePicker.Content aria-label="Choose date and time" />
      </DateTimePicker.Root>,
    );

    expect(screen.getByText(/May 1, 2026/i)).toBeTruthy();
  });

  it('renders loading content via renderLoading', () => {
    render(
      <DateTimePicker.Root defaultOpen loading renderLoading={() => <span>Fetching…</span>}>
        <DateTimePicker.Content aria-label="Choose date and time">
          <DateTimePicker.Loading />
        </DateTimePicker.Content>
      </DateTimePicker.Root>,
    );

    expect(screen.getByText('Fetching…')).toBeTruthy();
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDateTimePickerAxeFixture());
    await act(async () => { await Promise.resolve(); });
    expect(await axe(container)).toHaveNoViolations();
  });
});
