'use client';

import * as React from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from '@aura-ui/icons';
import {
  Calendar as CalendarPrimitive,
  DateRangePicker as DateRangePickerPrimitive,
} from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { buttonVariants } from '../button';
import { Calendar as StyledCalendar } from '../calendar';

const Root = DateRangePickerPrimitive.Root;

const Value = DateRangePickerPrimitive.Value;
const Loading = DateRangePickerPrimitive.Loading;

function addMonths(date: Date, amount: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
}

function startOfMonth(date: Date) {
  const next = new Date(date);
  next.setDate(1);
  next.setHours(0, 0, 0, 0);
  return next;
}

function formatDayLabel(date: Date, locale?: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(date);
}

interface CalendarMonthProps
  extends React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Calendar> {
  showOutsideDays?: boolean;
  showDaysOutsideCurrentMonth?: boolean;
}

const CalendarMonth = React.forwardRef<HTMLDivElement, CalendarMonthProps>(
  ({ className, showOutsideDays, showDaysOutsideCurrentMonth, ...props }, ref) => (
    <DateRangePickerPrimitive.Calendar
      ref={ref}
      className={cn('rounded-md bg-popover p-3 text-popover-foreground', className)}
      showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth ?? showOutsideDays}
      {...props}
    >
      <CalendarPrimitive.Header className="mb-2 flex items-center justify-between">
        <CalendarPrimitive.PreviousButton className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ChevronLeft className="h-4 w-4" />
        </CalendarPrimitive.PreviousButton>
        <CalendarPrimitive.Heading />
        <CalendarPrimitive.NextButton className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ChevronRight className="h-4 w-4" />
        </CalendarPrimitive.NextButton>
      </CalendarPrimitive.Header>
      <CalendarPrimitive.Grid className="w-full border-collapse">
        <CalendarPrimitive.GridHead />
        <CalendarPrimitive.GridBody>
          {(date, { isOutsideMonth }) => {
            if ((showDaysOutsideCurrentMonth ?? showOutsideDays ?? true) === false && isOutsideMonth) {
              return <span className="block h-8 w-8" aria-hidden="true" />;
            }

            return (
              <CalendarPrimitive.Day
                date={date}
                isOutsideMonth={isOutsideMonth}
                aria-label={formatDayLabel(date, props.locale)}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-normal',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'data-[state=selected]:bg-primary data-[state=selected]:text-primary-foreground',
                  'data-[today]:font-semibold data-[today]:text-primary',
                  'data-[outside]:text-muted-foreground/40',
                  'data-[in-range]:bg-accent data-[in-range]:text-accent-foreground',
                  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                )}
              />
            );
          }}
        </CalendarPrimitive.GridBody>
      </CalendarPrimitive.Grid>
    </DateRangePickerPrimitive.Calendar>
  ),
);
CalendarMonth.displayName = 'DateRangePicker.CalendarMonth';

interface CalendarProps extends Omit<CalendarMonthProps, 'month' | 'onMonthChange'> {
  calendars?: 1 | 2 | 3;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      calendars = 2,
      className,
      month: monthProp,
      defaultMonth,
      onMonthChange,
      showOutsideDays,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledMonth, setUncontrolledMonth] = React.useState(() =>
      startOfMonth(defaultMonth ?? new Date()),
    );
    const month = startOfMonth(monthProp ?? uncontrolledMonth);

    const setMonth = React.useCallback(
      (nextMonth: Date) => {
        const normalized = startOfMonth(nextMonth);
        if (!monthProp) setUncontrolledMonth(normalized);
        onMonthChange?.(normalized);
      },
      [monthProp, onMonthChange],
    );

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2 md:flex-row', calendars === 1 && 'md:block', className)}
      >
        <CalendarMonth
          month={month}
          onMonthChange={setMonth}
          showOutsideDays={showOutsideDays}
          showDaysOutsideCurrentMonth={props.showDaysOutsideCurrentMonth}
          {...props}
        />
        {calendars >= 2 ? (
          <CalendarMonth
            month={addMonths(month, 1)}
            onMonthChange={(nextMonth) => setMonth(addMonths(nextMonth, -1))}
            showOutsideDays={showOutsideDays}
            showDaysOutsideCurrentMonth={props.showDaysOutsideCurrentMonth}
            {...props}
          />
        ) : null}
        {calendars === 3 ? (
          <CalendarMonth
            month={addMonths(month, 2)}
            onMonthChange={(nextMonth) => setMonth(addMonths(nextMonth, -2))}
            showOutsideDays={showOutsideDays}
            showDaysOutsideCurrentMonth={props.showDaysOutsideCurrentMonth}
            {...props}
          />
        ) : null}
      </div>
    );
  },
);
Calendar.displayName = 'DateRangePicker.Calendar';

const Shortcuts = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Shortcuts>
>(({ className, ...props }, ref) => (
  <DateRangePickerPrimitive.Shortcuts
    ref={ref}
    className={cn(
      'grid min-w-36 gap-1 border-b border-border p-2 md:border-b-0 md:border-r',
      '[&>button]:rounded-md [&>button]:px-2 [&>button]:py-1.5 [&>button]:text-left [&>button]:text-sm',
      '[&>button]:text-muted-foreground [&>button]:transition-colors hover:[&>button]:bg-accent hover:[&>button]:text-accent-foreground',
      'disabled:[&>button]:pointer-events-none disabled:[&>button]:opacity-50',
      className,
    )}
    {...props}
  />
));
Shortcuts.displayName = 'DateRangePicker.Shortcuts';

const Trigger = React.forwardRef<
  React.ElementRef<typeof DateRangePickerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DateRangePickerPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'w-[280px] justify-start text-left font-normal',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CalendarIcon className="mr-2 h-4 w-4" />
    {children ?? <DateRangePickerPrimitive.Value />}
  </DateRangePickerPrimitive.Trigger>
));
Trigger.displayName = 'DateRangePicker.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof DateRangePickerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Content> & {
    calendars?: 1 | 2 | 3;
    calendarClassName?: string;
    loading?: boolean;
    shortcuts?: DateRangePickerPrimitive.DateRangePickerShortcut[] | false;
    shortcutsClassName?: string;
    showOutsideDays?: boolean;
    showDaysOutsideCurrentMonth?: boolean;
  }
>(
  (
    {
      className,
      children,
      align = 'center',
      sideOffset = 6,
      calendars,
      calendarClassName,
      loading,
      shortcuts,
      shortcutsClassName,
      showOutsideDays,
      showDaysOutsideCurrentMonth,
      ...props
    },
    ref,
  ) => (
    <DateRangePickerPrimitive.Portal>
      <DateRangePickerPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 rounded-md border border-border bg-popover p-0 text-popover-foreground shadow-md outline-none',
          'origin-[var(--aura-ui-popper-transform-origin,center)]',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children ?? (
          loading ? (
            <div className="p-4 text-sm text-muted-foreground">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              {shortcuts === false ? null : (
                <Shortcuts className={shortcutsClassName} shortcuts={shortcuts || undefined} />
              )}
              <Calendar
                calendars={calendars}
                className={calendarClassName}
                showOutsideDays={showOutsideDays}
                showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
              />
            </div>
          )
        )}
      </DateRangePickerPrimitive.Content>
    </DateRangePickerPrimitive.Portal>
  ),
);
Content.displayName = 'DateRangePicker.Content';

interface DateRangePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Root>, 'children'> {
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  calendarClassName?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: React.ReactNode;
  format?: React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Root>['format'];
  formatDensity?: React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Root>['formatDensity'];
  separator?: string;
  id?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
  calendars?: 1 | 2 | 3;
  shortcuts?: DateRangePickerPrimitive.DateRangePickerShortcut[] | false;
  shortcutsClassName?: string;
  showOutsideDays?: boolean;
}

const DateRangePickerRoot = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      className,
      triggerClassName,
      contentClassName,
      calendarClassName,
      label,
      helperText,
      placeholder,
      format,
      formatDensity,
      separator,
      locale,
      id,
      name,
      required,
      error,
      disabled,
      readOnly,
      calendars,
      loading,
      shortcuts,
      shortcutsClassName,
      showOutsideDays,
      showDaysOutsideCurrentMonth,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;
    const helperId = helperText ? `${triggerId}-helper` : undefined;
    const labelText = typeof label === 'string' ? label : undefined;

    return (
      <Root {...props} disabled={disabled} readOnly={readOnly} locale={locale} loading={loading}>
        <div ref={ref} className={cn('grid w-fit gap-1.5', className)}>
          {label ? (
            <label className="text-sm font-medium text-foreground" htmlFor={triggerId}>
              {label}
              {required ? <span aria-hidden="true"> *</span> : null}
            </label>
          ) : null}
          <Trigger
            id={triggerId}
            name={name}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={helperId}
            aria-label={labelText ?? 'Choose date range'}
            className={triggerClassName}
          >
            <DateRangePickerPrimitive.Value
              locale={locale}
              format={format}
              formatDensity={formatDensity}
              separator={separator}
              placeholder={placeholder ?? 'MM/DD/YYYY - MM/DD/YYYY'}
            />
          </Trigger>
          {helperText ? (
            <p
              id={helperId}
              className={cn('text-xs text-muted-foreground', error && 'text-destructive')}
            >
              {helperText}
            </p>
          ) : null}
        </div>
        <Content
          calendars={calendars}
          calendarClassName={calendarClassName}
          className={contentClassName}
          loading={loading}
          shortcuts={shortcuts}
          shortcutsClassName={shortcutsClassName}
          showOutsideDays={showOutsideDays}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
        />
      </Root>
    );
  },
);
DateRangePickerRoot.displayName = 'DateRangePicker';

const DateRangePicker = Object.assign(DateRangePickerRoot, {
  Root,
  Trigger,
  Content,
  Value,
  Calendar,
  CalendarMonth,
  Shortcuts,
  Loading,
  StyledCalendar,
});

export {
  DateRangePicker,
  Root,
  Trigger,
  Content,
  Value,
  Calendar,
  CalendarMonth,
  Shortcuts,
  Loading,
  StyledCalendar,
};
export type { DateRangePickerProps, CalendarProps, CalendarMonthProps };
