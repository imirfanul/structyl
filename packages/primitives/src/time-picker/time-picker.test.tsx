import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import * as TimePickerModule from './';
import { renderTimePickerAxeFixture } from '../../test/axe-fixtures';

function renderBasicTimePicker(
  props?: Partial<TimePickerModule.TimePickerRootProps>,
) {
  return (
    <TimePickerModule.Root
      defaultValue={{ hour: 9, minute: 30, second: 0, period: 'am' }}
      hour12
      {...props}
    >
      <TimePickerModule.Segment segment="hour" data-testid="hour-seg" />
      <span aria-hidden>:</span>
      <TimePickerModule.Segment segment="minute" data-testid="minute-seg" />
      <TimePickerModule.Segment segment="period" data-testid="period-seg" />
    </TimePickerModule.Root>
  );
}

describe('TimePicker (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(TimePickerModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderTimePickerAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders segments with correct initial values', () => {
    render(renderBasicTimePicker());

    expect(screen.getByTestId('hour-seg')).toHaveTextContent('9');
    expect(screen.getByTestId('minute-seg')).toHaveTextContent('30');
    expect(screen.getByTestId('period-seg')).toHaveTextContent('AM');
  });

  it('increments hour segment with ArrowUp', () => {
    const handleChange = vi.fn();
    render(renderBasicTimePicker({ onValueChange: handleChange }));

    const hourSeg = screen.getByTestId('hour-seg');
    fireEvent.keyDown(hourSeg, { key: 'ArrowUp' });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ hour: 10 }),
    );
  });

  it('decrements hour segment with ArrowDown', () => {
    const handleChange = vi.fn();
    render(renderBasicTimePicker({ onValueChange: handleChange }));

    const hourSeg = screen.getByTestId('hour-seg');
    fireEvent.keyDown(hourSeg, { key: 'ArrowDown' });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ hour: 8 }),
    );
  });

  it('increments minute segment with ArrowUp', () => {
    const handleChange = vi.fn();
    render(renderBasicTimePicker({ onValueChange: handleChange }));

    const minuteSeg = screen.getByTestId('minute-seg');
    fireEvent.keyDown(minuteSeg, { key: 'ArrowUp' });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ minute: 31 }),
    );
  });

  it('wraps hour past max in 12h mode', () => {
    const handleChange = vi.fn();
    render(
      renderBasicTimePicker({
        defaultValue: { hour: 12, minute: 0, second: 0, period: 'pm' },
        onValueChange: handleChange,
      }),
    );

    fireEvent.keyDown(screen.getByTestId('hour-seg'), { key: 'ArrowUp' });
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ hour: 1 }));
  });

  it('wraps hour below min in 12h mode', () => {
    const handleChange = vi.fn();
    render(
      renderBasicTimePicker({
        defaultValue: { hour: 1, minute: 0, second: 0, period: 'am' },
        onValueChange: handleChange,
      }),
    );

    fireEvent.keyDown(screen.getByTestId('hour-seg'), { key: 'ArrowDown' });
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ hour: 12 }));
  });

  it('toggles period segment between AM and PM', () => {
    const handleChange = vi.fn();
    render(renderBasicTimePicker({ onValueChange: handleChange }));

    fireEvent.keyDown(screen.getByTestId('period-seg'), { key: 'ArrowUp' });
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ period: 'pm' }));
  });

  it('renders second segment when withSeconds is true', () => {
    render(
      <TimePickerModule.Root
        defaultValue={{ hour: 9, minute: 30, second: 15, period: 'am' }}
        hour12
        withSeconds
      >
        <TimePickerModule.Segment segment="hour" />
        <TimePickerModule.Segment segment="minute" />
        <TimePickerModule.Segment segment="second" data-testid="second-seg" />
      </TimePickerModule.Root>,
    );

    expect(screen.getByTestId('second-seg')).toHaveTextContent('15');
  });

  it('segments have role=spinbutton for accessibility', () => {
    render(renderBasicTimePicker());

    const spinbuttons = screen.getAllByRole('spinbutton');
    expect(spinbuttons.length).toBeGreaterThanOrEqual(2);
  });

  it('segments are not focusable when disabled', () => {
    render(renderBasicTimePicker({ disabled: true }));

    const hourSeg = screen.getByTestId('hour-seg');
    expect(hourSeg).toHaveAttribute('tabindex', '-1');
  });

  it('calls onChange with Date and validation context', () => {
    const handleChange = vi.fn();
    render(
      renderBasicTimePicker({
        onChange: handleChange,
      }),
    );

    fireEvent.keyDown(screen.getByTestId('hour-seg'), { key: 'ArrowUp' });
    expect(handleChange).toHaveBeenCalledWith(
      expect.any(Date),
      expect.objectContaining({ source: 'view', validationError: null }),
    );
  });

  it('accepts a Date as defaultValue', () => {
    render(
      <TimePickerModule.Root defaultValue={new Date(2026, 0, 15, 14, 45)}>
        <TimePickerModule.Segment segment="hour" data-testid="hour-seg" />
        <TimePickerModule.Segment segment="minute" data-testid="minute-seg" />
      </TimePickerModule.Root>,
    );

    expect(screen.getByTestId('hour-seg')).toHaveTextContent('14');
    expect(screen.getByTestId('minute-seg')).toHaveTextContent('45');
  });

  it('Value shows placeholder when no value is set', () => {
    render(
      <TimePickerModule.Root>
        <TimePickerModule.Value placeholder="Select a time" />
      </TimePickerModule.Root>,
    );

    expect(screen.getByText('Select a time')).toBeTruthy();
  });

  it('Value shows formatted time when value is set', () => {
    render(
      <TimePickerModule.Root defaultValue={new Date(2026, 0, 15, 9, 30)}>
        <TimePickerModule.Value />
      </TimePickerModule.Root>,
    );

    expect(screen.getByText(/9:30/i)).toBeTruthy();
  });
});
