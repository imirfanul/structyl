import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import * as Calendar from '../calendar';
import * as DateRangePickerModule from './';
import { renderDateRangePickerAxeFixture } from '../../test/axe-fixtures';

const May1 = new Date(2026, 4, 1);
const May10 = new Date(2026, 4, 10);
const May31 = new Date(2026, 4, 31);

function renderBasicRangePicker(
  props?: Partial<DateRangePickerModule.DateRangePickerRootProps>,
) {
  return (
    <DateRangePickerModule.Root
      defaultOpen
      defaultValue={{ from: May1, to: May10 }}
      {...props}
    >
      <DateRangePickerModule.Trigger>Open</DateRangePickerModule.Trigger>
      <DateRangePickerModule.Content aria-label="Choose date range">
        <DateRangePickerModule.Calendar defaultMonth={May1}>
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
        </DateRangePickerModule.Calendar>
      </DateRangePickerModule.Content>
    </DateRangePickerModule.Root>
  );
}

describe('DateRangePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DateRangePickerModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDateRangePickerAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });

  it('calls onChange when a range is selected', () => {
    const handleChange = vi.fn();
    // Start with only 'from' set so next click sets 'to'
    render(renderBasicRangePicker({ defaultValue: { from: May1 }, onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleChange).toHaveBeenCalledWith(
      [May1, new Date(2026, 4, 24)],
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('calls onValueChange with a DateRange object', () => {
    const handleValueChange = vi.fn();
    render(renderBasicRangePicker({ defaultValue: { from: May1 }, onValueChange: handleValueChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ from: May1, to: new Date(2026, 4, 24) }),
    );
  });

  it('calls onAccept when a full range is completed', () => {
    const handleAccept = vi.fn();
    render(renderBasicRangePicker({ defaultValue: { from: May1 }, onAccept: handleAccept }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleAccept).toHaveBeenCalledWith(
      [May1, new Date(2026, 4, 24)],
      expect.objectContaining({ source: 'view' }),
    );
  });

  it('calls onError when from > to (invalidRange)', async () => {
    const handleError = vi.fn();
    render(
      renderBasicRangePicker({
        value: { from: May31, to: May1 },
        onError: handleError,
      }),
    );

    await act(async () => { await Promise.resolve(); });
    expect(handleError).toHaveBeenCalledWith('invalidRange', expect.any(Array));
  });

  it('calls onError when value exceeds maxDate', async () => {
    const handleError = vi.fn();
    render(
      renderBasicRangePicker({
        value: { from: May1, to: new Date(2026, 5, 1) },
        maxDate: May31,
        onError: handleError,
      }),
    );

    await act(async () => { await Promise.resolve(); });
    expect(handleError).toHaveBeenCalledWith('maxDate', expect.any(Array));
  });

  it('does not call onChange when readOnly', () => {
    const handleChange = vi.fn();
    render(renderBasicRangePicker({ defaultValue: { from: May1 }, readOnly: true, onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(renderBasicRangePicker({ defaultValue: { from: May1 }, disabled: true, onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Sunday, May 24, 2026/i }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('invokes shortcut getValue and calls onChange with shortcut source', () => {
    const handleChange = vi.fn();
    const shortcut: DateRangePickerModule.DateRangePickerShortcut = {
      label: 'This week',
      getValue: () => [May1, May10],
    };

    render(
      <DateRangePickerModule.Root defaultOpen onChange={handleChange}>
        <DateRangePickerModule.Trigger>Open</DateRangePickerModule.Trigger>
        <DateRangePickerModule.Content aria-label="Choose date range">
          <DateRangePickerModule.Shortcuts shortcuts={[shortcut]} />
        </DateRangePickerModule.Content>
      </DateRangePickerModule.Root>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'This week' }));

    expect(handleChange).toHaveBeenCalledWith(
      [May1, May10],
      expect.objectContaining({ source: 'shortcut', validationError: null }),
    );
  });

  it('normalises a tuple defaultValue to DateRange internally', () => {
    render(renderBasicRangePicker({ defaultValue: [May1, May10] }));
    // If normalization works the calendar renders without error
    expect(screen.getByRole('grid')).toBeTruthy();
  });

  it('Value shows placeholder when no value is set', () => {
    render(
      <DateRangePickerModule.Root>
        <DateRangePickerModule.Value placeholder="Pick a range" />
        <DateRangePickerModule.Content aria-label="Choose date range" />
      </DateRangePickerModule.Root>,
    );

    expect(screen.getByText('Pick a range')).toBeTruthy();
  });

  it('Value shows only start date when end is missing', () => {
    render(
      <DateRangePickerModule.Root value={{ from: May1 }}>
        <DateRangePickerModule.Value format={{ month: 'short', day: 'numeric' }} />
        <DateRangePickerModule.Content aria-label="Choose date range" />
      </DateRangePickerModule.Root>,
    );

    expect(screen.getByText(/May 1/i)).toBeTruthy();
  });

  it('Value shows full range when both from and to are set', () => {
    render(
      <DateRangePickerModule.Root value={{ from: May1, to: May10 }}>
        <DateRangePickerModule.Value format={{ month: 'short', day: 'numeric' }} separator=" to " />
        <DateRangePickerModule.Content aria-label="Choose date range" />
      </DateRangePickerModule.Root>,
    );

    expect(screen.getByText(/May 1.*to.*May 10/i)).toBeTruthy();
  });

  it('renders loading content via renderLoading', () => {
    render(
      <DateRangePickerModule.Root defaultOpen loading renderLoading={() => <span>Loading…</span>}>
        <DateRangePickerModule.Content aria-label="Choose date range">
          <DateRangePickerModule.Loading />
        </DateRangePickerModule.Content>
      </DateRangePickerModule.Root>,
    );

    expect(screen.getByText('Loading…')).toBeTruthy();
  });

  it('getDefaultDateRangePickerShortcuts returns the built-in shortcuts', () => {
    const shortcuts = DateRangePickerModule.getDefaultDateRangePickerShortcuts();
    expect(shortcuts.length).toBeGreaterThan(0);
    expect(shortcuts[0]).toHaveProperty('label');
    expect(shortcuts[0]).toHaveProperty('getValue');
  });
});
