'use client';

import * as React from 'react';
import { CalendarClock, ChevronLeft, ChevronRight } from '@aura-ui/icons';
import {
  Calendar as CalendarPrimitive,
  DateTimePicker as DateTimePickerPrimitive,
} from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { buttonVariants } from '../button';
import { Calendar as StyledCalendar } from '../calendar';

const Root = DateTimePickerPrimitive.Root;
const Value = DateTimePickerPrimitive.Value;
const Loading = DateTimePickerPrimitive.Loading;

interface CalendarProps
  extends React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Calendar> {
  showOutsideDays?: boolean;
  showDaysOutsideCurrentMonth?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, showOutsideDays, showDaysOutsideCurrentMonth, ...props }, ref) => (
    <DateTimePickerPrimitive.Calendar
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
                aria-label={new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }).format(date)}
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
    </DateTimePickerPrimitive.Calendar>
  ),
);
Calendar.displayName = 'DateTimePicker.Calendar';

const Segment = React.forwardRef<
  React.ElementRef<typeof DateTimePickerPrimitive.Segment>,
  React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Segment>
>(({ className, ...props }, ref) => (
  <DateTimePickerPrimitive.Segment
    ref={ref}
    className={cn(
      'inline-flex h-8 min-w-8 items-center justify-center rounded-md text-sm tabular-nums',
      'hover:bg-accent focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      className,
    )}
    {...props}
  />
));
Segment.displayName = 'DateTimePicker.Segment';

const Separator: React.FC<{ children?: React.ReactNode }> = ({ children = ':' }) => (
  <span className="text-muted-foreground">{children}</span>
);
Separator.displayName = 'DateTimePicker.Separator';

function TimeField({ withSeconds, ampm }: { withSeconds?: boolean; ampm?: boolean }) {
  return (
    <div className="flex items-center gap-1 border-t border-border p-3">
      <Segment segment="hour" />
      <Separator />
      <Segment segment="minute" />
      {withSeconds ? (
        <>
          <Separator />
          <Segment segment="second" />
        </>
      ) : null}
      {ampm ? <Segment segment="period" className="ml-1 min-w-10" /> : null}
    </div>
  );
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof DateTimePickerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DateTimePickerPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'w-[280px] justify-start text-left font-normal',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CalendarClock className="mr-2 h-4 w-4" />
    {children ?? <DateTimePickerPrimitive.Value />}
  </DateTimePickerPrimitive.Trigger>
));
Trigger.displayName = 'DateTimePicker.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof DateTimePickerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Content> & {
    calendarClassName?: string;
    loading?: boolean;
    showOutsideDays?: boolean;
    showDaysOutsideCurrentMonth?: boolean;
    withSeconds?: boolean;
    ampm?: boolean;
  }
>(
  (
    {
      className,
      children,
      align = 'center',
      sideOffset = 6,
      calendarClassName,
      loading,
      showOutsideDays,
      showDaysOutsideCurrentMonth,
      withSeconds,
      ampm,
      ...props
    },
    ref,
  ) => (
    <DateTimePickerPrimitive.Portal>
      <DateTimePickerPrimitive.Content
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
            <div>
              <Calendar
                className={calendarClassName}
                showOutsideDays={showOutsideDays}
                showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
              />
              <TimeField withSeconds={withSeconds} ampm={ampm} />
            </div>
          )
        )}
      </DateTimePickerPrimitive.Content>
    </DateTimePickerPrimitive.Portal>
  ),
);
Content.displayName = 'DateTimePicker.Content';

interface DateTimePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Root>, 'children'> {
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  calendarClassName?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: React.ReactNode;
  id?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
  showOutsideDays?: boolean;
}

const DateTimePickerRoot = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
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
      locale,
      id,
      name,
      required,
      error,
      disabled,
      readOnly,
      autoFocus,
      disableOpenPicker,
      loading,
      showOutsideDays,
      showDaysOutsideCurrentMonth,
      ampm,
      timeSteps,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;
    const helperId = helperText ? `${triggerId}-helper` : undefined;
    const labelText = typeof label === 'string' ? label : undefined;
    const withSeconds = (timeSteps?.seconds ?? 0) > 0;

    return (
      <Root
        {...props}
        disabled={disabled}
        readOnly={readOnly}
        locale={locale}
        loading={loading}
        ampm={ampm}
        timeSteps={timeSteps}
      >
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
            disabled={disabled || disableOpenPicker}
            autoFocus={autoFocus}
            aria-invalid={error || undefined}
            aria-describedby={helperId}
            aria-label={labelText ?? 'Choose date and time'}
            className={triggerClassName}
          >
            <DateTimePickerPrimitive.Value
              locale={locale}
              format={format}
              placeholder={placeholder ?? 'MM/DD/YYYY HH:mm'}
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
          calendarClassName={calendarClassName}
          className={contentClassName}
          loading={loading}
          showOutsideDays={showOutsideDays}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          withSeconds={withSeconds}
          ampm={ampm}
        />
      </Root>
    );
  },
);
DateTimePickerRoot.displayName = 'DateTimePicker';

const DateTimePicker = Object.assign(DateTimePickerRoot, {
  Root,
  Trigger,
  Content,
  Value,
  Calendar,
  Segment,
  Separator,
  Loading,
  StyledCalendar,
});

export {
  DateTimePicker,
  Root,
  Trigger,
  Content,
  Value,
  Calendar,
  Segment,
  Separator,
  Loading,
  StyledCalendar,
};
export type { DateTimePickerProps, CalendarProps };
