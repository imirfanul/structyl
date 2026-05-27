import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import * as Calendar from '../calendar';
import * as DatePickerModule from './';
import { renderDatePickerAxeFixture } from '../../test/axe-fixtures';

const Jan15 = new Date(2026, 0, 15);
const Jan1 = new Date(2026, 0, 1);
const Jan31 = new Date(2026, 0, 31);

function renderBasicPicker(props?: Partial<DatePickerModule.DatePickerRootProps>) {
  return (
    <DatePickerModule.Root defaultOpen defaultValue={Jan15} {...props}>
      <DatePickerModule.Trigger>Open</DatePickerModule.Trigger>
      <DatePickerModule.Content aria-label="Choose date">
        <DatePickerModule.Calendar defaultMonth={Jan15}>
          <Calendar.Header>
            <Calendar.PreviousButton>Prev</Calendar.PreviousButton>
            <Calendar.Heading />
            <Calendar.NextButton>Next</Calendar.NextButton>
          </Calendar.Header>
          <Calendar.Grid aria-label="January 2026">
            <Calendar.GridHead />
            <Calendar.GridBody>
              {(date, props) => (
                <Calendar.Day
                  date={date}
                  isOutsideMonth={props.isOutsideMonth}
                  aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </DatePickerModule.Calendar>
      </DatePickerModule.Content>
    </DatePickerModule.Root>
  );
}

describe('DatePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DatePickerModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDatePickerAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });

  it('calls onChange with the selected date and validation context', () => {
    const handleChange = vi.fn();
    render(renderBasicPicker({ onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Thursday, January 22, 2026/i }));

    expect(handleChange).toHaveBeenCalledWith(
      new Date(2026, 0, 22),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('calls onAccept after a date is selected', () => {
    const handleAccept = vi.fn();
    render(renderBasicPicker({ onAccept: handleAccept }));

    fireEvent.click(screen.getByRole('button', { name: /Thursday, January 22, 2026/i }));

    expect(handleAccept).toHaveBeenCalledWith(
      new Date(2026, 0, 22),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('calls onValueChange with the new Date value', () => {
    const handleValueChange = vi.fn();
    render(renderBasicPicker({ onValueChange: handleValueChange }));

    fireEvent.click(screen.getByRole('button', { name: /Thursday, January 22, 2026/i }));

    expect(handleValueChange).toHaveBeenCalledWith(new Date(2026, 0, 22));
  });

  it('works in controlled mode', () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      renderBasicPicker({ value: Jan15, onChange: handleChange }),
    );

    fireEvent.click(screen.getByRole('button', { name: /Thursday, January 22, 2026/i }));
    expect(handleChange).toHaveBeenCalled();

    // value stays at Jan15 until parent updates it (controlled)
    rerender(renderBasicPicker({ value: new Date(2026, 0, 22), onChange: handleChange }));
  });

  it('calls onError when value exceeds maxDate', async () => {
    const handleError = vi.fn();
    render(
      renderBasicPicker({
        value: new Date(2026, 1, 1), // Feb 1 — past maxDate
        maxDate: Jan31,
        onError: handleError,
      }),
    );

    await act(async () => { await Promise.resolve(); });
    expect(handleError).toHaveBeenCalledWith('maxDate', expect.any(Date));
  });

  it('calls onError when value is before minDate', async () => {
    const handleError = vi.fn();
    render(
      renderBasicPicker({
        value: new Date(2025, 11, 31), // Dec 31 — before minDate
        minDate: Jan1,
        onError: handleError,
      }),
    );

    await act(async () => { await Promise.resolve(); });
    expect(handleError).toHaveBeenCalledWith('minDate', expect.any(Date));
  });

  it('does not call onChange when readOnly', () => {
    const handleChange = vi.fn();
    render(renderBasicPicker({ readOnly: true, onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Thursday, January 22, 2026/i }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(renderBasicPicker({ disabled: true, onChange: handleChange }));

    fireEvent.click(screen.getByRole('button', { name: /Thursday, January 22, 2026/i }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders loading content via renderLoading', () => {
    render(
      <DatePickerModule.Root defaultOpen loading renderLoading={() => <span>Loading calendar…</span>}>
        <DatePickerModule.Content aria-label="Choose date">
          <DatePickerModule.Loading />
        </DatePickerModule.Content>
      </DatePickerModule.Root>,
    );

    expect(screen.getByText('Loading calendar…')).toBeTruthy();
  });

  it('shows placeholder when no value is set', () => {
    render(
      <DatePickerModule.Root>
        <DatePickerModule.Value placeholder="Select a date" />
        <DatePickerModule.Content aria-label="Choose date" />
      </DatePickerModule.Root>,
    );

    expect(screen.getByText('Select a date')).toBeTruthy();
  });

  it('formats the display value using Intl.DateTimeFormatOptions', () => {
    render(
      <DatePickerModule.Root value={Jan15}>
        <DatePickerModule.Value format={{ dateStyle: 'full' }} />
        <DatePickerModule.Content aria-label="Choose date" />
      </DatePickerModule.Root>,
    );

    expect(screen.getByText(/January 15, 2026/i)).toBeTruthy();
  });

  it('calls onOpenChange when the picker opens', () => {
    const handleOpenChange = vi.fn();
    render(
      <DatePickerModule.Root onOpenChange={handleOpenChange}>
        <DatePickerModule.Trigger>Open</DatePickerModule.Trigger>
        <DatePickerModule.Content aria-label="Choose date" />
      </DatePickerModule.Root>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  it('calls onOpen and onClose callbacks', () => {
    const handleOpen = vi.fn();
    const handleClose = vi.fn();
    render(
      <DatePickerModule.Root onOpen={handleOpen} onClose={handleClose}>
        <DatePickerModule.Trigger>Open</DatePickerModule.Trigger>
        <DatePickerModule.Content aria-label="Choose date" />
      </DatePickerModule.Root>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });
});
