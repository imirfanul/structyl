'use client';

import * as React from 'react';
import { createContext, Primitive } from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import {
  addDays,
  addMonths,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
} from '../picker-utils';

type CalendarMode = 'single' | 'range' | 'multiple';
export interface CalendarDateRange {
  from?: Date;
  to?: Date;
}

type CalendarSelectedValue = Date | Date[] | CalendarDateRange | undefined;

function getMonthFromSelected(selected: CalendarSelectedValue) {
  if (!selected) return undefined;
  if (selected instanceof Date) return startOfMonth(selected);
  if (Array.isArray(selected)) return selected[0] ? startOfMonth(selected[0]) : undefined;
  return selected.from ? startOfMonth(selected.from) : undefined;
}

function getDaysGrid(displayMonth: Date, weekStartsOn = 0, fixedWeekNumber?: number): Date[][] {
  const first = startOfMonth(displayMonth);
  const firstWeekday = first.getDay();
  const offset = (firstWeekday - weekStartsOn + 7) % 7;
  const start = addDays(first, -offset);
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const weekCount = fixedWeekNumber ?? Math.ceil((offset + daysInMonth) / 7);
  const weeks: Date[][] = [];
  for (let w = 0; w < weekCount; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(addDays(start, w * 7 + d));
    }
    weeks.push(week);
  }
  return weeks;
}

/* ─── Context ──────────────────────────────────────────────────────── */

interface CalendarContextValue {
  mode: CalendarMode;
  selected: CalendarSelectedValue;
  onSelect: (value: Date) => void;
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  displayMonth: Date;
  setDisplayMonth: (d: Date) => void;
  focusedDate: Date;
  setFocusedDate: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDisabled: (date: Date) => boolean;
  weekStartsOn: number;
  locale?: string;
  disabled?: boolean;
  disableHighlightToday?: boolean;
  displayWeekNumber?: boolean;
  fixedWeekNumber?: number;
  showDaysOutsideCurrentMonth?: boolean;
  dayOfWeekFormatter?: (date: Date) => string;
}

const [CalendarProvider, useCalendarContext] = createContext<CalendarContextValue>('Calendar');

export interface CalendarRootProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  asChild?: boolean;
  mode?: CalendarMode;
  selected?: CalendarSelectedValue;
  defaultSelected?: CalendarSelectedValue;
  onSelect?: (value: CalendarSelectedValue) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
  disabledDays?: (date: Date) => boolean;
  shouldDisableDate?: (date: Date) => boolean;
  shouldDisableMonth?: (date: Date) => boolean;
  shouldDisableYear?: (date: Date) => boolean;
  weekStartsOn?: number;
  locale?: string;
  disableHighlightToday?: boolean;
  displayWeekNumber?: boolean;
  fixedWeekNumber?: number;
  showDaysOutsideCurrentMonth?: boolean;
  dayOfWeekFormatter?: (date: Date) => string;
  onYearChange?: (year: Date) => void;
}

const Root = React.forwardRef<HTMLDivElement, CalendarRootProps>(
  (props, forwardedRef) => {
    const {
      mode = 'single',
      selected: selectedProp,
      defaultSelected,
      onSelect,
      month: monthProp,
      defaultMonth,
      onMonthChange,
      minDate,
      maxDate,
      disablePast,
      disableFuture,
      disabled,
      disabledDays,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      weekStartsOn = 0,
      locale,
      disableHighlightToday,
      displayWeekNumber,
      fixedWeekNumber,
      showDaysOutsideCurrentMonth,
      dayOfWeekFormatter,
      onYearChange,
      ...rest
    } = props;

    const initialMonth =
      defaultMonth ??
      getMonthFromSelected(selectedProp) ??
      getMonthFromSelected(defaultSelected) ??
      startOfMonth(new Date());

    const [selected, setSelected] = useControllableState<CalendarSelectedValue>({
      prop: selectedProp,
      defaultProp: defaultSelected,
      onChange: onSelect,
    });
    const [displayMonth, setDisplayMonth] = useControllableState<Date>({
      prop: monthProp,
      defaultProp: initialMonth,
      onChange: onMonthChange,
    });
    const [focusedDate, setFocusedDate] = React.useState<Date>(
      getMonthFromSelected(selectedProp) ??
        getMonthFromSelected(defaultSelected) ??
        defaultMonth ??
        new Date(),
    );

    const isDisabled = React.useCallback(
      (date: Date) => {
        const today = startOfDay(new Date());
        if (disabled) return true;
        if (disablePast && isBeforeDay(date, today)) return true;
        if (disableFuture && isAfterDay(date, today)) return true;
        if (minDate && isBeforeDay(date, minDate)) return true;
        if (maxDate && isAfterDay(date, maxDate)) return true;
        if (shouldDisableYear?.(date)) return true;
        if (shouldDisableMonth?.(date)) return true;
        if (disabledDays?.(date)) return true;
        if (shouldDisableDate?.(date)) return true;
        return false;
      },
      [
        disabled,
        disablePast,
        disableFuture,
        minDate,
        maxDate,
        shouldDisableYear,
        shouldDisableMonth,
        disabledDays,
        shouldDisableDate,
      ],
    );

    const isSelected = React.useCallback(
      (date: Date) => {
        if (!selected) return false;
        if (mode === 'single') return isSameDay(selected as Date, date);
        if (mode === 'multiple')
          return (selected as Date[]).some((d) => isSameDay(d, date));
        const range = selected as CalendarDateRange;
        if (range.from && isSameDay(range.from, date)) return true;
        if (range.to && isSameDay(range.to, date)) return true;
        return false;
      },
      [selected, mode],
    );

    const isInRange = React.useCallback(
      (date: Date) => {
        if (mode !== 'range' || !selected) return false;
        const range = selected as CalendarDateRange;
        if (!range.from || !range.to) return false;
        return !isBeforeDay(date, range.from) && !isAfterDay(date, range.to);
      },
      [mode, selected],
    );

    const handleSelect = (date: Date) => {
      if (isDisabled(date)) return;
      setFocusedDate(date);
      if (!isSameMonth(date, displayMonth ?? new Date())) {
        const nextMonth = startOfMonth(date);
        if ((displayMonth ?? new Date()).getFullYear() !== nextMonth.getFullYear()) {
          onYearChange?.(nextMonth);
        }
        setDisplayMonth(nextMonth);
      }
      if (mode === 'single') setSelected(date);
      else if (mode === 'multiple') {
        const arr = (selected as Date[]) ?? [];
        const exists = arr.some((d) => isSameDay(d, date));
        setSelected(exists ? arr.filter((d) => !isSameDay(d, date)) : [...arr, date]);
      } else {
        const range = (selected as CalendarDateRange | undefined) ?? {};
        if (!range.from || (range.from && range.to)) setSelected({ from: date, to: undefined });
        else if (isBeforeDay(date, range.from)) setSelected({ from: date, to: range.from });
        else setSelected({ from: range.from, to: date });
      }
    };

    return (
      <CalendarProvider
        mode={mode}
        selected={selected}
        onSelect={handleSelect}
        isSelected={isSelected}
        isInRange={isInRange}
        displayMonth={displayMonth ?? new Date()}
        setDisplayMonth={(d) => {
          if (displayMonth && displayMonth.getFullYear() !== d.getFullYear()) {
            onYearChange?.(d);
          }
          setDisplayMonth(d);
        }}
        focusedDate={focusedDate}
        setFocusedDate={setFocusedDate}
        minDate={minDate}
        maxDate={maxDate}
        isDisabled={isDisabled}
        weekStartsOn={weekStartsOn}
        locale={locale}
        disabled={disabled}
        disableHighlightToday={disableHighlightToday}
        displayWeekNumber={displayWeekNumber}
        fixedWeekNumber={fixedWeekNumber}
        showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
        dayOfWeekFormatter={dayOfWeekFormatter}
      >
        <Primitive.div
          role="group"
          aria-label="Calendar"
          {...rest}
          ref={forwardedRef}
        />
      </CalendarProvider>
    );
  },
);
Root.displayName = 'Calendar.Root';

const Header = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />,
);
Header.displayName = 'Calendar.Header';

const PreviousButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>((props, forwardedRef) => {
  const ctx = useCalendarContext('Calendar.PreviousButton');
  return (
    <Primitive.button
      type="button"
      aria-label="Previous month"
      {...props}
      ref={forwardedRef}
      onClick={composeEventHandlers(props.onClick, () =>
        ctx.setDisplayMonth(addMonths(ctx.displayMonth, -1)),
      )}
    />
  );
});
PreviousButton.displayName = 'Calendar.PreviousButton';

const NextButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>((props, forwardedRef) => {
  const ctx = useCalendarContext('Calendar.NextButton');
  return (
    <Primitive.button
      type="button"
      aria-label="Next month"
      {...props}
      ref={forwardedRef}
      onClick={composeEventHandlers(props.onClick, () =>
        ctx.setDisplayMonth(addMonths(ctx.displayMonth, 1)),
      )}
    />
  );
});
NextButton.displayName = 'Calendar.NextButton';

const Heading: React.FC<{ format?: Intl.DateTimeFormatOptions; locale?: string }> = ({
  format = { month: 'long', year: 'numeric' },
  locale,
}) => {
  const ctx = useCalendarContext('Calendar.Heading');
  return (
    <span aria-live="polite">
      {new Intl.DateTimeFormat(locale ?? ctx.locale, format).format(ctx.displayMonth)}
    </span>
  );
};
Heading.displayName = 'Calendar.Heading';

const Grid = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  (props, forwardedRef) => (
    <table role="grid" {...props} ref={forwardedRef} />
  ),
);
Grid.displayName = 'Calendar.Grid';

const GridHead: React.FC<{ locale?: string; format?: 'narrow' | 'short' | 'long' }> = ({
  locale,
  format = 'narrow',
}) => {
  const ctx = useCalendarContext('Calendar.GridHead');
  const fmt = new Intl.DateTimeFormat(locale ?? ctx.locale, { weekday: format });
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(new Date(2024, 0, 7), i + ctx.weekStartsOn);
    return {
      label: ctx.dayOfWeekFormatter?.(d) ?? fmt.format(d),
      date: d,
    };
  });
  return (
    <thead>
      <tr>
        {ctx.displayWeekNumber ? (
          <th scope="col" aria-label="Week number">
            #
          </th>
        ) : null}
        {days.map((day, i) => (
          <th key={i} scope="col" aria-label={new Intl.DateTimeFormat(locale ?? ctx.locale, { weekday: 'long' }).format(day.date)}>
            {day.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
GridHead.displayName = 'Calendar.GridHead';

interface GridBodyProps {
  children: (date: Date, props: { isOutsideMonth: boolean }) => React.ReactNode;
}

const GridBody: React.FC<GridBodyProps> = ({ children }) => {
  const ctx = useCalendarContext('Calendar.GridBody');
  const weeks = getDaysGrid(ctx.displayMonth, ctx.weekStartsOn, ctx.fixedWeekNumber);
  return (
    <tbody>
      {weeks.map((week, wi) => (
        <tr key={wi}>
          {ctx.displayWeekNumber ? (
            <td role="gridcell" aria-label={`Week ${getWeekNumber(week[0] ?? ctx.displayMonth)}`}>
              {getWeekNumber(week[0] ?? ctx.displayMonth)}
            </td>
          ) : null}
          {week.map((day, di) => (
            <td key={di} role="gridcell">
              {children(day, { isOutsideMonth: !isSameMonth(day, ctx.displayMonth) })}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
GridBody.displayName = 'Calendar.GridBody';

function getWeekNumber(date: Date) {
  const target = startOfDay(date);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7));
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / 604800000);
}

interface CalendarDayProps extends React.ComponentPropsWithoutRef<'button'> {
  date: Date;
  isOutsideMonth?: boolean;
}

const Day = React.forwardRef<HTMLButtonElement, CalendarDayProps>(
  (props, forwardedRef) => {
    const { date, isOutsideMonth, ...rest } = props;
    const ctx = useCalendarContext('Calendar.Day');
    const selected = ctx.isSelected(date);
    const inRange = ctx.isInRange(date);
    const disabled = ctx.isDisabled(date);
    const isToday = !ctx.disableHighlightToday && isSameDay(date, new Date());
    const isFocused = isSameDay(date, ctx.focusedDate);
    return (
      <Primitive.button
        type="button"
        aria-pressed={selected}
        aria-disabled={disabled}
        data-state={selected ? 'selected' : 'unselected'}
        data-today={isToday ? '' : undefined}
        data-outside={isOutsideMonth ? '' : undefined}
        data-in-range={inRange ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        tabIndex={isFocused ? 0 : -1}
        disabled={disabled}
        {...rest}
        ref={forwardedRef}
        onClick={composeEventHandlers(rest.onClick, () => ctx.onSelect(date))}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          let next: Date | null = null;
          if (event.key === 'ArrowLeft') next = addDays(date, -1);
          else if (event.key === 'ArrowRight') next = addDays(date, 1);
          else if (event.key === 'ArrowUp') next = addDays(date, -7);
          else if (event.key === 'ArrowDown') next = addDays(date, 7);
          else if (event.key === 'Home') next = addDays(date, -date.getDay());
          else if (event.key === 'End') next = addDays(date, 6 - date.getDay());
          else if (event.key === 'PageUp') next = addMonths(date, event.shiftKey ? -12 : -1);
          else if (event.key === 'PageDown') next = addMonths(date, event.shiftKey ? 12 : 1);
          if (next) {
            event.preventDefault();
            ctx.setFocusedDate(next);
            if (!isSameMonth(next, ctx.displayMonth)) ctx.setDisplayMonth(startOfMonth(next));
            queueMicrotask(() => {
              if (typeof document === 'undefined') return;
              const el = document.querySelector<HTMLButtonElement>(
                `[data-day-date="${next!.toISOString().slice(0, 10)}"]`,
              );
              el?.focus();
            });
          }
        })}
        data-day-date={date.toISOString().slice(0, 10)}
      >
        {date.getDate()}
      </Primitive.button>
    );
  },
);
Day.displayName = 'Calendar.Day';

export {
  Root,
  Header,
  Heading,
  PreviousButton,
  NextButton,
  Grid,
  GridHead,
  GridBody,
  Day,
};
