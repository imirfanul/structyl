import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Calendar from '../calendar';
import * as DateTimePicker from './';
import { renderDateTimePickerAxeFixture } from '../../test/axe-fixtures';

describe('DateTimePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DateTimePicker).length).toBeGreaterThan(0);
  });

  it('switches from date panel to time panel after selecting a date', () => {
    render(
      <DateTimePicker.Root defaultOpen defaultValue={new Date(2026, 4, 1, 14, 30)}>
        <DateTimePicker.Trigger>Open</DateTimePicker.Trigger>
        <DateTimePicker.Content aria-label="Choose date and time">
          <DateTimePicker.DatePanel data-testid="date-panel">
            <DateTimePicker.Calendar defaultMonth={new Date(2026, 4, 1)}>
              <Calendar.Grid aria-label="May 2026">
                <Calendar.GridHead />
                <Calendar.GridBody>
                  {(date, props) => (
                    <Calendar.Day
                      date={date}
                      isOutsideMonth={props.isOutsideMonth}
                      aria-label={date.toDateString()}
                    />
                  )}
                </Calendar.GridBody>
              </Calendar.Grid>
            </DateTimePicker.Calendar>
          </DateTimePicker.DatePanel>
          <DateTimePicker.TimePanel data-testid="time-panel">
            {({ value }) => (
              <span>{value ? `${value.getHours()}:${value.getMinutes()}` : 'No time'}</span>
            )}
          </DateTimePicker.TimePanel>
        </DateTimePicker.Content>
      </DateTimePicker.Root>,
    );

    expect(screen.getByTestId('date-panel')).toBeTruthy();
    expect(screen.queryByTestId('time-panel')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Sun May 24 2026' }));

    expect(screen.queryByTestId('date-panel')).toBeNull();
    expect(screen.getByTestId('time-panel')).toBeTruthy();
    expect(screen.getByText('14:30')).toBeTruthy();
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDateTimePickerAxeFixture());
    await act(async () => {
      await Promise.resolve();
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
