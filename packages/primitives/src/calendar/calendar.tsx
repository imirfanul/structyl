'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

/* ─── Date helpers (no external deps) ──────────────────────────────── */

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function addMonths(d: Date, n: number) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}

function startOfMonth(d: Date) {
  const x = new Date(d);
  x.setDate(1);
  x.setHours(0, 0, 0, 0);
  return x;
}

function getDaysGrid(displayMonth: Date, weekStartsOn = 0): Date[][] {
  const first = startOfMonth(displayMonth);
  const firstWeekday = first.getDay();
  const offset = (firstWeekday - weekStartsOn + 7) % 7;
  const start = addDays(first, -offset);
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
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
  mode: 'single' | 'range' | 'multiple';
  selected: Date | Date[] | { from: Date; to?: Date } | undefined;
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
}

const [CalendarProvider, useCalendarContext] = createContext<CalendarContextValue>('Calendar');

export interface CalendarRootProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  asChild?: boolean;
  mode?: 'single' | 'range' | 'multiple';
  selected?: Date | Date[] | { from: Date; to?: Date };
  defaultSelected?: Date | Date[] | { from: Date; to?: Date };
  onSelect?: (value: Date | Date[] | { from: Date; to?: Date } | undefined) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  disabledDays?: (date: Date) => boolean;
  weekStartsOn?: number;
  locale?: string;
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
      disabled,
      disabledDays,
      weekStartsOn = 0,
      locale,
      ...rest
    } = props;

    const [selected, setSelected] = useControllableState<typeof selectedProp>({
      prop: selectedProp,
      defaultProp: defaultSelected,
      onChange: onSelect,
    });
    const [displayMonth, setDisplayMonth] = useControllableState<Date>({
      prop: monthProp,
      defaultProp: defaultMonth ?? startOfMonth(new Date()),
      onChange: onMonthChange,
    });
    const [focusedDate, setFocusedDate] = React.useState<Date>(
      defaultMonth ?? new Date(),
    );

    const isDisabled = React.useCallback(
      (date: Date) => {
        if (disabled) return true;
        if (minDate && date < startOfDay(minDate)) return true;
        if (maxDate && date > startOfDay(maxDate)) return true;
        if (disabledDays?.(date)) return true;
        return false;
      },
      [disabled, minDate, maxDate, disabledDays],
    );

    const isSelected = React.useCallback(
      (date: Date) => {
        if (!selected) return false;
        if (mode === 'single') return isSameDay(selected as Date, date);
        if (mode === 'multiple')
          return (selected as Date[]).some((d) => isSameDay(d, date));
        const range = selected as { from: Date; to?: Date };
        if (range.from && isSameDay(range.from, date)) return true;
        if (range.to && isSameDay(range.to, date)) return true;
        return false;
      },
      [selected, mode],
    );

    const isInRange = React.useCallback(
      (date: Date) => {
        if (mode !== 'range' || !selected) return false;
        const range = selected as { from: Date; to?: Date };
        if (!range.from || !range.to) return false;
        return date >= startOfDay(range.from) && date <= startOfDay(range.to);
      },
      [mode, selected],
    );

    const handleSelect = (date: Date) => {
      if (isDisabled(date)) return;
      if (mode === 'single') setSelected(date as never);
      else if (mode === 'multiple') {
        const arr = (selected as Date[]) ?? [];
        const exists = arr.some((d) => isSameDay(d, date));
        setSelected((exists ? arr.filter((d) => !isSameDay(d, date)) : [...arr, date]) as never);
      } else {
        const range = (selected as { from: Date; to?: Date }) ?? { from: undefined, to: undefined };
        if (!range.from || (range.from && range.to)) setSelected({ from: date, to: undefined } as never);
        else if (date < range.from) setSelected({ from: date, to: range.from } as never);
        else setSelected({ from: range.from, to: date } as never);
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
        setDisplayMonth={(d) => setDisplayMonth(d)}
        focusedDate={focusedDate}
        setFocusedDate={setFocusedDate}
        minDate={minDate}
        maxDate={maxDate}
        isDisabled={isDisabled}
        weekStartsOn={weekStartsOn}
        locale={locale}
        disabled={disabled}
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
    const d = new Date(2024, 0, (i + ctx.weekStartsOn) % 7); // Sunday Jan 7 2024
    return fmt.format(d);
  });
  return (
    <thead>
      <tr>
        {days.map((d, i) => (
          <th key={i} scope="col" aria-label={d}>
            {d}
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
  const weeks = getDaysGrid(ctx.displayMonth, ctx.weekStartsOn);
  return (
    <tbody>
      {weeks.map((week, wi) => (
        <tr key={wi}>
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
    const isToday = isSameDay(date, new Date());
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
            // Defer focus to next render
            queueMicrotask(() => {
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
